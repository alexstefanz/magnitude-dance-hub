import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createHash } from "crypto";
import { z } from "zod";

const trimmed = (max: number) => z.string().trim().max(max);

export const registrationSchema = z.object({
  firstName: trimmed(80).min(2, "Introdu numele (minim 2 caractere)."),
  lastName: trimmed(80).min(2, "Introdu prenumele (minim 2 caractere)."),
  phone: trimmed(30)
    .min(9, "Introdu un număr de telefon valid.")
    .regex(/^[+0-9 ()./-]+$/, "Numărul de telefon conține caractere nepermise."),
  email: trimmed(255).email("Introdu o adresă de email validă."),
  whoAmI: trimmed(80).optional().default(""),
  selectedCourse: trimmed(120).optional().default(""),
  message: trimmed(2000).optional().default(""),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: "Este necesar acordul privind prelucrarea datelor." }),
  }),
  sourcePage: trimmed(200).optional().default(""),
  honeypot: trimmed(200).optional().default(""),
});

export const feedbackSchema = z.object({
  name: trimmed(80).optional().default(""),
  email: z.union([z.literal(""), z.string().trim().email("Adresă de email invalidă.")]).default(""),
  instructorId: z.string().uuid().optional().nullable(),
  instructorLabel: trimmed(120).optional().default(""),
  courseLabel: trimmed(120).optional().default(""),
  rating: z.number().int().min(1, "Alege un rating.").max(5),
  message: trimmed(2000).min(5, "Scrie câteva cuvinte despre experiența ta."),
  allowTestimonial: z.boolean().default(false),
  honeypot: trimmed(200).optional().default(""),
});

function clientIpHash() {
  const request = getRequest();
  const raw =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  return createHash("sha256").update(`magnitude:${raw}`).digest("hex").slice(0, 40);
}

const RATE_LIMIT = 5;
const WINDOW_MINUTES = 30;

async function guard(formType: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const ipHash = clientIpHash();
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const { count } = await supabaseAdmin
    .from("form_submission_log")
    .select("id", { count: "exact", head: true })
    .eq("form_type", formType)
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if ((count ?? 0) >= RATE_LIMIT) {
    throw new Error(
      "Ai trimis prea multe mesaje într-un timp scurt. Te rugăm să încerci din nou mai târziu sau scrie-ne pe WhatsApp.",
    );
  }

  await supabaseAdmin.from("form_submission_log").insert({ form_type: formType, ip_hash: ipHash });
  return supabaseAdmin;
}

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.honeypot) return { ok: true as const };
    const supabaseAdmin = await guard("registration");

    const { data: inserted, error } = await supabaseAdmin.from("registrations").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email.toLowerCase(),
      who_am_i: data.whoAmI || null,
      selected_course: data.selectedCourse || null,
      message: data.message || null,
      gdpr_consent: true,
      gdpr_consent_at: new Date().toISOString(),
      source_page: data.sourcePage || null,
    }).select("id").single();

    if (error) {
      console.error("registration insert failed", error);
      throw new Error("Nu am putut trimite formularul. Te rugăm să încerci din nou.");
    }
    try {
      const { notifyInstructorWhatsApp } = await import("./whatsapp.server");
      await notifyInstructorWhatsApp(supabaseAdmin, inserted?.id ?? null, data);
    } catch (e) {
      console.error("whatsapp notify failed", e);
    }
    return { ok: true as const };
  });

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.honeypot) return { ok: true as const };
    const supabaseAdmin = await guard("feedback");

    const { error } = await supabaseAdmin.from("feedback").insert({
      name: data.name || null,
      email: data.email ? data.email.toLowerCase() : null,
      instructor_id: data.instructorId || null,
      instructor_label: data.instructorLabel || null,
      course_label: data.courseLabel || null,
      rating: data.rating,
      message: data.message,
      allow_testimonial: data.allowTestimonial,
    });

    if (error) {
      console.error("feedback insert failed", error);
      throw new Error("Nu am putut trimite formularul. Te rugăm să încerci din nou.");
    }
    return { ok: true as const };
  });

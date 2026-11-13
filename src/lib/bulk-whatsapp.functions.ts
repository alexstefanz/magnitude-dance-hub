import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { normalizePhoneRO } from "./phone";

const schema = z.object({
  template: z.enum(["confirmare_start_curs", "reprogramare_curs"]),
  course: z.string().trim().min(1).max(120),
  date: z.string().trim().min(1).max(60),
  time: z.string().trim().min(1).max(20),
  registrationIds: z.array(z.string().uuid()).min(1).max(500),
});

export const sendBulkWhatsApp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("is_admin");
    if (!isAdmin) throw new Error("Acces interzis.");
    if (!process.env["WHATSAPP_ACCESS_TOKEN"]) throw new Error("WhatsApp nu este configurat.");

    const { data: regs, error } = await context.supabase
      .from("registrations").select("id,first_name,phone").in("id", data.registrationIds);
    if (error) throw new Error(error.message);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { reconcilePending } = await import("./whatsapp.server");
    const { sendWhatsApp } = await import("./whatsapp-send.server");
    let sent = 0;
    const failed: { name: string; reason: string }[] = [];

    for (const r of regs ?? []) {
      const to = normalizePhoneRO(r.phone);
      if (!to) { failed.push({ name: r.first_name, reason: "număr invalid" }); continue; }
      const [n, c, dt, tm] = [r.first_name, data.course, data.date, data.time];
      const text = data.template === "confirmare_start_curs"
        ? `Bună, ${n}! Îți mulțumim pentru înscrierea la cursul de ${c} de la Magnitude Dance. Prima ședință va avea loc pe data de ${dt}, la ora ${tm}, la studioul nostru din Iași. Te așteptăm cu drag! Dacă ai întrebări, ne poți răspunde direct la acest mesaj.`
        : `Bună, ${n}! Te anunțăm că începerea cursului de ${c} de la Magnitude Dance a fost reprogramată pentru data de ${dt}, la ora ${tm}. Ne cerem scuze pentru inconveniente și te așteptăm cu drag! Pentru orice detalii, ne poți răspunde direct la acest mesaj.`;
      const res = await sendWhatsApp(supabaseAdmin, { to, template: data.template, params: [n, c, dt, tm], fallbackText: text, registrationId: r.id });
      if (!res.ok) { failed.push({ name: r.first_name, reason: (res.error ?? "eroare trimitere").slice(0, 160) }); continue; }
      sent++;
    }
    await reconcilePending(supabaseAdmin);
    return { sent, failed };
  });

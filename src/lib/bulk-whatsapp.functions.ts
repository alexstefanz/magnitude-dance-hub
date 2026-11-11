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
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const waKey = process.env["WHATSAPP_API_KEY"];
    if (!lovableKey || !waKey) throw new Error("WhatsApp nu este configurat.");

    const { data: regs, error } = await context.supabase
      .from("registrations").select("id,first_name,phone").in("id", data.registrationIds);
    if (error) throw new Error(error.message);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { reconcilePending } = await import("./whatsapp.server");
    let sent = 0;
    const failed: { name: string; reason: string }[] = [];

    for (const r of regs ?? []) {
      const to = normalizePhoneRO(r.phone);
      if (!to) { failed.push({ name: r.first_name, reason: "număr invalid" }); continue; }
      const params = [r.first_name, data.course, data.date, data.time].map((t) => ({ type: "text", text: t }));
      const res = await fetch("https://connector-gateway.lovable.dev/whatsapp/messages", {
        method: "POST",
        headers: { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": waKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          messaging_product: "whatsapp", to, type: "template",
          template: { name: data.template, language: { code: "ro" }, components: [{ type: "body", parameters: params }] },
        }),
      });
      const body = await res.text();
      if (!res.ok) {
        console.error(`Bulk WhatsApp failed [${res.status}]: ${body}`);
        await supabaseAdmin.from("whatsapp_notifications").insert({ registration_id: r.id, recipient: to, status: "failed", error: body.slice(0, 2000) });
        let reason = "eroare trimitere";
        try { reason = JSON.parse(body)?.error?.message?.slice(0, 160) || reason; } catch { /* keep */ }
        failed.push({ name: r.first_name, reason });
        continue;
      }
      const id = JSON.parse(body)?.messages?.[0]?.id ?? null;
      await supabaseAdmin.from("whatsapp_notifications").insert({ registration_id: r.id, recipient: to, provider_message_id: id, status: "accepted" });
      sent++;
    }
    await reconcilePending(supabaseAdmin);
    return { sent, failed };
  });

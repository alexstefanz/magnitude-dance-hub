import { normalizePhoneRO } from "./phone";
import { sendWhatsApp } from "./whatsapp-send.server";
const TEMPLATE = "notificare_inscriere_curs";
const RANK: Record<string, number> = { accepted: 0, sent: 1, delivered: 2, read: 3, failed: 4 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Admin = any;

const clean = (v: string | undefined | null) => {
  const t = (v || "").replace(/\s+/g, " ").trim();
  return (t || "-").slice(0, 500);
};

export async function notifyInstructorWhatsApp(
  admin: Admin,
  registrationId: string | null,
  d: { firstName: string; lastName: string; phone: string; email: string; selectedCourse?: string; message?: string },
) {
  const recipients = (process.env["WHATSAPP_NOTIFY_TO"] || "")
    .split(",")
    .map((n) => normalizePhoneRO(n))
    .filter((n): n is string => Boolean(n));
  if (!process.env["WHATSAPP_ACCESS_TOKEN"] || recipients.length === 0) {
    console.error("WhatsApp notify not configured");
    return;
  }
  const p = [`${d.firstName} ${d.lastName}`, d.selectedCourse, d.phone, d.email, d.message].map(clean);
  const text = `Ai primit o înscriere nouă pe site-ul Magnitude Dance!\n\n👤 Cursant: ${p[0]}\n💃 Curs ales: ${p[1]}\n📱 Telefon: ${p[2]}\n✉️ Email: ${p[3]}\n💬 Mesaj: ${p[4]}\n\nTe rugăm să iei legătura cu cursantul cât mai curând.`;
  for (const to of recipients) {
    try {
      await sendWhatsApp(admin, { to, template: TEMPLATE, params: p, fallbackText: text, registrationId });
    } catch (e) { console.error("WhatsApp notify error", e); }
  }
  await reconcilePending(admin);
}

// Applies stored status callbacks to outbound rows. Returns false if a status is still unmatched.
async function applyStatuses(admin: Admin, payload: Admin): Promise<boolean> {
  const statuses = payload?.entry?.[0]?.changes?.[0]?.value?.statuses ?? [];
  let allMatched = true;
  for (const s of statuses) {
    const { data: row, error } = await admin.from("whatsapp_notifications").select("id,status").eq("provider_message_id", s.id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) { allMatched = false; continue; }
    if ((RANK[s.status] ?? 0) < (RANK[row.status] ?? 0)) continue;
    const ts = s.timestamp ? new Date(Number(s.timestamp) * 1000).toISOString() : null;
    const { error: uErr } = await admin.from("whatsapp_notifications").update({
      status: s.status, status_updated_at: ts, error: s.errors ? JSON.stringify(s.errors).slice(0, 2000) : undefined,
    }).eq("id", row.id);
    if (uErr) throw new Error(uErr.message);
  }
  return allMatched;
}

export async function processEvent(admin: Admin, row: { id: string; event: string; payload: unknown }) {
  if (row.event === "whatsapp.status") {
    const matched = await applyStatuses(admin, row.payload);
    if (!matched) {
      await admin.from("whatsapp_webhook_events").update({ processing_error: "unmatched" }).eq("id", row.id);
      return;
    }
  }
  const { error } = await admin.from("whatsapp_webhook_events").update({ processed_at: new Date().toISOString(), processing_error: null }).eq("id", row.id);
  if (error) throw new Error(error.message);
}

// Bounded recovery: retry a few unfinished events, oldest-attempted first by random-ish rotation.
export async function reconcilePending(admin: Admin) {
  const since = new Date(Date.now() - 7 * 86400_000).toISOString();
  const { data } = await admin.from("whatsapp_webhook_events").select("id,event,payload")
    .is("processed_at", null).gte("received_at", since).order("received_at", { ascending: false }).limit(20);
  for (const r of data ?? []) {
    try { await processEvent(admin, r); } catch (e) { console.error("reconcile failed", e); }
  }
}

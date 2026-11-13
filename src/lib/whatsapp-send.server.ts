// Direct Meta Graph API sender. Switching numbers = change WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_WABA_ID / WHATSAPP_ACCESS_TOKEN only.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Admin = any;

export type WaParam = { type: "text"; text: string };

export async function sendWhatsApp(
  admin: Admin,
  opts: { to: string; template: string; params: string[]; fallbackText: string; registrationId: string | null },
) {
  const token = process.env["WHATSAPP_ACCESS_TOKEN"];
  const phoneId = process.env["WHATSAPP_PHONE_NUMBER_ID"];
  const ver = process.env["WHATSAPP_GRAPH_VERSION"] || "v25.0";
  if (!token || !phoneId) throw new Error("WhatsApp nu este configurat.");
  const url = `https://graph.facebook.com/${ver}/${phoneId}/messages`;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const post = (payload: object) => fetch(url, { method: "POST", headers, body: JSON.stringify({ messaging_product: "whatsapp", to: opts.to, ...payload }) });

  let type = "template";
  let res = await post({
    type: "template",
    template: { name: opts.template, language: { code: "ro" }, components: [{ type: "body", parameters: opts.params.map((t) => ({ type: "text", text: t })) }] },
  });
  let body = await res.text();
  let code = errCode(body);
  // Template not yet approved/missing on this WABA (132001 missing, 132015/132016 paused/disabled) -> plain text for tests.
  if (!res.ok && ["132001", "132015", "132016", "132000"].includes(code ?? "")) {
    type = "text";
    res = await post({ type: "text", text: { body: opts.fallbackText } });
    body = await res.text();
    code = errCode(body);
  }

  let error: string | null = null;
  if (!res.ok) {
    const msg = safe(() => JSON.parse(body)?.error?.message) || body;
    error = code === "131030" ? `Destinatarul nu e în lista de test Meta (131030): ${msg}` : `Meta ${code ?? res.status}: ${msg}`;
    console.error(`WhatsApp send failed [${res.status}] to ${opts.to}: ${body}`);
  }
  const id = res.ok ? safe(() => JSON.parse(body)?.messages?.[0]?.id) ?? null : null;
  await admin.from("whatsapp_notifications").insert({
    registration_id: opts.registrationId, recipient: opts.to, provider_message_id: id,
    status: res.ok ? "accepted" : "failed", error: error?.slice(0, 2000) ?? null,
    message_type: type, template_name: opts.template, http_status: res.status, error_code: code,
  });
  return { ok: res.ok, status: res.status, body, type, error };
}

function errCode(body: string): string | null {
  const c = safe(() => JSON.parse(body)?.error?.code);
  return c == null ? null : String(c);
}
function safe<T>(f: () => T): T | undefined { try { return f(); } catch { return undefined; } }

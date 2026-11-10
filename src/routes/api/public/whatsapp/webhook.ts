import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhookRequest } from "@lovable.dev/webhooks-js";

export const Route = createFileRoute("/api/public/whatsapp/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["WHATSAPP_API_KEY"];
        if (!secret) return new Response("not configured", { status: 500 });
        let body: string;
        try {
          const r = await verifyWebhookRequest({ req: request, secret, maxBodyBytes: 4 * 1024 * 1024 });
          body = r.body;
        } catch {
          return new Response("unauthorized", { status: 401 });
        }
        const deliveryId = request.headers.get("X-Lovable-Delivery");
        const event = request.headers.get("X-Lovable-Event");
        if (!deliveryId || !event) return new Response("missing headers", { status: 400 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { processEvent, reconcilePending } = await import("@/lib/whatsapp.server");
        let payload: unknown;
        try { payload = JSON.parse(body); } catch { payload = { raw: body }; }

        const { error: insErr } = await supabaseAdmin.from("whatsapp_webhook_events")
          .upsert({ delivery_id: deliveryId, event, payload: payload as never }, { onConflict: "delivery_id", ignoreDuplicates: true });
        if (insErr) return new Response("db error", { status: 500 });
        const { data: row, error } = await supabaseAdmin.from("whatsapp_webhook_events")
          .select("id,event,payload,processed_at").eq("delivery_id", deliveryId).single();
        if (error || !row) return new Response("db error", { status: 500 });
        if (!row.processed_at) {
          try { await processEvent(supabaseAdmin, row); } catch { return new Response("processing error", { status: 500 }); }
        }
        await reconcilePending(supabaseAdmin).catch(() => {});
        return new Response("ok");
      },
    },
  },
});

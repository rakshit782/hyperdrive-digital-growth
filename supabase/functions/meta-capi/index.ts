// Sends a server-side Meta Lead (Conversions API) for a lead that was just saved.
// The browser pixel sends the same event with the same event_id, so Meta counts it once.
// Only real, recent leads are sent: the lead_id must exist in public.leads and be under 60 minutes old,
// and customer details come from the database, not from the request.
//
// Secrets: META_CAPI_TOKEN (required; without it the function does nothing),
//          META_PIXEL_ID (optional, defaults to the site pixel), META_TEST_EVENT_CODE (optional, for Test Events).
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const GRAPH_VERSION = "v21.0";

async function sha256(v: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
const norm = (v: unknown) => String(v ?? "").trim().toLowerCase();
const clip = (v: unknown, n = 500) => (typeof v === "string" && v ? v.slice(0, n) : undefined);

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);

  const token = Deno.env.get("META_CAPI_TOKEN");
  if (!token) return json({ skipped: "META_CAPI_TOKEN is not set" });
  const pixelId = Deno.env.get("META_PIXEL_ID") || "667154722169969";

  let client: Client | null = null;
  try {
    const body = await req.json().catch(() => ({}));
    const leadId = String(body.lead_id ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(leadId)) return json({ error: "Invalid lead_id." }, 400);

    client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();
    const r = await client.queryObject<{ email: string | null; phone: string | null; name: string | null; created_at: Date }>(
      `SELECT email, phone, name, created_at FROM leads
        WHERE id = $1 AND created_at > now() - interval '60 minutes'`,
      [leadId],
    );
    const lead = r.rows[0];
    if (!lead) return json({ error: "Lead not found or too old." }, 404);

    const [first, ...rest] = norm(lead.name).split(/\s+/).filter(Boolean);
    const phone = String(lead.phone ?? "").replace(/\D/g, "");
    const user_data: Record<string, unknown> = {
      client_ip_address: (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined,
      client_user_agent: clip(req.headers.get("user-agent")),
      fbp: clip(body.fbp, 200),
      fbc: clip(body.fbc, 300),
    };
    if (lead.email) user_data.em = [await sha256(norm(lead.email))];
    if (phone.length >= 7) user_data.ph = [await sha256(phone)];
    if (first) user_data.fn = [await sha256(first)];
    if (rest.length) user_data.ln = [await sha256(rest[rest.length - 1])];
    const ext = [norm(body.external_id), leadId].filter(Boolean);
    user_data.external_id = await Promise.all(ext.map((e) => sha256(e)));

    const event = {
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: clip(body.event_id, 100) || `lead-${leadId}`,
      event_source_url: clip(body.event_source_url, 1000),
      action_source: "website",
      user_data,
      custom_data: {
        currency: "USD",
        value: Number(body.value) > 0 ? Number(body.value) : 100,
        content_name: clip(body.content_name, 200) || "Website Lead",
      },
    };
    const payload: Record<string, unknown> = { data: [event] };
    const testCode = Deno.env.get("META_TEST_EVENT_CODE");
    if (testCode) payload.test_event_code = testCode;

    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.warn("Meta CAPI rejected the event:", JSON.stringify(out).slice(0, 500));
      return json({ error: "Meta rejected the event.", detail: out?.error?.message }, 502);
    }
    return json({ success: true, events_received: out.events_received });
  } catch (e) {
    console.warn("meta-capi error:", String(e));
    return json({ error: "Couldn't send the event." }, 500);
  } finally {
    try { await client?.end(); } catch (_e) { /* ignore */ }
  }
});

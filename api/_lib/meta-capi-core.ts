// Server-side Meta Lead (Conversions API) for a lead that was just saved.
// The browser pixel sends the same event with the same event_id, so Meta counts it once.
// Only real, recent leads are sent: lead_id must exist in public.leads and be under 60 minutes old,
// and customer details are taken from the database, not from the request.
import { createHash } from "node:crypto";
import type { Db } from "./db.js";

const GRAPH_VERSION = "v21.0";
const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
const norm = (v: unknown) => String(v ?? "").trim().toLowerCase();
const clip = (v: unknown, n = 500) => (typeof v === "string" && v ? v.slice(0, n) : undefined);

export interface CapiEnv { token?: string; pixelId?: string; testEventCode?: string; fetch?: typeof fetch }

export async function sendLeadToMeta(
  db: Db,
  body: Record<string, any>,
  ctx: { ip?: string; userAgent?: string },
  env: CapiEnv,
): Promise<{ status: number; body: Record<string, unknown> }> {
  if (!env.token) return { status: 200, body: { skipped: "META_CAPI_TOKEN is not set" } };
  const leadId = String(body.lead_id ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(leadId)) return { status: 400, body: { error: "Invalid lead_id." } };

  const rows = await db.q<{ email: string | null; phone: string | null; name: string | null }>(
    `SELECT email, phone, name FROM leads WHERE id = $1 AND created_at > now() - interval '60 minutes'`, [leadId]);
  const lead = rows[0];
  if (!lead) return { status: 404, body: { error: "Lead not found or too old." } };

  const [first, ...rest] = norm(lead.name).split(/\s+/).filter(Boolean);
  const phone = String(lead.phone ?? "").replace(/\D/g, "");
  const user_data: Record<string, unknown> = {
    client_ip_address: ctx.ip || undefined,
    client_user_agent: clip(ctx.userAgent),
    fbp: clip(body.fbp, 200),
    fbc: clip(body.fbc, 300),
    external_id: [norm(body.external_id), leadId].filter(Boolean).map(sha256),
  };
  if (lead.email) user_data.em = [sha256(norm(lead.email))];
  if (phone.length >= 7) user_data.ph = [sha256(phone)];
  if (first) user_data.fn = [sha256(first)];
  if (rest.length) user_data.ln = [sha256(rest[rest.length - 1])];

  const payload: Record<string, unknown> = {
    data: [{
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: clip(body.event_id, 100) || `lead-${leadId}`,
      event_source_url: clip(body.event_source_url, 1000),
      action_source: "website",
      user_data,
      custom_data: { currency: "USD", value: Number(body.value) > 0 ? Number(body.value) : 100, content_name: clip(body.content_name, 200) || "Website Lead" },
    }],
  };
  if (env.testEventCode) payload.test_event_code = env.testEventCode;

  const doFetch = env.fetch || fetch;
  const res = await doFetch(`https://graph.facebook.com/${GRAPH_VERSION}/${env.pixelId || "667154722169969"}/events?access_token=${encodeURIComponent(env.token)}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const out: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.warn("Meta CAPI rejected the event:", JSON.stringify(out).slice(0, 500));
    return { status: 502, body: { error: "Meta rejected the event.", detail: out?.error?.message } };
  }
  return { status: 200, body: { success: true, events_received: out.events_received } };
}

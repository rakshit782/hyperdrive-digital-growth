// Admin-only dashboard data: leads, contacts, newsletter, logs, site settings, certificates, health check.
// Every action requires an admin access token (x-admin-token).
import { HttpError, requireAdmin, type Db } from "./db.js";
import { getResendKey, getSettings, saveSettings } from "./settings-core.js";
import { escapeHtml, sendResend } from "./secrets.js";
import { CERT_ACTIONS } from "./certificates-core.js";

type Ctx = { db: Db; body: Record<string, any>; adminId: string; fetch: typeof fetch };
const lim = (v: unknown, d = 100, max = 2000) => Math.min(Math.max(Number(v) || d, 1), max);
const ids = (b: Record<string, any>): string[] => {
  const list = Array.isArray(b.ids) ? b.ids : b.id ? [b.id] : [];
  return list.map(String).filter(Boolean).slice(0, 1000);
};

const ACTIONS: Record<string, (c: Ctx) => Promise<unknown>> = {
  "ping": async ({ db }) => {
    const t0 = Date.now();
    const r: any = (await db.q(`SELECT current_database() AS database, version() AS version, now() AS timestamp,
      (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public')::int AS tables_count`))[0] || {};
    return { ok: true, latencyMs: Date.now() - t0, db: r.database, version: r.version, serverTime: r.timestamp, tablesCount: r.tables_count };
  },

  "leads.list": async ({ db, body }) => ({ leads: await db.q(
    `SELECT id, name, email, phone, company, brand_name, amazon_store_url, walmart_store_url, source, status,
            notes, lead_number, audit_type, website_url, current_spend, goals, lead_data, form_security, created_at, updated_at
       FROM public.leads ORDER BY created_at DESC LIMIT $1`, [lim(body.limit)]) }),
  "leads.delete": async ({ db, body }) => {
    const list = ids(body);
    if (!list.length) throw new HttpError(400, "Choose at least one lead.");
    await db.q("DELETE FROM public.leads WHERE id::text = ANY($1::text[])", [list]);
    return { success: true, deletedCount: list.length };
  },
  "leads.forward": async ({ db, body, fetch }) => {
    const lead: any = (await db.q("SELECT * FROM public.leads WHERE id::text = $1", [String(body.id ?? "")]))[0];
    if (!lead) throw new HttpError(404, "Lead not found.");
    const key = await getResendKey(db);
    if (!key) throw new HttpError(400, "No Resend API key configured in Settings. Add your key first.");
    const s: any = (await db.q("SELECT notification_email FROM public.site_settings WHERE id = 1"))[0];
    const to = String(s?.notification_email || "").split(",").map((e) => e.trim()).filter(Boolean);
    if (!to.length) throw new HttpError(400, "No notification email configured in Settings.");
    const row = (k: string, v: unknown) => `<tr><td style="padding:6px 0;color:#64748b"><strong>${k}:</strong></td><td>${escapeHtml(v || "N/A")}</td></tr>`;
    await sendResend(key, to, `Forwarded Lead: ${lead.name} (${lead.lead_number || "New"})`,
      `<div style="font-family:Arial,sans-serif;padding:24px;border:1px solid #e2e8f0;border-radius:8px">
        <h2 style="color:#0284c7;margin-top:0">Forwarded lead</h2><table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row("Name", lead.name)}${row("Email", lead.email)}${row("Phone", lead.phone)}${row("Company", lead.company || lead.brand_name)}
        ${row("Website", lead.website_url)}${row("Audit type", lead.audit_type)}${row("Monthly spend", lead.current_spend)}
        ${row("Goals", lead.goals)}${row("Notes", lead.notes)}</table>
        <p style="font-size:12px;color:#94a3b8">Lead number: ${escapeHtml(lead.lead_number || lead.id)}</p></div>`, fetch);
    return { success: true };
  },

  "contacts.list": async ({ db, body }) => ({ contacts: await db.q(
    `SELECT id, name, email, phone, company, message, form_type, created_at, updated_at
       FROM public.contact_submissions ORDER BY created_at DESC LIMIT $1`, [lim(body.limit)]) }),
  "contacts.delete": async ({ db, body }) => {
    await db.q("DELETE FROM public.contact_submissions WHERE id::text = $1", [String(body.id ?? "")]);
    return { success: true };
  },

  "newsletter.list": async ({ db, body }) => ({ emails: await db.q(
    `SELECT id, email, name, status, created_at, updated_at FROM public.newsletter_emails ORDER BY created_at DESC LIMIT $1`,
    [lim(body.limit, 1000, 5000)]) }),
  "newsletter.add": async ({ db, body }) => {
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Enter a valid email address.");
    const existing: any = (await db.q("SELECT id, status FROM public.newsletter_emails WHERE email = $1", [email]))[0];
    if (existing?.status === "subscribed") return { success: false, already: true };
    if (existing) {
      await db.q("UPDATE public.newsletter_emails SET status = 'subscribed', updated_at = now() WHERE id = $1", [existing.id]);
      return { success: true, reactivated: true };
    }
    await db.q(`INSERT INTO public.newsletter_emails (email, name, status, created_at, updated_at) VALUES ($1, $2, 'subscribed', now(), now())`,
      [email, body.name ? String(body.name).slice(0, 200) : null]);
    return { success: true };
  },
  "newsletter.set_status": async ({ db, body }) => {
    const status = body.status === "unsubscribed" ? "unsubscribed" : "subscribed";
    await db.q("UPDATE public.newsletter_emails SET status = $2, updated_at = now() WHERE id::text = $1", [String(body.id ?? ""), status]);
    return { success: true };
  },
  "newsletter.delete": async ({ db, body }) => {
    await db.q("DELETE FROM public.newsletter_emails WHERE id::text = $1", [String(body.id ?? "")]);
    return { success: true };
  },

  "security_logs.list": async ({ db, body }) => ({ logs: await db.q(
    `SELECT id, form_type, ip_address, user_agent, recaptcha_score, honeypot_triggered, csrf_valid, submission_data, created_at
       FROM public.security_logs ORDER BY created_at DESC LIMIT $1`, [lim(body.limit)]) }),
  "visitor_logs.list": async ({ db, body }) => ({ logs: await db.q(
    `SELECT id, ip_address, user_agent, page_url, referrer, country, city, region, created_at
       FROM public.visitor_logs ORDER BY created_at DESC LIMIT $1`, [lim(body.limit, 200)]) }),
  "visitor_logs.backend_test": async ({ db, body }) => {
    await db.q(`INSERT INTO public.visitor_logs (ip_address, user_agent, page_url, referrer, created_at) VALUES ('Server', $1, $2, $3, now())`,
      [String(body.user_agent || "Admin dashboard").slice(0, 500), String(body.page_url || "").slice(0, 1000), "[Production Backend Service]"]);
    return { success: true };
  },

  "settings.get": async ({ db }) => getSettings(db, true),
  "settings.save": async ({ db, body }) => saveSettings(db, body.settings || {}),
  "settings.test_email": async ({ db, body, fetch }) => {
    const to = String(body.to ?? "").split(",").map((e) => e.trim()).filter(Boolean);
    if (!to.length) throw new HttpError(400, "Enter a recipient email address.");
    const typed = typeof body.resend_api_key === "string" && body.resend_api_key.trim() && !body.resend_api_key.includes("...") ? body.resend_api_key.trim() : null;
    const key = typed || (await getResendKey(db));
    if (!key) throw new HttpError(400, "No Resend API key found. Save your Resend API key first.");
    await sendResend(key, to, "AMZ AD SCOUT: Test Lead Delivery Verification",
      `<div style="font-family:Arial,sans-serif;max-width:600px;padding:24px;border:1px solid #e2e8f0;border-radius:8px">
        <h2 style="color:#0284c7;margin-top:0">Resend is connected</h2>
        <p>New website leads will be emailed to: ${escapeHtml(to.join(", "))}</p>
        <p style="font-size:13px;color:#64748b">Sent ${escapeHtml(new Date().toUTCString())}</p></div>`, fetch);
    return { success: true, message: "Test email delivered successfully via Resend!" };
  },

  ...CERT_ACTIONS,
};

export async function handleAdmin(db: Db, opts: { action: string; body: Record<string, any>; token: string; jwtSecret?: string; fetch?: typeof fetch }) {
  try {
    const fn = ACTIONS[opts.action];
    if (!fn) return { status: 400, body: { error: `Unknown action "${opts.action}".` } };
    const adminId = await requireAdmin(db, opts.token, opts.jwtSecret);
    return { status: 200, body: await fn({ db, body: opts.body, adminId, fetch: opts.fetch || fetch }) };
  } catch (e: any) {
    if (e instanceof HttpError) return { status: e.status, body: { error: e.message } };
    console.warn("admin error:", String(e));
    return { status: 500, body: { error: e?.message?.startsWith("Resend") ? e.message : "Something went wrong on the server. Try again." } };
  }
}

// Save a website lead to Neon (public.leads) and send the email alert configured in site settings.
import type { Db } from "./db.js";
import { decryptSecret, escapeHtml as esc, sendResend } from "./secrets.js";

const s = (v: unknown, n = 2000) => (v == null || v === "" ? null : String(v).trim().slice(0, n));

export async function saveLead(db: Db, b: Record<string, any>, env: { resendKey?: string; fetch?: typeof fetch } = {}) {
  const name = s(b.name, 200), email = s(b.email, 320);
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { error: "Name and a valid email are required." } };
  }
  // Hidden spam-trap field. Browser autofill and password managers sometimes fill it for real people,
  // so the lead is still saved, marked for review, rather than silently discarded.
  const trap = String(b.honeypot ?? b.company_website ?? "").trim();
  const flagged = trap.length > 0;

  const leadNumber = `LEAD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
  const lead = {
    name, email, phone: s(b.phone, 60), company: s(b.company, 200), brand_name: s(b.brandName ?? b.company, 200),
    website_url: s(b.website, 500), amazon_store_url: s(b.amazonStoreUrl, 500), walmart_store_url: s(b.walmartStoreUrl, 500),
    source: s(b.source, 80) || "website",
    notes: flagged ? `[Possible spam: hidden spam-trap field was filled (could be browser autofill). Review before contacting.]${b.notes ? " " + s(b.notes) : ""}` : s(b.notes),
    audit_type: s(b.auditType, 120),
    current_spend: s(b.currentSpend ?? b.monthlyAdSpend, 60), goals: s(b.goals ?? b.businessGoals),
  };
  const rows = await db.q<{ id: string; lead_number: string }>(
    `INSERT INTO leads (name, email, phone, company, brand_name, website_url, amazon_store_url, walmart_store_url,
       source, status, notes, lead_number, audit_type, current_spend, goals, lead_data, form_security, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'new',$10,$11,$12,$13,$14,$15::jsonb,$16::jsonb, now(), now())
     RETURNING id, lead_number`,
    [lead.name, lead.email, lead.phone, lead.company, lead.brand_name, lead.website_url, lead.amazon_store_url, lead.walmart_store_url,
     lead.source, lead.notes, leadNumber, lead.audit_type, lead.current_spend, lead.goals,
     JSON.stringify(b.uploadedFiles && typeof b.uploadedFiles === "object" ? b.uploadedFiles : {}).slice(0, 20000),
     JSON.stringify(b.formSecurity && typeof b.formSecurity === "object" ? b.formSecurity : {}).slice(0, 5000)],
  );
  const saved = rows[0];

  // Email alert: never blocks or fails the lead.
  try {
    let st: any = null;
    for (const table of ["amz_app.site_settings", "public.site_settings"]) {
      try {
        const r = await db.q(`SELECT resend_api_key, notification_email, email_notifications_enabled, email_subject_template FROM ${table} WHERE id = 1`);
        if (r[0]) { st = r[0]; break; }
      } catch { /* table not present */ }
    }
    const key = decryptSecret(st?.resend_api_key ?? null) || env.resendKey;
    const to = String(st?.notification_email || "").split(",").map((x: string) => x.trim()).filter(Boolean);
    if (st?.email_notifications_enabled && key && to.length) {
      const rowsHtml = ([
        ["Name", lead.name], ["Email", lead.email], ["Phone", lead.phone], ["Company", lead.company], ["Website", lead.website_url],
        ["Amazon store", lead.amazon_store_url], ["Interested in", lead.audit_type], ["Monthly ad spend", lead.current_spend],
        ["Goals", lead.goals], ["Notes", lead.notes],
      ] as [string, string | null][]).filter(([, v]) => v).map(([k, v]) => `<p><strong>${k}:</strong> ${esc(v)}</p>`).join("");
      const subject = String(st.email_subject_template || "New Lead: {name} ({lead_number})")
        .replaceAll("{name}", lead.name).replaceAll("{lead_number}", saved.lead_number).replaceAll("{company}", lead.company || "N/A");
      const subjectOut = flagged ? `[Possible spam] ${subject}` : subject;
      // Throws with Resend's own message (e.g. unverified sender) so the failure shows in Vercel logs.
      await sendResend(key, to, subjectOut,
        `<div style="font-family:sans-serif;max-width:600px"><h2>New lead: ${esc(saved.lead_number)}</h2><p style="color:#64748b">Source: ${esc(lead.source)}</p>${rowsHtml}</div>`,
        env.fetch || fetch);
    } else {
      console.warn("Lead email alert skipped:", !st?.email_notifications_enabled ? "notifications are off in Settings" : !key ? "no Resend API key saved" : "no notification email set");
    }
  } catch (e) {
    console.warn("Lead email alert not sent:", String(e));
  }

  if (flagged) {
    try {
      await db.q(`INSERT INTO public.security_logs (form_type, honeypot_triggered, csrf_valid, submission_data, created_at)
                  VALUES ($1, true, true, $2::jsonb, now())`, [lead.source, JSON.stringify({ lead_id: saved.id, trap_value_length: trap.length })]);
    } catch { /* logging is best-effort */ }
  }

  return { status: 200, body: { success: true, leadId: saved.id, leadNumber: saved.lead_number, flagged } };
}

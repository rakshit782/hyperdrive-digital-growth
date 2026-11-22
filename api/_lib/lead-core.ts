// Save a website lead to Neon (public.leads) and send the email alert configured in site settings.
import { createHash, createDecipheriv } from "node:crypto";
import type { Db } from "./db.js";

const s = (v: unknown, n = 2000) => (v == null || v === "" ? null : String(v).trim().slice(0, n));
const esc = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

/** Same scheme as src/services/cryptoVault.ts ("enc:v1:<iv hex>:<cipher+tag hex>", AES-GCM). */
function decryptSecret(v: string | null): string | null {
  if (!v || !v.startsWith("enc:v1:")) return v;
  try {
    const [ivHex, dataHex] = v.slice(7).split(":");
    const key = createHash("sha256").update("amz_secure_credentials_v1_site_settings_vault").digest();
    const data = Buffer.from(dataHex, "hex");
    const d = createDecipheriv("aes-256-gcm", key, Buffer.from(ivHex, "hex"));
    d.setAuthTag(data.subarray(data.length - 16));
    return Buffer.concat([d.update(data.subarray(0, data.length - 16)), d.final()]).toString("utf8");
  } catch {
    return null;
  }
}

export async function saveLead(db: Db, b: Record<string, any>, env: { resendKey?: string; fetch?: typeof fetch } = {}) {
  const name = s(b.name, 200), email = s(b.email, 320);
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { error: "Name and a valid email are required." } };
  }
  if (b.company_website) return { status: 200, body: { success: true, leadId: null } }; // honeypot

  const leadNumber = `LEAD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
  const lead = {
    name, email, phone: s(b.phone, 60), company: s(b.company, 200), brand_name: s(b.brandName ?? b.company, 200),
    website_url: s(b.website, 500), amazon_store_url: s(b.amazonStoreUrl, 500), walmart_store_url: s(b.walmartStoreUrl, 500),
    source: s(b.source, 80) || "website", notes: s(b.notes), audit_type: s(b.auditType, 120),
    current_spend: s(b.currentSpend ?? b.monthlyAdSpend, 60), goals: s(b.goals ?? b.businessGoals),
  };
  const rows = await db.q<{ id: string; lead_number: string }>(
    `INSERT INTO leads (name, email, phone, company, brand_name, website_url, amazon_store_url, walmart_store_url,
       source, status, notes, lead_number, audit_type, current_spend, goals, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'new',$10,$11,$12,$13,$14, now(), now())
     RETURNING id, lead_number`,
    [lead.name, lead.email, lead.phone, lead.company, lead.brand_name, lead.website_url, lead.amazon_store_url, lead.walmart_store_url,
     lead.source, lead.notes, leadNumber, lead.audit_type, lead.current_spend, lead.goals],
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
      await (env.fetch || fetch)("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "AMZ Leads <onboarding@resend.dev>", to, subject,
          html: `<div style="font-family:sans-serif;max-width:600px"><h2>New lead: ${esc(saved.lead_number)}</h2><p style="color:#64748b">Source: ${esc(lead.source)}</p>${rowsHtml}</div>`,
        }),
      });
    }
  } catch (e) {
    console.warn("Lead email alert not sent:", String(e));
  }

  return { status: 200, body: { success: true, leadId: saved.id, leadNumber: saved.lead_number } };
}

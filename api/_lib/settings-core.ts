// public.site_settings (row id = 1). Visitors get only public fields; admins also get email settings
// (with the Resend key masked). The Resend key is encrypted at rest and only decrypted on the server.
import type { Db } from "./db.js";
import { decryptSecret, encryptSecret, maskKey } from "./secrets.js";

const COLS = `rating_value, review_count, review_source_url, rating_visible, resend_api_key, notification_email,
  email_notifications_enabled, email_subject_template, email_html_template, footer_email, footer_address,
  logo_settings, header_settings, maintenance_mode, updated_at`;

const EMPTY = {
  rating_value: 0, review_count: 0, review_source_url: null, rating_visible: false,
  footer_email: null, footer_address: null, logo_settings: null, header_settings: null, maintenance_mode: false, updated_at: null,
};

function shape(r: any, admin: boolean) {
  if (!r) return admin ? { ...EMPTY, resend_api_key: null, has_resend_api_key: false, notification_email: null, email_notifications_enabled: false, email_subject_template: null, email_html_template: null } : { ...EMPTY };
  const base = {
    rating_value: Number(r.rating_value) || 0,
    review_count: Number(r.review_count) || 0,
    review_source_url: r.review_source_url ?? null,
    rating_visible: r.rating_visible === true,
    footer_email: r.footer_email ?? null,
    footer_address: r.footer_address ?? null,
    logo_settings: r.logo_settings ?? null,
    header_settings: r.header_settings ?? null,
    maintenance_mode: r.maintenance_mode === true,
    updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : null,
  };
  if (!admin) return base;
  const key = decryptSecret(r.resend_api_key);
  return {
    ...base,
    resend_api_key: maskKey(key),
    has_resend_api_key: Boolean(key && key.trim()),
    notification_email: r.notification_email ?? null,
    email_notifications_enabled: r.email_notifications_enabled === true,
    email_subject_template: r.email_subject_template ?? null,
    email_html_template: r.email_html_template ?? null,
  };
}

export async function getSettings(db: Db, admin: boolean) {
  const rows = await db.q(`SELECT ${COLS} FROM public.site_settings WHERE id = 1`);
  return shape(rows[0], admin);
}

export async function getResendKey(db: Db): Promise<string | null> {
  const rows = await db.q<{ resend_api_key: string | null }>("SELECT resend_api_key FROM public.site_settings WHERE id = 1");
  return decryptSecret(rows[0]?.resend_api_key ?? null);
}

/** Same merge rules as the old browser code: omitted fields keep their stored value; a masked key ("abcde...wxyz") is ignored. */
export async function saveSettings(db: Db, p: Record<string, any>) {
  const existing: any = (await db.q(`SELECT ${COLS} FROM public.site_settings WHERE id = 1`))[0] || {};
  const incoming = typeof p.resend_api_key === "string" ? p.resend_api_key.trim() : "";
  const key = incoming && !incoming.includes("...") ? encryptSecret(incoming) : existing.resend_api_key ?? null;
  const keep = (k: string) => (p[k] !== undefined ? p[k] : existing[k] ?? null);
  const json = (k: string) => (p[k] !== undefined ? JSON.stringify(p[k]) : existing[k] != null ? JSON.stringify(existing[k]) : null);
  const rows = await db.q(
    `INSERT INTO public.site_settings (id, rating_value, review_count, review_source_url, rating_visible, resend_api_key,
       notification_email, email_notifications_enabled, email_subject_template, email_html_template, footer_email,
       footer_address, logo_settings, header_settings, maintenance_mode, updated_at)
     VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13::jsonb, $14, now())
     ON CONFLICT (id) DO UPDATE SET
       rating_value = EXCLUDED.rating_value, review_count = EXCLUDED.review_count,
       review_source_url = EXCLUDED.review_source_url, rating_visible = EXCLUDED.rating_visible,
       resend_api_key = COALESCE(EXCLUDED.resend_api_key, public.site_settings.resend_api_key),
       notification_email = EXCLUDED.notification_email,
       email_notifications_enabled = EXCLUDED.email_notifications_enabled,
       email_subject_template = EXCLUDED.email_subject_template, email_html_template = EXCLUDED.email_html_template,
       footer_email = EXCLUDED.footer_email, footer_address = EXCLUDED.footer_address,
       logo_settings = EXCLUDED.logo_settings, header_settings = EXCLUDED.header_settings,
       maintenance_mode = EXCLUDED.maintenance_mode, updated_at = now()
     RETURNING ${COLS}`,
    [
      p.rating_value ?? existing.rating_value ?? 0, p.review_count ?? existing.review_count ?? 0,
      keep("review_source_url"), p.rating_visible ?? existing.rating_visible ?? false, key,
      keep("notification_email"), p.email_notifications_enabled ?? existing.email_notifications_enabled ?? false,
      keep("email_subject_template"), keep("email_html_template"), keep("footer_email"), keep("footer_address"),
      json("logo_settings"), json("header_settings"), p.maintenance_mode ?? existing.maintenance_mode ?? false,
    ],
  );
  return shape(rows[0], true);
}

// Internship certificates (amz_app.internship_certificates). Port of the former Supabase function
// neon-certificates: public verify plus admin list/create/bulk_create/update/set_status/delete.
import { HttpError, type Db } from "./db.js";

const sanitize = (v: string) => (v || "").normalize("NFKD").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
function deptInitials(dept: string) {
  const words = (dept || "").split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (words.length === 0) return "GEN";
  if (words.length === 1) return sanitize(words[0]).slice(0, 3) || "GEN";
  return words.map((w) => sanitize(w).charAt(0)).join("").slice(0, 5);
}

let ready = false;
async function ensureTable(db: Db) {
  if (ready) return;
  // Only create when missing: CREATE needs schema privileges the app user may not have.
  if ((await db.q<{ t: string | null }>("SELECT to_regclass('amz_app.internship_certificates')::text AS t"))[0]?.t) { ready = true; return; }
  await db.q(`CREATE TABLE IF NOT EXISTS amz_app.internship_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), certificate_id TEXT NOT NULL UNIQUE, student_name TEXT NOT NULL,
    email TEXT, role TEXT NOT NULL, department TEXT, city TEXT, start_date DATE NOT NULL, end_date DATE NOT NULL,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE, mentor_name TEXT, performance TEXT, status TEXT NOT NULL DEFAULT 'active',
    notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
  ready = true;
}

async function nextCertificateId(db: Db, c: Record<string, any> = {}) {
  const city = sanitize(String(c.city ?? "")).replace(/[0-9]/g, "").slice(0, 3) || "IND";
  const custom = String(c.dept_code ?? "").replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 10);
  const dept = custom || deptInitials(String(c.department ?? ""));
  const base = c.start_date ? new Date(String(c.start_date)) : new Date();
  const d = isNaN(base.getTime()) ? new Date() : base;
  const ym = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  for (let i = 0; i < 10; i++) {
    const id = `AMZ/${city}/${dept}/${ym}/IN/${Math.floor(100000 + Math.random() * 900000)}`;
    if (!(await db.q("SELECT 1 FROM amz_app.internship_certificates WHERE certificate_id = $1", [id])).length) return id;
  }
  return `AMZ/${city}/${dept}/${ym}/IN/${Date.now().toString().slice(-6)}`;
}

const INSERT = `INSERT INTO amz_app.internship_certificates
  (certificate_id, student_name, email, role, department, city, start_date, end_date, issue_date, mentor_name, performance, notes)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,COALESCE($9::date, CURRENT_DATE),$10,$11,$12)`;
const values = (id: string, c: any) => [id, c.student_name, c.email || null, c.role, c.department || null, c.city || null,
  c.start_date, c.end_date, c.issue_date || null, c.mentor_name || null, c.performance || null, c.notes || null];

/** Public: look up one certificate. Returns only what the verification page shows (no email or notes). */
export async function verifyCertificate(db: Db, code: string) {
  code = String(code ?? "").trim().slice(0, 120);
  if (!code) throw new HttpError(400, "Certificate ID required");
  await ensureTable(db);
  const rows = await db.q(
    `SELECT certificate_id, student_name, role, department, city, start_date, end_date, issue_date, mentor_name, performance, status
       FROM amz_app.internship_certificates WHERE upper(trim(certificate_id)) = upper($1)`, [code]);
  return rows.length ? { found: true, certificate: rows[0] } : { found: false };
}

type Ctx = { db: Db; body: Record<string, any> };
export const CERT_ACTIONS: Record<string, (c: Ctx) => Promise<unknown>> = {
  "certificates.list": async ({ db }) => {
    await ensureTable(db);
    return { certificates: await db.q("SELECT * FROM amz_app.internship_certificates ORDER BY created_at DESC LIMIT 500") };
  },
  "certificates.create": async ({ db, body }) => {
    await ensureTable(db);
    const c = body.certificate ?? {};
    if (!c.student_name || !c.role || !c.start_date || !c.end_date) throw new HttpError(400, "Name, role, start date and end date are required");
    const id = (c.certificate_id && String(c.certificate_id).trim()) || (await nextCertificateId(db, c));
    return { certificate: (await db.q(`${INSERT} RETURNING *`, values(id, c)))[0] };
  },
  "certificates.bulk_create": async ({ db, body }) => {
    await ensureTable(db);
    const created: unknown[] = [];
    for (const c of (Array.isArray(body.certificates) ? body.certificates : []).slice(0, 1000)) {
      if (!c?.student_name || !c?.role || !c?.start_date || !c?.end_date) continue;
      const id = (c.certificate_id && String(c.certificate_id).trim()) || (await nextCertificateId(db, c));
      const r = await db.q(`${INSERT} ON CONFLICT (certificate_id) DO NOTHING RETURNING *`, values(id, c));
      if (r[0]) created.push(r[0]);
    }
    return { created: created.length, certificates: created };
  },
  "certificates.update": async ({ db, body }) => {
    const c = body.certificate ?? {};
    if (!body.id) throw new HttpError(400, "id required");
    if (!c.student_name || !c.role || !c.start_date || !c.end_date) throw new HttpError(400, "Name, role, start date and end date are required");
    let id = c.certificate_id && String(c.certificate_id).trim();
    if (!id || c.regenerate_id) id = await nextCertificateId(db, c);
    const r = await db.q(
      `UPDATE amz_app.internship_certificates SET certificate_id=$2, student_name=$3, email=$4, role=$5, department=$6, city=$7,
         start_date=$8, end_date=$9, issue_date=COALESCE($10::date, issue_date), mentor_name=$11, performance=$12, updated_at=now()
       WHERE id::text=$1 RETURNING *`,
      [String(body.id), id, c.student_name, c.email || null, c.role, c.department || null, c.city || null, c.start_date, c.end_date,
       c.issue_date || null, c.mentor_name || null, c.performance || null]);
    if (!r[0]) throw new HttpError(404, "Certificate not found.");
    return { certificate: r[0] };
  },
  "certificates.set_status": async ({ db, body }) => {
    const r = await db.q("UPDATE amz_app.internship_certificates SET status = $2, updated_at = now() WHERE id::text = $1 RETURNING *",
      [String(body.id ?? ""), String(body.status ?? "active").slice(0, 40)]);
    return { certificate: r[0] };
  },
  "certificates.delete": async ({ db, body }) => {
    await db.q("DELETE FROM amz_app.internship_certificates WHERE id::text = $1", [String(body.id ?? "")]);
    return { success: true };
  },
};

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.8/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET")!;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function ensureTable(client: Client) {
  try {
    await client.queryArray(`
      CREATE SCHEMA IF NOT EXISTS amz_app;
      CREATE TABLE IF NOT EXISTS amz_app.internship_certificates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        certificate_id TEXT NOT NULL UNIQUE,
        student_name TEXT NOT NULL,
        email TEXT,
        role TEXT NOT NULL,
        department TEXT,
        city TEXT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
        mentor_name TEXT,
        performance TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
  } catch (e) {
    console.warn("ensureTable skipped:", String(e));
  }
}

async function requireAdmin(req: Request, client: Client) {
  const authHeader = req.headers.get("x-admin-token") ?? "";
  if (!authHeader) return null;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const payload = await verify(authHeader, key);
    const result = await client.queryObject<{ role: string | null }>(
      "SELECT ur.role FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id WHERE u.id = $1",
      [payload.sub],
    );
    const role = result.rows[0]?.role;
    return role === "admin" ? payload.sub : null;
  } catch (_e) {
    return null;
  }
}

const sanitize = (v: string) =>
  (v || "").normalize("NFKD").replace(/[^A-Za-z0-9]/g, "").toUpperCase();

function deptInitials(dept: string) {
  const words = (dept || "").split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (words.length === 0) return "GEN";
  if (words.length === 1) return sanitize(words[0]).slice(0, 3) || "GEN";
  return words.map((w) => sanitize(w).charAt(0)).join("").slice(0, 5);
}

async function nextCertificateId(client: Client, c: Record<string, unknown> = {}) {
  const city = sanitize(String(c.city ?? "")).replace(/[0-9]/g, "").slice(0, 3) || "IND";
  const customCode = String(c.dept_code ?? "").replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 10);
  const dept = customCode || deptInitials(String(c.department ?? ""));
  const base = c.start_date ? new Date(String(c.start_date)) : new Date();
  const d = isNaN(base.getTime()) ? new Date() : base;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");

  for (let attempt = 0; attempt < 10; attempt++) {
    const rand = String(Math.floor(100000 + Math.random() * 900000));
    const id = `AMZ/${city}/${dept}/${year}/${month}/IN/${rand}`;
    const res = await client.queryObject(
      `SELECT 1 FROM amz_app.internship_certificates WHERE certificate_id = $1`,
      [id],
    );
    if (res.rows.length === 0) return id;
  }
  return `AMZ/${city}/${dept}/${year}/${month}/IN/${Date.now().toString().slice(-6)}`;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);

  try {
    const body = await req.json();
    const action = body.action as string;

    await client.connect();
    await ensureTable(client);

    // Public action: verify a certificate
    if (action === "verify") {
      const code = String(body.certificate_id ?? "").trim();
      if (!code) return json({ error: "Certificate ID required" }, 400);

      const result = await client.queryObject(
        `SELECT certificate_id, student_name, role, department, start_date, end_date,
                issue_date, mentor_name, performance, status
         FROM amz_app.internship_certificates
         WHERE upper(certificate_id) = upper($1)`,
        [code],
      );

      if (result.rows.length === 0) {
        return json({ found: false });
      }
      return json({ found: true, certificate: result.rows[0] });
    }

    // Admin-only actions
    const adminId = await requireAdmin(req, client);
    if (!adminId) return json({ error: "Unauthorized" }, 401);

    if (action === "list") {
      const result = await client.queryObject(
        `SELECT * FROM amz_app.internship_certificates ORDER BY created_at DESC LIMIT 500`,
      );
      return json({ certificates: result.rows });
    }

    if (action === "create") {
      const c = body.certificate ?? {};
      const certId = (c.certificate_id && String(c.certificate_id).trim()) ||
        (await nextCertificateId(client, c));
      const result = await client.queryObject(
        `INSERT INTO amz_app.internship_certificates
          (certificate_id, student_name, email, role, department, city, start_date, end_date,
           issue_date, mentor_name, performance, notes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,COALESCE($9, CURRENT_DATE),$10,$11,$12)
         RETURNING *`,
        [
          certId,
          c.student_name,
          c.email || null,
          c.role,
          c.department || null,
          c.city || null,
          c.start_date,
          c.end_date,
          c.issue_date || null,
          c.mentor_name || null,
          c.performance || null,
          c.notes || null,
        ],
      );
      return json({ certificate: result.rows[0] });
    }

    if (action === "bulk_create") {
      const rows = Array.isArray(body.certificates) ? body.certificates : [];
      const created: unknown[] = [];
      for (const c of rows) {
        const certId = (c.certificate_id && String(c.certificate_id).trim()) ||
          (await nextCertificateId(client, c));
        const result = await client.queryObject(
          `INSERT INTO amz_app.internship_certificates
            (certificate_id, student_name, email, role, department, city, start_date, end_date,
             issue_date, mentor_name, performance, notes)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,COALESCE($9, CURRENT_DATE),$10,$11,$12)
           ON CONFLICT (certificate_id) DO NOTHING
           RETURNING *`,
          [
            certId,
            c.student_name,
            c.email || null,
            c.role,
            c.department || null,
            c.city || null,
            c.start_date,
            c.end_date,
            c.issue_date || null,
            c.mentor_name || null,
            c.performance || null,
            c.notes || null,
          ],
        );
        if (result.rows[0]) created.push(result.rows[0]);
      }
      return json({ created: created.length, certificates: created });
    }

    if (action === "update") {
      const c = body.certificate ?? {};
      if (!body.id) return json({ error: "id required" }, 400);
      if (!c.student_name || !c.role || !c.start_date || !c.end_date) {
        return json({ error: "Name, role, start date and end date are required" }, 400);
      }
      let certId = c.certificate_id && String(c.certificate_id).trim();
      if (!certId || c.regenerate_id) certId = await nextCertificateId(client, c);
      const result = await client.queryObject(
        `UPDATE amz_app.internship_certificates SET
           certificate_id=$2, student_name=$3, email=$4, role=$5, department=$6, city=$7,
           start_date=$8, end_date=$9, issue_date=COALESCE($10, issue_date), mentor_name=$11,
           performance=$12, updated_at=now()
         WHERE id=$1 RETURNING *`,
        [
          body.id, certId, c.student_name, c.email || null, c.role, c.department || null,
          c.city || null, c.start_date, c.end_date, c.issue_date || null,
          c.mentor_name || null, c.performance || null,
        ],
      );
      return json({ certificate: result.rows[0] });
    }

    if (action === "set_status") {
      const result = await client.queryObject(
        `UPDATE amz_app.internship_certificates SET status = $2, updated_at = now()
         WHERE id = $1 RETURNING *`,
        [body.id, body.status],
      );
      return json({ certificate: result.rows[0] });
    }

    if (action === "delete") {
      await client.queryArray(`DELETE FROM amz_app.internship_certificates WHERE id = $1`, [body.id]);
      return json({ success: true });
    }

    return json({ error: "Invalid action" }, 400);
  } catch (error) {
    console.error("Certificates error:", error);
    return json({ error: String(error) }, 500);
  } finally {
    try {
      await client.end();
    } catch (_e) { /* ignore */ }
  }
});

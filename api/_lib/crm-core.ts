// CRM actions for the admin dashboard: lead pipeline, tasks, clients, plans, services, team users.
// Runtime-agnostic: api/crm.ts runs it on Vercel against Neon; tests run it against a local Postgres.
// New tables live in amz_crm; public.leads, public.users and public.user_roles are used in place.
import { HttpError, requireAdmin, type Db } from "./db.js";
import { hashPassword } from "./passwords.js";

/** Minimal client shape used below, backed by Db.q. */
type Client = {
  queryObject<T = any>(text: string, args?: unknown[]): Promise<{ rows: T[] }>;
  queryArray(text: string, args?: unknown[]): Promise<{ rows: any[] }>;
};
const wrap = (db: Db): Client => ({
  queryObject: async (t, a) => ({ rows: await db.q(t, a) as any[] }),
  queryArray: async (t, a) => ({ rows: await db.q(t, a) as any[] }),
});

export const LEAD_STAGES = ["new", "contacted", "qualified", "proposal", "won", "lost"];
const TASK_STATUSES = ["todo", "in_progress", "done"];
const PRIORITIES = ["low", "medium", "high"];
const PLAN_PERIODS = ["monthly", "quarterly", "annual", "one_time"];
const CLIENT_STATUSES = ["active", "trial", "paused", "cancelled"];
const ROLES = ["admin", "user"];

let tablesReady = false;
const CRM_TABLES = ["services", "subscription_plans", "clients", "tasks", "lead_meta"];
async function ensureTables(client: Client) {
  if (tablesReady) return;
  // Creating tables needs CREATE on schema amz_crm, which the app's database user may not have,
  // and Postgres checks that even for "IF NOT EXISTS". So only create when something is missing.
  const have = await client.queryObject<{ t: string | null }>(
    `SELECT to_regclass('amz_crm.' || t)::text AS t FROM unnest($1::text[]) AS t`, [CRM_TABLES]);
  if (have.rows.every((r) => r.t)) { tablesReady = true; return; }
  try {
    await createTables(client);
  } catch (e: any) {
    if (String(e?.code) === "42501" || /permission denied/i.test(String(e?.message))) {
      throw new HttpError(503, "The CRM tables haven't been set up yet. The database user in NEON_DATABASE_URL needs permission to create schemas (run docs/neon-crm-setup.sql in the Neon SQL Editor), then reload.");
    }
    throw e;
  }
  tablesReady = true;
}

async function createTables(client: Client) {
  const ddl = `
    CREATE SCHEMA IF NOT EXISTS amz_crm;
    CREATE TABLE IF NOT EXISTS amz_crm.services (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category TEXT,
      short_description TEXT,
      description TEXT,
      is_active BOOLEAN NOT NULL DEFAULT true,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS amz_crm.subscription_plans (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC(12,2),
      currency TEXT NOT NULL DEFAULT 'USD',
      billing_period TEXT NOT NULL DEFAULT 'monthly',
      features JSONB NOT NULL DEFAULT '[]'::jsonb,
      service_ids UUID[] NOT NULL DEFAULT '{}',
      is_active BOOLEAN NOT NULL DEFAULT true,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS amz_crm.clients (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      company TEXT,
      email TEXT,
      phone TEXT,
      website TEXT,
      lead_id UUID,
      plan_id UUID REFERENCES amz_crm.subscription_plans(id) ON DELETE SET NULL,
      plan_status TEXT NOT NULL DEFAULT 'active',
      start_date DATE,
      renewal_date DATE,
      monthly_value NUMERIC(12,2),
      owner_id UUID,
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS amz_crm.tasks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'todo',
      priority TEXT NOT NULL DEFAULT 'medium',
      due_date DATE,
      assignee_id UUID,
      lead_id UUID,
      client_id UUID REFERENCES amz_crm.clients(id) ON DELETE CASCADE,
      created_by UUID,
      completed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS amz_crm.lead_meta (
      lead_id UUID PRIMARY KEY,
      owner_id UUID,
      next_follow_up DATE,
      deal_value NUMERIC(12,2),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS tasks_assignee_idx ON amz_crm.tasks (assignee_id);
    CREATE INDEX IF NOT EXISTS tasks_status_idx ON amz_crm.tasks (status);
    CREATE INDEX IF NOT EXISTS clients_plan_idx ON amz_crm.clients (plan_id);
  `;
  for (const stmt of ddl.split(";").map((s) => s.trim()).filter(Boolean)) await client.queryArray(stmt);
}

// ---------- helpers ----------
const str = (v: unknown, max = 5000) => {
  if (v === undefined) return undefined;
  if (v === null || v === "") return null;
  return String(v).trim().slice(0, max);
};
const num = (v: unknown) => {
  if (v === undefined) return undefined;
  if (v === null || v === "") return null;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new HttpError(400, "Enter a valid number.");
  return n;
};
const date = (v: unknown) => {
  if (v === undefined) return undefined;
  if (v === null || v === "") return null;
  const s = String(v).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw new HttpError(400, "Dates must be in YYYY-MM-DD format.");
  return s;
};
const uuid = (v: unknown) => {
  if (v === undefined) return undefined;
  if (v === null || v === "") return null;
  const s = String(v);
  if (!/^[0-9a-f-]{36}$/i.test(s)) throw new HttpError(400, "Invalid id.");
  return s;
};
const oneOf = (list: string[], label: string) => (v: unknown) => {
  if (v === undefined) return undefined;
  const s = String(v);
  if (!list.includes(s)) throw new HttpError(400, `${label} must be one of: ${list.join(", ")}.`);
  return s;
};
const bool = (v: unknown) => (v === undefined ? undefined : Boolean(v));
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
const requireId = (v: unknown) => {
  const id = uuid(v);
  if (!id) throw new HttpError(400, "An id is required.");
  return id;
};

type Fields = Record<string, (v: unknown) => unknown>;

function pick(input: Record<string, unknown>, fields: Fields) {
  const out: Record<string, unknown> = {};
  for (const [k, fn] of Object.entries(fields)) {
    const v = fn(input[k]);
    if (v !== undefined) out[k] = v;
  }
  return out;
}

async function insertRow(client: Client, table: string, data: Record<string, unknown>) {
  const cols = Object.keys(data);
  const params = cols.map((_, i) => `$${i + 1}`);
  const r = await client.queryObject(
    `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${params.join(", ")}) RETURNING *`,
    Object.values(data),
  );
  return r.rows[0];
}

async function updateRow(client: Client, table: string, id: string, data: Record<string, unknown>) {
  const cols = Object.keys(data);
  if (cols.length === 0) throw new HttpError(400, "Nothing to update.");
  const sets = cols.map((c, i) => `${c} = $${i + 2}`);
  const r = await client.queryObject(
    `UPDATE ${table} SET ${sets.join(", ")}, updated_at = now() WHERE id = $1 RETURNING *`,
    [id, ...Object.values(data)],
  );
  if (r.rows.length === 0) throw new HttpError(404, "Record not found.");
  return r.rows[0];
}

async function deleteRow(client: Client, table: string, id: string) {
  const r = await client.queryObject(`DELETE FROM ${table} WHERE id = $1 RETURNING id`, [id]);
  if (r.rows.length === 0) throw new HttpError(404, "Record not found.");
}

// ---------- field definitions ----------
const TASK_FIELDS: Fields = {
  title: (v) => str(v, 300),
  description: (v) => str(v),
  status: oneOf(TASK_STATUSES, "Status"),
  priority: oneOf(PRIORITIES, "Priority"),
  due_date: date,
  assignee_id: uuid,
  lead_id: uuid,
  client_id: uuid,
};
const CLIENT_FIELDS: Fields = {
  name: (v) => str(v, 200),
  company: (v) => str(v, 200),
  email: (v) => str(v, 320),
  phone: (v) => str(v, 60),
  website: (v) => str(v, 500),
  plan_id: uuid,
  plan_status: oneOf(CLIENT_STATUSES, "Plan status"),
  start_date: date,
  renewal_date: date,
  monthly_value: num,
  owner_id: uuid,
  notes: (v) => str(v),
};
const PLAN_FIELDS: Fields = {
  name: (v) => str(v, 120),
  description: (v) => str(v, 2000),
  price: num,
  currency: (v) => (v === undefined ? undefined : String(v || "USD").toUpperCase().slice(0, 3)),
  billing_period: oneOf(PLAN_PERIODS, "Billing period"),
  features: (v) => {
    if (v === undefined) return undefined;
    const list = Array.isArray(v) ? v : String(v ?? "").split("\n");
    return JSON.stringify(list.map((x) => String(x).trim()).filter(Boolean).slice(0, 50));
  },
  service_ids: (v) => {
    if (v === undefined) return undefined;
    const list = Array.isArray(v) ? v : [];
    return list.map((x) => requireId(x));
  },
  is_active: bool,
  sort_order: num,
};
const SERVICE_FIELDS: Fields = {
  slug: (v) => (v === undefined ? undefined : slugify(String(v ?? ""))),
  name: (v) => str(v, 160),
  category: (v) => str(v, 80),
  short_description: (v) => str(v, 300),
  description: (v) => str(v),
  is_active: bool,
  sort_order: num,
};

// ---------- actions ----------
type Ctx = { client: Client; adminId: string; body: Record<string, unknown> };
type Handler = (ctx: Ctx) => Promise<unknown>;

const actions: Record<string, Handler> = {
  // Dashboard KPIs
  "summary": async ({ client }) => {
    const leads = await client.queryObject<{ status: string; n: number }>(
      "SELECT COALESCE(NULLIF(lower(status), ''), 'new') AS status, count(*)::int AS n FROM leads GROUP BY 1",
    );
    const t = await client.queryObject<Record<string, number>>(`
      SELECT
        count(*) FILTER (WHERE status <> 'done')::int AS open_tasks,
        count(*) FILTER (WHERE status <> 'done' AND due_date < CURRENT_DATE)::int AS overdue_tasks,
        count(*) FILTER (WHERE status <> 'done' AND due_date = CURRENT_DATE)::int AS due_today
      FROM amz_crm.tasks`);
    const c = await client.queryObject<Record<string, number>>(`
      SELECT
        count(*) FILTER (WHERE plan_status IN ('active','trial'))::int AS active_clients,
        COALESCE(sum(monthly_value) FILTER (WHERE plan_status = 'active'), 0)::float AS mrr,
        count(*) FILTER (WHERE plan_status = 'active' AND renewal_date BETWEEN CURRENT_DATE AND CURRENT_DATE + 30)::int AS renewals_30d
      FROM amz_crm.clients`);
    const follow = await client.queryObject<{ n: number }>(
      "SELECT count(*)::int AS n FROM amz_crm.lead_meta WHERE next_follow_up <= CURRENT_DATE",
    );
    return {
      leadsByStage: Object.fromEntries(leads.rows.map((r) => [r.status, r.n])),
      ...t.rows[0],
      ...c.rows[0],
      followUpsDue: follow.rows[0]?.n ?? 0,
    };
  },

  // Lead pipeline (reads public.leads, extra fields in amz_crm.lead_meta)
  "leads.list": async ({ client, body }) => {
    const limit = Math.min(Number(body.limit) || 500, 2000);
    const r = await client.queryObject(
      `SELECT l.id, l.name, l.email, l.phone, l.company, l.brand_name, l.website_url, l.amazon_store_url,
              l.source, COALESCE(NULLIF(lower(l.status), ''), 'new') AS status, l.notes, l.lead_number, l.audit_type,
              l.current_spend, l.goals, l.created_at, l.updated_at,
              m.owner_id, m.next_follow_up, m.deal_value, u.full_name AS owner_name, u.email AS owner_email,
              (SELECT count(*)::int FROM amz_crm.tasks t WHERE t.lead_id = l.id AND t.status <> 'done') AS open_tasks,
              (SELECT c.id FROM amz_crm.clients c WHERE c.lead_id = l.id LIMIT 1) AS client_id
         FROM leads l
         LEFT JOIN amz_crm.lead_meta m ON m.lead_id = l.id
         LEFT JOIN users u ON u.id = m.owner_id
        ORDER BY l.created_at DESC
        LIMIT $1`,
      [limit],
    );
    return { leads: r.rows, stages: LEAD_STAGES };
  },
  "leads.update": async ({ client, body }) => {
    const id = requireId(body.id);
    const status = oneOf(LEAD_STAGES, "Stage")(body.status);
    const notes = str(body.notes);
    if (status !== undefined || notes !== undefined) {
      const sets: string[] = [];
      const vals: unknown[] = [id];
      if (status !== undefined) { vals.push(status); sets.push(`status = $${vals.length}`); }
      if (notes !== undefined) { vals.push(notes); sets.push(`notes = $${vals.length}`); }
      const r = await client.queryObject(`UPDATE leads SET ${sets.join(", ")}, updated_at = now() WHERE id = $1 RETURNING id`, vals);
      if (r.rows.length === 0) throw new HttpError(404, "Lead not found.");
    }
    const meta = pick(body, { owner_id: uuid, next_follow_up: date, deal_value: num });
    if (Object.keys(meta).length) {
      const cols = Object.keys(meta);
      await client.queryObject(
        `INSERT INTO amz_crm.lead_meta (lead_id, ${cols.join(", ")}) VALUES ($1, ${cols.map((_, i) => `$${i + 2}`).join(", ")})
         ON CONFLICT (lead_id) DO UPDATE SET ${cols.map((c) => `${c} = EXCLUDED.${c}`).join(", ")}, updated_at = now()`,
        [id, ...Object.values(meta)],
      );
    }
    return { success: true };
  },
  "leads.convert": async ({ client, body, adminId }) => {
    const id = requireId(body.id);
    const existing = await client.queryObject<{ id: string }>("SELECT id FROM amz_crm.clients WHERE lead_id = $1", [id]);
    if (existing.rows.length) throw new HttpError(409, "This lead is already a client.");
    const l = await client.queryObject<Record<string, string>>(
      "SELECT name, company, brand_name, email, phone, website_url, amazon_store_url FROM leads WHERE id = $1", [id],
    );
    const lead = l.rows[0];
    if (!lead) throw new HttpError(404, "Lead not found.");
    const extra = pick(body, { plan_id: uuid, monthly_value: num, start_date: date, renewal_date: date });
    const row = await insertRow(client, "amz_crm.clients", {
      name: lead.name || lead.email,
      company: lead.company || lead.brand_name || null,
      email: lead.email || null,
      phone: lead.phone || null,
      website: lead.website_url || lead.amazon_store_url || null,
      lead_id: id,
      owner_id: adminId,
      start_date: new Date().toISOString().slice(0, 10),
      ...extra,
    });
    await client.queryObject("UPDATE leads SET status = 'won', updated_at = now() WHERE id = $1", [id]);
    return { client: row };
  },

  // Tasks
  "tasks.list": async ({ client }) => {
    const r = await client.queryObject(
      `SELECT t.*, u.full_name AS assignee_name, u.email AS assignee_email,
              l.name AS lead_name, c.name AS client_name
         FROM amz_crm.tasks t
         LEFT JOIN users u ON u.id = t.assignee_id
         LEFT JOIN leads l ON l.id = t.lead_id
         LEFT JOIN amz_crm.clients c ON c.id = t.client_id
        ORDER BY (t.status = 'done'), t.due_date NULLS LAST, t.created_at DESC
        LIMIT 1000`,
    );
    return { tasks: r.rows };
  },
  "tasks.create": async ({ client, body, adminId }) => {
    const data = pick(body, TASK_FIELDS);
    if (!data.title) throw new HttpError(400, "Give the task a title.");
    return { task: await insertRow(client, "amz_crm.tasks", { ...data, created_by: adminId }) };
  },
  "tasks.update": async ({ client, body }) => {
    const id = requireId(body.id);
    const data = pick(body, TASK_FIELDS);
    if (data.title === null) throw new HttpError(400, "Give the task a title.");
    if (data.status !== undefined) {
      const done = data.status === "done";
      const row = await updateRow(client, "amz_crm.tasks", id, data);
      await client.queryObject(
        `UPDATE amz_crm.tasks SET completed_at = ${done ? "COALESCE(completed_at, now())" : "NULL"} WHERE id = $1`, [id],
      );
      return { task: row };
    }
    return { task: await updateRow(client, "amz_crm.tasks", id, data) };
  },
  "tasks.delete": async ({ client, body }) => {
    await deleteRow(client, "amz_crm.tasks", requireId(body.id));
    return { success: true };
  },

  // Clients
  "clients.list": async ({ client }) => {
    const r = await client.queryObject(
      `SELECT c.*, p.name AS plan_name, p.billing_period, u.full_name AS owner_name, u.email AS owner_email,
              (SELECT count(*)::int FROM amz_crm.tasks t WHERE t.client_id = c.id AND t.status <> 'done') AS open_tasks
         FROM amz_crm.clients c
         LEFT JOIN amz_crm.subscription_plans p ON p.id = c.plan_id
         LEFT JOIN users u ON u.id = c.owner_id
        ORDER BY c.created_at DESC`,
    );
    return { clients: r.rows };
  },
  "clients.create": async ({ client, body }) => {
    const data = pick(body, CLIENT_FIELDS);
    if (!data.name) throw new HttpError(400, "Enter the client's name.");
    return { client: await insertRow(client, "amz_crm.clients", data) };
  },
  "clients.update": async ({ client, body }) => {
    const data = pick(body, CLIENT_FIELDS);
    if (data.name === null) throw new HttpError(400, "Enter the client's name.");
    return { client: await updateRow(client, "amz_crm.clients", requireId(body.id), data) };
  },
  "clients.delete": async ({ client, body }) => {
    await deleteRow(client, "amz_crm.clients", requireId(body.id));
    return { success: true };
  },

  // Subscription plans (internal)
  "plans.list": async ({ client }) => {
    const r = await client.queryObject(
      `SELECT p.*,
              (SELECT count(*)::int FROM amz_crm.clients c WHERE c.plan_id = p.id AND c.plan_status IN ('active','trial')) AS active_clients,
              (SELECT COALESCE(sum(c.monthly_value), 0)::float FROM amz_crm.clients c WHERE c.plan_id = p.id AND c.plan_status = 'active') AS mrr
         FROM amz_crm.subscription_plans p
        ORDER BY p.sort_order, p.created_at`,
    );
    return { plans: r.rows };
  },
  "plans.create": async ({ client, body }) => {
    const data = pick(body, PLAN_FIELDS);
    if (!data.name) throw new HttpError(400, "Give the plan a name.");
    return { plan: await insertRow(client, "amz_crm.subscription_plans", data) };
  },
  "plans.update": async ({ client, body }) => {
    const data = pick(body, PLAN_FIELDS);
    if (data.name === null) throw new HttpError(400, "Give the plan a name.");
    return { plan: await updateRow(client, "amz_crm.subscription_plans", requireId(body.id), data) };
  },
  "plans.delete": async ({ client, body }) => {
    await deleteRow(client, "amz_crm.subscription_plans", requireId(body.id));
    return { success: true };
  },

  // Services catalog
  "services.list": async ({ client }) => {
    const r = await client.queryObject("SELECT * FROM amz_crm.services ORDER BY sort_order, name");
    return { services: r.rows };
  },
  "services.create": async ({ client, body }) => {
    const data = pick(body, SERVICE_FIELDS);
    if (!data.name) throw new HttpError(400, "Give the service a name.");
    if (!data.slug) data.slug = slugify(String(data.name));
    try {
      return { service: await insertRow(client, "amz_crm.services", data) };
    } catch (e) {
      if (String(e).includes("duplicate key")) throw new HttpError(409, "Another service already uses that URL slug.");
      throw e;
    }
  },
  "services.update": async ({ client, body }) => {
    const data = pick(body, SERVICE_FIELDS);
    if (data.name === null) throw new HttpError(400, "Give the service a name.");
    try {
      return { service: await updateRow(client, "amz_crm.services", requireId(body.id), data) };
    } catch (e) {
      if (String(e).includes("duplicate key")) throw new HttpError(409, "Another service already uses that URL slug.");
      throw e;
    }
  },
  "services.delete": async ({ client, body }) => {
    const id = requireId(body.id);
    await client.queryObject(
      "UPDATE amz_crm.subscription_plans SET service_ids = array_remove(service_ids, $1::uuid) WHERE $1::uuid = ANY(service_ids)", [id],
    );
    await deleteRow(client, "amz_crm.services", id);
    return { success: true };
  },

  // Team users (public.users + public.user_roles)
  "users.list": async ({ client }) => {
    const r = await client.queryObject(
      `SELECT u.id, u.email, u.full_name, u.created_at, COALESCE(ur.role, 'user') AS role,
              (SELECT count(*)::int FROM amz_crm.tasks t WHERE t.assignee_id = u.id AND t.status <> 'done') AS open_tasks
         FROM users u LEFT JOIN user_roles ur ON ur.user_id = u.id
        ORDER BY u.created_at`,
    );
    return { users: r.rows };
  },
  "users.create": async ({ client, body }) => {
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const role = oneOf(ROLES, "Role")(body.role ?? "user");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Enter a valid email address.");
    if (password.length < 8) throw new HttpError(400, "Passwords need at least 8 characters.");
    const exists = await client.queryObject("SELECT 1 FROM users WHERE lower(email) = $1", [email]);
    if (exists.rows.length) throw new HttpError(409, "A user with that email already exists.");
    // One statement, so the user and their role are saved together or not at all.
    const u = await client.queryObject<{ id: string }>(
      `WITH u AS (
         INSERT INTO users (email, password_hash, full_name, created_at, updated_at)
         VALUES ($1, $2, $3, now(), now()) RETURNING id, email, full_name, created_at
       ), r AS (
         INSERT INTO user_roles (user_id, role, created_at, updated_at) SELECT id, $4, now(), now() FROM u
       )
       SELECT * FROM u`,
      [email, await hashPassword(password), str(body.full_name, 200) ?? null, role],
    );
    return { user: { ...u.rows[0], role } };
  },
  "users.set_role": async ({ client, body, adminId }) => {
    const id = requireId(body.id);
    const role = oneOf(ROLES, "Role")(body.role) as string;
    if (id === adminId && role !== "admin") throw new HttpError(400, "You can't remove your own admin access.");
    const r = await client.queryObject("UPDATE user_roles SET role = $2, updated_at = now() WHERE user_id = $1 RETURNING user_id", [id, role]);
    if (r.rows.length === 0) {
      await client.queryObject("INSERT INTO user_roles (user_id, role, created_at, updated_at) VALUES ($1, $2, now(), now())", [id, role]);
    }
    return { success: true };
  },
  "users.set_password": async ({ client, body }) => {
    const id = requireId(body.id);
    const password = String(body.password ?? "");
    if (password.length < 8) throw new HttpError(400, "Passwords need at least 8 characters.");
    const r = await client.queryObject("UPDATE users SET password_hash = $2, updated_at = now() WHERE id = $1 RETURNING id",
      [id, await hashPassword(password)]);
    if (r.rows.length === 0) throw new HttpError(404, "User not found.");
    return { success: true };
  },
  "users.delete": async ({ client, body, adminId }) => {
    const id = requireId(body.id);
    if (id === adminId) throw new HttpError(400, "You can't delete your own account.");
    // One statement, so a failed delete leaves the user, their role and their assignments untouched.
    try {
      const r = await client.queryObject(
        `WITH t AS (UPDATE amz_crm.tasks SET assignee_id = NULL WHERE assignee_id = $1),
              c AS (UPDATE amz_crm.clients SET owner_id = NULL WHERE owner_id = $1),
              m AS (UPDATE amz_crm.lead_meta SET owner_id = NULL WHERE owner_id = $1),
              ur AS (DELETE FROM user_roles WHERE user_id = $1)
         DELETE FROM users WHERE id = $1 RETURNING id`, [id]);
      if (r.rows.length === 0) throw new HttpError(404, "User not found.");
    } catch (e) {
      if (e instanceof HttpError) throw e;
      throw new HttpError(409, "This user is linked to other records and can't be deleted. Change their role to user instead.");
    }
    return { success: true };
  },
};


/** Handle one CRM request. Returns the HTTP status and JSON body. */
export async function handleCrm(db: Db, opts: { action: string; body: Record<string, unknown>; token: string; jwtSecret?: string }) {
  try {
    const handler = actions[opts.action];
    if (!handler) return { status: 400, body: { error: `Unknown action "${opts.action}".` } };
    const client = wrap(db);
    const adminId = await requireAdmin(db, opts.token, opts.jwtSecret);
    await ensureTables(client);
    return { status: 200, body: await handler({ client, adminId, body: opts.body }) };
  } catch (e) {
    if (e instanceof HttpError) return { status: e.status, body: { error: e.message } };
    console.warn("crm error:", e);
    return { status: 500, body: { error: "Something went wrong on the server. Try again." } };
  }
}

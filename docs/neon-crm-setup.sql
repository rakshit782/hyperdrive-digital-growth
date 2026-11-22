-- Dashboard CRM tables (schema amz_crm). Normally you DON'T need this: the website creates the
-- schema and tables itself the first time the CRM opens, because its database user (neondb_owner)
-- owns the database. Run this in the Neon SQL Editor only if the dashboard says the CRM tables
-- haven't been set up.
--
-- Why not amz_app: that schema is owned by "website-admin", and neondb_owner can't create tables in it.
CREATE SCHEMA IF NOT EXISTS amz_crm AUTHORIZATION neondb_owner;

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

-- Give the website's database user access to read and write these tables.
GRANT USAGE ON SCHEMA amz_crm TO neondb_owner;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA amz_crm TO neondb_owner;
ALTER DEFAULT PRIVILEGES IN SCHEMA amz_crm GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO neondb_owner;

-- Check: should list clients, lead_meta, services, subscription_plans, tasks.
SELECT table_name FROM information_schema.tables WHERE table_schema = 'amz_crm' ORDER BY 1;

-- Certificates stay in amz_app.internship_certificates (owned by website-admin). If the dashboard's
-- Certificates page says "permission denied", sign in to the SQL Editor as website-admin and run:
--   GRANT USAGE ON SCHEMA amz_app TO neondb_owner;
--   GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA amz_app TO neondb_owner;

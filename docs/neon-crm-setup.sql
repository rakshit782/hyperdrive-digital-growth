-- One-time setup for the dashboard CRM (and certificates) tables in schema amz_app.
-- Run in the Neon console: SQL Editor, database "website".
--
-- Why: the website's database user (the one in Vercel's NEON_DATABASE_URL) is not allowed to
-- create tables in amz_app, so the CRM can't create its own tables. This script creates them
-- once and gives that user access.
--
-- Step 0 (optional): see who owns amz_app and which user you're running as.
--   SELECT nspowner::regrole AS amz_app_owner, current_user AS you FROM pg_namespace WHERE nspname = 'amz_app';
-- If this script fails with "permission denied", pick the amz_app owner in the SQL Editor's
-- role dropdown and run it again.
--
-- Replace neondb_owner below if your NEON_DATABASE_URL uses a different user
-- (it's the part right after postgresql:// and before the colon).

CREATE SCHEMA IF NOT EXISTS amz_app;

CREATE TABLE IF NOT EXISTS amz_app.services (
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

CREATE TABLE IF NOT EXISTS amz_app.subscription_plans (
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

CREATE TABLE IF NOT EXISTS amz_app.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  lead_id UUID,
  plan_id UUID REFERENCES amz_app.subscription_plans(id) ON DELETE SET NULL,
  plan_status TEXT NOT NULL DEFAULT 'active',
  start_date DATE,
  renewal_date DATE,
  monthly_value NUMERIC(12,2),
  owner_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS amz_app.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_date DATE,
  assignee_id UUID,
  lead_id UUID,
  client_id UUID REFERENCES amz_app.clients(id) ON DELETE CASCADE,
  created_by UUID,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS amz_app.lead_meta (
  lead_id UUID PRIMARY KEY,
  owner_id UUID,
  next_follow_up DATE,
  deal_value NUMERIC(12,2),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

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
);

CREATE INDEX IF NOT EXISTS tasks_assignee_idx ON amz_app.tasks (assignee_id);
CREATE INDEX IF NOT EXISTS tasks_status_idx ON amz_app.tasks (status);
CREATE INDEX IF NOT EXISTS clients_plan_idx ON amz_app.clients (plan_id);

-- Give the website's database user access to read and write these tables.
GRANT USAGE ON SCHEMA amz_app TO neondb_owner;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA amz_app TO neondb_owner;
ALTER DEFAULT PRIVILEGES IN SCHEMA amz_app GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO neondb_owner;

-- Check: should list services, subscription_plans, clients, tasks, lead_meta, internship_certificates.
SELECT table_name FROM information_schema.tables WHERE table_schema = 'amz_app' ORDER BY 1;

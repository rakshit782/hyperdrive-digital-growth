-- Neon DB Schema for Authentication and App Data
-- Run this SQL in your Neon DB dashboard

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Case studies managed from the admin dashboard.
-- Idempotent copy: neon-migrations/2026-10-04-case-studies.sql
CREATE TABLE IF NOT EXISTS amz_app.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  brand_name text NOT NULL,
  channel text NOT NULL,
  category text,
  logo_url text,
  challenge text,
  solution text,
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  time_period text,
  testimonial_quote text,
  testimonial_author text,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT case_studies_slug_format CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CONSTRAINT case_studies_brand_name_len CHECK (char_length(brand_name) BETWEEN 1 AND 120),
  CONSTRAINT case_studies_channel_check CHECK (channel IN ('amazon', 'walmart', 'meta', 'google', 'shopify')),
  CONSTRAINT case_studies_category_len CHECK (category IS NULL OR char_length(category) <= 120),
  CONSTRAINT case_studies_logo_url_check CHECK (
    logo_url IS NULL OR (char_length(logo_url) <= 500 AND logo_url ~ '^https://')
  ),
  CONSTRAINT case_studies_challenge_len CHECK (challenge IS NULL OR char_length(challenge) <= 4000),
  CONSTRAINT case_studies_solution_len CHECK (solution IS NULL OR char_length(solution) <= 4000),
  CONSTRAINT case_studies_time_period_len CHECK (time_period IS NULL OR char_length(time_period) <= 80),
  CONSTRAINT case_studies_quote_len CHECK (testimonial_quote IS NULL OR char_length(testimonial_quote) <= 1000),
  CONSTRAINT case_studies_author_len CHECK (testimonial_author IS NULL OR char_length(testimonial_author) <= 120),
  CONSTRAINT case_studies_results_array CHECK (
    jsonb_typeof(results) = 'array' AND jsonb_array_length(results) <= 6
  )
);

CREATE INDEX IF NOT EXISTS idx_case_studies_published_sort
  ON amz_app.case_studies (published, sort_order);

-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  billing_period TEXT DEFAULT 'monthly',
  features JSONB DEFAULT '[]'::jsonb,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table (if not exists)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  form_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table (if not exists)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  source TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  lead_number TEXT,
  audit_type TEXT,
  website_url TEXT,
  current_spend TEXT,
  goals TEXT,
  lead_data JSONB DEFAULT '{}'::jsonb,
  form_security JSONB DEFAULT '{}'::jsonb,
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_emails table (if not exists)
CREATE TABLE IF NOT EXISTS newsletter_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  status TEXT NOT NULL DEFAULT 'subscribed',
  source TEXT DEFAULT 'website',
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create security_logs table (if not exists)
CREATE TABLE IF NOT EXISTS security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  user_id UUID,
  ip_address INET,
  user_agent TEXT,
  event_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_active ON pricing_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_emails_email ON newsletter_emails(email);

-- Create admin user. Login uses SHA-256 hashing (see neon-auth-login/signup functions).
-- Hash below = SHA-256 of 'Rakshit@@1234'
INSERT INTO users (email, password_hash, full_name)
VALUES ('rakshit@amzadscout.com', '6b54031250ed150b4e6bd9c3c5e3842289fccb82bcfed46fcb702f4b9d7272c6', 'Rakshit')
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Grant admin role to the user (update after user is created)
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'
FROM users 
WHERE email = 'rakshit@amzadscout.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Internship certificates (run this in your Neon SQL editor)
CREATE TABLE IF NOT EXISTS internship_certificates (
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

-- Singleton site settings for the public rating badge. Safe to re-run.
CREATE TABLE IF NOT EXISTS amz_app.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  rating_value NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating_value >= 0 AND rating_value <= 5),
  review_count INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  review_source_url TEXT NULL CHECK (review_source_url IS NULL OR review_source_url LIKE 'https://%'),
  rating_visible BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO amz_app.site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

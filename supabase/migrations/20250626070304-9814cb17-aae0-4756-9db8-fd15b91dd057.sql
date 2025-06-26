
-- Create tables for contact management
CREATE TABLE IF NOT EXISTS public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  business_hours JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for blog management
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for pricing management
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  billing_period TEXT DEFAULT 'monthly' CHECK (billing_period IN ('monthly', 'yearly', 'one-time')),
  features JSONB DEFAULT '[]'::jsonb,
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for FAQ management
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for website settings
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  setting_type TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for analytics tracking
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  page_url TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for lead management
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  source TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes TEXT,
  lead_data JSONB DEFAULT '{}'::jsonb,
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for integration settings
CREATE TABLE IF NOT EXISTS public.integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_type TEXT NOT NULL,
  integration_name TEXT NOT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT FALSE,
  api_keys JSONB DEFAULT '{}'::jsonb,
  webhook_url TEXT,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(integration_type, integration_name)
);

-- Create tables for user management and roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin access
CREATE POLICY "Admin access to contact_info" ON public.contact_info FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin access to blog_posts" ON public.blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'editor'))
);

CREATE POLICY "Admin access to pricing_plans" ON public.pricing_plans FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin access to faqs" ON public.faqs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'editor'))
);

CREATE POLICY "Admin access to website_settings" ON public.website_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin access to analytics_events" ON public.analytics_events FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin access to leads" ON public.leads FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'editor'))
);

CREATE POLICY "Admin access to integrations" ON public.integrations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Users can manage their own roles" ON public.user_roles FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admin can manage all roles" ON public.user_roles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Insert default data
INSERT INTO public.website_settings (setting_key, setting_value, setting_type) VALUES
('hero_settings', '{"headline":{"main":"Scale Your Business","highlight":"With Precision","subtitle":""},"description":"Transform your advertising performance with our data-driven strategies across Amazon, Walmart, and Meta platforms","cta":{"primary":{"text":"Get Free Strategy Call","link":"/free-audit","enabled":true},"secondary":{"text":"Watch Case Study","link":"/case-studies","enabled":true}},"stats":{"enabled":true,"stat1":{"value":"500+","label":"Campaigns Managed"},"stat2":{"value":"$50M+","label":"Ad Spend Managed"},"stat3":{"value":"300%","label":"Avg ROI Increase"},"stat4":{"value":"24/7","label":"Account Monitoring"}}}', 'hero'),
('contact_info', '{"company_name":"Your Agency","phone":"+1 (555) 123-4567","email":"contact@youragency.com","address":"123 Business St, City, State 12345","social_links":{"facebook":"","twitter":"","linkedin":"","instagram":""},"business_hours":{"monday":"9:00 AM - 6:00 PM","tuesday":"9:00 AM - 6:00 PM","wednesday":"9:00 AM - 6:00 PM","thursday":"9:00 AM - 6:00 PM","friday":"9:00 AM - 6:00 PM","saturday":"Closed","sunday":"Closed"}}', 'contact'),
('seo_settings', '{"meta_title":"Expert Amazon, Walmart & Meta Advertising Agency","meta_description":"Leading advertising agency specializing in Amazon PPC, Walmart Connect, and Meta ads. Boost your ROI with our proven strategies.","keywords":"Amazon advertising, Walmart advertising, Meta ads, PPC management","og_image":"","twitter_card":"summary_large_image"}', 'seo')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default pricing plans
INSERT INTO public.pricing_plans (name, description, price, billing_period, features, is_popular, sort_order) VALUES
('Starter', 'Perfect for small businesses starting their advertising journey', 997.00, 'monthly', '["Amazon PPC Management", "Basic Reporting", "Monthly Optimization", "Email Support"]', false, 1),
('Professional', 'Ideal for growing businesses looking to scale', 1997.00, 'monthly', '["Multi-Platform Management", "Advanced Analytics", "Weekly Optimization", "Dedicated Account Manager", "A/B Testing"]', true, 2),
('Enterprise', 'Comprehensive solution for large-scale operations', 3997.00, 'monthly', '["Full-Service Management", "Custom Reporting", "Daily Optimization", "Priority Support", "Strategic Consulting", "Custom Integrations"]', false, 3)
ON CONFLICT DO NOTHING;

-- Insert default FAQs
INSERT INTO public.faqs (question, answer, category, sort_order) VALUES
('How quickly can I see results?', 'Most clients see initial improvements within 2-4 weeks, with significant results typically achieved within 60-90 days of campaign optimization.', 'General', 1),
('What platforms do you manage?', 'We specialize in Amazon PPC, Walmart Connect, and Meta (Facebook/Instagram) advertising platforms, providing comprehensive cross-platform strategies.', 'Services', 2),
('Do you require long-term contracts?', 'No, we work on a month-to-month basis. We believe in earning your business through results, not binding contracts.', 'Pricing', 3),
('How do you measure success?', 'We track key metrics including ROAS (Return on Ad Spend), conversion rates, cost per acquisition, and overall revenue growth to measure campaign success.', 'Results', 4)
ON CONFLICT DO NOTHING;


-- Create newsletter_emails table
CREATE TABLE IF NOT EXISTS public.newsletter_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
  source TEXT DEFAULT 'website',
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tracking_scripts table
CREATE TABLE IF NOT EXISTS public.tracking_scripts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  script TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'head' CHECK (location IN ('head', 'body', 'footer')),
  pages TEXT NOT NULL DEFAULT 'all' CHECK (pages IN ('all', 'selected')),
  selected_pages TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner_images table
CREATE TABLE IF NOT EXISTS public.partner_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clientele_logos table
CREATE TABLE IF NOT EXISTS public.clientele_logos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cta_data table
CREATE TABLE IF NOT EXISTS public.cta_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  primary_button_text TEXT NOT NULL,
  primary_button_link TEXT NOT NULL,
  secondary_button_text TEXT,
  secondary_button_link TEXT,
  show_secondary_button BOOLEAN DEFAULT true,
  background_style TEXT DEFAULT 'gradient',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  trigger_event TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_settings table
CREATE TABLE IF NOT EXISTS public.email_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  smtp_host TEXT NOT NULL,
  smtp_port INTEGER NOT NULL,
  smtp_secure BOOLEAN NOT NULL DEFAULT true,
  smtp_user TEXT NOT NULL,
  smtp_pass TEXT NOT NULL,
  from_email TEXT NOT NULL,
  from_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create configuration tables for various settings
CREATE TABLE IF NOT EXISTS public.facebook_pixel_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pixel_id TEXT NOT NULL,
  access_token TEXT,
  test_event_code TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.clerk_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  publishable_key TEXT NOT NULL,
  sign_in_url TEXT DEFAULT '/sign-in',
  sign_up_url TEXT DEFAULT '/sign-up',
  after_sign_in_url TEXT DEFAULT '/',
  after_sign_up_url TEXT DEFAULT '/',
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.auth0_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL,
  client_id TEXT NOT NULL,
  redirect_uri TEXT NOT NULL,
  audience TEXT,
  scope TEXT NOT NULL DEFAULT 'openid profile email',
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.newsletter_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientele_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cta_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facebook_pixel_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clerk_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth0_config ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and authenticated user management
CREATE POLICY "Allow public read access to newsletter emails" ON public.newsletter_emails FOR SELECT USING (true);
CREATE POLICY "Allow public insert to newsletter emails" ON public.newsletter_emails FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to manage newsletter emails" ON public.newsletter_emails FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to tracking scripts" ON public.tracking_scripts FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage tracking scripts" ON public.tracking_scripts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to partner images" ON public.partner_images FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage partner images" ON public.partner_images FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to clientele logos" ON public.clientele_logos FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage clientele logos" ON public.clientele_logos FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to CTA data" ON public.cta_data FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage CTA data" ON public.cta_data FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage email templates" ON public.email_templates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage email settings" ON public.email_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to facebook pixel config" ON public.facebook_pixel_config FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage facebook pixel config" ON public.facebook_pixel_config FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to clerk config" ON public.clerk_config FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage clerk config" ON public.clerk_config FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to auth0 config" ON public.auth0_config FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated users to manage auth0 config" ON public.auth0_config FOR ALL USING (auth.role() = 'authenticated');

-- Insert default CTA data
INSERT INTO public.cta_data (title, subtitle, description, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, show_secondary_button, background_style, is_active)
VALUES (
  'Ready to Scale Your Business?',
  'Get Your Free Strategy Session Today',
  'Join hundreds of successful e-commerce businesses that have transformed their advertising results with our expert team. Let''s discuss how we can help you achieve your growth goals.',
  'Get Free Strategy Call',
  '/free-audit',
  'View Case Studies',
  '/case-studies',
  true,
  'gradient',
  true
) ON CONFLICT DO NOTHING;

-- Insert default partner images
INSERT INTO public.partner_images (name, image_url, is_active, sort_order) VALUES
('TechPartner', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center', true, 1),
('InnovatePartner', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center', true, 2),
('GlobalPartner', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center', true, 3),
('FuturePartner', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop&crop=center', true, 4),
('BusinessPartner', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=100&fit=crop&crop=center', true, 5),
('ProPartner', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center', true, 6)
ON CONFLICT DO NOTHING;

-- Insert default clientele logos
INSERT INTO public.clientele_logos (name, image_url, is_active, sort_order) VALUES
('TechCorp', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center', true, 1),
('InnovateLabs', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center', true, 2),
('GlobalSolutions', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center', true, 3),
('FutureTech', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop&crop=center', true, 4),
('StartupHub', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=100&fit=crop&crop=center', true, 5),
('BusinessPro', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center', true, 6)
ON CONFLICT DO NOTHING;


-- Create table for About page content
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL,
  title TEXT,
  content TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for SEO data management
CREATE TABLE public.seo_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  page_name TEXT NOT NULL,
  title_tag TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  schema_type TEXT DEFAULT 'WebPage',
  schema_data JSONB,
  robots_index BOOLEAN DEFAULT true,
  robots_follow BOOLEAN DEFAULT true,
  include_in_sitemap BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for global SEO settings
CREATE TABLE public.seo_global_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default About page sections
INSERT INTO public.about_content (section_name, title, content, sort_order) VALUES
('hero', 'About Us', 'We are a leading advertising agency specializing in Amazon PPC, Walmart Connect, and Meta ads.', 1),
('mission', 'Our Mission', 'To help businesses grow through strategic advertising and data-driven marketing solutions.', 2),
('team', 'Our Team', 'Our team of experts brings years of experience in digital marketing and advertising.', 3),
('values', 'Our Values', 'Innovation, integrity, and results-driven approach define our core values.', 4);

-- Insert default SEO pages
INSERT INTO public.seo_pages (page_path, page_name, title_tag, meta_description, canonical_url) VALUES
('/', 'Homepage', 'Expert Amazon, Walmart & Meta Advertising Agency | Drive Sales Growth', 'Leading advertising agency specializing in Amazon PPC, Walmart Connect, and Meta ads. Boost your ROI with our proven strategies. Free audit available!', 'https://yourdomain.com/'),
('/about', 'About Us', 'About Our Expert Advertising Agency | Industry Leaders', 'Learn about our team of advertising experts and our mission to help businesses grow through strategic Amazon, Walmart, and Meta advertising solutions.', 'https://yourdomain.com/about'),
('/contact', 'Contact', 'Contact Us - Get Your Free Advertising Audit', 'Ready to scale your business? Contact our team for a free advertising audit and consultation.', 'https://yourdomain.com/contact'),
('/free-audit', 'Free Audit', 'Free Advertising Audit - Get Your $2,000 Analysis', 'Get a comprehensive free audit of your advertising performance across Amazon, Walmart, and Meta platforms. Discover growth opportunities.', 'https://yourdomain.com/free-audit');

-- Insert default global SEO settings
INSERT INTO public.seo_global_settings (setting_key, setting_value, description) VALUES
('robots_txt', '{"content": "User-agent: *\nAllow: /\nSitemap: https://yourdomain.com/sitemap.xml"}', 'Robots.txt file content'),
('sitemap_url', '{"url": "https://yourdomain.com/sitemap.xml"}', 'XML Sitemap URL'),
('google_site_verification', '{"code": ""}', 'Google Search Console verification code'),
('default_og_image', '{"url": ""}', 'Default Open Graph image for pages without specific OG image');

-- Add RLS policies for About content
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to about content" 
  ON public.about_content 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to manage about content" 
  ON public.about_content 
  FOR ALL 
  USING (true);

-- Add RLS policies for SEO pages
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to SEO pages" 
  ON public.seo_pages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to manage SEO pages" 
  ON public.seo_pages 
  FOR ALL 
  USING (true);

-- Add RLS policies for SEO global settings
ALTER TABLE public.seo_global_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to SEO global settings" 
  ON public.seo_global_settings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to manage SEO global settings" 
  ON public.seo_global_settings 
  FOR ALL 
  USING (true);

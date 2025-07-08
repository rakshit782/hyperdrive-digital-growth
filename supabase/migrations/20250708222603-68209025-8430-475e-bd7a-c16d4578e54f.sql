
-- Create service_pages table for storing service page content
CREATE TABLE public.service_pages (
  service_type TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  hero_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create service_cards table for storing service cards
CREATE TABLE public.service_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  gradient TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.service_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for service_pages
CREATE POLICY "Anyone can view active service pages"
  ON public.service_pages
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage service pages"
  ON public.service_pages
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create policies for service_cards
CREATE POLICY "Anyone can view active service cards"
  ON public.service_cards
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage service cards"
  ON public.service_cards
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert default service page data
INSERT INTO public.service_pages (service_type, title, subtitle, description, meta_title, meta_description) VALUES
('meta-advertising', 'Meta Advertising Services', 'Facebook & Instagram Ads Management', 'Drive engagement, increase conversions, and grow your business with targeted social media advertising on Facebook and Instagram.', 'Meta Advertising Services - Facebook & Instagram Ads Management', 'Professional Meta advertising services for Facebook and Instagram. Drive engagement, increase conversions, and grow your business with targeted social media advertising.'),
('amazon-advertising', 'Amazon Advertising Services', 'Amazon PPC & Sponsored Products', 'Maximize your Amazon sales with expert PPC management and sponsored product campaigns.', 'Amazon Advertising Services - PPC & Sponsored Products', 'Professional Amazon advertising services. Maximize your sales with expert PPC management and sponsored product campaigns.'),
('google-advertising', 'Google Advertising Services', 'Google Ads & Search Marketing', 'Reach customers at the right moment with targeted Google Ads campaigns.', 'Google Advertising Services - Google Ads & Search Marketing', 'Professional Google advertising services. Reach customers at the right moment with targeted Google Ads campaigns.'),
('walmart-advertising', 'Walmart Advertising Services', 'Walmart Connect & Sponsored Products', 'Grow your Walmart marketplace presence with strategic advertising campaigns.', 'Walmart Advertising Services - Walmart Connect & Sponsored Products', 'Professional Walmart advertising services. Grow your marketplace presence with strategic advertising campaigns.'),
('account-management', 'Account Management Services', 'Dedicated Account Management', 'Get personalized support and strategic guidance from our dedicated account managers.', 'Account Management Services - Dedicated Account Management', 'Professional account management services. Get personalized support and strategic guidance from our dedicated account managers.'),
('website-development', 'Website Development Services', 'Custom Website Development', 'Create stunning, responsive websites that convert visitors into customers.', 'Website Development Services - Custom Website Development', 'Professional website development services. Create stunning, responsive websites that convert visitors into customers.'),
('shopify-development', 'Shopify Development Services', 'Shopify Store Development', 'Build and optimize your Shopify store for maximum conversions and sales.', 'Shopify Development Services - Shopify Store Development', 'Professional Shopify development services. Build and optimize your Shopify store for maximum conversions and sales.'),
('shopify-integration', 'Shopify Integration Services', 'Shopify Third-party Integrations', 'Seamlessly connect your Shopify store with essential business tools and platforms.', 'Shopify Integration Services - Third-party Integrations', 'Professional Shopify integration services. Seamlessly connect your store with essential business tools and platforms.');

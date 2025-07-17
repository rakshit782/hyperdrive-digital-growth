
-- Create services table to replace local services data
CREATE TABLE IF NOT EXISTS public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  gradient TEXT,
  bg_gradient TEXT,
  link TEXT,
  icon TEXT,
  service_type TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table to replace local reviews data
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  avatar TEXT,
  service_type TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stats table for website statistics
CREATE TABLE IF NOT EXISTS public.stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT NOT NULL UNIQUE,
  stat_value TEXT NOT NULL,
  stat_label TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  category TEXT DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create case_studies table
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  client_name TEXT,
  industry TEXT,
  service_type TEXT NOT NULL,
  results JSONB DEFAULT '{}'::jsonb,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access and authenticated write access
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can view active reviews" ON public.reviews
  FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage reviews" ON public.reviews
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can view active stats" ON public.stats
  FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage stats" ON public.stats
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can view active case studies" ON public.case_studies
  FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can manage case studies" ON public.case_studies
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default services data
INSERT INTO public.services (title, description, features, gradient, bg_gradient, link, icon, service_type) VALUES
('Amazon Advertising', 'Professional Amazon PPC management and optimization', '["PPC Campaign Management", "Keyword Research", "Bid Optimization", "Performance Analytics"]'::jsonb, 'bg-gradient-to-r from-orange-500 to-red-500', 'from-orange-50 to-red-50', '/amazon-advertising', 'ShoppingCart', 'amazon-advertising'),
('Walmart Advertising', 'Strategic Walmart marketplace advertising solutions', '["Walmart Connect", "Sponsored Products", "Brand Stores", "Performance Tracking"]'::jsonb, 'bg-gradient-to-r from-blue-500 to-cyan-500', 'from-blue-50 to-cyan-50', '/walmart-advertising', 'Store', 'walmart-advertising'),
('Meta Advertising', 'Facebook and Instagram advertising campaigns', '["Social Media Ads", "Audience Targeting", "Creative Optimization", "ROI Tracking"]'::jsonb, 'bg-gradient-to-r from-blue-600 to-purple-600', 'from-blue-50 to-purple-50', '/meta-advertising', 'Users', 'meta-advertising'),
('Google Advertising', 'Search and display advertising on Google', '["Search Ads", "Display Network", "YouTube Ads", "Shopping Campaigns"]'::jsonb, 'bg-gradient-to-r from-green-500 to-teal-500', 'from-green-50 to-teal-50', '/google-advertising', 'Search', 'google-advertising'),
('Shopify Development', 'Custom Shopify store development and optimization', '["Store Setup", "Theme Customization", "App Integration", "Performance Optimization"]'::jsonb, 'bg-gradient-to-r from-purple-500 to-pink-500', 'from-purple-50 to-pink-50', '/shopify-development', 'Code', 'shopify-development'),
('Website Development', 'Professional website design and development', '["Responsive Design", "SEO Optimization", "Speed Optimization", "CMS Integration"]'::jsonb, 'bg-gradient-to-r from-indigo-500 to-blue-500', 'from-indigo-50 to-blue-50', '/website-development', 'Globe', 'website-development')
ON CONFLICT DO NOTHING;

-- Insert default reviews data
INSERT INTO public.reviews (name, company, rating, review, service_type) VALUES
('Sarah Johnson', 'TechStart Inc.', 5, 'Exceptional Amazon advertising services! Our sales increased by 300% in just 3 months.', 'amazon-advertising'),
('Mike Chen', 'RetailPro LLC', 5, 'Outstanding Walmart advertising results. Highly recommend their strategic approach.', 'walmart-advertising'),
('Emily Davis', 'Fashion Forward', 5, 'Their Meta advertising campaigns transformed our social media presence completely.', 'meta-advertising'),
('David Wilson', 'Local Services Co.', 5, 'Google advertising expertise helped us dominate local search results.', 'google-advertising'),
('Lisa Brown', 'E-commerce Plus', 5, 'Amazing Shopify development work. Our store looks professional and converts well.', 'shopify-development'),
('John Smith', 'Business Solutions', 5, 'Top-notch website development. Fast, responsive, and SEO-optimized.', 'website-development')
ON CONFLICT DO NOTHING;

-- Insert default stats data
INSERT INTO public.stats (stat_key, stat_value, stat_label, icon, description, category) VALUES
('clients_served', '500+', 'Clients Served', 'Users', 'Happy clients across various industries', 'general'),
('projects_completed', '1000+', 'Projects Completed', 'CheckCircle', 'Successful projects delivered on time', 'general'),
('years_experience', '10+', 'Years Experience', 'Calendar', 'Years of expertise in digital marketing', 'general'),
('roi_average', '300%', 'Average ROI', 'TrendingUp', 'Average return on investment for clients', 'performance')
ON CONFLICT DO NOTHING;

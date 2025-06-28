
-- Create table for service-specific case studies
CREATE TABLE public.service_case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL, -- 'amazon', 'walmart', 'meta', 'shopify-dev', 'shopify-integration'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  client_name TEXT,
  industry TEXT,
  results JSONB NOT NULL DEFAULT '{}', -- Store metrics like ROAS, sales growth, etc.
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for service-specific stats
CREATE TABLE public.service_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL,
  stat_label TEXT NOT NULL,
  stat_value TEXT NOT NULL,
  stat_description TEXT,
  icon_name TEXT, -- lucide icon name
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for service-specific reviews
CREATE TABLE public.service_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL,
  client_name TEXT NOT NULL,
  company TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  avatar_url TEXT,
  results_achieved TEXT, -- Brief description of results
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add Row Level Security (RLS) - These tables should be readable by everyone but only editable by authenticated users
ALTER TABLE public.service_case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_reviews ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Anyone can view active case studies" 
  ON public.service_case_studies 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Anyone can view active stats" 
  ON public.service_stats 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Anyone can view active reviews" 
  ON public.service_reviews 
  FOR SELECT 
  USING (is_active = true);

-- Policies for authenticated users to manage content (for dashboard)
CREATE POLICY "Authenticated users can manage case studies" 
  ON public.service_case_studies 
  FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage stats" 
  ON public.service_stats 
  FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage reviews" 
  ON public.service_reviews 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert some sample data for Amazon advertising
INSERT INTO public.service_case_studies (service_type, title, description, client_name, industry, results) VALUES
('amazon', 'Fashion Brand Scales to $2M Revenue', 'Strategic PPC campaigns and listing optimization that increased Amazon sales by 400% in 6 months.', 'StyleHub Fashion', 'Fashion & Apparel', '{"revenue_increase": "400%", "roas": "5.2x", "conversion_rate": "+180%"}'),
('amazon', 'Electronics Brand Dominates Search', 'Comprehensive keyword strategy that resulted in 300% sales growth and category leadership.', 'TechGear Pro', 'Electronics', '{"sales_growth": "300%", "search_ranking": "#1", "market_share": "+45%"}');

INSERT INTO public.service_stats (service_type, stat_label, stat_value, stat_description, icon_name) VALUES
('amazon', 'Average ROAS', '300%', 'Return on ad spend for our clients', 'TrendingUp'),
('amazon', 'Conversion Rate Boost', '+180%', 'Average improvement in conversion rates', 'Target'),
('amazon', 'Revenue Growth', '+250%', 'Average revenue increase within 90 days', 'DollarSign'),
('amazon', 'Client Retention', '95%', 'Clients who continue working with us', 'Users');

INSERT INTO public.service_reviews (service_type, client_name, company, rating, review_text, results_achieved) VALUES
('amazon', 'Sarah Johnson', 'TechStart Inc.', 5, 'Our Amazon sales increased by 400% in just 3 months. The team expertise in PPC optimization is unmatched.', '400% sales increase'),
('amazon', 'Michael Chen', 'Global Retail Co.', 5, 'Working with this agency was a game-changer. Their strategic approach resulted in 250% ROAS improvement.', '250% ROAS improvement');

-- Insert sample data for other services
INSERT INTO public.service_case_studies (service_type, title, description, client_name, industry, results) VALUES
('walmart', 'Home Goods Brand Walmart Success', 'Walmart Connect advertising strategy that resulted in 280% sales growth.', 'HomeStyle Plus', 'Home & Garden', '{"sales_growth": "280%", "ctr": "+160%", "conversion_rate": "+90%"}'),
('meta', 'Beauty Brand Social Media Win', 'Facebook and Instagram campaigns that drove 320% website traffic increase.', 'Glow Beauty', 'Beauty & Cosmetics', '{"traffic_increase": "320%", "lead_gen": "+400%", "brand_awareness": "+250%"}');

INSERT INTO public.service_stats (service_type, stat_label, stat_value, stat_description, icon_name) VALUES
('walmart', 'Sales Growth', '250%', 'Average sales increase on Walmart', 'ShoppingCart'),
('walmart', 'Click-Through Rate', '+160%', 'Improvement in ad performance', 'MousePointer'),
('meta', 'Lead Generation', '+400%', 'Increase in qualified leads', 'Users'),
('meta', 'Brand Awareness', '+250%', 'Boost in brand recognition', 'Eye');

INSERT INTO public.service_reviews (service_type, client_name, company, rating, review_text, results_achieved) VALUES
('walmart', 'Emily Rodriguez', 'Fashion Forward', 5, 'The Walmart advertising campaigns generated incredible results. Sales tripled within 4 months.', '300% sales growth'),
('meta', 'David Thompson', 'Home Essentials', 5, 'Meta advertising expertise is outstanding. We saw 10,000 new customers in 6 months.', '10,000 new customers');


-- Enable real-time for existing tables
ALTER TABLE public.pricing_plans REPLICA IDENTITY FULL;
ALTER TABLE public.faqs REPLICA IDENTITY FULL;
ALTER TABLE public.service_reviews REPLICA IDENTITY FULL;
ALTER TABLE public.service_case_studies REPLICA IDENTITY FULL;
ALTER TABLE public.service_stats REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.pricing_plans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.faqs; 
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_case_studies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_stats;

-- Create Google Analytics config table
CREATE TABLE public.google_analytics_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  measurement_id TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  enable_enhanced_measurement BOOLEAN NOT NULL DEFAULT true,
  enable_conversion_tracking BOOLEAN NOT NULL DEFAULT true,
  custom_events BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Google Search Console config table
CREATE TABLE public.google_search_console_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_url TEXT NOT NULL,
  verification_code TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Google Tag Manager config table
CREATE TABLE public.google_tag_manager_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  container_id TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.google_analytics_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_search_console_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_tag_manager_config ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for new tables
CREATE POLICY "Allow authenticated users to manage google analytics config" 
  ON public.google_analytics_config FOR ALL 
  USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Allow public read access to google analytics config" 
  ON public.google_analytics_config FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage google search console config" 
  ON public.google_search_console_config FOR ALL 
  USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Allow public read access to google search console config" 
  ON public.google_search_console_config FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage google tag manager config" 
  ON public.google_tag_manager_config FOR ALL 
  USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Allow public read access to google tag manager config" 
  ON public.google_tag_manager_config FOR SELECT 
  USING (is_active = true);

-- Drop form_security_logs table since it's not needed
DROP TABLE IF EXISTS public.form_security_logs CASCADE;

-- Update leads table to ensure proper audit form submission
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS audit_type TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS current_spend TEXT,
ADD COLUMN IF NOT EXISTS goals TEXT;

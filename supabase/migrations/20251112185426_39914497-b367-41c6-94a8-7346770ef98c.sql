-- Add new columns to leads table for brand and marketplace store URLs
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS brand_name TEXT,
ADD COLUMN IF NOT EXISTS amazon_store_url TEXT,
ADD COLUMN IF NOT EXISTS walmart_store_url TEXT;

-- Add comment to explain the new columns
COMMENT ON COLUMN public.leads.brand_name IS 'Brand name of the business';
COMMENT ON COLUMN public.leads.amazon_store_url IS 'Amazon marketplace store URL (optional)';
COMMENT ON COLUMN public.leads.walmart_store_url IS 'Walmart marketplace store URL (optional)';

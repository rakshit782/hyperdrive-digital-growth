-- Add missing columns to leads table for contact form
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS brand_name TEXT,
ADD COLUMN IF NOT EXISTS amazon_store_url TEXT,
ADD COLUMN IF NOT EXISTS walmart_store_url TEXT;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_brand_name ON leads(brand_name);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
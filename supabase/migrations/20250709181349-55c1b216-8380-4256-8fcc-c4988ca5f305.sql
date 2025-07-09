
-- Create storage bucket for lead files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('lead-files', 'lead-files', false);

-- Create RLS policies for lead files bucket
CREATE POLICY "Admin can view all lead files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'lead-files' AND 
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
  )
);

CREATE POLICY "Allow anonymous file upload to lead-files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'lead-files');

CREATE POLICY "Admin can delete lead files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'lead-files' AND 
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
  )
);

-- Add unique lead identifier column
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_number TEXT UNIQUE;

-- Create function to generate unique lead numbers
CREATE OR REPLACE FUNCTION generate_lead_number()
RETURNS TEXT AS $$
DECLARE
  lead_num TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate format: LEAD-YYYYMMDD-XXXX (where XXXX is random 4 digits)
    lead_num := 'LEAD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    
    -- Check if this number already exists
    SELECT EXISTS(SELECT 1 FROM leads WHERE lead_number = lead_num) INTO exists_check;
    
    -- If it doesn't exist, we can use it
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN lead_num;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically assign lead numbers
CREATE OR REPLACE FUNCTION assign_lead_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.lead_number IS NULL THEN
    NEW.lead_number := generate_lead_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new leads
DROP TRIGGER IF EXISTS trigger_assign_lead_number ON leads;
CREATE TRIGGER trigger_assign_lead_number
  BEFORE INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION assign_lead_number();

-- Update existing leads without lead numbers
UPDATE leads 
SET lead_number = generate_lead_number()
WHERE lead_number IS NULL;

-- Create function to clean up old files (called by cron job)
CREATE OR REPLACE FUNCTION cleanup_old_lead_files()
RETURNS void AS $$
DECLARE
  old_lead RECORD;
  file_path TEXT;
BEGIN
  -- Find leads older than 30 days
  FOR old_lead IN 
    SELECT id, lead_data->>'uploadedFiles' as uploaded_files, created_at
    FROM leads 
    WHERE created_at < NOW() - INTERVAL '30 days'
    AND lead_data->>'uploadedFiles' IS NOT NULL
  LOOP
    -- Log the cleanup
    RAISE NOTICE 'Cleaning up files for lead % created on %', old_lead.id, old_lead.created_at;
    
    -- Delete files from storage (this would be handled by the application layer)
    -- The actual file deletion will be implemented in the application code
    
    -- Clear the uploaded files data from the lead record
    UPDATE leads 
    SET lead_data = lead_data - 'uploadedFiles'
    WHERE id = old_lead.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the cleanup function to run daily at 2 AM
SELECT cron.schedule(
  'cleanup-old-lead-files',
  '0 2 * * *', -- daily at 2 AM
  'SELECT cleanup_old_lead_files();'
);


-- Update the cleanup function to target 7 days instead of 30 days
CREATE OR REPLACE FUNCTION public.cleanup_old_lead_files()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  old_lead RECORD;
  file_path TEXT;
BEGIN
  -- Find leads older than 7 days (changed from 30 days)
  FOR old_lead IN 
    SELECT id, lead_data->>'uploadedFiles' as uploaded_files, created_at
    FROM leads 
    WHERE created_at < NOW() - INTERVAL '7 days'
    AND lead_data->>'uploadedFiles' IS NOT NULL
  LOOP
    -- Log the cleanup
    RAISE NOTICE 'Cleaning up files for lead % created on %', old_lead.id, old_lead.created_at;
    
    -- Clear the uploaded files data from the lead record
    UPDATE leads 
    SET lead_data = lead_data - 'uploadedFiles'
    WHERE id = old_lead.id;
  END LOOP;
END;
$function$;

-- Update the edge function trigger to run daily instead of manually
-- Create a cron job to run the cleanup function daily at midnight
SELECT cron.schedule(
  'cleanup-old-lead-files',
  '0 0 * * *', -- daily at midnight
  $$
  SELECT public.cleanup_old_lead_files();
  $$
);

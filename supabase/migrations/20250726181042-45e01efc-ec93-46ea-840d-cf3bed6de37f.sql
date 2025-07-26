
-- Phase 1: Critical Database Security Fixes

-- 1. Enable RLS on contact_submissions table and add policies
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admin users can view contact submissions
CREATE POLICY "Admin users can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Policy: Only authenticated admin users can manage contact submissions
CREATE POLICY "Admin users can manage contact submissions"
ON public.contact_submissions
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Policy: Allow public insert for form submissions (but not read/update/delete)
CREATE POLICY "Allow public contact form submissions"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- 2. Enable RLS on leads table and add policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users with admin or editor roles can view leads
CREATE POLICY "Admin and editor users can view leads"
ON public.leads
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

-- Policy: Only authenticated users with admin or editor roles can manage leads
CREATE POLICY "Admin and editor users can manage leads"
ON public.leads
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'editor')
  )
);

-- Policy: Allow public insert for lead generation forms (but not read/update/delete)
CREATE POLICY "Allow public lead form submissions"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- 3. Fix Database Function Security Vulnerabilities

-- Fix get_current_user_role() function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  RETURN (SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1);
END;
$function$;

-- Fix handle_new_user() function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$function$;

-- Fix generate_lead_number() function
CREATE OR REPLACE FUNCTION public.generate_lead_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  lead_num TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate format: LEAD-YYYYMMDD-XXXX (where XXXX is random 4 digits)
    lead_num := 'LEAD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    
    -- Check if this number already exists
    SELECT EXISTS(SELECT 1 FROM public.leads WHERE lead_number = lead_num) INTO exists_check;
    
    -- If it doesn't exist, we can use it
    IF NOT exists_check THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN lead_num;
END;
$function$;

-- Fix assign_lead_number() function
CREATE OR REPLACE FUNCTION public.assign_lead_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  IF NEW.lead_number IS NULL THEN
    NEW.lead_number := public.generate_lead_number();
  END IF;
  RETURN NEW;
END;
$function$;

-- Fix cleanup_old_lead_files() function
CREATE OR REPLACE FUNCTION public.cleanup_old_lead_files()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  old_lead RECORD;
  file_path TEXT;
BEGIN
  -- Find leads older than 7 days (changed from 30 days)
  FOR old_lead IN 
    SELECT id, lead_data->>'uploadedFiles' as uploaded_files, created_at
    FROM public.leads 
    WHERE created_at < NOW() - INTERVAL '7 days'
    AND lead_data->>'uploadedFiles' IS NOT NULL
  LOOP
    -- Log the cleanup
    RAISE NOTICE 'Cleaning up files for lead % created on %', old_lead.id, old_lead.created_at;
    
    -- Clear the uploaded files data from the lead record
    UPDATE public.leads 
    SET lead_data = lead_data - 'uploadedFiles'
    WHERE id = old_lead.id;
  END LOOP;
END;
$function$;

-- 4. Create trigger for automatic lead number assignment
DROP TRIGGER IF EXISTS assign_lead_number_trigger ON public.leads;
CREATE TRIGGER assign_lead_number_trigger
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_lead_number();

-- 5. Add security logging table for monitoring
CREATE TABLE IF NOT EXISTS public.security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  ip_address inet,
  user_agent text,
  event_data jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on security_logs
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view security logs
CREATE POLICY "Admin users can view security logs"
ON public.security_logs
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow system to insert security logs
CREATE POLICY "Allow system to insert security logs"
ON public.security_logs
FOR INSERT
WITH CHECK (true);

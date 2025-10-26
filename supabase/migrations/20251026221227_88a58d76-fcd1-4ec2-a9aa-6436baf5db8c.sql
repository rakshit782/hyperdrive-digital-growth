-- Fix critical user_roles privilege escalation vulnerability
-- Drop dangerous policies that allow users to modify their own roles
DROP POLICY IF EXISTS "Enable update for own records" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Users can manage their own roles" ON public.user_roles;

-- Keep only safe policies
-- Admin can manage all roles (already exists)
-- Users can only READ their own role (already exists as "Enable read access for authenticated users")

-- Create a secure function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update get_current_user_role to use proper search_path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1);
END;
$$;

-- Improve lead file storage policies with explicit role checks
DROP POLICY IF EXISTS "Admin and editor users can manage lead files" ON storage.objects;
DROP POLICY IF EXISTS "Admin and editor users can view lead files" ON storage.objects;

CREATE POLICY "Only admins and editors can upload lead files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'lead-files' AND
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);

CREATE POLICY "Only admins and editors can view lead files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'lead-files' AND
  (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Only admins and editors can update lead files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'lead-files' AND
  (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
);

CREATE POLICY "Only admins and editors can delete lead files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'lead-files' AND
  (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
);

-- Add input validation function for text fields
CREATE OR REPLACE FUNCTION public.validate_text_length(
  text_value TEXT,
  min_length INTEGER DEFAULT 1,
  max_length INTEGER DEFAULT 1000
)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  RETURN LENGTH(TRIM(text_value)) >= min_length 
    AND LENGTH(TRIM(text_value)) <= max_length;
END;
$$;

-- Add check constraints for leads table using triggers (not CHECK constraints for flexibility)
CREATE OR REPLACE FUNCTION public.validate_lead_data()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validate name
  IF NOT public.validate_text_length(NEW.name, 2, 100) THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate email length
  IF NOT public.validate_text_length(NEW.email, 5, 255) THEN
    RAISE EXCEPTION 'Email must be between 5 and 255 characters';
  END IF;
  
  -- Validate phone if provided
  IF NEW.phone IS NOT NULL AND LENGTH(TRIM(NEW.phone)) > 0 THEN
    IF NOT public.validate_text_length(NEW.phone, 10, 20) THEN
      RAISE EXCEPTION 'Phone must be between 10 and 20 characters';
    END IF;
  END IF;
  
  -- Validate company if provided
  IF NEW.company IS NOT NULL AND LENGTH(TRIM(NEW.company)) > 0 THEN
    IF NOT public.validate_text_length(NEW.company, 2, 200) THEN
      RAISE EXCEPTION 'Company must be between 2 and 200 characters';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_lead_data_trigger ON public.leads;
CREATE TRIGGER validate_lead_data_trigger
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_lead_data();

-- Add validation for contact_submissions
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validate name
  IF NOT public.validate_text_length(NEW.name, 2, 100) THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  
  -- Validate email
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  IF NOT public.validate_text_length(NEW.email, 5, 255) THEN
    RAISE EXCEPTION 'Email must be between 5 and 255 characters';
  END IF;
  
  -- Validate message if provided
  IF NEW.message IS NOT NULL AND LENGTH(TRIM(NEW.message)) > 0 THEN
    IF NOT public.validate_text_length(NEW.message, 10, 5000) THEN
      RAISE EXCEPTION 'Message must be between 10 and 5000 characters';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_contact_submission_trigger ON public.contact_submissions;
CREATE TRIGGER validate_contact_submission_trigger
  BEFORE INSERT OR UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_contact_submission();
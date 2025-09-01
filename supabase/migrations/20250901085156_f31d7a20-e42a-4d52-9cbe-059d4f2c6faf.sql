-- Harden RLS for contact_submissions to ensure admin-only read/modify access
-- and avoid cross-table policy dependencies by using a SECURITY DEFINER function.

-- Ensure RLS is enabled
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop legacy broad policies
DROP POLICY IF EXISTS "Admin users can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin users can view contact submissions" ON public.contact_submissions;

-- Admin-only SELECT using security definer helper
CREATE POLICY "Admins can select contact_submissions"
ON public.contact_submissions
FOR SELECT
USING (public.get_current_user_role() = 'admin');

-- Admin-only UPDATE
CREATE POLICY "Admins can update contact_submissions"
ON public.contact_submissions
FOR UPDATE
USING (public.get_current_user_role() = 'admin')
WITH CHECK (public.get_current_user_role() = 'admin');

-- Admin-only DELETE
CREATE POLICY "Admins can delete contact_submissions"
ON public.contact_submissions
FOR DELETE
USING (public.get_current_user_role() = 'admin');

-- Ensure public can still submit the form (INSERT) without authentication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'contact_submissions' 
      AND policyname = 'Allow public contact form submissions'
  ) THEN
    CREATE POLICY "Allow public contact form submissions"
    ON public.contact_submissions
    FOR INSERT
    WITH CHECK (true);
  END IF;
END $$;
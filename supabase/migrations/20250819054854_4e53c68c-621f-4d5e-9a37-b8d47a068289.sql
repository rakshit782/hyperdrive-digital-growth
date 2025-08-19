-- Secure newsletter_emails: remove public read, restrict to admins
-- Ensure RLS is enabled (safe to run multiple times)
ALTER TABLE public.newsletter_emails ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Allow authenticated users to manage newsletter emails" ON public.newsletter_emails;
DROP POLICY IF EXISTS "Allow public read access to newsletter emails" ON public.newsletter_emails;

-- Keep public INSERT for subscription form
-- (If it exists already it remains; re-create defensively to ensure presence)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'newsletter_emails' 
      AND policyname = 'Allow public insert to newsletter emails'
  ) THEN
    CREATE POLICY "Allow public insert to newsletter emails"
    ON public.newsletter_emails
    FOR INSERT
    WITH CHECK (true);
  END IF;
END $$;

-- Admin-only management and read access
CREATE POLICY "Admins manage newsletter emails"
ON public.newsletter_emails
FOR ALL
USING (get_current_user_role() = 'admin')
WITH CHECK (get_current_user_role() = 'admin');
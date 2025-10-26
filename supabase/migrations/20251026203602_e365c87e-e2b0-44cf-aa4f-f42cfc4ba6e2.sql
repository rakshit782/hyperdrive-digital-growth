-- Ensure RLS is enabled on contact_submissions table
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "Admins can select contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can delete contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.contact_submissions;

-- Recreate admin-only SELECT policy using the secure has_role function
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Recreate admin-only UPDATE policy
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Recreate admin-only DELETE policy
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow public to submit contact forms (INSERT only)
CREATE POLICY "Allow public contact form submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
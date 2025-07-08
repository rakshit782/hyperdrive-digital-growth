
-- Drop the existing problematic INSERT policy for leads
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;

-- Create a new INSERT policy that allows anonymous users to submit leads
CREATE POLICY "Enable insert for anonymous users"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Also ensure the existing admin policy works correctly
DROP POLICY IF EXISTS "Admin access to leads" ON public.leads;

CREATE POLICY "Admin access to leads"
  ON public.leads
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('admin', 'editor')
    )
  );

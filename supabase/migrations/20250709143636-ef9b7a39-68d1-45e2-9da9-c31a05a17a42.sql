
-- Update the RLS policy for leads table to properly allow anonymous submissions
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.leads;

-- Create a more permissive policy for form submissions
CREATE POLICY "Allow form submissions from anyone" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

-- Ensure the policy allows both authenticated and anonymous users
CREATE POLICY "Allow anonymous lead creation" 
  ON public.leads 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

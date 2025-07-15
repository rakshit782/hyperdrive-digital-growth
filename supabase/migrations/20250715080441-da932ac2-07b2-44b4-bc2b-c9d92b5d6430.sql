
-- Fix RLS policies for leads table to allow form submissions
DROP POLICY IF EXISTS "Allow form submissions from anyone" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous lead creation" ON public.leads;

-- Create a single, clear policy for form submissions
CREATE POLICY "Enable lead form submissions" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

-- Ensure admin access policy exists
DROP POLICY IF EXISTS "Admin access to leads" ON public.leads;
CREATE POLICY "Admin access to leads" 
  ON public.leads 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = ANY (ARRAY['admin'::text, 'editor'::text])
  ));

-- Also ensure the lead number trigger is working properly
DROP TRIGGER IF EXISTS lead_number_trigger ON public.leads;
CREATE TRIGGER lead_number_trigger
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION assign_lead_number();

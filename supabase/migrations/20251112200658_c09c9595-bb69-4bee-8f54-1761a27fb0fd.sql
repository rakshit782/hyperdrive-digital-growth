-- Fix RLS policies for leads table to allow authenticated users to view their own leads
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admin and editor users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admin and editor users can manage leads" ON public.leads;

-- Create new policies that allow authenticated users to view all leads (for admin dashboard)
CREATE POLICY "Authenticated users can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users with admin role to manage leads
CREATE POLICY "Admin users can manage leads"
ON public.leads
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Keep the public insert policy for form submissions
-- (This already exists, no need to recreate)

-- Fix the infinite recursion in user_roles table by creating a security definer function
-- This prevents the policy from querying the same table it's applied to

-- First, create a security definer function to get user role safely
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  -- Use a simple query that doesn't trigger RLS
  RETURN (SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Admin can manage all roles" ON public.user_roles;

-- Create a new policy using the security definer function
CREATE POLICY "Admin can manage all roles" ON public.user_roles
FOR ALL USING (
  public.get_current_user_role() = 'admin'
);

-- Also update analytics_events policy to use the function
DROP POLICY IF EXISTS "Admin access to analytics_events" ON public.analytics_events;

CREATE POLICY "Admin access to analytics_events" ON public.analytics_events
FOR ALL USING (
  public.get_current_user_role() = 'admin'
);

-- Allow public access to analytics events for tracking (INSERT only)
CREATE POLICY "Allow public analytics tracking" ON public.analytics_events
FOR INSERT WITH CHECK (true);

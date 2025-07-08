-- Fix infinite recursion in user_roles RLS policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update their own roles" ON public.user_roles;

-- Create simple, non-recursive RLS policies for user_roles
CREATE POLICY "Enable read access for authenticated users" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Enable update for own records" 
ON public.user_roles 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Ensure website_settings has proper RLS policies that allow public access
DROP POLICY IF EXISTS "Enable read access for all users" ON public.website_settings;
CREATE POLICY "Enable read access for all users" 
ON public.website_settings 
FOR SELECT 
USING (true);

-- Allow authenticated users to manage website settings
CREATE POLICY "Enable all operations for authenticated users" 
ON public.website_settings 
FOR ALL 
USING (auth.uid() IS NOT NULL);
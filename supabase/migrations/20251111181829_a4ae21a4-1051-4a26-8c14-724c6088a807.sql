-- Add public read access to active pricing plans
CREATE POLICY "Allow public read access to active pricing plans"
ON public.pricing_plans
FOR SELECT
TO public
USING (is_active = true);
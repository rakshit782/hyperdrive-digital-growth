-- Add indexes to pricing_plans table for better query performance

-- Index on is_active for filtering active plans
CREATE INDEX IF NOT EXISTS idx_pricing_plans_is_active 
ON public.pricing_plans(is_active);

-- Index on sort_order for ordering
CREATE INDEX IF NOT EXISTS idx_pricing_plans_sort_order 
ON public.pricing_plans(sort_order);

-- Composite index for common query pattern (filter by is_active and order by sort_order)
CREATE INDEX IF NOT EXISTS idx_pricing_plans_active_sort 
ON public.pricing_plans(is_active, sort_order);

-- Disable Row Level Security on leads table to allow unrestricted form submissions
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on leads table
DROP POLICY IF EXISTS "Enable lead form submissions" ON public.leads;
DROP POLICY IF EXISTS "Admin access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow form submissions from anyone" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous lead creation" ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;

-- Also disable RLS on contact_submissions to ensure backup submissions work
ALTER TABLE public.contact_submissions DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on contact_submissions table
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contact_submissions;

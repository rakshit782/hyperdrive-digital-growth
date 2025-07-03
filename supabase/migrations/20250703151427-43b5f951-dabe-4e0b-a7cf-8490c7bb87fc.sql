
-- Update leads table to ensure proper data collection
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS form_security JSONB DEFAULT '{}';

-- Add indexes for better performance on lead queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);

-- Update RLS policies to allow form submissions without authentication
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
CREATE POLICY "Anyone can submit leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

-- Ensure contact_submissions can also be inserted by anyone
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact forms" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Add security tracking table for form submissions
CREATE TABLE IF NOT EXISTS public.form_security_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  recaptcha_score DECIMAL(3,2),
  honeypot_triggered BOOLEAN DEFAULT false,
  csrf_valid BOOLEAN DEFAULT true,
  submission_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on security logs
ALTER TABLE public.form_security_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert security logs (for form submissions)
CREATE POLICY "Anyone can log form submissions" 
  ON public.form_security_logs 
  FOR INSERT 
  WITH CHECK (true);

-- Only admins can view security logs
CREATE POLICY "Admin access to security logs" 
  ON public.form_security_logs 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = 'admin'
  ));

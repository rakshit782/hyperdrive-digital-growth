
-- Create table for policy pages content
CREATE TABLE public.policy_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type TEXT NOT NULL UNIQUE, -- 'privacy-policy', 'terms-of-service', 'terms-conditions'
  title TEXT NOT NULL,
  last_updated TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on policy_pages table
ALTER TABLE public.policy_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for policy_pages
CREATE POLICY "Allow public read access to active policy pages" 
  ON public.policy_pages 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage policy pages" 
  ON public.policy_pages 
  FOR ALL 
  USING (auth.role() = 'authenticated'::text);

-- Insert default policy pages data
INSERT INTO public.policy_pages (page_type, title, last_updated, content) VALUES
(
  'privacy-policy',
  'Privacy Policy',
  'December 2024',
  '<h2>Information We Collect</h2>
<p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>

<h2>How We Use Your Information</h2>
<p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

<h2>Information Sharing</h2>
<p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>

<h2>Data Security</h2>
<p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

<h2>Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please contact us at privacy@youragency.com.</p>'
),
(
  'terms-of-service',
  'Terms of Service',
  'December 2024',
  '<h2>Acceptance of Terms</h2>
<p>By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement.</p>

<h2>Use License</h2>
<p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

<h2>Disclaimer</h2>
<p>The materials on our website are provided on an ''as is'' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.</p>

<h2>Limitations</h2>
<p>In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>

<h2>Contact Information</h2>
<p>If you have any questions about these Terms of Service, please contact us at terms@youragency.com.</p>'
),
(
  'terms-conditions',
  'Terms & Conditions',
  'December 2024',
  '<h2>General Terms</h2>
<p>These terms and conditions outline the rules and regulations for the use of our services and website.</p>

<h2>Service Terms</h2>
<p>Our advertising services are provided subject to the terms outlined in our service agreements and these general terms and conditions.</p>

<h2>Payment Terms</h2>
<p>Payment for services is due according to the payment schedule outlined in your service agreement. Late payments may result in service suspension.</p>

<h2>Intellectual Property</h2>
<p>All content, designs, and materials created as part of our services remain our intellectual property unless otherwise specified in writing.</p>

<h2>Termination</h2>
<p>Either party may terminate the service agreement with written notice as specified in the individual service contract.</p>

<h2>Contact</h2>
<p>For questions regarding these terms and conditions, contact us at legal@youragency.com.</p>'
);

-- Enable realtime for policy_pages
ALTER TABLE public.policy_pages REPLICA IDENTITY FULL;

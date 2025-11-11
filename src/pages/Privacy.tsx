import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('legal_privacy');
    setContent(savedContent || `
      <h1>Privacy Policy</h1>
      <p>Last updated: ${new Date().toLocaleDateString()}</p>
      
      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us, including name, email address, phone number, and company information when you fill out our contact forms or sign up for our services.</p>
      
      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to send you marketing communications.</p>
      
      <h2>3. Information Sharing</h2>
      <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy.</p>
      
      <h2>4. Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or destruction.</p>
      
      <h2>5. Your Rights</h2>
      <p>You have the right to access, update, or delete your personal information. Contact us to exercise these rights.</p>
      
      <h2>6. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at info@amzadscout.com</p>
    `);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - AMZ AD SCOUT</title>
        <meta name="description" content="Privacy Policy for AMZ AD SCOUT - Learn how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div 
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </>
  );
};

export default Privacy;

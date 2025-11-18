import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('legal_terms');
    setContent(savedContent || `
      <h1>Terms & Conditions</h1>
      <p>Last updated: ${new Date().toLocaleDateString()}</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using our services, you accept and agree to be bound by the terms and provisions of this agreement.</p>
      
      <h2>2. Services Description</h2>
      <p>AMZ AD SCOUT provides digital marketing, advertising, and e-commerce solutions. We reserve the right to modify or discontinue services at any time.</p>
      
      <h2>3. User Obligations</h2>
      <p>You agree to provide accurate information and maintain the confidentiality of your account credentials.</p>
      
      <h2>4. Payment Terms</h2>
      <p>Payment is due according to the terms specified in your service agreement. We reserve the right to suspend services for non-payment.</p>
      
      <h2>5. Intellectual Property</h2>
      <p>All content, trademarks, and other intellectual property on our website are owned by AMZ AD SCOUT or our licensors.</p>
      
      <h2>6. Limitation of Liability</h2>
      <p>We shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
      
      <h2>7. Contact Information</h2>
      <p>For questions about these Terms & Conditions, contact us at info@amzadscout.com</p>
    `);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms & Conditions - AMZ AD SCOUT</title>
        <meta name="description" content="Terms & Conditions for AMZ AD SCOUT - Review our service terms and user obligations." />
        <meta name="keywords" content="terms and conditions, service agreement, user terms, terms of service, legal terms, user agreement, service terms, acceptable use policy, amazon advertising terms, ecommerce terms, digital marketing terms, service level agreement, user obligations, payment terms, intellectual property rights, liability terms, disclaimer policy, warranty terms, termination policy, dispute resolution, arbitration clause, governing law, jurisdiction, legal compliance, service restrictions, prohibited activities, user responsibilities, account terms, subscription terms, cancellation policy, modification rights, service changes, terms acceptance, binding agreement, legal relationship, contract terms, service provision, performance obligations, third party services, affiliate terms, partner terms, vendor terms, subcontractor terms, confidentiality terms, non disclosure agreement, intellectual property protection, trademark usage, copyright terms, license agreement, software terms, platform terms, access rights, security obligations, compliance requirements, regulatory terms, industry standards, professional standards, ethical guidelines, conduct policy, enforcement terms, violation consequences, termination rights, suspension policy" />
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

export default Terms;

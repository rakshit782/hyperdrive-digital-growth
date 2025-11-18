import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const RefundPolicy = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('legal_refund');
    setContent(savedContent || `
      <h1>Refund Policy</h1>
      <p>Last updated: ${new Date().toLocaleDateString()}</p>
      
      <h2>1. Refund Eligibility</h2>
      <p>We offer refunds within 30 days of service purchase if you are not satisfied with our services.</p>
      
      <h2>2. Non-Refundable Services</h2>
      <p>Certain services are non-refundable, including custom development work that has been completed and delivered.</p>
      
      <h2>3. Refund Process</h2>
      <p>To request a refund, contact our support team at info@amzadscout.com with your order details and reason for refund.</p>
      
      <h2>4. Processing Time</h2>
      <p>Approved refunds will be processed within 5-10 business days and credited to your original payment method.</p>
      
      <h2>5. Partial Refunds</h2>
      <p>In some cases, we may offer partial refunds based on the services utilized and time elapsed.</p>
      
      <h2>6. Dispute Resolution</h2>
      <p>If you have concerns about a refund decision, please contact us to discuss resolution options.</p>
      
      <h2>7. Contact Us</h2>
      <p>For refund inquiries, email us at info@amzadscout.com or call +91-9799411555</p>
    `);
  }, []);

  return (
    <>
      <Helmet>
        <title>Refund Policy - AMZ AD SCOUT</title>
        <meta name="description" content="Refund Policy for AMZ AD SCOUT - Learn about our refund eligibility and process." />
        <meta name="keywords" content="refund policy, money back guarantee, refund eligibility, refund process, return policy, cancellation policy, amazon advertising refund, digital marketing refund, service refund, payment refund, refund request, refund timeline, partial refund, full refund, refund conditions, refund exceptions, non refundable services, refund approval, refund processing, credit refund, chargeback policy, dispute resolution, satisfaction guarantee, service guarantee, performance guarantee, quality assurance, refund terms, cancellation terms, termination refund, prorated refund, subscription refund, contract cancellation, early termination, refund eligibility criteria, refund documentation, refund evidence, refund approval process, refund rejection, refund appeal, customer satisfaction, service quality, performance issues, service complaints, complaint resolution, customer support, refund inquiry, refund status, refund tracking, payment reversal, transaction reversal, credit card refund, payment method refund, refund timeframe, processing time, business days, refund delay, refund hold, refund release, refund verification, refund validation, account credit, service credit, future credit, compensation policy, remedy options, alternative solutions, service adjustment, price adjustment, billing correction, invoice correction, credit memo, refund accounting" />
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

export default RefundPolicy;

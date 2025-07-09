
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

interface PolicyContent {
  title: string;
  lastUpdated: string;
  content: string;
}

const TermsConditions = () => {
  const [policyContent, setPolicyContent] = useState<PolicyContent>({
    title: "Terms & Conditions",
    lastUpdated: "December 2024",
    content: `
      <h2>General Terms</h2>
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
      <p>For questions regarding these terms and conditions, contact us at legal@youragency.com.</p>
    `
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('termsConditionsContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setPolicyContent(parsed);
        console.log('Terms and conditions content loaded:', parsed);
      } catch (error) {
        console.error('Failed to parse terms conditions content:', error);
      }
    }

    const handleContentUpdate = (event: CustomEvent) => {
      console.log('Terms and conditions content updated via dashboard');
      setPolicyContent(event.detail);
    };

    window.addEventListener('termsConditionsUpdated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('termsConditionsUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  return (
    <>
      <SEOHead 
        title={policyContent.title}
        description="Terms and Conditions for Your Agency"
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
                {policyContent.title}
              </h1>
              <p className="text-slate-600">Last updated: {policyContent.lastUpdated}</p>
            </div>
            
            <div 
              className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: policyContent.content }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;

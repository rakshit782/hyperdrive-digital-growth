
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

interface PolicyContent {
  title: string;
  lastUpdated: string;
  content: string;
}

const TermsOfService = () => {
  const [policyContent, setPolicyContent] = useState<PolicyContent>({
    title: "Terms of Service",
    lastUpdated: "December 2024",
    content: `
      <h2>Acceptance of Terms</h2>
      <p>By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
      
      <h2>Use License</h2>
      <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
      
      <h2>Disclaimer</h2>
      <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.</p>
      
      <h2>Limitations</h2>
      <p>In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
      
      <h2>Contact Information</h2>
      <p>If you have any questions about these Terms of Service, please contact us at terms@youragency.com.</p>
    `
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('termsOfServiceContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setPolicyContent(parsed);
      } catch (error) {
        console.error('Failed to parse terms of service content:', error);
      }
    }

    const handleContentUpdate = (event: CustomEvent) => {
      setPolicyContent(event.detail);
    };

    window.addEventListener('termsOfServiceUpdated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('termsOfServiceUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  return (
    <>
      <SEOHead 
        title={policyContent.title}
        description="Terms of Service for Your Agency"
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

export default TermsOfService;

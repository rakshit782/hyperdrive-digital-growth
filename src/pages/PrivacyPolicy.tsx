
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

interface PolicyContent {
  title: string;
  lastUpdated: string;
  content: string;
}

const PrivacyPolicy = () => {
  const [policyContent, setPolicyContent] = useState<PolicyContent>({
    title: "Privacy Policy",
    lastUpdated: "December 2024",
    content: `
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
      
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
      
      <h2>Information Sharing</h2>
      <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
      
      <h2>Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at privacy@youragency.com.</p>
    `
  });

  useEffect(() => {
    const savedContent = localStorage.getItem('privacyPolicyContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setPolicyContent(parsed);
      } catch (error) {
        console.error('Failed to parse privacy policy content:', error);
      }
    }

    const handleContentUpdate = (event: CustomEvent) => {
      setPolicyContent(event.detail);
    };

    window.addEventListener('privacyPolicyUpdated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('privacyPolicyUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  return (
    <>
      <SEOHead 
        title={policyContent.title}
        description="Privacy Policy for Your Agency"
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

export default PrivacyPolicy;

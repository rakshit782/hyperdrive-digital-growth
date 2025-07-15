
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Privacy = () => {
  return (
    <>
      <SEOHead 
        title="Privacy Policy"
        description="Privacy Policy and Data Protection"
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">
            Privacy Policy
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-slate-600 mb-4">
              Your privacy is important to us. This privacy statement explains the personal data we process and how we process it.
            </p>
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">Information We Collect</h2>
                <p className="text-slate-600">
                  We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">How We Use Your Information</h2>
                <p className="text-slate-600">
                  We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">Information Sharing</h2>
                <p className="text-slate-600">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">Contact Us</h2>
                <p className="text-slate-600">
                  If you have any questions about this Privacy Policy, please contact us.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;

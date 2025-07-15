
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Terms = () => {
  return (
    <>
      <SEOHead 
        title="Terms of Service"
        description="Terms of Service and Conditions"
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">
            Terms of Service
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-slate-600 mb-4">
              Please read these terms and conditions carefully before using our service.
            </p>
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
                <p className="text-slate-600">
                  By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">2. Use License</h2>
                <p className="text-slate-600">
                  Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">3. Disclaimer</h2>
                <p className="text-slate-600">
                  The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
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

export default Terms;

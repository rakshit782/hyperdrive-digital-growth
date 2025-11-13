
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Services from "@/components/Services";

const ServicesPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Digital Marketing Services | Amazon PPC, Walmart Ads, Shopify Development"
        description="Professional E-commerce Digital Marketing Agency offering Amazon PPC Management, Walmart Advertising, Shopify Development, Multi-Marketplace Integration, and Product Cataloging Services. Proven results for online retailers."
        keywords="Amazon Advertising Agency, Amazon PPC Management Service, Walmart Advertising Agency, Shopify Development Partner, E-commerce Listing Optimization, Multi-Channel Integration Service, Product Cataloging Services, Amazon Listing Optimization"
        canonical={window.location.href}
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Professional E-commerce Digital Marketing Services
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              Expert Amazon Advertising Agency, Walmart Marketing, Shopify Development & Multi-Marketplace Integration Solutions for Online Retailers
            </p>
          </div>
        </section>
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;

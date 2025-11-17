
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Services from "@/components/Services";

const ServicesPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Professional E-commerce Marketing Services | Amazon, Walmart & Shopify Experts"
        description="Full-service E-commerce Digital Marketing Agency offering professional Amazon PPC Management, Walmart Advertising, Shopify Development, Multi-Marketplace Integration, Product Cataloging, Listing Optimization, and Growth Strategy Services. Certified experts delivering proven results for online retailers and brands."
        keywords="amazon advertising services, amazon ppc management, walmart advertising services, shopify development services, e-commerce marketing services, multi-marketplace integration, product cataloging services, listing optimization services, amazon seo services, sponsored products management, sponsored brands campaigns, amazon dsp services, vendor central management, seller central services, walmart marketplace services, shopify plus development, custom shopify themes, shopify app integration, e-commerce consulting, marketplace optimization, conversion rate optimization, roi optimization services, campaign management services, ppc advertising services, search advertising services, display advertising services, video advertising services, amazon analytics services, competitive analysis services, market research services, keyword research services, product launch services, a+ content creation, enhanced brand content, storefront design services, brand registry services, product photography, lifestyle photography services, infographic design, amazon video production, international expansion services, global marketplace services, cross-border e-commerce, localization services, account management services, account health services, suspension prevention, reinstatement services, review management services, customer service optimization, ranking services, seasonal campaign services, prime day management, black friday services, q4 planning services, budget management, acos optimization services, tacos management, roas maximization, growth strategy consulting, scalable growth services, inventory management, supply chain optimization, fulfillment services, fba consulting services, fbm strategy, 3pl integration, profit optimization, margin analysis, data-driven marketing services, performance marketing, customer acquisition, retention marketing services, remarketing services, email marketing automation, social media advertising, influencer marketing services, content marketing services"
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

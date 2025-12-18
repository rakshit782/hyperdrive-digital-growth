
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead 
        title="Professional E-commerce Marketing Services | Amazon, Walmart & Shopify Experts"
        description="Full-service E-commerce Digital Marketing Agency offering professional Amazon PPC Management, Walmart Advertising, Shopify Development, Multi-Marketplace Integration, Product Cataloging, Listing Optimization, and Growth Strategy Services. Certified experts delivering proven results for online retailers and brands."
        keywords="amazon advertising services, amazon ppc management, walmart advertising services, shopify development services, e-commerce marketing services, multi-marketplace integration, product cataloging services, listing optimization services, amazon seo services, sponsored products management, sponsored brands campaigns, amazon dsp services, vendor central management, seller central services, walmart marketplace services, shopify plus development, custom shopify themes, shopify app integration, e-commerce consulting, marketplace optimization, conversion rate optimization, roi optimization services, campaign management services, ppc advertising services, search advertising services, display advertising services, video advertising services, amazon analytics services, competitive analysis services, market research services, keyword research services, product launch services, a+ content creation, enhanced brand content, storefront design services, brand registry services, product photography, lifestyle photography services, infographic design, amazon video production, international expansion services, global marketplace services, cross-border e-commerce, localization services, account management services, account health services, suspension prevention, reinstatement services, review management services, customer service optimization, ranking services, seasonal campaign services, prime day management, black friday services, q4 planning services, budget management, acos optimization services, tacos management, roas maximization, growth strategy consulting, scalable growth services, inventory management, supply chain optimization, fulfillment services, fba consulting services, fbm strategy, 3pl integration, profit optimization, margin analysis, data-driven marketing services, performance marketing, customer acquisition, retention marketing services, remarketing services, email marketing automation, social media advertising, influencer marketing services, content marketing services"
        canonical={window.location.href}
      />
      <Header />
      <main className="min-h-screen">
        {/* Dark Gradient Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-24 md:py-32 lg:py-40">
          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-200">Trusted by 500+ E-commerce Brands</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              E-commerce Marketing
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10">
              Expert Amazon Advertising, Walmart Marketing, Shopify Development & Multi-Marketplace Integration Solutions designed to scale your online business
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/25"
                onClick={() => navigate('/contact')}
              >
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/5 text-white hover:bg-white/15 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                onClick={() => navigate('/case-studies')}
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <Services />
        
        {/* Features Highlight Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Services</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We deliver results-driven marketing strategies backed by data and industry expertise
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { number: '01', title: 'Data-Driven Strategy', description: 'Every campaign is backed by comprehensive analytics and market research to maximize your ROI.' },
                { number: '02', title: 'Dedicated Account Managers', description: 'Get personalized attention from certified experts who understand your business goals.' },
                { number: '03', title: 'Real-Time Reporting', description: 'Access detailed dashboards showing campaign performance, spend, and conversions.' },
                { number: '04', title: 'Multi-Platform Expertise', description: 'Seamlessly manage campaigns across Amazon, Walmart, Google, and Meta from one team.' },
                { number: '05', title: 'Proven Track Record', description: 'Join 500+ brands that have achieved sustainable growth with our strategies.' },
                { number: '06', title: '24/7 Support', description: 'Round-the-clock monitoring and support to ensure your campaigns never miss an opportunity.' },
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group relative p-8 bg-white rounded-2xl border border-slate-200/80 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <span className="text-6xl font-bold text-slate-100 group-hover:text-blue-100 transition-colors duration-300 absolute top-4 right-6">
                    {feature.number}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Scale Your E-commerce Business?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Get a free audit of your current advertising strategy and discover opportunities for growth
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-10 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/25"
              onClick={() => navigate('/contact')}
            >
              Start Your Free Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;

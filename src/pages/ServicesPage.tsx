import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, ShieldCheck, Zap, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage: React.FC = () => {
  const highlights = [
    { 
      number: '01', 
      title: 'Algorithmic Advertising Precision', 
      description: 'Continuous bidding telemetry, hourly dayparting, keyword harvesting, and negative targeting across Amazon, Walmart, Google & Meta.' 
    },
    { 
      number: '02', 
      title: 'Dedicated Senior Growth Specialists', 
      description: 'Direct Slack channel and weekly strategic cadence with Amazon SPN & Ads certified senior practitioners, not junior account coordinators.' 
    },
    { 
      number: '03', 
      title: 'Unified Cross-Marketplace Sync', 
      description: 'Eliminate catalog drift and inventory stockouts with real-time multi-channel catalog, pricing, and order automation.' 
    },
    { 
      number: '04', 
      title: 'Conversion-Engineered Creative', 
      description: 'Premium A+ content, brand stores, 3D render infographics, and mobile-first storefronts designed for radical conversion lift.' 
    },
    { 
      number: '05', 
      title: 'Total Profit & Margin Telemetry', 
      description: 'We optimize for bottom-line contribution margin, unit-level economics, and TACoS rather than vanity top-line GMV figures.' 
    },
    { 
      number: '06', 
      title: 'Zero-Tolerance Account Protection', 
      description: '24/7 proactive monitoring of catalog suppressions, policy violations, stranded inventory, and counterfeit hijackers.' 
    },
  ];

  const stats = [
    { value: '500+', label: 'Brands Accelerated', sub: 'From fast-growth 7-figure sellers to enterprise aggregators' },
    { value: '$120M+', label: 'Ad Spend Managed', sub: 'Optimized with proprietary margin & bidding logic' },
    { value: '350%', label: 'Average Sales Lift', sub: 'Achieved across full-funnel marketplace campaigns' },
    { value: '45%', label: 'Average ACoS Reduction', sub: 'Through algorithmic bid sculpting & waste elimination' }
  ];

  return (
    <>
      <SEOHead 
        title="E-commerce Marketing & Marketplace Services | AMZ AD SCOUT"
        description="One team for your marketplace ads, listings, catalogs and storefronts, from Amazon and Walmart to Meta, Google and Shopify. Explore our services to get started."
        keywords="amazon advertising services, amazon ppc management, walmart advertising services, shopify development services, e-commerce marketing services, multi-marketplace integration, product cataloging services, listing optimization services, amazon seo services, sponsored products management, sponsored brands campaigns, amazon dsp services, vendor central management, seller central services, walmart marketplace services, shopify plus development, custom shopify themes, shopify app integration, e-commerce consulting, marketplace optimization, conversion rate optimization, roi optimization services, campaign management services, ppc advertising services, search advertising services, display advertising services, video advertising services, amazon analytics services, competitive analysis services, market research services, keyword research services, product launch services, a+ content creation, enhanced brand content, storefront design services, brand registry services, product photography, lifestyle photography services, infographic design, amazon video production, international expansion services, global marketplace services, cross-border e-commerce, localization services, account management services, account health services, suspension prevention, reinstatement services, review management services, customer service optimization, ranking services, seasonal campaign services, prime day management, black friday services, q4 planning services, budget management, acos optimization services, tacos management, roas maximization, growth strategy consulting, scalable growth services, inventory management, supply chain optimization, fulfillment services, fba consulting services, fbm strategy, 3pl integration, profit optimization, margin analysis, data-driven marketing services, performance marketing, customer acquisition, retention marketing services, remarketing services, email marketing automation, social media advertising, influencer marketing services, content marketing services"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/40 to-white text-slate-900 selection:bg-blue-500/20 selection:text-blue-900">
        
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-blue-600/[0.04] via-indigo-500/[0.03] to-amber-500/[0.03]">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-blue-400/20 via-sky-300/15 to-indigo-300/10 blur-[120px] pointer-events-none" />
          <div className="absolute -top-12 right-12 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 backdrop-blur-md mb-6 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                End-to-End eCommerce Growth Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
              Marketplace Mastery & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Full-Funnel Commerce Services
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              One elite team handling your Amazon advertising, Walmart marketplace scaling, listing conversion mechanics, multi-channel catalog syncing, and high-performance Shopify storefronts.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                <Link to="/contact" aria-label="Get Free Consultation">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-slate-300 bg-white/90 hover:bg-slate-50 text-slate-800 px-8 py-6 text-base rounded-xl backdrop-blur-md shadow-xs transition-all hover:border-slate-400"
              >
                <Link to="/case-studies">
                  Explore Case Studies
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Amazon Ads & SPN Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Walmart Connect Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Certified Shopify Partner</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-14 border-b border-slate-200/60 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 shadow-xs text-center hover:border-blue-400/50 hover:shadow-md transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 leading-snug">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES COMPONENT */}
        <Services />
        
        {/* WHY CHOOSE US / ADVANTAGES */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50/70 to-white border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                The Agency Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Why Brands Scale Faster with AMZ AD SCOUT
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
                We combine technical depth, custom software tooling, and relentless strategic execution.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((feature, index) => (
                <div 
                  key={index}
                  className="group relative p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/60 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-4xl font-black text-slate-100 group-hover:text-blue-100 transition-colors absolute top-5 right-6 pointer-events-none">
                    {feature.number}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIGH-CONVERSION CTA */}
        <section className="py-20 pb-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 sm:p-14 text-center shadow-xl shadow-blue-500/10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/10 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm">
                  Free 48-Hour Growth Audit
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  Ready to Accelerate Your E-commerce Business?
                </h2>
                <p className="text-blue-50 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                  Request a comprehensive audit of your Amazon PPC, Walmart listings, and storefront conversion funnel with actionable recommendations.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-white text-blue-700 hover:bg-slate-100 font-bold px-8 py-6 text-base rounded-xl shadow-xl transition-all hover:scale-105"
                  >
                    <Link to="/contact">
                      Claim Your Free Audit
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/50 bg-white/10 hover:bg-white/20 text-white hover:text-white font-semibold px-8 py-6 text-base rounded-xl backdrop-blur-md"
                  >
                    <Link to="/contact">
                      Schedule a Strategy Call
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;

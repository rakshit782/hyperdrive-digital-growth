import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Code2, 
  Palette, 
  Zap, 
  Monitor, 
  Smartphone, 
  Search, 
  CheckCircle2, 
  Globe, 
  Layers, 
  Rocket,
  ShieldCheck,
  Server,
  ShoppingCart,
  Sparkles
} from "lucide-react";
import { getCaseStudiesByService, FormattedCaseStudy } from "@/data/bulkCaseStudiesAdapter";
import CaseStudyPopup from "@/components/CaseStudyPopup";

const WebsiteDevelopment = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const caseStudies = React.useMemo(() => getCaseStudiesByService('Shopify & Web Development'), []);

  const handleCaseStudyClick = (study: FormattedCaseStudy) => {
    setSelectedCaseStudy({
      id: study.id,
      title: study.title,
      description: study.description,
      industry: study.industry,
      client_name: study.client_name,
      image_url: study.imageUrl,
      results: {
        [study.results.metric1.label]: study.results.metric1.value,
        [study.results.metric2.label]: study.results.metric2.value,
        [study.results.metric3.label]: study.results.metric3.value,
      },
    });
    setIsPopupOpen(true);
  };

  const services = [
    {
      title: 'Headless & Modern Stack Builds',
      description: 'Ultra-fast storefronts engineered with React, Next.js, and TypeScript with sub-second page loads and seamless headless checkout integrations.',
      icon: Code2,
      gradient: 'from-emerald-500 to-teal-500',
      features: ['React & Next.js 14', 'TypeScript Strict Mode', 'Tailwind CSS UI Systems', 'Edge API & SSR Deployment']
    },
    {
      title: 'Mobile-First eCommerce UX',
      description: 'Shopping experiences meticulously crafted for touch navigation, sticky add-to-carts, instant drawers, and frictionless one-click payments.',
      icon: Smartphone,
      gradient: 'from-teal-500 to-cyan-500',
      features: ['One-Thumb Navigation', 'Thumb-Zone Add to Cart', 'Cross-Device QA', 'Micro-Interactions']
    },
    {
      title: 'Shopify Plus & Liquid Customization',
      description: 'Custom Shopify themes, bespoke Liquid architecture, custom checkout scripts, and native app ecosystem integrations for scale.',
      icon: ShoppingCart,
      gradient: 'from-cyan-500 to-blue-500',
      features: ['Shopify Liquid Architecture', 'Custom Theme Sections', 'Shopify Functions & Scripts', 'Klaviyo & Recharge Sync']
    },
    {
      title: 'Core Web Vitals Optimization',
      description: 'Zero bloat, minimal layout shifts, instant LCP, and 95+ Google PageSpeed performance to rank higher and slash bounce rates.',
      icon: Zap,
      gradient: 'from-amber-500 to-emerald-500',
      features: ['95+ Mobile PageSpeed', 'Next-Gen Image Formats', 'Zero CLS (Layout Shift)', 'Edge Caching & CDN']
    },
    {
      title: 'Technical & Structured SEO',
      description: 'Deep Schema.org structured data, dynamic OpenGraph assets, canonical URL hygiene, and semantic HTML that search bots adore.',
      icon: Search,
      gradient: 'from-blue-500 to-indigo-500',
      features: ['Product Schema Markup', 'Automated Sitemap Feeds', 'Robots & Canonical Audits', 'Fast Crawl Indexation']
    },
    {
      title: 'Security, Compliance & APIs',
      description: 'PCI-DSS compliant payment gateways, SSL/TLS, WCAG 2.1 accessibility, GDPR/CCPA cookie handling, and ERP back-office connectors.',
      icon: ShieldCheck,
      gradient: 'from-purple-500 to-emerald-500',
      features: ['PCI-DSS & SSL Hardening', 'WCAG AA Accessibility', 'Custom Webhooks & REST/GraphQL', 'Automated Backup Guard']
    }
  ];

  const stats = [
    { label: 'Websites Launched', value: '500+', description: 'Engineered for high-volume conversion', icon: Rocket },
    { label: 'Client Satisfaction', value: '99.2%', description: 'Long-term development partnerships', icon: Globe },
    { label: 'Avg Mobile PageSpeed', value: '<1.8s', description: 'Blazing-fast Core Web Vitals', icon: Zap },
    { label: 'SEO Audit Score', value: '98/100', description: 'Technical & On-Page readiness', icon: Search }
  ];

  const technologies = [
    { name: 'React & Next.js', tag: 'Frontend', description: 'React server components & instant hydration' },
    { name: 'TypeScript', tag: 'Architecture', description: 'Rock-solid type safety and zero runtime surprises' },
    { name: 'Tailwind CSS', tag: 'Styling', description: 'Modern, ultra-performant utility-first responsive UI' },
    { name: 'Shopify Liquid', tag: 'eCommerce', description: 'Bespoke Shopify store custom development' },
    { name: 'Node & Edge APIs', tag: 'Backend', description: 'Serverless microservices and webhooks' },
    { name: 'PostgreSQL & Supabase', tag: 'Database', description: 'Scalable cloud data infrastructure' }
  ];

  const showcasePoints = [
    {
      title: 'Engineered for Radical Conversion Rates',
      subtitle: 'Performance Architecture',
      description: 'A slow storefront burns paid ad dollars. Every millisecond saved boosts checkout conversion. We build zero-bloat web applications designed for immediate buyer action.',
      metrics: ['+42% Average Conversion Lift', '<100ms Interaction to Next Paint']
    },
    {
      title: 'True Responsive & Mobile-First Excellence',
      subtitle: 'Mobile Shopper Priority',
      description: 'Over 78% of your customers browse on smartphones. We engineer thumb-friendly checkout funnels, predictive search auto-complete, and fluid cart drawers tailored for handheld devices.',
      metrics: ['Touch-Optimized Cart Drawers', 'Zero Horizontal Overflow']
    },
    {
      title: 'Technical SEO Built Into the Core',
      subtitle: 'Organic Visibility',
      description: 'We don’t bolt on SEO as an afterthought. Clean semantic tags, automated product schema, fast SSR prerendering, and optimized crawl trees are baked into the architecture from line one.',
      metrics: ['Rich Snippets for Google SERP', 'Full Web Vitals Compliance']
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.amzadscout.com/services/website-development#service",
    "name": "Website Development",
    "serviceType": "Website development",
    "url": "https://www.amzadscout.com/services/website-development",
    "provider": {
      "@type": "Organization",
      "@id": "https://www.amzadscout.com/#organization",
      "name": "AMZ AD SCOUT",
      "url": "https://www.amzadscout.com/"
    },
    "areaServed": "Worldwide",
    "description": "Custom website design and development with React, Next.js and TypeScript: responsive, fast-loading, SEO-ready websites."
  };

  return (
    <>
      <SEOHead 
        title="Custom Website Design & Development | AMZ AD SCOUT"
        description="Get a custom website built with React, Next.js and TypeScript: mobile-first, fast-loading and SEO-ready from launch day. Tell us about your project for a quote."
        keywords="Shopify Development Partner, Custom Shopify Theme Development Agency, Shopify E-commerce Store Development, Shopify Store Migration Services, Professional Shopify Developers, Shopify Plus Development Experts, shopify development, shopify developer, shopify theme development, shopify store design, shopify ecommerce, shopify plus, shopify migration, shopify customization, shopify app development, shopify integration, shopify website design, shopify expert, shopify consultant, shopify agency, shopify partner, shopify certified developer, custom shopify store, shopify theme customization, shopify liquid development, shopify template development, shopify responsive design, shopify mobile optimization, shopify speed optimization, shopify seo, shopify conversion optimization, shopify checkout optimization, shopify payment integration, shopify shipping integration, shopify inventory management, shopify product management, shopify collection setup, shopify navigation optimization, shopify homepage design, shopify product page design, shopify landing page, shopify blog setup, shopify content management, shopify multivendor marketplace, shopify b2b store, shopify wholesale, shopify subscription, shopify membership, shopify dropshipping store, shopify print on demand, shopify custom functionality, shopify custom app, shopify private app, shopify public app, shopify app integration, third party integration shopify, api integration shopify, erp integration, crm integration shopify, email marketing integration, social media integration, analytics integration, shipping carrier integration, payment gateway setup, shopify payments, stripe integration, paypal integration, shopify pos, omnichannel retail, shopify abandoned cart, shopify email automation, shopify marketing automation, shopify analytics setup, google analytics shopify, facebook pixel shopify, conversion tracking, shopify store maintenance, shopify support, shopify training, shopify consulting, shopify audit, shopify optimization, shopify performance, shopify security, shopify backup, shopify recovery, shopify troubleshooting"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schema={schema}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/25 to-white text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-900">
        
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-emerald-500/[0.05] via-teal-500/[0.04] to-cyan-500/[0.02]">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-emerald-400/20 via-teal-300/15 to-cyan-300/10 blur-[130px] pointer-events-none" />
          <div className="absolute -top-10 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/80 backdrop-blur-md mb-6 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Next-Gen eCommerce Engineering • React & Shopify
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
              High-Performance Web & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Shopify Development
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              We design and engineer bespoke web applications and high-converting Shopify storefronts. Powered by React, Next.js, and modern headless tools for lightning-fast speed, high conversion rates, and seamless checkout.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02]"
              >
                <Link to="/contact" aria-label="Start Your Web Project">
                  Start Your Project
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
                  View Development Portfolio
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Shopify Development Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>95+ Core Web Vitals Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Modern React / Next.js Architecture</span>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS / STATS SECTION */}
        <section className="py-14 border-b border-slate-200/60 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/40 to-white border border-emerald-200/70 shadow-xs text-center hover:border-teal-400/60 hover:shadow-md transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 leading-snug">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODERN STACK CARDS */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                Modern Web Stack
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Technologies Built for the Next Decade
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
                No bloated legacy CMS plugins. We build with clean, resilient architectures that load in a heartbeat and withstand massive flash-sale traffic spikes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-400/70 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900">{tech.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {tech.tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-20 bg-white border-y border-slate-200/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                Full-Lifecycle Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Our Development Capabilities
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto text-base">
                Everything required to take your digital storefront from idea to enterprise-scale execution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={idx} 
                    className="group relative p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-400/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                      {service.description}
                    </p>
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-slate-600 mt-12 text-sm sm:text-base">
              Selling primarily on Shopify? Explore our dedicated{" "}
              <Link to="/services/shopify-development" className="text-emerald-700 underline hover:text-emerald-800 font-semibold">
                Shopify Development Partner Services
              </Link>
              {" "}for custom Liquid themes and app integrations.
            </p>
          </div>
        </section>

        {/* SHOWCASE HIGHLIGHTS */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {showcasePoints.map((point, idx) => (
                <div 
                  key={idx} 
                  className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 block">
                      {point.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {point.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {point.description}
                    </p>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {point.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        {caseStudies.length > 0 && (
          <section className="py-20 md:py-28 bg-white border-b border-slate-200/70">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                  Storefront Engineering Impact
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                  Web & Shopify Case Studies ({caseStudies.length})
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto text-base">
                  Real speed gains, conversion rate spikes, and custom theme rollouts delivered for online retailers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.slice(0, 6).map((study) => (
                  <div 
                    key={study.id} 
                    onClick={() => handleCaseStudyClick(study)}
                    className="group rounded-3xl bg-slate-50/50 border border-slate-200/90 shadow-sm overflow-hidden hover:border-emerald-400/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                  >
                      <div className="p-7">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                              {study.industry}
                            </span>
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                              {study.client_name}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                            {study.channel}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                          {study.challenge}
                        </p>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed line-clamp-2 bg-white p-3 rounded-xl border border-slate-200/60">
                          <span className="font-semibold text-slate-700">Solution: </span>{study.solution}
                        </p>
                      </div>

                    <div className="px-7 pb-7">
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 mb-4">
                        <div className="text-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {study.results.metric1.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric1.label}
                          </div>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {study.results.metric2.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric2.label}
                          </div>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                            {study.results.metric3.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric3.label}
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="outline"
                        className="w-full border-slate-200 group-hover:border-emerald-400 group-hover:bg-emerald-50/50 text-slate-700 group-hover:text-emerald-800 font-semibold text-xs py-2 rounded-xl"
                      >
                        Read Full Case Study
                        <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {caseStudies.length > 6 && (
                <div className="text-center mt-12">
                  <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8">
                    <Link to="/case-studies">
                      Explore All {caseStudies.length} Development Stories
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* HIGH-CONVERSION CTA */}
        <section className="py-20 pb-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-8 sm:p-14 text-center shadow-xl shadow-teal-500/15">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/10 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm">
                  Free Architecture Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  Ready to Build a Fast, High-Converting Website?
                </h2>
                <p className="text-emerald-50 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                  Let's discuss your requirements, design prototypes, and growth targets. We'll provide a fixed-scope proposal and architectural breakdown.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 py-6 text-base rounded-xl shadow-xl transition-all hover:scale-105"
                  >
                    <Link to="/contact">
                      Request Project Quote
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
                      Schedule a Discovery Call
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <CaseStudyPopup 
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedCaseStudy(null);
        }}
      />

      <Footer />
    </>
  );
};

export default WebsiteDevelopment;

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  Eye, 
  Sparkles,
  Search,
  Zap,
  BarChart3,
  Award,
  Layers,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { getCaseStudiesByService, FormattedCaseStudy } from '@/data/bulkCaseStudiesAdapter';
import CaseStudyPopup from '@/components/CaseStudyPopup';

const ListingOptimizationPage = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = React.useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const caseStudies = React.useMemo(() => getCaseStudiesByService('Listing Optimization'), []);

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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.amzadscout.com/services/listing-optimization#service",
    "name": "Amazon Listing Optimization",
    "serviceType": "Listing optimization",
    "url": "https://www.amzadscout.com/services/listing-optimization",
    "provider": {
      "@type": "Organization",
      "@id": "https://www.amzadscout.com/#organization",
      "name": "AMZ AD SCOUT",
      "url": "https://www.amzadscout.com/"
    },
    "areaServed": "Worldwide",
    "description": "Amazon Listing Optimization Service, E-commerce Listing Optimization Agency, A+ Content Creation and Optimization, Product Photography Optimization Services"
  };

  const stats = [
    { value: '+185%', label: 'Conversion Lift', sub: 'Average increase across client listings' },
    { value: 'Top 3', label: 'Organic Rankings', sub: 'For primary high-intent search terms' },
    { value: '+250%', label: 'Organic Traffic', sub: 'Qualified organic impressions & clicks' },
    { value: '3,200+', label: 'Listings Crafted', sub: 'Optimized for high-growth Amazon brands' }
  ];

  const features = [
    {
      icon: Search,
      title: 'Algorithmic Keyword Harvesting',
      subtitle: 'Amazon A9 / COSMO SEO',
      description: 'In-depth reverse ASIN analysis, search volume clustering, and high-conversion backend search term indexing to ensure maximum indexation and rank dominance.',
      tags: ['Cosmo Algorithm', 'Backend Search Terms', 'Competitor Gap Analysis']
    },
    {
      icon: Eye,
      title: 'High-Converting Copywriting',
      subtitle: 'Persuasion & Clarity',
      description: 'Psychology-driven titles, scannable feature-rich bullet points, and conversion-engineered descriptions crafted to convert casual browsers into repeat buyers.',
      tags: ['Hook & Benefits', 'Compliance Guard', 'Mobile-First Layout']
    },
    {
      icon: Palette,
      title: 'Premium A+ / EBC Design',
      subtitle: 'Brand Story & Visual Assets',
      description: 'High-end Enhanced Brand Content and Premium A+ layouts, cross-sell comparison matrices, brand story modules, and mobile-optimized graphic design.',
      tags: ['Comparison Charts', 'Brand Story Carousel', 'Custom Infographics']
    },
    {
      icon: Target,
      title: 'Visual Architecture & Gallery',
      subtitle: 'Lifestyle & Infographics',
      description: 'Conversion-focused 7-slot visual journey: render enhancements, dimensional infographics, lifestyle context photography, and product feature demonstrations.',
      tags: ['Hero Image Compliance', 'Packaging Callouts', 'Usage Infographics']
    },
    {
      icon: Zap,
      title: 'Continuous A/B Experimentation',
      subtitle: 'Manage Your Experiments (MYE)',
      description: 'Data-driven split testing across hero images, main titles, and A+ content versions with rigorous statistical significance validation.',
      tags: ['A/B Testing', 'CTR Optimization', 'Conversion Lift Tracking']
    },
    {
      icon: ShieldCheck,
      title: 'Policy Compliance & Suppression Defense',
      subtitle: 'Amazon Terms of Service',
      description: 'Proactive scanning against prohibited terms, medical claims, trademark flags, and character limits to prevent suppressed or de-indexed listings.',
      tags: ['Zero Suppression', 'Trademark Defense', 'Claim Compliance']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Listing & Competitor Audit',
      desc: 'We reverse-engineer your top 10 competitors, extract indexing gaps, identify low-converting friction points, and audit existing keyword ranks.'
    },
    {
      step: '02',
      title: 'Search Intent Architecture',
      desc: 'We map transactional search terms to title, bullets, description, and hidden search fields with strict character optimization and zero keyword stuffing.'
    },
    {
      step: '03',
      title: 'Copy & Visual Overhaul',
      desc: 'Our specialized copywriters and graphic designers build compelling copy drafts and stunning visual infographics that elevate brand perceived value.'
    },
    {
      step: '04',
      title: 'Deployment & Split-Testing',
      desc: 'We upload via flat-file or Seller Central, verify live indexing, and launch controlled A/B experiments to continuously squeeze higher conversion rates.'
    }
  ];

  const benefits = [
    'Substantial jump in organic keyword rank velocity',
    'Lower PPC ACoS due to higher organic listing relevancy & conversion rate',
    'Mobile-first layout optimized for over 70% of Amazon mobile shoppers',
    'Elimination of unindexed search terms and suppressed listings',
    'Dedicated creative designer & certified Amazon SEO specialist',
    'Proven track record scaling both 7-figure private labels & enterprise aggregators'
  ];

  return (
    <>
      <SEOHead 
        title="Amazon Listing Optimization & A+ Content | AMZ AD SCOUT"
        description="Turn more Amazon shoppers into buyers with well-researched titles, bullets and descriptions, A+ Content and better images. Request a free listing audit."
        keywords="Amazon Listing Optimization Service, E-commerce Listing Optimization Agency, A+ Content Creation and Optimization, Best Product Listing Optimization Company, Amazon SEO for Product Listings, Product Photography Optimization Services, amazon listing optimization, product listing optimization, amazon seo, listing optimization service, amazon content optimization, product content optimization, ecommerce listing optimization, marketplace listing optimization, amazon a+ content, enhanced brand content amazon, amazon product description, bullet points optimization amazon, product title optimization, backend keywords amazon, search terms amazon, amazon product photography, infographic design amazon, lifestyle images amazon, product image optimization, amazon main image, swatch images amazon, 360 view images, amazon video upload, product video optimization, amazon brand story, amazon comparison chart, amazon size chart, product specifications amazon, product features optimization, amazon product benefits, value proposition amazon, amazon listing copywriting, persuasive copywriting amazon, conversion copywriting, seo copywriting amazon, keyword research amazon, competitor analysis amazon, search volume analysis, keyword difficulty amazon, long tail keywords amazon, buyer keywords amazon, product ranking amazon, organic ranking optimization, search rank improvement amazon, category rank optimization, best seller rank amazon bsr, amazon algorithm optimization, a9 algorithm amazon, relevancy optimization amazon, performance metrics amazon, conversion rate amazon listing, click through rate amazon, add to cart rate amazon, sessions amazon, page views amazon, buy box optimization amazon, amazon choice badge, amazon recommended badge, early reviewer program, vine program amazon, product reviews optimization, review generation amazon, review management amazon, negative review handling, customer questions answers amazon, amazon product qa, listing compliance amazon, terms of service amazon, restricted products amazon, category approval amazon, brand registry benefits, brand analytics amazon, product opportunity explorer, manage your experiments amazon, a b testing amazon listings, multivariate testing amazon, split testing listings, mobile optimization amazon, mobile listing optimization, responsive content amazon, mobile conversion amazon, voice search optimization amazon, alexa shopping optimization, international listings amazon, global expansion amazon, marketplace translation, multi country listings, pan european listings, north america expansion, amazon japan listings, amazon australia optimization, amazon uae listings, seasonal optimization amazon, holiday listing updates, prime day optimization, black friday preparation, cyber monday listings, back to school optimization, gift guide optimization amazon, gifting options amazon, gift wrap eligibility, gift message amazon, subscribe save optimization, subscription program amazon, pantry program amazon, fresh program optimization amazon, amazon launchpad, amazon handmade optimization, luxury beauty amazon, professional services amazon, business listings amazon, amazon business pricing, quantity discounts b2b, b2b product content"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schema={schema}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-amber-50/20 to-white text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
        
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-amber-500/[0.05] via-orange-500/[0.04] to-yellow-500/[0.02]">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-yellow-300/10 blur-[130px] pointer-events-none" />
          <div className="absolute -top-10 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-50 border border-amber-200/80 backdrop-blur-md mb-6 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Conversion Engine • Amazon A9 / COSMO SEO
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
              Amazon Listing Optimization <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                That Outranks & Outconverts
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Transform underperforming product detail pages into organic rank drivers. We merge algorithmic keyword depth, psychological conversion copywriting, and bespoke A+ / EBC visual content to double your unit session percentage.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
              >
                <Link to="/contact" aria-label="Request Free Listing Audit">
                  Request Free Listing Audit
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
                <span>Amazon SPN & Ads Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Brand Registry Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Full TOS & Compliance Guarantee</span>
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
                  className="p-6 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white border border-amber-200/70 shadow-xs text-center hover:border-orange-400/60 hover:shadow-md transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">
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

        {/* WHAT'S INCLUDED / CAPABILITIES */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
                Comprehensive Suite
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                What Sets Our Listings Apart
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
                We combine technical search engine mechanics with human psychological triggers to maximize organic ranking and shopper conversion.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div 
                    key={idx} 
                    className="group relative p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-orange-400/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center text-amber-700 mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                      {feat.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {feat.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                      {feat.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4-STEP METHODOLOGY */}
        <section className="py-20 bg-white border-y border-slate-200/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
                The Blueprint
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                Our 4-Step Optimization Methodology
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto text-base">
                How we take a standard listing and turn it into a category bestseller.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all">
                  <div className="text-3xl font-black text-amber-600/40 mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US / ADVANTAGES */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-lg">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                  Why Leading Brands Trust AMZ AD SCOUT
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Delivering sustainable growth without shortcuts or algorithmic penalties.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/40 border border-amber-200/60">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        {caseStudies.length > 0 && (
          <section className="py-20 md:py-28 bg-white border-b border-slate-200/70">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
                  Verified Performance
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                  Listing Optimization Case Studies ({caseStudies.length})
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto text-base">
                  Real ranking surges, conversion lifts, and catalog turnarounds achieved for our clients.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.slice(0, 6).map((study) => (
                  <div 
                    key={study.id} 
                    onClick={() => handleCaseStudyClick(study)}
                    className="group rounded-3xl bg-slate-50/50 border border-slate-200/90 shadow-sm overflow-hidden hover:border-amber-400/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                  >
                      <div className="p-7">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                              {study.industry}
                            </span>
                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                              {study.client_name}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                            {study.channel}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
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
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            {study.results.metric1.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric1.label}
                          </div>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {study.results.metric2.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric2.label}
                          </div>
                        </div>
                        <div className="text-center p-2.5 rounded-xl bg-white border border-slate-200/80">
                          <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {study.results.metric3.value}
                          </div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {study.results.metric3.label}
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="outline"
                        className="w-full border-slate-200 group-hover:border-amber-400 group-hover:bg-amber-50/50 text-slate-700 group-hover:text-amber-800 font-semibold text-xs py-2 rounded-xl"
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
                      Explore All {caseStudies.length} Listing Optimization Stories
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 p-8 sm:p-14 text-center shadow-xl shadow-orange-500/15">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/10 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm">
                  Free 24-Hour Review
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  Get a Free Listing Audit & Keyword Gap Report
                </h2>
                <p className="text-amber-50 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                  Send us your ASIN. We'll run a full reverse-ASIN competitor check, audit your backend keywords, and deliver 5 actionable revenue opportunities with zero obligation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 py-6 text-base rounded-xl shadow-xl transition-all hover:scale-105"
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

export default ListingOptimizationPage;

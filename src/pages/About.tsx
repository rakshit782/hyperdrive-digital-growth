import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Target, 
  Users, 
  Award, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Globe, 
  BarChart3,
  Sparkles,
  Layers,
  ArrowUpRight,
  Flame,
  Check,
  Building2,
  Workflow,
  Compass,
  Lightbulb
} from "lucide-react";

const About = () => {
  const currentYear = new Date().getFullYear();
  const yearsExperience = `${Math.max(10, currentYear - 2016)}+`;

  const [aboutData, setAboutData] = useState({
    heroTitle: "Accelerating E-commerce Brands Through Profit-Driven Growth",
    heroSubtitle: "900+ Global Sellers & Brands Scaled",
    heroDescription: `AMZ AD SCOUT is a premier marketplace growth agency. With ${yearsExperience} years of specialized expertise across Amazon, Walmart Connect, Meta, and Shopify, we engineer profitable ad strategies, optimize product catalogs, and deliver predictable revenue expansion.`,
    missionText: "To empower modern brands to dominate digital marketplaces by transforming ad spend from a cost center into a high-yield profit engine, backed by rigorous SKU-level analytics and automated precision.",
    visionText: "To be the world's most trusted e-commerce acceleration partner—redefining how brands scale globally across multiple channels with transparency, accountability, and unmatched execution."
  });

  useEffect(() => {
    const savedAbout = localStorage.getItem("about_data");
    if (savedAbout) {
      try {
        setAboutData((prev) => ({ ...prev, ...JSON.parse(savedAbout) }));
      } catch (err) {
        console.warn("Failed to parse about_data", err);
      }
    }
  }, []);

  const stats = [
    { value: "900+", label: "Brands & Sellers Scaled", change: "Across 14 Marketplaces", icon: Users },
    { value: "$50M+", label: "Ad Spend Managed", change: "With Strict P&L Control", icon: BarChart3 },
    { value: "4.8x", label: "Average ROAS", change: "Top-Tier Account Average", icon: TrendingUp },
    { value: yearsExperience, label: "Years Experience", change: "Since 2016", icon: Award }
  ];

  const pillars = [
    {
      icon: Shield,
      title: "Radical Transparency & P&L Focus",
      description: "No vanity metrics. We evaluate performance down to SKU-level profit, true TACoS, and net margins, delivering unvarnished reporting you can trust.",
      tag: "Accountability"
    },
    {
      icon: Target,
      title: "Full-Funnel Advertising Engineering",
      description: "From Sponsored Products keyword harvesting to Sponsored Brands video and Amazon DSP retargeting, we capture shoppers at every stage of their buying journey.",
      tag: "Performance"
    },
    {
      icon: Layers,
      title: "360° Marketplace Management",
      description: "High-converting listing copy, A+ Content architecture, catalog health monitoring, and brand protection working in unison with paid media.",
      tag: "Execution"
    },
    {
      icon: Zap,
      title: "Automation & Dayparting Precision",
      description: "Rule-based bid automation, competitor conquesting, and hour-by-hour budget pacing to eliminate wasted ad spend during low-conversion windows.",
      tag: "Efficiency"
    }
  ];

  const milestones = [
    {
      year: "2016",
      title: "Founded with Single Mission",
      description: "Started as a dedicated Amazon PPC consultancy helping early-stage brand owners cut through algorithm shifts and rising CPCs."
    },
    {
      year: "2019",
      title: "Amazon Ads Verified Partner",
      description: "Earned official partner standing, managing enterprise catalogs and deploying custom bidding technology."
    },
    {
      year: "2021",
      title: "Multi-Marketplace Expansion",
      description: "Expanded capabilities to Walmart Connect, Meta Ads, and Shopify DTC integration for omnichannel dominance."
    },
    {
      year: "2024+",
      title: "900+ Brands & Global Reach",
      description: "Managing international accounts across US, UK, EU, CA, AU, and UAE with continuous profit optimization systems."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Deep-Dive Account Audit",
      desc: "We analyze search term leakage, keyword gaps, catalog health, and SKU margins to pinpoint instant revenue opportunities."
    },
    {
      step: "02",
      title: "Strategic 12-Month Blueprint",
      desc: "We map out target TACoS, budget allocation by portfolio, seasonal pushes, and inventory velocity expectations."
    },
    {
      step: "03",
      title: "Granular Campaign Architecture",
      desc: "Isolating high-intent exact match keywords, harvesting converting broad search terms, and negating bleeders daily."
    },
    {
      step: "04",
      title: "Continuous Scale & Optimization",
      desc: "Weekly cadence reviews, placement multiplier adjustments, dayparting scheduling, and proactive expansion to new channels."
    }
  ];

  const marketplaceExpertise = [
    { name: "Amazon US & Global", detail: "Sponsored Products, SBV, SD & DSP across 10+ regions" },
    { name: "Walmart Connect", detail: "Early-mover advantage with Sponsored Products & search brand amplifiers" },
    { name: "Meta & Social Ads", detail: "High-converting Reels, UGC campaigns, and catalog retargeting funnels" },
    { name: "Shopify & Web Development", detail: "High-speed conversion-optimized custom storefronts and multi-channel sync" },
    { name: "Listing & A+ Content", detail: "Native keyword indexing, premium infographics, and brand store storytelling" },
    { name: "Catalog & Account Health", detail: "Suppression fixes, variation restructuring, and policy protection" }
  ];

  return (
    <>
      <SEOHead 
        title="About Us: How We Grow E-commerce Brands | AMZ AD SCOUT"
        description="Meet AMZ AD SCOUT, the performance marketplace growth agency engineering profit-driven Amazon, Walmart, Meta, and Shopify solutions for 900+ brands."
        keywords="about amz ad scout, e-commerce advertising specialists, amazon ppc agency, walmart marketplace management, shopify growth agency, marketplace advertising experts"
        canonical={typeof window !== "undefined" ? window.location.href : ""}
      />
      <Header />

      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            
            {/* Badges / Happy Clients Status */}
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium mb-8 shadow-inner">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" />
                {aboutData.heroSubtitle}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
              {aboutData.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
              {aboutData.heroDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-blue-600/30 text-base group"
              >
                <Link to="/contact">
                  Get Free Marketplace Audit
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-6 rounded-xl text-base"
              >
                <Link to="/case-studies">
                  Explore 160+ Case Studies
                  <ArrowUpRight className="ml-2 w-4 h-4 text-slate-400" />
                </Link>
              </Button>
            </div>

            {/* Stats Bar */}
            <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left hover:border-blue-500/40 transition-all hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stat.value}</div>
                    <div className="text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stat.change}</div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-50/80 via-slate-50 to-white border border-blue-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-600/20">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {aboutData.missionText}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <span>Results-first execution</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-slate-50 to-white border border-indigo-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-md shadow-indigo-600/20">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {aboutData.visionText}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-700">
                  <span>Global marketplace domination</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PILLARS / VALUES */}
        <section className="py-20 md:py-28 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 bg-white text-blue-700 border-blue-200">
                Our Operating Principles
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                The Four Pillars of How We Operate
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                We believe true agency partners stand or fall on measurable performance, clean communication, and deep technical mastery.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div 
                    key={idx}
                    className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                          {pillar.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* OUR PROVEN 4-STEP METHODOLOGY */}
        <section className="py-20 md:py-28 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-400/30">
                Engineered for Scale
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
                Our 4-Phase Growth Framework
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                A tested, repeatable methodology that turns chaotic PPC accounts into profitable, scalable market leaders.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-3xl font-black text-blue-400/80 mb-4 block font-mono">
                      {step.step}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR JOURNEY TIMELINE */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
                Milestones
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Our Growth Timeline
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Built from the ground up by e-commerce operators who know marketplace algorithms inside out.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white font-mono text-xs font-bold mb-4">
                      {m.year}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {m.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FULL SPECTRUM MARKETPLACE SERVICES */}
        <section className="py-20 md:py-28 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 bg-white text-blue-700 border-blue-200">
                Comprehensive Capabilities
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Everything Your Brand Needs Under One Roof
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                No disjointed agencies. We align listing SEO, creative assets, paid ads, and technical integrations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceExpertise.map((srv, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors mb-1">
                        {srv.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {srv.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL HIGH-IMPACT CTA */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <Badge className="mb-6 bg-white/10 text-blue-200 border-white/20">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
              Take The Next Step
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
              Ready to Accelerate Your E-commerce Growth?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Book a 30-minute discovery call with our marketplace directors. We will dissect your current accounts and show you exactly where wasted spend is hiding.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-6 rounded-xl shadow-xl shadow-blue-500/25 text-base w-full sm:w-auto"
              >
                <Link to="/contact">
                  Request Free Account Audit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-6 rounded-xl text-base w-full sm:w-auto"
              >
                <Link to="/case-studies">
                  Browse 160+ Case Studies
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Verified Amazon Partner
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                No Long-Term Lock-in
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                100% Transparent Reporting
              </span>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default About;

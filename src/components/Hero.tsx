import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Zap, 
  BarChart3, 
  Shield, 
  ShoppingCart, 
  CircleDollarSign, 
  Check 
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CTAButtons {
  primaryText?: string;
  secondaryText?: string;
}

interface StatBlock {
  id: string;
  number: string;
  label: string;
  color: string;
}

const Hero = () => {
  const [ctaButtons, setCTAButtons] = useState<CTAButtons>({
    primaryText: "Get Free Strategy Call",
    secondaryText: "Watch Case Study"
  });

  const [statsBlocks, setStatsBlocks] = useState<StatBlock[]>([
    { id: "campaigns", number: "50K+", label: "Campaigns Managed", color: "from-blue-400 to-cyan-400" },
    { id: "adspend", number: "$50M+", label: "Ad Spend Managed", color: "from-cyan-400 to-purple-400" },
    { id: "roi", number: "~150%", label: "Avg ROI Increase", color: "from-purple-400 to-pink-400" },
    { id: "revenue", number: "$250M+", label: "Revenue Generated", color: "from-pink-400 to-blue-400" }
  ]);

  useEffect(() => {
    // Load CTA buttons from localStorage
    const savedCTAButtons = localStorage.getItem('ctaButtonsData');
    if (savedCTAButtons) {
      try {
        const parsedData = JSON.parse(savedCTAButtons);
        if (parsedData && typeof parsedData === 'object') {
          setCTAButtons(parsedData);
        }
      } catch (error) {
        console.log("Failed to parse CTA buttons data:", error);
      }
    }

    // Load stats blocks from localStorage
    const savedStats = localStorage.getItem('statsData');
    if (savedStats) {
      try {
        const parsedData = JSON.parse(savedStats);
        if (Array.isArray(parsedData)) {
          const updated = parsedData.map(stat => stat.id === 'roi' && stat.number === '300%' ? { ...stat, number: '~150%' } : stat);
          setStatsBlocks(updated);
        }
      } catch (error) {
        console.log("Failed to parse stats data:", error);
      }
    }

    // Listen for CTA buttons updates
    const handleCTAButtonsUpdate = (event: CustomEvent) => {
      setCTAButtons(event.detail);
    };

    // Listen for stats updates
    const handleStatsUpdate = (event: CustomEvent) => {
      setStatsBlocks(event.detail);
    };

    window.addEventListener('ctaButtonsUpdated', handleCTAButtonsUpdate as EventListener);
    window.addEventListener('statsUpdated', handleStatsUpdate as EventListener);

    return () => {
      window.removeEventListener('ctaButtonsUpdated', handleCTAButtonsUpdate as EventListener);
      window.removeEventListener('statsUpdated', handleStatsUpdate as EventListener);
    };
  }, []);

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-mesh opacity-40"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/8 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container-modern relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 animate-fade-in shadow-modern">
                <Sparkles className="w-5 h-5 mr-3 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Trusted by 900+ Leading Brands</span>
                <TrendingUp className="w-5 h-5 ml-3 text-green-600" />
              </div>
              
              {/* Main Heading */}
              <div className="space-y-6 animate-slide-up">
                <h1 className="heading-modern text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 leading-[0.9]">
                  <span className="block">Scale Your Business</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    With Precision
                  </span>
                </h1>
                
                <p className="text-modern text-lg md:text-xl lg:text-2xl font-light text-gray-600 max-w-2xl">
                  Transform your advertising performance with our data-driven strategies across <span className="font-medium text-gray-900">Amazon, Walmart, and Meta platforms</span>
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center animate-scale-in">
                <Button 
                  asChild
                  size="lg" 
                  className="group btn-primary text-lg px-10 py-6 h-auto min-w-64 transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/contact" aria-label={`${ctaButtons.primaryText} — Contact`}>
                    {ctaButtons.primaryText}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="group btn-secondary text-lg px-10 py-6 h-auto min-w-64 transform hover:scale-105 transition-all duration-300"
                >
                  <Link to="/case-studies" aria-label={`${ctaButtons.secondaryText} — Case Studies`}>
                    <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    {ctaButtons.secondaryText}
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Free Audit</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Risk-Free</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">24hr Setup</span>
                </div>
              </div>
            </div>

            {/* Right Graphics - Performance Dashboard Mockup matching Image 1 */}
            <div className="relative">
              {/* Background ambient glows & decorative elements */}
              <div className="absolute -top-12 -right-12 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />

              {/* Ambient Dot Matrix patterns */}
              <div className="absolute -left-6 top-1/4 hidden sm:grid grid-cols-4 gap-2 opacity-30 pointer-events-none" aria-hidden="true">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                ))}
              </div>
              <div className="absolute -right-6 bottom-1/4 hidden sm:grid grid-cols-4 gap-2 opacity-30 pointer-events-none" aria-hidden="true">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                ))}
              </div>

              {/* Top-Right Ambient Connected Line with Node */}
              <svg 
                className="absolute -top-8 -right-6 w-44 h-44 pointer-events-none text-blue-400/35 overflow-visible hidden sm:block" 
                viewBox="0 0 150 150" 
                fill="none"
                aria-hidden="true"
              >
                <path d="M 0 110 Q 60 70 115 35 T 160 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="115" cy="35" r="9" fill="#93c5fd" fillOpacity="0.35" />
                <circle cx="115" cy="35" r="5" fill="#3b82f6" />
              </svg>

              {/* Main Visual Element: Clean White Dashboard Card */}
              <div className="relative bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.08),0_1px_3px_rgba(0,0,0,0.03)] border border-slate-100/90 backdrop-blur-sm z-10">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-6">
                  <div className="flex items-center gap-3.5">
                    {/* Rounded App Icon */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                      <div className="flex items-end gap-1 h-5">
                        <div className="w-1.5 h-2.5 bg-white rounded-full opacity-80" />
                        <div className="w-1.5 h-4 bg-white rounded-full" />
                        <div className="w-1.5 h-5 bg-white rounded-full" />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg sm:text-xl tracking-tight">
                      Performance Dashboard
                    </h3>
                  </div>

                  {/* Window Control Dots: Blue, Purple, Teal/Mint */}
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-indigo-600" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-400" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-300" />
                  </div>
                </div>

                {/* 2x2 Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  
                  {/* 1. ROAS Card */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-100/70 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-6 h-6 text-blue-600 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 tracking-wide mb-0.5">ROAS</div>
                        <div className="text-2xl sm:text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1">6.5x</div>
                        <div className="text-[11px] sm:text-xs font-medium text-emerald-600 flex items-center gap-1">
                          <span>↗</span>
                          <span>+127%</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 pl-2">
                      <svg viewBox="0 0 100 48" className="w-20 sm:w-24 h-11 overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="roasGradHero" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 38 Q 20 42 35 30 T 68 20 T 96 8 L 96 48 L 0 48 Z" fill="url(#roasGradHero)" />
                        <path d="M 0 38 Q 20 42 35 30 T 68 20 T 96 8" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="96" cy="8" r="3.5" fill="#2563eb" />
                      </svg>
                    </div>
                  </div>

                  {/* 2. Revenue Card */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-100/70 flex items-center justify-center shrink-0">
                        <CircleDollarSign className="w-6 h-6 text-emerald-600 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 tracking-wide mb-0.5">Revenue</div>
                        <div className="text-2xl sm:text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1">$250K</div>
                        <div className="text-[11px] sm:text-xs font-medium text-emerald-600 flex items-center gap-1">
                          <span>↗</span>
                          <span>+89%</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 pl-2">
                      <svg viewBox="0 0 100 48" className="w-20 sm:w-24 h-11 overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="revGradHero" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 42 Q 18 36 34 28 T 68 18 T 96 8 L 96 48 L 0 48 Z" fill="url(#revGradHero)" />
                        <path d="M 0 42 Q 18 36 34 28 T 68 18 T 96 8" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="96" cy="8" r="3.5" fill="#059669" />
                      </svg>
                    </div>
                  </div>

                  {/* 3. CVR Card */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-100/70 flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-purple-600 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 tracking-wide mb-0.5">CVR</div>
                        <div className="text-2xl sm:text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1">18%</div>
                        <div className="text-[11px] sm:text-xs font-medium text-emerald-600 flex items-center gap-1">
                          <span>↗</span>
                          <span>+156%</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 pl-2">
                      <svg viewBox="0 0 100 48" className="w-20 sm:w-24 h-11 overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="convGradHero" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 38 Q 20 44 38 32 T 70 24 T 96 10 L 96 48 L 0 48 Z" fill="url(#convGradHero)" />
                        <path d="M 0 38 Q 20 44 38 32 T 70 24 T 96 10" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="96" cy="10" r="3.5" fill="#7c3aed" />
                      </svg>
                    </div>
                  </div>

                  {/* 4. AOV Card */}
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100/70 flex items-center justify-center shrink-0">
                        <ShoppingCart className="w-6 h-6 text-amber-600 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 tracking-wide mb-0.5">AOV</div>
                        <div className="text-2xl sm:text-[26px] font-bold text-slate-800 tracking-tight leading-none mb-1">$225</div>
                        <div className="text-[11px] sm:text-xs font-medium text-emerald-600 flex items-center gap-1">
                          <span>↗</span>
                          <span>+23%</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 pl-2">
                      <svg viewBox="0 0 100 48" className="w-20 sm:w-24 h-11 overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="aovGradHero" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 42 Q 22 40 38 30 T 72 20 T 96 10 L 96 48 L 0 48 Z" fill="url(#aovGradHero)" />
                        <path d="M 0 42 Q 22 40 38 30 T 72 20 T 96 10" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="96" cy="10" r="3.5" fill="#d97706" />
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Bottom Banner: Campaign Optimized */}
                <div className="bg-gradient-to-r from-emerald-50/90 via-emerald-50/60 to-teal-50/40 border border-emerald-100/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between relative overflow-hidden">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-base tracking-tight">
                        Campaign Optimized
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600">
                        Active campaigns optimized for peak performance.
                      </div>
                    </div>
                  </div>

                  {/* Mint Graphic Bars */}
                  <div className="flex items-end gap-1.5 h-8 pr-2 opacity-50 shrink-0" aria-hidden="true">
                    <div className="w-2 h-3.5 bg-emerald-400 rounded-sm" />
                    <div className="w-2 h-5 bg-emerald-400 rounded-sm" />
                    <div className="w-2 h-7 bg-emerald-400 rounded-sm" />
                    <div className="w-2 h-8 bg-emerald-500 rounded-sm" />
                  </div>
                </div>

              </div>

              {/* Floating Bottom-Left 3D Squircle Badge */}
              <div 
                className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-400 to-purple-400 shadow-xl shadow-indigo-500/30 rotate-[-12deg] flex items-center justify-center z-20"
                aria-hidden="true"
              >
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.5]" />
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {statsBlocks.map((stat, index) => (
              <div 
                key={stat.id} 
                className="group relative"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="card-modern p-8 text-center min-h-[140px] flex flex-col justify-center relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-gray-600 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements. Positions are fixed so server HTML and hydration match. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse-modern"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
              animationDuration: `${2.4 + (i % 4) * 0.7}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;


import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, TrendingUp, CheckCircle, Users, Award, Zap, Target, BarChart3, Shield } from "lucide-react";
import { useState, useEffect } from "react";

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
    { id: "campaigns", number: "500+", label: "Campaigns Managed", color: "from-blue-400 to-cyan-400" },
    { id: "adspend", number: "$50M+", label: "Ad Spend Managed", color: "from-cyan-400 to-purple-400" },
    { id: "roi", number: "300%", label: "Avg ROI Increase", color: "from-purple-400 to-pink-400" },
    { id: "monitoring", number: "24/7", label: "Account Monitoring", color: "from-pink-400 to-blue-400" }
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
          setStatsBlocks(parsedData);
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

  const handlePrimaryButtonClick = () => {
    window.location.href = '/free-audit';
  };

  const handleSecondaryButtonClick = () => {
    window.location.href = '/case-studies';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
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
                <span className="text-sm font-medium text-gray-700">Trusted by 500+ Leading Brands</span>
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
                  Transform your advertising performance with our data-driven strategies across 
                  <span className="font-medium text-gray-900"> Amazon, Walmart, and Meta platforms</span>
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center animate-scale-in">
                <Button 
                  size="lg" 
                  className="group btn-primary text-lg px-10 py-6 h-auto min-w-64 transform hover:scale-105 transition-all duration-300"
                  onClick={handlePrimaryButtonClick}
                >
                  {ctaButtons.primaryText}
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group btn-secondary text-lg px-10 py-6 h-auto min-w-64 transform hover:scale-105 transition-all duration-300"
                  onClick={handleSecondaryButtonClick}
                >
                  <Play className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  {ctaButtons.secondaryText}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
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

            {/* Right Graphics */}
            <div className="relative">
              {/* Main Visual Element */}
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200/50 backdrop-blur-sm">
                {/* Dashboard Mockup */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                      <span className="font-semibold text-gray-900">Performance Dashboard</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">ROAS</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">4.2x</div>
                      <div className="text-xs text-blue-600">+127% vs last month</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Revenue</span>
                      </div>
                      <div className="text-2xl font-bold text-green-900">$89K</div>
                      <div className="text-xs text-green-600">+89% growth</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Conversions</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-900">2.4K</div>
                      <div className="text-xs text-purple-600">+156% increase</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-900">AOV</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-900">$156</div>
                      <div className="text-xs text-orange-600">+23% higher</div>
                    </div>
                  </div>

                  {/* Success Indicator */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl text-white">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Campaign Optimized</div>
                        <div className="text-sm opacity-90">Your ads are performing 300% better</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg" style={{ animation: 'pulse 2s infinite' }}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-60 blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-60 blur-xl"></div>
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

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse-modern"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

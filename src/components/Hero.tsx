
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-pink-500/15 rounded-full blur-lg animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-indigo-500/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>
      
      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Enhanced Typography with smaller fonts */}
          <div className="mb-12 space-y-6">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-8">
              <Sparkles className="w-5 h-5 mr-3 text-cyan-400" />
              <span className="text-base font-medium text-cyan-100">Trusted by 500+ Businesses</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none">
              <span className="block mb-4">Ready to Scale</span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Your Business?
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed mt-8">
              Join hundreds of successful brands that have scaled their revenue with our data-driven advertising strategies across Amazon, Walmart, and Meta platforms.
            </p>
          </div>
          
          {/* Enhanced CTA Buttons with smaller sizes */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 text-white px-10 py-6 text-xl font-bold rounded-3xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 hover:-translate-y-3 border border-blue-400/30"
              onClick={handlePrimaryButtonClick}
            >
              {ctaButtons.primaryText}
              <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-cyan-400/50 bg-white/10 backdrop-blur-sm text-cyan-100 hover:bg-cyan-400/20 hover:border-cyan-400 px-10 py-6 text-xl font-bold rounded-3xl transition-all duration-500 hover:scale-110 hover:-translate-y-3"
              onClick={handleSecondaryButtonClick}
            >
              <Play className="mr-4 w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
              {ctaButtons.secondaryText}
            </Button>
          </div>
          
          {/* Smaller and More Symmetrical Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {statsBlocks.map((stat, index) => (
              <div key={stat.id} className="group w-full">
                <div 
                  className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full flex flex-col justify-center items-center text-center min-h-[120px] sm:min-h-[140px] hover:bg-white/15"
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                  
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-blue-200/90 text-xs sm:text-sm lg:text-base font-semibold leading-tight px-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
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

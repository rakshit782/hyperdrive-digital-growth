
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react";
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
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-mesh opacity-40"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/8 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container-modern relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 mb-8 animate-fade-in shadow-modern">
            <Sparkles className="w-5 h-5 mr-3 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Trusted by 500+ Leading Brands</span>
            <TrendingUp className="w-5 h-5 ml-3 text-green-600" />
          </div>
          
          {/* Main Heading */}
          <div className="mb-12 space-y-6 animate-slide-up">
            <h1 className="heading-modern text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gray-900 leading-[0.9] max-w-5xl mx-auto">
              <span className="block">Scale Your Business</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                With Precision
              </span>
            </h1>
            
            <p className="text-modern text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-light">
              Transform your advertising performance with our data-driven strategies across 
              <span className="font-medium text-gray-900"> Amazon, Walmart, and Meta platforms</span>
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-scale-in">
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
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {statsBlocks.map((stat, index) => (
              <div 
                key={stat.id} 
                className="group relative"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="card-modern p-8 text-center min-h-[140px] flex flex-col justify-center relative overflow-hidden">
                  {/* Background gradient on hover */}
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

import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, CheckCircle, Shield, Music, Image as ImageIcon } from "lucide-react";
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
    primaryText: "Explore Content",
    secondaryText: "Submit Content"
  });

  const [statsBlocks, setStatsBlocks] = useState<StatBlock[]>([
    { id: "creators", number: "15,000+", label: "Creators", color: "from-lime-400 to-green-500" },
    { id: "events", number: "500+", label: "Events", color: "from-green-400 to-emerald-500" },
    { id: "products", number: "2,900+", label: "Products", color: "from-lime-300 to-green-400" }
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80" 
          alt="Creative team collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
      </div>

      {/* Side Icons */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-6 hidden lg:block z-20">
        <div className="w-12 h-12 bg-yellow-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-yellow-500/30 hover:bg-yellow-500/30 transition-all cursor-pointer">
          <Music className="w-6 h-6 text-yellow-500" />
        </div>
        <div className="w-12 h-12 bg-yellow-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-yellow-500/30 hover:bg-yellow-500/30 transition-all cursor-pointer">
          <ImageIcon className="w-6 h-6 text-yellow-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Top Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-fade-in">
            {statsBlocks.map((stat, index) => (
              <div key={stat.id} className="flex items-center gap-2">
                <span className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </span>
                <span className="text-white/80 text-sm md:text-base">• {stat.label}</span>
                {index < statsBlocks.length - 1 && (
                  <span className="text-white/40 hidden sm:inline ml-4">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 animate-slide-up leading-tight">
            <span className="text-white">Your Business</span>
            <span className="text-white"> — </span>
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-lime-400 bg-clip-text text-transparent">
              Discover, Create
            </span>
            <span className="block bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
              & Connect
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Connect with 15K+ Creators & Vendors Nationwide
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-lime-400 hover:from-yellow-500 hover:via-yellow-400 hover:to-lime-500 text-gray-900 px-10 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 min-w-[200px]"
              onClick={handlePrimaryButtonClick}
            >
              {ctaButtons.primaryText}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/90 bg-transparent hover:bg-white/10 text-white px-10 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              onClick={handleSecondaryButtonClick}
            >
              <Upload className="mr-2 w-5 h-5" />
              {ctaButtons.secondaryText}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-white text-sm font-medium">100% Nigerian-Owned</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm font-medium">Verified Creators</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">Supporting Local Talent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;

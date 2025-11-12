import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Target } from "lucide-react";

interface CTAData {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  showSecondaryButton: boolean;
  backgroundStyle: string;
}

const defaultCTAData: CTAData = {
  title: "Ready to Scale Your Business?",
  subtitle: "Get Your Free Strategy Session Today",
  description: "Join hundreds of successful e-commerce businesses that have transformed their advertising results with our expert team. Let's discuss how we can help you achieve your growth goals.",
  primaryButtonText: "Get Free Strategy Call",
  primaryButtonLink: "/contact",
  secondaryButtonText: "View Case Studies",
  secondaryButtonLink: "/case-studies",
  showSecondaryButton: true,
  backgroundStyle: "gradient"
};

const CTA = () => {
  const [ctaData, setCTAData] = useState<CTAData>(defaultCTAData);

  useEffect(() => {
    console.log("CTA: Component mounted, initializing...");
    
    const loadCTAData = () => {
      const savedCTA = localStorage.getItem('ctaData');
      if (savedCTA) {
        try {
          const parsedData = JSON.parse(savedCTA);
          if (parsedData && typeof parsedData === 'object') {
            console.log("CTA: Loaded from localStorage:", parsedData);
            setCTAData({ ...defaultCTAData, ...parsedData });
          } else {
            console.log("CTA: Invalid localStorage data, using defaults");
            setCTAData(defaultCTAData);
          }
        } catch (error) {
          console.error("CTA: Error parsing saved CTA data:", error);
          setCTAData(defaultCTAData);
        }
      }
    };

    // Load CTA data on mount
    loadCTAData();

    // Listen for updates from dashboard
    const handleCTAUpdate = (event: CustomEvent) => {
      console.log("CTA: Received update event:", event.detail);
      if (event.detail && typeof event.detail === 'object') {
        setCTAData({ ...defaultCTAData, ...event.detail });
      }
    };

    window.addEventListener('ctaUpdated', handleCTAUpdate as EventListener);
    
    return () => {
      window.removeEventListener('ctaUpdated', handleCTAUpdate as EventListener);
    };
  }, []);

  const getBackgroundClass = () => {
    switch (ctaData.backgroundStyle) {
      case 'solid':
        return 'bg-slate-900';
      case 'blue':
        return 'bg-blue-900';
      case 'gradient':
      default:
        return 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900';
    }
  };

  return (
    <section className={`py-20 ${getBackgroundClass()} text-white relative overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl mb-8">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          {/* Subtitle */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6">
            <TrendingUp className="w-4 h-4 mr-2 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-100">{ctaData.subtitle}</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {ctaData.title}
          </h2>

          {/* Description */}
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            {ctaData.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 hover:from-blue-600 hover:via-blue-700 hover:to-purple-600 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-blue-400/30"
              onClick={() => window.location.href = '/contact'}
            >
              <Target className="mr-3 w-6 h-6" />
              {ctaData.primaryButtonText}
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            {ctaData.showSecondaryButton && (
              <Button 
                size="lg" 
                className="group border-2 border-cyan-400/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-slate-900 hover:border-white px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-xl"
                onClick={() => window.location.href = ctaData.secondaryButtonLink}
              >
                {ctaData.secondaryButtonText}
              </Button>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-slate-400 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">$50M+</div>
              <div className="text-slate-400 text-sm">Ad Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">300%</div>
              <div className="text-slate-400 text-sm">Avg ROI Increase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CTA };
export default CTA;

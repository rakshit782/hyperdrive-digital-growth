
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

const DynamicHero = () => {
  const { settings, isLoading } = useWebsiteSettings();

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="animate-pulse text-center">
          <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: settings.primaryColor }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: settings.secondaryColor }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})` 
              }}
            >
              {settings.heroTitle}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            {settings.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: settings.primaryColor }}
            >
              {settings.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 rounded-xl border-2 hover:shadow-lg transition-all duration-300"
              style={{ borderColor: settings.primaryColor, color: settings.primaryColor }}
            >
              View Case Studies
            </Button>
          </div>

          {/* Company Info */}
          <div className="text-center">
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: settings.primaryColor }}
            >
              {settings.companyName}
            </h2>
            <p 
              className="text-lg font-medium"
              style={{ color: settings.secondaryColor }}
            >
              {settings.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicHero;

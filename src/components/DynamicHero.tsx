
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
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
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              {settings.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
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
            <div className="text-center lg:text-left">
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

          {/* Right Content - Converting bright pastel image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&auto=format&fit=crop&crop=center&q=80"
                alt="Bright modern workspace with pastel colors - Success and growth visualization"
                className="w-full h-64 md:h-80 object-cover rounded-xl"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-300 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                ✓ Proven Results
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-pink-300 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                📈 Growth Focused
              </div>
            </div>
            
            {/* Floating stats around the image with bright pastel colors */}
            <div className="absolute top-4 left-4 bg-gradient-to-br from-cyan-100 to-cyan-200 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-cyan-200">
              <div className="text-2xl font-bold text-cyan-700">+385%</div>
              <div className="text-xs text-cyan-600">Revenue Growth</div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-gradient-to-br from-rose-100 to-rose-200 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-rose-200">
              <div className="text-2xl font-bold text-rose-700">2.4M</div>
              <div className="text-xs text-rose-600">Impressions</div>
            </div>

            <div className="absolute top-1/2 -left-6 bg-gradient-to-br from-violet-100 to-violet-200 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-violet-200">
              <div className="text-2xl font-bold text-violet-700">12.8%</div>
              <div className="text-xs text-violet-600">CTR Increase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicHero;

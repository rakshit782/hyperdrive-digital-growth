
import { useState, useEffect } from "react";
import { ArrowRight, Play, CheckCircle, Star, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSettings {
  headline: {
    main: string;
    highlight: string;
    subtitle: string;
  };
  description: string;
  cta: {
    primary: {
      text: string;
      link: string;
      enabled: boolean;
    };
    secondary: {
      text: string;
      link: string;
      enabled: boolean;
    };
  };
  stats: {
    enabled: boolean;
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
  };
  trustBadge: {
    enabled: boolean;
    rating: string;
    text: string;
  };
  urgency: {
    enabled: boolean;
    text: string;
  };
  backgroundImages: Array<{
    url: string;
    alt: string;
  }>;
}

const defaultBackgroundImages = [
  {
    url: "https://images.unsplash.com/photo-1557264337-e8a93017fe92?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80&fm=webp",
    alt: "Abstract digital gradient with flowing lines"
  },
  {
    url: "https://images.unsplash.com/photo-1551703599146-cd7355d43c9d?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80&fm=webp",
    alt: "Blue purple gradient mesh pattern"
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80&fm=webp",
    alt: "Dark tech pattern with light streaks"
  },
  {
    url: "https://images.unsplash.com/photo-1557264305-7e2764da873b?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80&fm=webp",
    alt: "Futuristic gradient background"
  },
  {
    url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80&fm=webp",
    alt: "Digital abstract pattern"
  }
];

const defaultSettings: HeroSettings = {
  headline: {
    main: "Get 3x",
    highlight: "Higher ROAS",
    subtitle: "in 90 Days"
  },
  description: "Join 500+ brands that increased their advertising revenue by an average of 300% with our proven Amazon, Walmart & Meta strategies.",
  cta: {
    primary: {
      text: "Get FREE $2,000 Audit",
      link: "/free-audit",
      enabled: true
    },
    secondary: {
      text: "Watch Success Stories",
      link: "#",
      enabled: true
    }
  },
  stats: {
    enabled: true,
    stat1: { value: "300%", label: "Avg ROAS Increase" },
    stat2: { value: "24hrs", label: "Setup Time" },
    stat3: { value: "98%", label: "Client Retention" }
  },
  trustBadge: {
    enabled: true,
    rating: "4.9/5",
    text: "from 500+ Happy Clients"
  },
  urgency: {
    enabled: true,
    text: "🔥 Limited Time: Only 10 spots left this month"
  },
  backgroundImages: defaultBackgroundImages
};

const ModernHero = () => {
  const [settings, setSettings] = useState<HeroSettings>(defaultSettings);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('heroSettings');
      if (savedSettings) {
        try {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings({ ...defaultSettings, ...parsedSettings });
        } catch (error) {
          console.error("ModernHero: Error parsing hero settings:", error);
        }
      }
    };

    loadSettings();

    const handleSettingsUpdate = (event: CustomEvent) => {
      if (event.detail) {
        setSettings(event.detail);
      }
    };

    window.addEventListener('heroSettingsUpdated', handleSettingsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('heroSettingsUpdated', handleSettingsUpdate as EventListener);
    };
  }, []);

  // Background image slider
  useEffect(() => {
    if (settings.backgroundImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === settings.backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [settings.backgroundImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {settings.backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* Additional gradient overlay for enhanced readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/30"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 w-full max-w-6xl">
        <div className="text-center space-y-8">
          {/* Trust badge with social proof */}
          {settings.trustBadge.enabled && (
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/25 shadow-xl mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">
                {settings.trustBadge.rating} {settings.trustBadge.text}
              </span>
            </div>
          )}

          {/* Main converting headline - Better centered and symmetrical */}
          <div className="space-y-6 max-w-5xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] tracking-tight">
              <span className="block mb-2">{settings.headline.main}</span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent block mb-2">
                {settings.headline.highlight}
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white/95">
                {settings.headline.subtitle}
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto font-medium">
              {settings.description}
            </p>
          </div>

          {/* CTA buttons - Better spacing and prominence */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 pb-6">
            {settings.cta.primary.enabled && (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 border-0 h-auto"
                onClick={() => window.location.href = settings.cta.primary.link}
              >
                {settings.cta.primary.text}
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            )}
            
            {settings.cta.secondary.enabled && (
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/40 bg-white/15 backdrop-blur-md hover:bg-white/25 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-auto"
                onClick={() => window.location.href = settings.cta.secondary.link}
              >
                <Play className="w-6 h-6 mr-3" />
                {settings.cta.secondary.text}
              </Button>
            )}
          </div>

          {/* Social proof numbers - More prominent and centered */}
          {settings.stats.enabled && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white/15 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-white/25 shadow-xl max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-3">{settings.stats.stat1.value}</div>
                <div className="text-base text-white/90 font-medium">{settings.stats.stat1.label}</div>
              </div>
              <div className="text-center sm:border-x border-white/25">
                <div className="text-3xl lg:text-4xl font-bold text-emerald-400 mb-3">{settings.stats.stat2.value}</div>
                <div className="text-base text-white/90 font-medium">{settings.stats.stat2.label}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-3">{settings.stats.stat3.value}</div>
                <div className="text-base text-white/90 font-medium">{settings.stats.stat3.label}</div>
              </div>
            </div>
          )}

          {/* Trust indicators with icons - Better spacing */}
          <div className="flex flex-wrap items-center gap-8 pt-6 justify-center">
            <div className="flex items-center gap-3 text-white/90">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <span className="text-base font-semibold">No Setup Fees</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-base font-semibold">Risk-Free Guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Zap className="w-6 h-6 text-amber-400" />
              <span className="text-base font-semibold">Results in 24hrs</span>
            </div>
          </div>

          {/* Urgency element */}
          {settings.urgency.enabled && (
            <div className="bg-gradient-to-r from-orange-500/25 to-red-500/25 border border-orange-400/40 rounded-2xl p-5 inline-block backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-200 font-semibold text-base">
                  {settings.urgency.text}
                </span>
              </div>
            </div>
          )}

          {/* Slider indicators - Only show if multiple images */}
          {settings.backgroundImages.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {settings.backgroundImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white w-8' : 'bg-white/40'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModernHero;


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
}

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
  }
};

// Professional background images with abstract digital gradients and tech patterns
const backgroundImages = [
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
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16 flex items-center">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

      <div className="relative z-10 container mx-auto px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge with social proof */}
          {settings.trustBadge.enabled && (
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg mb-8">
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

          {/* Main converting headline */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              <span className="block mb-3">{settings.headline.main}</span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent block mb-3">
                {settings.headline.highlight}
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{settings.headline.subtitle}</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium">
              {settings.description}
            </p>
          </div>

          {/* Social proof numbers */}
          {settings.stats.enabled && (
            <div className="grid grid-cols-3 gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg max-w-2xl mx-auto my-12">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-blue-400 mb-2">{settings.stats.stat1.value}</div>
                <div className="text-sm text-white/80 font-medium">{settings.stats.stat1.label}</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-xl lg:text-2xl font-bold text-emerald-400 mb-2">{settings.stats.stat2.value}</div>
                <div className="text-sm text-white/80 font-medium">{settings.stats.stat2.label}</div>
              </div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-purple-400 mb-2">{settings.stats.stat3.value}</div>
                <div className="text-sm text-white/80 font-medium">{settings.stats.stat3.label}</div>
              </div>
            </div>
          )}

          {/* CTA buttons with urgency */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            {settings.cta.primary.enabled && (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 border-0"
                onClick={() => window.location.href = settings.cta.primary.link}
              >
                {settings.cta.primary.text}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            )}
            
            {settings.cta.secondary.enabled && (
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = settings.cta.secondary.link}
              >
                <Play className="w-5 h-5 mr-3" />
                {settings.cta.secondary.text}
              </Button>
            )}
          </div>

          {/* Trust indicators with icons */}
          <div className="flex flex-wrap items-center gap-8 pt-8 justify-center">
            <div className="flex items-center gap-2 text-white/80">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold">No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold">Risk-Free Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold">Results in 24hrs</span>
            </div>
          </div>

          {/* Urgency element */}
          {settings.urgency.enabled && (
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-xl p-4 inline-block mt-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-200 font-semibold text-sm">
                  {settings.urgency.text}
                </span>
              </div>
            </div>
          )}

          {/* Slider indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {backgroundImages.map((_, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default ModernHero;

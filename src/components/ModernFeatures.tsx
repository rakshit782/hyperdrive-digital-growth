
import { useState, useEffect } from "react";
import { Shield, Zap, TrendingUp, Users, Award, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  metric: string;
  label: string;
  isActive: boolean;
}

const defaultFeatures: Feature[] = [
  {
    id: "roi",
    icon: "TrendingUp",
    title: "ROI-Driven Results",
    description: "Average 300% increase in ROAS within 90 days",
    metric: "300%",
    label: "ROAS Increase",
    isActive: true
  },
  {
    id: "security",
    icon: "Shield",
    title: "Enterprise Security",
    description: "SOC 2 compliant with advanced data protection",
    metric: "100%",
    label: "Data Security",
    isActive: true
  },
  {
    id: "speed",
    icon: "Zap",
    title: "Lightning Fast Setup",
    description: "Get campaigns running in 24 hours or less",
    metric: "24hrs",
    label: "Setup Time",
    isActive: true
  },
  {
    id: "support",
    icon: "Users",
    title: "Dedicated Support",
    description: "Expert account managers for personalized growth",
    metric: "24/7",
    label: "Support Available",
    isActive: true
  },
  {
    id: "experts",
    icon: "Award",
    title: "Certified Experts",
    description: "Amazon, Meta, and Google certified professionals",
    metric: "50+",
    label: "Certifications",
    isActive: true
  },
  {
    id: "satisfaction",
    icon: "Star",
    title: "Client Satisfaction",
    description: "98% client retention rate with proven results",
    metric: "98%",
    label: "Retention Rate",
    isActive: true
  }
];

const iconMap = {
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  Star
};

const ModernFeatures = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('modern-features');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    const loadFeatures = () => {
      const savedFeatures = localStorage.getItem('modernFeaturesData');
      if (savedFeatures) {
        try {
          const parsedData = JSON.parse(savedFeatures);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setFeatures(parsedData.filter((feature: Feature) => feature.isActive));
          }
        } catch (error) {
          console.error("ModernFeatures: Error parsing saved features:", error);
        }
      }
    };

    loadFeatures();

    const handleFeaturesUpdate = (event: CustomEvent) => {
      if (event.detail && Array.isArray(event.detail)) {
        setFeatures(event.detail.filter((feature: Feature) => feature.isActive));
      }
    };

    window.addEventListener('modernFeaturesUpdated', handleFeaturesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('modernFeaturesUpdated', handleFeaturesUpdate as EventListener);
    };
  }, []);

  return (
    <section 
      id="modern-features" 
      className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
            <Star className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Why Leading Brands Choose Us
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Cutting-edge technology meets proven strategies to deliver exceptional results for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Star;
            return (
              <Card 
                key={feature.id}
                className={`group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/20 hover:scale-102 hover:-translate-y-1 ${
                  isVisible ? 'animate-in slide-in-from-bottom-4' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {feature.metric}
                      </div>
                      <div className="text-xs text-slate-500">{feature.label}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModernFeatures;

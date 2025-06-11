
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, TrendingUp, Target, Users, Zap, BarChart3 } from "lucide-react";

interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  bgGradient: string;
  link: string;
}

const iconMap = {
  ShoppingCart,
  TrendingUp,
  Target,
  Users,
  Zap,
  BarChart3,
};

const defaultServices: ServiceCard[] = [
  {
    id: "amazon-advertising",
    icon: "ShoppingCart",
    title: "Amazon Advertising",
    description: "Maximize your Amazon presence with our expert PPC management and optimization strategies.",
    features: ["PPC Campaign Management", "Keyword Optimization", "Bid Management", "Performance Analytics"],
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    link: "/amazon-advertising"
  },
  {
    id: "walmart-advertising",
    icon: "TrendingUp",
    title: "Walmart Advertising",
    description: "Grow your business on Walmart Marketplace with targeted advertising campaigns.",
    features: ["Walmart Connect Ads", "Product Listing Optimization", "Campaign Strategy", "ROI Tracking"],
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
    link: "/walmart-advertising"
  },
  {
    id: "meta-advertising",
    icon: "Target",
    title: "Meta Advertising",
    description: "Drive traffic and sales through strategic Facebook and Instagram advertising campaigns.",
    features: ["Facebook Ads", "Instagram Ads", "Audience Targeting", "Creative Optimization"],
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    link: "/meta-advertising"
  },
  {
    id: "account-management",
    icon: "Users",
    title: "Account Management",
    description: "Professional account oversight and strategic guidance for your e-commerce success.",
    features: ["Dedicated Account Manager", "Strategic Planning", "Performance Reviews", "Growth Strategies"],
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    link: "/account-management"
  },
  {
    id: "shopify-integration",
    icon: "Zap",
    title: "Shopify Integration",
    description: "Seamlessly integrate your Shopify store with various marketing platforms and tools.",
    features: ["Platform Integration", "Data Synchronization", "Automated Workflows", "Custom Solutions"],
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-50 to-blue-50",
    link: "/shopify-integration"
  },
  {
    id: "shopify-development",
    icon: "BarChart3",
    title: "Shopify Development",
    description: "Custom Shopify development and optimization for enhanced performance and conversions.",
    features: ["Custom Development", "Theme Optimization", "App Integration", "Performance Tuning"],
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
    link: "/shopify-development"
  }
];

const Services = () => {
  const [services, setServices] = useState<ServiceCard[]>(defaultServices);

  useEffect(() => {
    console.log("Services: Component mounted, initializing...");
    
    const loadServices = () => {
      const savedServices = localStorage.getItem('servicesData');
      if (savedServices) {
        try {
          const parsedData = JSON.parse(savedServices);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            console.log("Services: Loaded from localStorage:", parsedData.length);
            setServices(parsedData);
          } else {
            console.log("Services: Invalid localStorage data, using defaults");
            setServices(defaultServices);
          }
        } catch (error) {
          console.error("Services: Error parsing saved services:", error);
          setServices(defaultServices);
        }
      }
    };

    loadServices();

    const handleServicesUpdate = (event: CustomEvent) => {
      console.log("Services: Received update event:", event.detail);
      if (event.detail && Array.isArray(event.detail)) {
        setServices(event.detail);
      }
    };

    window.addEventListener('servicesUpdated', handleServicesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('servicesUpdated', handleServicesUpdate as EventListener);
    };
  }, []);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || ShoppingCart;
    return IconComponent;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 mb-6">
            <span className="text-sm font-medium text-blue-700">Our Expertise</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive e-commerce advertising solutions designed to maximize your ROI and accelerate growth across all major platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <Card 
                key={service.id} 
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${service.bgGradient} hover:-translate-y-3 border-white/60 hover:border-white/80`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardHeader className="pb-6 relative z-10">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-3">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-slate-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-4 group-hover:scale-125 transition-transform duration-300`} style={{ animationDelay: `${idx * 50}ms` }} />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:scale-105 hover:shadow-xl text-white font-semibold py-4 rounded-2xl transition-all duration-500 group-hover:shadow-2xl border-0`}
                    onClick={() => window.location.href = service.link}
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;


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

    // Load services on mount
    loadServices();

    // Listen for updates from dashboard
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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive e-commerce advertising solutions designed to maximize your ROI and accelerate growth across all major platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon);
            return (
              <Card key={service.id} className={`group hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${service.bgGradient} hover:-translate-y-2 border-white/40`}>
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg`}
                    onClick={() => window.location.href = service.link}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

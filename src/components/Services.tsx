
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  ShoppingCart, 
  Store, 
  Users, 
  Settings, 
  Link2, 
  Code, 
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react";

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

const defaultServices: ServiceCard[] = [
  {
    id: "amazon-advertising",
    icon: "ShoppingCart",
    title: "Amazon Advertising",
    description: "Expert PPC management, keyword optimization, and campaign strategies that maximize your Amazon sales and ROI.",
    features: ["Sponsored Products", "Sponsored Brands", "Keyword Research", "Performance Analytics"],
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    link: "/amazon-advertising"
  },
  {
    id: "walmart-advertising",
    icon: "Store",
    title: "Walmart Advertising",
    description: "Comprehensive Walmart Connect advertising solutions to boost your visibility and sales on the growing marketplace.",
    features: ["Search Ads", "Display Campaigns", "Video Advertising", "Performance Analytics"],
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
    link: "/walmart-advertising"
  },
  {
    id: "meta-advertising",
    icon: "Users",
    title: "Meta Advertising",
    description: "Facebook and Instagram ad campaigns that drive traffic, generate leads, and increase conversions for your business.",
    features: ["Facebook Ads", "Instagram Campaigns", "Audience Targeting", "Creative Optimization"],
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    link: "/meta-advertising"
  },
  {
    id: "account-management",
    icon: "Settings",
    title: "Complete Account Management",
    description: "Full-service account management with dedicated specialists monitoring and optimizing your campaigns 24/7.",
    features: ["24/7 Monitoring", "Performance Reports", "Strategy Optimization", "Dedicated Manager"],
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    link: "/account-management"
  },
  {
    id: "shopify-integration",
    icon: "Link2",
    title: "Shopify Integration",
    description: "Seamless integration of your Shopify store with Amazon and Walmart marketplaces for unified inventory management.",
    features: ["Inventory Sync", "Order Management", "Product Listing", "Multi-channel Setup"],
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-50 to-blue-50",
    link: "/shopify-integration"
  },
  {
    id: "shopify-development",
    icon: "Code",
    title: "Shopify Development",
    description: "Custom Shopify store development and theme customization to create a powerful e-commerce presence.",
    features: ["Custom Themes", "App Integration", "Mobile Optimization", "Speed Enhancement"],
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50",
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
          console.error("Services: Failed to parse localStorage data:", error);
          setServices(defaultServices);
        }
      } else {
        console.log("Services: No localStorage data, using defaults");
        setServices(defaultServices);
      }
    };

    // Initial load
    loadServices();

    const handleServicesUpdate = (event: CustomEvent) => {
      console.log("Services: Received update event with data:", event.detail?.length);
      if (event.detail && Array.isArray(event.detail)) {
        setServices(event.detail);
      }
    };

    window.addEventListener('servicesUpdated', handleServicesUpdate as EventListener);

    return () => {
      window.removeEventListener('servicesUpdated', handleServicesUpdate as EventListener);
    };
  }, []);

  // Debug: Log current services whenever it changes
  useEffect(() => {
    console.log("Services: Current services count:", services.length);
  }, [services]);

  const getIconComponent = (iconName: string) => {
    const icons = {
      ShoppingCart,
      Store,
      Users,
      Settings,
      Link2,
      Code,
      TrendingUp
    };
    return icons[iconName as keyof typeof icons] || ShoppingCart;
  };

  const ServiceCardComponent = ({ service, index }: { service: ServiceCard, index: number }) => {
    const IconComponent = getIconComponent(service.icon);
    return (
      <Card className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm h-full`}>
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
        
        <CardHeader className="pb-6 relative z-10">
          <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {service.title}
          </CardTitle>
          <CardDescription className="text-slate-600 leading-relaxed text-lg">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <ul className="space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-slate-700 text-base">
                <div className={`w-3 h-3 bg-gradient-to-r ${service.gradient} rounded-full mr-4 opacity-80`}></div>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            variant="outline" 
            className={`w-full group-hover:bg-gradient-to-r group-hover:${service.gradient} group-hover:text-white group-hover:border-transparent transition-all duration-500 py-6 text-lg font-semibold rounded-xl border-2`}
            onClick={() => window.location.href = service.link}
          >
            Learn More
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-32 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 tracking-wide">OUR SERVICES</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
            Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Expert Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Comprehensive digital marketing solutions designed to scale your business across all major platforms with cutting-edge strategies
          </p>
        </div>
        
        {/* Desktop Grid View */}
        <div className="hidden md:grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCardComponent key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden mb-20">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={service.id}>
                  <div className="p-1">
                    <ServiceCardComponent service={service} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-blue-400/30"
            onClick={() => window.location.href = '/pricing'}
          >
            View Pricing
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;

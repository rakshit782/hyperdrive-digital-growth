
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Store, Users, Settings, Link2, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Amazon Advertising',
      description: 'Expert PPC management, keyword optimization, and campaign strategies that maximize your Amazon sales and ROI.',
      icon: ShoppingCart,
      link: '/amazon-advertising',
      bgGradient: 'from-orange-500 via-red-500 to-pink-500',
      features: ['Sponsored Products', 'Sponsored Brands', 'Keyword Research', 'Performance Analytics']
    },
    {
      title: 'Walmart Advertising',
      description: 'Comprehensive Walmart Connect advertising solutions to boost your visibility and sales on the growing marketplace.',
      icon: Store,
      link: '/walmart-advertising',
      bgGradient: 'from-blue-500 via-indigo-500 to-purple-500',
      features: ['Search Ads', 'Display Campaigns', 'Video Advertising', 'Performance Analytics']
    },
    {
      title: 'Google Advertising',
      description: 'Drive targeted traffic and conversions with strategic Google Ads campaigns that deliver measurable results.',
      icon: Settings,
      link: '/google-advertising',
      bgGradient: 'from-green-500 via-teal-500 to-blue-500',
      features: ['Search Campaigns', 'Display Network', 'Shopping Ads', 'Performance Max']
    },
    {
      title: 'Meta Advertising',
      description: 'Facebook and Instagram ad campaigns that drive traffic, generate leads, and increase conversions for your business.',
      icon: Users,
      link: '/meta-advertising',
      bgGradient: 'from-purple-500 via-pink-500 to-red-500',
      features: ['Facebook Ads', 'Instagram Campaigns', 'Audience Targeting', 'Creative Optimization']
    },
    {
      title: 'Account Management',
      description: 'Full-service account management with dedicated specialists monitoring and optimizing your campaigns 24/7.',
      icon: Settings,
      link: '/account-management',
      bgGradient: 'from-indigo-500 via-purple-500 to-pink-500',
      features: ['24/7 Monitoring', 'Performance Reports', 'Strategy Optimization', 'Dedicated Manager']
    },
    {
      title: 'Website Development',
      description: 'Custom website development and design solutions that convert visitors into customers and drive business growth.',
      icon: Code,
      link: '/website-development',
      bgGradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      features: ['Custom Design', 'Mobile Optimization', 'SEO Integration', 'Performance Optimization']
    },
    {
      title: 'Shopify Development',
      description: 'Expert Shopify store development and customization to create a powerful e-commerce presence that drives sales.',
      icon: Code,
      link: '/shopify-development',
      bgGradient: 'from-emerald-500 via-green-500 to-teal-500',
      features: ['Custom Themes', 'App Integration', 'Mobile Optimization', 'Speed Enhancement']
    },
    {
      title: 'Shopify Integration',
      description: 'Seamlessly integrate your Shopify store with Amazon and Walmart marketplaces for unified inventory management.',
      icon: Link2,
      link: '/shopify-integration',
      bgGradient: 'from-teal-500 via-cyan-500 to-blue-500',
      features: ['Inventory Sync', 'Order Management', 'Product Listing', 'Multi-channel Setup']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-lime-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive digital marketing solutions designed to grow your business across all major platforms
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 hover:-translate-y-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 overflow-hidden"
                onClick={() => navigate(service.link)}
              >
                <div className={`h-2 bg-gradient-to-r ${service.bgGradient}`}></div>
                
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.bgGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-white/70 mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-full border border-white/20"
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-full border border-white/20">
                          +{service.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-white/80 hover:bg-yellow-500/20 hover:text-yellow-400 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.link);
                    }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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

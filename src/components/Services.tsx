
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Store, Users, Settings, Link2, Code, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Advertising for Amazon Sellers',
      description: 'Expert PPC management, keyword optimization, and campaign strategies that maximize your sales and ROI on Amazon.',
      icon: ShoppingCart,
      link: '/services/amazon-advertising',
      gradient: 'from-orange-500 to-red-500',
      bgGlow: 'bg-orange-500/10',
      features: ['Sponsored Products', 'Sponsored Brands', 'Keyword Research', 'Performance Analytics'],
      stats: '+340% Avg. Revenue Growth'
    },
    {
      title: 'Walmart Advertising',
      description: 'Comprehensive Walmart Connect advertising solutions to boost your visibility and sales on the growing marketplace.',
      icon: Store,
      link: '/services/walmart-advertising',
      gradient: 'from-blue-500 to-cyan-500',
      bgGlow: 'bg-blue-500/10',
      features: ['Search Ads', 'Display Campaigns', 'Video Advertising', 'Performance Analytics'],
      stats: '+280% Avg. Sales Increase'
    },
    {
      title: 'Google Advertising',
      description: 'Drive targeted traffic and conversions with strategic Google Ads campaigns that deliver measurable results.',
      icon: Target,
      link: '/services/google-advertising',
      gradient: 'from-green-500 to-emerald-500',
      bgGlow: 'bg-green-500/10',
      features: ['Search Campaigns', 'Display Network', 'Shopping Ads', 'Performance Max'],
      stats: '+45% Lower CPA'
    },
    {
      title: 'Meta Advertising',
      description: 'Facebook and Instagram ad campaigns that drive traffic, generate leads, and increase conversions for your business.',
      icon: Users,
      link: '/services/meta-advertising',
      gradient: 'from-purple-500 to-pink-500',
      bgGlow: 'bg-purple-500/10',
      features: ['Facebook Ads', 'Instagram Campaigns', 'Audience Targeting', 'Creative Optimization'],
      stats: '+3.2x ROAS Average'
    },
    {
      title: 'Account Management',
      description: 'Full-service account management with dedicated specialists monitoring and optimizing your campaigns 24/7.',
      icon: Settings,
      link: '/services/account-management',
      gradient: 'from-indigo-500 to-violet-500',
      bgGlow: 'bg-indigo-500/10',
      features: ['24/7 Monitoring', 'Performance Reports', 'Strategy Optimization', 'Dedicated Manager'],
      stats: '500+ Brands Managed'
    },
    {
      title: 'Website Development',
      description: 'Custom website development and design solutions that convert visitors into customers and drive business growth.',
      icon: Code,
      link: '/services/website-development',
      gradient: 'from-cyan-500 to-blue-500',
      bgGlow: 'bg-cyan-500/10',
      features: ['Custom Design', 'Mobile Optimization', 'SEO Integration', 'Performance Optimization'],
      stats: '+65% Conversion Rate'
    },
    {
      title: 'Shopify Development',
      description: 'Expert Shopify store development and customization to create a powerful e-commerce presence that drives sales.',
      icon: TrendingUp,
      link: '/services/shopify-development',
      gradient: 'from-emerald-500 to-teal-500',
      bgGlow: 'bg-emerald-500/10',
      features: ['Custom Themes', 'App Integration', 'Mobile Optimization', 'Speed Enhancement'],
      stats: '200+ Stores Built'
    },
    {
      title: 'Shopify Integration',
      description: 'Seamlessly integrate your Shopify store with Amazon and Walmart marketplaces for unified inventory management.',
      icon: Link2,
      link: '/services/shopify-integration',
      gradient: 'from-teal-500 to-cyan-500',
      bgGlow: 'bg-teal-500/10',
      features: ['Inventory Sync', 'Order Management', 'Product Listing', 'Multi-channel Setup'],
      stats: '99.9% Sync Accuracy'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Comprehensive Solutions for
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              E-commerce Growth
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            From advertising to development, we provide end-to-end services to help your business thrive across all major platforms
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group cursor-pointer relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl"
                onClick={() => navigate(service.link)}
              >
                {/* Top Gradient Line */}
                <div className={`h-1 bg-gradient-to-r ${service.gradient}`} />
                
                {/* Background Glow on Hover */}
                <div className={`absolute inset-0 ${service.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardHeader className="relative z-10 pb-2">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <CardDescription className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </CardDescription>
                  
                  {/* Stats Badge */}
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r ${service.gradient} bg-opacity-10 mb-4`}>
                    <span className="text-xs font-semibold text-slate-700">{service.stats}</span>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                          +{service.features.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-0 h-auto font-semibold text-slate-700 group-hover:text-blue-600 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.link);
                    }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
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

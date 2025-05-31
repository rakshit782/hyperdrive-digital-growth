
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Store, 
  Users, 
  Settings, 
  Link2, 
  Code, 
  TrendingUp,
  ArrowRight 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: ShoppingCart,
      title: "Amazon Advertising",
      description: "Expert PPC management, keyword optimization, and campaign strategies that maximize your Amazon sales and ROI.",
      features: ["Sponsored Products", "Sponsored Brands", "DSP Campaigns", "Keyword Research"]
    },
    {
      icon: Store,
      title: "Walmart Advertising",
      description: "Comprehensive Walmart Connect advertising solutions to boost your visibility and sales on the growing marketplace.",
      features: ["Search Ads", "Display Campaigns", "Video Advertising", "Performance Analytics"]
    },
    {
      icon: Users,
      title: "Meta Advertising",
      description: "Facebook and Instagram ad campaigns that drive traffic, generate leads, and increase conversions for your business.",
      features: ["Facebook Ads", "Instagram Campaigns", "Audience Targeting", "Creative Optimization"]
    },
    {
      icon: Settings,
      title: "Complete Account Management",
      description: "Full-service account management with dedicated specialists monitoring and optimizing your campaigns 24/7.",
      features: ["24/7 Monitoring", "Performance Reports", "Strategy Optimization", "Dedicated Manager"]
    },
    {
      icon: Link2,
      title: "Shopify Integration",
      description: "Seamless integration of your Shopify store with Amazon and Walmart marketplaces for unified inventory management.",
      features: ["Inventory Sync", "Order Management", "Product Listing", "Multi-channel Setup"]
    },
    {
      icon: Code,
      title: "Shopify Development",
      description: "Custom Shopify store development and theme customization to create a powerful e-commerce presence.",
      features: ["Custom Themes", "App Integration", "Mobile Optimization", "Speed Enhancement"]
    },
    {
      icon: TrendingUp,
      title: "Shopify Optimization",
      description: "Conversion rate optimization, SEO improvements, and performance enhancements for your Shopify store.",
      features: ["CRO Audits", "SEO Optimization", "Site Speed", "UX Improvements"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Our <span className="text-blue-600">Expert Services</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital marketing solutions designed to scale your business across all major platforms
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Get Custom Strategy
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;

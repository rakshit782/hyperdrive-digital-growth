import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ArrowRight } from "lucide-react";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}

const defaultPricing: PricingTier[] = [
  {
    id: "basic",
    name: "Basic Package",
    price: "$999",
    period: "/month",
    description: "Perfect for small businesses starting their advertising journey",
    features: [
      "Amazon PPC Management",
      "Basic Keyword Research",
      "Monthly Performance Reports",
      "Email Support",
      "Campaign Setup & Optimization"
    ],
    popular: false,
    buttonText: "Get Started"
  },
  {
    id: "professional",
    name: "Professional Package", 
    price: "$1,999",
    period: "/month",
    description: "Comprehensive solution for growing businesses",
    features: [
      "Amazon + Walmart Advertising",
      "Advanced Keyword Research",
      "Weekly Performance Reports",
      "Priority Support",
      "A/B Testing",
      "Competitor Analysis",
      "Landing Page Optimization"
    ],
    popular: true,
    buttonText: "Most Popular"
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    price: "$3,999", 
    period: "/month",
    description: "Full-service solution for established businesses",
    features: [
      "Amazon + Walmart + Meta Advertising",
      "Complete Account Management",
      "Daily Performance Monitoring",
      "24/7 Dedicated Support",
      "Custom Strategy Development",
      "Shopify Integration",
      "Advanced Analytics Dashboard",
      "Monthly Strategy Calls"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
];

const Pricing = () => {
  const [pricingData, setPricingData] = useState<PricingTier[]>(defaultPricing);

  // Load pricing from localStorage and listen for updates
  useEffect(() => {
    const loadPricingData = () => {
      const savedPricing = localStorage.getItem('pricingData');
      if (savedPricing) {
        try {
          const parsed = JSON.parse(savedPricing);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPricingData(parsed);
          }
        } catch (error) {
          console.error('Failed to parse pricing data:', error);
        }
      }
    };

    // Load initial data
    loadPricingData();

    // Listen for pricing updates from dashboard
    const handlePricingUpdate = (event: CustomEvent) => {
      if (event.detail && Array.isArray(event.detail)) {
        setPricingData(event.detail);
      }
    };

    window.addEventListener('pricingUpdated', handlePricingUpdate as EventListener);

    return () => {
      window.removeEventListener('pricingUpdated', handlePricingUpdate as EventListener);
    };
  }, []);

  // Get the maximum number of features to make cards symmetrical
  const maxFeatures = Math.max(...pricingData.map(tier => tier.features.length));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Simple <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Choose the perfect plan to scale your business. All packages include our expert management and proven strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingData.map((tier) => (
              <Card 
                key={tier.id} 
                className={`relative flex flex-col h-full ${
                  tier.popular 
                    ? 'border-blue-500 shadow-2xl scale-105 bg-gradient-to-br from-blue-50 to-cyan-50' 
                    : 'border-gray-200 shadow-lg hover:shadow-xl'
                } transition-all duration-300`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                    {tier.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    {tier.period && <span className="text-slate-600">{tier.period}</span>}
                  </div>
                  <CardDescription className="text-slate-600 leading-relaxed min-h-[3rem] flex items-center justify-center">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 flex-grow flex flex-col">
                  <ul className="space-y-4 flex-grow">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                    {/* Add empty list items to maintain consistent height */}
                    {Array.from({ length: maxFeatures - tier.features.length }).map((_, index) => (
                      <li key={`spacer-${index}`} className="invisible">
                        <span className="text-slate-700">.</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 mt-auto ${
                      tier.popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                        : 'bg-slate-900 hover:bg-slate-800'
                    } text-white font-semibold rounded-xl`}
                    onClick={() => window.location.href = '/contact'}
                  >
                    {tier.buttonText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-slate-600 mb-6">
              Need a custom solution? Our team can create a tailored package for your specific needs.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={() => window.location.href = '/free-audit'}
            >
              Get Free Audit for Custom Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

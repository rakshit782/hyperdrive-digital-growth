
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, Plus, Trash2, Check, Star, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
  ctaLink: string;
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
    buttonText: "Get Started",
    ctaLink: "/free-audit"
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
    buttonText: "Most Popular",
    ctaLink: "/free-audit"
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
    buttonText: "Contact Sales",
    ctaLink: "/contact"
  }
];

const PricingManagement = () => {
  const { toast } = useToast();
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(defaultPricing);
  const [activeTab, setActiveTab] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedPricing = localStorage.getItem('pricingPlansData');
    if (savedPricing) {
      try {
        const parsed = JSON.parse(savedPricing);
        if (Array.isArray(parsed)) {
          setPricingTiers(parsed);
          if (parsed.length > 0 && !activeTab) {
            setActiveTab(parsed[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to parse pricing settings:', error);
      }
    } else if (pricingTiers.length > 0 && !activeTab) {
      setActiveTab(pricingTiers[0].id);
    }
  }, [activeTab, pricingTiers.length]);

  const handleSave = () => {
    // Save to localStorage with correct key
    localStorage.setItem('pricingPlansData', JSON.stringify(pricingTiers));
    
    // Dispatch custom event to update pricing page
    window.dispatchEvent(new CustomEvent('pricingPlansUpdated', { detail: pricingTiers }));
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    toast({
      title: "Pricing Updated",
      description: "Your pricing plans have been saved successfully."
    });
  };

  const updateTier = (id: string, field: keyof PricingTier, value: string | boolean | string[]) => {
    setPricingTiers(prev => prev.map(tier => 
      tier.id === id ? { ...tier, [field]: value } : tier
    ));
  };

  const updateFeatures = (id: string, features: string) => {
    const featuresArray = features.split('\n').filter(f => f.trim() !== '');
    updateTier(id, 'features', featuresArray);
  };

  const addTier = () => {
    const newTier: PricingTier = {
      id: `tier-${Date.now()}`,
      name: "New Plan",
      price: "$1,000",
      period: "/month",
      description: "Description for new plan",
      features: ["Feature 1", "Feature 2"],
      popular: false,
      buttonText: "Get Started",
      ctaLink: "/free-audit"
    };
    setPricingTiers(prev => [...prev, newTier]);
    setActiveTab(newTier.id);
  };

  const removeTier = (id: string) => {
    const newTiers = pricingTiers.filter(tier => tier.id !== id);
    setPricingTiers(newTiers);
    
    // Switch to first available tab if current tab is being deleted
    if (activeTab === id && newTiers.length > 0) {
      setActiveTab(newTiers[0].id);
    }
  };

  const setPopular = (id: string) => {
    setPricingTiers(prev => prev.map(tier => ({
      ...tier,
      popular: tier.id === id
    })));
  };

  const getCurrentTier = () => {
    return pricingTiers.find(tier => tier.id === activeTab);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg mr-3">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Pricing Management</CardTitle>
                <CardDescription>Configure pricing tiers and plans</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={addTier} size="sm" variant="outline" className="bg-white/50">
                <Plus className="w-4 h-4 mr-2" />
                Add Plan
              </Button>
              <Button 
                onClick={handleSave} 
                size="sm"
                className={`transition-all duration-300 ${
                  isSaved 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                } shadow-lg`}
              >
                {isSaved ? "✓ Saved!" : "Save Changes"}
              </Button>
            </div>
          </div>
        </CardHeader>

        {pricingTiers.length > 0 ? (
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {pricingTiers.map((tier) => (
                <AccordionItem key={tier.id} value={tier.id} className="border rounded-lg mb-4 bg-white/30">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-slate-800">{tier.name}</span>
                        {tier.popular && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-slate-700">{tier.price}{tier.period}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Side - Form */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg text-slate-800">Edit {tier.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => setPopular(tier.id)}
                              size="sm"
                              variant={tier.popular ? "default" : "outline"}
                              className={tier.popular ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-white/50"}
                            >
                              {tier.popular ? <Star className="w-4 h-4 mr-1" /> : null}
                              {tier.popular ? "Popular" : "Set Popular"}
                            </Button>
                            {pricingTiers.length > 1 && (
                              <Button 
                                onClick={() => removeTier(tier.id)} 
                                size="sm" 
                                variant="outline"
                                className="text-red-600 hover:text-red-700 bg-white/50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Plan Name</Label>
                            <Input
                              value={tier.name}
                              onChange={(e) => updateTier(tier.id, 'name', e.target.value)}
                              placeholder="Starter"
                              className="bg-white/50 border-white/30 focus:border-cyan-500"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Button Text</Label>
                            <Input
                              value={tier.buttonText}
                              onChange={(e) => updateTier(tier.id, 'buttonText', e.target.value)}
                              placeholder="Get Started"
                              className="bg-white/50 border-white/30 focus:border-cyan-500"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Price</Label>
                            <Input
                              value={tier.price}
                              onChange={(e) => updateTier(tier.id, 'price', e.target.value)}
                              placeholder="$2,500"
                              className="bg-white/50 border-white/30 focus:border-cyan-500"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Period</Label>
                            <Input
                              value={tier.period}
                              onChange={(e) => updateTier(tier.id, 'period', e.target.value)}
                              placeholder="/month"
                              className="bg-white/50 border-white/30 focus:border-cyan-500"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">Description</Label>
                          <Textarea
                            value={tier.description}
                            onChange={(e) => updateTier(tier.id, 'description', e.target.value)}
                            placeholder="Perfect for small businesses..."
                            rows={3}
                            className="bg-white/50 border-white/30 focus:border-cyan-500"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">Features (one per line)</Label>
                          <Textarea
                            value={tier.features.join('\n')}
                            onChange={(e) => updateFeatures(tier.id, e.target.value)}
                            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                            rows={6}
                            className="bg-white/50 border-white/30 focus:border-cyan-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-slate-700">CTA Link</Label>
                          <Input
                            value={tier.ctaLink}
                            onChange={(e) => updateTier(tier.id, 'ctaLink', e.target.value)}
                            placeholder="/free-audit"
                            className="bg-white/50 border-white/30 focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      {/* Right Side - Live Preview */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-slate-800 mb-4">Live Preview</h4>
                        <Card 
                          className={`relative w-full max-w-sm mx-auto ${
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
                            <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                              {tier.name}
                            </CardTitle>
                            <div className="mb-4">
                              <span className="text-3xl font-bold text-slate-900">{tier.price}</span>
                              {tier.period && <span className="text-slate-600">{tier.period}</span>}
                            </div>
                            <CardDescription className="text-slate-600 leading-relaxed text-sm">
                              {tier.description}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="space-y-6">
                            <ul className="space-y-3">
                              {tier.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-700 text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <Button 
                              className={`w-full py-3 ${
                                tier.popular
                                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                                  : 'bg-slate-900 hover:bg-slate-800'
                              } text-white font-semibold rounded-xl`}
                            >
                              {tier.buttonText}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        ) : (
          <CardContent className="text-center py-12">
            <p className="text-slate-600 mb-4">No pricing plans yet. Create your first plan to get started.</p>
            <Button onClick={addTier} className="bg-gradient-to-r from-cyan-500 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Create First Plan
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default PricingManagement;

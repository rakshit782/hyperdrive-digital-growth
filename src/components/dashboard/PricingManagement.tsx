import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Plus, Trash2, Eye, Star, Check } from "lucide-react";

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
    id: "starter",
    name: "Starter",
    price: "$2,500",
    period: "/month",
    description: "Perfect for small businesses starting their Amazon journey",
    features: [
      "Up to 2 products managed",
      "Basic keyword research",
      "Monthly performance reports",
      "Email support"
    ],
    popular: false,
    buttonText: "Get Started"
  },
  {
    id: "growth",
    name: "Growth",
    price: "$5,000",
    period: "/month",
    description: "Ideal for growing businesses looking to scale their presence",
    features: [
      "Up to 10 products managed",
      "Advanced keyword research",
      "Bi-weekly optimization",
      "Dedicated account manager",
      "Phone & email support"
    ],
    popular: true,
    buttonText: "Start Growing"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Comprehensive solution for large-scale operations",
    features: [
      "Unlimited products",
      "Full-service management",
      "Weekly strategy calls",
      "Custom reporting",
      "24/7 priority support"
    ],
    popular: false,
    buttonText: "Contact Us"
  }
];

const PricingManagement = () => {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(defaultPricing);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedPricing = localStorage.getItem('pricingData');
    if (savedPricing) {
      try {
        const parsed = JSON.parse(savedPricing);
        if (Array.isArray(parsed)) {
          setPricingTiers(parsed);
        }
      } catch (error) {
        console.error('Failed to parse pricing settings:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('pricingData', JSON.stringify(pricingTiers));
    window.dispatchEvent(new CustomEvent('pricingUpdated', { detail: pricingTiers }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
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
      buttonText: "Get Started"
    };
    setPricingTiers(prev => [...prev, newTier]);
  };

  const removeTier = (id: string) => {
    setPricingTiers(prev => prev.filter(tier => tier.id !== id));
  };

  const setPopular = (id: string) => {
    setPricingTiers(prev => prev.map(tier => ({
      ...tier,
      popular: tier.id === id
    })));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Settings Panel */}
      <div className="xl:col-span-2">
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
              <Button onClick={addTier} size="sm" variant="outline" className="bg-white/50">
                <Plus className="w-4 h-4 mr-2" />
                Add Tier
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {pricingTiers.map((tier, index) => (
              <div key={tier.id} className="border border-white/30 rounded-lg p-4 space-y-4 bg-white/30">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-slate-700">Pricing Tier {index + 1}</h4>
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
                    <Button 
                      onClick={() => removeTier(tier.id)} 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700 bg-white/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
                    rows={2}
                    className="bg-white/50 border-white/30 focus:border-cyan-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">Features (one per line)</Label>
                  <Textarea
                    value={tier.features.join('\n')}
                    onChange={(e) => updateFeatures(tier.id, e.target.value)}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    rows={4}
                    className="bg-white/50 border-white/30 focus:border-cyan-500"
                  />
                </div>
              </div>
            ))}
            
            <Button 
              onClick={handleSave} 
              className={`w-full transition-all duration-300 ${
                isSaved 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save Pricing Configuration"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview Panel */}
      <div className="xl:col-span-1">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl sticky top-6">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Live Preview</CardTitle>
                <CardDescription>Pricing cards preview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pricingTiers.map((tier) => (
                <div key={tier.id} className={`relative bg-white rounded-lg p-4 shadow-sm border ${
                  tier.popular ? 'ring-2 ring-cyan-500 border-cyan-500' : 'border-gray-200'
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="font-bold text-slate-900 text-sm">{tier.name}</h3>
                    <div className="flex items-baseline justify-center mt-2">
                      <span className="text-2xl font-bold text-slate-900">{tier.price}</span>
                      <span className="text-slate-600 text-sm ml-1">{tier.period}</span>
                    </div>
                    <p className="text-slate-600 text-xs mt-2">{tier.description}</p>
                  </div>
                  
                  <ul className="mt-4 space-y-1">
                    {tier.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-xs text-slate-600">
                        <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {tier.features.length > 3 && (
                      <li className="text-xs text-slate-400">
                        +{tier.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                  
                  <Button 
                    className={`w-full mt-4 text-xs ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' 
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                    size="sm"
                  >
                    {tier.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingManagement;

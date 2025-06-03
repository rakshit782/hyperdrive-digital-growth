
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Plus, Trash2 } from "lucide-react";

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            <div>
              <CardTitle>Pricing Management</CardTitle>
              <CardDescription>Configure pricing tiers and plans</CardDescription>
            </div>
          </div>
          <Button onClick={addTier} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Tier
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {pricingTiers.map((tier, index) => (
          <div key={tier.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Pricing Tier {index + 1}</h4>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setPopular(tier.id)}
                  size="sm"
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.popular ? "Popular" : "Set Popular"}
                </Button>
                <Button 
                  onClick={() => removeTier(tier.id)} 
                  size="sm" 
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Plan Name</Label>
                <Input
                  value={tier.name}
                  onChange={(e) => updateTier(tier.id, 'name', e.target.value)}
                  placeholder="Starter"
                />
              </div>
              
              <div>
                <Label>Button Text</Label>
                <Input
                  value={tier.buttonText}
                  onChange={(e) => updateTier(tier.id, 'buttonText', e.target.value)}
                  placeholder="Get Started"
                />
              </div>
              
              <div>
                <Label>Price</Label>
                <Input
                  value={tier.price}
                  onChange={(e) => updateTier(tier.id, 'price', e.target.value)}
                  placeholder="$2,500"
                />
              </div>
              
              <div>
                <Label>Period</Label>
                <Input
                  value={tier.period}
                  onChange={(e) => updateTier(tier.id, 'period', e.target.value)}
                  placeholder="/month"
                />
              </div>
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={tier.description}
                onChange={(e) => updateTier(tier.id, 'description', e.target.value)}
                placeholder="Perfect for small businesses..."
                rows={2}
              />
            </div>
            
            <div>
              <Label>Features (one per line)</Label>
              <Textarea
                value={tier.features.join('\n')}
                onChange={(e) => updateFeatures(tier.id, e.target.value)}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                rows={5}
              />
            </div>
          </div>
        ))}
        
        <Button onClick={handleSave} className={`w-full ${isSaved ? "bg-green-600" : ""}`}>
          {isSaved ? "Saved!" : "Save Pricing Configuration"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingManagement;


import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save, Plus, Trash2 } from "lucide-react";

const pricingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  features: z.string().min(1, "Features are required"),
  buttonText: z.string().min(1, "Button text is required"),
});

interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof pricingSchema>>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      features: "",
      buttonText: "",
    },
  });

  // Load pricing data from localStorage
  useEffect(() => {
    const savedPricing = localStorage.getItem('pricingData');
    if (savedPricing) {
      setPricingTiers(JSON.parse(savedPricing));
    } else {
      // Default pricing tiers
      const defaultTiers: PricingTier[] = [
        {
          id: "basic",
          name: "Basic Package",
          price: "$999",
          description: "Perfect for small businesses starting their advertising journey",
          features: [
            "Amazon PPC Management",
            "Basic Keyword Research",
            "Monthly Performance Reports",
            "Email Support",
            "Campaign Setup & Optimization"
          ],
          buttonText: "Get Started"
        },
        {
          id: "professional",
          name: "Professional Package",
          price: "$1,999",
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
          buttonText: "Contact Sales"
        }
      ];
      setPricingTiers(defaultTiers);
      localStorage.setItem('pricingData', JSON.stringify(defaultTiers));
    }
  }, []);

  const savePricingData = (data: PricingTier[]) => {
    localStorage.setItem('pricingData', JSON.stringify(data));
    setPricingTiers(data);
  };

  const onSubmit = (values: z.infer<typeof pricingSchema>) => {
    const features = values.features.split('\n').filter(f => f.trim());
    
    const newTier: PricingTier = {
      id: editingIndex !== null ? pricingTiers[editingIndex].id : `tier-${Date.now()}`,
      name: values.name,
      price: values.price,
      description: values.description,
      features,
      buttonText: values.buttonText,
      popular: editingIndex !== null ? pricingTiers[editingIndex].popular : false,
    };

    let updatedTiers;
    if (editingIndex !== null) {
      updatedTiers = [...pricingTiers];
      updatedTiers[editingIndex] = newTier;
    } else {
      updatedTiers = [...pricingTiers, newTier];
    }

    savePricingData(updatedTiers);
    
    toast({
      title: editingIndex !== null ? "Pricing Updated!" : "Pricing Added!",
      description: "The pricing tier has been saved successfully.",
    });

    form.reset();
    setEditingIndex(null);
  };

  const editTier = (index: number) => {
    const tier = pricingTiers[index];
    form.setValue('name', tier.name);
    form.setValue('price', tier.price);
    form.setValue('description', tier.description);
    form.setValue('features', tier.features.join('\n'));
    form.setValue('buttonText', tier.buttonText);
    setEditingIndex(index);
  };

  const deleteTier = (index: number) => {
    const updatedTiers = pricingTiers.filter((_, i) => i !== index);
    savePricingData(updatedTiers);
    
    toast({
      title: "Pricing Deleted!",
      description: "The pricing tier has been removed.",
    });
  };

  const togglePopular = (index: number) => {
    const updatedTiers = pricingTiers.map((tier, i) => ({
      ...tier,
      popular: i === index ? !tier.popular : false
    }));
    savePricingData(updatedTiers);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <Settings className="w-8 h-8 mr-3 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900">Pricing Dashboard</h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle>{editingIndex !== null ? 'Edit' : 'Add'} Pricing Tier</CardTitle>
                  <CardDescription>
                    {editingIndex !== null ? 'Update the pricing tier details' : 'Create a new pricing tier for your services'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Package Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Basic Package" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., $999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Brief description of the package" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Features (one per line)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Amazon PPC Management&#10;Basic Keyword Research&#10;Monthly Reports"
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="buttonText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Button Text</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Get Started" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          {editingIndex !== null ? 'Update' : 'Add'} Pricing
                        </Button>
                        {editingIndex !== null && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              form.reset();
                              setEditingIndex(null);
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Current Pricing Tiers */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Current Pricing Tiers</h2>
                {pricingTiers.map((tier, index) => (
                  <Card key={tier.id} className={tier.popular ? 'border-blue-500' : ''}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{tier.name}</CardTitle>
                          <div className="text-2xl font-bold text-blue-600">{tier.price}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={tier.popular ? "default" : "outline"}
                            onClick={() => togglePopular(index)}
                          >
                            {tier.popular ? 'Popular' : 'Set Popular'}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => editTier(index)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteTier(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-3">{tier.description}</p>
                      <div className="text-sm text-slate-500">
                        <strong>Features:</strong> {tier.features.slice(0, 2).join(', ')}
                        {tier.features.length > 2 && ` +${tier.features.length - 2} more`}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

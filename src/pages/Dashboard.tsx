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
import { Settings, Save, Plus, Trash2, Phone, Mail, Clock, Upload, Image, MousePointer, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pricingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  features: z.string().min(1, "Features are required"),
  buttonText: z.string().min(1, "Button text is required"),
});

const contactSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  businessHours: z.string().min(1, "Business hours are required"),
  address: z.string().min(1, "Address is required"),
});

const logoSchema = z.object({
  logoUrl: z.string().min(1, "Logo URL is required"),
  logoSize: z.string().min(1, "Logo size is required"),
  logoAlt: z.string().min(1, "Logo alt text is required"),
});

const ctaButtonSchema = z.object({
  primaryText: z.string().min(1, "Primary button text is required"),
  secondaryText: z.string().min(1, "Secondary button text is required"),
});

const statsSchema = z.object({
  number: z.string().min(1, "Number is required"),
  label: z.string().min(1, "Label is required"),
  color: z.string().min(1, "Color is required"),
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

interface ContactInfo {
  phone?: string;
  email?: string;
  businessHours?: string;
  address?: string;
}

interface LogoSettings {
  logoUrl?: string;
  logoSize?: string;
  logoAlt?: string;
}

interface CTAButtons {
  primaryText?: string;
  secondaryText?: string;
}

interface StatBlock {
  id: string;
  number: string;
  label: string;
  color: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+1 (555) 123-4567",
    email: "hello@amzadscout.com",
    businessHours: "Mon-Fri: 9AM-6PM PST",
    address: "123 Business St, Suite 100, San Francisco, CA 94105"
  });
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
    logoSize: "h-12",
    logoAlt: "AMZ AD SCOUT - The Growth Agency"
  });
  const [ctaButtons, setCTAButtons] = useState<CTAButtons>({
    primaryText: "Get Free Strategy Call",
    secondaryText: "Watch Case Study"
  });
  const [statsBlocks, setStatsBlocks] = useState<StatBlock[]>([]);
  const [editingStatsIndex, setEditingStatsIndex] = useState<number | null>(null);

  const pricingForm = useForm<z.infer<typeof pricingSchema>>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      features: "",
      buttonText: "",
    },
  });

  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone: "+1 (555) 123-4567",
      email: "hello@amzadscout.com",
      businessHours: "Mon-Fri: 9AM-6PM PST",
      address: "123 Business St, Suite 100, San Francisco, CA 94105"
    },
  });

  const logoForm = useForm<z.infer<typeof logoSchema>>({
    resolver: zodResolver(logoSchema),
    defaultValues: {
      logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
      logoSize: "h-12",
      logoAlt: "AMZ AD SCOUT - The Growth Agency"
    },
  });

  const ctaButtonForm = useForm<z.infer<typeof ctaButtonSchema>>({
    resolver: zodResolver(ctaButtonSchema),
    defaultValues: {
      primaryText: "Get Free Strategy Call",
      secondaryText: "Watch Case Study"
    },
  });

  const statsForm = useForm<z.infer<typeof statsSchema>>({
    resolver: zodResolver(statsSchema),
    defaultValues: {
      number: "",
      label: "",
      color: "from-blue-400 to-cyan-400",
    },
  });

  // Load data from localStorage
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

    const savedContact = localStorage.getItem('contactData');
    if (savedContact) {
      try {
        const parsedData = JSON.parse(savedContact);
        // Validate that the parsed data has all required ContactInfo properties
        if (parsedData && typeof parsedData === 'object' && 
            typeof parsedData.phone === 'string' && 
            typeof parsedData.email === 'string' && 
            typeof parsedData.businessHours === 'string' && 
            typeof parsedData.address === 'string') {
          const validatedContactData: ContactInfo = {
            phone: parsedData.phone,
            email: parsedData.email,
            businessHours: parsedData.businessHours,
            address: parsedData.address
          };
          setContactInfo(validatedContactData);
        }
      } catch (error) {
        console.log("Failed to parse contact data from localStorage:", error);
      }
    }

    const savedLogo = localStorage.getItem('logoData');
    if (savedLogo) {
      try {
        const parsedData = JSON.parse(savedLogo);
        // Validate that the parsed data has all required LogoSettings properties
        if (parsedData && typeof parsedData === 'object' && 
            typeof parsedData.logoUrl === 'string' && 
            typeof parsedData.logoSize === 'string' && 
            typeof parsedData.logoAlt === 'string') {
          const validatedLogoData: LogoSettings = {
            logoUrl: parsedData.logoUrl,
            logoSize: parsedData.logoSize,
            logoAlt: parsedData.logoAlt
          };
          setLogoSettings(validatedLogoData);
        }
      } catch (error) {
        console.log("Failed to parse logo data from localStorage:", error);
      }
    }

    const savedCTAButtons = localStorage.getItem('ctaButtonsData');
    if (savedCTAButtons) {
      try {
        const parsedData = JSON.parse(savedCTAButtons);
        if (parsedData && typeof parsedData === 'object' && 
            typeof parsedData.primaryText === 'string' && 
            typeof parsedData.secondaryText === 'string') {
          const validatedCTAData: CTAButtons = {
            primaryText: parsedData.primaryText,
            secondaryText: parsedData.secondaryText
          };
          setCTAButtons(validatedCTAData);
        }
      } catch (error) {
        console.log("Failed to parse CTA buttons data from localStorage:", error);
      }
    }

    const savedStats = localStorage.getItem('statsData');
    if (savedStats) {
      try {
        const parsedData = JSON.parse(savedStats);
        if (Array.isArray(parsedData)) {
          setStatsBlocks(parsedData);
        }
      } catch (error) {
        console.log("Failed to parse stats data from localStorage:", error);
      }
    } else {
      // Default stats blocks
      const defaultStats: StatBlock[] = [
        { id: "campaigns", number: "500+", label: "Campaigns Managed", color: "from-blue-400 to-cyan-400" },
        { id: "adspend", number: "$50M+", label: "Ad Spend Managed", color: "from-cyan-400 to-purple-400" },
        { id: "roi", number: "300%", label: "Avg ROI Increase", color: "from-purple-400 to-pink-400" },
        { id: "monitoring", number: "24/7", label: "Account Monitoring", color: "from-pink-400 to-blue-400" }
      ];
      setStatsBlocks(defaultStats);
      localStorage.setItem('statsData', JSON.stringify(defaultStats));
    }
  }, []);

  // Update forms when state changes
  useEffect(() => {
    contactForm.reset({
      phone: contactInfo.phone,
      email: contactInfo.email,
      businessHours: contactInfo.businessHours,
      address: contactInfo.address
    });
  }, [contactInfo, contactForm]);

  useEffect(() => {
    logoForm.reset({
      logoUrl: logoSettings.logoUrl,
      logoSize: logoSettings.logoSize,
      logoAlt: logoSettings.logoAlt
    });
  }, [logoSettings, logoForm]);

  useEffect(() => {
    ctaButtonForm.reset({
      primaryText: ctaButtons.primaryText,
      secondaryText: ctaButtons.secondaryText
    });
  }, [ctaButtons, ctaButtonForm]);

  useEffect(() => {
    statsForm.reset({
      number: "",
      label: "",
      color: "from-blue-400 to-cyan-400",
    });
  }, [statsForm]);

  const savePricingData = (data: PricingTier[]) => {
    localStorage.setItem('pricingData', JSON.stringify(data));
    setPricingTiers(data);
  };

  const saveContactData = (data: ContactInfo) => {
    localStorage.setItem('contactData', JSON.stringify(data));
    setContactInfo(data);
  };

  const saveLogoData = (data: LogoSettings) => {
    localStorage.setItem('logoData', JSON.stringify(data));
    setLogoSettings(data);
    // Trigger a custom event to notify Header component
    window.dispatchEvent(new CustomEvent('logoUpdated', { detail: data }));
  };

  const saveCTAButtonsData = (data: CTAButtons) => {
    localStorage.setItem('ctaButtonsData', JSON.stringify(data));
    setCTAButtons(data);
    // Trigger a custom event to notify Hero component
    window.dispatchEvent(new CustomEvent('ctaButtonsUpdated', { detail: data }));
  };

  const saveStatsData = (data: StatBlock[]) => {
    localStorage.setItem('statsData', JSON.stringify(data));
    setStatsBlocks(data);
    // Trigger a custom event to notify Hero component
    window.dispatchEvent(new CustomEvent('statsUpdated', { detail: data }));
  };

  const onPricingSubmit = (values: z.infer<typeof pricingSchema>) => {
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

    pricingForm.reset();
    setEditingIndex(null);
  };

  const onContactSubmit = (values: z.infer<typeof contactSchema>) => {
    saveContactData(values);
    
    toast({
      title: "Contact Information Updated!",
      description: "The contact information has been saved successfully.",
    });
  };

  const onLogoSubmit = (values: z.infer<typeof logoSchema>) => {
    saveLogoData(values);
    
    toast({
      title: "Logo Settings Updated!",
      description: "The logo settings have been saved successfully.",
    });
  };

  const onCTAButtonSubmit = (values: z.infer<typeof ctaButtonSchema>) => {
    saveCTAButtonsData(values);
    
    toast({
      title: "CTA Buttons Updated!",
      description: "The call-to-action buttons have been saved successfully.",
    });
  };

  const onStatsSubmit = (values: z.infer<typeof statsSchema>) => {
    const newStat: StatBlock = {
      id: editingStatsIndex !== null ? statsBlocks[editingStatsIndex].id : `stat-${Date.now()}`,
      number: values.number,
      label: values.label,
      color: values.color,
    };

    let updatedStats;
    if (editingStatsIndex !== null) {
      updatedStats = [...statsBlocks];
      updatedStats[editingStatsIndex] = newStat;
    } else {
      updatedStats = [...statsBlocks, newStat];
    }

    saveStatsData(updatedStats);
    
    toast({
      title: editingStatsIndex !== null ? "Stat Updated!" : "Stat Added!",
      description: "The stat block has been saved successfully.",
    });

    statsForm.reset();
    setEditingStatsIndex(null);
  };

  const editTier = (index: number) => {
    const tier = pricingTiers[index];
    pricingForm.setValue('name', tier.name);
    pricingForm.setValue('price', tier.price);
    pricingForm.setValue('description', tier.description);
    pricingForm.setValue('features', tier.features.join('\n'));
    pricingForm.setValue('buttonText', tier.buttonText);
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

  const editStat = (index: number) => {
    const stat = statsBlocks[index];
    statsForm.setValue('number', stat.number);
    statsForm.setValue('label', stat.label);
    statsForm.setValue('color', stat.color);
    setEditingStatsIndex(index);
  };

  const deleteStat = (index: number) => {
    const updatedStats = statsBlocks.filter((_, i) => i !== index);
    saveStatsData(updatedStats);
    
    toast({
      title: "Stat Deleted!",
      description: "The stat block has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <Settings className="w-8 h-8 mr-3 text-blue-600" />
              <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
            </div>

            <Tabs defaultValue="pricing" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="pricing">Pricing Management</TabsTrigger>
                <TabsTrigger value="contact">Contact Information</TabsTrigger>
                <TabsTrigger value="logo">Logo Settings</TabsTrigger>
                <TabsTrigger value="cta">CTA Buttons</TabsTrigger>
                <TabsTrigger value="stats">Stats Blocks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pricing" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Pricing Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{editingIndex !== null ? 'Edit' : 'Add'} Pricing Tier</CardTitle>
                      <CardDescription>
                        {editingIndex !== null ? 'Update the pricing tier details' : 'Create a new pricing tier for your services'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...pricingForm}>
                        <form onSubmit={pricingForm.handleSubmit(onPricingSubmit)} className="space-y-6">
                          <FormField
                            control={pricingForm.control}
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
                            control={pricingForm.control}
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
                            control={pricingForm.control}
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
                            control={pricingForm.control}
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
                            control={pricingForm.control}
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
                                  pricingForm.reset();
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
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Update Contact Information</CardTitle>
                      <CardDescription>
                        Manage your business contact details that appear throughout the website
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...contactForm}>
                        <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                          <FormField
                            control={contactForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={contactForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="hello@amzadscout.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={contactForm.control}
                            name="businessHours"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Hours</FormLabel>
                                <FormControl>
                                  <Input placeholder="Mon-Fri: 9AM-6PM PST" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={contactForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Address</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="123 Business St, Suite 100, San Francisco, CA 94105"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit" className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Update Contact Information
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>

                  {/* Current Contact Info Preview */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">Current Contact Information</h2>
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Details Preview</CardTitle>
                        <CardDescription>This is how your contact information appears on the website</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-green-500" />
                          <span className="text-slate-700">{contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-blue-500" />
                          <span className="text-slate-700">{contactInfo.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-purple-500" />
                          <span className="text-slate-700">{contactInfo.businessHours}</span>
                        </div>
                        <div className="pt-4 border-t">
                          <h4 className="font-semibold text-slate-900 mb-2">Address</h4>
                          <p className="text-slate-700">{contactInfo.address}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logo" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Logo Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Update Logo Settings</CardTitle>
                      <CardDescription>
                        Update your website logo using a direct URL and customize its appearance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...logoForm}>
                        <form onSubmit={logoForm.handleSubmit(onLogoSubmit)} className="space-y-6">
                          <FormField
                            control={logoForm.control}
                            name="logoUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Logo URL</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="https://example.com/your-logo.png" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                                <p className="text-sm text-slate-500 mt-1">
                                  Enter a direct URL to your logo image (PNG, JPG, SVG supported)
                                </p>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={logoForm.control}
                            name="logoSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Logo Size</FormLabel>
                                <FormControl>
                                  <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="h-6">Extra Small (h-6)</option>
                                    <option value="h-8">Small (h-8)</option>
                                    <option value="h-10">Medium Small (h-10)</option>
                                    <option value="h-12">Medium (h-12)</option>
                                    <option value="h-14">Medium Large (h-14)</option>
                                    <option value="h-16">Large (h-16)</option>
                                    <option value="h-20">Extra Large (h-20)</option>
                                    <option value="h-24">XXL (h-24)</option>
                                    <option value="h-28">XXXL (h-28)</option>
                                    <option value="h-32">Huge (h-32)</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={logoForm.control}
                            name="logoAlt"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Logo Alt Text</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your Company Name - Description" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit" className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Update Logo Settings
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>

                  {/* Logo Preview */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">Logo Preview</h2>
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Logo</CardTitle>
                        <CardDescription>This is how your logo appears in the header</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-center p-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                          <img 
                            src={logoSettings.logoUrl} 
                            alt={logoSettings.logoAlt}
                            className={`${logoSettings.logoSize} w-auto object-contain`}
                            onError={(e) => {
                              console.log("Logo preview failed to load:", e.currentTarget.src);
                              e.currentTarget.style.display = 'none';
                            }}
                            onLoad={() => console.log("Logo preview loaded successfully")}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600">
                            <strong>URL:</strong> {logoSettings.logoUrl}
                          </p>
                          <p className="text-sm text-slate-600">
                            <strong>Size:</strong> {logoSettings.logoSize}
                          </p>
                          <p className="text-sm text-slate-600">
                            <strong>Alt Text:</strong> {logoSettings.logoAlt}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 flex items-center">
                          <Image className="w-5 h-5 mr-2" />
                          Logo URL Guidelines
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-blue-700">
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li>Use a direct link to your logo image file</li>
                          <li>Supported formats: PNG, JPG, JPEG, SVG</li>
                          <li>Recommended: PNG with transparent background</li>
                          <li>Make sure the URL is publicly accessible</li>
                          <li>For best quality, use high-resolution images</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cta" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* CTA Buttons Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Update Call-to-Action Buttons</CardTitle>
                      <CardDescription>
                        Customize the main action buttons that appear in the hero section
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...ctaButtonForm}>
                        <form onSubmit={ctaButtonForm.handleSubmit(onCTAButtonSubmit)} className="space-y-6">
                          <FormField
                            control={ctaButtonForm.control}
                            name="primaryText"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Primary Button Text</FormLabel>
                                <FormControl>
                                  <Input placeholder="Get Free Strategy Call" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={ctaButtonForm.control}
                            name="secondaryText"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Secondary Button Text</FormLabel>
                                <FormControl>
                                  <Input placeholder="Watch Case Study" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit" className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Update CTA Buttons
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>

                  {/* CTA Buttons Preview */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">Button Preview</h2>
                    <Card>
                      <CardHeader>
                        <CardTitle>Current CTA Buttons</CardTitle>
                        <CardDescription>This is how your buttons appear on the homepage</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center p-6 bg-slate-900 rounded-lg">
                          <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 text-white px-10 py-6 text-xl font-semibold rounded-2xl"
                          >
                            {ctaButtons.primaryText}
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="border-2 border-cyan-400/50 bg-white/5 text-cyan-100 hover:bg-cyan-400/10 hover:border-cyan-400 px-10 py-6 text-xl font-semibold rounded-2xl"
                          >
                            {ctaButtons.secondaryText}
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600">
                            <strong>Primary Button:</strong> {ctaButtons.primaryText}
                          </p>
                          <p className="text-sm text-slate-600">
                            <strong>Secondary Button:</strong> {ctaButtons.secondaryText}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 flex items-center">
                          <MousePointer className="w-5 h-5 mr-2" />
                          CTA Button Guidelines
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-blue-700">
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li>Keep button text concise and action-oriented</li>
                          <li>Primary button should be your main conversion goal</li>
                          <li>Secondary button can be for exploration or engagement</li>
                          <li>Use verbs that create urgency or value</li>
                          <li>Test different variations to optimize conversions</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stats" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Stats Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{editingStatsIndex !== null ? 'Edit' : 'Add'} Stats Block</CardTitle>
                      <CardDescription>
                        {editingStatsIndex !== null ? 'Update the stats block details' : 'Create a new stats block for the hero section'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...statsForm}>
                        <form onSubmit={statsForm.handleSubmit(onStatsSubmit)} className="space-y-6">
                          <FormField
                            control={statsForm.control}
                            name="number"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number/Value</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 500+, $50M+, 300%" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={statsForm.control}
                            name="label"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Campaigns Managed" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={statsForm.control}
                            name="color"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gradient Color</FormLabel>
                                <FormControl>
                                  <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="from-blue-400 to-cyan-400">Blue to Cyan</option>
                                    <option value="from-cyan-400 to-purple-400">Cyan to Purple</option>
                                    <option value="from-purple-400 to-pink-400">Purple to Pink</option>
                                    <option value="from-pink-400 to-blue-400">Pink to Blue</option>
                                    <option value="from-green-400 to-blue-400">Green to Blue</option>
                                    <option value="from-yellow-400 to-orange-400">Yellow to Orange</option>
                                    <option value="from-red-400 to-pink-400">Red to Pink</option>
                                    <option value="from-indigo-400 to-purple-400">Indigo to Purple</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex gap-3">
                            <Button type="submit" className="flex-1">
                              <Save className="w-4 h-4 mr-2" />
                              {editingStatsIndex !== null ? 'Update' : 'Add'} Stat
                            </Button>
                            {editingStatsIndex !== null && (
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => {
                                  statsForm.reset();
                                  setEditingStatsIndex(null);
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

                  {/* Current Stats Blocks */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">Current Stats Blocks</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {statsBlocks.map((stat, index) => (
                        <Card key={stat.id} className="relative">
                          <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                              <div className="text-center w-full">
                                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                  {stat.number}
                                </div>
                                <div className="text-blue-600 text-sm font-medium">
                                  {stat.label}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex gap-2 justify-center">
                              <Button size="sm" variant="outline" onClick={() => editStat(index)}>
                                Edit
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteStat(index)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2" />
                          Stats Block Guidelines
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-blue-700">
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li>Keep numbers concise and impactful (e.g., 500+, $50M+)</li>
                          <li>Use clear, descriptive labels</li>
                          <li>Choose colors that match your brand</li>
                          <li>Limit to 4 blocks for best visual balance</li>
                          <li>Use metrics that showcase your success</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

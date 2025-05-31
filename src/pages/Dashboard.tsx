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
import { Settings, Save, Plus, Trash2, Phone, Mail, Clock, Upload, Image } from "lucide-react";
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
  phone: string;
  email: string;
  businessHours: string;
  address: string;
}

interface LogoSettings {
  logoUrl: string;
  logoSize: string;
  logoAlt: string;
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pricing">Pricing Management</TabsTrigger>
                <TabsTrigger value="contact">Contact Information</TabsTrigger>
                <TabsTrigger value="logo">Logo Settings</TabsTrigger>
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogOut, Save, Mail, User, Phone, Building2, MessageSquare, Trash2 } from 'lucide-react';
import { localDB } from '@/utils/localStorageDB';

interface FooterData {
  email: string;
  phone: string;
  address: string;
}

interface AboutData {
  heroTitle: string;
  heroDescription: string;
  missionText: string;
  visionText: string;
}

interface LogoData {
  text: string;
  imageUrl: string;
  faviconUrl: string;
}

interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<any[]>([]);
  const [footerData, setFooterData] = useState<FooterData>({
    email: 'info@amzadscout.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY 10001'
  });

  const [aboutData, setAboutData] = useState<AboutData>({
    heroTitle: 'About Our Agency',
    heroDescription: "We're a team of digital marketing experts passionate about helping businesses achieve extraordinary growth through strategic advertising and innovative solutions.",
    missionText: 'To empower businesses with cutting-edge digital marketing strategies that drive measurable growth and sustainable success. We believe every business deserves access to expert-level advertising management and strategic guidance.',
    visionText: 'To become the most trusted digital growth partner for businesses worldwide, known for delivering exceptional results, innovative strategies, and unparalleled client service in the digital marketing space.'
  });

  const [logoData, setLogoData] = useState<LogoData>({
    text: 'Digital Growth',
    imageUrl: '',
    faviconUrl: ''
  });

  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      id: '1',
      name: 'Starter',
      price: '$999',
      description: 'Perfect for small businesses getting started',
      features: ['Single platform management', '24/7 support', 'Monthly reports', 'Basic optimization']
    },
    {
      id: '2',
      name: 'Professional',
      price: '$2,499',
      description: 'For growing businesses needing more reach',
      features: ['Multi-platform management', 'Priority support', 'Weekly reports', 'Advanced optimization', 'Dedicated account manager']
    },
    {
      id: '3',
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with complex needs',
      features: ['Full-service management', 'White-glove support', 'Daily reports', 'Enterprise optimization', 'Dedicated team', 'Custom integrations']
    }
  ]);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('dashboard_auth');
    if (isAuth !== 'true') {
      navigate('/dashboard/login');
      return;
    }

    // Load saved data
    const savedFooter = localStorage.getItem('footer_data');
    if (savedFooter) setFooterData(JSON.parse(savedFooter));

    const savedAbout = localStorage.getItem('about_data');
    if (savedAbout) setAboutData(JSON.parse(savedAbout));

    const savedPricing = localStorage.getItem('pricing_data');
    if (savedPricing) setPricingTiers(JSON.parse(savedPricing));

    const savedLogo = localStorage.getItem('logo_data');
    if (savedLogo) setLogoData(JSON.parse(savedLogo));

    // Load leads
    loadLeads();
  }, [navigate]);

  const loadLeads = async () => {
    try {
      const contactSubmissions = await localDB.findAll('contact_submissions');
      setLeads(contactSubmissions.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const deleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        localDB.delete('contact_submissions', id);
        loadLeads();
        toast.success('Lead deleted successfully');
      } catch (error) {
        toast.error('Failed to delete lead');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dashboard_auth');
    toast.success('Logged out successfully');
    navigate('/dashboard/login');
  };

  const saveFooterData = () => {
    localStorage.setItem('footer_data', JSON.stringify(footerData));
    
    // Update footer in real-time
    const emailEl = document.getElementById('footer-email');
    const phoneEl = document.getElementById('footer-phone');
    const addressEl = document.getElementById('footer-address');
    
    if (emailEl) emailEl.textContent = footerData.email;
    if (phoneEl) phoneEl.textContent = footerData.phone;
    if (addressEl) addressEl.textContent = footerData.address;
    
    toast.success('Footer updated successfully!');
  };

  const saveAboutData = () => {
    localStorage.setItem('about_data', JSON.stringify(aboutData));
    toast.success('About page updated successfully! Refresh the About page to see changes.');
  };

  const saveLogoData = () => {
    localStorage.setItem('logo_data', JSON.stringify(logoData));
    
    // Update favicon dynamically
    if (logoData.faviconUrl) {
      const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (favicon) {
        favicon.href = logoData.faviconUrl;
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = logoData.faviconUrl;
        document.head.appendChild(newFavicon);
      }
    }
    
    window.dispatchEvent(new Event('logo-updated'));
    toast.success('Logo and favicon updated successfully!');
  };

  const savePricingData = () => {
    localStorage.setItem('pricing_data', JSON.stringify(pricingTiers));
    toast.success('Pricing updated successfully! Refresh the Pricing page to see changes.');
  };

  const updatePricingTier = (id: string, field: keyof PricingTier, value: string | string[]) => {
    setPricingTiers(pricingTiers.map(tier => 
      tier.id === id ? { ...tier, [field]: value } : tier
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="logo">Logo</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Contact Form Submissions</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {leads.length} total leads
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leads.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No leads yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <Card key={lead.id} className="border-l-4 border-l-primary">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold">{lead.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                                  {lead.email}
                                </a>
                              </div>
                              {lead.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                                    {lead.phone}
                                  </a>
                                </div>
                              )}
                              {lead.company && (
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-muted-foreground" />
                                  <span>{lead.company}</span>
                                </div>
                              )}
                              {lead.message && (
                                <div className="flex items-start gap-2 mt-3">
                                  <MessageSquare className="w-4 h-4 text-muted-foreground mt-1" />
                                  <p className="text-sm text-muted-foreground">{lead.message}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date(lead.created_at).toLocaleDateString()} {new Date(lead.created_at).toLocaleTimeString()}
                              </span>
                              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                                {lead.form_type || 'contact'}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteLead(lead.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logo Tab */}
          <TabsContent value="logo">
            <Card>
              <CardHeader>
                <CardTitle>Website Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="logoText">Logo Text</Label>
                  <Input
                    id="logoText"
                    value={logoData.text}
                    onChange={(e) => setLogoData({ ...logoData, text: e.target.value })}
                    placeholder="Enter your brand name"
                  />
                </div>
                <div>
                  <Label htmlFor="logoImage">Logo Image URL (optional)</Label>
                  <Input
                    id="logoImage"
                    value={logoData.imageUrl}
                    onChange={(e) => setLogoData({ ...logoData, imageUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-sm text-slate-500 mt-1">
                    Leave empty to use text logo. Add image URL to display logo image.
                  </p>
                </div>
                {logoData.imageUrl && (
                  <div>
                    <Label>Logo Preview</Label>
                    <div className="mt-2 p-4 bg-slate-100 rounded-lg">
                      <img 
                        src={logoData.imageUrl} 
                        alt="Logo preview" 
                        className="h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          toast.error('Invalid image URL');
                        }}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="faviconUrl">Favicon URL (optional)</Label>
                  <Input
                    id="faviconUrl"
                    value={logoData.faviconUrl}
                    onChange={(e) => setLogoData({ ...logoData, faviconUrl: e.target.value })}
                    placeholder="https://example.com/favicon.ico"
                  />
                  <p className="text-sm text-slate-500 mt-1">
                    Add favicon URL to update browser tab icon (supports .ico, .png, .svg)
                  </p>
                </div>
                {logoData.faviconUrl && (
                  <div>
                    <Label>Favicon Preview</Label>
                    <div className="mt-2 p-4 bg-slate-100 rounded-lg flex items-center gap-3">
                      <img 
                        src={logoData.faviconUrl} 
                        alt="Favicon preview" 
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          toast.error('Invalid favicon URL');
                        }}
                      />
                      <span className="text-sm text-slate-600">This will appear in browser tabs</span>
                    </div>
                  </div>
                )}
                <Button onClick={saveLogoData} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Logo Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle>Footer Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={footerData.email}
                    onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={footerData.phone}
                    onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={footerData.address}
                    onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
                  />
                </div>
                <Button onClick={saveFooterData} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Footer Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Page Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={aboutData.heroTitle}
                    onChange={(e) => setAboutData({ ...aboutData, heroTitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="heroDescription">Hero Description</Label>
                  <Textarea
                    id="heroDescription"
                    rows={3}
                    value={aboutData.heroDescription}
                    onChange={(e) => setAboutData({ ...aboutData, heroDescription: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="missionText">Mission Statement</Label>
                  <Textarea
                    id="missionText"
                    rows={4}
                    value={aboutData.missionText}
                    onChange={(e) => setAboutData({ ...aboutData, missionText: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="visionText">Vision Statement</Label>
                  <Textarea
                    id="visionText"
                    rows={4}
                    value={aboutData.visionText}
                    onChange={(e) => setAboutData({ ...aboutData, visionText: e.target.value })}
                  />
                </div>
                <Button onClick={saveAboutData} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save About Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <div className="space-y-6">
              {pricingTiers.map((tier) => (
                <Card key={tier.id}>
                  <CardHeader>
                    <CardTitle>Pricing Tier: {tier.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Plan Name</Label>
                      <Input
                        value={tier.name}
                        onChange={(e) => updatePricingTier(tier.id, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Price</Label>
                      <Input
                        value={tier.price}
                        onChange={(e) => updatePricingTier(tier.id, 'price', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={tier.description}
                        onChange={(e) => updatePricingTier(tier.id, 'description', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Features (one per line)</Label>
                      <Textarea
                        rows={5}
                        value={tier.features.join('\n')}
                        onChange={(e) => updatePricingTier(tier.id, 'features', e.target.value.split('\n'))}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={savePricingData} className="w-full" size="lg">
                <Save className="w-4 h-4 mr-2" />
                Save All Pricing Changes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

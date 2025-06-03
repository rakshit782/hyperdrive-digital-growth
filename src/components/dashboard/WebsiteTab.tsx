import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Image, Phone, MousePointer, DollarSign, Palette, Type } from "lucide-react";
import LogoManagement from "./LogoManagement";
import ContactManagement from "./ContactManagement";
import HomepageElements from "./HomepageElements";
import PricingManagement from "./PricingManagement";

interface WebsiteSettings {
  companyName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
}

const defaultSettings: WebsiteSettings = {
  companyName: "AMZ Ad Scout",
  tagline: "Scale Your Amazon Success",
  description: "Expert Amazon advertising and e-commerce solutions that drive results",
  primaryColor: "#3B82F6",
  secondaryColor: "#8B5CF6",
  heroTitle: "Scale Your Amazon Success with Expert PPC Management",
  heroSubtitle: "Maximize your ROI with data-driven Amazon advertising strategies from certified experts",
  ctaText: "Get Free Audit"
};

const WebsiteTab = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('websiteSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse website settings:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('websiteSettings', JSON.stringify(settings));
    setIsSaved(true);
    
    // Dispatch event to update the website
    window.dispatchEvent(new CustomEvent('websiteSettingsUpdated', { detail: settings }));
    
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleInputChange = (field: keyof WebsiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('websiteSettings');
    window.dispatchEvent(new CustomEvent('websiteSettingsUpdated', { detail: defaultSettings }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Website Customization</h2>
          <p className="text-gray-600 mt-1">Customize your website appearance and content</p>
        </div>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Company</span>
          </TabsTrigger>
          <TabsTrigger value="logo" className="flex items-center space-x-2">
            <Image className="w-4 h-4" />
            <span>Logo</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Contact</span>
          </TabsTrigger>
          <TabsTrigger value="homepage" className="flex items-center space-x-2">
            <MousePointer className="w-4 h-4" />
            <span>Homepage</span>
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Pricing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  <CardTitle>Company Information</CardTitle>
                </div>
                <CardDescription>Basic company details displayed on your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={settings.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    placeholder="Your company tagline"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={settings.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of your company"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Design Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-purple-600" />
                  <CardTitle>Design Settings</CardTitle>
                </div>
                <CardDescription>Customize colors and visual appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1 rounded"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      placeholder="#3B82F6"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-16 h-10 p-1 rounded"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      placeholder="#8B5CF6"
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logo" className="mt-6">
          <LogoManagement />
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <ContactManagement />
        </TabsContent>

        <TabsContent value="homepage" className="mt-6">
          <HomepageElements />
        </TabsContent>

        <TabsContent value="pricing" className="mt-6">
          <PricingManagement />
        </TabsContent>
      </Tabs>

      {/* Hero Section */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center">
            <Type className="w-5 h-5 mr-2 text-green-600" />
            <CardTitle>Hero Section</CardTitle>
          </div>
          <CardDescription>Main headline and call-to-action on your homepage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Textarea
              id="heroTitle"
              value={settings.heroTitle}
              onChange={(e) => handleInputChange('heroTitle', e.target.value)}
              placeholder="Main headline for your hero section"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Textarea
              id="heroSubtitle"
              value={settings.heroSubtitle}
              onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
              placeholder="Supporting text for your hero section"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="ctaText">Call-to-Action Button Text</Label>
            <Input
              id="ctaText"
              value={settings.ctaText}
              onChange={(e) => handleInputChange('ctaText', e.target.value)}
              placeholder="Button text"
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your changes will appear on the website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-lg">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                {settings.heroTitle}
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                {settings.heroSubtitle}
              </p>
              <Button 
                style={{ backgroundColor: settings.primaryColor }}
                className="text-white px-8 py-3 text-lg font-semibold rounded-xl"
              >
                {settings.ctaText}
              </Button>
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold" style={{ color: settings.primaryColor }}>
                  {settings.companyName}
                </h2>
                <p className="text-lg" style={{ color: settings.secondaryColor }}>
                  {settings.tagline}
                </p>
                <p className="text-gray-600 mt-2">{settings.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteTab;

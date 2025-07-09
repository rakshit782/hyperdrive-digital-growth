
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Palette, Type, Eye, RefreshCw, Upload, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebsiteSettings {
  companyName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  logoUrl?: string;
  faviconUrl?: string;
  websiteTitle: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  businessHours: string;
}

const defaultSettings: WebsiteSettings = {
  companyName: "AdRevenueBoost",
  tagline: "Scale Your Success",
  description: "Expert advertising and e-commerce solutions that drive results",
  primaryColor: "#3B82F6",
  secondaryColor: "#8B5CF6",
  heroTitle: "Scale Your Success with Expert Advertising Management",
  heroSubtitle: "Maximize your ROI with data-driven strategies from certified experts",
  ctaText: "Get Free Account Audit",
  faviconUrl: "/favicon.ico",
  websiteTitle: "AMZ AD SCOUT - Expert Amazon, Walmart & Meta Advertising Agency",
  contactPhone: "+1 (555) 123-4567",
  contactEmail: "hello@amzadscout.com",
  contactAddress: "123 Business Ave, Suite 100, City, State 12345",
  businessHours: "Monday - Friday: 9AM - 6PM EST"
};

const WebsiteTab = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = localStorage.getItem('websiteSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse website settings:', error);
        toast({
          title: "Error loading settings",
          description: "Using default settings instead.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const updateFavicon = (faviconUrl: string) => {
    // Remove existing favicon
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }
    
    // Add new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = faviconUrl;
    
    // Determine type based on file extension
    if (faviconUrl.endsWith('.png')) {
      link.type = 'image/png';
    } else if (faviconUrl.endsWith('.jpg') || faviconUrl.endsWith('.jpeg')) {
      link.type = 'image/jpeg';
    } else if (faviconUrl.endsWith('.svg')) {
      link.type = 'image/svg+xml';
    } else {
      link.type = 'image/x-icon';
    }
    
    document.head.appendChild(link);
  };

  const updateWebsiteTitle = (title: string) => {
    document.title = title;
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('websiteSettings', JSON.stringify(settings));
      
      // Update favicon in real-time
      if (settings.faviconUrl) {
        updateFavicon(settings.faviconUrl);
      }
      
      // Update website title in real-time
      if (settings.websiteTitle) {
        updateWebsiteTitle(settings.websiteTitle);
      }
      
      // Dispatch custom event to update website immediately
      window.dispatchEvent(new CustomEvent('websiteSettingsUpdated', { 
        detail: settings 
      }));
      
      // Dispatch contact updated event
      window.dispatchEvent(new CustomEvent('contactUpdated', { 
        detail: {
          phone: settings.contactPhone,
          email: settings.contactEmail,
          address: settings.contactAddress,
          hours: settings.businessHours
        }
      }));
      
      // Update CSS custom properties for real-time theme changes
      document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
      
      setIsSaved(true);
      toast({
        title: "Settings saved!",
        description: "Your website has been updated with the new settings.",
      });
      
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        title: "Save failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof WebsiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    
    // Real-time updates for certain fields
    if (field === 'faviconUrl' && value) {
      updateFavicon(value);
    }
    if (field === 'websiteTitle' && value) {
      updateWebsiteTitle(value);
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('websiteSettings');
    
    // Reset favicon and title
    updateFavicon(defaultSettings.faviconUrl || '/favicon.ico');
    updateWebsiteTitle(defaultSettings.websiteTitle);
    
    // Reset CSS custom properties
    document.documentElement.style.setProperty('--primary-color', defaultSettings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', defaultSettings.secondaryColor);
    
    window.dispatchEvent(new CustomEvent('websiteSettingsUpdated', { 
      detail: defaultSettings 
    }));
    
    window.dispatchEvent(new CustomEvent('contactUpdated', { 
      detail: {
        phone: defaultSettings.contactPhone,
        email: defaultSettings.contactEmail,
        address: defaultSettings.contactAddress,
        hours: defaultSettings.businessHours
      }
    }));
    
    toast({
      title: "Settings reset",
      description: "All settings have been reset to defaults.",
    });
  };

  const previewChanges = () => {
    window.open('/', '_blank');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (PNG, JPG, or SVG).",
          variant: "destructive"
        });
        return;
      }
      
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      handleInputChange('faviconUrl', objectUrl);
      
      toast({
        title: "Favicon uploaded",
        description: "Your favicon has been updated. Don't forget to save your changes.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Settings Panel */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Website Settings</h2>
            <p className="text-slate-600 mt-1">Configure your website appearance, content, and contact details</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={previewChanges} variant="outline" className="bg-white/50">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleReset} variant="outline" className="bg-white/50">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Website Identity */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg mr-3">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Website Identity</CardTitle>
                  <CardDescription>Basic website settings and branding</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="websiteTitle" className="text-sm font-medium text-slate-700">Website Title</Label>
                <Input
                  id="websiteTitle"
                  value={settings.websiteTitle}
                  onChange={(e) => handleInputChange('websiteTitle', e.target.value)}
                  placeholder="Your website title"
                  className="bg-white/50 border-white/30 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon" className="text-sm font-medium text-slate-700">Favicon</Label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 flex-1">
                    <Input
                      id="faviconUrl"
                      value={settings.faviconUrl}
                      onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
                      placeholder="/favicon.ico or image URL"
                      className="bg-white/50 border-white/30 focus:border-blue-500"
                    />
                    <label htmlFor="faviconFile" className="cursor-pointer">
                      <Button type="button" variant="outline" size="sm" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </span>
                      </Button>
                    </label>
                    <input
                      id="faviconFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  {settings.faviconUrl && (
                    <img 
                      src={settings.faviconUrl} 
                      alt="Favicon preview" 
                      className="w-8 h-8 rounded border"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">Company Name</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Your company name"
                    className="bg-white/50 border-white/30 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline" className="text-sm font-medium text-slate-700">Tagline</Label>
                  <Input
                    id="tagline"
                    value={settings.tagline}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    placeholder="Your company tagline"
                    className="bg-white/50 border-white/30 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700">Description</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of your company"
                  rows={3}
                  className="bg-white/50 border-white/30 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mr-3">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Contact Details</CardTitle>
                  <CardDescription>Update contact information displayed on your website</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-sm font-medium text-slate-700">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="bg-white/50 border-white/30 focus:border-orange-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-sm font-medium text-slate-700">Email Address</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="hello@yourcompany.com"
                    className="bg-white/50 border-white/30 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactAddress" className="text-sm font-medium text-slate-700">Business Address</Label>
                <Textarea
                  id="contactAddress"
                  value={settings.contactAddress}
                  onChange={(e) => handleInputChange('contactAddress', e.target.value)}
                  placeholder="123 Business Ave, Suite 100, City, State 12345"
                  rows={2}
                  className="bg-white/50 border-white/30 focus:border-orange-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessHours" className="text-sm font-medium text-slate-700">Business Hours</Label>
                <Input
                  id="businessHours"
                  value={settings.businessHours}
                  onChange={(e) => handleInputChange('businessHours', e.target.value)}
                  placeholder="Monday - Friday: 9AM - 6PM EST"
                  className="bg-white/50 border-white/30 focus:border-orange-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Design Settings */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-3">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Design Settings</CardTitle>
                  <CardDescription>Customize colors and visual appearance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-sm font-medium text-slate-700">Primary Color</Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1 rounded border-white/30"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      placeholder="#3B82F6"
                      className="flex-1 bg-white/50 border-white/30 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor" className="text-sm font-medium text-slate-700">Secondary Color</Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-16 h-10 p-1 rounded border-white/30"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      placeholder="#8B5CF6"
                      className="flex-1 bg-white/50 border-white/30 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hero Section */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
                  <Type className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Hero Section</CardTitle>
                  <CardDescription>Main headline and call-to-action on your homepage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle" className="text-sm font-medium text-slate-700">Hero Title</Label>
                <Textarea
                  id="heroTitle"
                  value={settings.heroTitle}
                  onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                  placeholder="Main headline for your hero section"
                  rows={2}
                  className="bg-white/50 border-white/30 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle" className="text-sm font-medium text-slate-700">Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={settings.heroSubtitle}
                  onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                  placeholder="Supporting text for your hero section"
                  rows={2}
                  className="bg-white/50 border-white/30 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText" className="text-sm font-medium text-slate-700">Call-to-Action Button Text</Label>
                <Input
                  id="ctaText"
                  value={settings.ctaText}
                  onChange={(e) => handleInputChange('ctaText', e.target.value)}
                  placeholder="Button text"
                  className="bg-white/50 border-white/30 focus:border-green-500"
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className={`w-full transition-all duration-300 ${
              isSaved 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            } shadow-lg`}
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : isSaved ? (
              "✓ Saved!"
            ) : (
              "Save Website Settings"
            )}
          </Button>
        </div>
      </div>

      {/* Live Preview Panel */}
      <div className="xl:col-span-1">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl sticky top-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>Real-time preview</CardDescription>
                </div>
              </div>
              <Button onClick={previewChanges} size="sm" variant="outline">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Browser Preview */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-lg border">
                <div className="text-center max-w-full mx-auto">
                  <h1 
                    className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                    style={{ color: settings.primaryColor }}
                  >
                    {settings.heroTitle}
                  </h1>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {settings.heroSubtitle}
                  </p>
                  <Button 
                    style={{ backgroundColor: settings.primaryColor }}
                    className="text-white px-6 py-2 text-sm font-semibold rounded-xl mb-6 hover:opacity-90"
                  >
                    {settings.ctaText}
                  </Button>
                  <div className="text-center border-t pt-4">
                    <h2 
                      className="text-xl font-bold mb-2" 
                      style={{ color: settings.primaryColor }}
                    >
                      {settings.companyName}
                    </h2>
                    <p 
                      className="text-sm font-medium" 
                      style={{ color: settings.secondaryColor }}
                    >
                      {settings.tagline}
                    </p>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                      {settings.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info Preview */}
              <div className="bg-slate-800 rounded-lg p-4 text-white">
                <h4 className="font-medium mb-3 text-sm">Contact Information</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-2" />
                    {settings.contactPhone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-2" />
                    {settings.contactEmail}
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-3 h-3 mr-2 mt-0.5" />
                    <span className="text-slate-300">{settings.contactAddress}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-2" />
                    <span className="text-slate-300">{settings.businessHours}</span>
                  </div>
                </div>
              </div>

              {/* Browser Tab Preview */}
              <div className="bg-gray-100 rounded-lg p-3 border">
                <div className="flex items-center space-x-2 text-xs">
                  {settings.faviconUrl && (
                    <img 
                      src={settings.faviconUrl} 
                      alt="Favicon" 
                      className="w-4 h-4"
                    />
                  )}
                  <span className="text-gray-700 truncate">{settings.websiteTitle}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebsiteTab;

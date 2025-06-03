
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Palette, Type, Eye } from "lucide-react";

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
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Settings Panel */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Website Settings</h2>
            <p className="text-slate-600 mt-1">Configure basic website information and styling</p>
          </div>
          <Button onClick={handleReset} variant="outline" className="bg-white/50">
            Reset to Defaults
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Company Information */}
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader>
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg mr-3">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Basic company details displayed on your website</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
            className={`w-full transition-all duration-300 ${
              isSaved 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            } shadow-lg`}
          >
            {isSaved ? "✓ Saved!" : "Save Website Settings"}
          </Button>
        </div>
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
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>How your changes will appear</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-lg">
              <div className="text-center max-w-full mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 leading-tight">
                  {settings.heroTitle}
                </h1>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {settings.heroSubtitle}
                </p>
                <Button 
                  style={{ backgroundColor: settings.primaryColor }}
                  className="text-white px-6 py-2 text-sm font-semibold rounded-xl mb-6"
                >
                  {settings.ctaText}
                </Button>
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2" style={{ color: settings.primaryColor }}>
                    {settings.companyName}
                  </h2>
                  <p className="text-sm font-medium" style={{ color: settings.secondaryColor }}>
                    {settings.tagline}
                  </p>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed">{settings.description}</p>
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

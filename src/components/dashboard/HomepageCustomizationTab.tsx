
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, Palette, Type, Layout, Star, ShoppingCart, Users } from "lucide-react";
import { toast } from "sonner";

interface HomepageConfig {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    ctaColor: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: string;
  };
  layout: {
    maxWidth: string;
    spacing: string;
    borderRadius: string;
  };
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    showStats: boolean;
  };
  sections: {
    services: boolean;
    reviews: boolean;
    features: boolean;
    faq: boolean;
    cta: boolean;
  };
}

const defaultConfig: HomepageConfig = {
  theme: {
    primaryColor: "#1E293B",
    secondaryColor: "#64748B", 
    accentColor: "#3B82F6",
    backgroundColor: "#F8FAFC",
    ctaColor: "#F97316"
  },
  typography: {
    headingFont: "Space Grotesk",
    bodyFont: "Inter",
    fontSize: "base"
  },
  layout: {
    maxWidth: "7xl",
    spacing: "normal",
    borderRadius: "lg"
  },
  hero: {
    title: "Scale Your Business With Precision",
    subtitle: "Transform your advertising performance with our data-driven strategies",
    primaryCta: "Get Free Strategy Call",
    secondaryCta: "Watch Case Study",
    showStats: true
  },
  sections: {
    services: true,
    reviews: true,
    features: true,
    faq: true,
    cta: true
  }
};

const HomepageCustomizationTab = () => {
  const [config, setConfig] = useState<HomepageConfig>(defaultConfig);
  const [activePreview, setActivePreview] = useState<'hero' | 'services' | 'reviews' | 'features'>('hero');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    const saved = localStorage.getItem('homepageConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({ ...defaultConfig, ...parsed });
      } catch (error) {
        console.error('Failed to parse homepage config:', error);
      }
    }
  };

  const saveConfig = () => {
    localStorage.setItem('homepageConfig', JSON.stringify(config));
    
    // Dispatch events for different components
    window.dispatchEvent(new CustomEvent('homepageConfigUpdated', { detail: config }));
    
    toast.success("Homepage configuration saved successfully!");
  };

  const updateTheme = (key: keyof typeof config.theme, value: string) => {
    setConfig(prev => ({
      ...prev,
      theme: { ...prev.theme, [key]: value }
    }));
  };

  const updateHero = (key: keyof typeof config.hero, value: string | boolean) => {
    setConfig(prev => ({
      ...prev,
      hero: { ...prev.hero, [key]: value }
    }));
  };

  const updateSection = (key: keyof typeof config.sections, value: boolean) => {
    setConfig(prev => ({
      ...prev,
      sections: { ...prev.sections, [key]: value }
    }));
  };

  const renderPreview = () => {
    switch (activePreview) {
      case 'hero':
        return (
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold leading-tight" style={{ color: config.theme.primaryColor, fontFamily: config.typography.headingFont }}>
                {config.hero.title}
              </h1>
              <p className="text-gray-600" style={{ fontFamily: config.typography.bodyFont }}>
                {config.hero.subtitle}
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  className="px-6 py-3 rounded-lg text-white font-semibold"
                  style={{ backgroundColor: config.theme.ctaColor }}
                >
                  {config.hero.primaryCta}
                </button>
                <button 
                  className="px-6 py-3 rounded-lg border font-semibold"
                  style={{ 
                    borderColor: config.theme.accentColor, 
                    color: config.theme.accentColor,
                    fontFamily: config.typography.bodyFont 
                  }}
                >
                  {config.hero.secondaryCta}
                </button>
              </div>
              {config.hero.showStats && (
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold" style={{ color: config.theme.primaryColor }}>500+</div>
                    <div className="text-sm text-gray-600">Campaigns</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold" style={{ color: config.theme.accentColor }}>$50M+</div>
                    <div className="text-sm text-gray-600">Ad Spend</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="space-y-4 p-6">
            <h3 className="text-xl font-bold text-center" style={{ color: config.theme.primaryColor }}>Our Services</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Amazon Advertising", icon: "🛒" },
                { title: "Walmart Marketing", icon: "🏪" },
                { title: "Meta Advertising", icon: "📱" }
              ].map((service, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h4 className="font-semibold" style={{ color: config.theme.primaryColor }}>{service.title}</h4>
                      <p className="text-sm text-gray-600">Expert management and optimization</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-4 p-6">
            <h3 className="text-xl font-bold text-center" style={{ color: config.theme.primaryColor }}>Client Reviews</h3>
            <div className="space-y-4">
              {[
                { name: "John Smith", company: "Tech Corp", rating: 5 },
                { name: "Sarah Johnson", company: "E-commerce Plus", rating: 5 }
              ].map((review, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: config.theme.ctaColor }} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">"Amazing results and professional service!"</p>
                  <div className="text-sm">
                    <span className="font-semibold" style={{ color: config.theme.primaryColor }}>{review.name}</span>
                    <span className="text-gray-500"> - {review.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'features':
        return (
          <div className="space-y-4 p-6">
            <h3 className="text-xl font-bold text-center" style={{ color: config.theme.primaryColor }}>Key Features</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "24/7 Monitoring", icon: "👁️" },
                { title: "Data Analytics", icon: "📊" },
                { title: "Campaign Optimization", icon: "⚡" }
              ].map((feature, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold" style={{ color: config.theme.primaryColor }}>{feature.title}</h4>
                      <p className="text-sm text-gray-600">Advanced feature description</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-navy mb-2">Homepage Customization</h2>
          <p className="text-gray-600">Customize your homepage appearance and content</p>
        </div>
        <Button onClick={saveConfig} className="btn-primary">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="xl:col-span-2 space-y-6">
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="theme">
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-blue-500" />
                    <CardTitle>Color Theme</CardTitle>
                  </div>
                  <CardDescription>Customize your brand colors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(config.theme).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                      <div className="flex items-center space-x-3">
                        <Input
                          type="color"
                          value={value}
                          onChange={(e) => updateTheme(key as keyof typeof config.theme, e.target.value)}
                          className="w-16 h-10 p-1 rounded border"
                        />
                        <Input
                          value={value}
                          onChange={(e) => updateTheme(key as keyof typeof config.theme, e.target.value)}
                          className="flex-1 input-modern"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hero">
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center">
                    <Type className="w-5 h-5 mr-2 text-blue-500" />
                    <CardTitle>Hero Section</CardTitle>
                  </div>
                  <CardDescription>Configure your hero section content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Main Title</Label>
                    <Input
                      value={config.hero.title}
                      onChange={(e) => updateHero('title', e.target.value)}
                      className="input-modern"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      value={config.hero.subtitle}
                      onChange={(e) => updateHero('subtitle', e.target.value)}
                      className="input-modern"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary CTA</Label>
                      <Input
                        value={config.hero.primaryCta}
                        onChange={(e) => updateHero('primaryCta', e.target.value)}
                        className="input-modern"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary CTA</Label>
                      <Input
                        value={config.hero.secondaryCta}
                        onChange={(e) => updateHero('secondaryCta', e.target.value)}
                        className="input-modern"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.hero.showStats}
                      onCheckedChange={(checked) => updateHero('showStats', checked)}
                    />
                    <Label>Show Statistics</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sections">
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center">
                    <Layout className="w-5 h-5 mr-2 text-blue-500" />
                    <CardTitle>Page Sections</CardTitle>
                  </div>
                  <CardDescription>Enable or disable sections on your homepage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(config.sections).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          {key === 'services' && <ShoppingCart className="w-4 h-4 text-blue-500" />}
                          {key === 'reviews' && <Star className="w-4 h-4 text-blue-500" />}
                          {key === 'features' && <Eye className="w-4 h-4 text-blue-500" />}
                          {key === 'faq' && <Users className="w-4 h-4 text-blue-500" />}
                          {key === 'cta' && <Type className="w-4 h-4 text-blue-500" />}
                        </div>
                        <Label className="capitalize font-medium">{key} Section</Label>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => updateSection(key as keyof typeof config.sections, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout">
              <Card className="card-modern">
                <CardHeader>
                  <div className="flex items-center">
                    <Layout className="w-5 h-5 mr-2 text-blue-500" />
                    <CardTitle>Layout Settings</CardTitle>
                  </div>
                  <CardDescription>Adjust spacing and layout properties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Maximum Width</Label>
                    <select 
                      value={config.layout.maxWidth}
                      onChange={(e) => setConfig(prev => ({ ...prev, layout: { ...prev.layout, maxWidth: e.target.value } }))}
                      className="input-modern"
                    >
                      <option value="6xl">6xl (1152px)</option>
                      <option value="7xl">7xl (1280px)</option>
                      <option value="full">Full Width</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Section Spacing</Label>
                    <select 
                      value={config.layout.spacing}
                      onChange={(e) => setConfig(prev => ({ ...prev, layout: { ...prev.layout, spacing: e.target.value } }))}
                      className="input-modern"
                    >
                      <option value="tight">Tight</option>
                      <option value="normal">Normal</option>
                      <option value="loose">Loose</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview Panel */}
        <div className="xl:col-span-1">
          <Card className="card-modern sticky top-6">
            <CardHeader>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-500" />
                <CardTitle>Live Preview</CardTitle>
              </div>
              <CardDescription>Preview your changes in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Preview Tabs */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-2">
                  {(['hero', 'services', 'reviews', 'features'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivePreview(tab)}
                      className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                        activePreview === tab 
                          ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="bg-gray-50 rounded-lg min-h-[400px] overflow-hidden">
                {renderPreview()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomepageCustomizationTab;

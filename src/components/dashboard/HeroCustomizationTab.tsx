
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Eye, 
  RefreshCw,
  Target,
  Type,
  Image,
  Zap,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeroSettings {
  headline: {
    main: string;
    highlight: string;
    subtitle: string;
  };
  description: string;
  cta: {
    primary: {
      text: string;
      link: string;
      enabled: boolean;
    };
    secondary: {
      text: string;
      link: string;
      enabled: boolean;
    };
  };
  image: {
    url: string;
    alt: string;
    type: 'success' | 'team' | 'dashboard' | 'growth' | 'custom';
  };
  stats: {
    enabled: boolean;
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
  };
  trustBadge: {
    enabled: boolean;
    rating: string;
    text: string;
  };
  urgency: {
    enabled: boolean;
    text: string;
  };
}

const defaultSettings: HeroSettings = {
  headline: {
    main: "Get 3x Higher ROAS",
    highlight: "Higher ROAS",
    subtitle: "in 90 Days"
  },
  description: "Join 500+ brands that increased their advertising revenue by an average of 300% with our proven Amazon, Walmart & Meta strategies.",
  cta: {
    primary: {
      text: "Get FREE $2,000 Audit",
      link: "/free-audit",
      enabled: true
    },
    secondary: {
      text: "Watch Success Stories",
      link: "#",
      enabled: true
    }
  },
  image: {
    url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
    alt: "Business team celebrating success",
    type: 'success'
  },
  stats: {
    enabled: true,
    stat1: { value: "300%", label: "Avg ROAS Increase" },
    stat2: { value: "24hrs", label: "Setup Time" },
    stat3: { value: "98%", label: "Client Retention" }
  },
  trustBadge: {
    enabled: true,
    rating: "4.9/5",
    text: "from 500+ Happy Clients"
  },
  urgency: {
    enabled: true,
    text: "🔥 Limited Time: Only 10 spots left this month"
  }
};

const imageOptions = [
  {
    type: 'success',
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43',
    alt: 'Business team celebrating success',
    description: 'Team celebrating success - High converting'
  },
  {
    type: 'growth',
    url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71',
    alt: 'Business growth visualization',
    description: 'Growth charts and analytics'
  },
  {
    type: 'team',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    alt: 'Professional business team',
    description: 'Professional team working together'
  },
  {
    type: 'dashboard',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    alt: 'Digital analytics dashboard',
    description: 'Analytics dashboard interface'
  }
];

const HeroCustomizationTab = () => {
  const [settings, setSettings] = useState<HeroSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = localStorage.getItem('heroSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Failed to load hero settings:', error);
      }
    }
  }, []);

  const saveSettings = () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('heroSettings', JSON.stringify(settings));
      
      // Dispatch event for components to listen
      window.dispatchEvent(new CustomEvent('heroSettingsUpdated', { detail: settings }));
      
      toast({
        title: "Hero Settings Saved",
        description: "Your hero section has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save hero settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    toast({
      title: "Settings Reset",
      description: "Hero settings have been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Hero Section Customization</CardTitle>
                <CardDescription>Customize your homepage hero section for maximum conversion</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetToDefaults}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Badge variant="default" className="bg-green-100 text-green-800">Live Preview</Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="cta">Call-to-Action</TabsTrigger>
              <TabsTrigger value="elements">Elements</TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold flex items-center mb-3">
                      <Type className="w-4 h-4 mr-2" />
                      Headline
                    </Label>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="mainHeadline">Main Headline</Label>
                        <Input
                          id="mainHeadline"
                          value={settings.headline.main}
                          onChange={(e) => setSettings({
                            ...settings,
                            headline: { ...settings.headline, main: e.target.value }
                          })}
                          placeholder="Get 3x Higher ROAS"
                        />
                      </div>

                      <div>
                        <Label htmlFor="highlightText">Highlight Text (colored)</Label>
                        <Input
                          id="highlightText"
                          value={settings.headline.highlight}
                          onChange={(e) => setSettings({
                            ...settings,
                            headline: { ...settings.headline, highlight: e.target.value }
                          })}
                          placeholder="Higher ROAS"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                          id="subtitle"
                          value={settings.headline.subtitle}
                          onChange={(e) => setSettings({
                            ...settings,
                            headline: { ...settings.headline, subtitle: e.target.value }
                          })}
                          placeholder="in 90 Days"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={settings.description}
                      onChange={(e) => setSettings({
                        ...settings,
                        description: e.target.value
                      })}
                      placeholder="Join 500+ brands that increased their advertising revenue..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Preview</Label>
                  <div className="p-6 border rounded-lg bg-gradient-to-br from-indigo-50 via-white to-blue-50">
                    <div className="space-y-4">
                      <h1 className="text-2xl font-bold text-slate-900">
                        {settings.headline.main.replace(settings.headline.highlight, '')}{' '}
                        <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                          {settings.headline.highlight}
                        </span>{' '}
                        {settings.headline.subtitle}
                      </h1>
                      <p className="text-slate-600">{settings.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Image Tab */}
            <TabsContent value="image" className="space-y-6">
              <div>
                <Label className="text-base font-semibold flex items-center mb-4">
                  <Image className="w-4 h-4 mr-2" />
                  Hero Image Selection
                </Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {imageOptions.map((option) => (
                    <Card 
                      key={option.type}
                      className={`cursor-pointer transition-all duration-200 ${
                        settings.image.type === option.type 
                          ? 'ring-2 ring-blue-500 shadow-lg' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSettings({
                        ...settings,
                        image: {
                          url: option.url,
                          alt: option.alt,
                          type: option.type as any
                        }
                      })}
                    >
                      <CardContent className="p-4">
                        <img 
                          src={option.url} 
                          alt={option.alt}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-sm text-slate-900">{option.description}</h3>
                        <p className="text-xs text-slate-500 mt-1">{option.alt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6">
                  <Label htmlFor="customImage">Custom Image URL</Label>
                  <Input
                    id="customImage"
                    value={settings.image.url}
                    onChange={(e) => setSettings({
                      ...settings,
                      image: { ...settings.image, url: e.target.value, type: 'custom' }
                    })}
                    placeholder="https://your-image-url.com/image.jpg"
                  />
                </div>
              </div>
            </TabsContent>

            {/* CTA Tab */}
            <TabsContent value="cta" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Primary CTA
                  </Label>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.cta.primary.enabled}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        cta: { ...settings.cta, primary: { ...settings.cta.primary, enabled: checked }}
                      })}
                    />
                    <Label>Enable Primary Button</Label>
                  </div>

                  {settings.cta.primary.enabled && (
                    <>
                      <div>
                        <Label htmlFor="primaryText">Button Text</Label>
                        <Input
                          id="primaryText"
                          value={settings.cta.primary.text}
                          onChange={(e) => setSettings({
                            ...settings,
                            cta: { ...settings.cta, primary: { ...settings.cta.primary, text: e.target.value }}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="primaryLink">Button Link</Label>
                        <Input
                          id="primaryLink"
                          value={settings.cta.primary.link}
                          onChange={(e) => setSettings({
                            ...settings,
                            cta: { ...settings.cta, primary: { ...settings.cta.primary, link: e.target.value }}
                          })}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Secondary CTA</Label>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.cta.secondary.enabled}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        cta: { ...settings.cta, secondary: { ...settings.cta.secondary, enabled: checked }}
                      })}
                    />
                    <Label>Enable Secondary Button</Label>
                  </div>

                  {settings.cta.secondary.enabled && (
                    <>
                      <div>
                        <Label htmlFor="secondaryText">Button Text</Label>
                        <Input
                          id="secondaryText"
                          value={settings.cta.secondary.text}
                          onChange={(e) => setSettings({
                            ...settings,
                            cta: { ...settings.cta, secondary: { ...settings.cta.secondary, text: e.target.value }}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondaryLink">Button Link</Label>
                        <Input
                          id="secondaryLink"
                          value={settings.cta.secondary.link}
                          onChange={(e) => setSettings({
                            ...settings,
                            cta: { ...settings.cta, secondary: { ...settings.cta.secondary, link: e.target.value }}
                          })}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Elements Tab */}
            <TabsContent value="elements" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold flex items-center mb-4">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Statistics
                    </Label>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch
                        checked={settings.stats.enabled}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, enabled: checked }
                        })}
                      />
                      <Label>Show Statistics</Label>
                    </div>

                    {settings.stats.enabled && (
                      <div className="space-y-3">
                        {['stat1', 'stat2', 'stat3'].map((stat, index) => (
                          <div key={stat} className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="300%"
                              value={settings.stats[stat as keyof typeof settings.stats].value}
                              onChange={(e) => setSettings({
                                ...settings,
                                stats: {
                                  ...settings.stats,
                                  [stat]: { ...settings.stats[stat as keyof typeof settings.stats], value: e.target.value }
                                }
                              })}
                            />
                            <Input
                              placeholder="ROAS Increase"
                              value={settings.stats[stat as keyof typeof settings.stats].label}
                              onChange={(e) => setSettings({
                                ...settings,
                                stats: {
                                  ...settings.stats,
                                  [stat]: { ...settings.stats[stat as keyof typeof settings.stats], label: e.target.value }
                                }
                              })}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-base font-semibold flex items-center mb-4">
                      <Star className="w-4 h-4 mr-2" />
                      Trust Badge
                    </Label>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch
                        checked={settings.trustBadge.enabled}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          trustBadge: { ...settings.trustBadge, enabled: checked }
                        })}
                      />
                      <Label>Show Trust Badge</Label>
                    </div>

                    {settings.trustBadge.enabled && (
                      <div className="space-y-3">
                        <Input
                          placeholder="4.9/5"
                          value={settings.trustBadge.rating}
                          onChange={(e) => setSettings({
                            ...settings,
                            trustBadge: { ...settings.trustBadge, rating: e.target.value }
                          })}
                        />
                        <Input
                          placeholder="from 500+ Happy Clients"
                          value={settings.trustBadge.text}
                          onChange={(e) => setSettings({
                            ...settings,
                            trustBadge: { ...settings.trustBadge, text: e.target.value }
                          })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold flex items-center mb-4">
                      <Users className="w-4 h-4 mr-2" />
                      Urgency Element
                    </Label>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch
                        checked={settings.urgency.enabled}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          urgency: { ...settings.urgency, enabled: checked }
                        })}
                      />
                      <Label>Show Urgency Banner</Label>
                    </div>

                    {settings.urgency.enabled && (
                      <Input
                        placeholder="🔥 Limited Time: Only 10 spots left this month"
                        value={settings.urgency.text}
                        onChange={(e) => setSettings({
                          ...settings,
                          urgency: { ...settings.urgency, text: e.target.value }
                        })}
                      />
                    )}
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Label className="text-sm font-semibold text-slate-700 mb-2 block">Live Preview</Label>
                    <div className="text-xs text-slate-500 mb-3">See changes instantly on your homepage</div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Homepage
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Changes will be applied to your homepage immediately
            </div>
            <Button 
              onClick={saveSettings} 
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroCustomizationTab;


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
  Zap,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  stats: {
    enabled: boolean;
    stat1: { value: string; label: string; color: string };
    stat2: { value: string; label: string; color: string };
    stat3: { value: string; label: string; color: string };
    stat4: { value: string; label: string; color: string };
  };
}

const defaultSettings: HeroSettings = {
  headline: {
    main: "Scale Your Business",
    highlight: "With Precision",
    subtitle: ""
  },
  description: "Transform your advertising performance with our data-driven strategies across Amazon, Walmart, and Meta platforms",
  cta: {
    primary: {
      text: "Get Free Strategy Call",
      link: "/free-audit",
      enabled: true
    },
    secondary: {
      text: "Watch Case Study",
      link: "/case-studies",
      enabled: true
    }
  },
  stats: {
    enabled: true,
    stat1: { value: "500+", label: "Campaigns Managed", color: "from-blue-400 to-cyan-400" },
    stat2: { value: "$50M+", label: "Ad Spend Managed", color: "from-cyan-400 to-purple-400" },
    stat3: { value: "300%", label: "Avg ROI Increase", color: "from-purple-400 to-pink-400" },
    stat4: { value: "24/7", label: "Account Monitoring", color: "from-pink-400 to-blue-400" }
  }
};

const HeroCustomizationTab = () => {
  const [settings, setSettings] = useState<HeroSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadSettings = () => {
      // Load CTA buttons from localStorage (current system)
      const savedCTAButtons = localStorage.getItem('ctaButtonsData');
      if (savedCTAButtons) {
        try {
          const parsedCTA = JSON.parse(savedCTAButtons);
          setSettings(prev => ({
            ...prev,
            cta: {
              primary: {
                text: parsedCTA.primaryText || prev.cta.primary.text,
                link: prev.cta.primary.link,
                enabled: prev.cta.primary.enabled
              },
              secondary: {
                text: parsedCTA.secondaryText || prev.cta.secondary.text,
                link: prev.cta.secondary.link,
                enabled: prev.cta.secondary.enabled
              }
            }
          }));
        } catch (error) {
          console.error('Failed to load CTA buttons:', error);
        }
      }

      // Load stats from localStorage (current system)
      const savedStats = localStorage.getItem('statsData');
      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          if (Array.isArray(parsedStats) && parsedStats.length >= 4) {
            setSettings(prev => ({
              ...prev,
              stats: {
                enabled: prev.stats.enabled,
                stat1: { value: parsedStats[0].number, label: parsedStats[0].label, color: parsedStats[0].color },
                stat2: { value: parsedStats[1].number, label: parsedStats[1].label, color: parsedStats[1].color },
                stat3: { value: parsedStats[2].number, label: parsedStats[2].label, color: parsedStats[2].color },
                stat4: { value: parsedStats[3].number, label: parsedStats[3].label, color: parsedStats[3].color }
              }
            }));
          }
        } catch (error) {
          console.error('Failed to load stats:', error);
        }
      }
    };

    loadSettings();
  }, []);

  const saveSettings = () => {
    setIsLoading(true);
    
    try {
      // Save CTA buttons in current format
      const ctaButtonsData = {
        primaryText: settings.cta.primary.text,
        secondaryText: settings.cta.secondary.text
      };
      localStorage.setItem('ctaButtonsData', JSON.stringify(ctaButtonsData));

      // Save stats in current format
      const statsData = [
        { id: "campaigns", number: settings.stats.stat1.value, label: settings.stats.stat1.label, color: settings.stats.stat1.color },
        { id: "adspend", number: settings.stats.stat2.value, label: settings.stats.stat2.label, color: settings.stats.stat2.color },
        { id: "roi", number: settings.stats.stat3.value, label: settings.stats.stat3.label, color: settings.stats.stat3.color },
        { id: "monitoring", number: settings.stats.stat4.value, label: settings.stats.stat4.label, color: settings.stats.stat4.color }
      ];
      localStorage.setItem('statsData', JSON.stringify(statsData));
      
      // Dispatch events to notify frontend components
      window.dispatchEvent(new CustomEvent('ctaButtonsUpdated', { detail: ctaButtonsData }));
      window.dispatchEvent(new CustomEvent('statsUpdated', { detail: statsData }));
      
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

  const updateStatValue = (statKey: 'stat1' | 'stat2' | 'stat3' | 'stat4', field: 'value' | 'label', newValue: string) => {
    setSettings({
      ...settings,
      stats: {
        ...settings.stats,
        [statKey]: {
          ...settings.stats[statKey],
          [field]: newValue
        }
      }
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="cta">Call-to-Action</TabsTrigger>
              <TabsTrigger value="elements">Statistics</TabsTrigger>
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
                          placeholder="Scale Your Business"
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
                          placeholder="With Precision"
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
                      placeholder="Transform your advertising performance with our data-driven strategies..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Preview</Label>
                  <div className="p-6 border rounded-lg bg-gradient-to-br from-gray-50 via-white to-gray-100">
                    <div className="space-y-4">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {settings.headline.main}{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {settings.headline.highlight}
                        </span>
                      </h1>
                      <p className="text-gray-600">{settings.description}</p>
                    </div>
                  </div>
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

            {/* Statistics Tab */}
            <TabsContent value="elements" className="space-y-6">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(['stat1', 'stat2', 'stat3', 'stat4'] as const).map((statKey, index) => (
                        <div key={statKey} className="space-y-2">
                          <Label className="text-sm font-medium">Statistic {index + 1}</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="500+"
                              value={settings.stats[statKey].value}
                              onChange={(e) => updateStatValue(statKey, 'value', e.target.value)}
                            />
                            <Input
                              placeholder="Campaigns Managed"
                              value={settings.stats[statKey].label}
                              onChange={(e) => updateStatValue(statKey, 'label', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <Label className="text-sm font-semibold text-slate-700 mb-2 block">Live Preview</Label>
                  <div className="text-xs text-slate-500 mb-3">See changes instantly on your homepage</div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => window.open('/', '_blank')}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Homepage
                  </Button>
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

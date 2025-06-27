
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
import { Plus, Trash2, Save, Eye, RefreshCw, Target, Type, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  };
  description: string;
  cta: {
    primary: {
      text: string;
      enabled: boolean;
    };
    secondary: {
      text: string;
      enabled: boolean;
    };
  };
  trustBadge: {
    enabled: boolean;
    text: string;
  };
  statsEnabled: boolean;
}

const defaultSettings: HeroSettings = {
  headline: {
    main: "Scale Your Business",
    highlight: "With Precision"
  },
  description: "Transform your advertising performance with our data-driven strategies across Amazon, Walmart, and Meta platforms",
  cta: {
    primary: {
      text: "Get Free Strategy Call",
      enabled: true
    },
    secondary: {
      text: "Watch Case Study",
      enabled: true
    }
  },
  trustBadge: {
    enabled: true,
    text: "Trusted by 500+ Leading Brands"
  },
  statsEnabled: true
};

const defaultStats: StatBlock[] = [
  { id: "campaigns", number: "500+", label: "Campaigns Managed", color: "from-blue-400 to-cyan-400" },
  { id: "adspend", number: "$50M+", label: "Ad Spend Managed", color: "from-cyan-400 to-purple-400" },
  { id: "roi", number: "300%", label: "Avg ROI Increase", color: "from-purple-400 to-pink-400" },
  { id: "monitoring", number: "24/7", label: "Account Monitoring", color: "from-pink-400 to-blue-400" }
];

const colorOptions = [
  { value: "from-blue-400 to-cyan-400", label: "Blue to Cyan" },
  { value: "from-cyan-400 to-purple-400", label: "Cyan to Purple" },
  { value: "from-purple-400 to-pink-400", label: "Purple to Pink" },
  { value: "from-pink-400 to-blue-400", label: "Pink to Blue" },
  { value: "from-green-400 to-blue-400", label: "Green to Blue" },
  { value: "from-yellow-400 to-red-400", label: "Yellow to Red" }
];

const HeroCustomizationTab = () => {
  const [settings, setSettings] = useState<HeroSettings>(defaultSettings);
  const [statsBlocks, setStatsBlocks] = useState<StatBlock[]>(defaultStats);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadSettings = () => {
      // Load CTA buttons from localStorage
      const savedCTAButtons = localStorage.getItem('ctaButtonsData');
      if (savedCTAButtons) {
        try {
          const parsedCTA = JSON.parse(savedCTAButtons);
          setSettings(prev => ({
            ...prev,
            cta: {
              primary: {
                text: parsedCTA.primaryText || prev.cta.primary.text,
                enabled: prev.cta.primary.enabled
              },
              secondary: {
                text: parsedCTA.secondaryText || prev.cta.secondary.text,
                enabled: prev.cta.secondary.enabled
              }
            }
          }));
        } catch (error) {
          console.error('Failed to load CTA buttons:', error);
        }
      }

      // Load stats from localStorage
      const savedStats = localStorage.getItem('statsData');
      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          if (Array.isArray(parsedStats)) {
            setStatsBlocks(parsedStats);
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
      localStorage.setItem('statsData', JSON.stringify(statsBlocks));
      
      // Dispatch events to notify frontend components
      window.dispatchEvent(new CustomEvent('ctaButtonsUpdated', { detail: ctaButtonsData }));
      window.dispatchEvent(new CustomEvent('statsUpdated', { detail: statsBlocks }));
      
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
    setStatsBlocks(defaultStats);
    toast({
      title: "Settings Reset",
      description: "Hero settings have been reset to defaults.",
    });
  };

  const updateStatBlock = (id: string, field: keyof StatBlock, value: string) => {
    setStatsBlocks(prev => prev.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const addStatBlock = () => {
    const newStat: StatBlock = {
      id: `stat-${Date.now()}`,
      number: "100+",
      label: "New Metric",
      color: "from-blue-400 to-purple-400"
    };
    setStatsBlocks(prev => [...prev, newStat]);
  };

  const removeStatBlock = (id: string) => {
    setStatsBlocks(prev => prev.filter(stat => stat.id !== id));
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
                <CardTitle className="text-xl font-bold text-slate-900">Hero Section & Statistics Management</CardTitle>
                <CardDescription>Customize your homepage hero section and manage all statistics</CardDescription>
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
              <TabsTrigger value="content">Content & CTA</TabsTrigger>
              <TabsTrigger value="statistics">Statistics Management</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
            </TabsList>

            {/* Content & CTA Tab */}
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
                  <Label className="text-base font-semibold flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Call-to-Action Buttons
                  </Label>
                  
                  <div className="space-y-4">
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
                      <div>
                        <Label htmlFor="primaryText">Primary Button Text</Label>
                        <Input
                          id="primaryText"
                          value={settings.cta.primary.text}
                          onChange={(e) => setSettings({
                            ...settings,
                            cta: { ...settings.cta, primary: { ...settings.cta.primary, text: e.target.value }}
                          })}
                        />
                      </div>
                    )}

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
                      <div>
                        <Label htmlFor="secondaryText">Secondary Button Text</Label>
                        <Input
                          id="secondaryText"
                          value={settings.cta.secondary.text}
                          onChange={(e) => setSettings({
                            ...settings,
                            cta: { ...settings.cta, secondary: { ...settings.cta.secondary, text: e.target.value }}
                          })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Statistics Management Tab */}
            <TabsContent value="statistics" className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Statistics Blocks (Used across the website)
                  </Label>
                  <Button onClick={addStatBlock} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stat
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    checked={settings.statsEnabled}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      statsEnabled: checked
                    })}
                  />
                  <Label>Show Statistics on Homepage</Label>
                </div>

                {settings.statsEnabled && (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <strong>Note:</strong> These statistics are used across your entire website including:
                      <br />• Hero section on homepage
                      <br />• FAQ section statistics
                      <br />• Any other sections that display stats
                    </div>
                    
                    {statsBlocks.map((stat, index) => (
                      <div key={stat.id} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium text-slate-700">Statistic {index + 1}</h5>
                          <Button 
                            onClick={() => removeStatBlock(stat.id)} 
                            size="sm" 
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Number/Value</Label>
                            <Input
                              value={stat.number}
                              onChange={(e) => updateStatBlock(stat.id, 'number', e.target.value)}
                              placeholder="500+"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Label</Label>
                            <Input
                              value={stat.label}
                              onChange={(e) => updateStatBlock(stat.id, 'label', e.target.value)}
                              placeholder="Campaigns Managed"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Color Gradient</Label>
                          <select
                            value={stat.color}
                            onChange={(e) => updateStatBlock(stat.id, 'color', e.target.value)}
                            className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:outline-none"
                          >
                            {colorOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Live Preview Tab */}
            <TabsContent value="preview" className="space-y-6">
              <div className="space-y-6">
                {/* Hero Preview */}
                <div className="p-6 border rounded-lg bg-gradient-to-br from-gray-50 via-white to-gray-100">
                  <div className="space-y-4 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50">
                      <span className="text-sm font-medium text-gray-700">{settings.trustBadge.text}</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900">
                      {settings.headline.main}{' '}
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {settings.headline.highlight}
                      </span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">{settings.description}</p>
                    
                    <div className="flex gap-4 justify-center">
                      {settings.cta.primary.enabled && (
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          {settings.cta.primary.text}
                        </Button>
                      )}
                      {settings.cta.secondary.enabled && (
                        <Button variant="outline">
                          {settings.cta.secondary.text}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Preview */}
                {settings.statsEnabled && (
                  <div className="bg-white rounded-lg p-6 border">
                    <h4 className="font-medium text-slate-700 mb-4 text-center">Statistics Preview</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {statsBlocks.map((stat) => (
                        <div key={stat.id} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                            {stat.number}
                          </div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Live Homepage
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Changes will be applied across your website immediately
            </div>
            <Button 
              onClick={saveSettings} 
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroCustomizationTab;

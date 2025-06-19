
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { 
  Save, 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HomepageSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: number;
    lineHeight: number;
  };
  layout: {
    containerMaxWidth: string;
    sectionSpacing: number;
    borderRadius: number;
    shadowIntensity: number;
  };
  hero: {
    backgroundType: 'gradient' | 'solid' | 'image';
    backgroundValue: string;
    showParticles: boolean;
    animationSpeed: number;
  };
  sections: {
    showHero: boolean;
    showServices: boolean;
    showFeatures: boolean;
    showReviews: boolean;
    showFAQ: boolean;
  };
}

const HomepageCustomizationTab = () => {
  const [settings, setSettings] = useState<HomepageSettings>({
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      accentColor: '#06b6d4',
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    },
    typography: {
      headingFont: 'Space Grotesk',
      bodyFont: 'Inter',
      fontSize: 16,
      lineHeight: 1.6
    },
    layout: {
      containerMaxWidth: '1280px',
      sectionSpacing: 80,
      borderRadius: 12,
      shadowIntensity: 20
    },
    hero: {
      backgroundType: 'gradient',
      backgroundValue: 'from-gray-50 via-white to-gray-100',
      showParticles: true,
      animationSpeed: 6
    },
    sections: {
      showHero: true,
      showServices: true,
      showFeatures: true,
      showReviews: true,
      showFAQ: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { toast } = useToast();

  useEffect(() => {
    const savedSettings = localStorage.getItem('homepageSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...settings, ...parsedSettings });
      } catch (error) {
        console.error('Failed to load homepage settings:', error);
      }
    }
  }, []);

  const saveSettings = () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('homepageSettings', JSON.stringify(settings));
      
      // Apply settings to document
      applySettingsToDocument();
      
      // Dispatch event for components to listen
      window.dispatchEvent(new CustomEvent('homepageSettingsUpdated', { detail: settings }));
      
      toast({
        title: "Homepage Settings Saved",
        description: "Your customizations have been applied successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save homepage settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applySettingsToDocument = () => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--primary-color', settings.theme.primaryColor);
    root.style.setProperty('--secondary-color', settings.theme.secondaryColor);
    root.style.setProperty('--accent-color', settings.theme.accentColor);
    root.style.setProperty('--background-color', settings.theme.backgroundColor);
    root.style.setProperty('--text-color', settings.theme.textColor);
    root.style.setProperty('--font-size', `${settings.typography.fontSize}px`);
    root.style.setProperty('--line-height', settings.typography.lineHeight.toString());
    root.style.setProperty('--border-radius', `${settings.layout.borderRadius}px`);
    root.style.setProperty('--section-spacing', `${settings.layout.sectionSpacing}px`);
  };

  const resetToDefaults = () => {
    setSettings({
      theme: {
        primaryColor: '#3b82f6',
        secondaryColor: '#8b5cf6',
        accentColor: '#06b6d4',
        backgroundColor: '#ffffff',
        textColor: '#1f2937'
      },
      typography: {
        headingFont: 'Space Grotesk',
        bodyFont: 'Inter',
        fontSize: 16,
        lineHeight: 1.6
      },
      layout: {
        containerMaxWidth: '1280px',
        sectionSpacing: 80,
        borderRadius: 12,
        shadowIntensity: 20
      },
      hero: {
        backgroundType: 'gradient',
        backgroundValue: 'from-gray-50 via-white to-gray-100',
        showParticles: true,
        animationSpeed: 6
      },
      sections: {
        showHero: true,
        showServices: true,
        showFeatures: true,
        showReviews: true,
        showFAQ: true
      }
    });
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-modern">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg mr-3">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Homepage Customization</CardTitle>
                <CardDescription>Customize every aspect of your homepage design and layout</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetToDefaults}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Badge variant="default">Live Preview</Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="theme" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
            </TabsList>

            {/* Theme Tab */}
            <TabsContent value="theme" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Color Palette
                  </Label>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={settings.theme.primaryColor}
                          onChange={(e) => setSettings({
                            ...settings,
                            theme: { ...settings.theme, primaryColor: e.target.value }
                          })}
                          className="w-16 h-10 p-1 rounded-lg"
                        />
                        <Input
                          value={settings.theme.primaryColor}
                          onChange={(e) => setSettings({
                            ...settings,
                            theme: { ...settings.theme, primaryColor: e.target.value }
                          })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={settings.theme.secondaryColor}
                          onChange={(e) => setSettings({
                            ...settings,
                            theme: { ...settings.theme, secondaryColor: e.target.value }
                          })}
                          className="w-16 h-10 p-1 rounded-lg"
                        />
                        <Input
                          value={settings.theme.secondaryColor}
                          onChange={(e) => setSettings({
                            ...settings,
                            theme: { ...settings.theme, secondaryColor: e.target.value }
                          })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <Input
                          id="accentColor"
                          type="color"
                          value={settings.theme.accentColor}
                          onChange={(e) => setSettings({
                            ...settings,
                            theme: { ...settings.theme, accentColor: e.target.value }
                          })}
                          className="w-16 h-10 p-1 rounded-lg"
                        />
                        <Input
                          value={settings.theme.accentColor}
                          onChange={(e) => setSettings({
                            ...settings,
                            theme: { ...settings.theme, accentColor: e.target.value }
                          })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Color Preview</Label>
                  <div className="space-y-3">
                    <div 
                      className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: settings.theme.primaryColor }}
                    >
                      Primary
                    </div>
                    <div 
                      className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: settings.theme.secondaryColor }}
                    >
                      Secondary
                    </div>
                    <div 
                      className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: settings.theme.accentColor }}
                    >
                      Accent
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold flex items-center">
                    <Type className="w-4 h-4 mr-2" />
                    Font Settings
                  </Label>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="headingFont">Heading Font</Label>
                      <Input
                        id="headingFont"
                        value={settings.typography.headingFont}
                        onChange={(e) => setSettings({
                          ...settings,
                          typography: { ...settings.typography, headingFont: e.target.value }
                        })}
                        placeholder="Space Grotesk"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bodyFont">Body Font</Label>
                      <Input
                        id="bodyFont"
                        value={settings.typography.bodyFont}
                        onChange={(e) => setSettings({
                          ...settings,
                          typography: { ...settings.typography, bodyFont: e.target.value }
                        })}
                        placeholder="Inter"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fontSize">Base Font Size: {settings.typography.fontSize}px</Label>
                      <Slider
                        value={[settings.typography.fontSize]}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          typography: { ...settings.typography, fontSize: value[0] }
                        })}
                        max={24}
                        min={12}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lineHeight">Line Height: {settings.typography.lineHeight}</Label>
                      <Slider
                        value={[settings.typography.lineHeight]}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          typography: { ...settings.typography, lineHeight: value[0] }
                        })}
                        max={2}
                        min={1}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Typography Preview</Label>
                  <div 
                    className="p-6 border rounded-lg"
                    style={{
                      fontFamily: settings.typography.bodyFont,
                      fontSize: `${settings.typography.fontSize}px`,
                      lineHeight: settings.typography.lineHeight
                    }}
                  >
                    <h3 
                      className="text-2xl font-bold mb-3"
                      style={{ fontFamily: settings.typography.headingFont }}
                    >
                      Sample Heading
                    </h3>
                    <p>
                      This is a sample paragraph to preview your typography settings. 
                      You can see how the font family, size, and line height affect readability.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold flex items-center">
                    <Layout className="w-4 h-4 mr-2" />
                    Layout Settings
                  </Label>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="containerMaxWidth">Container Max Width</Label>
                      <Input
                        id="containerMaxWidth"
                        value={settings.layout.containerMaxWidth}
                        onChange={(e) => setSettings({
                          ...settings,
                          layout: { ...settings.layout, containerMaxWidth: e.target.value }
                        })}
                        placeholder="1280px"
                      />
                    </div>

                    <div>
                      <Label htmlFor="sectionSpacing">Section Spacing: {settings.layout.sectionSpacing}px</Label>
                      <Slider
                        value={[settings.layout.sectionSpacing]}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          layout: { ...settings.layout, sectionSpacing: value[0] }
                        })}
                        max={160}
                        min={40}
                        step={8}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="borderRadius">Border Radius: {settings.layout.borderRadius}px</Label>
                      <Slider
                        value={[settings.layout.borderRadius]}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          layout: { ...settings.layout, borderRadius: value[0] }
                        })}
                        max={32}
                        min={0}
                        step={2}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="shadowIntensity">Shadow Intensity: {settings.layout.shadowIntensity}%</Label>
                      <Slider
                        value={[settings.layout.shadowIntensity]}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          layout: { ...settings.layout, shadowIntensity: value[0] }
                        })}
                        max={100}
                        min={0}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Preview Modes</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={previewMode === 'desktop' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor className="w-4 h-4 mr-2" />
                      Desktop
                    </Button>
                    <Button
                      variant={previewMode === 'tablet' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('tablet')}
                    >
                      <Tablet className="w-4 h-4 mr-2" />
                      Tablet
                    </Button>
                    <Button
                      variant={previewMode === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Mobile
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Hero Section Tab */}
            <TabsContent value="hero" className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Hero Section Settings
                </Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="backgroundType">Background Type</Label>
                      <select
                        id="backgroundType"
                        value={settings.hero.backgroundType}
                        onChange={(e) => setSettings({
                          ...settings,
                          hero: { ...settings.hero, backgroundType: e.target.value as 'gradient' | 'solid' | 'image' }
                        })}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="gradient">Gradient</option>
                        <option value="solid">Solid Color</option>
                        <option value="image">Background Image</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="backgroundValue">Background Value</Label>
                      <Input
                        id="backgroundValue"
                        value={settings.hero.backgroundValue}
                        onChange={(e) => setSettings({
                          ...settings,
                          hero: { ...settings.hero, backgroundValue: e.target.value }
                        })}
                        placeholder="from-gray-50 via-white to-gray-100"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showParticles"
                        checked={settings.hero.showParticles}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          hero: { ...settings.hero, showParticles: checked }
                        })}
                      />
                      <Label htmlFor="showParticles">Show Animated Particles</Label>
                    </div>

                    <div>
                      <Label htmlFor="animationSpeed">Animation Speed: {settings.hero.animationSpeed}s</Label>
                      <Slider
                        value={[settings.hero.animationSpeed]}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          hero: { ...settings.hero, animationSpeed: value[0] }
                        })}
                        max={12}
                        min={2}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Sections Tab */}
            <TabsContent value="sections" className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Section Visibility
                </Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(settings.sections).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <Switch
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          sections: { ...settings.sections, [key]: checked }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Changes are applied in real-time to the preview
            </div>
            <Button 
              onClick={saveSettings} 
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-purple-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomepageCustomizationTab;

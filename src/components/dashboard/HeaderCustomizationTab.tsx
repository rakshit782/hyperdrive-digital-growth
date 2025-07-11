import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Menu, Save, RotateCcw, Palette } from "lucide-react";
import ModernDashboardLayout from "./ModernDashboardLayout";

interface HeaderSettings {
  logoSize: string;
  logoAlt: string;
  menuGap: number;
  logoMenuGap: number;
  ctaMenuGap: number;
  ctaButtonText: string;
  ctaButtonStyle: string;
  mobileMenuEnabled: boolean;
  servicesDropdownEnabled: boolean;
  headerBackground: string;
  headerOpacity: number;
  headerBarColor: string;
  headerCustomColor: string;
  menuItems: Array<{
    title: string;
    href: string;
    enabled: boolean;
  }>;
}

const defaultSettings: HeaderSettings = {
  logoSize: "h-12",
  logoAlt: "AMZ AD SCOUT - The Growth Agency",
  menuGap: 1,
  logoMenuGap: 2,
  ctaMenuGap: 2,
  ctaButtonText: "Get Free Audit",
  ctaButtonStyle: "gradient",
  mobileMenuEnabled: true,
  servicesDropdownEnabled: true,
  headerBackground: "blur",
  headerOpacity: 80,
  headerBarColor: "white",
  headerCustomColor: "#ffffff",
  menuItems: [
    { title: "Home", href: "/", enabled: true },
    { title: "Pricing", href: "/pricing", enabled: true },
    { title: "About", href: "/about", enabled: true },
    { title: "Case Studies", href: "/case-studies", enabled: true },
    { title: "Contact", href: "/contact", enabled: true },
  ]
};

const HeaderCustomizationTab = () => {
  const [settings, setSettings] = useState<HeaderSettings>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('headerSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Failed to parse header settings:', error);
      }
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('headerSettings', JSON.stringify(settings));
    
    const event = new CustomEvent('headerSettingsUpdated', { detail: settings });
    window.dispatchEvent(event);
    
    setHasChanges(false);
    console.log('Header settings saved:', settings);
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  const updateSettings = (updates: Partial<HeaderSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const updateMenuItem = (index: number, updates: Partial<typeof settings.menuItems[0]>) => {
    const newMenuItems = [...settings.menuItems];
    newMenuItems[index] = { ...newMenuItems[index], ...updates };
    updateSettings({ menuItems: newMenuItems });
  };

  const actionButtons = (
    <div className="flex items-center space-x-3">
      {hasChanges && (
        <span className="text-sm text-orange-600 font-medium animate-pulse">Unsaved changes</span>
      )}
      <Button variant="outline" onClick={resetToDefaults} className="btn-glass">
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset
      </Button>
      <Button onClick={saveSettings} className="btn-primary">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );

  return (
    <ModernDashboardLayout 
      title="Header Customization" 
      description="Customize your website header appearance and navigation"
      action={actionButtons}
    >
      <div className="space-y-8">
        {/* Logo Settings */}
        <Card className="glass-effect animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
              Logo Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="form-modern">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="logoSize">Logo Size</Label>
                <Select
                  value={settings.logoSize}
                  onValueChange={(value) => updateSettings({ logoSize: value })}
                >
                  <SelectTrigger className="focus-modern">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h-8">Small (32px)</SelectItem>
                    <SelectItem value="h-10">Medium (40px)</SelectItem>
                    <SelectItem value="h-12">Large (48px)</SelectItem>
                    <SelectItem value="h-16">Extra Large (64px)</SelectItem>
                    <SelectItem value="h-20">XXL (80px)</SelectItem>
                    <SelectItem value="h-24">XXXL (96px)</SelectItem>
                    <SelectItem value="h-32">Huge (128px)</SelectItem>
                    <SelectItem value="h-40">Maximum (160px)</SelectItem>
                    <SelectItem value="h-48">Ultra (192px)</SelectItem>
                    <SelectItem value="h-56">Mega (224px)</SelectItem>
                    <SelectItem value="h-64">Super (256px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoAlt">Logo Alt Text</Label>
                <Input
                  id="logoAlt"
                  value={settings.logoAlt}
                  onChange={(e) => updateSettings({ logoAlt: e.target.value })}
                  placeholder="Logo description for accessibility"
                  className="focus-modern"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header Bar Color */}
        <Card className="glass-effect animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
              <Palette className="w-5 h-5 mr-2" />
              Header Bar Color
            </CardTitle>
          </CardHeader>
          <CardContent className="form-modern">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="headerBarColor">Color Preset</Label>
                <Select
                  value={settings.headerBarColor}
                  onValueChange={(value) => updateSettings({ headerBarColor: value })}
                >
                  <SelectTrigger className="focus-modern">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="gray">Light Gray</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="yellow">Yellow</SelectItem>
                    <SelectItem value="custom">Custom Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {settings.headerBarColor === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="customColor">Custom Hex Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="customColor"
                      type="color"
                      value={settings.headerCustomColor}
                      onChange={(e) => updateSettings({ headerCustomColor: e.target.value })}
                      className="w-16 h-10 p-1 border rounded focus-modern"
                    />
                    <Input
                      value={settings.headerCustomColor}
                      onChange={(e) => updateSettings({ headerCustomColor: e.target.value })}
                      placeholder="#ffffff"
                      className="flex-1 focus-modern"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Spacing Controls */}
        <Card className="glass-effect animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
              Element Spacing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Gap Between Logo and Menu: {settings.logoMenuGap * 0.25}rem</Label>
              <Slider
                value={[settings.logoMenuGap]}
                onValueChange={(value) => updateSettings({ logoMenuGap: value[0] })}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">Controls spacing between logo and navigation menu</p>
            </div>

            <div className="space-y-2">
              <Label>Gap Between Menu Items: {settings.menuGap * 0.25}rem</Label>
              <Slider
                value={[settings.menuGap]}
                onValueChange={(value) => updateSettings({ menuGap: value[0] })}
                max={8}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">Controls spacing between individual navigation items</p>
            </div>

            <div className="space-y-2">
              <Label>Gap Between Menu and CTA Button: {settings.ctaMenuGap * 0.25}rem</Label>
              <Slider
                value={[settings.ctaMenuGap]}
                onValueChange={(value) => updateSettings({ ctaMenuGap: value[0] })}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500">Controls spacing between navigation menu and CTA button</p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Settings */}
        <Card className="glass-effect animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
              Navigation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <Label htmlFor="servicesDropdown" className="font-medium">Services Dropdown</Label>
              <Switch
                id="servicesDropdown"
                checked={settings.servicesDropdownEnabled}
                onCheckedChange={(checked) => updateSettings({ servicesDropdownEnabled: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <Label htmlFor="mobileMenu" className="font-medium">Mobile Menu</Label>
              <Switch
                id="mobileMenu"
                checked={settings.mobileMenuEnabled}
                onCheckedChange={(checked) => updateSettings({ mobileMenuEnabled: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="glass-effect animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full mr-3"></div>
              Menu Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settings.menuItems.map((item, index) => (
                <Card key={index} className="bg-white/60 border border-gray-200/50 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateMenuItem(index, { title: e.target.value })}
                          className="h-9 focus-modern"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Link</Label>
                        <Input
                          value={item.href}
                          onChange={(e) => updateMenuItem(index, { href: e.target.value })}
                          className="h-9 focus-modern"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                          <Label className="text-xs font-medium">Enabled</Label>
                          <Switch
                            checked={item.enabled}
                            onCheckedChange={(checked) => updateMenuItem(index, { enabled: checked })}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Button Settings */}
        <Card className="glass-effect animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mr-3"></div>
              CTA Button Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="form-modern">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ctaText">Button Text</Label>
                <Input
                  id="ctaText"
                  value={settings.ctaButtonText}
                  onChange={(e) => updateSettings({ ctaButtonText: e.target.value })}
                  placeholder="Get Free Audit"
                  className="focus-modern"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaStyle">Button Style</Label>
                <Select
                  value={settings.ctaButtonStyle}
                  onValueChange={(value) => updateSettings({ ctaButtonStyle: value })}
                >
                  <SelectTrigger className="focus-modern">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Header Appearance */}
        <Card className="glass-effect animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full mr-3"></div>
              Header Background Style
            </CardTitle>
          </CardHeader>
          <CardContent className="form-modern">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="headerBg">Background Effect</Label>
                <Select
                  value={settings.headerBackground}
                  onValueChange={(value) => updateSettings({ headerBackground: value })}
                >
                  <SelectTrigger className="focus-modern">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blur">Blur Effect</SelectItem>
                    <SelectItem value="solid">Solid Background</SelectItem>
                    <SelectItem value="transparent">Transparent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Background Opacity: {settings.headerOpacity}%</Label>
                <Slider
                  value={[settings.headerOpacity]}
                  onValueChange={(value) => updateSettings({ headerOpacity: value[0] })}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernDashboardLayout>
  );
};

export default HeaderCustomizationTab;

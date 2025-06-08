
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Menu, Save, RotateCcw, Palette } from "lucide-react";

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
    
    // Dispatch event to update header
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

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mr-3">
                <Menu className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Header Customization</CardTitle>
                <CardDescription>Customize your website header appearance and navigation</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>
              )}
              <Button variant="outline" onClick={resetToDefaults}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={saveSettings} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Logo Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Logo Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logoSize">Logo Size</Label>
                <Select
                  value={settings.logoSize}
                  onValueChange={(value) => updateSettings({ logoSize: value })}
                >
                  <SelectTrigger>
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
                    <SelectItem value="h-72">Giant (288px)</SelectItem>
                    <SelectItem value="h-80">Colossal (320px)</SelectItem>
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
                />
              </div>
            </div>
          </div>

          {/* Header Bar Color */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg font-semibold text-slate-900">Header Bar Color</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="headerBarColor">Color Preset</Label>
                <Select
                  value={settings.headerBarColor}
                  onValueChange={(value) => updateSettings({ headerBarColor: value })}
                >
                  <SelectTrigger>
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
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      value={settings.headerCustomColor}
                      onChange={(e) => updateSettings({ headerCustomColor: e.target.value })}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Spacing Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Element Spacing</h3>
            <div className="space-y-4">
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
            </div>
          </div>

          {/* Navigation Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Navigation Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="servicesDropdown">Services Dropdown</Label>
                <Switch
                  id="servicesDropdown"
                  checked={settings.servicesDropdownEnabled}
                  onCheckedChange={(checked) => updateSettings({ servicesDropdownEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="mobileMenu">Mobile Menu</Label>
                <Switch
                  id="mobileMenu"
                  checked={settings.mobileMenuEnabled}
                  onCheckedChange={(checked) => updateSettings({ mobileMenuEnabled: checked })}
                />
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Menu Items</h3>
            <div className="space-y-3">
              {settings.menuItems.map((item, index) => (
                <Card key={index} className="bg-white/50 border border-gray-200/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                      <div className="space-y-1">
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateMenuItem(index, { title: e.target.value })}
                          className="h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Link</Label>
                        <Input
                          value={item.href}
                          onChange={(e) => updateMenuItem(index, { href: e.target.value })}
                          className="h-8"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-2">
                          <Label className="text-xs">Enabled</Label>
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
          </div>

          {/* CTA Button Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">CTA Button Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaText">Button Text</Label>
                <Input
                  id="ctaText"
                  value={settings.ctaButtonText}
                  onChange={(e) => updateSettings({ ctaButtonText: e.target.value })}
                  placeholder="Get Free Audit"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaStyle">Button Style</Label>
                <Select
                  value={settings.ctaButtonStyle}
                  onValueChange={(value) => updateSettings({ ctaButtonStyle: value })}
                >
                  <SelectTrigger>
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
          </div>

          {/* Header Appearance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Header Background Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="headerBg">Background Effect</Label>
                <Select
                  value={settings.headerBackground}
                  onValueChange={(value) => updateSettings({ headerBackground: value })}
                >
                  <SelectTrigger>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeaderCustomizationTab;

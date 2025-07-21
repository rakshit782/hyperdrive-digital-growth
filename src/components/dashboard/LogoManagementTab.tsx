
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Image, Upload, Link, Eye, Save, RotateCcw, Loader2 } from "lucide-react";
import { useSupabaseLogos, type LogoSettings } from "@/hooks/useSupabaseLogos";

const LogoManagementTab = () => {
  const { logoSettings, loading, updateLogoSettings } = useSupabaseLogos();
  const [formSettings, setFormSettings] = useState<LogoSettings | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleDriveUrl, setGoogleDriveUrl] = useState("");

  useEffect(() => {
    if (logoSettings) {
      setFormSettings(logoSettings);
    }
  }, [logoSettings]);

  const updateSettings = (updates: Partial<LogoSettings>) => {
    if (!formSettings) return;
    
    setFormSettings(prev => ({ ...prev!, ...updates }));
    setHasChanges(true);
  };

  const convertGoogleDriveUrl = (url: string) => {
    const cleanUrl = url.trim();
    let fileId = '';
    
    let match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      fileId = match[1];
    } else {
      match = cleanUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        fileId = match[1];
      }
    }
    
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    
    return cleanUrl;
  };

  const handleGoogleDriveUpload = () => {
    if (googleDriveUrl.trim()) {
      const directUrl = convertGoogleDriveUrl(googleDriveUrl.trim());
      updateSettings({ logoUrl: directUrl });
      setGoogleDriveUrl("");
    }
  };

  const saveSettings = async () => {
    if (!formSettings) return;
    
    setIsSubmitting(true);
    try {
      await updateLogoSettings(formSettings);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving logo settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetToDefaults = () => {
    const defaultSettings: LogoSettings = {
      logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
      logoSize: "h-12",
      logoAlt: "AMZ AD SCOUT - The Growth Agency",
      logoPosition: "left",
      showInHeader: true,
      showInFooter: true,
      isActive: true
    };
    setFormSettings(defaultSettings);
    setHasChanges(true);
  };

  const sizeOptions = [
    { value: "h-4", label: "Tiny (16px)" },
    { value: "h-6", label: "Extra Small (24px)" },
    { value: "h-8", label: "Small (32px)" },
    { value: "h-10", label: "Medium (40px)" },
    { value: "h-12", label: "Large (48px)" },
    { value: "h-14", label: "Extra Large (56px)" },
    { value: "h-16", label: "XXL (64px)" },
    { value: "h-20", label: "XXXL (80px)" },
    { value: "h-24", label: "Huge (96px)" }
  ];

  if (loading || !formSettings) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span>Loading logo settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Image className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Logo Management</h2>
            <p className="text-gray-600">Customize your brand logo and display settings</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <span className="text-sm text-orange-600 font-medium animate-pulse">Unsaved changes</span>
          )}
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={saveSettings} disabled={isSubmitting} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Logo Settings</CardTitle>
              <CardDescription>Configure your brand logo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={formSettings.logoUrl}
                  onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200/30">
                <div className="flex items-center">
                  <Upload className="w-5 h-5 mr-3 text-blue-600" />
                  <Label className="text-sm font-semibold text-blue-700">Upload from Google Drive</Label>
                </div>
                <div className="space-y-3">
                  <Input
                    value={googleDriveUrl}
                    onChange={(e) => setGoogleDriveUrl(e.target.value)}
                    placeholder="Paste Google Drive sharing link here..."
                    className="bg-white/80 border-blue-200/50"
                  />
                  <Button 
                    onClick={handleGoogleDriveUpload}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={!googleDriveUrl.trim()}
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Use Google Drive Image
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="logoAlt">Logo Alt Text</Label>
                <Input
                  id="logoAlt"
                  value={formSettings.logoAlt}
                  onChange={(e) => updateSettings({ logoAlt: e.target.value })}
                  placeholder="Your company name"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="logoSize">Logo Size</Label>
                <Select
                  value={formSettings.logoSize}
                  onValueChange={(value) => updateSettings({ logoSize: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {sizeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showInHeader">Show in Header</Label>
                  <Switch
                    id="showInHeader"
                    checked={formSettings.showInHeader}
                    onCheckedChange={(checked) => updateSettings({ showInHeader: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showInFooter">Show in Footer</Label>
                  <Switch
                    id="showInFooter"
                    checked={formSettings.showInFooter}
                    onCheckedChange={(checked) => updateSettings({ showInFooter: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
            <CardHeader>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-3 text-green-600" />
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Live Preview</CardTitle>
                  <CardDescription>See how your logo appears</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Header Preview */}
              <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <img 
                    src={formSettings.logoUrl}
                    alt={formSettings.logoAlt}
                    className={`${formSettings.logoSize} w-auto object-contain`}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="text-white text-sm font-medium">Navigation Menu</div>
                </div>
              </div>

              {/* Footer Preview */}
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center justify-center">
                  <img 
                    src={formSettings.logoUrl}
                    alt={formSettings.logoAlt}
                    className={`${formSettings.logoSize} w-auto object-contain opacity-80`}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <p className="text-center text-slate-400 text-sm mt-4">Footer Context</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogoManagementTab;

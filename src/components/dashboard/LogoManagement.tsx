
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Eye, Upload, Link } from "lucide-react";

interface LogoSettings {
  logoUrl: string;
  logoSize: string;
  logoAlt: string;
}

const defaultLogo: LogoSettings = {
  logoUrl: "/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png",
  logoSize: "h-12",
  logoAlt: "AMZ AD SCOUT - The Growth Agency"
};

const LogoManagement = () => {
  const [logoSettings, setLogoSettings] = useState<LogoSettings>(defaultLogo);
  const [isSaved, setIsSaved] = useState(false);
  const [googleDriveUrl, setGoogleDriveUrl] = useState("");

  useEffect(() => {
    const savedLogo = localStorage.getItem('logoData');
    if (savedLogo) {
      try {
        const parsed = JSON.parse(savedLogo);
        // Properly merge with default settings to ensure all fields exist
        setLogoSettings({ 
          logoUrl: parsed.logoUrl || defaultLogo.logoUrl,
          logoSize: parsed.logoSize || defaultLogo.logoSize,
          logoAlt: parsed.logoAlt || defaultLogo.logoAlt
        });
      } catch (error) {
        console.error('Failed to parse logo settings:', error);
      }
    }
  }, []);

  const handleSave = () => {
    // Save complete logo settings object
    const completeSettings = {
      logoUrl: logoSettings.logoUrl,
      logoSize: logoSettings.logoSize,
      logoAlt: logoSettings.logoAlt
    };
    
    localStorage.setItem('logoData', JSON.stringify(completeSettings));
    
    // Dispatch event with complete settings
    window.dispatchEvent(new CustomEvent('logoUpdated', { detail: completeSettings }));
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    console.log('Logo settings saved:', completeSettings);
  };

  const handleInputChange = (field: keyof LogoSettings, value: string) => {
    setLogoSettings(prev => ({ ...prev, [field]: value }));
  };

  const convertGoogleDriveUrl = (url: string) => {
    // Convert Google Drive sharing URL to direct image URL
    const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url;
  };

  const handleGoogleDriveUpload = () => {
    if (googleDriveUrl.trim()) {
      const directUrl = convertGoogleDriveUrl(googleDriveUrl.trim());
      setLogoSettings(prev => ({ ...prev, logoUrl: directUrl }));
      setGoogleDriveUrl("");
    }
  };

  const sizeOptions = [
    { value: "h-6", label: "Extra Small (24px)" },
    { value: "h-8", label: "Small (32px)" },
    { value: "h-10", label: "Medium (40px)" },
    { value: "h-12", label: "Large (48px)" },
    { value: "h-14", label: "Extra Large (56px)" },
    { value: "h-16", label: "XXL (64px)" },
    { value: "h-20", label: "XXXL (80px)" },
    { value: "h-24", label: "Huge (96px)" },
    { value: "h-28", label: "Massive (112px)" },
    { value: "h-32", label: "Giant (128px)" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Settings Panel */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mr-3">
              <Image className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Logo Settings</CardTitle>
              <CardDescription>Customize your website logo and display settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="logoUrl" className="text-sm font-medium text-slate-700">Logo URL</Label>
            <Input
              id="logoUrl"
              value={logoSettings.logoUrl}
              onChange={(e) => handleInputChange('logoUrl', e.target.value)}
              placeholder="https://example.com/logo.png"
              className="bg-white/50 border-white/30 focus:border-indigo-500"
            />
          </div>

          {/* Google Drive Upload Section */}
          <div className="space-y-3 p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
            <div className="flex items-center">
              <Upload className="w-4 h-4 mr-2 text-blue-600" />
              <Label className="text-sm font-medium text-blue-700">Upload from Google Drive</Label>
            </div>
            <div className="space-y-2">
              <Input
                value={googleDriveUrl}
                onChange={(e) => setGoogleDriveUrl(e.target.value)}
                placeholder="Paste Google Drive sharing link here..."
                className="bg-white/70 border-blue-200/50 focus:border-blue-500"
              />
              <Button 
                onClick={handleGoogleDriveUpload}
                variant="outline"
                size="sm"
                className="w-full bg-blue-100/50 border-blue-200 text-blue-700 hover:bg-blue-200/50"
                disabled={!googleDriveUrl.trim()}
              >
                <Link className="w-4 h-4 mr-2" />
                Use Google Drive Image
              </Button>
            </div>
            <p className="text-xs text-blue-600/70">
              Share your image from Google Drive and paste the link above. We'll convert it to a direct image URL.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logoAlt" className="text-sm font-medium text-slate-700">Logo Alt Text</Label>
            <Input
              id="logoAlt"
              value={logoSettings.logoAlt}
              onChange={(e) => handleInputChange('logoAlt', e.target.value)}
              placeholder="Your company name"
              className="bg-white/50 border-white/30 focus:border-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logoSize" className="text-sm font-medium text-slate-700">Logo Size</Label>
            <select
              id="logoSize"
              value={logoSettings.logoSize}
              onChange={(e) => handleInputChange('logoSize', e.target.value)}
              className="w-full h-10 px-3 py-2 bg-white/50 border border-white/30 rounded-md text-sm focus:border-indigo-500 focus:outline-none"
            >
              {sizeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button 
            onClick={handleSave} 
            className={`w-full transition-all duration-300 ${
              isSaved 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            } shadow-lg`}
          >
            {isSaved ? "✓ Saved!" : "Save Logo Settings"}
          </Button>
        </CardContent>
      </Card>

      {/* Live Preview Panel */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mr-3">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Live Preview</CardTitle>
              <CardDescription>See how your logo will appear</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Header Preview */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <img 
                  src={logoSettings.logoUrl}
                  alt={logoSettings.logoAlt}
                  className={`${logoSettings.logoSize} w-auto object-contain`}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="text-white text-sm">Navigation Menu</div>
              </div>
            </div>

            {/* Footer Preview */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-center">
                <img 
                  src={logoSettings.logoUrl}
                  alt={logoSettings.logoAlt}
                  className={`${logoSettings.logoSize} w-auto object-contain opacity-80`}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <p className="text-center text-slate-400 text-sm mt-4">Footer Context</p>
            </div>

            {/* Size Comparison */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-slate-700 mb-4">Size Comparison</h4>
              <div className="grid grid-cols-5 gap-4">
                {sizeOptions.map((size, index) => (
                  <div key={size.value} className="text-center">
                    <img 
                      src={logoSettings.logoUrl}
                      alt={logoSettings.logoAlt}
                      className={`${size.value} w-auto object-contain mx-auto ${
                        logoSettings.logoSize === size.value ? 'ring-2 ring-indigo-500 rounded' : 'opacity-50'
                      }`}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    <p className="text-xs text-slate-500 mt-1">{size.label.split(' ')[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoManagement;

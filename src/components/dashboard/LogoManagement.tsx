
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Eye, Upload, Link } from "lucide-react";
import ModernDashboardLayout from "./ModernDashboardLayout";

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
        setLogoSettings({ 
          logoUrl: parsed.logoUrl || defaultLogo.logoUrl,
          logoSize: parsed.logoSize || defaultLogo.logoSize,
          logoAlt: parsed.logoAlt || defaultLogo.logoAlt
        });
        console.log('LogoManagement: Loaded saved settings:', parsed);
      } catch (error) {
        console.error('Failed to parse logo settings:', error);
      }
    }
  }, []);

  const handleSave = () => {
    const completeSettings = {
      logoUrl: logoSettings.logoUrl,
      logoSize: logoSettings.logoSize,
      logoAlt: logoSettings.logoAlt
    };
    
    localStorage.setItem('logoData', JSON.stringify(completeSettings));
    
    // Dispatch custom event with complete settings
    const event = new CustomEvent('logoUpdated', { detail: completeSettings });
    window.dispatchEvent(event);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    console.log('LogoManagement: Settings saved and event dispatched:', completeSettings);
  };

  const handleInputChange = (field: keyof LogoSettings, value: string) => {
    setLogoSettings(prev => ({ ...prev, [field]: value }));
  };

  const convertGoogleDriveUrl = (url: string) => {
    console.log('Converting Google Drive URL:', url);
    
    const cleanUrl = url.trim();
    let fileId = '';
    
    let match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      fileId = match[1];
      console.log('Found file ID from /file/d/ format:', fileId);
    } else {
      match = cleanUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        fileId = match[1];
        console.log('Found file ID from ?id= format:', fileId);
      } else {
        match = cleanUrl.match(/\/uc\?.*id=([a-zA-Z0-9-_]+)/);
        if (match) {
          fileId = match[1];
          console.log('Found file ID from /uc?id= format:', fileId);
        }
      }
    }
    
    if (fileId) {
      const directUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
      console.log('Converted to direct URL:', directUrl);
      return directUrl;
    }
    
    console.log('Could not extract file ID, using original URL');
    return cleanUrl;
  };

  const handleGoogleDriveUpload = () => {
    if (googleDriveUrl.trim()) {
      const directUrl = convertGoogleDriveUrl(googleDriveUrl.trim());
      console.log('Setting logo URL to:', directUrl);
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', e.currentTarget.src);
    console.log('Trying fallback URL conversion...');
    
    const currentUrl = e.currentTarget.src;
    if (currentUrl.includes('thumbnail')) {
      const fileIdMatch = currentUrl.match(/id=([a-zA-Z0-9-_]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        const fallbackUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        console.log('Trying fallback URL:', fallbackUrl);
        e.currentTarget.src = fallbackUrl;
        return;
      }
    }
    
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <ModernDashboardLayout 
      title="Logo Management" 
      description="Customize your website logo and display settings"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <Card className="glass-effect shadow-modern animate-fade-in">
          <CardHeader>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-4 animate-pulse-glow">
                <Image className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Logo Settings</CardTitle>
                <CardDescription className="text-slate-600">Configure your brand logo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 form-modern">
            <div className="space-y-3">
              <Label htmlFor="logoUrl" className="text-sm font-semibold text-slate-700">Logo URL</Label>
              <Input
                id="logoUrl"
                value={logoSettings.logoUrl}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="focus-modern"
              />
            </div>

            {/* Google Drive Upload Section */}
            <div className="space-y-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/30">
              <div className="flex items-center">
                <Upload className="w-5 h-5 mr-3 text-blue-600" />
                <Label className="text-sm font-semibold text-blue-700">Upload from Google Drive</Label>
              </div>
              <div className="space-y-3">
                <Input
                  value={googleDriveUrl}
                  onChange={(e) => setGoogleDriveUrl(e.target.value)}
                  placeholder="Paste Google Drive sharing link here..."
                  className="bg-white/80 border-blue-200/50 focus:border-blue-500"
                />
                <Button 
                  onClick={handleGoogleDriveUpload}
                  variant="outline"
                  size="sm"
                  className="w-full btn-gradient-hover"
                  disabled={!googleDriveUrl.trim()}
                >
                  <Link className="w-4 h-4 mr-2" />
                  Use Google Drive Image
                </Button>
              </div>
              <div className="text-xs text-blue-600/80 space-y-1">
                <p>Share your image from Google Drive and paste the link above.</p>
                <p className="font-medium">Supported formats:</p>
                <p>• https://drive.google.com/file/d/FILE_ID/view?usp=sharing</p>
                <p>• https://drive.google.com/open?id=FILE_ID</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="logoAlt" className="text-sm font-semibold text-slate-700">Logo Alt Text</Label>
              <Input
                id="logoAlt"
                value={logoSettings.logoAlt}
                onChange={(e) => handleInputChange('logoAlt', e.target.value)}
                placeholder="Your company name"
                className="focus-modern"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="logoSize" className="text-sm font-semibold text-slate-700">Logo Size</Label>
              <select
                id="logoSize"
                value={logoSettings.logoSize}
                onChange={(e) => handleInputChange('logoSize', e.target.value)}
                className="w-full h-11 px-4 py-2 bg-white/80 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
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
                  : "btn-primary"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save Logo Settings"}
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview Panel */}
        <Card className="glass-effect shadow-modern animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Live Preview</CardTitle>
                <CardDescription className="text-slate-600">See how your logo appears</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Header Preview */}
              <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl p-6 animate-scale-in">
                <div className="flex items-center justify-between">
                  <img 
                    src={logoSettings.logoUrl}
                    alt={logoSettings.logoAlt}
                    className={`${logoSettings.logoSize} w-auto object-contain`}
                    onError={handleImageError}
                    onLoad={() => console.log('Preview logo loaded successfully:', logoSettings.logoUrl)}
                  />
                  <div className="text-white text-sm font-medium">Navigation Menu</div>
                </div>
              </div>

              {/* Footer Preview */}
              <div className="bg-slate-800 rounded-xl p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-center">
                  <img 
                    src={logoSettings.logoUrl}
                    alt={logoSettings.logoAlt}
                    className={`${logoSettings.logoSize} w-auto object-contain opacity-80`}
                    onError={handleImageError}
                  />
                </div>
                <p className="text-center text-slate-400 text-sm mt-4">Footer Context</p>
              </div>

              {/* Size Comparison */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-semibold text-slate-700 mb-4">Size Comparison</h4>
                <div className="grid grid-cols-5 gap-4">
                  {sizeOptions.slice(0, 5).map((size) => (
                    <div key={size.value} className="text-center">
                      <img 
                        src={logoSettings.logoUrl}
                        alt={logoSettings.logoAlt}
                        className={`${size.value} w-auto object-contain mx-auto transition-all duration-300 ${
                          logoSettings.logoSize === size.value 
                            ? 'ring-2 ring-indigo-500 rounded p-1 animate-pulse-glow' 
                            : 'opacity-50 hover:opacity-75'
                        }`}
                        onError={handleImageError}
                      />
                      <p className="text-xs text-slate-500 mt-2">{size.label.split(' ')[0]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernDashboardLayout>
  );
};

export default LogoManagement;

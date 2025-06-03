
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image } from "lucide-react";

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

  useEffect(() => {
    const savedLogo = localStorage.getItem('logoData');
    if (savedLogo) {
      try {
        const parsed = JSON.parse(savedLogo);
        setLogoSettings({ ...defaultLogo, ...parsed });
      } catch (error) {
        console.error('Failed to parse logo settings:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('logoData', JSON.stringify(logoSettings));
    window.dispatchEvent(new CustomEvent('logoUpdated', { detail: logoSettings }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleInputChange = (field: keyof LogoSettings, value: string) => {
    setLogoSettings(prev => ({ ...prev, [field]: value }));
  };

  const sizeOptions = [
    { value: "h-8", label: "Small (32px)" },
    { value: "h-10", label: "Medium (40px)" },
    { value: "h-12", label: "Large (48px)" },
    { value: "h-14", label: "Extra Large (56px)" },
    { value: "h-16", label: "XXL (64px)" }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Image className="w-5 h-5 mr-2 text-blue-600" />
          <CardTitle>Logo Management</CardTitle>
        </div>
        <CardDescription>Customize your website logo and display settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="logoUrl">Logo URL</Label>
          <Input
            id="logoUrl"
            value={logoSettings.logoUrl}
            onChange={(e) => handleInputChange('logoUrl', e.target.value)}
            placeholder="https://example.com/logo.png"
          />
        </div>
        
        <div>
          <Label htmlFor="logoAlt">Logo Alt Text</Label>
          <Input
            id="logoAlt"
            value={logoSettings.logoAlt}
            onChange={(e) => handleInputChange('logoAlt', e.target.value)}
            placeholder="Your company name"
          />
        </div>
        
        <div>
          <Label htmlFor="logoSize">Logo Size</Label>
          <select
            id="logoSize"
            value={logoSettings.logoSize}
            onChange={(e) => handleInputChange('logoSize', e.target.value)}
            className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            {sizeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <Label>Preview</Label>
          <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-center">
            <img 
              src={logoSettings.logoUrl}
              alt={logoSettings.logoAlt}
              className={`${logoSettings.logoSize} w-auto object-contain`}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        </div>

        <Button onClick={handleSave} className={`w-full ${isSaved ? "bg-green-600" : ""}`}>
          {isSaved ? "Saved!" : "Save Logo Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogoManagement;

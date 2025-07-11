
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Trash2, Plus, Users, Upload, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PartnerImage {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}

interface PartnerSettings {
  logoSize: number;
  sectionHeight: number;
}

const PartnersManagementTab = () => {
  const { toast } = useToast();
  const [partnerImages, setPartnerImages] = useState<PartnerImage[]>([]);
  const [settings, setSettings] = useState<PartnerSettings>({
    logoSize: 16,
    sectionHeight: 6
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedPartners = localStorage.getItem('partnerImages');
    if (savedPartners) {
      try {
        const parsed = JSON.parse(savedPartners);
        setPartnerImages(parsed);
      } catch (error) {
        console.error('Failed to parse partner images:', error);
      }
    }

    const savedSettings = localStorage.getItem('partnerSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Failed to parse partner settings:', error);
      }
    }
  }, []);

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

  const handleGoogleDriveUpload = (id: string, googleDriveUrl: string) => {
    if (googleDriveUrl.trim()) {
      const directUrl = convertGoogleDriveUrl(googleDriveUrl.trim());
      updatePartnerImage(id, 'imageUrl', directUrl);
      toast({
        title: "Success",
        description: "Google Drive image URL converted successfully!",
      });
    }
  };

  const handleSave = () => {
    localStorage.setItem('partnerImages', JSON.stringify(partnerImages));
    localStorage.setItem('partnerSettings', JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('partnerImagesUpdated'));
    window.dispatchEvent(new CustomEvent('partnerSettingsUpdated', { detail: settings }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    toast({
      title: "Success",
      description: "Partner settings updated successfully!",
    });
  };

  const addPartnerImage = () => {
    const newPartner: PartnerImage = {
      id: `partner-${Date.now()}`,
      name: "New Partner",
      imageUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
      isActive: true
    };
    setPartnerImages(prev => [...prev, newPartner]);
  };

  const removePartnerImage = (id: string) => {
    setPartnerImages(prev => prev.filter(partner => partner.id !== id));
  };

  const updatePartnerImage = (id: string, field: keyof PartnerImage, value: string | boolean) => {
    setPartnerImages(prev => prev.map(partner => 
      partner.id === id ? { ...partner, [field]: value } : partner
    ));
  };

  const updateSettings = (updates: Partial<PartnerSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-slate-500 to-slate-700 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Authorized Partners</h2>
            <p className="text-gray-600">Manage authorized partner logos (shown inverted on dark background)</p>
          </div>
        </div>
        <Button onClick={addPartnerImage} className="bg-gradient-to-r from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Partner Logo
        </Button>
      </div>

      {/* Size Controls */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Size Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Logo Size: {settings.logoSize * 4}px</Label>
            <Slider
              value={[settings.logoSize]}
              onValueChange={(value) => updateSettings({ logoSize: value[0] })}
              max={32}
              min={8}
              step={2}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Height: {settings.sectionHeight * 0.25}rem</Label>
            <Slider
              value={[settings.sectionHeight]}
              onValueChange={(value) => updateSettings({ sectionHeight: value[0] })}
              max={12}
              min={4}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {partnerImages.map((partner, index) => (
          <Card key={partner.id} className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Partner {index + 1}</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm text-gray-600">Active:</Label>
                    <input
                      type="checkbox"
                      checked={partner.isActive}
                      onChange={(e) => updatePartnerImage(partner.id, 'isActive', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    onClick={() => removePartnerImage(partner.id)} 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Partner Name</Label>
                  <Input
                    value={partner.name}
                    onChange={(e) => updatePartnerImage(partner.id, 'name', e.target.value)}
                    placeholder="Partner Name"
                    className="bg-white/70 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Logo URL</Label>
                  <Input
                    value={partner.imageUrl}
                    onChange={(e) => updatePartnerImage(partner.id, 'imageUrl', e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="bg-white/70 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Google Drive Upload Section */}
              <div className="mt-4 space-y-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-200/30">
                <div className="flex items-center">
                  <Upload className="w-5 h-5 mr-3 text-slate-600" />
                  <Label className="text-sm font-semibold text-slate-700">Upload from Google Drive</Label>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Paste Google Drive sharing link here..."
                    className="bg-white/80 border-slate-200/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleGoogleDriveUpload(partner.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      const input = e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement;
                      if (input?.value) {
                        handleGoogleDriveUpload(partner.id, input.value);
                        input.value = '';
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Use Google Drive Image
                  </Button>
                </div>
              </div>
              
              {partner.imageUrl && (
                <div className="mt-4 flex justify-center">
                  <div className="p-3 bg-slate-800 rounded-lg border border-gray-200 shadow-sm">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="h-12 w-auto object-contain filter brightness-0 invert"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkg4MFY0OEg0MFYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        onClick={handleSave} 
        className={`w-full py-3 transition-all duration-300 ${
          isSaved 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-gradient-to-r from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800"
        } shadow-lg`}
      >
        {isSaved ? "✓ Saved Successfully!" : "Save Partner Settings"}
      </Button>
    </div>
  );
};

export default PartnersManagementTab;

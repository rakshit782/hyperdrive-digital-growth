
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Trash2, Plus, Users, Upload, Link, Save, Loader2 } from "lucide-react";
import { useSupabaseClientele, type ClienteleLogo, type ClienteleSettings } from "@/hooks/useSupabaseClientele";

const ClienteleManagementTab = () => {
  const { clienteleLogos, settings, loading, updateClienteleLogo, updateSettings } = useSupabaseClientele();
  const [localLogos, setLocalLogos] = useState<ClienteleLogo[]>([]);
  const [localSettings, setLocalSettings] = useState<ClienteleSettings>(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLocalLogos(clienteleLogos);
  }, [clienteleLogos]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

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

  const handleGoogleDriveUpload = (id: string, inputElement: HTMLInputElement) => {
    const googleDriveUrl = inputElement.value.trim();
    if (googleDriveUrl) {
      const directUrl = convertGoogleDriveUrl(googleDriveUrl);
      updateLocalLogo(id, 'image_url', directUrl);
      inputElement.value = '';
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Save all logo changes
      for (const logo of localLogos) {
        await updateClienteleLogo(logo);
      }
      
      // Save settings
      await updateSettings(localSettings);
      
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving clientele data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addClienteleLogo = () => {
    const newLogo: ClienteleLogo = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: "New Client",
      image_url: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
      is_active: true,
      sort_order: localLogos.length
    };
    setLocalLogos(prev => [...prev, newLogo]);
    setHasChanges(true);
  };

  const removeClienteleLogo = (id: string) => {
    setLocalLogos(prev => prev.filter(logo => logo.id !== id));
    setHasChanges(true);
  };

  const updateLocalLogo = (id: string, field: keyof ClienteleLogo, value: string | boolean | number) => {
    setLocalLogos(prev => prev.map(logo => 
      logo.id === id ? { ...logo, [field]: value } : logo
    ));
    setHasChanges(true);
  };

  const updateLocalSettings = (updates: Partial<ClienteleSettings>) => {
    setLocalSettings(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span>Loading clientele data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Clientele Logos</h2>
            <p className="text-gray-600">Manage the client logos displayed in the carousel (shown in color)</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <span className="text-sm text-orange-600 font-medium animate-pulse">Unsaved changes</span>
          )}
          <Button onClick={addClienteleLogo} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Client Logo
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
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

      {/* Size Controls */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Size Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Logo Size: {localSettings.logoSize * 4}px</Label>
            <Slider
              value={[localSettings.logoSize]}
              onValueChange={(value) => updateLocalSettings({ logoSize: value[0] })}
              max={64}
              min={8}
              step={2}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Section Height: {localSettings.sectionHeight * 0.25}rem</Label>
            <Slider
              value={[localSettings.sectionHeight]}
              onValueChange={(value) => updateLocalSettings({ sectionHeight: value[0] })}
              max={12}
              min={4}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {localLogos.map((logo, index) => (
          <Card key={logo.id} className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Client {index + 1}</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm text-gray-600">Active:</Label>
                    <input
                      type="checkbox"
                      checked={logo.is_active}
                      onChange={(e) => updateLocalLogo(logo.id, 'is_active', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    onClick={() => removeClienteleLogo(logo.id)} 
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
                  <Label className="text-sm font-medium text-gray-700">Client Name</Label>
                  <Input
                    value={logo.name}
                    onChange={(e) => updateLocalLogo(logo.id, 'name', e.target.value)}
                    placeholder="Client Name"
                    className="bg-white/70 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Logo URL</Label>
                  <Input
                    value={logo.image_url}
                    onChange={(e) => updateLocalLogo(logo.id, 'image_url', e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="bg-white/70 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Google Drive Upload Section */}
              <div className="mt-4 space-y-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200/30">
                <div className="flex items-center">
                  <Upload className="w-5 h-5 mr-3 text-blue-600" />
                  <Label className="text-sm font-semibold text-blue-700">Upload from Google Drive</Label>
                </div>
                <div className="space-y-3">
                  <Input
                    id={`gdrive-input-${logo.id}`}
                    placeholder="Paste Google Drive sharing link here..."
                    className="bg-white/80 border-blue-200/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleGoogleDriveUpload(logo.id, e.currentTarget);
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      const input = document.getElementById(`gdrive-input-${logo.id}`) as HTMLInputElement;
                      if (input) {
                        handleGoogleDriveUpload(logo.id, input);
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
              
              {logo.image_url && (
                <div className="mt-4 flex justify-center">
                  <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <img
                      src={logo.image_url}
                      alt={logo.name}
                      className="h-12 w-auto object-contain"
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
    </div>
  );
};

export default ClienteleManagementTab;

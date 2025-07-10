import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Users, Upload, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClienteleLogo {
  id: string;
  name: string;
  imageUrl: string;
  isActive: boolean;
}

const ClienteleManagementTab = () => {
  const { toast } = useToast();
  const [clienteleLogos, setClienteleLogos] = useState<ClienteleLogo[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const getDefaultClientele = (): ClienteleLogo[] => [
    {
      id: "client-1",
      name: "TechCorp",
      imageUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-2", 
      name: "InnovateLabs",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-3",
      name: "GlobalSolutions",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-4",
      name: "FutureTech",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-5",
      name: "StartupHub",
      imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=100&fit=crop&crop=center",
      isActive: true
    },
    {
      id: "client-6",
      name: "BusinessPro",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop&crop=center",
      isActive: true
    }
  ];

  useEffect(() => {
    const savedClientele = localStorage.getItem('clienteleLogos');
    if (savedClientele) {
      try {
        const parsed = JSON.parse(savedClientele);
        setClienteleLogos(parsed);
      } catch (error) {
        console.error('Failed to parse clientele logos:', error);
        const defaultLogos = getDefaultClientele();
        setClienteleLogos(defaultLogos);
        localStorage.setItem('clienteleLogos', JSON.stringify(defaultLogos));
      }
    } else {
      const defaultLogos = getDefaultClientele();
      setClienteleLogos(defaultLogos);
      localStorage.setItem('clienteleLogos', JSON.stringify(defaultLogos));
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
    console.log('Converted URL:', directUrl);
    updateClienteleLogo(id, 'imageUrl', directUrl);
    toast({
      title: "Success",
      description: "Google Drive image URL converted successfully!",
    });
  }
};

  const handleSave = () => {
    localStorage.setItem('clienteleLogos', JSON.stringify(clienteleLogos));
    window.dispatchEvent(new CustomEvent('clienteleLogosUpdated'));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    toast({
      title: "Success",
      description: "Clientele logos updated successfully!",
    });
  };

  const addClienteleLogo = () => {
    const newLogo: ClienteleLogo = {
      id: `client-${Date.now()}`,
      name: "New Client",
      imageUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center",
      isActive: true
    };
    setClienteleLogos(prev => [...prev, newLogo]);
  };

  const removeClienteleLogo = (id: string) => {
    setClienteleLogos(prev => prev.filter(logo => logo.id !== id));
  };

  const updateClienteleLogo = (id: string, field: keyof ClienteleLogo, value: string | boolean) => {
  setClienteleLogos(prev => prev.map(logo => 
    logo.id === id ? { ...logo, [field]: value } : logo
  ));
};

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
        <Button onClick={addClienteleLogo} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Client Logo
        </Button>
      </div>

      <div className="grid gap-4">
        {clienteleLogos.map((logo, index) => (
          <Card key={logo.id} className="bg-white/80 backdrop-blur-sm border-white/30 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Client {index + 1}</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Label className="text-sm text-gray-600">Active:</Label>
                    <input
                      type="checkbox"
                      checked={logo.isActive}
                      onChange={(e) => updateClienteleLogo(logo.id, 'isActive', e.target.checked)}
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
                    onChange={(e) => updateClienteleLogo(logo.id, 'name', e.target.value)}
                    placeholder="Client Name"
                    className="bg-white/70 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Logo URL</Label>
                  <Input
                    value={logo.imageUrl}
                    onChange={(e) => updateClienteleLogo(logo.id, 'imageUrl', e.target.value)}
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
                    placeholder="Paste Google Drive sharing link here..."
                    className="bg-white/80 border-blue-200/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleGoogleDriveUpload(logo.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      const input = document.querySelector(`input[placeholder="Paste Google Drive sharing link here..."]`) as HTMLInputElement;
                      if (input?.value) {
                        handleGoogleDriveUpload(logo.id, input.value);
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
              
              {logo.imageUrl && (
                <div className="mt-4 flex justify-center">
                  <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <img
                      src={logo.imageUrl}
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

      <Button 
        onClick={handleSave} 
        className={`w-full py-3 transition-all duration-300 ${
          isSaved 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        } shadow-lg`}
      >
        {isSaved ? "✓ Saved Successfully!" : "Save Clientele Logos"}
      </Button>
    </div>
  );
};

export default ClienteleManagementTab;

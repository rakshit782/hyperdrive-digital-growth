
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Upload, Users } from "lucide-react";
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
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Clientele Logos</CardTitle>
              <CardDescription>Manage the client logos displayed in the carousel</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Client Logos</h3>
              <Button onClick={addClienteleLogo} variant="outline" className="bg-white/50">
                <Plus className="w-4 h-4 mr-2" />
                Add Client Logo
              </Button>
            </div>

            <div className="grid gap-4">
              {clienteleLogos.map((logo, index) => (
                <div key={logo.id} className="border border-white/30 rounded-lg p-4 space-y-4 bg-white/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-slate-700">Client {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-slate-600">Active:</Label>
                      <input
                        type="checkbox"
                        checked={logo.isActive}
                        onChange={(e) => updateClienteleLogo(logo.id, 'isActive', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Button 
                        onClick={() => removeClienteleLogo(logo.id)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-white/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Client Name</Label>
                      <Input
                        value={logo.name}
                        onChange={(e) => updateClienteleLogo(logo.id, 'name', e.target.value)}
                        placeholder="Client Name"
                        className="bg-white/50 border-white/30"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Logo URL</Label>
                      <Input
                        value={logo.imageUrl}
                        onChange={(e) => updateClienteleLogo(logo.id, 'imageUrl', e.target.value)}
                        placeholder="https://example.com/logo.png"
                        className="bg-white/50 border-white/30"
                      />
                    </div>
                  </div>
                  
                  {logo.imageUrl && (
                    <div className="flex justify-center">
                      <img
                        src={logo.imageUrl}
                        alt={logo.name}
                        className="h-16 w-auto object-contain border border-gray-200 rounded p-2 bg-white"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAzMkg4MFY0OEg0MFYzMloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button 
              onClick={handleSave} 
              className={`w-full transition-all duration-300 ${
                isSaved 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save Clientele Logos"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClienteleManagementTab;

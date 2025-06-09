
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Facebook, Save, TestTube, Eye, BarChart3 } from "lucide-react";
import { facebookPixel } from "@/utils/facebookPixel";
import { useToast } from "@/hooks/use-toast";

interface FacebookPixelConfig {
  pixelId: string;
  isActive: boolean;
}

const FacebookPixelTab = () => {
  const [config, setConfig] = useState<FacebookPixelConfig>({
    pixelId: '',
    isActive: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing configuration
    const savedConfig = localStorage.getItem('facebookPixelConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load Facebook Pixel config:', error);
      }
    }
  }, []);

  const saveConfiguration = () => {
    setIsLoading(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('facebookPixelConfig', JSON.stringify(config));
      
      // Initialize pixel if active
      if (config.isActive && config.pixelId) {
        facebookPixel.initialize(config.pixelId);
        
        // Dispatch event to notify other components
        const event = new CustomEvent('facebookPixelConfigUpdated', { detail: config });
        window.dispatchEvent(event);
      }
      
      toast({
        title: "Facebook Pixel Configuration Saved",
        description: config.isActive ? "Facebook Pixel is now active and tracking events." : "Facebook Pixel configuration saved but is inactive.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save Facebook Pixel configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testPixel = () => {
    if (!config.pixelId) {
      toast({
        title: "No Pixel ID",
        description: "Please enter a Facebook Pixel ID first.",
        variant: "destructive",
      });
      return;
    }

    if (!config.isActive) {
      toast({
        title: "Pixel Inactive",
        description: "Please activate the pixel first.",
        variant: "destructive",
      });
      return;
    }

    // Send test event
    facebookPixel.trackCustomEvent('TestEvent', {
      test_event_code: 'TEST12345',
      source: 'dashboard'
    });

    toast({
      title: "Test Event Sent",
      description: "A test event has been sent to Facebook Pixel. Check your Facebook Events Manager.",
    });
  };

  const commonEvents = [
    { name: 'PageView', description: 'Track page views' },
    { name: 'Lead', description: 'Track lead generation' },
    { name: 'Contact', description: 'Track contact form submissions' },
    { name: 'ViewContent', description: 'Track content views' },
    { name: 'Purchase', description: 'Track purchases/conversions' },
    { name: 'CompleteRegistration', description: 'Track user registrations' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg mr-3">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Facebook Pixel Configuration</CardTitle>
                <CardDescription>Set up Facebook Pixel tracking for your website</CardDescription>
              </div>
            </div>
            <Badge variant={config.isActive ? "default" : "secondary"}>
              {config.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pixelId">Facebook Pixel ID</Label>
              <Input
                id="pixelId"
                placeholder="Enter your Facebook Pixel ID (e.g., 1234567890123456)"
                value={config.pixelId}
                onChange={(e) => setConfig({ ...config, pixelId: e.target.value })}
              />
              <p className="text-sm text-gray-500">
                Find your Pixel ID in Facebook Events Manager → Data Sources → Pixels
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="pixelActive"
                checked={config.isActive}
                onCheckedChange={(checked) => setConfig({ ...config, isActive: checked })}
              />
              <Label htmlFor="pixelActive">Activate Facebook Pixel</Label>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={saveConfiguration} 
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Configuration'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={testPixel}
              disabled={!config.isActive || !config.pixelId}
            >
              <TestTube className="w-4 h-4 mr-2" />
              Send Test Event
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Event Tracking Information */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            <CardTitle>Standard Facebook Events</CardTitle>
          </div>
          <CardDescription>
            These events will be automatically tracked when users interact with your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonEvents.map((event, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.name}</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
                <Badge variant="outline" className="ml-2">
                  Standard
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-green-600" />
            <CardTitle>Setup Instructions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Get your Facebook Pixel ID</h4>
                <p className="text-sm text-gray-600">Go to Facebook Events Manager → Data Sources → Pixels and copy your Pixel ID</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Enter Pixel ID and Activate</h4>
                <p className="text-sm text-gray-600">Paste your Pixel ID above and toggle the activation switch</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Test Your Setup</h4>
                <p className="text-sm text-gray-600">Use the "Send Test Event" button and verify events in Facebook Events Manager</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacebookPixelTab;

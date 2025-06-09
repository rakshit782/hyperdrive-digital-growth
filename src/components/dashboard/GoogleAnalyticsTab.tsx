
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, BarChart3, TestTube, ExternalLink } from "lucide-react";
import { googleAnalyticsManager, GoogleAnalyticsConfig } from "@/utils/googleAnalyticsManager";
import { useToast } from "@/hooks/use-toast";

const GoogleAnalyticsTab = () => {
  const [config, setConfig] = useState<GoogleAnalyticsConfig>({
    measurementId: '',
    isActive: false,
    enableEnhancedMeasurement: true,
    enableConversionTracking: true,
    customEvents: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = localStorage.getItem('googleAnalyticsConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load Google Analytics config:', error);
      }
    }
  }, []);

  const saveConfiguration = () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('googleAnalyticsConfig', JSON.stringify(config));
      
      if (config.isActive && config.measurementId) {
        googleAnalyticsManager.initialize(config);
      }
      
      toast({
        title: "Google Analytics Configuration Saved",
        description: config.isActive ? "Google Analytics is now tracking." : "Google Analytics configuration saved but is inactive.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save Google Analytics configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testTracking = () => {
    if (!config.measurementId || !config.isActive) {
      toast({
        title: "Configuration Required",
        description: "Please configure and activate Google Analytics first.",
        variant: "destructive",
      });
      return;
    }

    googleAnalyticsManager.trackEvent('test_event', {
      event_category: 'dashboard',
      event_label: 'manual_test',
      value: 1
    });

    toast({
      title: "Test Event Sent",
      description: "A test event has been sent to Google Analytics.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-600 to-green-700 rounded-lg mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Google Analytics</CardTitle>
                <CardDescription>Configure Google Analytics 4 for website tracking</CardDescription>
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
              <Label htmlFor="measurementId">Measurement ID</Label>
              <Input
                id="measurementId"
                placeholder="G-XXXXXXXXXX"
                value={config.measurementId}
                onChange={(e) => setConfig({ ...config, measurementId: e.target.value })}
              />
              <p className="text-sm text-gray-500">
                Find your Measurement ID in Google Analytics → Admin → Data Streams
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="gaActive"
                  checked={config.isActive}
                  onCheckedChange={(checked) => setConfig({ ...config, isActive: checked })}
                />
                <Label htmlFor="gaActive">Activate Google Analytics</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enhancedMeasurement"
                  checked={config.enableEnhancedMeasurement}
                  onCheckedChange={(checked) => setConfig({ ...config, enableEnhancedMeasurement: checked })}
                />
                <Label htmlFor="enhancedMeasurement">Enhanced Measurement</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="conversionTracking"
                  checked={config.enableConversionTracking}
                  onCheckedChange={(checked) => setConfig({ ...config, enableConversionTracking: checked })}
                />
                <Label htmlFor="conversionTracking">Conversion Tracking</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="customEvents"
                  checked={config.customEvents}
                  onCheckedChange={(checked) => setConfig({ ...config, customEvents: checked })}
                />
                <Label htmlFor="customEvents">Custom Events</Label>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={saveConfiguration} 
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Configuration'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={testTracking}
              disabled={!config.isActive || !config.measurementId}
            >
              <TestTube className="w-4 h-4 mr-2" />
              Send Test Event
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-green-600" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Create Google Analytics Account</h4>
                <p className="text-sm text-gray-600">Go to analytics.google.com and set up GA4</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Get Measurement ID</h4>
                <p className="text-sm text-gray-600">Copy the G-XXXXXXXXXX ID from Data Streams</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Configure and Test</h4>
                <p className="text-sm text-gray-600">Enter your ID and use the test button to verify setup</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAnalyticsTab;

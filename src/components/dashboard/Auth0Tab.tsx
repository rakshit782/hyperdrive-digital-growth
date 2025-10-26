
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Lock, ExternalLink, TestTube } from "lucide-react";
import { auth0ConfigManager, Auth0Config } from "@/utils/auth0Config";
import { useToast } from "@/hooks/use-toast";

const Auth0Tab = () => {
  const [config, setConfig] = useState<Auth0Config>({
    domain: '',
    clientId: '',
    redirectUri: window.location.origin,
    audience: '',
    scope: 'openid profile email',
    isActive: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initConfig = async () => {
      await auth0ConfigManager.initialize();
      const savedConfig = auth0ConfigManager.getConfig();
      if (savedConfig) {
        setConfig(savedConfig);
      }
    };
    initConfig();
  }, []);

  const saveConfiguration = async () => {
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (config.isActive && (!config.domain || !config.clientId)) {
        toast({
          title: "Validation Error",
          description: "Domain and Client ID are required when Auth0 is active.",
          variant: "destructive",
        });
        return;
      }

      await auth0ConfigManager.saveConfig(config);
      
      toast({
        title: "Auth0 Configuration Saved",
        description: config.isActive ? "Auth0 is now active and ready to use." : "Auth0 configuration saved but is inactive.",
      });

      // Trigger a page reload if Auth0 is activated to initialize the provider
      if (config.isActive) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save Auth0 configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    
    try {
      if (!config.domain || !config.clientId) {
        toast({
          title: "Test Failed",
          description: "Please enter domain and client ID before testing.",
          variant: "destructive",
        });
        return;
      }

      // Simple validation test - check if domain is reachable
      const testUrl = `https://${config.domain}/.well-known/openid_configuration`;
      const response = await fetch(testUrl);
      
      if (response.ok) {
        toast({
          title: "Connection Test Successful",
          description: "Auth0 configuration appears to be valid.",
        });
      } else {
        toast({
          title: "Connection Test Failed",
          description: "Unable to reach Auth0 domain. Please check your configuration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Test Failed",
        description: "Network error or invalid Auth0 domain.",
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg mr-3">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Auth0 Configuration</CardTitle>
                <CardDescription>Configure Auth0 for user authentication and management</CardDescription>
              </div>
            </div>
            <Badge variant={config.isActive ? "default" : "secondary"}>
              {config.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Auth0 Domain *</Label>
                <Input
                  id="domain"
                  placeholder="your-domain.auth0.com"
                  value={config.domain}
                  onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID *</Label>
                <Input
                  id="clientId"
                  placeholder="Your Auth0 Client ID"
                  value={config.clientId}
                  onChange={(e) => setConfig({ ...config, clientId: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="redirectUri">Redirect URI</Label>
              <Input
                id="redirectUri"
                placeholder={window.location.origin}
                value={config.redirectUri}
                onChange={(e) => setConfig({ ...config, redirectUri: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="audience">Audience (Optional)</Label>
                <Input
                  id="audience"
                  placeholder="https://your-api.com"
                  value={config.audience}
                  onChange={(e) => setConfig({ ...config, audience: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scope">Scope</Label>
                <Input
                  id="scope"
                  placeholder="openid profile email"
                  value={config.scope}
                  onChange={(e) => setConfig({ ...config, scope: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="auth0Active"
                checked={config.isActive}
                onCheckedChange={(checked) => setConfig({ ...config, isActive: checked })}
              />
              <Label htmlFor="auth0Active">Activate Auth0 Authentication</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={saveConfiguration} 
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-600 to-orange-700 flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Configuration'}
            </Button>
            <Button 
              onClick={testConnection} 
              disabled={isTestingConnection || !config.domain}
              variant="outline"
            >
              <TestTube className="w-4 h-4 mr-2" />
              {isTestingConnection ? 'Testing...' : 'Test'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-orange-600" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Create Auth0 Account</h4>
                <p className="text-sm text-gray-600">Sign up at auth0.com and create a new Single Page Application</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Configure Application Settings</h4>
                <p className="text-sm text-gray-600">Set Allowed Callback URLs to: {window.location.origin}</p>
                <p className="text-sm text-gray-600">Set Allowed Logout URLs to: {window.location.origin}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Copy Configuration</h4>
                <p className="text-sm text-gray-600">Copy Domain and Client ID from your Auth0 application settings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth0Tab;


import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Lock, ExternalLink } from "lucide-react";
import { auth0Manager, Auth0Config } from "@/utils/auth0Manager";
import { useToast } from "@/hooks/use-toast";

const Auth0Tab = () => {
  const [config, setConfig] = useState<Auth0Config>({
    domain: '',
    clientId: '',
    isActive: false,
    redirectUri: window.location.origin,
    audience: '',
    scope: 'openid profile email'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = localStorage.getItem('auth0Config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load Auth0 config:', error);
      }
    }
  }, []);

  const saveConfiguration = () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('auth0Config', JSON.stringify(config));
      
      if (config.isActive && config.domain && config.clientId) {
        auth0Manager.initialize(config);
      }
      
      toast({
        title: "Auth0 Configuration Saved",
        description: config.isActive ? "Auth0 is now active." : "Auth0 configuration saved but is inactive.",
      });
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
                <CardDescription>Configure Auth0 for authentication and identity management</CardDescription>
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
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  placeholder="your-domain.auth0.com"
                  value={config.domain}
                  onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
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
              <Label htmlFor="auth0Active">Activate Auth0</Label>
            </div>
          </div>

          <Button 
            onClick={saveConfiguration} 
            disabled={isLoading}
            className="bg-gradient-to-r from-orange-600 to-orange-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Configuration'}
          </Button>
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
                <p className="text-sm text-gray-600">Sign up at auth0.com and create a new application</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Configure Application</h4>
                <p className="text-sm text-gray-600">Set application type to "Single Page Application"</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Copy Credentials</h4>
                <p className="text-sm text-gray-600">Get Domain and Client ID from your Auth0 dashboard</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth0Tab;

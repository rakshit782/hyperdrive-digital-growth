
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Shield, ExternalLink } from "lucide-react";
import { clerkManager, ClerkConfig } from "@/utils/clerkManager";
import { useToast } from "@/hooks/use-toast";

const ClerkTab = () => {
  const [config, setConfig] = useState<ClerkConfig>({
    publishableKey: '',
    isActive: false,
    signInUrl: '/sign-in',
    signUpUrl: '/sign-up',
    afterSignInUrl: '/',
    afterSignUpUrl: '/'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = localStorage.getItem('clerkConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load Clerk config:', error);
      }
    }
  }, []);

  const saveConfiguration = () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('clerkConfig', JSON.stringify(config));
      
      if (config.isActive && config.publishableKey) {
        clerkManager.initialize(config);
      }
      
      toast({
        title: "Clerk Configuration Saved",
        description: config.isActive ? "Clerk is now active." : "Clerk configuration saved but is inactive.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save Clerk configuration.",
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
              <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Clerk Authentication</CardTitle>
                <CardDescription>Configure Clerk for user authentication and management</CardDescription>
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
              <Label htmlFor="publishableKey">Publishable Key</Label>
              <Input
                id="publishableKey"
                placeholder="pk_test_..."
                value={config.publishableKey}
                onChange={(e) => setConfig({ ...config, publishableKey: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="signInUrl">Sign In URL</Label>
                <Input
                  id="signInUrl"
                  placeholder="/sign-in"
                  value={config.signInUrl}
                  onChange={(e) => setConfig({ ...config, signInUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signUpUrl">Sign Up URL</Label>
                <Input
                  id="signUpUrl"
                  placeholder="/sign-up"
                  value={config.signUpUrl}
                  onChange={(e) => setConfig({ ...config, signUpUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="afterSignInUrl">After Sign In URL</Label>
                <Input
                  id="afterSignInUrl"
                  placeholder="/"
                  value={config.afterSignInUrl}
                  onChange={(e) => setConfig({ ...config, afterSignInUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="afterSignUpUrl">After Sign Up URL</Label>
                <Input
                  id="afterSignUpUrl"
                  placeholder="/"
                  value={config.afterSignUpUrl}
                  onChange={(e) => setConfig({ ...config, afterSignUpUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="clerkActive"
                checked={config.isActive}
                onCheckedChange={(checked) => setConfig({ ...config, isActive: checked })}
              />
              <Label htmlFor="clerkActive">Activate Clerk</Label>
            </div>
          </div>

          <Button 
            onClick={saveConfiguration} 
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-purple-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Configuration'}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-purple-600" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Create a Clerk Account</h4>
                <p className="text-sm text-gray-600">Visit clerk.dev and create a new account</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Get Your Publishable Key</h4>
                <p className="text-sm text-gray-600">Copy the publishable key from your Clerk dashboard</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Configure and Activate</h4>
                <p className="text-sm text-gray-600">Enter your key above and toggle activation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClerkTab;

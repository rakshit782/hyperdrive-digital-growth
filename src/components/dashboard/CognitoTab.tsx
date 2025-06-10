
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { cognitoManager } from "@/utils/cognitoManager";

const CognitoTab = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    userPoolId: '',
    clientId: '',
    region: '',
  });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const savedConfig = cognitoManager.getConfig();
    if (savedConfig) {
      setConfig(savedConfig);
      setIsEnabled(cognitoManager.isActive());
    }
  }, []);

  const handleSave = () => {
    if (!config.userPoolId || !config.clientId || !config.region) {
      toast({
        title: "Configuration Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    cognitoManager.configure(config);
    setIsEnabled(true);
    toast({
      title: "Amazon Cognito Configured",
      description: "Cognito has been configured successfully.",
    });
  };

  const handleDisable = () => {
    localStorage.removeItem('cognito_config');
    setIsEnabled(false);
    toast({
      title: "Amazon Cognito Disabled",
      description: "Cognito configuration has been disabled.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Amazon Cognito Configuration</CardTitle>
            <CardDescription>
              Configure Amazon Cognito Identity JavaScript SDK for user authentication
            </CardDescription>
          </div>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cognitoUserPoolId">User Pool ID *</Label>
            <Input
              id="cognitoUserPoolId"
              value={config.userPoolId}
              onChange={(e) => setConfig({ ...config, userPoolId: e.target.value })}
              placeholder="us-east-1_xxxxxxxxx"
            />
          </div>
          <div>
            <Label htmlFor="cognitoClientId">App Client ID *</Label>
            <Input
              id="cognitoClientId"
              value={config.clientId}
              onChange={(e) => setConfig({ ...config, clientId: e.target.value })}
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>
          <div>
            <Label htmlFor="cognitoRegion">AWS Region *</Label>
            <Input
              id="cognitoRegion"
              value={config.region}
              onChange={(e) => setConfig({ ...config, region: e.target.value })}
              placeholder="us-east-1"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1">
            Save Configuration
          </Button>
          {isEnabled && (
            <Button onClick={handleDisable} variant="outline">
              Disable
            </Button>
          )}
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-medium text-orange-900 mb-2">Setup Instructions:</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>1. Create a User Pool in AWS Cognito console</li>
            <li>2. Create an App Client for your User Pool</li>
            <li>3. Copy the User Pool ID and App Client ID</li>
            <li>4. Configure sign-up and sign-in policies as needed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CognitoTab;

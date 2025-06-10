
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { amplifyManager } from "@/utils/amplifyManager";

const AmplifyTab = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    region: '',
    userPoolId: '',
    userPoolWebClientId: '',
    identityPoolId: '',
    apiGatewayUrl: '',
    s3BucketName: '',
  });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const savedConfig = amplifyManager.getConfig();
    if (savedConfig) {
      setConfig({
        region: savedConfig.region || '',
        userPoolId: savedConfig.userPoolId || '',
        userPoolWebClientId: savedConfig.userPoolWebClientId || '',
        identityPoolId: savedConfig.identityPoolId || '',
        apiGatewayUrl: savedConfig.apiGatewayUrl || '',
        s3BucketName: savedConfig.s3BucketName || '',
      });
      setIsEnabled(amplifyManager.isActive());
    }
  }, []);

  const handleSave = () => {
    if (!config.region || !config.userPoolId || !config.userPoolWebClientId) {
      toast({
        title: "Configuration Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    amplifyManager.configure({
      region: config.region,
      userPoolId: config.userPoolId,
      userPoolWebClientId: config.userPoolWebClientId,
      identityPoolId: config.identityPoolId || undefined,
      apiGatewayUrl: config.apiGatewayUrl || undefined,
      s3BucketName: config.s3BucketName || undefined,
    });
    setIsEnabled(true);
    toast({
      title: "AWS Amplify Configured",
      description: "Amplify has been configured successfully.",
    });
  };

  const handleDisable = () => {
    localStorage.removeItem('amplify_config');
    setIsEnabled(false);
    toast({
      title: "AWS Amplify Disabled",
      description: "Amplify configuration has been disabled.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AWS Amplify Configuration</CardTitle>
            <CardDescription>
              Configure AWS Amplify for authentication and API integration
            </CardDescription>
          </div>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amplifyRegion">AWS Region *</Label>
            <Input
              id="amplifyRegion"
              value={config.region}
              onChange={(e) => setConfig({ ...config, region: e.target.value })}
              placeholder="us-east-1"
            />
          </div>
          <div>
            <Label htmlFor="userPoolId">User Pool ID *</Label>
            <Input
              id="userPoolId"
              value={config.userPoolId}
              onChange={(e) => setConfig({ ...config, userPoolId: e.target.value })}
              placeholder="us-east-1_XXXXXXXXX"
            />
          </div>
          <div>
            <Label htmlFor="userPoolWebClientId">User Pool Web Client ID *</Label>
            <Input
              id="userPoolWebClientId"
              value={config.userPoolWebClientId}
              onChange={(e) => setConfig({ ...config, userPoolWebClientId: e.target.value })}
              placeholder="1234567890abcdefghijklmnop"
            />
          </div>
          <div>
            <Label htmlFor="identityPoolId">Identity Pool ID (Optional)</Label>
            <Input
              id="identityPoolId"
              value={config.identityPoolId}
              onChange={(e) => setConfig({ ...config, identityPoolId: e.target.value })}
              placeholder="us-east-1:12345678-1234-1234-1234-123456789012"
            />
          </div>
          <div>
            <Label htmlFor="apiGatewayUrl">API Gateway URL (Optional)</Label>
            <Input
              id="apiGatewayUrl"
              value={config.apiGatewayUrl}
              onChange={(e) => setConfig({ ...config, apiGatewayUrl: e.target.value })}
              placeholder="https://api.example.com"
            />
          </div>
          <div>
            <Label htmlFor="s3BucketName">S3 Bucket Name (Optional)</Label>
            <Input
              id="s3BucketName"
              value={config.s3BucketName}
              onChange={(e) => setConfig({ ...config, s3BucketName: e.target.value })}
              placeholder="my-app-storage"
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

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Setup Instructions:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. Create a Cognito User Pool in AWS console</li>
            <li>2. Configure authentication flow and app client</li>
            <li>3. Set up Identity Pool for AWS resource access</li>
            <li>4. Configure API Gateway and S3 bucket if needed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmplifyTab;

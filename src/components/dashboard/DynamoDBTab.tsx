
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { dynamoDBManager } from "@/utils/dynamoDBManager";

const DynamoDBTab = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
  });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const savedConfig = dynamoDBManager.getConfig();
    if (savedConfig) {
      setConfig(savedConfig);
      setIsEnabled(dynamoDBManager.isActive());
    }
  }, []);

  const handleSave = () => {
    if (!config.region || !config.accessKeyId || !config.secretAccessKey) {
      toast({
        title: "Configuration Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    dynamoDBManager.configure(config);
    setIsEnabled(true);
    toast({
      title: "DynamoDB Configured",
      description: "DynamoDB has been configured successfully.",
    });
  };

  const handleDisable = () => {
    localStorage.removeItem('dynamodb_config');
    setIsEnabled(false);
    toast({
      title: "DynamoDB Disabled",
      description: "DynamoDB configuration has been disabled.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AWS DynamoDB Configuration</CardTitle>
            <CardDescription>
              Configure AWS SDK v3 DynamoDB for NoSQL database operations
            </CardDescription>
          </div>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dynamoRegion">AWS Region *</Label>
            <Input
              id="dynamoRegion"
              value={config.region}
              onChange={(e) => setConfig({ ...config, region: e.target.value })}
              placeholder="us-east-1"
            />
          </div>
          <div>
            <Label htmlFor="dynamoAccessKeyId">Access Key ID *</Label>
            <Input
              id="dynamoAccessKeyId"
              type="password"
              value={config.accessKeyId}
              onChange={(e) => setConfig({ ...config, accessKeyId: e.target.value })}
              placeholder="AKIAIOSFODNN7EXAMPLE"
            />
          </div>
          <div>
            <Label htmlFor="dynamoSecretAccessKey">Secret Access Key *</Label>
            <Input
              id="dynamoSecretAccessKey"
              type="password"
              value={config.secretAccessKey}
              onChange={(e) => setConfig({ ...config, secretAccessKey: e.target.value })}
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
            />
          </div>
          <div>
            <Label htmlFor="dynamoSessionToken">Session Token (Optional)</Label>
            <Input
              id="dynamoSessionToken"
              type="password"
              value={config.sessionToken}
              onChange={(e) => setConfig({ ...config, sessionToken: e.target.value })}
              placeholder="For temporary credentials"
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

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Setup Instructions:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>1. Create an IAM user with DynamoDB permissions</li>
            <li>2. Generate access keys for the IAM user</li>
            <li>3. Create DynamoDB tables for your application</li>
            <li>4. Configure appropriate read/write capacity</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamoDBTab;

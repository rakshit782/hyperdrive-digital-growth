
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { s3Manager } from "@/utils/s3Manager";

const S3Tab = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
    bucketName: '',
  });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const savedConfig = s3Manager.getConfig();
    if (savedConfig) {
      setConfig({
        region: savedConfig.region || '',
        accessKeyId: savedConfig.accessKeyId || '',
        secretAccessKey: savedConfig.secretAccessKey || '',
        sessionToken: savedConfig.sessionToken || '',
        bucketName: savedConfig.bucketName || '',
      });
      setIsEnabled(s3Manager.isActive());
    }
  }, []);

  const handleSave = () => {
    if (!config.region || !config.accessKeyId || !config.secretAccessKey || !config.bucketName) {
      toast({
        title: "Configuration Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    s3Manager.configure({
      region: config.region,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      sessionToken: config.sessionToken || undefined,
      bucketName: config.bucketName,
    });
    setIsEnabled(true);
    toast({
      title: "AWS S3 Configured",
      description: "S3 has been configured successfully.",
    });
  };

  const handleDisable = () => {
    localStorage.removeItem('s3_config');
    setIsEnabled(false);
    toast({
      title: "AWS S3 Disabled",
      description: "S3 configuration has been disabled.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AWS S3 Configuration</CardTitle>
            <CardDescription>
              Configure AWS SDK Client S3 for file upload and storage
            </CardDescription>
          </div>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="s3Region">AWS Region *</Label>
            <Input
              id="s3Region"
              value={config.region}
              onChange={(e) => setConfig({ ...config, region: e.target.value })}
              placeholder="us-east-1"
            />
          </div>
          <div>
            <Label htmlFor="s3BucketName">S3 Bucket Name *</Label>
            <Input
              id="s3BucketName"
              value={config.bucketName}
              onChange={(e) => setConfig({ ...config, bucketName: e.target.value })}
              placeholder="my-app-storage-bucket"
            />
          </div>
          <div>
            <Label htmlFor="s3AccessKeyId">Access Key ID *</Label>
            <Input
              id="s3AccessKeyId"
              type="password"
              value={config.accessKeyId}
              onChange={(e) => setConfig({ ...config, accessKeyId: e.target.value })}
              placeholder="AKIAIOSFODNN7EXAMPLE"
            />
          </div>
          <div>
            <Label htmlFor="s3SecretAccessKey">Secret Access Key *</Label>
            <Input
              id="s3SecretAccessKey"
              type="password"
              value={config.secretAccessKey}
              onChange={(e) => setConfig({ ...config, secretAccessKey: e.target.value })}
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
            />
          </div>
          <div>
            <Label htmlFor="s3SessionToken">Session Token (Optional)</Label>
            <Input
              id="s3SessionToken"
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

        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">Setup Instructions:</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>1. Create an S3 bucket in AWS console</li>
            <li>2. Configure bucket permissions and CORS policy</li>
            <li>3. Create an IAM user with S3 permissions</li>
            <li>4. Generate access keys for the IAM user</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default S3Tab;

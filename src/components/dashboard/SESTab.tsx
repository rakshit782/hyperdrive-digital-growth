
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { sesManager } from "@/utils/sesManager";

const SESTab = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
    fromEmail: '',
  });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const savedConfig = sesManager.getConfig();
    if (savedConfig) {
      setConfig({
        region: savedConfig.region || '',
        accessKeyId: savedConfig.accessKeyId || '',
        secretAccessKey: savedConfig.secretAccessKey || '',
        sessionToken: savedConfig.sessionToken || '',
        fromEmail: savedConfig.fromEmail || '',
      });
      setIsEnabled(sesManager.isActive());
    }
  }, []);

  const handleSave = () => {
    if (!config.region || !config.accessKeyId || !config.secretAccessKey || !config.fromEmail) {
      toast({
        title: "Configuration Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    sesManager.configure({
      region: config.region,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      sessionToken: config.sessionToken || undefined,
      fromEmail: config.fromEmail,
    });
    setIsEnabled(true);
    toast({
      title: "Amazon SES Configured",
      description: "SES has been configured successfully.",
    });
  };

  const handleDisable = () => {
    localStorage.removeItem('ses_config');
    setIsEnabled(false);
    toast({
      title: "Amazon SES Disabled",
      description: "SES configuration has been disabled.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Amazon SES Configuration</CardTitle>
            <CardDescription>
              Configure Amazon Simple Email Service for sending emails
            </CardDescription>
          </div>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sesRegion">AWS Region *</Label>
            <Input
              id="sesRegion"
              value={config.region}
              onChange={(e) => setConfig({ ...config, region: e.target.value })}
              placeholder="us-east-1"
            />
          </div>
          <div>
            <Label htmlFor="sesFromEmail">From Email Address *</Label>
            <Input
              id="sesFromEmail"
              type="email"
              value={config.fromEmail}
              onChange={(e) => setConfig({ ...config, fromEmail: e.target.value })}
              placeholder="noreply@yourdomain.com"
            />
          </div>
          <div>
            <Label htmlFor="sesAccessKeyId">Access Key ID *</Label>
            <Input
              id="sesAccessKeyId"
              type="password"
              value={config.accessKeyId}
              onChange={(e) => setConfig({ ...config, accessKeyId: e.target.value })}
              placeholder="AKIAIOSFODNN7EXAMPLE"
            />
          </div>
          <div>
            <Label htmlFor="sesSecretAccessKey">Secret Access Key *</Label>
            <Input
              id="sesSecretAccessKey"
              type="password"
              value={config.secretAccessKey}
              onChange={(e) => setConfig({ ...config, secretAccessKey: e.target.value })}
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
            />
          </div>
          <div>
            <Label htmlFor="sesSessionToken">Session Token (Optional)</Label>
            <Input
              id="sesSessionToken"
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

        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-medium text-red-900 mb-2">Setup Instructions:</h4>
          <ul className="text-sm text-red-700 space-y-1">
            <li>1. Verify your sending email address in SES console</li>
            <li>2. Request production access if needed</li>
            <li>3. Create an IAM user with SES permissions</li>
            <li>4. Configure bounce and complaint handling</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SESTab;

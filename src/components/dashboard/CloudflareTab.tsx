
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { cloudflareManager } from "@/utils/cloudflareManager";
import { Shield, Zap, BarChart3 } from "lucide-react";

const CloudflareTab = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    accountId: '',
    apiToken: '',
    zoneId: '',
    streamAccountId: '',
    streamApiToken: '',
  });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const savedConfig = cloudflareManager.getConfig();
    if (savedConfig) {
      setConfig({
        accountId: savedConfig.accountId || '',
        apiToken: savedConfig.apiToken || '',
        zoneId: savedConfig.zoneId || '',
        streamAccountId: savedConfig.streamAccountId || '',
        streamApiToken: savedConfig.streamApiToken || '',
      });
      setIsEnabled(cloudflareManager.isActive());
    }
  }, []);

  const handleSave = () => {
    if (!config.accountId || !config.apiToken) {
      toast({
        title: "Configuration Error",
        description: "Please fill in Account ID and API Token.",
        variant: "destructive",
      });
      return;
    }

    cloudflareManager.configure({
      accountId: config.accountId,
      apiToken: config.apiToken,
      zoneId: config.zoneId || undefined,
      streamAccountId: config.streamAccountId || undefined,
      streamApiToken: config.streamApiToken || undefined,
    });
    setIsEnabled(true);
    toast({
      title: "Cloudflare Configured",
      description: "Cloudflare has been configured successfully.",
    });
  };

  const handleDisable = () => {
    localStorage.removeItem('cloudflare_config');
    setIsEnabled(false);
    toast({
      title: "Cloudflare Disabled",
      description: "Cloudflare configuration has been disabled.",
    });
  };

  const handlePurgeCache = async () => {
    try {
      await cloudflareManager.purgeCache();
      toast({
        title: "Cache Purged",
        description: "Cloudflare cache has been purged successfully.",
      });
    } catch (error) {
      toast({
        title: "Purge Failed",
        description: "Failed to purge cache. Check your configuration.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Cloudflare Configuration
            </CardTitle>
            <CardDescription>
              Configure Cloudflare for CDN, security, and performance optimization
            </CardDescription>
          </div>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cfAccountId">Account ID *</Label>
            <Input
              id="cfAccountId"
              value={config.accountId}
              onChange={(e) => setConfig({ ...config, accountId: e.target.value })}
              placeholder="32-character account ID"
            />
          </div>
          <div>
            <Label htmlFor="cfApiToken">API Token *</Label>
            <Input
              id="cfApiToken"
              type="password"
              value={config.apiToken}
              onChange={(e) => setConfig({ ...config, apiToken: e.target.value })}
              placeholder="Global API Key or API Token"
            />
          </div>
          <div>
            <Label htmlFor="cfZoneId">Zone ID (Optional)</Label>
            <Input
              id="cfZoneId"
              value={config.zoneId}
              onChange={(e) => setConfig({ ...config, zoneId: e.target.value })}
              placeholder="Zone ID for your domain"
            />
          </div>
          <div>
            <Label htmlFor="cfStreamAccountId">Stream Account ID (Optional)</Label>
            <Input
              id="cfStreamAccountId"
              value={config.streamAccountId}
              onChange={(e) => setConfig({ ...config, streamAccountId: e.target.value })}
              placeholder="For Cloudflare Stream"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="cfStreamApiToken">Stream API Token (Optional)</Label>
            <Input
              id="cfStreamApiToken"
              type="password"
              value={config.streamApiToken}
              onChange={(e) => setConfig({ ...config, streamApiToken: e.target.value })}
              placeholder="API Token for Cloudflare Stream"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1">
            Save Configuration
          </Button>
          {isEnabled && (
            <>
              <Button onClick={handleDisable} variant="outline">
                Disable
              </Button>
              <Button onClick={handlePurgeCache} variant="secondary" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Purge Cache
              </Button>
            </>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Setup Instructions:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. Sign up for a Cloudflare account at cloudflare.com</li>
            <li>2. Add your domain to Cloudflare</li>
            <li>3. Update your DNS nameservers to Cloudflare's</li>
            <li>4. Generate an API token with Zone:Edit permissions</li>
            <li>5. Copy your Account ID and Zone ID from the dashboard</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CloudflareTab;

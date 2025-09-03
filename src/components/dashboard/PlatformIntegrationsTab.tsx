import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Zap, 
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Key,
  Globe,
  RotateCcw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface PlatformIntegration {
  id: string;
  platform: 'amazon' | 'walmart' | 'ebay' | 'etsy';
  is_active: boolean;
  api_credentials: Record<string, any>;
  webhook_url?: string;
  sync_settings: Record<string, any>;
  last_sync_at?: string;
  sync_status: 'active' | 'inactive' | 'error' | 'syncing';
  sync_errors: any[];
  created_at: string;
  updated_at: string;
}

const PlatformIntegrationsTab = () => {
  const [integrations, setIntegrations] = useState<PlatformIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const platformConfigs = {
    amazon: {
      name: "Amazon",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      icon: "🛒",
      description: "Connect to Amazon Seller Central API",
      fields: [
        { key: "access_key", label: "Access Key ID", type: "text", required: true },
        { key: "secret_key", label: "Secret Access Key", type: "password", required: true },
        { key: "marketplace_id", label: "Marketplace ID", type: "text", required: true },
        { key: "seller_id", label: "Seller ID", type: "text", required: true },
      ]
    },
    walmart: {
      name: "Walmart",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "🏪",
      description: "Connect to Walmart Marketplace API",
      fields: [
        { key: "client_id", label: "Client ID", type: "text", required: true },
        { key: "client_secret", label: "Client Secret", type: "password", required: true },
        { key: "consumer_id", label: "Consumer ID", type: "text", required: true },
      ]
    },
    ebay: {
      name: "eBay",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: "🏷️",
      description: "Connect to eBay Trading API",
      fields: [
        { key: "app_id", label: "App ID", type: "text", required: true },
        { key: "dev_id", label: "Dev ID", type: "text", required: true },
        { key: "cert_id", label: "Cert ID", type: "password", required: true },
        { key: "user_token", label: "User Token", type: "password", required: true },
      ]
    },
    etsy: {
      name: "Etsy",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      icon: "🎨",
      description: "Connect to Etsy Open API",
      fields: [
        { key: "api_key", label: "API Key", type: "password", required: true },
        { key: "shared_secret", label: "Shared Secret", type: "password", required: true },
        { key: "shop_id", label: "Shop ID", type: "text", required: true },
      ]
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('platform_integrations')
        .select('*')
        .order('platform');

      if (error) throw error;
      
      // Create missing platform entries
      const existingPlatforms = (data || []).map(d => d.platform);
      const allPlatforms = Object.keys(platformConfigs) as (keyof typeof platformConfigs)[];
      const missingPlatforms = allPlatforms.filter(p => !existingPlatforms.includes(p));
      
      if (missingPlatforms.length > 0) {
        const { error: insertError } = await supabase
          .from('platform_integrations')
          .insert(missingPlatforms.map(platform => ({ platform })));
        
        if (insertError) throw insertError;
        
        // Refetch after creating missing entries
        const { data: updatedData, error: refetchError } = await supabase
          .from('platform_integrations')
          .select('*')
          .order('platform');
        
        if (refetchError) throw refetchError;
        setIntegrations(updatedData as PlatformIntegration[] || []);
      } else {
        setIntegrations(data as PlatformIntegration[] || []);
      }
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch platform integrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateIntegration = async (platformId: string, updates: Partial<PlatformIntegration>) => {
    try {
      const { error } = await supabase
        .from('platform_integrations')
        .update(updates)
        .eq('id', platformId);

      if (error) throw error;
      
      await fetchIntegrations();
      toast({
        title: "Success",
        description: "Integration updated successfully",
      });
    } catch (error) {
      console.error('Error updating integration:', error);
      toast({
        title: "Error",
        description: "Failed to update integration",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      case 'syncing':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Syncing
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg"></div>
                  <div>
                    <div className="h-6 bg-muted rounded w-24 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-48"></div>
                  </div>
                </div>
                <div className="h-6 bg-muted rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            Platform Integrations
          </CardTitle>
          <CardDescription>
            Connect and manage your e-commerce platform integrations to sync inventory, orders, and customer data.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Integration Cards */}
      <div className="grid gap-6">
        {Object.entries(platformConfigs).map(([platformKey, config]) => {
          const integration = integrations.find(i => i.platform === platformKey);
          const isConnected = integration?.is_active;
          
          return (
            <Card key={platformKey} className={`border-2 ${isConnected ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl ${config.color} flex items-center justify-center text-2xl`}>
                      {config.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{config.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {config.description}
                      </CardDescription>
                      {integration?.last_sync_at && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Last sync: {format(new Date(integration.last_sync_at), 'MMM dd, yyyy HH:mm')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {integration && getStatusBadge(integration.sync_status)}
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`${platformKey}-switch`} className="text-sm">
                        {isConnected ? 'Connected' : 'Disconnected'}
                      </Label>
                      <Switch
                        id={`${platformKey}-switch`}
                        checked={isConnected}
                        onCheckedChange={(checked) => {
                          if (integration) {
                            updateIntegration(integration.id, { is_active: checked });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* API Credentials Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label htmlFor={`${platformKey}-${field.key}`}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      <Input
                        id={`${platformKey}-${field.key}`}
                        type={field.type}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={integration?.api_credentials?.[field.key] || ''}
                        onChange={(e) => {
                          if (integration) {
                            const newCredentials = {
                              ...integration.api_credentials,
                              [field.key]: e.target.value
                            };
                            updateIntegration(integration.id, {
                              api_credentials: newCredentials
                            });
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Sync Settings */}
                <div className="border-t pt-4 mt-6">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Sync Settings
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${platformKey}-sync-inventory`}>
                        <Switch
                          id={`${platformKey}-sync-inventory`}
                          checked={integration?.sync_settings?.sync_inventory || false}
                          onCheckedChange={(checked) => {
                            if (integration) {
                              const newSettings = {
                                ...integration.sync_settings,
                                sync_inventory: checked
                              };
                              updateIntegration(integration.id, {
                                sync_settings: newSettings
                              });
                            }
                          }}
                          className="mr-2"
                        />
                        Sync Inventory
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${platformKey}-sync-orders`}>
                        <Switch
                          id={`${platformKey}-sync-orders`}
                          checked={integration?.sync_settings?.sync_orders || false}
                          onCheckedChange={(checked) => {
                            if (integration) {
                              const newSettings = {
                                ...integration.sync_settings,
                                sync_orders: checked
                              };
                              updateIntegration(integration.id, {
                                sync_settings: newSettings
                              });
                            }
                          }}
                          className="mr-2"
                        />
                        Sync Orders
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${platformKey}-sync-customers`}>
                        <Switch
                          id={`${platformKey}-sync-customers`}
                          checked={integration?.sync_settings?.sync_customers || false}
                          onCheckedChange={(checked) => {
                            if (integration) {
                              const newSettings = {
                                ...integration.sync_settings,
                                sync_customers: checked
                              };
                              updateIntegration(integration.id, {
                                sync_settings: newSettings
                              });
                            }
                          }}
                          className="mr-2"
                        />
                        Sync Customers
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Key className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                    <Button variant="outline" size="sm" disabled={!isConnected}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Sync Now
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Docs
                    </Button>
                  </div>
                </div>

                {/* Error Messages */}
                {integration?.sync_errors && integration.sync_errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h5 className="font-medium text-red-800 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Recent Sync Errors
                    </h5>
                    <div className="space-y-1">
                      {integration.sync_errors.slice(0, 3).map((error, index) => (
                        <p key={index} className="text-sm text-red-700">
                          • {typeof error === 'string' ? error : JSON.stringify(error)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformIntegrationsTab;
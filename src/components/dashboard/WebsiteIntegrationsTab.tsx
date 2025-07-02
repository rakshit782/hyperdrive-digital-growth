
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Save, Eye, EyeOff, Facebook, 
  BarChart3, MessageSquare, Shield, Zap, 
  Mail, Database, Code, Palette
} from 'lucide-react';

interface IntegrationConfig {
  id: string;
  name: string;
  description: string;
  icon: any;
  isEnabled: boolean;
  settings: Record<string, any>;
}

const WebsiteIntegrationsTab = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const defaultIntegrations: IntegrationConfig[] = [
    {
      id: 'facebook-pixel',
      name: 'Facebook Pixel',
      description: 'Track website conversions and optimize ad campaigns',
      icon: Facebook,
      isEnabled: false,
      settings: {
        pixelId: '',
        enablePageView: true,
        enablePurchase: true,
        enableLead: true
      }
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: BarChart3,
      isEnabled: false,
      settings: {
        measurementId: '',
        enablePageViews: true,
        enableEvents: true,
        anonymizeIp: true
      }
    },
    {
      id: 'chatgpt-widget',
      name: 'AI Chat Widget',
      description: 'Add AI-powered chat support to your website',
      icon: MessageSquare,
      isEnabled: false,
      settings: {
        apiKey: '',
        position: 'bottom-right',
        greeting: 'Hi! How can I help you today?',
        primaryColor: '#3B82F6'
      }
    },
    {
      id: 'zapier-webhooks',
      name: 'Zapier Integration',
      description: 'Connect your forms to thousands of apps',
      icon: Zap,
      isEnabled: false,
      settings: {
        contactFormWebhook: '',
        leadFormWebhook: '',
        auditFormWebhook: ''
      }
    },
    {
      id: 'email-service',
      name: 'Email Service',
      description: 'Send automated emails and notifications',
      icon: Mail,
      isEnabled: false,
      settings: {
        serviceProvider: 'emailjs',
        serviceId: '',
        templateId: '',
        publicKey: ''
      }
    },
    {
      id: 'custom-css',
      name: 'Custom CSS',
      description: 'Add custom styles to your website',
      icon: Palette,
      isEnabled: false,
      settings: {
        customCss: '/* Add your custom CSS here */'
      }
    },
    {
      id: 'custom-scripts',
      name: 'Custom Scripts',
      description: 'Add custom JavaScript to your website',
      icon: Code,
      isEnabled: false,
      settings: {
        headerScripts: '',
        footerScripts: ''
      }
    }
  ];

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = () => {
    const saved = localStorage.getItem('websiteIntegrations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setIntegrations(Array.isArray(parsed) ? parsed : defaultIntegrations);
      } catch (error) {
        console.error('Failed to load integrations:', error);
        setIntegrations(defaultIntegrations);
      }
    } else {
      setIntegrations(defaultIntegrations);
    }
  };

  const handleSave = () => {
    localStorage.setItem('websiteIntegrations', JSON.stringify(integrations));
    
    // Dispatch events for specific integrations
    integrations.forEach(integration => {
      if (integration.isEnabled) {
        window.dispatchEvent(new CustomEvent(`${integration.id}Updated`, { 
          detail: integration.settings 
        }));
      }
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    
    toast({
      title: "Integrations Updated",
      description: "Your website integrations have been saved successfully."
    });
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, isEnabled: !integration.isEnabled }
        : integration
    ));
  };

  const updateIntegrationSettings = (id: string, settings: Record<string, any>) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? { ...integration, settings: { ...integration.settings, ...settings } }
        : integration
    ));
  };

  const renderIntegrationSettings = (integration: IntegrationConfig) => {
    const { settings } = integration;
    const updateSettings = (newSettings: Record<string, any>) => 
      updateIntegrationSettings(integration.id, newSettings);

    switch (integration.id) {
      case 'facebook-pixel':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pixelId">Facebook Pixel ID</Label>
              <Input
                id="pixelId"
                value={settings.pixelId || ''}
                onChange={(e) => updateSettings({ pixelId: e.target.value })}
                placeholder="123456789012345"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.enablePageView}
                  onCheckedChange={(checked) => updateSettings({ enablePageView: checked })}
                />
                <Label>Track Page Views</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.enablePurchase}
                  onCheckedChange={(checked) => updateSettings({ enablePurchase: checked })}
                />
                <Label>Track Purchases</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.enableLead}
                  onCheckedChange={(checked) => updateSettings({ enableLead: checked })}
                />
                <Label>Track Leads</Label>
              </div>
            </div>
          </div>
        );

      case 'google-analytics':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="measurementId">Measurement ID</Label>
              <Input
                id="measurementId"
                value={settings.measurementId || ''}
                onChange={(e) => updateSettings({ measurementId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="bg-white/50"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.enablePageViews}
                  onCheckedChange={(checked) => updateSettings({ enablePageViews: checked })}
                />
                <Label>Track Page Views</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.enableEvents}
                  onCheckedChange={(checked) => updateSettings({ enableEvents: checked })}
                />
                <Label>Track Events</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.anonymizeIp}
                  onCheckedChange={(checked) => updateSettings({ anonymizeIp: checked })}
                />
                <Label>Anonymize IP</Label>
              </div>
            </div>
          </div>
        );

      case 'chatgpt-widget':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={settings.apiKey || ''}
                onChange={(e) => updateSettings({ apiKey: e.target.value })}
                placeholder="sk-..."
                className="bg-white/50"
              />
            </div>
            <div>
              <Label htmlFor="greeting">Greeting Message</Label>
              <Input
                id="greeting"
                value={settings.greeting || ''}
                onChange={(e) => updateSettings({ greeting: e.target.value })}
                placeholder="Hi! How can I help you today?"
                className="bg-white/50"
              />
            </div>
            <div>
              <Label htmlFor="position">Widget Position</Label>
              <select
                id="position"
                value={settings.position || 'bottom-right'}
                onChange={(e) => updateSettings({ position: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white/50"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <Input
                id="primaryColor"
                type="color"
                value={settings.primaryColor || '#3B82F6'}
                onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                className="bg-white/50 h-10"
              />
            </div>
          </div>
        );

      case 'zapier-webhooks':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactFormWebhook">Contact Form Webhook</Label>
              <Input
                id="contactFormWebhook"
                value={settings.contactFormWebhook || ''}
                onChange={(e) => updateSettings({ contactFormWebhook: e.target.value })}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                className="bg-white/50"
              />
            </div>
            <div>
              <Label htmlFor="leadFormWebhook">Lead Form Webhook</Label>
              <Input
                id="leadFormWebhook"
                value={settings.leadFormWebhook || ''}
                onChange={(e) => updateSettings({ leadFormWebhook: e.target.value })}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                className="bg-white/50"
              />
            </div>
            <div>
              <Label htmlFor="auditFormWebhook">Audit Form Webhook</Label>
              <Input
                id="auditFormWebhook"
                value={settings.auditFormWebhook || ''}
                onChange={(e) => updateSettings({ auditFormWebhook: e.target.value })}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                className="bg-white/50"
              />
            </div>
          </div>
        );

      case 'email-service':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="serviceId">Service ID</Label>
              <Input
                id="serviceId"
                value={settings.serviceId || ''}
                onChange={(e) => updateSettings({ serviceId: e.target.value })}
                placeholder="service_xxxxxxxxx"
                className="bg-white/50"
              />
            </div>
            <div>
              <Label htmlFor="templateId">Template ID</Label>
              <Input
                id="templateId"
                value={settings.templateId || ''}
                onChange={(e) => updateSettings({ templateId: e.target.value })}
                placeholder="template_xxxxxxxxx"
                className="bg-white/50"
              />
            </div>
            <div>
              <Label htmlFor="publicKey">Public Key</Label>
              <Input
                id="publicKey"
                value={settings.publicKey || ''}
                onChange={(e) => updateSettings({ publicKey: e.target.value })}
                placeholder="xxxxxxxxxxxxxxxxxx"
                className="bg-white/50"
              />
            </div>
          </div>
        );

      case 'custom-css':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="customCss">Custom CSS</Label>
              <Textarea
                id="customCss"
                value={settings.customCss || ''}
                onChange={(e) => updateSettings({ customCss: e.target.value })}
                placeholder="/* Add your custom CSS here */"
                rows={10}
                className="bg-white/50 font-mono text-sm"
              />
            </div>
          </div>
        );

      case 'custom-scripts':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="headerScripts">Header Scripts</Label>
              <Textarea
                id="headerScripts"
                value={settings.headerScripts || ''}
                onChange={(e) => updateSettings({ headerScripts: e.target.value })}
                placeholder="<script>/* Scripts to be added to <head> */</script>"
                rows={5}
                className="bg-white/50 font-mono text-sm"
              />
            </div>
            <div>
              <Label htmlFor="footerScripts">Footer Scripts</Label>
              <Textarea
                id="footerScripts"
                value={settings.footerScripts || ''}
                onChange={(e) => updateSettings({ footerScripts: e.target.value })}
                placeholder="<script>/* Scripts to be added before </body> */</script>"
                rows={5}
                className="bg-white/50 font-mono text-sm"
              />
            </div>
          </div>
        );

      default:
        return <div className="text-slate-500">No settings available for this integration.</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mr-3">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Website Integrations</CardTitle>
                <CardDescription>Configure third-party services and custom code for your website</CardDescription>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              className={`transition-all duration-300 ${
                isSaved 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              } shadow-lg`}
            >
              {isSaved ? "✓ Saved!" : "Save All Changes"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="configure">Configure</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integration) => {
                  const IconComponent = integration.icon;
                  return (
                    <Card key={integration.id} className={`hover:shadow-lg transition-all duration-300 ${
                      integration.isEnabled ? 'border-green-200 bg-green-50/50' : 'border-gray-200 bg-gray-50/50'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${
                            integration.isEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <Switch
                            checked={integration.isEnabled}
                            onCheckedChange={() => toggleIntegration(integration.id)}
                          />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">{integration.name}</h3>
                        <p className="text-sm text-slate-600 mb-3">{integration.description}</p>
                        <Badge variant={integration.isEnabled ? "default" : "secondary"}>
                          {integration.isEnabled ? (
                            <><Eye className="w-3 h-3 mr-1" />Enabled</>
                          ) : (
                            <><EyeOff className="w-3 h-3 mr-1" />Disabled</>
                          )}
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="configure" className="space-y-6">
              {integrations.map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <Card key={integration.id} className={`${
                    integration.isEnabled ? 'border-green-200' : 'border-gray-200 opacity-60'
                  }`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            integration.isEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <CardDescription>{integration.description}</CardDescription>
                          </div>
                        </div>
                        <Switch
                          checked={integration.isEnabled}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                        />
                      </div>
                    </CardHeader>
                    {integration.isEnabled && (
                      <CardContent>
                        {renderIntegrationSettings(integration)}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteIntegrationsTab;

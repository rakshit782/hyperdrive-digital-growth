
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Save, Mail, TestTube, ExternalLink } from "lucide-react";
import { emailJSManager, EmailJSConfig } from "@/utils/emailJSManager";
import { useToast } from "@/hooks/use-toast";

const EmailJSTab = () => {
  const [config, setConfig] = useState<EmailJSConfig>({
    publicKey: '',
    serviceId: '',
    templateId: '',
    isActive: false
  });
  const [testEmail, setTestEmail] = useState('');
  const [testMessage, setTestMessage] = useState('This is a test email from EmailJS configuration.');
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = localStorage.getItem('emailJSConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load EmailJS config:', error);
      }
    }
  }, []);

  const saveConfiguration = () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('emailJSConfig', JSON.stringify(config));
      
      if (config.isActive && config.publicKey && config.serviceId && config.templateId) {
        emailJSManager.initialize(config);
      }
      
      toast({
        title: "EmailJS Configuration Saved",
        description: config.isActive ? "EmailJS is now active." : "EmailJS configuration saved but is inactive.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save EmailJS configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testEmailSending = async () => {
    if (!config.isActive || !config.publicKey || !config.serviceId || !config.templateId) {
      toast({
        title: "Configuration Required",
        description: "Please configure and activate EmailJS first.",
        variant: "destructive",
      });
      return;
    }

    if (!testEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a test email address.",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);

    try {
      const result = await emailJSManager.sendEmail({
        to_email: testEmail,
        subject: 'EmailJS Test Email',
        message: testMessage,
        from_name: 'Your Website'
      });

      if (result.success) {
        toast({
          title: "Test Email Sent",
          description: `Test email successfully sent to ${testEmail}`,
        });
      } else {
        toast({
          title: "Email Failed",
          description: result.error || "Failed to send test email",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while sending the test email.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg mr-3">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">EmailJS Configuration</CardTitle>
                <CardDescription>Configure EmailJS for sending emails from your website</CardDescription>
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
              <Label htmlFor="publicKey">Public Key</Label>
              <Input
                id="publicKey"
                placeholder="Your EmailJS Public Key"
                value={config.publicKey}
                onChange={(e) => setConfig({ ...config, publicKey: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceId">Service ID</Label>
                <Input
                  id="serviceId"
                  placeholder="service_xxxxxxx"
                  value={config.serviceId}
                  onChange={(e) => setConfig({ ...config, serviceId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="templateId">Template ID</Label>
                <Input
                  id="templateId"
                  placeholder="template_xxxxxxx"
                  value={config.templateId}
                  onChange={(e) => setConfig({ ...config, templateId: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="emailjsActive"
                checked={config.isActive}
                onCheckedChange={(checked) => setConfig({ ...config, isActive: checked })}
              />
              <Label htmlFor="emailjsActive">Activate EmailJS</Label>
            </div>
          </div>

          <Button 
            onClick={saveConfiguration} 
            disabled={isLoading}
            className="bg-gradient-to-r from-red-600 to-red-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Configuration'}
          </Button>
        </CardContent>
      </Card>

      {/* Test Email Section */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TestTube className="w-5 h-5 mr-2 text-red-600" />
            Test Email Sending
          </CardTitle>
          <CardDescription>Send a test email to verify your EmailJS configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testEmail">Test Email Address</Label>
            <Input
              id="testEmail"
              type="email"
              placeholder="test@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testMessage">Test Message</Label>
            <Textarea
              id="testMessage"
              placeholder="Enter your test message..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={testEmailSending}
            disabled={isTesting || !config.isActive}
            variant="outline"
          >
            <TestTube className="w-4 h-4 mr-2" />
            {isTesting ? 'Sending...' : 'Send Test Email'}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-red-600" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Create EmailJS Account</h4>
                <p className="text-sm text-gray-600">Sign up at emailjs.com and create a new service</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Configure Email Service</h4>
                <p className="text-sm text-gray-600">Connect your email provider (Gmail, Outlook, etc.)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Create Email Template</h4>
                <p className="text-sm text-gray-600">Design your email template with variables</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">4</div>
              <div>
                <h4 className="font-medium">Get Your Credentials</h4>
                <p className="text-sm text-gray-600">Copy Public Key, Service ID, and Template ID</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailJSTab;

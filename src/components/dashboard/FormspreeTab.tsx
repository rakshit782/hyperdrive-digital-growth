
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Save, FileText, TestTube, ExternalLink } from "lucide-react";
import { formspreeManager, FormspreeConfig } from "@/utils/formspreeManager";
import { useToast } from "@/hooks/use-toast";

const FormspreeTab = () => {
  const [config, setConfig] = useState<FormspreeConfig>({
    formId: '',
    isActive: false,
    endpoint: ''
  });
  const [testData, setTestData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test form submission from Formspree configuration.'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedConfig = localStorage.getItem('formspreeConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load Formspree config:', error);
      }
    }
  }, []);

  const saveConfiguration = () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('formspreeConfig', JSON.stringify(config));
      
      if (config.isActive && config.formId) {
        formspreeManager.initialize(config);
      }
      
      toast({
        title: "Formspree Configuration Saved",
        description: config.isActive ? "Formspree is now active." : "Formspree configuration saved but is inactive.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save Formspree configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testFormSubmission = async () => {
    if (!config.isActive || !config.formId) {
      toast({
        title: "Configuration Required",
        description: "Please configure and activate Formspree first.",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);

    try {
      const result = await formspreeManager.submitForm(testData);

      if (result.success) {
        toast({
          title: "Test Form Submitted",
          description: "Test form submission was successful!",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Failed to submit test form",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while testing form submission.",
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
              <div className="p-2 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg mr-3">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Formspree Configuration</CardTitle>
                <CardDescription>Configure Formspree for handling form submissions</CardDescription>
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
              <Label htmlFor="formId">Form ID</Label>
              <Input
                id="formId"
                placeholder="xoqzkpje (from your Formspree dashboard)"
                value={config.formId}
                onChange={(e) => setConfig({ ...config, formId: e.target.value })}
              />
              <p className="text-sm text-gray-500">
                Find your Form ID in your Formspree dashboard after creating a form
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint">Custom Endpoint (Optional)</Label>
              <Input
                id="endpoint"
                placeholder="https://formspree.io/f/your-form-id"
                value={config.endpoint}
                onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
              />
              <p className="text-sm text-gray-500">
                Leave empty to use the default Formspree endpoint
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="formspreeActive"
                checked={config.isActive}
                onCheckedChange={(checked) => setConfig({ ...config, isActive: checked })}
              />
              <Label htmlFor="formspreeActive">Activate Formspree</Label>
            </div>
          </div>

          <Button 
            onClick={saveConfiguration} 
            disabled={isLoading}
            className="bg-gradient-to-r from-teal-600 to-teal-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Configuration'}
          </Button>
        </CardContent>
      </Card>

      {/* Test Form Section */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TestTube className="w-5 h-5 mr-2 text-teal-600" />
            Test Form Submission
          </CardTitle>
          <CardDescription>Test your Formspree configuration with sample data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testName">Name</Label>
              <Input
                id="testName"
                value={testData.name}
                onChange={(e) => setTestData({ ...testData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testEmail">Email</Label>
              <Input
                id="testEmail"
                type="email"
                value={testData.email}
                onChange={(e) => setTestData({ ...testData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testMessage">Message</Label>
            <Textarea
              id="testMessage"
              value={testData.message}
              onChange={(e) => setTestData({ ...testData, message: e.target.value })}
              rows={3}
            />
          </div>

          <Button 
            onClick={testFormSubmission}
            disabled={isTesting || !config.isActive}
            variant="outline"
          >
            <TestTube className="w-4 h-4 mr-2" />
            {isTesting ? 'Submitting...' : 'Test Form Submission'}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-teal-600" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Create Formspree Account</h4>
                <p className="text-sm text-gray-600">Sign up at formspree.io and create a new form</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Configure Your Form</h4>
                <p className="text-sm text-gray-600">Set up form fields and notification settings</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Copy Form ID</h4>
                <p className="text-sm text-gray-600">Get your unique Form ID from the Formspree dashboard</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormspreeTab;

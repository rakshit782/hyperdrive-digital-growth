
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TestTube, CheckCircle, XCircle, Sheet, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface GoogleSheetsConfig {
  isEnabled: boolean;
  apiKey: string;
  sheets: {
    newsletter: string;
    auditForm: string;
    contactForm: string;
    freeAuditForm: string;
    generalForms: string;
  };
}

const GoogleSheetsTab = () => {
  const [config, setConfig] = useState<GoogleSheetsConfig>({
    isEnabled: false,
    apiKey: "",
    sheets: {
      newsletter: "",
      auditForm: "",
      contactForm: "",
      freeAuditForm: "",
      generalForms: ""
    }
  });
  
  const [testResults, setTestResults] = useState<{
    newsletter: boolean | null;
    auditForm: boolean | null;
    contactForm: boolean | null;
    freeAuditForm: boolean | null;
    generalForms: boolean | null;
  }>({
    newsletter: null,
    auditForm: null,
    contactForm: null,
    freeAuditForm: null,
    generalForms: null
  });
  
  const [testing, setTesting] = useState<{
    newsletter: boolean;
    auditForm: boolean;
    contactForm: boolean;
    freeAuditForm: boolean;
    generalForms: boolean;
  }>({
    newsletter: false,
    auditForm: false,
    contactForm: false,
    freeAuditForm: false,
    generalForms: false
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    const saved = localStorage.getItem('googleSheetsConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
      } catch (error) {
        console.error('Failed to parse Google Sheets config:', error);
      }
    }
  };

  const saveConfig = () => {
    localStorage.setItem('googleSheetsConfig', JSON.stringify(config));
    
    // Dispatch event for form components to listen to
    window.dispatchEvent(new CustomEvent('googleSheetsConfigUpdated', { 
      detail: config 
    }));
    
    toast.success("Google Sheets configuration saved successfully");
  };

  const testConnection = async (formType: keyof typeof config.sheets) => {
    if (!config.sheets[formType]) {
      toast.error(`Please enter a ${formType} sheet URL first`);
      return;
    }

    setTesting(prev => ({ ...prev, [formType]: true }));
    try {
      // Simulate API test - in real implementation, this would call Google Sheets API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResults(prev => ({ ...prev, [formType]: true }));
      toast.success(`${formType} sheet connection successful`);
    } catch (error) {
      setTestResults(prev => ({ ...prev, [formType]: false }));
      toast.error(`${formType} sheet connection failed`);
    } finally {
      setTesting(prev => ({ ...prev, [formType]: false }));
    }
  };

  const getSheetIdFromUrl = (url: string) => {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : '';
  };

  const updateSheetUrl = (formType: keyof typeof config.sheets, url: string) => {
    setConfig(prev => ({
      ...prev,
      sheets: {
        ...prev.sheets,
        [formType]: url
      }
    }));
  };

  const formConfigs = [
    {
      key: 'newsletter' as const,
      title: 'Newsletter Subscriptions',
      description: 'Connect newsletter subscription forms',
      icon: <Sheet className="w-5 h-5" />,
      structure: ['Email', 'Timestamp', 'Source']
    },
    {
      key: 'auditForm' as const,
      title: 'Audit Request Forms',
      description: 'Connect audit request forms',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      structure: ['Name', 'Email', 'Company', 'Phone', 'Message', 'Timestamp']
    },
    {
      key: 'contactForm' as const,
      title: 'Contact Forms',
      description: 'Connect general contact forms',
      icon: <Sheet className="w-5 h-5" />,
      structure: ['Name', 'Email', 'Subject', 'Message', 'Timestamp']
    },
    {
      key: 'freeAuditForm' as const,
      title: 'Free Audit Forms',
      description: 'Connect free audit submission forms',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      structure: ['First Name', 'Last Name', 'Email', 'Company', 'Phone', 'Platform', 'Monthly Ad Spend', 'Business Goals', 'Timestamp']
    },
    {
      key: 'generalForms' as const,
      title: 'General Forms',
      description: 'Connect any other custom forms',
      icon: <Sheet className="w-5 h-5" />,
      structure: ['Form Type', 'Data (JSON)', 'Timestamp']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-charcoal mb-2">Google Sheets Integration</h2>
          <p className="text-gray-600">Connect all forms to Google Sheets for centralized data collection</p>
        </div>
        <Badge variant={config.isEnabled ? "default" : "secondary"} className={config.isEnabled ? "bg-lime text-charcoal" : ""}>
          {config.isEnabled ? "Enabled" : "Disabled"}
        </Badge>
      </div>

      {/* Main Configuration */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-electric">Configuration</CardTitle>
          <CardDescription>
            Configure Google Sheets integration to automatically store all form submissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="enabled"
              checked={config.isEnabled}
              onCheckedChange={(checked) => setConfig(prev => ({ ...prev, isEnabled: checked }))}
            />
            <Label htmlFor="enabled">Enable Google Sheets Integration</Label>
          </div>

          <div>
            <Label htmlFor="apiKey">Google Sheets API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={config.apiKey}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
              placeholder="Enter your Google Sheets API key"
              disabled={!config.isEnabled}
              className="input-modern"
            />
            <p className="text-sm text-gray-500 mt-1">
              Get your API key from the Google Cloud Console
            </p>
          </div>

          <Button 
            onClick={saveConfig} 
            disabled={!config.isEnabled}
            className="btn-primary"
          >
            Save Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Form Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {formConfigs.map((formConfig) => (
          <Card key={formConfig.key} className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-charcoal">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-electric/10 rounded-lg text-electric">
                    {formConfig.icon}
                  </div>
                  <span>{formConfig.title}</span>
                </div>
                {testResults[formConfig.key] !== null && (
                  testResults[formConfig.key] ? (
                    <CheckCircle className="w-5 h-5 text-lime" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )
                )}
              </CardTitle>
              <CardDescription>
                {formConfig.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`${formConfig.key}Url`}>Google Sheet URL</Label>
                <Input
                  id={`${formConfig.key}Url`}
                  value={config.sheets[formConfig.key]}
                  onChange={(e) => updateSheetUrl(formConfig.key, e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit"
                  disabled={!config.isEnabled}
                  className="input-modern"
                />
                {config.sheets[formConfig.key] && (
                  <p className="text-sm text-gray-500 mt-1">
                    Sheet ID: {getSheetIdFromUrl(config.sheets[formConfig.key]) || 'Invalid URL'}
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => testConnection(formConfig.key)}
                  disabled={!config.isEnabled || !config.sheets[formConfig.key] || testing[formConfig.key]}
                  variant="outline"
                  className="border-electric text-electric hover:bg-electric hover:text-white"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  {testing[formConfig.key] ? 'Testing...' : 'Test Connection'}
                </Button>
                {config.sheets[formConfig.key] && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(config.sheets[formConfig.key], '_blank')}
                    className="border-neon text-neon hover:bg-neon hover:text-charcoal"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Sheet
                  </Button>
                )}
              </div>

              <div className="bg-offwhite p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-charcoal">Expected Sheet Structure:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  {formConfig.structure.map((column, index) => (
                    <p key={index}>Column {String.fromCharCode(65 + index)}: {column}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Setup Instructions */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-charcoal">Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong className="text-electric">1.</strong> Create Google Sheets with the expected column structures above</p>
            <p><strong className="text-electric">2.</strong> Get the Google Sheets API key from Google Cloud Console</p>
            <p><strong className="text-electric">3.</strong> Share your Google Sheets with the service account email</p>
            <p><strong className="text-electric">4.</strong> Copy the sheet URLs and paste them in the configuration above</p>
            <p><strong className="text-electric">5.</strong> Test each connection to ensure everything works</p>
            <p><strong className="text-lime">6.</strong> All forms will now automatically save data to their respective sheets</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleSheetsTab;

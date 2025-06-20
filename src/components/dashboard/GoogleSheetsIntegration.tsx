
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TestTube, CheckCircle, XCircle, Sheet, Database } from "lucide-react";
import { toast } from "sonner";

interface FormConfig {
  isEnabled: boolean;
  sheetUrl: string;
  lastTested: string | null;
  testResult: boolean | null;
}

interface GoogleSheetsConfig {
  isEnabled: boolean;
  apiKey: string;
  forms: {
    newsletter: FormConfig;
    freeAudit: FormConfig;
    contact: FormConfig;
    general: FormConfig;
  };
}

const GoogleSheetsIntegration = () => {
  const [config, setConfig] = useState<GoogleSheetsConfig>({
    isEnabled: false,
    apiKey: "",
    forms: {
      newsletter: { isEnabled: false, sheetUrl: "", lastTested: null, testResult: null },
      freeAudit: { isEnabled: false, sheetUrl: "", lastTested: null, testResult: null },
      contact: { isEnabled: false, sheetUrl: "", lastTested: null, testResult: null },
      general: { isEnabled: false, sheetUrl: "", lastTested: null, testResult: null }
    }
  });

  const [testingForm, setTestingForm] = useState<string | null>(null);

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

  const testConnection = async (formType: keyof typeof config.forms) => {
    const formConfig = config.forms[formType];
    if (!formConfig.sheetUrl) {
      toast.error("Please enter a sheet URL first");
      return;
    }

    setTestingForm(formType);
    try {
      // Simulate API test - in real implementation, this would call Google Sheets API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newConfig = { ...config };
      newConfig.forms[formType].testResult = true;
      newConfig.forms[formType].lastTested = new Date().toISOString();
      setConfig(newConfig);
      
      toast.success(`${formType} sheet connection successful`);
    } catch (error) {
      const newConfig = { ...config };
      newConfig.forms[formType].testResult = false;
      newConfig.forms[formType].lastTested = new Date().toISOString();
      setConfig(newConfig);
      
      toast.error(`${formType} sheet connection failed`);
    } finally {
      setTestingForm(null);
    }
  };

  const updateFormConfig = (formType: keyof typeof config.forms, field: keyof FormConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      forms: {
        ...prev.forms,
        [formType]: {
          ...prev.forms[formType],
          [field]: value
        }
      }
    }));
  };

  const getSheetIdFromUrl = (url: string) => {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : '';
  };

  const renderFormConfig = (formType: keyof typeof config.forms, title: string, description: string, columns: string[]) => {
    const formConfig = config.forms[formType];
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Sheet className="w-5 h-5 mr-2" />
              {title}
            </div>
            {formConfig.testResult !== null && (
              formConfig.testResult ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )
            )}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={formConfig.isEnabled}
              onCheckedChange={(checked) => updateFormConfig(formType, 'isEnabled', checked)}
              disabled={!config.isEnabled}
            />
            <Label>Enable {title} Integration</Label>
          </div>

          <div>
            <Label htmlFor={`${formType}Url`}>Google Sheet URL</Label>
            <Input
              id={`${formType}Url`}
              value={formConfig.sheetUrl}
              onChange={(e) => updateFormConfig(formType, 'sheetUrl', e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit"
              disabled={!config.isEnabled || !formConfig.isEnabled}
            />
            {formConfig.sheetUrl && (
              <p className="text-sm text-gray-500 mt-1">
                Sheet ID: {getSheetIdFromUrl(formConfig.sheetUrl) || 'Invalid URL'}
              </p>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => testConnection(formType)}
              disabled={!config.isEnabled || !formConfig.isEnabled || !formConfig.sheetUrl || testingForm === formType}
              variant="outline"
              size="sm"
            >
              <TestTube className="w-4 h-4 mr-2" />
              {testingForm === formType ? 'Testing...' : 'Test Connection'}
            </Button>
            {formConfig.sheetUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(formConfig.sheetUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Sheet
              </Button>
            )}
          </div>

          {formConfig.lastTested && (
            <p className="text-xs text-gray-500">
              Last tested: {new Date(formConfig.lastTested).toLocaleString()}
            </p>
          )}

          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Expected Sheet Structure:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              {columns.map((column, index) => (
                <p key={index}>Column {String.fromCharCode(65 + index)}: {column}</p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Google Sheets Integration</h2>
          <p className="text-gray-600">Connect all your forms to Google Sheets for automatic data collection</p>
        </div>
        <Badge variant={config.isEnabled ? "default" : "secondary"}>
          {config.isEnabled ? "Enabled" : "Disabled"}
        </Badge>
      </div>

      {/* Main Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Master Configuration
          </CardTitle>
          <CardDescription>
            Configure the main Google Sheets integration settings
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
            />
            <p className="text-sm text-gray-500 mt-1">
              Get your API key from the Google Cloud Console
            </p>
          </div>

          <Button onClick={saveConfig} disabled={!config.isEnabled}>
            Save Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Individual Form Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderFormConfig(
          'newsletter',
          'Newsletter Subscriptions',
          'Connect newsletter signup forms to Google Sheets',
          ['Email', 'Timestamp', 'Source']
        )}

        {renderFormConfig(
          'freeAudit',
          'Free Audit Forms',
          'Connect free audit request forms to Google Sheets',
          ['Name', 'Email', 'Company', 'Phone', 'Platform', 'Ad Spend', 'Goals', 'Timestamp']
        )}

        {renderFormConfig(
          'contact',
          'Contact Forms',
          'Connect general contact forms to Google Sheets',
          ['Name', 'Email', 'Company', 'Phone', 'Message', 'Timestamp']
        )}

        {renderFormConfig(
          'general',
          'General Forms',
          'Connect other forms to Google Sheets',
          ['Name', 'Email', 'Message', 'Timestamp', 'Form Type']
        )}
      </div>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>1.</strong> Create Google Sheets with the expected column structure for each form type</p>
            <p><strong>2.</strong> Get the Google Sheets API key from Google Cloud Console</p>
            <p><strong>3.</strong> Share your Google Sheets with the service account email</p>
            <p><strong>4.</strong> Copy the sheet URLs and paste them in the configuration above</p>
            <p><strong>5.</strong> Enable each form integration and test the connections</p>
            <p><strong>6.</strong> Save the configuration to activate the integration</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleSheetsIntegration;

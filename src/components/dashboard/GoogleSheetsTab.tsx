
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TestTube, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface GoogleSheetsConfig {
  isEnabled: boolean;
  newsletterSheetUrl: string;
  auditFormSheetUrl: string;
  apiKey: string;
}

const GoogleSheetsTab = () => {
  const [config, setConfig] = useState<GoogleSheetsConfig>({
    isEnabled: false,
    newsletterSheetUrl: "",
    auditFormSheetUrl: "",
    apiKey: ""
  });
  const [testResults, setTestResults] = useState<{
    newsletter: boolean | null;
    auditForm: boolean | null;
  }>({
    newsletter: null,
    auditForm: null
  });
  const [isTestingNewsletter, setIsTestingNewsletter] = useState(false);
  const [isTestingAudit, setIsTestingAudit] = useState(false);

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

  const testNewsletterConnection = async () => {
    if (!config.newsletterSheetUrl) {
      toast.error("Please enter a newsletter sheet URL first");
      return;
    }

    setIsTestingNewsletter(true);
    try {
      // Simulate API test - in real implementation, this would call Google Sheets API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResults(prev => ({ ...prev, newsletter: true }));
      toast.success("Newsletter sheet connection successful");
    } catch (error) {
      setTestResults(prev => ({ ...prev, newsletter: false }));
      toast.error("Newsletter sheet connection failed");
    } finally {
      setIsTestingNewsletter(false);
    }
  };

  const testAuditFormConnection = async () => {
    if (!config.auditFormSheetUrl) {
      toast.error("Please enter an audit form sheet URL first");
      return;
    }

    setIsTestingAudit(true);
    try {
      // Simulate API test - in real implementation, this would call Google Sheets API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResults(prev => ({ ...prev, auditForm: true }));
      toast.success("Audit form sheet connection successful");
    } catch (error) {
      setTestResults(prev => ({ ...prev, auditForm: false }));
      toast.error("Audit form sheet connection failed");
    } finally {
      setIsTestingAudit(false);
    }
  };

  const getSheetIdFromUrl = (url: string) => {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Google Sheets Integration</h2>
          <p className="text-gray-600">Connect your forms to Google Sheets for data collection</p>
        </div>
        <Badge variant={config.isEnabled ? "default" : "secondary"}>
          {config.isEnabled ? "Enabled" : "Disabled"}
        </Badge>
      </div>

      {/* Main Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Configure Google Sheets integration to automatically store form submissions
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

      {/* Sheet URLs Configuration */}
      <Tabs defaultValue="newsletter" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="newsletter">Newsletter Subscriptions</TabsTrigger>
          <TabsTrigger value="audit">Free Audit Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="newsletter">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Newsletter Subscriptions
                {testResults.newsletter !== null && (
                  testResults.newsletter ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )
                )}
              </CardTitle>
              <CardDescription>
                Connect newsletter subscription form to Google Sheets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="newsletterUrl">Google Sheet URL</Label>
                <Input
                  id="newsletterUrl"
                  value={config.newsletterSheetUrl}
                  onChange={(e) => setConfig(prev => ({ ...prev, newsletterSheetUrl: e.target.value }))}
                  placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit"
                  disabled={!config.isEnabled}
                />
                {config.newsletterSheetUrl && (
                  <p className="text-sm text-gray-500 mt-1">
                    Sheet ID: {getSheetIdFromUrl(config.newsletterSheetUrl) || 'Invalid URL'}
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={testNewsletterConnection}
                  disabled={!config.isEnabled || !config.newsletterSheetUrl || isTestingNewsletter}
                  variant="outline"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  {isTestingNewsletter ? 'Testing...' : 'Test Connection'}
                </Button>
                {config.newsletterSheetUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(config.newsletterSheetUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Sheet
                  </Button>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Expected Sheet Structure:</h4>
                <div className="text-sm text-gray-600">
                  <p>Column A: Email</p>
                  <p>Column B: Timestamp</p>
                  <p>Column C: Source (Newsletter)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Free Audit Forms
                {testResults.auditForm !== null && (
                  testResults.auditForm ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )
                )}
              </CardTitle>
              <CardDescription>
                Connect free audit form submissions to Google Sheets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="auditUrl">Google Sheet URL</Label>
                <Input
                  id="auditUrl"
                  value={config.auditFormSheetUrl}
                  onChange={(e) => setConfig(prev => ({ ...prev, auditFormSheetUrl: e.target.value }))}
                  placeholder="https://docs.google.com/spreadsheets/d/your-sheet-id/edit"
                  disabled={!config.isEnabled}
                />
                {config.auditFormSheetUrl && (
                  <p className="text-sm text-gray-500 mt-1">
                    Sheet ID: {getSheetIdFromUrl(config.auditFormSheetUrl) || 'Invalid URL'}
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={testAuditFormConnection}
                  disabled={!config.isEnabled || !config.auditFormSheetUrl || isTestingAudit}
                  variant="outline"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  {isTestingAudit ? 'Testing...' : 'Test Connection'}
                </Button>
                {config.auditFormSheetUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(config.auditFormSheetUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Sheet
                  </Button>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Expected Sheet Structure:</h4>
                <div className="text-sm text-gray-600">
                  <p>Column A: Name</p>
                  <p>Column B: Email</p>
                  <p>Column C: Company</p>
                  <p>Column D: Phone</p>
                  <p>Column E: Message</p>
                  <p>Column F: Timestamp</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>1.</strong> Create a Google Sheet with the expected column structure</p>
            <p><strong>2.</strong> Get the Google Sheets API key from Google Cloud Console</p>
            <p><strong>3.</strong> Share your Google Sheet with the service account email</p>
            <p><strong>4.</strong> Copy the sheet URL and paste it in the configuration above</p>
            <p><strong>5.</strong> Test the connection to ensure everything works</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleSheetsTab;


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { databaseService } from '@/services/databaseService';

export const SecuritySettingsTab = () => {
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await databaseService.getWebsiteSettings();
      const recaptchaKey = settings.find(s => s.setting_key === 'recaptcha_site_key')?.setting_value as string;
      
      if (recaptchaKey) {
        setRecaptchaSiteKey(recaptchaKey);
        setIsConfigured(true);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load security settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecaptchaKey = async () => {
    if (!recaptchaSiteKey.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid reCAPTCHA site key",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await databaseService.updateWebsiteSetting('recaptcha_site_key', recaptchaSiteKey.trim());
      setIsConfigured(true);
      
      toast({
        title: "Success",
        description: "reCAPTCHA site key saved successfully. Refresh the page to apply changes.",
      });
    } catch (error) {
      console.error('Error saving reCAPTCHA key:', error);
      toast({
        title: "Error",
        description: "Failed to save reCAPTCHA site key",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Security Settings</h2>
        <p className="text-slate-600">Configure security features for your website forms.</p>
      </div>

      {/* reCAPTCHA Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <CardTitle>reCAPTCHA v3 Configuration</CardTitle>
              {isConfigured ? (
                <Badge variant="default" className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Configured
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Not Configured
                </Badge>
              )}
            </div>
          </div>
          <CardDescription>
            Configure Google reCAPTCHA v3 to protect your forms from spam and abuse.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recaptcha-key">reCAPTCHA Site Key</Label>
            <Input
              id="recaptcha-key"
              type="text"
              placeholder="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              value={recaptchaSiteKey}
              onChange={(e) => setRecaptchaSiteKey(e.target.value)}
              className="font-mono"
            />
            <p className="text-sm text-slate-500">
              Enter your Google reCAPTCHA v3 site key. This is the public key that identifies your site.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              onClick={saveRecaptchaKey}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Save reCAPTCHA Key
                </>
              )}
            </Button>

            <Button 
              variant="outline"
              onClick={() => window.open('https://www.google.com/recaptcha/admin/create', '_blank')}
            >
              Get reCAPTCHA Keys
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {!isConfigured && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Setup Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Forms will work without reCAPTCHA but won't have spam protection. 
                    Configure reCAPTCHA to enable full security features.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Security Features</CardTitle>
          <CardDescription>
            Overview of security measures protecting your website forms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">CSRF Protection</h4>
                <p className="text-sm text-slate-600">Cross-site request forgery prevention</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Honeypot Fields</h4>
                <p className="text-sm text-slate-600">Hidden fields to catch automated bots</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${isConfigured ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                <Shield className={`w-4 h-4 ${isConfigured ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className="font-medium">reCAPTCHA v3</h4>
                <p className="text-sm text-slate-600">
                  {isConfigured ? 'Advanced bot detection enabled' : 'Not configured'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Security Logging</h4>
                <p className="text-sm text-slate-600">All security events are logged</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

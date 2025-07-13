
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Save, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface SecuritySettings {
  honeypot_enabled: boolean;
  csrf_protection: boolean;
  recaptcha_enabled: boolean;
  recaptcha_site_key: string;
  recaptcha_secret_key: string;
  rate_limiting: boolean;
  max_requests_per_minute: number;
  ip_blocking: boolean;
  blocked_ips: string[];
  user_agent_filtering: boolean;
  suspicious_patterns: string[];
}

const SecuritySettingsTab = () => {
  const [settings, setSettings] = useState<SecuritySettings>({
    honeypot_enabled: true,
    csrf_protection: true,
    recaptcha_enabled: false,
    recaptcha_site_key: '',
    recaptcha_secret_key: '',
    rate_limiting: true,
    max_requests_per_minute: 10,
    ip_blocking: false,
    blocked_ips: [],
    user_agent_filtering: true,
    suspicious_patterns: ['bot', 'crawler', 'spider']
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('setting_key', 'security_settings')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data && data.setting_value) {
        const securityData = data.setting_value as Record<string, any>;
        setSettings({
          honeypot_enabled: securityData.honeypot_enabled ?? true,
          csrf_protection: securityData.csrf_protection ?? true,
          recaptcha_enabled: securityData.recaptcha_enabled ?? false,
          recaptcha_site_key: securityData.recaptcha_site_key ?? '',
          recaptcha_secret_key: securityData.recaptcha_secret_key ?? '',
          rate_limiting: securityData.rate_limiting ?? true,
          max_requests_per_minute: securityData.max_requests_per_minute ?? 10,
          ip_blocking: securityData.ip_blocking ?? false,
          blocked_ips: securityData.blocked_ips ?? [],
          user_agent_filtering: securityData.user_agent_filtering ?? true,
          suspicious_patterns: securityData.suspicious_patterns ?? ['bot', 'crawler', 'spider']
        });
      }
    } catch (error) {
      console.error('Error loading security settings:', error);
      toast({
        title: "Error",
        description: "Failed to load security settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('website_settings')
        .upsert({
          setting_key: 'security_settings',
          setting_value: settings as any,
          setting_type: 'security'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Security settings saved successfully",
      });
    } catch (error) {
      console.error('Error saving security settings:', error);
      toast({
        title: "Error",
        description: "Failed to save security settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const updateSetting = (key: keyof SecuritySettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading security settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Security Settings</CardTitle>
                <CardDescription>Configure form security and protection measures</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={loadSettings} size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={saveSettings} disabled={saving} size="sm">
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="protection" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="protection">Protection</TabsTrigger>
              <TabsTrigger value="recaptcha">reCAPTCHA</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="protection" className="space-y-6">
              <div className="grid gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Label className="text-base font-medium">Honeypot Protection</Label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Add hidden fields to detect bot submissions
                    </p>
                  </div>
                  <Switch
                    checked={settings.honeypot_enabled}
                    onCheckedChange={(value) => updateSetting('honeypot_enabled', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <Label className="text-base font-medium">CSRF Protection</Label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Protect against cross-site request forgery attacks
                    </p>
                  </div>
                  <Switch
                    checked={settings.csrf_protection}
                    onCheckedChange={(value) => updateSetting('csrf_protection', value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <Label className="text-base font-medium">Rate Limiting</Label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Limit form submissions per minute per IP
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={settings.max_requests_per_minute}
                      onChange={(e) => updateSetting('max_requests_per_minute', parseInt(e.target.value) || 10)}
                      className="w-20"
                      min="1"
                      max="100"
                    />
                    <Switch
                      checked={settings.rate_limiting}
                      onCheckedChange={(value) => updateSetting('rate_limiting', value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-500" />
                      <Label className="text-base font-medium">User Agent Filtering</Label>
                    </div>
                    <p className="text-sm text-gray-600">
                      Block suspicious user agents and bots
                    </p>
                  </div>
                  <Switch
                    checked={settings.user_agent_filtering}
                    onCheckedChange={(value) => updateSetting('user_agent_filtering', value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recaptcha" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Enable reCAPTCHA v3</Label>
                    <p className="text-sm text-gray-600">
                      Use Google reCAPTCHA to verify human users
                    </p>
                  </div>
                  <Switch
                    checked={settings.recaptcha_enabled}
                    onCheckedChange={(value) => updateSetting('recaptcha_enabled', value)}
                  />
                </div>

                {settings.recaptcha_enabled && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recaptcha_site_key">Site Key</Label>
                      <Input
                        id="recaptcha_site_key"
                        value={settings.recaptcha_site_key}
                        onChange={(e) => updateSetting('recaptcha_site_key', e.target.value)}
                        placeholder="Enter your reCAPTCHA site key"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recaptcha_secret_key">Secret Key</Label>
                      <Input
                        id="recaptcha_secret_key"
                        type="password"
                        value={settings.recaptcha_secret_key}
                        onChange={(e) => updateSetting('recaptcha_secret_key', e.target.value)}
                        placeholder="Enter your reCAPTCHA secret key"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900">reCAPTCHA Setup</p>
                          <p className="text-blue-700">
                            Get your keys from the{' '}
                            <a 
                              href="https://www.google.com/recaptcha/admin" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="underline hover:no-underline"
                            >
                              Google reCAPTCHA console
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">IP Blocking</Label>
                    <p className="text-sm text-gray-600">
                      Block specific IP addresses from submitting forms
                    </p>
                  </div>
                  <Switch
                    checked={settings.ip_blocking}
                    onCheckedChange={(value) => updateSetting('ip_blocking', value)}
                  />
                </div>

                {settings.ip_blocking && (
                  <div className="space-y-2">
                    <Label>Blocked IP Addresses</Label>
                    <div className="space-y-2">
                      {settings.blocked_ips.map((ip, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={ip}
                            onChange={(e) => {
                              const newIps = [...settings.blocked_ips];
                              newIps[index] = e.target.value;
                              updateSetting('blocked_ips', newIps);
                            }}
                            placeholder="192.168.1.1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newIps = settings.blocked_ips.filter((_, i) => i !== index);
                              updateSetting('blocked_ips', newIps);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => updateSetting('blocked_ips', [...settings.blocked_ips, ''])}
                      >
                        Add IP Address
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Suspicious Patterns</Label>
                  <p className="text-sm text-gray-600">
                    User agent patterns that should be flagged as suspicious
                  </p>
                  <div className="space-y-2">
                    {settings.suspicious_patterns.map((pattern, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={pattern}
                          onChange={(e) => {
                            const newPatterns = [...settings.suspicious_patterns];
                            newPatterns[index] = e.target.value;
                            updateSetting('suspicious_patterns', newPatterns);
                          }}
                          placeholder="bot, crawler, spider"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newPatterns = settings.suspicious_patterns.filter((_, i) => i !== index);
                            updateSetting('suspicious_patterns', newPatterns);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => updateSetting('suspicious_patterns', [...settings.suspicious_patterns, ''])}
                    >
                      Add Pattern
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettingsTab;

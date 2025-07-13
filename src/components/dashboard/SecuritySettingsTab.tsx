
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Key, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface SecuritySettings {
  honeypot_enabled: boolean;
  csrf_protection: boolean;
  recaptcha_enabled: boolean;
  recaptcha_site_key: string;
  recaptcha_secret_key: string;
  rate_limiting: boolean;
  max_submissions_per_hour: number;
  ip_blocking: boolean;
  blocked_ips: string[];
  form_validation_rules: {
    min_name_length: number;
    max_name_length: number;
    required_fields: string[];
    email_domains_blocked: string[];
  };
}

const SecuritySettingsTab = () => {
  const [settings, setSettings] = useState<SecuritySettings>({
    honeypot_enabled: true,
    csrf_protection: true,
    recaptcha_enabled: false,
    recaptcha_site_key: '',
    recaptcha_secret_key: '',
    rate_limiting: true,
    max_submissions_per_hour: 10,
    ip_blocking: false,
    blocked_ips: [],
    form_validation_rules: {
      min_name_length: 2,
      max_name_length: 50,
      required_fields: ['name', 'email'],
      email_domains_blocked: []
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newBlockedIp, setNewBlockedIp] = useState('');
  const [newBlockedDomain, setNewBlockedDomain] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('setting_key', 'form_security')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data && data.setting_value) {
        setSettings({ ...settings, ...data.setting_value });
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
          setting_key: 'form_security',
          setting_value: settings,
          setting_type: 'security'
        });

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: "Security settings have been updated successfully",
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

  const addBlockedIp = () => {
    if (newBlockedIp && !settings.blocked_ips.includes(newBlockedIp)) {
      setSettings({
        ...settings,
        blocked_ips: [...settings.blocked_ips, newBlockedIp]
      });
      setNewBlockedIp('');
    }
  };

  const removeBlockedIp = (ip: string) => {
    setSettings({
      ...settings,
      blocked_ips: settings.blocked_ips.filter(blockedIp => blockedIp !== ip)
    });
  };

  const addBlockedDomain = () => {
    if (newBlockedDomain && !settings.form_validation_rules.email_domains_blocked.includes(newBlockedDomain)) {
      setSettings({
        ...settings,
        form_validation_rules: {
          ...settings.form_validation_rules,
          email_domains_blocked: [...settings.form_validation_rules.email_domains_blocked, newBlockedDomain]
        }
      });
      setNewBlockedDomain('');
    }
  };

  const removeBlockedDomain = (domain: string) => {
    setSettings({
      ...settings,
      form_validation_rules: {
        ...settings.form_validation_rules,
        email_domains_blocked: settings.form_validation_rules.email_domains_blocked.filter(d => d !== domain)
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Honeypot Protection</CardTitle>
            <Shield className={`h-4 w-4 ${settings.honeypot_enabled ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <Badge variant={settings.honeypot_enabled ? 'default' : 'destructive'}>
              {settings.honeypot_enabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CSRF Protection</CardTitle>
            <CheckCircle className={`h-4 w-4 ${settings.csrf_protection ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <Badge variant={settings.csrf_protection ? 'default' : 'destructive'}>
              {settings.csrf_protection ? 'Enabled' : 'Disabled'}
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Limiting</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${settings.rate_limiting ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <Badge variant={settings.rate_limiting ? 'default' : 'destructive'}>
              {settings.rate_limiting ? `${settings.max_submissions_per_hour}/hour` : 'Disabled'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Basic Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Security Settings</CardTitle>
          <CardDescription>
            Configure basic form protection mechanisms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="honeypot">Honeypot Protection</Label>
              <p className="text-sm text-muted-foreground">
                Hide form fields to catch automated bot submissions
              </p>
            </div>
            <Switch
              id="honeypot"
              checked={settings.honeypot_enabled}
              onCheckedChange={(checked) => setSettings({...settings, honeypot_enabled: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="csrf">CSRF Protection</Label>
              <p className="text-sm text-muted-foreground">
                Protect against cross-site request forgery attacks
              </p>
            </div>
            <Switch
              id="csrf"
              checked={settings.csrf_protection}
              onCheckedChange={(checked) => setSettings({...settings, csrf_protection: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="rateLimit">Rate Limiting</Label>
              <p className="text-sm text-muted-foreground">
                Limit form submissions per IP address per hour
              </p>
            </div>
            <Switch
              id="rateLimit"
              checked={settings.rate_limiting}
              onCheckedChange={(checked) => setSettings({...settings, rate_limiting: checked})}
            />
          </div>
          
          {settings.rate_limiting && (
            <div>
              <Label htmlFor="maxSubmissions">Max Submissions Per Hour</Label>
              <Input
                id="maxSubmissions"
                type="number"
                value={settings.max_submissions_per_hour}
                onChange={(e) => setSettings({
                  ...settings,
                  max_submissions_per_hour: parseInt(e.target.value) || 10
                })}
                className="w-24"
                min="1"
                max="100"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* reCAPTCHA Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            reCAPTCHA Settings
          </CardTitle>
          <CardDescription>
            Configure Google reCAPTCHA v3 for advanced bot protection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="recaptcha">Enable reCAPTCHA</Label>
              <p className="text-sm text-muted-foreground">
                Use Google reCAPTCHA v3 to score form submissions
              </p>
            </div>
            <Switch
              id="recaptcha"
              checked={settings.recaptcha_enabled}
              onCheckedChange={(checked) => setSettings({...settings, recaptcha_enabled: checked})}
            />
          </div>
          
          {settings.recaptcha_enabled && (
            <>
              <div>
                <Label htmlFor="siteKey">Site Key</Label>
                <Input
                  id="siteKey"
                  value={settings.recaptcha_site_key}
                  onChange={(e) => setSettings({...settings, recaptcha_site_key: e.target.value})}
                  placeholder="Your reCAPTCHA site key"
                />
              </div>
              
              <div>
                <Label htmlFor="secretKey">Secret Key</Label>
                <Input
                  id="secretKey"
                  type="password"
                  value={settings.recaptcha_secret_key}
                  onChange={(e) => setSettings({...settings, recaptcha_secret_key: e.target.value})}
                  placeholder="Your reCAPTCHA secret key"
                />
              </div>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Get your reCAPTCHA keys from the Google reCAPTCHA Admin Console
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
      </Card>

      {/* IP Blocking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            IP Address Blocking
          </CardTitle>
          <CardDescription>
            Block specific IP addresses from submitting forms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ipBlocking">Enable IP Blocking</Label>
              <p className="text-sm text-muted-foreground">
                Block form submissions from specific IP addresses
              </p>
            </div>
            <Switch
              id="ipBlocking"
              checked={settings.ip_blocking}
              onCheckedChange={(checked) => setSettings({...settings, ip_blocking: checked})}
            />
          </div>
          
          {settings.ip_blocking && (
            <>
              <div className="flex gap-2">
                <Input
                  placeholder="IP address to block"
                  value={newBlockedIp}
                  onChange={(e) => setNewBlockedIp(e.target.value)}
                />
                <Button onClick={addBlockedIp}>Add</Button>
              </div>
              
              {settings.blocked_ips.length > 0 && (
                <div>
                  <Label>Blocked IP Addresses</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {settings.blocked_ips.map((ip) => (
                      <Badge key={ip} variant="destructive" className="cursor-pointer" onClick={() => removeBlockedIp(ip)}>
                        {ip} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Form Validation Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Form Validation Rules</CardTitle>
          <CardDescription>
            Configure validation rules for form fields
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minNameLength">Minimum Name Length</Label>
              <Input
                id="minNameLength"
                type="number"
                value={settings.form_validation_rules.min_name_length}
                onChange={(e) => setSettings({
                  ...settings,
                  form_validation_rules: {
                    ...settings.form_validation_rules,
                    min_name_length: parseInt(e.target.value) || 2
                  }
                })}
                min="1"
                max="10"
              />
            </div>
            
            <div>
              <Label htmlFor="maxNameLength">Maximum Name Length</Label>
              <Input
                id="maxNameLength"
                type="number"
                value={settings.form_validation_rules.max_name_length}
                onChange={(e) => setSettings({
                  ...settings,
                  form_validation_rules: {
                    ...settings.form_validation_rules,
                    max_name_length: parseInt(e.target.value) || 50
                  }
                })}
                min="10"
                max="100"
              />
            </div>
          </div>
          
          <div>
            <Label>Blocked Email Domains</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="domain.com"
                value={newBlockedDomain}
                onChange={(e) => setNewBlockedDomain(e.target.value)}
              />
              <Button onClick={addBlockedDomain}>Add</Button>
            </div>
            
            {settings.form_validation_rules.email_domains_blocked.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {settings.form_validation_rules.email_domains_blocked.map((domain) => (
                  <Badge key={domain} variant="destructive" className="cursor-pointer" onClick={() => removeBlockedDomain(domain)}>
                    {domain} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={saving}>
          {saving ? 'Saving...' : 'Save Security Settings'}
        </Button>
      </div>
    </div>
  );
};

export default SecuritySettingsTab;

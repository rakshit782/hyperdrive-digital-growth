
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Code,
  Save,
  Plus,
  Trash2,
  Edit,
  Globe,
  Facebook,
  BarChart3,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface TrackingConfig {
  facebook_pixel?: {
    pixel_id: string;
    access_token?: string;
    test_event_code?: string;
    is_active: boolean;
  };
  google_analytics?: {
    measurement_id: string;
    is_active: boolean;
    enable_enhanced_measurement: boolean;
    enable_conversion_tracking: boolean;
    custom_events: boolean;
  };
  google_search_console?: {
    site_url: string;
    verification_code?: string;
    is_active: boolean;
  };
  google_tag_manager?: {
    container_id: string;
    is_active: boolean;
  };
}

const TrackingManagementTab = () => {
  const [trackingConfig, setTrackingConfig] = useState<TrackingConfig>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const loadTrackingConfig = async () => {
    try {
      setLoading(true);
      
      // Load Facebook Pixel config
      const { data: fbData } = await supabase
        .from('facebook_pixel_config')
        .select('*')
        .limit(1)
        .single();

      // Load Google Analytics config
      const { data: gaData } = await supabase
        .from('google_analytics_config')
        .select('*')
        .limit(1)
        .single();

      // Load Google Search Console config
      const { data: gscData } = await supabase
        .from('google_search_console_config')
        .select('*')
        .limit(1)
        .single();

      // Load Google Tag Manager config
      const { data: gtmData } = await supabase
        .from('google_tag_manager_config')
        .select('*')
        .limit(1)
        .single();

      setTrackingConfig({
        facebook_pixel: fbData ? {
          pixel_id: fbData.pixel_id,
          access_token: fbData.access_token,
          test_event_code: fbData.test_event_code,
          is_active: fbData.is_active
        } : undefined,
        google_analytics: gaData ? {
          measurement_id: gaData.measurement_id,
          is_active: gaData.is_active,
          enable_enhanced_measurement: gaData.enable_enhanced_measurement,
          enable_conversion_tracking: gaData.enable_conversion_tracking,
          custom_events: gaData.custom_events
        } : undefined,
        google_search_console: gscData ? {
          site_url: gscData.site_url,
          verification_code: gscData.verification_code,
          is_active: gscData.is_active
        } : undefined,
        google_tag_manager: gtmData ? {
          container_id: gtmData.container_id,
          is_active: gtmData.is_active
        } : undefined
      });

    } catch (error) {
      console.error('Error loading tracking config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTrackingConfig = async () => {
    try {
      setSaving(true);

      // Save Facebook Pixel config
      if (trackingConfig.facebook_pixel) {
        await supabase.from('facebook_pixel_config').upsert({
          pixel_id: trackingConfig.facebook_pixel.pixel_id,
          access_token: trackingConfig.facebook_pixel.access_token,
          test_event_code: trackingConfig.facebook_pixel.test_event_code,
          is_active: trackingConfig.facebook_pixel.is_active
        });
      }

      // Save Google Analytics config
      if (trackingConfig.google_analytics) {
        await supabase.from('google_analytics_config').upsert({
          measurement_id: trackingConfig.google_analytics.measurement_id,
          is_active: trackingConfig.google_analytics.is_active,
          enable_enhanced_measurement: trackingConfig.google_analytics.enable_enhanced_measurement,
          enable_conversion_tracking: trackingConfig.google_analytics.enable_conversion_tracking,
          custom_events: trackingConfig.google_analytics.custom_events
        });
      }

      // Save Google Search Console config
      if (trackingConfig.google_search_console) {
        await supabase.from('google_search_console_config').upsert({
          site_url: trackingConfig.google_search_console.site_url,
          verification_code: trackingConfig.google_search_console.verification_code,
          is_active: trackingConfig.google_search_console.is_active
        });
      }

      // Save Google Tag Manager config
      if (trackingConfig.google_tag_manager) {
        await supabase.from('google_tag_manager_config').upsert({
          container_id: trackingConfig.google_tag_manager.container_id,
          is_active: trackingConfig.google_tag_manager.is_active
        });
      }

      toast({
        title: "Success",
        description: "Tracking configuration saved successfully",
      });

    } catch (error) {
      console.error('Error saving tracking config:', error);
      toast({
        title: "Error",
        description: "Failed to save tracking configuration",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadTrackingConfig();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading tracking configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Tracking Management</CardTitle>
                <CardDescription>Configure tracking pixels and analytics</CardDescription>
              </div>
            </div>
            <Button onClick={saveTrackingConfig} disabled={saving} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save All'}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs defaultValue="facebook" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="facebook" className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook Pixel
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Google Analytics
              </TabsTrigger>
              <TabsTrigger value="console" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Console
              </TabsTrigger>
              <TabsTrigger value="tagmanager" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Tag Manager
              </TabsTrigger>
            </TabsList>

            <TabsContent value="facebook" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Facebook className="w-5 h-5" />
                    Facebook Pixel Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trackingConfig.facebook_pixel?.is_active || false}
                      onCheckedChange={(checked) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          facebook_pixel: {
                            ...prev.facebook_pixel,
                            pixel_id: prev.facebook_pixel?.pixel_id || '',
                            is_active: checked
                          }
                        }))
                      }
                    />
                    <Label>Enable Facebook Pixel</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="pixel_id">Pixel ID</Label>
                    <Input 
                      id="pixel_id"
                      value={trackingConfig.facebook_pixel?.pixel_id || ''}
                      onChange={(e) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          facebook_pixel: {
                            ...prev.facebook_pixel,
                            pixel_id: e.target.value,
                            is_active: prev.facebook_pixel?.is_active || false
                          }
                        }))
                      }
                      placeholder="Enter Facebook Pixel ID"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="access_token">Access Token (Optional)</Label>
                    <Input 
                      id="access_token"
                      type="password"
                      value={trackingConfig.facebook_pixel?.access_token || ''}
                      onChange={(e) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          facebook_pixel: {
                            ...prev.facebook_pixel,
                            access_token: e.target.value,
                            pixel_id: prev.facebook_pixel?.pixel_id || '',
                            is_active: prev.facebook_pixel?.is_active || false
                          }
                        }))
                      }
                      placeholder="Enter Access Token for Conversion API"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="test_event_code">Test Event Code (Optional)</Label>
                    <Input 
                      id="test_event_code"
                      value={trackingConfig.facebook_pixel?.test_event_code || ''}
                      onChange={(e) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          facebook_pixel: {
                            ...prev.facebook_pixel,
                            test_event_code: e.target.value,
                            pixel_id: prev.facebook_pixel?.pixel_id || '',
                            is_active: prev.facebook_pixel?.is_active || false
                          }
                        }))
                      }
                      placeholder="Enter Test Event Code"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Google Analytics Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trackingConfig.google_analytics?.is_active || false}
                      onCheckedChange={(checked) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          google_analytics: {
                            ...prev.google_analytics,
                            measurement_id: prev.google_analytics?.measurement_id || '',
                            is_active: checked,
                            enable_enhanced_measurement: prev.google_analytics?.enable_enhanced_measurement || true,
                            enable_conversion_tracking: prev.google_analytics?.enable_conversion_tracking || true,
                            custom_events: prev.google_analytics?.custom_events || true
                          }
                        }))
                      }
                    />
                    <Label>Enable Google Analytics</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="measurement_id">Measurement ID</Label>
                    <Input 
                      id="measurement_id"
                      value={trackingConfig.google_analytics?.measurement_id || ''}
                      onChange={(e) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          google_analytics: {
                            ...prev.google_analytics,
                            measurement_id: e.target.value,
                            is_active: prev.google_analytics?.is_active || false,
                            enable_enhanced_measurement: prev.google_analytics?.enable_enhanced_measurement || true,
                            enable_conversion_tracking: prev.google_analytics?.enable_conversion_tracking || true,
                            custom_events: prev.google_analytics?.custom_events || true
                          }
                        }))
                      }
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={trackingConfig.google_analytics?.enable_enhanced_measurement || false}
                        onCheckedChange={(checked) => 
                          setTrackingConfig(prev => ({
                            ...prev,
                            google_analytics: {
                              ...prev.google_analytics,
                              enable_enhanced_measurement: checked,
                              measurement_id: prev.google_analytics?.measurement_id || '',
                              is_active: prev.google_analytics?.is_active || false,
                              enable_conversion_tracking: prev.google_analytics?.enable_conversion_tracking || true,
                              custom_events: prev.google_analytics?.custom_events || true
                            }
                          }))
                        }
                      />
                      <Label>Enhanced Measurement</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={trackingConfig.google_analytics?.enable_conversion_tracking || false}
                        onCheckedChange={(checked) => 
                          setTrackingConfig(prev => ({
                            ...prev,
                            google_analytics: {
                              ...prev.google_analytics,
                              enable_conversion_tracking: checked,
                              measurement_id: prev.google_analytics?.measurement_id || '',
                              is_active: prev.google_analytics?.is_active || false,
                              enable_enhanced_measurement: prev.google_analytics?.enable_enhanced_measurement || true,
                              custom_events: prev.google_analytics?.custom_events || true
                            }
                          }))
                        }
                      />
                      <Label>Conversion Tracking</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={trackingConfig.google_analytics?.custom_events || false}
                        onCheckedChange={(checked) => 
                          setTrackingConfig(prev => ({
                            ...prev,
                            google_analytics: {
                              ...prev.google_analytics,
                              custom_events: checked,
                              measurement_id: prev.google_analytics?.measurement_id || '',
                              is_active: prev.google_analytics?.is_active || false,
                              enable_enhanced_measurement: prev.google_analytics?.enable_enhanced_measurement || true,
                              enable_conversion_tracking: prev.google_analytics?.enable_conversion_tracking || true
                            }
                          }))
                        }
                      />
                      <Label>Custom Events</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="console" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Google Search Console Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trackingConfig.google_search_console?.is_active || false}
                      onCheckedChange={(checked) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          google_search_console: {
                            ...prev.google_search_console,
                            site_url: prev.google_search_console?.site_url || '',
                            is_active: checked
                          }
                        }))
                      }
                    />
                    <Label>Enable Google Search Console</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="site_url">Site URL</Label>
                    <Input 
                      id="site_url"
                      value={trackingConfig.google_search_console?.site_url || ''}
                      onChange={(e) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          google_search_console: {
                            ...prev.google_search_console,
                            site_url: e.target.value,
                            is_active: prev.google_search_console?.is_active || false
                          }
                        }))
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="verification_code">Verification Code (Optional)</Label>
                    <Input 
                      id="verification_code"
                      value={trackingConfig.google_search_console?.verification_code || ''}
                      onChange={(e) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          google_search_console: {
                            ...prev.google_search_console,
                            verification_code: e.target.value,
                            site_url: prev.google_search_console?.site_url || '',
                            is_active: prev.google_search_console?.is_active || false
                          }
                        }))
                      }
                      placeholder="HTML tag verification code"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tagmanager" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Google Tag Manager Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={trackingConfig.google_tag_manager?.is_active || false}
                      onCheckedChange={(checked) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          google_tag_manager: {
                            ...prev.google_tag_manager,
                            container_id: prev.google_tag_manager?.container_id || '',
                            is_active: checked
                          }
                        }))
                      }
                    />
                    <Label>Enable Google Tag Manager</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="container_id">Container ID</Label>
                    <Input 
                      id="container_id"
                      value={trackingConfig.google_tag_manager?.container_id || ''}
                      onChange={(e) => 
                        setTrackingConfig(prev => ({
                          ...prev,
                          google_tag_manager: {
                            ...prev.google_tag_manager,
                            container_id: e.target.value,
                            is_active: prev.google_tag_manager?.is_active || false
                          }
                        }))
                      }
                      placeholder="GTM-XXXXXXX"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingManagementTab;

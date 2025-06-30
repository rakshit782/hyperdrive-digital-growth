
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Plus, 
  Edit, 
  Trash2, 
  TestTube,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useZapierIntegration } from "@/hooks/useZapierIntegration";

interface ZapierWebhook {
  id: string;
  name: string;
  url: string;
  trigger: string;
  isActive: boolean;
  description: string;
}

const ZapierIntegrationTab = () => {
  const [webhooks, setWebhooks] = useState<ZapierWebhook[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWebhook, setCurrentWebhook] = useState<Partial<ZapierWebhook>>({
    name: '',
    url: '',
    trigger: 'new_lead',
    isActive: true,
    description: ''
  });
  const { toast } = useToast();
  const { triggerZapierWebhook, isSubmitting } = useZapierIntegration();

  const triggerTypes = [
    { value: 'new_lead', label: 'New Lead Created', description: 'Triggers when any new lead is created' },
    { value: 'contact', label: 'Contact Form Submission', description: 'Triggers when contact form is submitted' },
    { value: 'free_audit', label: 'Free Audit Request', description: 'Triggers when free audit form is submitted' },
    { value: 'lead_status_change', label: 'Lead Status Change', description: 'Triggers when lead status is updated' },
    { value: 'lead_converted', label: 'Lead Converted', description: 'Triggers when lead is marked as converted' }
  ];

  useEffect(() => {
    loadWebhooks();
  }, []);

  const loadWebhooks = () => {
    const saved = localStorage.getItem('zapier_webhooks_list');
    if (saved) {
      try {
        setWebhooks(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading webhooks:', error);
      }
    }
  };

  const saveWebhooks = (newWebhooks: ZapierWebhook[]) => {
    localStorage.setItem('zapier_webhooks_list', JSON.stringify(newWebhooks));
    setWebhooks(newWebhooks);

    // Update the trigger-based webhook storage
    const webhookMap: Record<string, string> = {};
    newWebhooks.forEach(webhook => {
      if (webhook.isActive) {
        webhookMap[webhook.trigger] = webhook.url;
      }
    });
    localStorage.setItem('zapier_webhooks', JSON.stringify(webhookMap));
  };

  const handleSaveWebhook = () => {
    if (!currentWebhook.name || !currentWebhook.url) {
      toast({
        title: "Error",
        description: "Please enter webhook name and URL",
        variant: "destructive",
      });
      return;
    }

    const webhook: ZapierWebhook = {
      id: currentWebhook.id || Math.random().toString(36).substring(2, 15),
      name: currentWebhook.name!,
      url: currentWebhook.url!,
      trigger: currentWebhook.trigger!,
      isActive: currentWebhook.isActive !== undefined ? currentWebhook.isActive : true,
      description: currentWebhook.description || ''
    };

    const updatedWebhooks = currentWebhook.id
      ? webhooks.map(w => w.id === currentWebhook.id ? webhook : w)
      : [...webhooks, webhook];

    saveWebhooks(updatedWebhooks);
    setIsEditing(false);
    setCurrentWebhook({
      name: '', url: '', trigger: 'new_lead', isActive: true, description: ''
    });

    toast({
      title: "Success",
      description: `Webhook ${currentWebhook.id ? 'updated' : 'created'} successfully`,
    });
  };

  const handleEditWebhook = (webhook: ZapierWebhook) => {
    setCurrentWebhook(webhook);
    setIsEditing(true);
  };

  const handleDeleteWebhook = (id: string) => {
    if (window.confirm('Are you sure you want to delete this webhook?')) {
      const updatedWebhooks = webhooks.filter(w => w.id !== id);
      saveWebhooks(updatedWebhooks);
      toast({
        title: "Success",
        description: "Webhook deleted successfully",
      });
    }
  };

  const handleToggleWebhook = (id: string) => {
    const updatedWebhooks = webhooks.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    );
    saveWebhooks(updatedWebhooks);
    
    const webhook = updatedWebhooks.find(w => w.id === id);
    toast({
      title: "Success",
      description: `Webhook ${webhook?.isActive ? 'activated' : 'deactivated'}`,
    });
  };

  const handleTestWebhook = async (webhook: ZapierWebhook) => {
    const testData = {
      leadId: 'test-' + Date.now(),
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Test Company',
      source: 'webhook_test',
      formType: 'test',
      message: 'This is a test webhook trigger',
      timestamp: new Date().toISOString()
    };

    await triggerZapierWebhook(webhook.url, testData);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mr-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Zapier Integration</CardTitle>
                <CardDescription>Connect your lead management to thousands of apps</CardDescription>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-orange-600 to-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Webhook
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Setup Instructions */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Quick Setup Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">1</div>
                <div>
                  <p className="font-medium text-blue-900">Create a Zap in Zapier</p>
                  <p className="text-sm text-blue-700">Go to Zapier.com and create a new Zap with "Webhooks by Zapier" as the trigger</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">2</div>
                <div>
                  <p className="font-medium text-blue-900">Copy the Webhook URL</p>
                  <p className="text-sm text-blue-700">Zapier will provide a unique webhook URL - copy this URL</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">3</div>
                <div>
                  <p className="font-medium text-blue-900">Add Webhook Here</p>
                  <p className="text-sm text-blue-700">Paste the URL below and configure when it should trigger</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Webhook Editor */}
          {isEditing && (
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg">
                  {currentWebhook.id ? 'Edit Webhook' : 'Add New Webhook'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Webhook Name</Label>
                    <Input
                      id="name"
                      value={currentWebhook.name || ''}
                      onChange={(e) => setCurrentWebhook({
                        ...currentWebhook,
                        name: e.target.value
                      })}
                      placeholder="My Lead Webhook"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trigger">Trigger Event</Label>
                    <select
                      id="trigger"
                      value={currentWebhook.trigger}
                      onChange={(e) => setCurrentWebhook({
                        ...currentWebhook,
                        trigger: e.target.value
                      })}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md"
                    >
                      {triggerTypes.map(trigger => (
                        <option key={trigger.value} value={trigger.value}>
                          {trigger.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="url">Zapier Webhook URL</Label>
                  <Input
                    id="url"
                    value={currentWebhook.url || ''}
                    onChange={(e) => setCurrentWebhook({
                      ...currentWebhook,
                      url: e.target.value
                    })}
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={currentWebhook.description || ''}
                    onChange={(e) => setCurrentWebhook({
                      ...currentWebhook,
                      description: e.target.value
                    })}
                    placeholder="What does this webhook do?"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentWebhook.isActive !== false}
                    onCheckedChange={(checked) => setCurrentWebhook({
                      ...currentWebhook,
                      isActive: checked
                    })}
                  />
                  <Label>Active</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveWebhook} className="bg-gradient-to-r from-orange-600 to-red-600">
                    Save Webhook
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Webhooks List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configured Webhooks</h3>
            {webhooks.length > 0 ? (
              webhooks.map((webhook) => (
                <Card key={webhook.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${webhook.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <LinkIcon className={`w-5 h-5 ${webhook.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{webhook.name}</h4>
                          <p className="text-sm text-gray-600">{webhook.description || 'No description'}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {triggerTypes.find(t => t.value === webhook.trigger)?.label || webhook.trigger}
                            </Badge>
                            <Badge className={webhook.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {webhook.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestWebhook(webhook)}
                          disabled={!webhook.isActive || isSubmitting}
                        >
                          <TestTube className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleWebhook(webhook.id)}
                        >
                          {webhook.isActive ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditWebhook(webhook)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteWebhook(webhook.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No webhooks configured</h3>
                <p className="text-gray-600 mb-4">Add your first Zapier webhook to start automating your workflows</p>
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Webhook
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZapierIntegrationTab;

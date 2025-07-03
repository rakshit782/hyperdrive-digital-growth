
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Send, 
  Clock, 
  Users, 
  TrendingUp, 
  Settings, 
  Eye,
  Plus,
  Trash2,
  Edit3,
  Zap
} from 'lucide-react';
import { useZeptoMailAutomation, EmailTemplate, ZeptoMailSettings } from '@/hooks/useZeptoMailAutomation';

const EmailWorkflowTab = () => {
  const { toast } = useToast();
  const {
    getZeptoMailSettings,
    saveZeptoMailSettings,
    getEmailTemplates,
    saveEmailTemplate,
    deleteEmailTemplate,
    sendZeptoMailEmail,
    isSending
  } = useZeptoMailAutomation();

  const [settings, setSettings] = useState<ZeptoMailSettings>({
    apiKey: '',
    fromEmail: '',
    fromName: '',
    bounceAddress: ''
  });

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    const savedSettings = getZeptoMailSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
    
    const savedTemplates = getEmailTemplates();
    setTemplates(savedTemplates);
  }, []);

  const handleSaveSettings = () => {
    if (!settings.apiKey || !settings.fromEmail) {
      toast({
        title: "Error",
        description: "API Key and From Email are required",
        variant: "destructive",
      });
      return;
    }

    saveZeptoMailSettings(settings);
    toast({
      title: "Settings saved",
      description: "ZeptoMail settings have been saved successfully."
    });
  };

  const handleSaveTemplate = (template: EmailTemplate) => {
    if (template.id === 'new') {
      const newTemplate = { ...template, id: Date.now().toString() };
      setTemplates([...templates, newTemplate]);
      saveEmailTemplate(newTemplate);
    } else {
      const updatedTemplates = templates.map(t => t.id === template.id ? template : t);
      setTemplates(updatedTemplates);
      saveEmailTemplate(template);
    }
    setIsEditing(false);
    setSelectedTemplate(null);
    toast({
      title: "Template saved",
      description: "Email template has been saved successfully."
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    deleteEmailTemplate(id);
    toast({
      title: "Template deleted",
      description: "Email template has been deleted."
    });
  };

  const handleTestEmail = async () => {
    if (!testEmail || !selectedTemplate) {
      toast({
        title: "Error",
        description: "Please select a template and enter a test email",
        variant: "destructive",
      });
      return;
    }

    await sendZeptoMailEmail(testEmail, selectedTemplate.id, {
      name: 'Test User',
      email: testEmail,
      company: 'Test Company',
      phone: '+1234567890'
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-3">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Email Workflow Automation</CardTitle>
                <CardDescription>Manage automated email campaigns with ZeptoMail</CardDescription>
              </div>
            </div>
            <Button
              onClick={() => {
                setSelectedTemplate({
                  id: 'new',
                  name: '',
                  subject: '',
                  content: '',
                  trigger: 'form_submission',
                  isActive: true,
                  delay: 0
                });
                setIsEditing(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs defaultValue="settings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="settings">ZeptoMail Settings</TabsTrigger>
              <TabsTrigger value="templates">Email Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ZeptoMail Configuration</CardTitle>
                  <CardDescription>
                    Configure your ZeptoMail API settings for automated emails
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="apiKey">API Key *</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        value={settings.apiKey}
                        onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                        placeholder="Your ZeptoMail API Key"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fromEmail">From Email *</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={settings.fromEmail}
                        onChange={(e) => setSettings({...settings, fromEmail: e.target.value})}
                        placeholder="noreply@yourdomain.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        value={settings.fromName}
                        onChange={(e) => setSettings({...settings, fromName: e.target.value})}
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bounceAddress">Bounce Address</Label>
                      <Input
                        id="bounceAddress"
                        type="email"
                        value={settings.bounceAddress}
                        onChange={(e) => setSettings({...settings, bounceAddress: e.target.value})}
                        placeholder="bounce@yourdomain.com"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Settings className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription>{template.subject}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={template.isActive ? "default" : "secondary"}>
                            {template.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">{template.trigger.replace('_', ' ')}</Badge>
                          {template.delay && (
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {template.delay}min
                            </Badge>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTemplate(template);
                              setIsEditing(true);
                            }}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {template.content.substring(0, 150)}...
                      </p>
                      <div className="mt-4 flex items-center space-x-2">
                        <Input
                          placeholder="test@example.com"
                          value={testEmail}
                          onChange={(e) => setTestEmail(e.target.value)}
                          className="max-w-xs"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedTemplate(template);
                            handleTestEmail();
                          }}
                          disabled={isSending}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Test
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{templates.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {templates.filter(t => t.isActive).length} active
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
                    <Send className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,284</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.3%</div>
                    <p className="text-xs text-muted-foreground">
                      +2.1% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <p className="text-xs text-muted-foreground">
                      +0.5% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Template Editor Modal */}
          {isEditing && selectedTemplate && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedTemplate.id === 'new' ? 'Create' : 'Edit'} Email Template
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      value={selectedTemplate.name}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        name: e.target.value
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      value={selectedTemplate.subject}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        subject: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="trigger">Trigger</Label>
                      <Select
                        value={selectedTemplate.trigger}
                        onValueChange={(value: 'form_submission' | 'lead_status_change' | 'welcome' | 'follow_up') => 
                          setSelectedTemplate({
                            ...selectedTemplate,
                            trigger: value
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="form_submission">Form Submission</SelectItem>
                          <SelectItem value="welcome">Welcome</SelectItem>
                          <SelectItem value="follow_up">Follow-up</SelectItem>
                          <SelectItem value="lead_status_change">Lead Status Change</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="delay">Delay (minutes)</Label>
                      <Input
                        id="delay"
                        type="number"
                        value={selectedTemplate.delay || 0}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          delay: parseInt(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Email Content</Label>
                    <Textarea
                      id="content"
                      rows={10}
                      value={selectedTemplate.content}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        content: e.target.value
                      })}
                      placeholder="Use {{name}}, {{email}}, {{company}}, {{phone}} for dynamic content"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={selectedTemplate.isActive}
                      onCheckedChange={(checked) => setSelectedTemplate({
                        ...selectedTemplate,
                        isActive: checked
                      })}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedTemplate(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleSaveTemplate(selectedTemplate)}>
                    Save Template
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailWorkflowTab;

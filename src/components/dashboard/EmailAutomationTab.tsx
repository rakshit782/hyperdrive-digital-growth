
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  Send,
  Eye,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEmailAutomation, EmailTemplate, EmailSettings } from "@/hooks/useEmailAutomation";

const EmailAutomationTab = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [emailSettings, setEmailSettings] = useState<EmailSettings | null>(null);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Partial<EmailTemplate>>({
    name: '',
    subject: '',
    content: '',
    trigger: 'contact',
    isActive: true
  });
  const { toast } = useToast();
  const {
    getEmailSettings,
    saveEmailSettings,
    getEmailTemplates,
    saveEmailTemplate,
    deleteEmailTemplate
  } = useEmailAutomation();

  const triggerTypes = [
    { value: 'contact', label: 'Contact Form Submission' },
    { value: 'free_audit', label: 'Free Audit Request' },
    { value: 'new_lead', label: 'New Lead Created' },
    { value: 'lead_status_change', label: 'Lead Status Change' },
    { value: 'welcome', label: 'Welcome Email' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setTemplates(getEmailTemplates());
    setEmailSettings(getEmailSettings());
  };

  const handleSaveSettings = () => {
    if (!emailSettings) return;

    saveEmailSettings(emailSettings);
    setIsEditingSettings(false);
    toast({
      title: "Success",
      description: "Email settings saved successfully",
    });
  };

  const handleSaveTemplate = () => {
    if (!currentTemplate.name || !currentTemplate.subject || !currentTemplate.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const template: EmailTemplate = {
      id: currentTemplate.id || Math.random().toString(36).substring(2, 15),
      name: currentTemplate.name!,
      subject: currentTemplate.subject!,
      content: currentTemplate.content!,
      trigger: currentTemplate.trigger!,
      isActive: currentTemplate.isActive !== undefined ? currentTemplate.isActive : true
    };

    saveEmailTemplate(template);
    loadData();
    setIsEditingTemplate(false);
    setCurrentTemplate({
      name: '', subject: '', content: '', trigger: 'contact', isActive: true
    });

    toast({
      title: "Success",
      description: `Template ${currentTemplate.id ? 'updated' : 'created'} successfully`,
    });
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setCurrentTemplate(template);
    setIsEditingTemplate(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      deleteEmailTemplate(templateId);
      loadData();
      toast({
        title: "Success",
        description: "Template deleted successfully",
      });
    }
  };

  const previewTemplate = (template: EmailTemplate) => {
    // Create preview with sample data
    const sampleData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      phone: '+1 (555) 123-4567'
    };

    let subject = template.subject;
    let content = template.content;

    // Replace placeholders with sample data
    Object.entries(sampleData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, 'g'), value);
      content = content.replace(new RegExp(placeholder, 'g'), value);
    });

    alert(`Subject: ${subject}\n\nContent:\n${content}`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-3">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">Email Automation</CardTitle>
              <CardDescription>Configure automated email templates and SMTP settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Email Templates</TabsTrigger>
              <TabsTrigger value="settings">SMTP Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Email Templates</h3>
                <Button
                  onClick={() => setIsEditingTemplate(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Template
                </Button>
              </div>

              {/* Template Editor */}
              {isEditingTemplate && (
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {currentTemplate.id ? 'Edit Template' : 'Create New Template'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="templateName">Template Name</Label>
                        <Input
                          id="templateName"
                          value={currentTemplate.name || ''}
                          onChange={(e) => setCurrentTemplate({
                            ...currentTemplate,
                            name: e.target.value
                          })}
                          placeholder="Welcome Email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="trigger">Trigger Event</Label>
                        <Select
                          value={currentTemplate.trigger}
                          onValueChange={(value) => setCurrentTemplate({
                            ...currentTemplate,
                            trigger: value
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select trigger" />
                          </SelectTrigger>
                          <SelectContent>
                            {triggerTypes.map(trigger => (
                              <SelectItem key={trigger.value} value={trigger.value}>
                                {trigger.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Email Subject</Label>
                      <Input
                        id="subject"
                        value={currentTemplate.subject || ''}
                        onChange={(e) => setCurrentTemplate({
                          ...currentTemplate,
                          subject: e.target.value
                        })}
                        placeholder="Welcome to our service, {{name}}!"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Email Content</Label>
                      <Textarea
                        id="content"
                        value={currentTemplate.content || ''}
                        onChange={(e) => setCurrentTemplate({
                          ...currentTemplate,
                          content: e.target.value
                        })}
                        rows={8}
                        placeholder="Hi {{name}},

Thank you for your interest in our services. We received your message and will get back to you within 24 hours.

Best regards,
The Team"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Available variables: {{name}}, {{email}}, {{company}}, {{phone}}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={currentTemplate.isActive !== false}
                        onCheckedChange={(checked) => setCurrentTemplate({
                          ...currentTemplate,
                          isActive: checked
                        })}
                      />
                      <Label>Active</Label>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditingTemplate(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveTemplate} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                        Save Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Templates List */}
              <div className="space-y-4">
                {templates.length > 0 ? (
                  templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-600">Subject: {template.subject}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {triggerTypes.find(t => t.value === template.trigger)?.label || template.trigger}
                              </Badge>
                              <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {template.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => previewTemplate(template)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No email templates</h3>
                    <p className="text-gray-600 mb-4">Create your first email template to start automating</p>
                    <Button onClick={() => setIsEditingTemplate(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Template
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">SMTP Configuration</h3>
                <Button
                  onClick={() => setIsEditingSettings(true)}
                  variant="outline"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure SMTP
                </Button>
              </div>

              {isEditingSettings ? (
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">SMTP Settings</CardTitle>
                    <CardDescription>
                      Configure your email server settings for sending automated emails
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input
                          id="smtpHost"
                          value={emailSettings?.smtpHost || ''}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings!,
                            smtpHost: e.target.value
                          })}
                          placeholder="smtp.gmail.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input
                          id="smtpPort"
                          type="number"
                          value={emailSettings?.smtpPort || 587}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings!,
                            smtpPort: parseInt(e.target.value)
                          })}
                          placeholder="587"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtpUser">SMTP Username</Label>
                        <Input
                          id="smtpUser"
                          value={emailSettings?.smtpUser || ''}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings!,
                            smtpUser: e.target.value
                          })}
                          placeholder="your-email@gmail.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtpPass">SMTP Password</Label>
                        <Input
                          id="smtpPass"
                          type="password"
                          value={emailSettings?.smtpPass || ''}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings!,
                            smtpPass: e.target.value
                          })}
                          placeholder="Your app password"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fromEmail">From Email</Label>
                        <Input
                          id="fromEmail"
                          value={emailSettings?.fromEmail || ''}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings!,
                            fromEmail: e.target.value
                          })}
                          placeholder="noreply@yourcompany.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fromName">From Name</Label>
                        <Input
                          id="fromName"
                          value={emailSettings?.fromName || ''}
                          onChange={(e) => setEmailSettings({
                            ...emailSettings!,
                            fromName: e.target.value
                          })}
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={emailSettings?.smtpSecure || false}
                        onCheckedChange={(checked) => setEmailSettings({
                          ...emailSettings!,
                          smtpSecure: checked
                        })}
                      />
                      <Label>Use SSL/TLS</Label>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditingSettings(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                        <Save className="w-4 h-4 mr-2" />
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    {emailSettings ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">SMTP Host:</span>
                          <span className="text-sm text-gray-900">{emailSettings.smtpHost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Port:</span>
                          <span className="text-sm text-gray-900">{emailSettings.smtpPort}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">From Email:</span>
                          <span className="text-sm text-gray-900">{emailSettings.fromEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Security:</span>
                          <span className="text-sm text-gray-900">{emailSettings.smtpSecure ? 'SSL/TLS' : 'None'}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">SMTP Not Configured</h3>
                        <p className="text-gray-600 mb-4">Configure your SMTP settings to enable automated emails</p>
                        <Button onClick={() => {
                          setEmailSettings({
                            smtpHost: '',
                            smtpPort: 587,
                            smtpSecure: false,
                            smtpUser: '',
                            smtpPass: '',
                            fromEmail: '',
                            fromName: ''
                          });
                          setIsEditingSettings(true);
                        }}>
                          <Settings className="w-4 h-4 mr-2" />
                          Configure SMTP
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailAutomationTab;

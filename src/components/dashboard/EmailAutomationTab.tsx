
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  Edit3
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'follow-up' | 'newsletter' | 'promotion';
  isActive: boolean;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  templateId: string;
  delay: number;
  isActive: boolean;
}

const EmailAutomationTab = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to our service!',
      content: 'Thank you for joining us...',
      type: 'welcome',
      isActive: true
    }
  ]);

  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'New User Welcome',
      trigger: 'user_signup',
      templateId: '1',
      delay: 0,
      isActive: true
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveTemplate = (template: EmailTemplate) => {
    if (template.id === 'new') {
      const newTemplate = { ...template, id: Date.now().toString() };
      setTemplates([...templates, newTemplate]);
    } else {
      setTemplates(templates.map(t => t.id === template.id ? template : t));
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
    toast({
      title: "Template deleted",
      description: "Email template has been deleted."
    });
  };

  const previewTemplate = (template: EmailTemplate) => {
    const sampleData = {
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Acme Corp',
      phone: '+1-555-0123'
    };
    
    let content = template.content;
    Object.entries(sampleData).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    
    return content;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Email Automation</h2>
          <p className="text-gray-600">Manage automated email campaigns and templates</p>
        </div>
        <Button onClick={() => {
          setSelectedTemplate({
            id: 'new',
            name: '',
            subject: '',
            content: '',
            type: 'welcome',
            isActive: true
          });
          setIsEditing(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium">Automation Rules</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rules.length}</div>
            <p className="text-xs text-muted-foreground">
              {rules.filter(r => r.isActive).length} active
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
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Show preview
                          const preview = previewTemplate(template);
                          toast({
                            title: "Template Preview",
                            description: preview.substring(0, 100) + "..."
                          });
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
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
                  <div className="mt-2">
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="grid gap-4">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <CardDescription>
                        Trigger: {rule.trigger} | Delay: {rule.delay} minutes
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={rule.isActive ? "default" : "secondary"}>
                        {rule.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={(checked) => {
                          setRules(rules.map(r => 
                            r.id === rule.id ? { ...r, isActive: checked } : r
                          ));
                        }}
                      />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Delivered</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Opened</span>
                    <span className="font-medium">24.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clicked</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unsubscribed</span>
                    <span className="font-medium">0.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {templates.slice(0, 3).map((template) => (
                    <div key={template.id} className="flex justify-between items-center">
                      <span className="text-sm">{template.name}</span>
                      <span className="text-sm font-medium">28.5%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Editor Modal would go here */}
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
              
              <div>
                <Label htmlFor="type">Template Type</Label>
                <Select
                  value={selectedTemplate.type}
                  onValueChange={(value: 'welcome' | 'follow-up' | 'newsletter' | 'promotion') => 
                    setSelectedTemplate({
                      ...selectedTemplate,
                      type: value
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="promotion">Promotion</SelectItem>
                  </SelectContent>
                </Select>
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
    </div>
  );
};

export default EmailAutomationTab;

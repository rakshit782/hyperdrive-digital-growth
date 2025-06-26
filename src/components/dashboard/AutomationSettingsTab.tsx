
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Bell, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'form_submission' | 'lead_status_change' | 'time_based' | 'page_visit';
    config: Record<string, any>;
  };
  actions: Array<{
    type: 'send_email' | 'create_lead' | 'update_status' | 'webhook' | 'notification';
    config: Record<string, any>;
  }>;
  isActive: boolean;
  created_at: string;
}

const AutomationSettingsTab = () => {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAutomation, setCurrentAutomation] = useState<Partial<Automation>>({
    name: '',
    description: '',
    trigger: { type: 'form_submission', config: {} },
    actions: [],
    isActive: true
  });
  const { toast } = useToast();

  useEffect(() => {
    loadAutomations();
  }, []);

  const loadAutomations = () => {
    const saved = localStorage.getItem('automations');
    if (saved) {
      try {
        setAutomations(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading automations:', error);
      }
    }
  };

  const saveAutomations = (newAutomations: Automation[]) => {
    localStorage.setItem('automations', JSON.stringify(newAutomations));
    setAutomations(newAutomations);
  };

  const handleSaveAutomation = () => {
    if (!currentAutomation.name) {
      toast({
        title: "Error",
        description: "Please enter an automation name",
        variant: "destructive",
      });
      return;
    }

    const automation: Automation = {
      id: currentAutomation.id || Math.random().toString(36).substring(2, 15),
      name: currentAutomation.name!,
      description: currentAutomation.description || '',
      trigger: currentAutomation.trigger!,
      actions: currentAutomation.actions || [],
      isActive: currentAutomation.isActive !== undefined ? currentAutomation.isActive : true,
      created_at: currentAutomation.created_at || new Date().toISOString()
    };

    const updatedAutomations = currentAutomation.id
      ? automations.map(a => a.id === currentAutomation.id ? automation : a)
      : [...automations, automation];

    saveAutomations(updatedAutomations);
    setIsEditing(false);
    setCurrentAutomation({
      name: '',
      description: '',
      trigger: { type: 'form_submission', config: {} },
      actions: [],
      isActive: true
    });

    toast({
      title: "Success",
      description: `Automation ${currentAutomation.id ? 'updated' : 'created'} successfully`,
    });
  };

  const handleEditAutomation = (automation: Automation) => {
    setCurrentAutomation(automation);
    setIsEditing(true);
  };

  const handleDeleteAutomation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this automation?')) {
      const updatedAutomations = automations.filter(a => a.id !== id);
      saveAutomations(updatedAutomations);
      toast({
        title: "Success",
        description: "Automation deleted successfully",
      });
    }
  };

  const handleToggleAutomation = (id: string) => {
    const updatedAutomations = automations.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    );
    saveAutomations(updatedAutomations);
    
    const automation = updatedAutomations.find(a => a.id === id);
    toast({
      title: "Success",
      description: `Automation ${automation?.isActive ? 'activated' : 'deactivated'}`,
    });
  };

  const addAction = () => {
    setCurrentAutomation({
      ...currentAutomation,
      actions: [
        ...(currentAutomation.actions || []),
        { type: 'send_email', config: {} }
      ]
    });
  };

  const updateAction = (index: number, action: any) => {
    const updatedActions = [...(currentAutomation.actions || [])];
    updatedActions[index] = action;
    setCurrentAutomation({
      ...currentAutomation,
      actions: updatedActions
    });
  };

  const removeAction = (index: number) => {
    const updatedActions = (currentAutomation.actions || []).filter((_, i) => i !== index);
    setCurrentAutomation({
      ...currentAutomation,
      actions: updatedActions
    });
  };

  const triggerIcons = {
    form_submission: Mail,
    lead_status_change: Settings,
    time_based: Bell,
    page_visit: MessageSquare
  };

  const actionIcons = {
    send_email: Mail,
    create_lead: Plus,
    update_status: Settings,
    webhook: Zap,
    notification: Bell
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Automation Settings</CardTitle>
                <CardDescription>Create automated workflows to streamline your processes</CardDescription>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Automation Editor */}
          {isEditing && (
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">
                  {currentAutomation.id ? 'Edit Automation' : 'Create New Automation'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Automation Name</Label>
                    <Input
                      id="name"
                      value={currentAutomation.name || ''}
                      onChange={(e) => setCurrentAutomation({
                        ...currentAutomation,
                        name: e.target.value
                      })}
                      placeholder="Welcome Email Sequence"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={currentAutomation.description || ''}
                      onChange={(e) => setCurrentAutomation({
                        ...currentAutomation,
                        description: e.target.value
                      })}
                      placeholder="Send welcome email when lead submits form"
                    />
                  </div>
                </div>

                {/* Trigger Configuration */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Trigger</Label>
                  <Select
                    value={currentAutomation.trigger?.type}
                    onValueChange={(value: any) => setCurrentAutomation({
                      ...currentAutomation,
                      trigger: { type: value, config: {} }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="form_submission">Form Submission</SelectItem>
                      <SelectItem value="lead_status_change">Lead Status Change</SelectItem>
                      <SelectItem value="time_based">Time-Based</SelectItem>
                      <SelectItem value="page_visit">Page Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions Configuration */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Actions</Label>
                    <Button variant="outline" size="sm" onClick={addAction}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Action
                    </Button>
                  </div>
                  
                  {(currentAutomation.actions || []).map((action, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Select
                          value={action.type}
                          onValueChange={(value: any) => updateAction(index, { ...action, type: value })}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="send_email">Send Email</SelectItem>
                            <SelectItem value="create_lead">Create Lead</SelectItem>
                            <SelectItem value="update_status">Update Status</SelectItem>
                            <SelectItem value="webhook">Call Webhook</SelectItem>
                            <SelectItem value="notification">Send Notification</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" onClick={() => removeAction(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {action.type === 'send_email' && (
                        <div className="space-y-2">
                          <Input
                            placeholder="Email subject"
                            value={action.config.subject || ''}
                            onChange={(e) => updateAction(index, {
                              ...action,
                              config: { ...action.config, subject: e.target.value }
                            })}
                          />
                          <Textarea
                            placeholder="Email content"
                            value={action.config.content || ''}
                            onChange={(e) => updateAction(index, {
                              ...action,
                              config: { ...action.config, content: e.target.value }
                            })}
                            rows={3}
                          />
                        </div>
                      )}
                      
                      {action.type === 'webhook' && (
                        <Input
                          placeholder="Webhook URL"
                          value={action.config.url || ''}
                          onChange={(e) => updateAction(index, {
                            ...action,
                            config: { ...action.config, url: e.target.value }
                          })}
                        />
                      )}
                    </Card>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={currentAutomation.isActive !== false}
                    onCheckedChange={(checked) => setCurrentAutomation({
                      ...currentAutomation,
                      isActive: checked
                    })}
                  />
                  <Label>Active</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveAutomation} className="bg-gradient-to-r from-purple-600 to-indigo-600">
                    Save Automation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Automations List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Active Automations</h3>
            {automations.length > 0 ? (
              automations.map((automation) => {
                const TriggerIcon = triggerIcons[automation.trigger.type];
                return (
                  <Card key={automation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${automation.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                            <TriggerIcon className={`w-5 h-5 ${automation.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{automation.name}</h4>
                            <p className="text-sm text-gray-600">{automation.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {automation.trigger.type.replace('_', ' ')}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {automation.actions.length} action{automation.actions.length !== 1 ? 's' : ''}
                              </Badge>
                              <Badge className={automation.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {automation.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleAutomation(automation.id)}
                          >
                            {automation.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditAutomation(automation)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteAutomation(automation.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No automations yet</h3>
                <p className="text-gray-600 mb-4">Create your first automation to streamline your workflow</p>
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Automation
                </Button>
              </div>
            )}
          </div>

          {/* Templates */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Automation Templates</CardTitle>
              <CardDescription className="text-blue-700">
                Quick start with pre-built automation workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold">Welcome Email</h4>
                  </div>
                  <p className="text-sm text-gray-600">Send welcome email when someone submits a form</p>
                </Card>
                
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold">Lead Notification</h4>
                  </div>
                  <p className="text-sm text-gray-600">Get notified when a new lead is created</p>
                </Card>
                
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold">Follow-up Sequence</h4>
                  </div>
                  <p className="text-sm text-gray-600">Automatic follow-up emails based on lead status</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationSettingsTab;

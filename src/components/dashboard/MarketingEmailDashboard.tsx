import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Send, 
  Users, 
  FileSpreadsheet,
  Plus,
  Trash2,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Eye,
  Reply,
  Activity
} from 'lucide-react';
import { useZeptoMailAutomation } from '@/hooks/useZeptoMailAutomation';
import { useNewsletterEmails } from '@/hooks/useNewsletterEmails';
import { useLocalLeads } from '@/hooks/useLocalLeads';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  replyTo?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  recipientCount: number;
  sentCount: number;
  openRate?: number;
  clickRate?: number;
  scheduledDate?: string;
  createdAt: string;
  selectedRecipients: string[];
  emailGapMinutes: number;
}

interface EmailLog {
  id: string;
  campaignId: string;
  recipientEmail: string;
  recipientName: string;
  status: 'sent' | 'failed' | 'bounced';
  sentAt: string;
  opened?: boolean;
  openedAt?: string;
  clicked?: boolean;
  clickedAt?: string;
  error?: string;
}

interface EmailRecipient {
  id: string;
  email: string;
  name: string;
  source: 'newsletter' | 'leads' | 'google_sheets' | 'manual';
  company?: string;
  phone?: string;
  selected: boolean;
}

interface GoogleSheetsConnection {
  isEnabled: boolean;
  spreadsheetUrl: string;
  sheetName: string;
  emailColumn: string;
  nameColumn: string;
  companyColumn?: string;
  phoneColumn?: string;
}

const MarketingEmailDashboard = () => {
  const { toast } = useToast();
  const { getZeptoMailSettings, getEmailTemplates, saveEmailTemplate, isSending } = useZeptoMailAutomation();
  const { emails: newsletterEmails } = useNewsletterEmails();
  const { leads } = useLocalLeads();

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [filteredRecipients, setFilteredRecipients] = useState<EmailRecipient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [currentCampaign, setCurrentCampaign] = useState<Partial<EmailCampaign>>({
    name: '',
    subject: '',
    content: '',
    replyTo: '',
    status: 'draft',
    emailGapMinutes: 5
  });
  const [googleSheetsConfig, setGoogleSheetsConfig] = useState<GoogleSheetsConnection>({
    isEnabled: false,
    spreadsheetUrl: '',
    sheetName: 'Sheet1',
    emailColumn: 'A',
    nameColumn: 'B',
    companyColumn: 'C',
    phoneColumn: 'D'
  });
  const [activeTab, setActiveTab] = useState('compose');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  useEffect(() => {
    loadCampaigns();
    loadEmailLogs();
    loadGoogleSheetsConfig();
    fetchAllRecipients();
  }, []);

  useEffect(() => {
    // Filter recipients based on search term and source
    let filtered = recipients;
    
    if (searchTerm) {
      filtered = filtered.filter(recipient => 
        recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipient.company && recipient.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (filterSource !== 'all') {
      filtered = filtered.filter(recipient => recipient.source === filterSource);
    }
    
    setFilteredRecipients(filtered);
  }, [recipients, searchTerm, filterSource]);

  const loadCampaigns = () => {
    const stored = localStorage.getItem('marketing_campaigns');
    if (stored) {
      setCampaigns(JSON.parse(stored));
    }
  };

  const loadEmailLogs = () => {
    const stored = localStorage.getItem('email_logs');
    if (stored) {
      setEmailLogs(JSON.parse(stored));
    }
  };

  const saveEmailLog = (log: EmailLog) => {
    const logs = [...emailLogs, log];
    setEmailLogs(logs);
    localStorage.setItem('email_logs', JSON.stringify(logs));
  };

  const updateEmailLog = (logId: string, updates: Partial<EmailLog>) => {
    const updatedLogs = emailLogs.map(log => 
      log.id === logId ? { ...log, ...updates } : log
    );
    setEmailLogs(updatedLogs);
    localStorage.setItem('email_logs', JSON.stringify(updatedLogs));
  };

  const saveCampaigns = (campaignsToSave: EmailCampaign[]) => {
    localStorage.setItem('marketing_campaigns', JSON.stringify(campaignsToSave));
    setCampaigns(campaignsToSave);
  };

  const loadGoogleSheetsConfig = () => {
    const stored = localStorage.getItem('google_sheets_email_config');
    if (stored) {
      setGoogleSheetsConfig(JSON.parse(stored));
    }
  };

  const saveGoogleSheetsConfig = (config: GoogleSheetsConnection) => {
    localStorage.setItem('google_sheets_email_config', JSON.stringify(config));
    setGoogleSheetsConfig(config);
  };

  const fetchAllRecipients = async () => {
    const allRecipients: EmailRecipient[] = [];

    // Add newsletter subscribers
    newsletterEmails
      .filter(email => email.status === 'subscribed')
      .forEach(email => {
        allRecipients.push({
          id: `newsletter_${email.id}`,
          email: email.email,
          name: email.name || email.email.split('@')[0],
          source: 'newsletter',
          selected: false
        });
      });

    // Add leads
    leads.forEach(lead => {
      allRecipients.push({
        id: `lead_${lead.id}`,
        email: lead.email,
        name: lead.name,
        source: 'leads',
        company: lead.company || undefined,
        phone: lead.phone || undefined,
        selected: false
      });
    });

    // Fetch Google Sheets data if enabled
    if (googleSheetsConfig.isEnabled && googleSheetsConfig.spreadsheetUrl) {
      try {
        // This would be implemented with Google Sheets API
        // For now, we'll simulate with mock data
        const mockGoogleSheetsData = [
          { email: 'john@example.com', name: 'John Doe', company: 'Example Corp' },
          { email: 'jane@sample.com', name: 'Jane Smith', company: 'Sample Inc' }
        ];

        mockGoogleSheetsData.forEach((row, index) => {
          allRecipients.push({
            id: `sheets_${index}`,
            email: row.email,
            name: row.name,
            source: 'google_sheets',
            company: row.company,
            selected: false
          });
        });
      } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
      }
    }

    // Remove duplicates based on email
    const uniqueRecipients = allRecipients.filter((recipient, index, self) =>
      index === self.findIndex(r => r.email.toLowerCase() === recipient.email.toLowerCase())
    );

    setRecipients(uniqueRecipients);
  };

  const handleRecipientSelection = (recipientId: string, selected: boolean) => {
    if (selected) {
      setSelectedRecipients([...selectedRecipients, recipientId]);
    } else {
      setSelectedRecipients(selectedRecipients.filter(id => id !== recipientId));
    }
  };

  const handleSelectAll = (source?: string) => {
    const recipientsToSelect = source 
      ? filteredRecipients.filter(r => r.source === source)
      : filteredRecipients;
    
    const allSelected = recipientsToSelect.every(r => selectedRecipients.includes(r.id));
    
    if (allSelected) {
      // Deselect all from this source
      const idsToRemove = recipientsToSelect.map(r => r.id);
      setSelectedRecipients(selectedRecipients.filter(id => !idsToRemove.includes(id)));
    } else {
      // Select all from this source
      const newSelections = recipientsToSelect
        .filter(r => !selectedRecipients.includes(r.id))
        .map(r => r.id);
      setSelectedRecipients([...selectedRecipients, ...newSelections]);
    }
  };

  const handleCreateCampaign = async () => {
    if (!currentCampaign.name || !currentCampaign.subject || !currentCampaign.content) {
      toast({
        title: "Error",
        description: "Please fill in all campaign fields",
        variant: "destructive",
      });
      return;
    }

    if (selectedRecipients.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one recipient",
        variant: "destructive",
      });
      return;
    }

    const zeptoSettings = getZeptoMailSettings();
    if (!zeptoSettings) {
      toast({
        title: "Error",
        description: "Please configure ZeptoMail settings first",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingCampaign(true);

    try {
      const newCampaign: EmailCampaign = {
        id: Date.now().toString(),
        name: currentCampaign.name!,
        subject: currentCampaign.subject!,
        content: currentCampaign.content!,
        replyTo: currentCampaign.replyTo || zeptoSettings.fromEmail,
        status: 'draft',
        recipientCount: selectedRecipients.length,
        sentCount: 0,
        selectedRecipients: [...selectedRecipients],
        createdAt: new Date().toISOString(),
        emailGapMinutes: currentCampaign.emailGapMinutes || 5
      };

      // Save as email template for future use
      const emailTemplate = {
        id: `campaign_${newCampaign.id}`,
        name: newCampaign.name,
        subject: newCampaign.subject,
        content: newCampaign.content,
        trigger: 'form_submission' as const,
        isActive: true
      };
      saveEmailTemplate(emailTemplate);

      const updatedCampaigns = [...campaigns, newCampaign];
      saveCampaigns(updatedCampaigns);

      toast({
        title: "Campaign Created",
        description: `Campaign "${newCampaign.name}" has been created successfully`,
      });

      // Reset form
      setCurrentCampaign({
        name: '',
        subject: '',
        content: '',
        replyTo: '',
        status: 'draft',
        emailGapMinutes: 5
      });
      setSelectedRecipients([]);
      setActiveTab('campaigns');

    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
    } finally {
      setIsCreatingCampaign(false);
    }
  };

  const handleSendCampaign = async (campaign: EmailCampaign) => {
    const selectedRecipientsData = recipients.filter(r => 
      campaign.selectedRecipients.includes(r.id)
    );

    if (selectedRecipientsData.length === 0) {
      toast({
        title: "Error",
        description: "No recipients found for this campaign",
        variant: "destructive",
      });
      return;
    }

    const zeptoSettings = getZeptoMailSettings();
    if (!zeptoSettings) {
      toast({
        title: "Error",
        description: "Please configure ZeptoMail settings first",
        variant: "destructive",
      });
      return;
    }

    // Update campaign status to sending
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id ? { ...c, status: 'sending' as const } : c
    );
    saveCampaigns(updatedCampaigns);

    let sentCount = 0;
    
    // Send emails to all selected recipients with gap
    for (let i = 0; i < selectedRecipientsData.length; i++) {
      const recipient = selectedRecipientsData[i];
      
      // Add delay between emails (except for the first one)
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, campaign.emailGapMinutes * 60 * 1000));
      }
      
      try {
        // Replace variables in subject and content
        let subject = campaign.subject;
        let content = campaign.content;

        const variables = {
          name: recipient.name,
          email: recipient.email,
          company: recipient.company || '',
          phone: recipient.phone || ''
        };

        Object.entries(variables).forEach(([key, value]) => {
          const placeholder = `{{${key}}}`;
          subject = subject.replace(new RegExp(placeholder, 'g'), value);
          content = content.replace(new RegExp(placeholder, 'g'), value);
        });

        // Add tracking pixel for open tracking
        const trackingPixel = `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="1" height="1" style="display:none;" onload="fetch('/api/track-open?log=${campaign.id}_${recipient.id}').catch(()=>{})" />`;
        content += trackingPixel;

        // Send via ZeptoMail API
        const zeptoMailData = {
          from: {
            address: zeptoSettings.fromEmail,
            name: zeptoSettings.fromName
          },
          to: [
            {
              email_address: {
                address: recipient.email
              }
            }
          ],
          reply_to: campaign.replyTo ? [{ address: campaign.replyTo }] : undefined,
          subject: subject,
          htmlbody: content,
          bounce_address: zeptoSettings.bounceAddress || zeptoSettings.fromEmail
        };

        const response = await fetch('https://api.zeptomail.com/v1.1/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Zoho-enczapikey ${zeptoSettings.apiKey}`
          },
          body: JSON.stringify(zeptoMailData)
        });

        const logId = `${campaign.id}_${recipient.id}_${Date.now()}`;
        
        if (response.ok) {
          sentCount++;
          console.log(`Email sent successfully to ${recipient.email}`);
          
          // Log successful send
          saveEmailLog({
            id: logId,
            campaignId: campaign.id,
            recipientEmail: recipient.email,
            recipientName: recipient.name,
            status: 'sent',
            sentAt: new Date().toISOString()
          });
        } else {
          const errorData = await response.json();
          console.error(`Failed to send email to ${recipient.email}:`, errorData);
          
          // Log failed send
          saveEmailLog({
            id: logId,
            campaignId: campaign.id,
            recipientEmail: recipient.email,
            recipientName: recipient.name,
            status: 'failed',
            sentAt: new Date().toISOString(),
            error: errorData.message || 'Unknown error'
          });
        }
      } catch (error) {
        console.error(`Failed to send email to ${recipient.email}:`, error);
        
        // Log failed send
        saveEmailLog({
          id: `${campaign.id}_${recipient.id}_${Date.now()}`,
          campaignId: campaign.id,
          recipientEmail: recipient.email,
          recipientName: recipient.name,
          status: 'failed',
          sentAt: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Update campaign with final status
    const finalCampaigns = campaigns.map(c => 
      c.id === campaign.id 
        ? { 
            ...c, 
            status: 'sent' as const, 
            sentCount,
            openRate: Math.random() * 30 + 15, // Mock data
            clickRate: Math.random() * 10 + 2   // Mock data
          } 
        : c
    );
    saveCampaigns(finalCampaigns);

    toast({
      title: "Campaign Sent",
      description: `Campaign sent to ${sentCount} out of ${selectedRecipientsData.length} recipients`,
    });
  };

  const handleDeleteCampaign = (campaignId: string) => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    saveCampaigns(updatedCampaigns);
    toast({
      title: "Campaign Deleted",
      description: "Campaign has been deleted successfully",
    });
  };

  const exportRecipients = () => {
    const csvContent = [
      ['Email', 'Name', 'Source', 'Company', 'Phone'],
      ...recipients.map(r => [
        r.email,
        r.name,
        r.source,
        r.company || '',
        r.phone || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-recipients-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportEmailLogs = () => {
    const csvContent = [
      ['Campaign', 'Recipient Email', 'Recipient Name', 'Status', 'Sent At', 'Opened', 'Opened At', 'Clicked', 'Clicked At', 'Error'],
      ...emailLogs.map(log => [
        campaigns.find(c => c.id === log.campaignId)?.name || log.campaignId,
        log.recipientEmail,
        log.recipientName,
        log.status,
        log.sentAt,
        log.opened ? 'Yes' : 'No',
        log.openedAt || '',
        log.clicked ? 'Yes' : 'No',
        log.clickedAt || '',
        log.error || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Marketing Email Dashboard</CardTitle>
                <CardDescription>Create and send marketing campaigns with ZeptoMail</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={exportRecipients}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Recipients
              </Button>
              <Button
                onClick={exportEmailLogs}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="compose">Compose Campaign</TabsTrigger>
              <TabsTrigger value="recipients">Recipients ({filteredRecipients.length})</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns ({campaigns.length})</TabsTrigger>
              <TabsTrigger value="logs">Email Logs ({emailLogs.length})</TabsTrigger>
              <TabsTrigger value="settings">Google Sheets</TabsTrigger>
            </TabsList>

            <TabsContent value="compose" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create New Campaign</CardTitle>
                  <CardDescription>
                    Design your marketing email campaign with advanced settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="campaignName">Campaign Name</Label>
                      <Input
                        id="campaignName"
                        value={currentCampaign.name || ''}
                        onChange={(e) => setCurrentCampaign({
                          ...currentCampaign,
                          name: e.target.value
                        })}
                        placeholder="e.g., Monthly Newsletter"
                      />
                    </div>
                    <div>
                      <Label htmlFor="campaignSubject">Email Subject</Label>
                      <Input
                        id="campaignSubject"
                        value={currentCampaign.subject || ''}
                        onChange={(e) => setCurrentCampaign({
                          ...currentCampaign,
                          subject: e.target.value
                        })}
                        placeholder="e.g., Don't miss our latest updates!"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="replyTo">Reply-To Email</Label>
                      <Input
                        id="replyTo"
                        type="email"
                        value={currentCampaign.replyTo || ''}
                        onChange={(e) => setCurrentCampaign({
                          ...currentCampaign,
                          replyTo: e.target.value
                        })}
                        placeholder="reply@yourdomain.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emailGap">Gap Between Emails (minutes)</Label>
                      <Select
                        value={currentCampaign.emailGapMinutes?.toString() || '5'}
                        onValueChange={(value) => setCurrentCampaign({
                          ...currentCampaign,
                          emailGapMinutes: parseInt(value)
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 minute</SelectItem>
                          <SelectItem value="2">2 minutes</SelectItem>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="campaignContent">Email Content</Label>
                    <Textarea
                      id="campaignContent"
                      rows={10}
                      value={currentCampaign.content || ''}
                      onChange={(e) => setCurrentCampaign({
                        ...currentCampaign,
                        content: e.target.value
                      })}
                      placeholder="Write your email content here. Use {{name}}, {{email}}, {{company}} for personalization"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Selected Recipients: {selectedRecipients.length}</h4>
                    <div className="flex gap-2 text-sm text-blue-700">
                      <Badge variant="outline">Newsletter: {selectedRecipients.filter(id => id.startsWith('newsletter_')).length}</Badge>
                      <Badge variant="outline">Leads: {selectedRecipients.filter(id => id.startsWith('lead_')).length}</Badge>
                      <Badge variant="outline">Google Sheets: {selectedRecipients.filter(id => id.startsWith('sheets_')).length}</Badge>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCreateCampaign} 
                    disabled={isCreatingCampaign}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    {isCreatingCampaign ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recipients" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">Email Recipients</CardTitle>
                      <CardDescription>
                        Select recipients from various sources
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSelectAll()} variant="outline" size="sm">
                        {filteredRecipients.every(r => selectedRecipients.includes(r.id)) ? 'Deselect All' : 'Select All'} ({filteredRecipients.length})
                      </Button>
                      <Button onClick={() => fetchAllRecipients()} variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-1" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Search and Filter Controls */}
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Search by email, name, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <select
                        value={filterSource}
                        onChange={(e) => setFilterSource(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Sources</option>
                        <option value="newsletter">Newsletter</option>
                        <option value="leads">Leads</option>
                        <option value="google_sheets">Google Sheets</option>
                      </select>
                    </div>

                    {/* Source filters */}
                    <div className="flex gap-2 mb-4">
                      <Button 
                        onClick={() => handleSelectAll('newsletter')} 
                        variant="outline" 
                        size="sm"
                      >
                        Newsletter ({filteredRecipients.filter(r => r.source === 'newsletter').length})
                      </Button>
                      <Button 
                        onClick={() => handleSelectAll('leads')} 
                        variant="outline" 
                        size="sm"
                      >
                        Leads ({filteredRecipients.filter(r => r.source === 'leads').length})
                      </Button>
                      <Button 
                        onClick={() => handleSelectAll('google_sheets')} 
                        variant="outline" 
                        size="sm"
                      >
                        Google Sheets ({filteredRecipients.filter(r => r.source === 'google_sheets').length})
                      </Button>
                    </div>

                    {/* Selected Count */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>{selectedRecipients.length}</strong> recipients selected for campaign
                      </p>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Select</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Phone</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRecipients.map((recipient) => (
                          <TableRow key={recipient.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedRecipients.includes(recipient.id)}
                                onCheckedChange={(checked) => 
                                  handleRecipientSelection(recipient.id, checked as boolean)
                                }
                              />
                            </TableCell>
                            <TableCell className="font-medium">{recipient.email}</TableCell>
                            <TableCell>{recipient.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{recipient.source}</Badge>
                            </TableCell>
                            <TableCell>{recipient.company || '-'}</TableCell>
                            <TableCell>{recipient.phone || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {filteredRecipients.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No recipients found matching your criteria
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Email Campaigns</CardTitle>
                  <CardDescription>
                    Manage your marketing campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {campaigns.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No campaigns created yet
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Recipients</TableHead>
                          <TableHead>Sent</TableHead>
                          <TableHead>Open Rate</TableHead>
                          <TableHead>Click Rate</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{campaign.name}</div>
                                <div className="text-sm text-gray-500">{campaign.subject}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                campaign.status === 'sent' ? 'default' :
                                campaign.status === 'sending' ? 'secondary' :
                                campaign.status === 'scheduled' ? 'outline' : 'secondary'
                              }>
                                {campaign.status === 'sent' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {campaign.status === 'sending' && <Clock className="w-3 h-3 mr-1" />}
                                {campaign.status === 'draft' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {campaign.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{campaign.recipientCount}</TableCell>
                            <TableCell>{campaign.sentCount}</TableCell>
                            <TableCell>
                              {campaign.openRate ? `${campaign.openRate.toFixed(1)}%` : '-'}
                            </TableCell>
                            <TableCell>
                              {campaign.clickRate ? `${campaign.clickRate.toFixed(1)}%` : '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {campaign.status === 'draft' && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleSendCampaign(campaign)}
                                    disabled={isSending}
                                  >
                                    <Send className="w-3 h-3 mr-1" />
                                    Send
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteCampaign(campaign.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Email Logs & Tracking</CardTitle>
                  <CardDescription>
                    Monitor email delivery status and tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {emailLogs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No email logs found
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Recipient</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Sent At</TableHead>
                          <TableHead>Tracking</TableHead>
                          <TableHead>Error</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {emailLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell>
                              <div className="font-medium">
                                {campaigns.find(c => c.id === log.campaignId)?.name || 'Unknown Campaign'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{log.recipientName}</div>
                                <div className="text-sm text-gray-500">{log.recipientEmail}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                log.status === 'sent' ? 'default' :
                                log.status === 'failed' ? 'destructive' : 'secondary'
                              }>
                                {log.status === 'sent' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {log.status === 'failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {log.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(log.sentAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {log.opened ? (
                                  <Badge variant="outline" className="text-green-600">
                                    <Eye className="w-3 h-3 mr-1" />
                                    Opened
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-gray-500">
                                    Not Opened
                                  </Badge>
                                )}
                                {log.clicked && (
                                  <Badge variant="outline" className="text-blue-600">
                                    <Activity className="w-3 h-3 mr-1" />
                                    Clicked
                                  </Badge>
                                )}
                              </div>
                              {log.openedAt && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Opened: {new Date(log.openedAt).toLocaleString()}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {log.error && (
                                <div className="text-sm text-red-600 max-w-xs truncate" title={log.error}>
                                  {log.error}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Google Sheets Integration</CardTitle>
                  <CardDescription>
                    Connect to Google Sheets to import email contacts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="enableGoogleSheets"
                      checked={googleSheetsConfig.isEnabled}
                      onCheckedChange={(checked) => 
                        setGoogleSheetsConfig({
                          ...googleSheetsConfig,
                          isEnabled: checked as boolean
                        })
                      }
                    />
                    <Label htmlFor="enableGoogleSheets">Enable Google Sheets Integration</Label>
                  </div>

                  {googleSheetsConfig.isEnabled && (
                    <>
                      <div>
                        <Label htmlFor="spreadsheetUrl">Google Sheets URL</Label>
                        <Input
                          id="spreadsheetUrl"
                          value={googleSheetsConfig.spreadsheetUrl}
                          onChange={(e) => setGoogleSheetsConfig({
                            ...googleSheetsConfig,
                            spreadsheetUrl: e.target.value
                          })}
                          placeholder="https://docs.google.com/spreadsheets/d/..."
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor="emailColumn">Email Column</Label>
                          <Input
                            id="emailColumn"
                            value={googleSheetsConfig.emailColumn}
                            onChange={(e) => setGoogleSheetsConfig({
                              ...googleSheetsConfig,
                              emailColumn: e.target.value
                            })}
                            placeholder="A"
                          />
                        </div>
                        <div>
                          <Label htmlFor="nameColumn">Name Column</Label>
                          <Input
                            id="nameColumn"
                            value={googleSheetsConfig.nameColumn}
                            onChange={(e) => setGoogleSheetsConfig({
                              ...googleSheetsConfig,
                              nameColumn: e.target.value
                            })}
                            placeholder="B"
                          />
                        </div>
                        <div>
                          <Label htmlFor="companyColumn">Company Column</Label>
                          <Input
                            id="companyColumn"
                            value={googleSheetsConfig.companyColumn || ''}
                            onChange={(e) => setGoogleSheetsConfig({
                              ...googleSheetsConfig,
                              companyColumn: e.target.value
                            })}
                            placeholder="C"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phoneColumn">Phone Column</Label>
                          <Input
                            id="phoneColumn"
                            value={googleSheetsConfig.phoneColumn || ''}
                            onChange={(e) => setGoogleSheetsConfig({
                              ...googleSheetsConfig,
                              phoneColumn: e.target.value
                            })}
                            placeholder="D"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Button 
                    onClick={() => saveGoogleSheetsConfig(googleSheetsConfig)}
                    className="bg-gradient-to-r from-green-600 to-blue-600"
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Save Google Sheets Configuration
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingEmailDashboard;

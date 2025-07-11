
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Send, 
  Users, 
  FileSpreadsheet,
  Database,
  Plus,
  Eye,
  Trash2,
  Download,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useZeptoMailAutomation } from '@/hooks/useZeptoMailAutomation';
import { useNewsletterEmails } from '@/hooks/useNewsletterEmails';
import { useLocalLeads } from '@/hooks/useLocalLeads';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  recipientCount: number;
  sentCount: number;
  openRate?: number;
  clickRate?: number;
  scheduledDate?: string;
  createdAt: string;
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
  const { getZeptoMailSettings, sendZeptoMailEmail, isSending } = useZeptoMailAutomation();
  const { emails: newsletterEmails } = useNewsletterEmails();
  const { leads } = useLocalLeads();

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [currentCampaign, setCurrentCampaign] = useState<Partial<EmailCampaign>>({
    name: '',
    subject: '',
    content: '',
    status: 'draft'
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
    loadGoogleSheetsConfig();
    fetchAllRecipients();
  }, []);

  const loadCampaigns = () => {
    const stored = localStorage.getItem('marketing_campaigns');
    if (stored) {
      setCampaigns(JSON.parse(stored));
    }
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
      ? recipients.filter(r => r.source === source)
      : recipients;
    
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
        status: 'draft',
        recipientCount: selectedRecipients.length,
        sentCount: 0,
        createdAt: new Date().toISOString()
      };

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
        status: 'draft'
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
      selectedRecipients.includes(r.id)
    );

    if (selectedRecipientsData.length === 0) {
      toast({
        title: "Error",
        description: "No recipients selected for this campaign",
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
    
    // Send emails to all selected recipients
    for (const recipient of selectedRecipientsData) {
      try {
        await sendZeptoMailEmail(
          recipient.email,
          'marketing_campaign',
          {
            name: recipient.name,
            email: recipient.email,
            company: recipient.company || '',
            phone: recipient.phone || ''
          }
        );
        sentCount++;
      } catch (error) {
        console.error(`Failed to send email to ${recipient.email}:`, error);
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
      description: `Campaign sent to ${sentCount} recipients`,
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
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="compose">Compose Campaign</TabsTrigger>
              <TabsTrigger value="recipients">Recipients ({recipients.length})</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns ({campaigns.length})</TabsTrigger>
              <TabsTrigger value="settings">Google Sheets</TabsTrigger>
            </TabsList>

            <TabsContent value="compose" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create New Campaign</CardTitle>
                  <CardDescription>
                    Design your marketing email campaign
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
                        Select All ({recipients.length})
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
                    {/* Source filters */}
                    <div className="flex gap-2 mb-4">
                      <Button 
                        onClick={() => handleSelectAll('newsletter')} 
                        variant="outline" 
                        size="sm"
                      >
                        Newsletter ({recipients.filter(r => r.source === 'newsletter').length})
                      </Button>
                      <Button 
                        onClick={() => handleSelectAll('leads')} 
                        variant="outline" 
                        size="sm"
                      >
                        Leads ({recipients.filter(r => r.source === 'leads').length})
                      </Button>
                      <Button 
                        onClick={() => handleSelectAll('google_sheets')} 
                        variant="outline" 
                        size="sm"
                      >
                        Google Sheets ({recipients.filter(r => r.source === 'google_sheets').length})
                      </Button>
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
                        {recipients.map((recipient) => (
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

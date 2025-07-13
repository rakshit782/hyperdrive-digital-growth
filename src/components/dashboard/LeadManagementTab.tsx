
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Building,
  Calendar,
  Target,
  TrendingUp,
  Search,
  Filter,
  Globe,
  FileText,
  Award,
  RefreshCw,
  Download,
  Eye,
  Hash
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import LeadDetailsModal from "./LeadDetailsModal";

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

interface Lead {
  id: string;
  lead_number?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status: LeadStatus;
  notes?: string;
  form_security?: Record<string, any>;
  lead_data?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

const LeadManagementTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    converted: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800'
  };

  const sourceIcons = {
    website: Globe,
    contact_form: Mail,
    free_audit_form: Award,
    referral: Users,
    social_media: Target,
    google_ads: Search,
    facebook_ads: Target,
    cold_outreach: Phone,
    other: FileText
  };

  const loadLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setLeads(data || []);
      console.log('Leads loaded from Supabase:', data);
    } catch (error) {
      console.error('Error loading leads:', error);
      toast({
        title: "Error",
        description: "Failed to load leads from database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead status updated successfully",
      });
      loadLeads();
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast({
        title: "Error",
        description: "Failed to update lead status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Lead deleted successfully",
        });
        loadLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
        toast({
          title: "Error",
          description: "Failed to delete lead",
          variant: "destructive",
        });
      }
    }
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch = !searchTerm || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.lead_number && lead.lead_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
    conversionRate: leads.length > 0 ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0,
    formSubmissions: leads.filter(l => l.source === 'contact_form' || l.source === 'free_audit_form').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading leads from database...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mr-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Lead Management</CardTitle>
                <CardDescription>Track and manage your leads with database storage</CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={loadLeads} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Lead Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Leads</p>
                    <p className="text-2xl font-bold text-blue-900">{leadStats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">New</p>
                    <p className="text-2xl font-bold text-yellow-900">{leadStats.new}</p>
                  </div>
                  <Target className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Qualified</p>
                    <p className="text-2xl font-bold text-purple-900">{leadStats.qualified}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Converted</p>
                    <p className="text-2xl font-bold text-green-900">{leadStats.converted}</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">Conv. Rate</p>
                    <p className="text-2xl font-bold text-indigo-900">{leadStats.conversionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-teal-600">Form Leads</p>
                    <p className="text-2xl font-bold text-teal-900">{leadStats.formSubmissions}</p>
                  </div>
                  <FileText className="w-8 h-8 text-teal-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search leads by name, email, lead ID, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Leads Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => {
                    const SourceIcon = sourceIcons[lead.source as keyof typeof sourceIcons] || FileText;
                    const uploadedFiles = lead.lead_data?.uploadedFiles || {};
                    
                    return (
                      <TableRow key={lead.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-mono text-blue-600 hover:text-blue-800"
                            onClick={() => handleLeadClick(lead)}
                          >
                            <Hash className="w-3 h-3 mr-1" />
                            {lead.lead_number || lead.id.slice(0, 8)}
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {lead.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          {lead.company && (
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4 text-gray-400" />
                              {lead.company}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {lead.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {lead.phone}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {lead.source && (
                            <Badge variant="outline" className="text-xs flex items-center gap-1 w-fit">
                              <SourceIcon className="w-3 h-3" />
                              {lead.source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Select value={lead.status} onValueChange={(value: LeadStatus) => handleStatusChange(lead.id, value)}>
                            <SelectTrigger className="w-32">
                              <Badge className={statusColors[lead.status]}>
                                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="qualified">Qualified</SelectItem>
                              <SelectItem value="converted">Converted</SelectItem>
                              <SelectItem value="lost">Lost</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {Object.keys(uploadedFiles).length > 0 ? (
                              <>
                                <FileText className="w-4 h-4 text-green-600" />
                                <span className="text-xs text-green-600 font-medium">
                                  {Object.keys(uploadedFiles).length} file(s)
                                </span>
                              </>
                            ) : (
                              <span className="text-xs text-gray-400">No files</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(lead.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleLeadClick(lead)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(lead.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No leads found</h3>
                      <p className="text-gray-600">
                        {filterStatus === 'all' && !searchTerm ? 'Start by submitting a form to see leads here' : 
                         searchTerm ? `No leads match "${searchTerm}"` :
                         `No leads with status "${filterStatus}"`}
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Lead Details Modal */}
      <LeadDetailsModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLead(null);
        }}
      />
    </div>
  );
};

export default LeadManagementTab;

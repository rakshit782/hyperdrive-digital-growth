
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Target, 
  Globe, 
  DollarSign,
  MessageSquare,
  Download,
  FileText,
  AlertTriangle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  lead_number?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status: string;
  notes?: string;
  form_security?: Record<string, any>;
  lead_data?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

interface LeadDetailsModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ lead, isOpen, onClose }) => {
  const { toast } = useToast();

  if (!lead) return null;

  const uploadedFiles = lead.lead_data?.uploadedFiles || {};
  const leadData = lead.lead_data || {};

  const downloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('lead-files')
        .download(filePath);

      if (error) {
        console.error('Download error:', error);
        toast({
          title: "Download Failed",
          description: "Could not download the file. It may have been removed.",
          variant: "destructive",
        });
        return;
      }

      // Create blob URL and trigger download
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Started",
        description: `${fileName} is being downloaded.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Error",
        description: "An unexpected error occurred while downloading the file.",
        variant: "destructive",
      });
    }
  };

  const FileDownloadButton = ({ filePath, fileName, label }: { 
    filePath: string; 
    fileName: string; 
    label: string; 
  }) => (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => downloadFile(filePath, fileName)}
          className="flex items-center space-x-1"
        >
          <Download className="w-3 h-3" />
          <span>Download</span>
        </Button>
      </div>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Lead Details - {lead.lead_number || lead.id.slice(0, 8)}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Header Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{lead.name}</span>
                <Badge className={
                  lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                  lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                  lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{lead.email}</span>
                </div>
                {lead.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{lead.phone}</span>
                  </div>
                )}
                {lead.company && (
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{lead.company}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{new Date(lead.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          {leadData.businessGoals && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Business Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leadData.website && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Website</h4>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a 
                        href={leadData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {leadData.website}
                      </a>
                    </div>
                  </div>
                )}
                
                {leadData.monthlyAdSpend && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Monthly Ad Spend</h4>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{leadData.monthlyAdSpend}</span>
                    </div>
                  </div>
                )}
                
                {leadData.primaryPlatform && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Primary Platform</h4>
                    <span className="text-sm">{leadData.primaryPlatform}</span>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Business Goals</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{leadData.businessGoals}</p>
                </div>
                
                {leadData.currentChallenges && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Current Challenges</h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{leadData.currentChallenges}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Uploaded Files */}
          {Object.keys(uploadedFiles).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Uploaded Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {uploadedFiles.businessSalesReport && (
                  <FileDownloadButton
                    filePath={uploadedFiles.businessSalesReport}
                    fileName="30-Days-Business-Sales-Report"
                    label="30 Days Business Sales Report"
                  />
                )}
                {uploadedFiles.searchTermReport && (
                  <FileDownloadButton
                    filePath={uploadedFiles.searchTermReport}
                    fileName="60-Days-Search-Term-Report"
                    label="60 Days Search Term Report"
                  />
                )}
                {uploadedFiles.advertisedProductReport && (
                  <FileDownloadButton
                    filePath={uploadedFiles.advertisedProductReport}
                    fileName="60-Days-Advertised-Product-Report"
                    label="60 Days Advertised Product Report"
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Additional Notes */}
          {lead.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Additional Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{lead.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Technical Information */}
          {lead.form_security && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Technical Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-gray-600">
                  <p><strong>Source:</strong> {lead.source || 'Unknown'}</p>
                  <p><strong>Submitted At:</strong> {new Date(lead.created_at).toLocaleString()}</p>
                  {lead.form_security.pageUrl && (
                    <p><strong>Page URL:</strong> {lead.form_security.pageUrl}</p>
                  )}
                  {lead.form_security.userAgent && (
                    <p><strong>User Agent:</strong> {lead.form_security.userAgent.substring(0, 100)}...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;

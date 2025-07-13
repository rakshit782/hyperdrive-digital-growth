
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Calendar,
  RefreshCw,
  Download,
  Filter,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { databaseService } from '@/services/databaseService';

interface SecurityLog {
  id: string;
  form_type: string;
  honeypot_triggered: boolean;
  csrf_valid: boolean;
  recaptcha_score: number | null;
  ip_address: string | null;
  user_agent: string | null;
  submission_data: Record<string, any>;
  created_at: string;
}

const FormSecurityTab = () => {
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadSecurityLogs = async () => {
    try {
      setLoading(true);
      const logs = await databaseService.getFormSecurityLogs();
      // Cast the data to match our SecurityLog interface
      const typedLogs = logs.map(log => ({
        ...log,
        ip_address: log.ip_address as string | null,
        submission_data: (log.submission_data as Record<string, any>) || {}
      }));
      setSecurityLogs(typedLogs);
    } catch (error) {
      console.error('Error loading security logs:', error);
      toast({
        title: "Error",
        description: "Failed to load security logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSecurityLogs();
  }, []);

  const getSecurityStatus = (log: SecurityLog) => {
    if (log.honeypot_triggered) return 'blocked';
    if (!log.csrf_valid) return 'suspicious';
    if (log.recaptcha_score && log.recaptcha_score < 0.5) return 'suspicious';
    return 'safe';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-800';
      case 'suspicious':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return CheckCircle;
      case 'suspicious':
        return AlertTriangle;
      case 'blocked':
        return XCircle;
      default:
        return Shield;
    }
  };

  const securityStats = {
    total: securityLogs.length,
    blocked: securityLogs.filter(log => getSecurityStatus(log) === 'blocked').length,
    suspicious: securityLogs.filter(log => getSecurityStatus(log) === 'suspicious').length,
    safe: securityLogs.filter(log => getSecurityStatus(log) === 'safe').length,
    honeypotTriggered: securityLogs.filter(log => log.honeypot_triggered).length,
    lowRecaptcha: securityLogs.filter(log => log.recaptcha_score && log.recaptcha_score < 0.5).length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading security logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Form Security</CardTitle>
                <CardDescription>Monitor form submissions and security events</CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={loadSecurityLogs} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Security Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Events</p>
                    <p className="text-2xl font-bold text-blue-900">{securityStats.total}</p>
                  </div>
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Blocked</p>
                    <p className="text-2xl font-bold text-red-900">{securityStats.blocked}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Suspicious</p>
                    <p className="text-2xl font-bold text-yellow-900">{securityStats.suspicious}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Safe</p>
                    <p className="text-2xl font-bold text-green-900">{securityStats.safe}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Honeypot</p>
                    <p className="text-2xl font-bold text-purple-900">{securityStats.honeypotTriggered}</p>
                  </div>
                  <Shield className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">Low Score</p>
                    <p className="text-2xl font-bold text-indigo-900">{securityStats.lowRecaptcha}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Logs Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Honeypot</TableHead>
                  <TableHead>CSRF</TableHead>
                  <TableHead>reCAPTCHA</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityLogs.length > 0 ? (
                  securityLogs.map((log) => {
                    const status = getSecurityStatus(log);
                    const StatusIcon = getStatusIcon(status);
                    
                    return (
                      <TableRow key={log.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {log.form_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {log.ip_address || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {log.honeypot_triggered ? (
                            <Badge className="bg-red-100 text-red-800">
                              <XCircle className="w-3 h-3 mr-1" />
                              Triggered
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Clean
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {log.csrf_valid ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Valid
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">
                              <XCircle className="w-3 h-3 mr-1" />
                              Invalid
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {log.recaptcha_score ? (
                            <Badge className={log.recaptcha_score >= 0.5 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                              {log.recaptcha_score.toFixed(2)}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(log.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No security logs found</h3>
                      <p className="text-gray-600">Security events will appear here when forms are submitted</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSecurityTab;

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { databaseService, SecurityLog } from "@/services/databaseService";
import { useToast } from "@/hooks/use-toast";

const FormSecurityTab = () => {
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSecurityLogs();
  }, []);

  const loadSecurityLogs = async () => {
    try {
      setLoading(true);
      const logs = await databaseService.getFormSecurityLogs();
      setSecurityLogs(logs);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = {
    total: securityLogs.length,
    honeypotTriggered: securityLogs.filter(log => log.honeypot_triggered).length,
    validSubmissions: securityLogs.filter(log => log.csrf_valid && !log.honeypot_triggered).length,
    highRiskSubmissions: securityLogs.filter(log => log.recaptcha_score && log.recaptcha_score < 0.5).length
  };

  return (
    <div className="space-y-6">
      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Honeypot Triggered</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.honeypotTriggered}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid Submissions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.validSubmissions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.highRiskSubmissions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Security Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Form Security Logs</CardTitle>
          <CardDescription>
            Monitor form submissions and security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          {securityLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No security logs found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form Type</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>reCAPTCHA Score</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.form_type}</TableCell>
                    <TableCell>{log.ip_address || 'N/A'}</TableCell>
                    <TableCell>
                      {log.honeypot_triggered ? (
                        <Badge variant="destructive">Honeypot Triggered</Badge>
                      ) : log.csrf_valid ? (
                        <Badge variant="default">Valid</Badge>
                      ) : (
                        <Badge variant="secondary">Invalid CSRF</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {log.recaptcha_score ? (
                        <Badge variant={log.recaptcha_score >= 0.5 ? 'default' : 'destructive'}>
                          {log.recaptcha_score.toFixed(2)}
                        </Badge>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-3 h-3" />
                        {new Date(log.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSecurityTab;

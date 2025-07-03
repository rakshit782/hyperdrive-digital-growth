
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, Shield, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecurityLog {
  id: string;
  form_type: string;
  ip_address: string;
  user_agent: string;
  recaptcha_score: number;
  honeypot_triggered: boolean;
  csrf_valid: boolean;
  submission_data: any;
  created_at: string;
}

export const FormSecurityTab = () => {
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    validSubmissions: 0,
    blockedSubmissions: 0,
    avgRecaptchaScore: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSecurityLogs();
  }, []);

  const fetchSecurityLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('form_security_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setSecurityLogs(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching security logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch security logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (logs: SecurityLog[]) => {
    const total = logs.length;
    const valid = logs.filter(log => 
      !log.honeypot_triggered && 
      log.csrf_valid && 
      log.recaptcha_score >= 0.5
    ).length;
    const blocked = total - valid;
    const avgScore = logs.reduce((sum, log) => sum + (log.recaptcha_score || 0), 0) / total;

    setStats({
      totalSubmissions: total,
      validSubmissions: valid,
      blockedSubmissions: blocked,
      avgRecaptchaScore: avgScore
    });
  };

  const getSecurityStatus = (log: SecurityLog) => {
    if (log.honeypot_triggered) return { status: 'blocked', reason: 'Honeypot triggered' };
    if (!log.csrf_valid) return { status: 'blocked', reason: 'Invalid CSRF token' };
    if (log.recaptcha_score < 0.5) return { status: 'blocked', reason: 'Low reCAPTCHA score' };
    return { status: 'valid', reason: 'Passed all checks' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Form Security Monitor</h2>
        <p className="text-slate-600">Monitor form submission security and spam protection.</p>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Submissions</p>
                <p className="text-2xl font-bold">{stats.totalSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Valid Submissions</p>
                <p className="text-2xl font-bold text-green-600">{stats.validSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Blocked Submissions</p>
                <p className="text-2xl font-bold text-red-600">{stats.blockedSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Avg reCAPTCHA Score</p>
                <p className="text-2xl font-bold">{stats.avgRecaptchaScore.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>Latest form submission security checks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityLogs.map((log) => {
              const securityStatus = getSecurityStatus(log);
              return (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={securityStatus.status === 'valid' ? 'default' : 'destructive'}>
                        {log.form_type}
                      </Badge>
                      <Badge variant="outline">
                        Score: {(log.recaptcha_score || 0).toFixed(2)}
                      </Badge>
                      {log.honeypot_triggered && (
                        <Badge variant="destructive">Honeypot</Badge>
                      )}
                      {!log.csrf_valid && (
                        <Badge variant="destructive">CSRF</Badge>
                      )}
                    </div>
                    <span className="text-sm text-slate-500">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><span className="font-medium">Status:</span> {securityStatus.reason}</p>
                      <p><span className="font-medium">IP:</span> {log.ip_address}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">User Agent:</span> 
                        <span className="text-slate-600 truncate block">
                          {log.user_agent?.substring(0, 50)}...
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {securityLogs.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No security logs available yet.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={fetchSecurityLogs} variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Refresh Logs
        </Button>
      </div>
    </div>
  );
};

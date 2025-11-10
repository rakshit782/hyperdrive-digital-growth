import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

interface SecurityLog {
  id: string;
  form_type: string;
  ip_address?: string;
  user_agent?: string;
  recaptcha_score?: number;
  honeypot_triggered?: boolean;
  csrf_valid?: boolean;
  created_at: string;
}

interface SecuritySectionProps {
  logs: SecurityLog[];
  onRefresh: () => void;
}

export function SecuritySection({ logs, onRefresh }: SecuritySectionProps) {
  const suspiciousLogs = logs.filter(
    (log) => log.honeypot_triggered || (log.recaptcha_score && log.recaptcha_score < 0.5)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Security Logs</h2>
          <p className="text-muted-foreground mt-1">
            {logs.length} total events, {suspiciousLogs.length} suspicious
          </p>
        </div>
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {logs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No security logs yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => {
            const isSuspicious =
              log.honeypot_triggered || (log.recaptcha_score && log.recaptcha_score < 0.5);

            return (
              <Card
                key={log.id}
                className={`border-l-4 ${
                  isSuspicious ? "border-l-orange-500" : "border-l-gray-300"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {isSuspicious ? (
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <span className="font-medium">
                          {log.form_type.charAt(0).toUpperCase() + log.form_type.slice(1)} Form
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            isSuspicious
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {isSuspicious ? "Suspicious" : "Clean"}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        {log.ip_address && (
                          <p>
                            <span className="font-medium">IP:</span> {log.ip_address}
                          </p>
                        )}
                        {log.recaptcha_score !== null && log.recaptcha_score !== undefined && (
                          <p>
                            <span className="font-medium">reCAPTCHA Score:</span>{" "}
                            {log.recaptcha_score.toFixed(2)}
                          </p>
                        )}
                        {log.honeypot_triggered && (
                          <p className="text-orange-600 font-medium">⚠ Honeypot Triggered</p>
                        )}
                        {log.csrf_valid !== null && log.csrf_valid !== undefined && (
                          <p>
                            <span className="font-medium">CSRF:</span>{" "}
                            {log.csrf_valid ? "Valid" : "Invalid"}
                          </p>
                        )}
                        {log.user_agent && (
                          <p className="text-xs truncate">
                            <span className="font-medium">User Agent:</span> {log.user_agent}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(log.created_at).toLocaleDateString()}
                        <br />
                        {new Date(log.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Monitor, RefreshCw, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VisitorLog {
  id: string;
  ip_address: string;
  user_agent: string;
  page_url: string;
  referrer?: string;
  country?: string;
  city?: string;
  region?: string;
  created_at: string;
}

interface VisitorLogsSectionProps {
  logs: VisitorLog[];
  onRefresh: () => void;
}

export function VisitorLogsSection({ logs, onRefresh }: VisitorLogsSectionProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const getBrowserFromUserAgent = (ua: string) => {
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Other';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Visitor Logs</h2>
          <p className="text-muted-foreground mt-1">{logs.length} total visits</p>
        </div>
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {logs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No visitor logs yet</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="border-l-4 border-l-blue-500 bg-card p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        <span className="font-mono text-sm font-medium">
                          {log.ip_address}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(log.created_at)}
                      </span>
                    </div>

                    {(log.city || log.country) && (
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {[log.city, log.region, log.country]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {getBrowserFromUserAgent(log.user_agent)}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      <ExternalLink className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <a
                          href={log.page_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all"
                        >
                          {log.page_url}
                        </a>
                        {log.referrer && (
                          <p className="text-xs text-muted-foreground mt-1">
                            From: {log.referrer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

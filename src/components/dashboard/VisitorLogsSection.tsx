import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Server, 
  Laptop, 
  MapPin, 
  Monitor, 
  RefreshCw, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Download,
  Filter
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VisitorLog, trackBackendApiCall, trackVisitor } from "@/utils/visitorTracker";
import { toast } from "sonner";

interface VisitorLogsSectionProps {
  logs: VisitorLog[];
  onRefresh: () => void;
}

export function VisitorLogsSection({ logs, onRefresh }: VisitorLogsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Group logs into Frontend, Backend, and Localhost
  const { frontendLogs, backendLogs, localhostLogs } = useMemo(() => {
    const frontend: VisitorLog[] = [];
    const backend: VisitorLog[] = [];
    const localhost: VisitorLog[] = [];

    logs.forEach((log) => {
      if (log.environment === 'localhost' || log.is_local) {
        localhost.push(log);
      } else if (log.environment === 'backend' || log.source_type === 'backend') {
        backend.push(log);
      } else {
        frontend.push(log);
      }
    });

    return {
      frontendLogs: frontend,
      backendLogs: backend,
      localhostLogs: localhost,
    };
  }, [logs]);

  const displayedLogs = useMemo(() => {
    switch (activeTab) {
      case "frontend":
        return frontendLogs;
      case "backend":
        return backendLogs;
      case "localhost":
        return localhostLogs;
      default:
        return logs;
    }
  }, [activeTab, logs, frontendLogs, backendLogs, localhostLogs]);

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleString();
    } catch {
      return date;
    }
  };

  const getBrowserFromUserAgent = (ua: string) => {
    if (!ua) return 'Client';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    if (ua.includes('Backend') || ua.includes('Postman') || ua.includes('curl')) return 'API Client';
    return 'Web Browser';
  };

  const getEnvBadge = (log: VisitorLog) => {
    if (log.environment === 'localhost' || log.is_local) {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs gap-1 font-mono">
          <Laptop className="h-3 w-3" /> Localhost
        </Badge>
      );
    }
    if (log.environment === 'backend' || log.source_type === 'backend') {
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs gap-1 font-mono">
          <Server className="h-3 w-3" /> Backend
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs gap-1 font-mono">
        <Globe className="h-3 w-3" /> Frontend
      </Badge>
    );
  };

  // Test generator helper
  const handleGenerateTestLog = async (type: 'frontend' | 'backend' | 'localhost') => {
    setIsSimulating(true);
    try {
      if (type === 'backend') {
        await trackBackendApiCall('neon-case-studies/query', { testSource: 'admin-dashboard' });
        toast.success('Generated Backend API test log');
      } else {
        await trackVisitor();
        toast.success(`Generated ${type === 'localhost' ? 'Localhost' : 'Frontend'} visitor log`);
      }
      setTimeout(onRefresh, 800);
    } catch {
      toast.error('Could not generate log');
    } finally {
      setIsSimulating(false);
    }
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(displayedLogs, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitor-logs-${activeTab}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${displayedLogs.length} logs`);
  };

  return (
    <div className="space-y-6">
      {/* Header and Summary Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Visitor Logs Hub</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Segmented tracking across live Production Frontend, Backend Edge Functions, and Localhost Dev environment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onRefresh} variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button onClick={handleExportJson} variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" /> Export Logs
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          onClick={() => setActiveTab("all")}
          className={`cursor-pointer transition-all border ${
            activeTab === 'all' ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-sm' : 'hover:border-slate-300'
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Combined Logs</p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">{logs.length}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
              <Layers className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setActiveTab("frontend")}
          className={`cursor-pointer transition-all border ${
            activeTab === 'frontend' ? 'border-blue-600 ring-2 ring-blue-600/10 shadow-sm' : 'hover:border-blue-300'
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-blue-600">Frontend (Production)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{frontendLogs.length}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Globe className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setActiveTab("backend")}
          className={`cursor-pointer transition-all border ${
            activeTab === 'backend' ? 'border-purple-600 ring-2 ring-purple-600/10 shadow-sm' : 'hover:border-purple-300'
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-purple-600">Backend (Edge APIs)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{backendLogs.length}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
              <Server className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setActiveTab("localhost")}
          className={`cursor-pointer transition-all border ${
            activeTab === 'localhost' ? 'border-amber-600 ring-2 ring-amber-600/10 shadow-sm' : 'hover:border-amber-300'
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-amber-600">Localhost (Dev & Test)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{localhostLogs.length}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Laptop className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Log Feed */}
      <Card>
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-600" />
                <span>Segmented Activity Stream</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Displaying {displayedLogs.length} entries for current filter
              </CardDescription>
            </div>

            {/* Quick Test Generation Trigger */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">Generate Log:</span>
              <Button
                variant="outline"
                size="sm"
                disabled={isSimulating}
                onClick={() => handleGenerateTestLog('frontend')}
                className="text-xs h-7 px-2"
              >
                + Frontend
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={isSimulating}
                onClick={() => handleGenerateTestLog('backend')}
                className="text-xs h-7 px-2"
              >
                + Backend
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={isSimulating}
                onClick={() => handleGenerateTestLog('localhost')}
                className="text-xs h-7 px-2"
              >
                + Localhost
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-3 border-b border-slate-100">
              <TabsList className="bg-slate-100/80 p-0.5">
                <TabsTrigger value="all" className="text-xs">
                  All Combined ({logs.length})
                </TabsTrigger>
                <TabsTrigger value="frontend" className="text-xs">
                  Frontend ({frontendLogs.length})
                </TabsTrigger>
                <TabsTrigger value="backend" className="text-xs">
                  Backend ({backendLogs.length})
                </TabsTrigger>
                <TabsTrigger value="localhost" className="text-xs">
                  Localhost ({localhostLogs.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="m-0 p-6 pt-4">
              {displayedLogs.length === 0 ? (
                <div className="py-16 text-center">
                  <Globe className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-600">No logs in this category</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Use the buttons above to generate sample activity or browse the website.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[550px] pr-4">
                  <div className="space-y-3">
                    {displayedLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`p-4 rounded-xl border transition-all ${
                          log.environment === 'localhost' || log.is_local
                            ? 'bg-amber-50/20 border-amber-200/60 hover:border-amber-300'
                            : log.environment === 'backend' || log.source_type === 'backend'
                            ? 'bg-purple-50/20 border-purple-200/60 hover:border-purple-300'
                            : 'bg-white border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            {getEnvBadge(log)}
                            <span className="font-mono text-xs font-semibold text-slate-800">
                              {log.ip_address}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(log.created_at)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 mb-2.5">
                          {(log.city || log.country) && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">
                                {[log.city, log.region, log.country].filter(Boolean).join(", ")}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <Monitor className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{getBrowserFromUserAgent(log.user_agent)}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs">
                          <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <a
                              href={log.page_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:text-blue-800 break-all font-mono text-[11px] hover:underline"
                            >
                              {log.page_url}
                            </a>
                            {log.referrer && (
                              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                                Context: {log.referrer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default VisitorLogsSection;

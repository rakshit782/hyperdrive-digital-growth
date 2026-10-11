import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Mail, MessageSquare, Shield, TrendingUp, ArrowUpRight, 
  Sparkles, CheckCircle2, Clock, Send, Eye, ShieldAlert,
  Database, RefreshCw
} from "lucide-react";

interface OverviewSectionProps {
  stats: {
    contacts: number;
    leads: number;
    newsletters: number;
    securityLogs: number;
  };
  leads?: any[];
  contacts?: any[];
  onNavigate?: (section: string) => void;
  onRefresh?: () => void;
}

export function OverviewSection({ stats, leads = [], contacts = [], onNavigate, onRefresh }: OverviewSectionProps) {
  const cards = [
    {
      title: "Total Captured Leads",
      value: stats.leads,
      subtitle: "From website audit & landing forms",
      icon: Users,
      trend: "+100% live Neon sync",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      target: "leads",
    },
    {
      title: "Contact Inquiries",
      value: stats.contacts,
      subtitle: "General inquiries received",
      icon: MessageSquare,
      trend: "Direct database storage",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10",
      target: "contacts",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.newsletters,
      subtitle: "Marketing email subscriber list",
      icon: Mail,
      trend: "Audience growth",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-500/10",
      target: "newsletter",
    },
    {
      title: "Security & Form Audits",
      value: stats.securityLogs,
      subtitle: "Automated honeypot & spam blocks",
      icon: Shield,
      trend: "Protected by Bot Shield",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      target: "security",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Refresh */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20 mb-1">
            <Database className="h-3 w-3" />
            Connected directly to Neon Postgres
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome to AMZ AD SCOUT Command Center
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Live client leads, website inquiries, dynamic email dispatch settings, and growth analytics in one unified dashboard.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {onRefresh && (
            <Button onClick={onRefresh} variant="outline" size="sm" className="gap-2 bg-background/80 shadow-xs">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh Data
            </Button>
          )}
          <Button onClick={() => onNavigate?.("leads")} size="sm" className="gap-2 shadow-xs">
            <Users className="h-3.5 w-3.5" />
            View Live Leads
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card 
            key={card.title} 
            onClick={() => onNavigate?.(card.target)}
            className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/40 relative overflow-hidden group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${card.bgColor} ${card.color} transition-transform group-hover:scale-110`}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                <span>{card.subtitle}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dual Section: Recent Leads & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Inquiries List */}
        <Card className="md:col-span-2 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold">Recent Leads Captured</CardTitle>
              <CardDescription className="text-xs">
                Latest seller prospects submitted through website audit forms
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate?.("leads")} className="text-xs gap-1">
              View All Leads <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                <Users className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                No leads recorded yet. Test by submitting the contact form on your website.
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {leads.slice(0, 5).map((lead: any) => (
                  <div key={lead.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate text-foreground">{lead.name}</p>
                        {lead.lead_number && (
                          <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                            {lead.lead_number}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{lead.email} &bull; {lead.company || "Independent Seller"}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 capitalize">
                        {lead.status || "New"}
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Operations & Status */}
        <div className="space-y-4">
          <Card className="shadow-xs border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                onClick={() => onNavigate?.("settings-email")}
                className="w-full justify-start text-xs h-9 gap-2"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                Configure Lead Email Routing
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate?.("leads")}
                className="w-full justify-start text-xs h-9 gap-2"
              >
                <Users className="h-3.5 w-3.5 text-primary" />
                Review & Export Leads
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate?.("case-studies")}
                className="w-full justify-start text-xs h-9 gap-2"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Upload New Case Studies
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate?.("tracking")}
                className="w-full justify-start text-xs h-9 gap-2"
              >
                <Eye className="h-3.5 w-3.5 text-primary" />
                Google Analytics & Pixel Tags
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate?.("status")}
                className="w-full justify-start text-xs h-9 gap-2"
              >
                <Database className="h-3.5 w-3.5 text-emerald-500" />
                Neon, Vercel & Render Status
              </Button>
            </CardContent>
          </Card>

          <Card 
            onClick={() => onNavigate?.("status")}
            className="bg-muted/30 border shadow-xs hover:border-emerald-500/50 cursor-pointer transition-all"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Platform Health
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Neon Postgres, Vercel Edge, and Render Cloud live telemetry & latency monitoring.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

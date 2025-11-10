import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, MessageSquare, Shield, TrendingUp } from "lucide-react";

interface OverviewSectionProps {
  stats: {
    contacts: number;
    leads: number;
    newsletters: number;
    securityLogs: number;
  };
}

export function OverviewSection({ stats }: OverviewSectionProps) {
  const cards = [
    {
      title: "Total Contacts",
      value: stats.contacts,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Leads",
      value: stats.leads,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.newsletters,
      icon: Mail,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Security Events",
      value: stats.securityLogs,
      icon: Shield,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                Active records
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className={`p-2 rounded-lg bg-blue-50`}>
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New contact submissions</p>
                <p className="text-muted-foreground">{stats.contacts} total submissions received</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className={`p-2 rounded-lg bg-green-50`}>
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Lead generation</p>
                <p className="text-muted-foreground">{stats.leads} leads captured</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className={`p-2 rounded-lg bg-purple-50`}>
                <Mail className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Newsletter growth</p>
                <p className="text-muted-foreground">{stats.newsletters} active subscribers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

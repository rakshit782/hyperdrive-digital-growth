import { DashboardUser } from "@/pages/Dashboard";

interface AnalyticsViewProps {
  user: DashboardUser | null;
}

export function AnalyticsView({ user }: AnalyticsViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Sales and performance analytics coming soon
        </p>
      </div>
    </div>
  );
}
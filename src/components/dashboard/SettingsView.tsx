import { DashboardUser } from "@/pages/Dashboard";

interface SettingsViewProps {
  user: DashboardUser | null;
}

export function SettingsView({ user }: SettingsViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          System settings and configuration options
        </p>
      </div>
    </div>
  );
}
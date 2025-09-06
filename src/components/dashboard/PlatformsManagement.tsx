import { DashboardUser } from "@/pages/Dashboard";

interface PlatformsManagementProps {
  user: DashboardUser | null;
}

export function PlatformsManagement({ user }: PlatformsManagementProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Integrations</h1>
        <p className="text-muted-foreground">
          Manage your e-commerce platform connections
        </p>
      </div>
    </div>
  );
}
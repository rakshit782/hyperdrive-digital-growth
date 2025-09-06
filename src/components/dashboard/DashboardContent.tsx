import { DashboardOverview } from "./DashboardOverview";
import { InventoryManagement } from "./InventoryManagement";
import { OrdersManagement } from "./OrdersManagement";
import { CustomersManagement } from "./CustomersManagement";
import { AnalyticsView } from "./AnalyticsView";
import { PlatformsManagement } from "./PlatformsManagement";
import { SettingsView } from "./SettingsView";
import { DashboardUser } from "@/pages/Dashboard";

interface DashboardContentProps {
  activeTab: string;
  user: DashboardUser | null;
}

export function DashboardContent({ activeTab, user }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview user={user} />;
      case "inventory":
        return <InventoryManagement user={user} />;
      case "orders":
        return <OrdersManagement user={user} />;
      case "customers":
        return <CustomersManagement user={user} />;
      case "analytics":
        return <AnalyticsView user={user} />;
      case "platforms":
        return <PlatformsManagement user={user} />;
      case "settings":
        return <SettingsView user={user} />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
}
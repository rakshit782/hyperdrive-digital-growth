import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3, 
  Zap,
  LogOut,
  Store,
  TrendingUp,
  Activity
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";
import InventoryTab from "@/components/dashboard/InventoryTab";
import OrdersTab from "@/components/dashboard/OrdersTab";
import CustomersTab from "@/components/dashboard/CustomersTab";
import PlatformIntegrationsTab from "@/components/dashboard/PlatformIntegrationsTab";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, signOut, userRole } = useAuth();

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      // Redirect handled by auth state change
    }
  };

  const tabs = [
    { 
      id: "overview", 
      label: "Overview", 
      icon: BarChart3, 
      roles: ['admin', 'editor'], 
      color: "text-blue-600",
      description: "Dashboard analytics and insights"
    },
    { 
      id: "inventory", 
      label: "Inventory", 
      icon: Package, 
      roles: ['admin', 'editor'], 
      color: "text-green-600",
      description: "Manage products and stock levels"
    },
    { 
      id: "orders", 
      label: "Orders", 
      icon: ShoppingCart, 
      roles: ['admin', 'editor'], 
      color: "text-orange-600",
      description: "View and manage orders"
    },
    { 
      id: "customers", 
      label: "Customers", 
      icon: Users, 
      roles: ['admin', 'editor'], 
      color: "text-purple-600",
      description: "Customer management and insights"
    },
    { 
      id: "integrations", 
      label: "Platforms", 
      icon: Zap, 
      roles: ['admin'], 
      color: "text-cyan-600",
      description: "Amazon, Walmart, eBay & Etsy integrations"
    },
  ];

  // Filter tabs based on user role
  const availableTabs = tabs.filter(tab => 
    tab.roles.includes(userRole || 'user')
  );

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <AuthGuard requiredRole={['admin', 'editor']}>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Modern Sidebar */}
          <div className="w-80 bg-card border-r border-border shadow-lg">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Store className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    E-Commerce CMS
                  </h1>
                  <p className="text-sm text-muted-foreground">Multi-platform management</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Welcome back!</p>
                  <Badge variant="secondary" className="text-xs">
                    {userRole}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
                Main Menu
              </div>
              {availableTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-start px-4 py-4 text-left rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${
                      isActive 
                        ? "bg-primary-foreground/20" 
                        : "bg-accent"
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        isActive ? "text-primary-foreground" : tab.color
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{tab.label}</div>
                      <div className={`text-xs mt-1 ${
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                );
              })}
              
              {/* Platform Status */}
              <div className="mt-8 px-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Platform Status
                </div>
                <div className="space-y-2">
                  {['Amazon', 'Walmart', 'eBay', 'Etsy'].map((platform) => (
                    <div key={platform} className="flex items-center justify-between py-2 px-3 rounded-lg bg-accent/50">
                      <span className="text-sm text-foreground">{platform}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-xs text-muted-foreground">Inactive</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sign Out Button */}
              <div className="pt-6 mt-6 border-t border-border">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 text-destructive hover:bg-destructive/10 group"
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mr-4 bg-destructive/10 group-hover:bg-destructive/20">
                    <LogOut className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {/* Header */}
            <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground flex items-center">
                      {activeTabData && <activeTabData.icon className="w-6 h-6 mr-3" />}
                      {activeTabData?.label}
                    </h2>
                    <p className="text-muted-foreground mt-1">{activeTabData?.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Activity className="w-4 h-4" />
                      <span>Live sync enabled</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              <div className="max-w-full">
                {activeTab === "overview" && <DashboardOverview />}
                {activeTab === "inventory" && <InventoryTab />}
                {activeTab === "orders" && <OrdersTab />}
                {activeTab === "customers" && <CustomersTab />}
                {activeTab === "integrations" && <PlatformIntegrationsTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
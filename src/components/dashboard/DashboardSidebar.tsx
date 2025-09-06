import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3,
  Store,
  LogOut,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DashboardUser } from "@/pages/Dashboard";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: DashboardUser | null;
  onSignOut: () => void;
}

const menuItems = [
  {
    id: "overview",
    title: "Overview",
    icon: LayoutDashboard,
    description: "Dashboard overview and analytics"
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: Package,
    description: "Manage products and stock"
  },
  {
    id: "orders",
    title: "Orders",
    icon: ShoppingCart,
    description: "View and manage orders"
  },
  {
    id: "customers",
    title: "Customers", 
    icon: Users,
    description: "Customer management"
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart3,
    description: "Sales and performance analytics"
  },
  {
    id: "platforms",
    title: "Platforms",
    icon: Store,
    description: "Multi-platform integrations"
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    description: "System settings and configuration"
  }
];

export function DashboardSidebar({ activeTab, onTabChange, user, onSignOut }: DashboardSidebarProps) {
  const { open } = useSidebar();

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Store className="w-4 h-4 text-primary-foreground" />
          </div>
          {open && (
            <div>
              <h2 className="font-semibold text-sm">E-commerce CMS</h2>
              <p className="text-xs text-muted-foreground">Multi-platform management</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                    tooltip={item.description}
                  >
                    <item.icon className="w-4 h-4" />
                    {open && (
                      <>
                        <span>{item.title}</span>
                        {activeTab === item.id && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        {user && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              {open && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              )}
            </div>
            
            {open && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSignOut}
                className="w-full justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
import { LayoutDashboard, Users, Mail, MessageSquare, Shield, Settings, LogOut, FileText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", icon: LayoutDashboard, section: "overview" },
  { title: "Contacts", icon: MessageSquare, section: "contacts" },
  { title: "Leads", icon: Users, section: "leads" },
  { title: "Newsletter", icon: Mail, section: "newsletter" },
  { title: "Security Logs", icon: Shield, section: "security" },
  { title: "Legal Pages", icon: FileText, section: "legal" },
  { title: "Settings", icon: Settings, section: "settings" },
];

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeSection, onSectionChange, onLogout }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-bold text-foreground">Admin Dashboard</h2>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && "Main Menu"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.section)}
                    className={`cursor-pointer ${
                      activeSection === item.section
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto border-t p-2">
          <SidebarMenuButton onClick={onLogout} className="w-full hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

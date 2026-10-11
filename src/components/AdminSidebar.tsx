import { LayoutDashboard, Users, Mail, MessageSquare, Shield, Settings, LogOut, FileText, DollarSign, Code, Eye, Award, FileSpreadsheet, ChevronDown, Sliders, Star } from "lucide-react";
import { useState } from "react";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  icon: any;
  section: string;
  subItems?: { title: string; section: string; icon: any }[];
}

const menuItems: MenuItem[] = [
  { title: "Overview", icon: LayoutDashboard, section: "overview" },
  { title: "Contacts", icon: MessageSquare, section: "contacts" },
  { title: "Leads", icon: Users, section: "leads" },
  { title: "Newsletter", icon: Mail, section: "newsletter" },
  { title: "Security Logs", icon: Shield, section: "security" },
  { title: "Visitor Logs", icon: Eye, section: "visitor-logs" },
  { title: "Tracking Scripts", icon: Code, section: "tracking" },
  { title: "Certificates", icon: Award, section: "certificates" },
  { title: "Case Studies", icon: FileSpreadsheet, section: "case-studies" },
  { title: "Legal Pages", icon: FileText, section: "legal" },
  { title: "Header / Menu", icon: LayoutDashboard, section: "header-settings" },
  { 
    title: "Settings", 
    icon: Settings, 
    section: "settings",
    subItems: [
      { title: "General & Branding", section: "settings-general", icon: Sliders },
      { title: "Email & Resend Leads", section: "settings-email", icon: Mail },
      { title: "Reviews Badge", section: "settings-reviews", icon: Star },
    ]
  },
];

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ activeSection, onSectionChange, onLogout }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [settingsOpen, setSettingsOpen] = useState(true);

  const isSettingsActive = 
    activeSection === "settings" || 
    activeSection.startsWith("settings-");

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
              {menuItems.map((item) => {
                if (item.subItems) {
                  return (
                    <SidebarMenuItem key={item.section}>
                      <SidebarMenuButton
                        onClick={() => {
                          if (collapsed) {
                            onSectionChange("settings-general");
                          } else {
                            setSettingsOpen(!settingsOpen);
                            if (!isSettingsActive) {
                              onSectionChange("settings-general");
                            }
                          }
                        }}
                        className={`cursor-pointer justify-between ${
                          isSettingsActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </div>
                        {!collapsed && (
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              settingsOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        )}
                      </SidebarMenuButton>

                      {!collapsed && settingsOpen && (
                        <SidebarMenuSub className="my-1">
                          {item.subItems.map((sub) => {
                            const isSubActive =
                              activeSection === sub.section ||
                              (activeSection === "settings" && sub.section === "settings-general");
                            return (
                              <SidebarMenuSubItem key={sub.section}>
                                <button
                                  type="button"
                                  onClick={() => onSectionChange(sub.section)}
                                  className={`flex h-7 w-full items-center gap-2 rounded-md px-2 text-xs transition-colors cursor-pointer ${
                                    isSubActive
                                      ? "bg-primary/15 text-primary font-medium"
                                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  <sub.icon className="h-3.5 w-3.5 shrink-0" />
                                  <span className="truncate">{sub.title}</span>
                                </button>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                }

                return (
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
                );
              })}
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

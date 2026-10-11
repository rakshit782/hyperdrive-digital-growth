import { 
  LayoutDashboard, Users, Mail, MessageSquare, Shield, Settings, LogOut, 
  FileText, Code, Eye, Award, FileSpreadsheet, ChevronDown, Sliders, Star,
  ExternalLink, Sparkles, Database
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
  useSidebar,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  icon: any;
  section: string;
  badge?: string;
  subItems?: { title: string; section: string; icon: any }[];
}

const mainNavItems: MenuItem[] = [
  { title: "Overview", icon: LayoutDashboard, section: "overview" },
  { title: "Leads", icon: Users, section: "leads", badge: "Live" },
  { title: "Contacts", icon: MessageSquare, section: "contacts" },
  { title: "Newsletter", icon: Mail, section: "newsletter" },
];

const contentNavItems: MenuItem[] = [
  { title: "Case Studies", icon: FileSpreadsheet, section: "case-studies" },
  { title: "Certificates", icon: Award, section: "certificates" },
  { title: "Legal Pages", icon: FileText, section: "legal" },
  { title: "Header Navigation", icon: LayoutDashboard, section: "header-settings" },
];

const systemNavItems: MenuItem[] = [
  { title: "Visitor Logs", icon: Eye, section: "visitor-logs" },
  { title: "Security Events", icon: Shield, section: "security" },
  { title: "Tracking & Analytics", icon: Code, section: "tracking" },
  { 
    title: "Settings", 
    icon: Settings, 
    section: "settings",
    subItems: [
      { title: "General & Branding", section: "settings-general", icon: Sliders },
      { title: "Email & Resend Leads", section: "settings-email", icon: Mail },
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

  const renderNavGroup = (label: string, items: MenuItem[]) => (
    <SidebarGroup className="py-1">
      {!collapsed && (
        <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-muted-foreground/70 uppercase px-3 py-1.5">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {items.map((item) => {
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
                    className={`cursor-pointer justify-between rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                      isSettingsActive
                        ? "bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/95 hover:text-primary-foreground"
                        : "hover:bg-accent text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="h-4 w-4 shrink-0" />
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
                    <SidebarMenuSub className="my-1 ml-4 pl-2 border-l border-border/60 space-y-0.5">
                      {item.subItems.map((sub) => {
                        const isSubActive =
                          activeSection === sub.section ||
                          (activeSection === "settings" && sub.section === "settings-general");
                        return (
                          <SidebarMenuSubItem key={sub.section}>
                            <button
                              type="button"
                              onClick={() => onSectionChange(sub.section)}
                              className={`flex h-8 w-full items-center gap-2 rounded-md px-2.5 text-xs transition-colors cursor-pointer ${
                                isSubActive
                                  ? "bg-primary/10 text-primary font-semibold"
                                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
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

            const isActive = activeSection === item.section;

            return (
              <SidebarMenuItem key={item.section}>
                <SidebarMenuButton
                  onClick={() => onSectionChange(item.section)}
                  className={`cursor-pointer justify-between rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/95 hover:text-primary-foreground"
                      : "hover:bg-accent text-foreground/80 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64 border-r border-border/60 bg-card/60 backdrop-blur-md"} collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="p-4 border-b border-border/60 flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-primary-foreground shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <h2 className="text-sm font-bold tracking-tight text-foreground">AMZ AD SCOUT</h2>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Neon Database</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
          {renderNavGroup("Core Activity", mainNavItems)}
          {renderNavGroup("Content & Media", contentNavItems)}
          {renderNavGroup("System & Config", systemNavItems)}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto border-t border-border/60 p-3 space-y-1.5 bg-muted/20">
          {!collapsed && (
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="h-3.5 w-3.5" />
                View Live Site
              </span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono">⌘/</span>
            </Link>
          )}

          <SidebarMenuButton 
            onClick={onLogout} 
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="text-xs font-medium">Log out</span>}
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

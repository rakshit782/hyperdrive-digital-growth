import { useState, useEffect } from "react";
import { 
  Globe, Sliders, Settings, LayoutDashboard, Star, Image, Users, Link2, 
  Database, Mail, Shield, Cog, Zap, ChevronDown, Menu, Target 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { open } = useSidebar();
  const collapsed = !open;
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    content: true,
    crm: true,
    media: true,
    business: true,
    system: true,
  });

  const dashboardTabs = [
    {
      id: "website",
      label: "Website",
      icon: Globe,
      category: "content",
    },
    {
      id: "hero-slider",
      label: "Hero Slider",
      icon: Sliders,
      category: "content",
    },
    {
      id: "services",
      label: "Services",
      icon: Settings,
      category: "content",
    },
    {
      id: "service-pages",
      label: "Service Pages",
      icon: LayoutDashboard,
      category: "content",
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      category: "content",
    },
    {
      id: "faq-management",
      label: "FAQ Management",
      icon: Shield,
      category: "content",
    },
    {
      id: "cta-management",
      label: "CTA Section",
      icon: Target,
      category: "content",
    },
    {
      id: "footer-management",
      label: "Footer & Partners",
      icon: Link2,
      category: "content",
    },
    {
      id: "blog-management",
      label: "Blog Posts",
      icon: LayoutDashboard,
      category: "content",
    },
    {
      id: "leads",
      label: "Lead Management",
      icon: Database,
      category: "crm",
    },
    {
      id: "contact-management",
      label: "Contact Forms",
      icon: Mail,
      category: "crm",
    },
    {
      id: "email-workflow",
      label: "Email Automation",
      icon: Mail,
      category: "crm",
    },
    {
      id: "form-security",
      label: "Form Security",
      icon: Shield,
      category: "crm",
    },
    {
      id: "service-header-images",
      label: "Service Images",
      icon: Image,
      category: "media",
    },
    {
      id: "clientele-management",  
      label: "Clientele Logos",
      icon: Users,
      category: "media",
    },
    {
      id: "pricing-management",
      label: "Pricing Plans",
      icon: Cog,
      category: "business",
    },
    {
      id: "website-integrations",
      label: "Website Integrations",
      icon: Zap,
      category: "system",
    },
    {
      id: "integration-status",
      label: "Integration Status",
      icon: Zap,
      category: "system",
    }
  ];

  const categories = {
    content: { label: "Content", color: "bg-blue-500" },
    crm: { label: "CRM", color: "bg-green-500" },
    media: { label: "Media", color: "bg-purple-500" },
    business: { label: "Business", color: "bg-orange-500" },
    system: { label: "System", color: "bg-gray-500" },
  };

  const getTabsByCategory = (category: string) => {
    return dashboardTabs.filter(tab => tab.category === category);
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const getTabIcon = (tab: any) => {
    const IconComponent = tab.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <Sidebar className="border-r border-slate-200/60 bg-white/95 backdrop-blur-md">
      <SidebarHeader className="p-6 border-b border-slate-200/60">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Menu className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-slate-900">Dashboard</h2>
              <p className="text-xs text-slate-500">Content Management</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {Object.entries(categories).map(([categoryId, categoryInfo]) => {
          const categoryTabs = getTabsByCategory(categoryId);
          if (categoryTabs.length === 0) return null;

          return (
            <SidebarGroup key={categoryId}>
              <Collapsible
                open={openGroups[categoryId]}
                onOpenChange={() => toggleGroup(categoryId)}
              >
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="group/label flex items-center justify-between hover:bg-slate-50 rounded-md px-2 py-2 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${categoryInfo.color}`} />
                      {!collapsed && (
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          {categoryInfo.label}
                        </span>
                      )}
                    </div>
                    {!collapsed && (
                      <ChevronDown 
                        className={`w-3 h-3 transition-transform ${
                          openGroups[categoryId] ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {categoryTabs.map((tab) => (
                        <SidebarMenuItem key={tab.id}>
                          <SidebarMenuButton
                            onClick={() => onTabChange(tab.id)}
                            isActive={activeTab === tab.id}
                            className={`w-full justify-start ${
                              activeTab === tab.id 
                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-500' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <div className={`p-1.5 rounded-md ${
                                activeTab === tab.id 
                                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {getTabIcon(tab)}
                              </div>
                              {!collapsed && (
                                <span className="text-sm font-medium truncate">{tab.label}</span>
                              )}
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200/60">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            {!collapsed ? 'Online' : '•'}
          </Badge>
          {!collapsed && (
            <div className="text-xs text-slate-500">
              CRM v2.0
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

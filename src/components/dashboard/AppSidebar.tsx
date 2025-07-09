
import React from "react";
import {
  Separator
} from "@/components/ui/separator";
import {
  Settings,
  LayoutDashboard,
  Star,
  Shield,
  Target,
  Link2,
  Database,
  Mail,
  Image,
  Users,
  Cog,
  Zap,
  Palette,
  FileText,
  Search,
  BookOpen,
  HelpCircle,
  DollarSign,
  Home
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    category: "Content Management",
    items: [
      { id: 'services', title: 'Services Management', icon: Settings },
      { id: 'service-pages', title: 'Service Pages', icon: LayoutDashboard },
      { id: 'about-content', title: 'About Page Content', icon: FileText },
      { id: 'blog-management', title: 'Blog Management', icon: BookOpen },
      { id: 'reviews', title: 'Reviews Management', icon: Star },
      { id: 'faq-management', title: 'FAQ Management', icon: HelpCircle },
      { id: 'pricing-management', title: 'Pricing Management', icon: DollarSign },
    ]
  },
  {
    category: "SEO & Marketing",
    items: [
      { id: 'seo-management', title: 'SEO Management', icon: Search },
      { id: 'cta-management', title: 'CTA Management', icon: Target },
      { id: 'homepage-customization', title: 'Homepage', icon: Home },
    ]
  },
  {
    category: "Customer Relations",
    items: [
      { id: 'leads', title: 'Lead Management', icon: Database },
      { id: 'contact-management', title: 'Contact Management', icon: Mail },
      { id: 'newsletter-email-management', title: 'Newsletter Emails', icon: Mail },
      { id: 'email-workflow', title: 'Email Workflow', icon: Mail },
      { id: 'clientele-management', title: 'Clientele', icon: Users },
    ]
  },
  {
    category: "Integrations",
    items: [
      { id: 'website-integrations', title: 'Website Integrations', icon: Zap },
      { id: 'integration-status', title: 'Integration Status', icon: Zap },
    ]
  },
  {
    category: "System",
    items: [
      { id: 'form-security', title: 'Form Security', icon: Shield },
      { id: 'security-settings', title: 'Security Settings', icon: Shield },
    ]
  },
];

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const handleNavigation = (tabId: string) => {
    onTabChange(tabId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTab', tabId);
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r bg-white shadow-lg">
      <div className="px-6 py-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500">Manage your website</p>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-8">
          {menuItems.map((category, index) => (
            <div key={index} className="space-y-3">
              <h4 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {category.category}
              </h4>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-3 py-2.5 text-sm font-medium transition-colors",
                      "hover:bg-blue-50 hover:text-blue-700",
                      activeTab === item.id 
                        ? "bg-blue-100 text-blue-700 shadow-sm border-r-2 border-blue-500" 
                        : "text-gray-600"
                    )}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="truncate">{item.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator className="bg-gray-200" />

      <div className="p-4">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Pro Features</p>
              <p className="text-xs text-gray-500 truncate">Unlock advanced tools</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

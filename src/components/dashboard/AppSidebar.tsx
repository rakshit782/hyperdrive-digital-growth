
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
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
import { useSidebar } from "@/components/ui/sidebar";
import { useDashboardConfig } from "@/hooks/useDashboardConfig";
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
  const { open, setOpen } = useSidebar();
  const { setConfig } = useDashboardConfig();

  const handleNavigation = (tabId: string) => {
    onTabChange(tabId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTab', tabId);
    }
    setConfig(prev => ({ ...prev, activeTab: tabId }));
  };

  return (
    <Sheet open={!open} onOpenChange={(isOpen) => setOpen(!isOpen)}>
      <SheetTrigger asChild>
        <aside className={cn(
          "group/sidebar fixed left-0 top-0 z-50 flex h-full flex-col border-r bg-secondary",
          "duration-200 lg:relative",
          open ? "w-[5rem] hover:w-[16rem]" : "w-[16rem]",
        )}>
          <div className="px-4 py-6">
            <SheetHeader>
              <SheetTitle>Dashboard Menu</SheetTitle>
              <SheetDescription>
                Manage all aspects of your website from this menu.
              </SheetDescription>
            </SheetHeader>
          </div>

          <Separator />

          <ScrollArea className="flex-1 space-y-4 p-4">
            {menuItems.map((category, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-sm px-1">{category.category}</h4>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={cn(
                        "flex w-full items-center justify-start gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground sm:text-base",
                        activeTab === item.id ? "bg-muted font-semibold" : "text-muted-foreground"
                      )}
                      onClick={() => handleNavigation(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>

          <Separator />

          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full">
              Add Content <Settings className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </aside>
      </SheetTrigger>
      <SheetContent side="left" className="w-[16rem] p-0">
        <aside className="fixed left-0 top-0 z-50 flex h-full w-[16rem] flex-col border-r bg-secondary">
          <div className="px-4 py-6">
            <SheetHeader>
              <SheetTitle>Dashboard Menu</SheetTitle>
              <SheetDescription>
                Manage all aspects of your website from this menu.
              </SheetDescription>
            </SheetHeader>
          </div>

          <Separator />

          <ScrollArea className="flex-1 space-y-4 p-4">
            {menuItems.map((category, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-sm px-1">{category.category}</h4>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={cn(
                        "flex w-full items-center justify-start gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground sm:text-base",
                        activeTab === item.id ? "bg-muted font-semibold" : "text-muted-foreground"
                      )}
                      onClick={() => handleNavigation(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>

          <Separator />

          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full">
              Add Content <Settings className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
}

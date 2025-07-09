
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDashboardConfig } from "@/hooks/useDashboardConfig";
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
  Home,
  Scale
} from "lucide-react";

export const AppSidebar = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const location = useLocation();
  const config = useDashboardConfig();

  const menuItems = [
    // Content Management
    {
      category: "Content Management",
      items: [
        { id: "services", label: "Services", icon: Settings },
        { id: "service-pages", label: "Service Pages", icon: LayoutDashboard },
        { id: "about-content", label: "About Content", icon: FileText },
        { id: "seo-management", label: "SEO Management", icon: Search },
        { id: "blog-management", label: "Blog", icon: BookOpen },
        { id: "reviews", label: "Reviews", icon: Star },
        { id: "faq-management", label: "FAQ", icon: HelpCircle },
        { id: "pricing-management", label: "Pricing", icon: DollarSign },
        { id: "policy-pages", label: "Policy Pages", icon: Scale },
      ]
    },
    // Website Customization
    {
      category: "Website Customization", 
      items: [
        { id: "cta-management", label: "CTA Management", icon: Target },
        { id: "homepage-customization", label: "Homepage", icon: Home },
        { id: "footer-management", label: "Footer", icon: Link2 },
        { id: "service-header-images", label: "Service Images", icon: Image },
      ]
    },
    // Lead Management
    {
      category: "Lead Management",
      items: [
        { id: "leads", label: "Leads", icon: Database },
        { id: "contact-management", label: "Contact Forms", icon: Mail },
        { id: "newsletter-email-management", label: "Newsletter", icon: Mail },
        { id: "email-workflow", label: "Email Workflow", icon: Mail },
        { id: "clientele-management", label: "Clientele", icon: Users },
      ]
    },
    // Security & Integrations
    {
      category: "Security & Integrations",
      items: [
        { id: "form-security", label: "Form Security", icon: Shield },
        { id: "security-settings", label: "Security Settings", icon: Shield },
        { id: "website-integrations", label: "Integrations", icon: Zap },
        { id: "integration-status", label: "Integration Status", icon: Zap },
      ]
    }
  ];

  const handleTabClick = (tabId: string, e: React.MouseEvent) => {
    e.preventDefault();
    onTabChange(tabId);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto fixed left-0 top-0 z-40">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Content Management</p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        {menuItems.map((category) => (
          <div key={category.category} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              {category.category}
            </h3>
            <ul className="space-y-1">
              {category.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={(e) => handleTabClick(item.id, e)}
                      className={cn(
                        "w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon className={cn(
                        "w-4 h-4 mr-3 flex-shrink-0",
                        isActive ? "text-blue-600" : "text-gray-400"
                      )} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

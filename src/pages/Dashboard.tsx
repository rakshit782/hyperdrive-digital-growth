
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, Search, Bell, User, Settings, Globe, Sliders, 
  Star, Image, Users, Link2, Database, Mail, Shield, Cog, Zap
} from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import ServiceCardsTab from "@/components/dashboard/ServiceCardsTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import WebsiteTab from "@/components/dashboard/WebsiteTab";
import HeroSliderTab from "@/components/dashboard/HeroSliderTab";
import ServiceHeaderImagesTab from "@/components/dashboard/ServiceHeaderImagesTab";
import FooterManagementTab from "@/components/dashboard/FooterManagementTab";
import ClienteleManagementTab from "@/components/dashboard/ClienteleManagementTab";
import IntegrationStatusTab from "@/components/dashboard/IntegrationStatusTab";
import LeadManagementTab from "@/components/dashboard/LeadManagementTab";
import ServicePagesManagementTab from "@/components/dashboard/ServicePagesManagementTab";
import ContactManagement from "@/components/dashboard/ContactManagement";
import BlogManagement from "@/components/dashboard/BlogManagement";
import FAQManagementTab from "@/components/dashboard/FAQManagementTab";
import PricingManagement from "@/components/dashboard/PricingManagement";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { services, reviews, updateServices, updateReviews } = useDashboardData();
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeDashboardTab') || 'website');

  useEffect(() => {
    localStorage.setItem('activeDashboardTab', activeTab);
  }, [activeTab]);

  const dashboardTabs = [
    {
      id: "website",
      label: "Website",
      icon: Globe,
      category: "Content",
      component: <WebsiteTab />
    },
    {
      id: "hero-slider",
      label: "Hero Slider",
      icon: Sliders,
      category: "Content",
      component: <HeroSliderTab />
    },
    {
      id: "services",
      label: "Services",
      icon: Settings,
      category: "Content",
      component: <ServiceCardsTab services={services} updateServices={updateServices} />
    },
    {
      id: "service-pages",
      label: "Service Pages",
      icon: LayoutDashboard,
      category: "Content",
      component: <ServicePagesManagementTab />
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      category: "Content",
      component: <ReviewsTab reviews={reviews} updateReviews={updateReviews} />
    },
    {
      id: "service-header-images",
      label: "Service Images",  
      icon: Image,
      category: "Media",
      component: <ServiceHeaderImagesTab />
    },
    {
      id: "clientele-management",
      label: "Clientele Logos",
      icon: Users,
      category: "Media",
      component: <ClienteleManagementTab />
    },
    {
      id: "footer-management",
      label: "Footer & Partners",
      icon: Link2,
      category: "Content",
      component: <FooterManagementTab />
    },
    {
      id: "leads",
      label: "Lead Management",
      icon: Database,
      category: "CRM",
      component: <LeadManagementTab />
    },
    {
      id: "contact-management",
      label: "Contact Forms",
      icon: Mail,
      category: "CRM",
      component: <ContactManagement />
    },
    {
      id: "blog-management",
      label: "Blog Posts",
      icon: LayoutDashboard,
      category: "Content",
      component: <BlogManagement />
    },
    {
      id: "faq-management",
      label: "FAQ Management",
      icon: Shield,
      category: "Content",
      component: <FAQManagementTab />
    },
    {
      id: "pricing-management",
      label: "Pricing Plans",
      icon: Cog,
      category: "Business",
      component: <PricingManagement />
    },
    {
      id: "integration-status",
      label: "Integration Status",
      icon: Zap,
      category: "System",
      component: <IntegrationStatusTab />
    }
  ];

  const getCurrentTab = () => {
    return dashboardTabs.find(tab => tab.id === activeTab);
  };

  const currentTab = getCurrentTab();
  const getTabIcon = (tab: any) => {
    const IconComponent = tab.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 w-full">
        {/* CRM Header */}
        <div className="dashboard-header sticky top-0 z-50 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                    CRM Dashboard
                  </h1>
                  <p className="text-slate-500 text-sm">Manage your digital presence</p>
                </div>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="h-9">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Bell className="w-4 h-4 mr-2" />
                Alerts
              </Button>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </Badge>
              <Button variant="outline" size="sm" className="h-9">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>

        <div className="flex w-full">
          {/* Sidebar */}
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Content Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                      {currentTab && getTabIcon(currentTab)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {currentTab?.label}
                      </h2>
                      <p className="text-slate-600 text-sm">
                        Manage your {currentTab?.label.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {currentTab?.category}
                  </Badge>
                </div>
              </div>

              {/* Content Area */}
              <Card className="crm-card border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {currentTab?.component}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

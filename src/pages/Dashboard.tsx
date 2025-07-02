
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import { Cog, Users, BarChart3, LayoutDashboard, Image, Globe, Sliders, Star, Settings, Link2, Zap, Mail, Database, Shield } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useToast } from "@/hooks/use-toast";
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
      color: "from-blue-500 to-cyan-500",
      component: <WebsiteTab />
    },
    {
      id: "hero-slider",
      label: "Hero Slider",
      icon: Sliders,
      color: "from-purple-500 to-pink-500",
      component: <HeroSliderTab />
    },
    {
      id: "services",
      label: "Services",
      icon: Settings,
      color: "from-green-500 to-emerald-500",
      component: <ServiceCardsTab services={services} updateServices={updateServices} />
    },
    {
      id: "service-pages",
      label: "Service Pages",
      icon: LayoutDashboard,
      color: "from-indigo-500 to-blue-500",
      component: <ServicePagesManagementTab />
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      component: <ReviewsTab reviews={reviews} updateReviews={updateReviews} />
    },
    {
      id: "service-header-images",
      label: "Service Images",  
      icon: Image,
      color: "from-pink-500 to-rose-500",
      component: <ServiceHeaderImagesTab />
    },
    {
      id: "clientele-management",
      label: "Clientele Logos",
      icon: Users,
      color: "from-indigo-500 to-purple-500",
      component: <ClienteleManagementTab />
    },
    {
      id: "footer-management",
      label: "Footer & Partners",
      icon: Link2,
      color: "from-gray-500 to-slate-500",
      component: <FooterManagementTab />
    },
    {
      id: "leads",
      label: "Lead Management",
      icon: Database,
      color: "from-emerald-500 to-teal-500",
      component: <LeadManagementTab />
    },
    {
      id: "contact-management",
      label: "Contact Forms",
      icon: Mail,
      color: "from-cyan-500 to-blue-500",
      component: <ContactManagement />
    },
    {
      id: "blog-management",
      label: "Blog Posts",
      icon: LayoutDashboard,
      color: "from-violet-500 to-purple-500",
      component: <BlogManagement />
    },
    {
      id: "faq-management",
      label: "FAQ Management",
      icon: Shield,
      color: "from-amber-500 to-yellow-500",
      component: <FAQManagementTab />
    },
    {
      id: "pricing-management",
      label: "Pricing Plans",
      icon: Cog,
      color: "from-rose-500 to-pink-500",
      component: <PricingManagement />
    },
    {
      id: "integration-status",
      label: "Integration Status",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      component: <IntegrationStatusTab />
    }
  ];

  const getTabIcon = (tab: any) => {
    const IconComponent = tab.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/50 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Dashboard
              </h1>
              <p className="text-slate-600 text-sm mt-1">Manage and customize your website content</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <div className="border-b border-slate-200/50 p-4 pb-0">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-14 gap-1 bg-slate-50 p-1 rounded-lg border-0 mb-4 w-full">
                {dashboardTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col items-center justify-center p-3 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 hover:bg-white/80 group border-0 text-xs"
                  >
                    <div className={`p-2 rounded-md bg-gradient-to-r ${tab.color} text-white mb-1 group-data-[state=active]:scale-110 transition-transform duration-200`}>
                      {getTabIcon(tab)}
                    </div>
                    <span className="font-medium text-slate-700 group-data-[state=active]:text-slate-900 text-center leading-tight">
                      {tab.label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {dashboardTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <div className="bg-slate-50/30 rounded-lg p-4 border border-slate-200/20">
                    {tab.component}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

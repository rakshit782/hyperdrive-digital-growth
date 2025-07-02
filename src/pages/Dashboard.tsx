
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import { Cog, Users, BarChart3, LayoutDashboard, Image, Globe, Sliders, Star, Settings, Link2, Zap } from "lucide-react";
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
      <div className="bg-white border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Manage and customize your website content</p>
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
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <div className="border-b border-slate-200/50 p-6 pb-0">
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 bg-slate-50 p-2 rounded-xl border-0 mb-6">
                {dashboardTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col items-center justify-center p-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 hover:bg-white/80 group border-0"
                  >
                    <div className={`p-2.5 rounded-lg bg-gradient-to-r ${tab.color} text-white mb-2 group-data-[state=active]:scale-110 transition-transform duration-200`}>
                      {getTabIcon(tab)}
                    </div>
                    <span className="text-xs font-medium text-slate-700 group-data-[state=active]:text-slate-900 text-center">
                      {tab.label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {dashboardTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200/30">
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

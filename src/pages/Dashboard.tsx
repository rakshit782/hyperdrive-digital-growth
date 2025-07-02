
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import { Cog, Users, BarChart3, LayoutDashboard, Image, Globe, Slider, Star, Settings, Link2, Zap } from "lucide-react";
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
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please log in to access the dashboard.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  useEffect(() => {
    localStorage.setItem('activeDashboardTab', activeTab);
  }, [activeTab]);

  const dashboardTabs = [
    {
      id: "website",
      label: "Website",
      icon: Globe,
      color: "from-blue-500 to-blue-600",
      component: <WebsiteTab />
    },
    {
      id: "hero-slider",
      label: "Hero Slider",
      icon: Slider,
      color: "from-purple-500 to-purple-600",
      component: <HeroSliderTab />
    },
    {
      id: "services",
      label: "Services",
      icon: Settings,
      color: "from-green-500 to-green-600",
      component: <ServiceCardsTab services={services} updateServices={updateServices} />
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      component: <ReviewsTab reviews={reviews} updateReviews={updateReviews} />
    },
    {
      id: "service-header-images",
      label: "Service Images",  
      icon: Image,
      color: "from-pink-500 to-pink-600",
      component: <ServiceHeaderImagesTab />
    },
    {
      id: "clientele-management",
      label: "Clientele Logos",
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
      component: <ClienteleManagementTab />
    },
    {
      id: "footer-management",
      label: "Footer & Partners",
      icon: Link2,
      color: "from-gray-500 to-gray-600",
      component: <FooterManagementTab />
    },
    {
      id: "integration-status",
      label: "Integration Status",
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      component: <IntegrationStatusTab />
    }
  ];

  const getTabIcon = (tab: any) => {
    const IconComponent = tab.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage and customize your website content with ease</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Dashboard Card */}
        <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-blue-900/10">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 bg-white/50 backdrop-blur-sm p-2 rounded-xl border border-white/20 mb-8">
                {dashboardTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col items-center justify-center p-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-white/80 group"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${tab.color} text-white mb-2 group-data-[state=active]:scale-110 transition-transform duration-200`}>
                      {getTabIcon(tab)}
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-data-[state=active]:text-gray-900">
                      {tab.label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {dashboardTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-6">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    {tab.component}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

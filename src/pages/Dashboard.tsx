import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import { Cog, Users, BarChart3, LayoutDashboard, Image } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useToast } from "@/hooks/use-toast";
import ServiceCardsTab from "@/components/dashboard/ServiceCardsTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import WebsiteTab from "@/components/dashboard/WebsiteTab";
import HeroSliderTab from "@/components/dashboard/HeroSliderTab";
import ServiceHeaderImagesTab from "@/components/dashboard/ServiceHeaderImagesTab";

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
      icon: "🌐",
      component: <WebsiteTab />
    },
    {
      id: "hero-slider",
      label: "Hero Slider",
      icon: "🌄",
      component: <HeroSliderTab />
    },
    {
      id: "services",
      label: "Services",
      icon: "💼",
      component: <ServiceCardsTab services={services} updateServices={updateServices} />
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: "⭐",
      component: <ReviewsTab reviews={reviews} updateReviews={updateReviews} />
    },
    {
      id: "service-header-images",
      label: "Service Images",  
      icon: "🖼️",
      component: <ServiceHeaderImagesTab />
    },
  ];

  return (
    <div className="container-standard py-12">
      <Card className="w-full bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2 text-blue-500" />
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          </div>
          <CardDescription>Manage and customize your website content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} className="w-full">
            <TabsList className="bg-muted p-1 rounded-lg">
              {dashboardTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  {tab.icon} {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {dashboardTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                {tab.component}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

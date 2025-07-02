
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cog, Users, BarChart3, LayoutDashboard, Image, Globe, Sliders, Star, Settings, Link2, Zap, Mail, Database, Shield, Bell, Search, User } from "lucide-react";
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

  const getTabsByCategory = (category: string) => {
    return dashboardTabs.filter(tab => tab.category === category);
  };

  const categories = ["Content", "CRM", "Media", "Business", "System"];

  const getTabIcon = (tab: any) => {
    const IconComponent = tab.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Modern Header */}
      <div className="bg-white border-b border-slate-200/60 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-slate-500 text-sm">Manage your digital presence</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="h-9">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
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
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl shadow-slate-200/20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Enhanced Tab Navigation */}
            <div className="border-b border-slate-200/60 bg-slate-50/30">
              <div className="p-6 pb-0">
                <div className="space-y-6">
                  {categories.map((category) => {
                    const categoryTabs = getTabsByCategory(category);
                    if (categoryTabs.length === 0) return null;
                    
                    return (
                      <div key={category} className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                            {category}
                          </h3>
                          <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                        </div>
                        
                        <TabsList className="grid gap-2 bg-transparent p-0 h-auto" 
                                 style={{ gridTemplateColumns: `repeat(${Math.min(categoryTabs.length, 6)}, minmax(0, 1fr))` }}>
                          {categoryTabs.map((tab) => (
                            <TabsTrigger
                              key={tab.id}
                              value={tab.id}
                              className="flex flex-col items-center justify-center p-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:shadow-slate-200/40 transition-all duration-300 hover:bg-white/60 group border border-transparent data-[state=active]:border-slate-200/60 min-h-[80px]"
                            >
                              <div className="p-2 rounded-lg bg-slate-100 group-data-[state=active]:bg-gradient-to-br group-data-[state=active]:from-blue-500 group-data-[state=active]:to-purple-600 group-data-[state=active]:text-white text-slate-600 mb-2 group-data-[state=active]:scale-110 transition-all duration-300">
                                {getTabIcon(tab)}
                              </div>
                              <span className="font-medium text-xs text-center text-slate-700 group-data-[state=active]:text-slate-900 leading-tight">
                                {tab.label}
                              </span>
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>
                    );
                  })}
                </div>
                
                <Separator className="mt-6 bg-slate-200/60" />
              </div>
            </div>

            {/* Tab Content Area */}
            <div className="p-6">
              {dashboardTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <div className="bg-gradient-to-br from-slate-50/50 to-white rounded-2xl border border-slate-200/40 shadow-sm">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {getTabIcon(tab)}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">{tab.label}</h2>
                            <p className="text-slate-500 text-sm">Manage your {tab.label.toLowerCase()}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {tab.category}
                        </Badge>
                      </div>
                      
                      <div className="bg-white rounded-xl border border-slate-200/40 p-6 shadow-sm">
                        {tab.component}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

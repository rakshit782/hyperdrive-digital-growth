import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Users, Mail, Settings, Shield, FileText, Globe, Zap, PlusCircle, Edit, Trash2 } from "lucide-react";
import NewsletterEmailManagementTab from "@/components/dashboard/NewsletterEmailManagementTab";
import LeadManagementTab from "@/components/dashboard/LeadManagementTab";
import ContentManagementTab from "@/components/dashboard/ContentManagementTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import ServicesTab from "@/components/dashboard/ServicesTab";
import FormSecurityTab from "@/components/dashboard/FormSecurityTab";
import SecuritySettingsTab from "@/components/dashboard/SecuritySettingsTab";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

const Dashboard = () => {
  const [services, setServices] = useState<ServiceCard[]>([
    {
      id: "1",
      title: "Amazon Advertising",
      description: "Maximize your product visibility and sales on Amazon with our expert advertising strategies.",
      image: "/images/amazon-ads.png",
      url: "/amazon-advertising"
    },
    {
      id: "2",
      title: "Walmart Advertising",
      description: "Reach more customers and boost your sales on Walmart's marketplace with our tailored advertising solutions.",
      image: "/images/walmart-ads.png",
      url: "/walmart-advertising"
    },
    {
      id: "3",
      title: "Meta Advertising",
      description: "Connect with your target audience on Facebook and Instagram through engaging and effective ad campaigns.",
      image: "/images/meta-ads.png",
      url: "/meta-advertising"
    },
    {
      id: "4",
      title: "Google Advertising",
      description: "Drive targeted traffic to your website and increase conversions with our data-driven Google Ads management.",
      image: "/images/google-ads.png",
      url: "/google-advertising"
    },
    {
      id: "5",
      title: "Shopify Development",
      description: "Build a high-converting online store with our custom Shopify development services.",
      image: "/images/shopify-dev.png",
      url: "/shopify-development"
    },
    {
      id: "6",
      title: "Website Development",
      description: "Create a professional and user-friendly website that attracts and converts visitors.",
      image: "/images/website-dev.png",
      url: "/website-development"
    },
  ]);

  const [editingService, setEditingService] = useState<ServiceCard | null>(null);

  const handleEditService = (service: ServiceCard) => {
    setEditingService(service);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleAddService = () => {
    // Implement add service logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600">Manage your website content and monitor performance</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Newsletter
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Website Traffic</CardTitle>
                      <CardDescription>Real-time website analytics and insights</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Updated 5 minutes ago</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Track your website's performance with detailed analytics. Monitor user engagement, traffic sources, and conversion rates to optimize your online presence.
                </p>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-blue-600">Total Visits</p>
                      <p className="text-2xl font-bold text-blue-900">12,456</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-purple-600">Unique Visitors</p>
                      <p className="text-2xl font-bold text-purple-900">8,789</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-green-600">Page Views</p>
                      <p className="text-2xl font-bold text-green-900">45,987</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-orange-600">Bounce Rate</p>
                      <p className="text-2xl font-bold text-orange-900">42.5%</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <LeadManagementTab />
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterEmailManagementTab />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagementTab />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsTab />
          </TabsContent>

          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>

          <TabsContent value="security">
            <FormSecurityTab />
          </TabsContent>

          <TabsContent value="settings">
            <SecuritySettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

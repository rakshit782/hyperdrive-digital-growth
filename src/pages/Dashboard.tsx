
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ServicesTab from "@/components/dashboard/ServicesTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import WebsiteTab from "@/components/dashboard/WebsiteTab";
import LogoManagement from "@/components/dashboard/LogoManagement";
import ContactManagement from "@/components/dashboard/ContactManagement";
import HomepageElements from "@/components/dashboard/HomepageElements";
import PricingManagement from "@/components/dashboard/PricingManagement";
import CustomEventsTab from "@/components/dashboard/CustomEventsTab";
import WebsiteSEOTab from "@/components/dashboard/WebsiteSEOTab";
import HeaderCustomizationTab from "@/components/dashboard/HeaderCustomizationTab";
import ServiceEditModal from "@/components/dashboard/ServiceEditModal";
import ReviewEditModal from "@/components/dashboard/ReviewEditModal";
import BlogManagement from "@/components/dashboard/BlogManagement";
import FacebookPixelTab from "@/components/dashboard/FacebookPixelTab";
import GoogleAnalyticsTab from "@/components/dashboard/GoogleAnalyticsTab";
import AmplifyTab from "@/components/dashboard/AmplifyTab";
import CognitoTab from "@/components/dashboard/CognitoTab";
import DynamoDBTab from "@/components/dashboard/DynamoDBTab";
import S3Tab from "@/components/dashboard/S3Tab";
import SESTab from "@/components/dashboard/SESTab";
import Header from "@/components/Header";
import { useDashboardData } from "@/hooks/useDashboardData";
import { ServiceCard, Review } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { services, reviews, updateServices, updateReviews } = useDashboardData();
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const deleteService = (id: string) => {
    const newServices = services.filter(service => service.id !== id);
    updateServices(newServices);
  };

  const deleteReview = (id: string) => {
    const newReviews = reviews.filter(review => review.id !== id);
    updateReviews(newReviews);
  };

  const saveService = (service: ServiceCard) => {
    const isNew = !services.find(s => s.id === service.id);
    if (isNew) {
      updateServices([...services, service]);
    } else {
      const newServices = services.map(s => s.id === service.id ? service : s);
      updateServices(newServices);
    }
    setEditingService(null);
  };

  const saveReview = (review: Review) => {
    const isNew = !reviews.find(r => r.id === review.id);
    if (isNew) {
      updateReviews([...reviews, review]);
    } else {
      const newReviews = reviews.map(r => r.id === review.id ? review : r);
      updateReviews(newReviews);
    }
    setEditingReview(null);
  };

  const addNewService = () => {
    const newService: ServiceCard = {
      id: `new-service-${Date.now()}`,
      icon: "ShoppingCart",
      title: "New Service",
      description: "Service description",
      features: ["Feature 1", "Feature 2"],
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-50 to-purple-50",
      link: "/new-service"
    };
    setEditingService(newService);
  };

  const addNewReview = () => {
    const newReview: Review = {
      id: `new-review-${Date.now()}`,
      name: "New Customer",
      company: "Company Name",
      rating: 5,
      review: "Review text",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    setEditingReview(newReview);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-slate-600 mt-2">Manage your website content and integrations</p>
              </div>
              <Badge variant="outline" className="px-4 py-2 bg-white/50 backdrop-blur-sm">
                Live Preview Mode
              </Badge>
            </div>
          </div>
          
          {/* Vertical Accordion Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Accordion Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Dashboard Sections</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="content">
                      <AccordionTrigger className="text-sm font-medium">Content Management</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Services ({services.length})
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Reviews ({reviews.length})
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Website
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Logo
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Contact
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Homepage
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Pricing
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Blog
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Header Menu
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="aws-services">
                      <AccordionTrigger className="text-sm font-medium">AWS Services</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            AWS Amplify
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Amazon Cognito
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            DynamoDB
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Amazon S3
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Amazon SES
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="analytics">
                      <AccordionTrigger className="text-sm font-medium">Analytics & Tracking</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Facebook Pixel
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Google Analytics
                          </button>
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Custom Events
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="seo">
                      <AccordionTrigger className="text-sm font-medium">SEO & Optimization</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button className="w-full text-left p-2 rounded hover:bg-slate-100 text-sm">
                            Website SEO
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Default view - show services */}
                <div className="animate-fade-in">
                  <ServicesTab
                    services={services}
                    onEdit={setEditingService}
                    onDelete={deleteService}
                    onAdd={addNewService}
                  />
                </div>

                {/* AWS Services Section */}
                <div className="grid grid-cols-1 gap-6">
                  <AmplifyTab />
                  <CognitoTab />
                  <DynamoDBTab />
                  <S3Tab />
                  <SESTab />
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 gap-6">
                  <FacebookPixelTab />
                  <GoogleAnalyticsTab />
                </div>
              </div>
            </div>
          </div>

          {/* Modals */}
          {editingService && (
            <ServiceEditModal
              service={editingService}
              isNew={!services.find(s => s.id === editingService.id)}
              onSave={saveService}
              onCancel={() => setEditingService(null)}
              onChange={setEditingService}
            />
          )}

          {editingReview && (
            <ReviewEditModal
              review={editingReview}
              isNew={!reviews.find(r => r.id === editingReview.id)}
              onSave={saveReview}
              onCancel={() => setEditingReview(null)}
              onChange={setEditingReview}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;


import { useState, useEffect } from "react";
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
import CloudflareTab from "@/components/dashboard/CloudflareTab";
import UserManagementTab from "@/components/dashboard/UserManagementTab";
import IntegrationStatusTab from "@/components/dashboard/IntegrationStatusTab";
import Header from "@/components/Header";
import { useDashboardData } from "@/hooks/useDashboardData";
import { integrationManager } from "@/utils/integrationManager";
import { ServiceCard, Review, DashboardTab } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { services, reviews, updateServices, updateReviews } = useDashboardData();
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('services');

  useEffect(() => {
    // Initialize all integrations on dashboard load
    integrationManager.initializeAllIntegrations();
  }, []);

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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesTab services={services} onEdit={setEditingService} onDelete={deleteService} onAdd={addNewService} />;
      case 'reviews':
        return <ReviewsTab reviews={reviews} onEdit={setEditingReview} onDelete={deleteReview} onAdd={addNewReview} />;
      case 'website':
        return <WebsiteTab />;
      case 'logo':
        return <LogoManagement />;
      case 'contact':
        return <ContactManagement />;
      case 'homepage':
        return <HomepageElements />;
      case 'pricing':
        return <PricingManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'header':
        return <HeaderCustomizationTab />;
      case 'amplify':
        return <AmplifyTab />;
      case 'cognito':
        return <CognitoTab />;
      case 'dynamodb':
        return <DynamoDBTab />;
      case 's3':
        return <S3Tab />;
      case 'ses':
        return <SESTab />;
      case 'cloudflare':
        return <CloudflareTab />;
      case 'user-management':
        return <UserManagementTab />;
      case 'integration-status':
        return <IntegrationStatusTab />;
      case 'facebook-pixel':
        return <FacebookPixelTab />;
      case 'google-analytics':
        return <GoogleAnalyticsTab />;
      case 'custom-events':
        return <CustomEventsTab />;
      case 'seo':
        return <WebsiteSEOTab />;
      default:
        return <ServicesTab services={services} onEdit={setEditingService} onDelete={deleteService} onAdd={addNewService} />;
    }
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
          
          {/* Dynamic Layout */}
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
                          <button 
                            onClick={() => setActiveTab('services')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'services' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Services ({services.length})
                          </button>
                          <button 
                            onClick={() => setActiveTab('reviews')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'reviews' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Reviews ({reviews.length})
                          </button>
                          <button 
                            onClick={() => setActiveTab('website')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'website' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Website
                          </button>
                          <button 
                            onClick={() => setActiveTab('logo')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'logo' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Logo
                          </button>
                          <button 
                            onClick={() => setActiveTab('contact')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'contact' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Contact
                          </button>
                          <button 
                            onClick={() => setActiveTab('homepage')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'homepage' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Homepage
                          </button>
                          <button 
                            onClick={() => setActiveTab('pricing')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'pricing' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Pricing
                          </button>
                          <button 
                            onClick={() => setActiveTab('blog')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'blog' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Blog
                          </button>
                          <button 
                            onClick={() => setActiveTab('header')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'header' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Header Menu
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="user-management">
                      <AccordionTrigger className="text-sm font-medium">User Management</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button 
                            onClick={() => setActiveTab('user-management')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'user-management' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            User Management
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="aws-services">
                      <AccordionTrigger className="text-sm font-medium">AWS Services</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button 
                            onClick={() => setActiveTab('amplify')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'amplify' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            AWS Amplify
                          </button>
                          <button 
                            onClick={() => setActiveTab('cognito')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'cognito' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Amazon Cognito
                          </button>
                          <button 
                            onClick={() => setActiveTab('dynamodb')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'dynamodb' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            DynamoDB
                          </button>
                          <button 
                            onClick={() => setActiveTab('s3')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 's3' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Amazon S3
                          </button>
                          <button 
                            onClick={() => setActiveTab('ses')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'ses' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Amazon SES
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="cdn-services">
                      <AccordionTrigger className="text-sm font-medium">CDN & Security</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button 
                            onClick={() => setActiveTab('cloudflare')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'cloudflare' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Cloudflare
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="analytics">
                      <AccordionTrigger className="text-sm font-medium">Analytics & Tracking</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button 
                            onClick={() => setActiveTab('facebook-pixel')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'facebook-pixel' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Facebook Pixel
                          </button>
                          <button 
                            onClick={() => setActiveTab('google-analytics')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'google-analytics' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Google Analytics
                          </button>
                          <button 
                            onClick={() => setActiveTab('custom-events')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'custom-events' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Custom Events
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="seo">
                      <AccordionTrigger className="text-sm font-medium">SEO & Optimization</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button 
                            onClick={() => setActiveTab('seo')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'seo' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Website SEO
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="monitoring">
                      <AccordionTrigger className="text-sm font-medium">System Monitoring</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <button 
                            onClick={() => setActiveTab('integration-status')}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${activeTab === 'integration-status' ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'}`}
                          >
                            Integration Status
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area - Dynamic Tab Rendering */}
            <div className="lg:col-span-3">
              <div className="animate-fade-in">
                {renderActiveTab()}
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

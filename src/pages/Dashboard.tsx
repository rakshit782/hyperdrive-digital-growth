
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
import IntegrationTestTab from "@/components/dashboard/IntegrationTestTab";
import SocialMediaTab from "@/components/dashboard/SocialMediaTab";
import ChatGPTTab from "@/components/dashboard/ChatGPTTab";
import StatsManagement from "@/components/dashboard/StatsManagement";
import PolicyPagesTab from "@/components/dashboard/PolicyPagesTab";
import GoogleSheetsTab from "@/components/dashboard/GoogleSheetsTab";
import FooterManagementTab from "@/components/dashboard/FooterManagementTab";
import Header from "@/components/Header";
import { useDashboardData } from "@/hooks/useDashboardData";
import { integrationManager } from "@/utils/integrationManager";
import { chatGPTManager } from "@/utils/chatGPTManager";
import { ServiceCard, Review, DashboardTab } from "@/types/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import toast from "sonner";
import ModernFeaturesTab from "@/components/dashboard/ModernFeaturesTab";

const Dashboard = () => {
  const { services, reviews, updateServices, updateReviews } = useDashboardData();
  const [editingService, setEditingService] = useState<ServiceCard | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('services');

  useEffect(() => {
    // Initialize all integrations on dashboard load
    integrationManager.initializeAllIntegrations();
    chatGPTManager.loadSavedConfig();
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

  const renderTabContent = () => {
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
      case 'footer':
        return <FooterManagementTab />;
      case 'social-media':
        return <SocialMediaTab />;
      case 'stats':
        return <StatsManagement />;
      case 'policy-pages':
        return <PolicyPagesTab />;
      case 'google-sheets':
        return <GoogleSheetsTab />;
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
      case 'integration-test':
        return <IntegrationTestTab />;
      case 'facebook-pixel':
        return <FacebookPixelTab />;
      case 'google-analytics':
        return <GoogleAnalyticsTab />;
      case 'chatgpt':
        return <ChatGPTTab />;
      case 'modern-features':
        return <ModernFeaturesTab />;
      case 'seo':
        return <WebsiteSEOTab />;
      default:
        return <ServicesTab services={services} onEdit={setEditingService} onDelete={deleteService} onAdd={addNewService} />;
    }
  };

  return (
    <>
      <SEOHead 
        title="Dashboard - Manage Your Website Content"
        description="Admin dashboard to manage website content, services, reviews, and settings"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600">Manage your website content and settings</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1 max-h-96 overflow-y-auto scrollbar-hide">
                    {/* Content Management */}
                    <div className="px-4 py-2">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Content</h3>
                      <div className="space-y-1">
                        <button
                          onClick={() => setActiveTab('services')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeTab === 'services' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Services
                        </button>
                        <button
                          onClick={() => setActiveTab('reviews')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeTab === 'reviews' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Reviews
                        </button>
                        <button
                          onClick={() => setActiveTab('modern-features')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeTab === 'modern-features' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Modern Features
                        </button>
                        <button
                          onClick={() => setActiveTab('blog')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeTab === 'blog' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Blog Management
                        </button>
                      </div>
                    </div>

                    {/* Integrations */}
                    <div className="px-4 py-2">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Integrations</h3>
                      <div className="space-y-1">
                        <button 
                          onClick={() => setActiveTab('integration-status')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'integration-status' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Status Overview
                        </button>
                        <button 
                          onClick={() => setActiveTab('integration-test')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'integration-test' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Test All Integrations
                        </button>
                        <button 
                          onClick={() => setActiveTab('google-sheets')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'google-sheets' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Google Sheets
                        </button>
                        <button 
                          onClick={() => setActiveTab('facebook-pixel')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'facebook-pixel' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Facebook Pixel
                        </button>
                        <button 
                          onClick={() => setActiveTab('google-analytics')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'google-analytics' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Google Analytics
                        </button>
                        <button 
                          onClick={() => setActiveTab('chatgpt')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'chatgpt' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          ChatGPT AI
                        </button>
                      </div>
                    </div>

                    {/* AWS Services */}
                    <div className="px-4 py-2">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">AWS Services</h3>
                      <div className="space-y-1">
                        <button 
                          onClick={() => setActiveTab('amplify')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'amplify' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Amplify
                        </button>
                        <button 
                          onClick={() => setActiveTab('cognito')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'cognito' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Cognito
                        </button>
                        <button 
                          onClick={() => setActiveTab('dynamodb')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'dynamodb' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          DynamoDB
                        </button>
                        <button 
                          onClick={() => setActiveTab('s3')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 's3' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          S3
                        </button>
                        <button 
                          onClick={() => setActiveTab('ses')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'ses' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          SES
                        </button>
                      </div>
                    </div>

                    {/* Other Tools */}
                    <div className="px-4 py-2">
                      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Other Tools</h3>
                      <div className="space-y-1">
                        <button 
                          onClick={() => setActiveTab('cloudflare')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'cloudflare' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Cloudflare
                        </button>
                        <button 
                          onClick={() => setActiveTab('user-management')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'user-management' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          User Management
                        </button>
                        <button 
                          onClick={() => setActiveTab('custom-events')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'custom-events' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Custom Events
                        </button>
                        <button 
                          onClick={() => setActiveTab('seo')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'seo' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          SEO
                        </button>
                        <button 
                          onClick={() => setActiveTab('pricing')}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'pricing' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                        >
                          Pricing
                        </button>
                      </div>
                    </div>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1 max-h-screen overflow-y-auto scrollbar-hide">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modals */}
      {editingService && (
        <ServiceEditModal
          service={editingService}
          onSave={saveService}
          onClose={() => setEditingService(null)}
        />
      )}

      {editingReview && (
        <ReviewEditModal
          review={editingReview}
          onSave={saveReview}
          onClose={() => setEditingReview(null)}
        />
      )}
    </>
  );
};

export default Dashboard;

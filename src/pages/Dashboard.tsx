import { useState } from "react";
import { DashboardTab } from "@/types/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Bell, Search, User, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Component imports
import ServicesTab from "@/components/dashboard/ServicesTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import WebsiteTab from "@/components/dashboard/WebsiteTab";
import LogoManagement from "@/components/dashboard/LogoManagement";
import ContactManagement from "@/components/dashboard/ContactManagement";
import HomepageElements from "@/components/dashboard/HomepageElements";
import AboutUsTab from "@/components/dashboard/AboutUsTab";
import PricingManagement from "@/components/dashboard/PricingManagement";
import BlogManagement from "@/components/dashboard/BlogManagement";
import HeaderCustomizationTab from "@/components/dashboard/HeaderCustomizationTab";
import FooterManagementTab from "@/components/dashboard/FooterManagementTab";
import SocialMediaTab from "@/components/dashboard/SocialMediaTab";
import StatsManagement from "@/components/dashboard/StatsManagement";
import PolicyPagesTab from "@/components/dashboard/PolicyPagesTab";
import GoogleSheetsTab from "@/components/dashboard/GoogleSheetsTab";
import AmplifyTab from "@/components/dashboard/AmplifyTab";
import CognitoTab from "@/components/dashboard/CognitoTab";
import DynamoDBTab from "@/components/dashboard/DynamoDBTab";
import S3Tab from "@/components/dashboard/S3Tab";
import SESTab from "@/components/dashboard/SESTab";
import CloudflareTab from "@/components/dashboard/CloudflareTab";
import UserManagementTab from "@/components/dashboard/UserManagementTab";
import WebsitePreviewTab from "@/components/dashboard/WebsitePreviewTab";
import IntegrationStatusTab from "@/components/dashboard/IntegrationStatusTab";
import IntegrationTestTab from "@/components/dashboard/IntegrationTestTab";
import FacebookPixelTab from "@/components/dashboard/FacebookPixelTab";
import GoogleAnalyticsTab from "@/components/dashboard/GoogleAnalyticsTab";
import ChatGPTTab from "@/components/dashboard/ChatGPTTab";
import ModernFeaturesTab from "@/components/dashboard/ModernFeaturesTab";
import WebsiteSEOTab from "@/components/dashboard/WebsiteSEOTab";
import CustomEventsTab from "@/components/dashboard/CustomEventsTab";
import HeroCustomizationTab from "@/components/dashboard/HeroCustomizationTab";
import AnalyticsDashboardTab from "@/components/dashboard/AnalyticsDashboardTab";
import LeadManagementTab from "@/components/dashboard/LeadManagementTab";
import AutomationSettingsTab from "@/components/dashboard/AutomationSettingsTab";
import ContentManagementTab from "@/components/dashboard/ContentManagementTab";
import MenuManagementTab from "@/components/dashboard/MenuManagementTab";
import ServicePagesManagementTab from "@/components/dashboard/ServicePagesManagementTab";
import WebsiteAuditTab from "@/components/dashboard/WebsiteAuditTab";
import ZapierIntegrationTab from "@/components/dashboard/ZapierIntegrationTab";
import EmailAutomationTab from "@/components/dashboard/EmailAutomationTab";
import FAQManagementTab from "@/components/dashboard/FAQManagementTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('services');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { services, reviews, updateServices, updateReviews } = useDashboardData();

  const handleEditService = (service: any) => {
    console.log("Edit service:", service);
  };

  const handleDeleteService = (id: string) => {
    const newServices = services.filter(service => service.id !== id);
    updateServices(newServices);
  };

  const handleAddService = () => {
    console.log("Add service");
  };

  const handleEditReview = (review: any) => {
    console.log("Edit review:", review);
  };

  const handleDeleteReview = (id: string) => {
    const newReviews = reviews.filter(review => review.id !== id);
    updateReviews(newReviews);
  };

  const handleAddReview = () => {
    console.log("Add review");
  };

  const tabCategories = [
    {
      category: "Content Management",
      tabs: [
        { value: 'services', label: 'Services', icon: '🛠️' },
        { value: 'service-pages', label: 'Service Pages', icon: '📄' },
        { value: 'reviews', label: 'Reviews', icon: '⭐' },
        { value: 'hero-customization', label: 'Hero Section', icon: '🎯' },
        { value: 'homepage', label: 'Homepage', icon: '🏠' },
        { value: 'about-us', label: 'About Us', icon: '👥' },
        { value: 'pricing', label: 'Pricing', icon: '💰' },
        { value: 'faq-management', label: 'FAQ', icon: '❓' },
        { value: 'blog', label: 'Blog', icon: '📝' },
        { value: 'contact', label: 'Contact', icon: '📞' },
        { value: 'content-management', label: 'Content', icon: '📄' }
      ]
    },
    {
      category: "Design & Branding",
      tabs: [
        { value: 'logo', label: 'Logo', icon: '🎨' },
        { value: 'header', label: 'Header', icon: '📋' },
        { value: 'menu-management', label: 'Menu', icon: '📋' },
        { value: 'footer', label: 'Footer', icon: '📄' },
        { value: 'modern-features', label: 'Features', icon: '✨' },
        { value: 'social-media', label: 'Social', icon: '📱' }
      ]
    },
    {
      category: "Analytics & Performance",
      tabs: [
        { value: 'stats', label: 'Stats', icon: '📊' },
        { value: 'seo', label: 'SEO', icon: '🔍' },
        { value: 'facebook-pixel', label: 'FB Pixel', icon: '📘' },
        { value: 'google-analytics', label: 'Analytics', icon: '📈' },
        { value: 'custom-events', label: 'Events', icon: '🎯' },
        { value: 'analytics-dashboard', label: 'Dashboard', icon: '📊' },
        { value: 'website-audit', label: 'Site Audit', icon: '🔍' }
      ]
    },
    {
      category: "Lead Management & Automation",
      tabs: [
        { value: 'lead-management', label: 'Leads', icon: '👥' },
        { value: 'zapier-integration', label: 'Zapier', icon: '⚡' },
        { value: 'email-automation', label: 'Email Auto', icon: '📧' },
        { value: 'automation-settings', label: 'Automation', icon: '🤖' }
      ]
    },
    {
      category: "Infrastructure",
      tabs: [
        { value: 'amplify', label: 'Amplify', icon: '⚡' },
        { value: 'cognito', label: 'Cognito', icon: '🔐' },
        { value: 'dynamodb', label: 'DynamoDB', icon: '🗄️' },
        { value: 's3', label: 'S3', icon: '☁️' },
        { value: 'ses', label: 'SES', icon: '📧' },
        { value: 'cloudflare', label: 'Cloudflare', icon: '🛡️' },
        { value: 'user-management', label: 'Users', icon: '👥' },
        { value: 'website-preview', label: 'Preview', icon: '👁️' }
      ]
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <ServicesTab 
            services={services}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
            onAdd={handleAddService}
          />
        );
      case 'reviews':
        return (
          <ReviewsTab 
            reviews={reviews}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
            onAdd={handleAddReview}
          />
        );
      case 'hero-customization':
        return <HeroCustomizationTab />;
      case 'website':
        return <WebsiteTab />;
      case 'logo':
        return <LogoManagement />;
      case 'contact':
        return <ContactManagement />;
      case 'homepage':
        return <HomepageElements />;
      case 'about-us':
        return <AboutUsTab />;
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
      case 'website-preview':
        return <WebsitePreviewTab />;
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
      case 'custom-events':
        return <CustomEventsTab />;
      case 'analytics-dashboard':
        return <AnalyticsDashboardTab />;
      case 'lead-management':
        return <LeadManagementTab />;
      case 'automation-settings':
        return <AutomationSettingsTab />;
      case 'content-management':
        return <ContentManagementTab />;
      case 'service-pages':
        return <ServicePagesManagementTab />;
      case 'menu-management':
        return <MenuManagementTab />;
      case 'website-audit':
        return <WebsiteAuditTab />;
      case 'zapier-integration':
        return <ZapierIntegrationTab />;
      case 'email-automation':
        return <EmailAutomationTab />;
      case 'faq-management':
        return <FAQManagementTab />;
      default:
        return (
          <ServicesTab 
            services={services}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
            onAdd={handleAddService}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern CRM Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Agency CRM</h1>
              <p className="text-sm text-slate-500">Manage your digital presence</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                className="pl-10 w-80 bg-slate-100 border-0"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />
            </Button>
            
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Modern Sidebar */}
        <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-80'
        } hidden lg:flex flex-col`}>
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <p className="font-semibold text-slate-900">Control Panel</p>
                  <p className="text-xs text-slate-500">Manage everything</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {tabCategories.map((category) => (
              <div key={category.category}>
                {!sidebarCollapsed && (
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    {category.category}
                  </h3>
                )}
                <div className="space-y-1">
                  {category.tabs.map((tab) => (
                    <Button
                      key={tab.value}
                      variant={activeTab === tab.value ? "default" : "ghost"}
                      className={`w-full justify-start h-10 ${
                        sidebarCollapsed ? 'px-3' : 'px-4'
                      } ${
                        activeTab === tab.value 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                      onClick={() => setActiveTab(tab.value as DashboardTab)}
                    >
                      <span className="text-base mr-3">{tab.icon}</span>
                      {!sidebarCollapsed && (
                        <span className="font-medium">{tab.label}</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {!sidebarCollapsed && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarCollapsed(true)}>
            <aside className="bg-white w-80 h-full overflow-y-auto">
              {/* Same sidebar content for mobile */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Control Panel</p>
                    <p className="text-xs text-slate-500">Manage everything</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-6">
                {tabCategories.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      {category.category}
                    </h3>
                    <div className="space-y-1">
                      {category.tabs.map((tab) => (
                        <Button
                          key={tab.value}
                          variant={activeTab === tab.value ? "default" : "ghost"}
                          className={`w-full justify-start h-10 px-4 ${
                            activeTab === tab.value 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                          onClick={() => {
                            setActiveTab(tab.value as DashboardTab);
                            setSidebarCollapsed(true);
                          }}
                        >
                          <span className="text-base mr-3">{tab.icon}</span>
                          <span className="font-medium">{tab.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-6">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

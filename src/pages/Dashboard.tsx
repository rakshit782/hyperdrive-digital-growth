
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Settings, Database, Mail, FileText, Users, Code, 
  Image, Globe, MessageSquare, Analytics, Palette,
  Layout, Star, ChevronLeft, Monitor
} from "lucide-react";

// Lazy load all dashboard tabs
import LogoManagement from "@/components/dashboard/LogoManagement";
import WebsiteTab from "@/components/dashboard/WebsiteTab";
import HeaderCustomizationTab from "@/components/dashboard/HeaderCustomizationTab";
import HomepageCustomizationTab from "@/components/dashboard/HomepageCustomizationTab";
import FooterManagementTab from "@/components/dashboard/FooterManagementTab";
import PolicyPagesTab from "@/components/dashboard/PolicyPagesTab";
import WebsiteSEOTab from "@/components/dashboard/WebsiteSEOTab";
import ServicesTab from "@/components/dashboard/ServicesTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import BlogManagement from "@/components/dashboard/BlogManagement";
import ModernFeaturesTab from "@/components/dashboard/ModernFeaturesTab";
import PricingManagement from "@/components/dashboard/PricingManagement";
import ContactManagement from "@/components/dashboard/ContactManagement";
import SocialMediaTab from "@/components/dashboard/SocialMediaTab";
import DynamoDBTab from "@/components/dashboard/DynamoDBTab";
import SESTab from "@/components/dashboard/SESTab";
import S3Tab from "@/components/dashboard/S3Tab";
import GoogleSheetsTab from "@/components/dashboard/GoogleSheetsTab";
import EmailJSTab from "@/components/dashboard/EmailJSTab";
import FormspreeTab from "@/components/dashboard/FormspreeTab";
import GoogleAnalyticsTab from "@/components/dashboard/GoogleAnalyticsTab";
import FacebookPixelTab from "@/components/dashboard/FacebookPixelTab";
import IntegrationTestTab from "@/components/dashboard/IntegrationTestTab";
import IntegrationStatusTab from "@/components/dashboard/IntegrationStatusTab";
import CustomEventsTab from "@/components/dashboard/CustomEventsTab";
import UserManagementTab from "@/components/dashboard/UserManagementTab";
import CognitoTab from "@/components/dashboard/CognitoTab";
import ClerkTab from "@/components/dashboard/ClerkTab";
import Auth0Tab from "@/components/dashboard/Auth0Tab";
import AmplifyTab from "@/components/dashboard/AmplifyTab";
import ChatGPTTab from "@/components/dashboard/ChatGPTTab";
import CloudflareTab from "@/components/dashboard/CloudflareTab";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("website");
  const [collapsed, setCollapsed] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const tabSections = [
    {
      category: "Website Design",
      icon: <Palette className="w-4 h-4" />,
      tabs: [
        { id: "website", label: "Website Settings", icon: <Globe className="w-4 h-4" /> },
        { id: "logo", label: "Logo Management", icon: <Image className="w-4 h-4" /> },
        { id: "header", label: "Header Settings", icon: <Layout className="w-4 h-4" /> },
        { id: "homepage", label: "Homepage", icon: <Monitor className="w-4 h-4" /> },
        { id: "footer", label: "Footer Settings", icon: <Layout className="w-4 h-4" /> },
        { id: "policies", label: "Policy Pages", icon: <FileText className="w-4 h-4" /> },
        { id: "seo", label: "Website SEO", icon: <Analytics className="w-4 h-4" /> },
      ]
    },
    {
      category: "Content Management",
      icon: <FileText className="w-4 h-4" />,
      tabs: [
        { id: "services", label: "Services", icon: <Settings className="w-4 h-4" /> },
        { id: "reviews", label: "Reviews", icon: <Star className="w-4 h-4" /> },
        { id: "blog", label: "Blog Management", icon: <FileText className="w-4 h-4" /> },
        { id: "features", label: "Modern Features", icon: <Code className="w-4 h-4" /> },
        { id: "pricing", label: "Pricing", icon: <Database className="w-4 h-4" /> },
        { id: "contact", label: "Contact Forms", icon: <MessageSquare className="w-4 h-4" /> },
        { id: "social", label: "Social Media", icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      category: "Data & Storage",
      icon: <Database className="w-4 h-4" />,
      tabs: [
        { id: "dynamodb", label: "DynamoDB", icon: <Database className="w-4 h-4" /> },
        { id: "ses", label: "AWS SES", icon: <Mail className="w-4 h-4" /> },
        { id: "s3", label: "AWS S3", icon: <Database className="w-4 h-4" /> },
        { id: "sheets", label: "Google Sheets", icon: <FileText className="w-4 h-4" /> },
        { id: "emailjs", label: "EmailJS", icon: <Mail className="w-4 h-4" /> },
        { id: "formspree", label: "Formspree", icon: <MessageSquare className="w-4 h-4" /> },
      ]
    },
    {
      category: "Analytics & Tracking",
      icon: <Analytics className="w-4 h-4" />,
      tabs: [
        { id: "analytics", label: "Google Analytics", icon: <Analytics className="w-4 h-4" /> },
        { id: "facebook", label: "Facebook Pixel", icon: <Analytics className="w-4 h-4" /> },
        { id: "test", label: "Integration Test", icon: <Code className="w-4 h-4" /> },
        { id: "status", label: "Integration Status", icon: <Settings className="w-4 h-4" /> },
        { id: "events", label: "Custom Events", icon: <Code className="w-4 h-4" /> },
      ]
    },
    {
      category: "Authentication",
      icon: <Users className="w-4 h-4" />,
      tabs: [
        { id: "users", label: "User Management", icon: <Users className="w-4 h-4" /> },
        { id: "cognito", label: "AWS Cognito", icon: <Database className="w-4 h-4" /> },
        { id: "clerk", label: "Clerk", icon: <Users className="w-4 h-4" /> },
        { id: "auth0", label: "Auth0", icon: <Users className="w-4 h-4" /> },
        { id: "amplify", label: "AWS Amplify", icon: <Database className="w-4 h-4" /> },
      ]
    },
    {
      category: "Advanced Features",
      icon: <Code className="w-4 h-4" />,
      tabs: [
        { id: "chatgpt", label: "ChatGPT", icon: <MessageSquare className="w-4 h-4" /> },
        { id: "cloudflare", label: "Cloudflare", icon: <Globe className="w-4 h-4" /> },
      ]
    }
  ];

  const getTabComponent = (tabId: string) => {
    switch (tabId) {
      case "website": return <WebsiteTab />;
      case "logo": return <LogoManagement />;
      case "header": return <HeaderCustomizationTab />;
      case "homepage": return <HomepageCustomizationTab />;
      case "footer": return <FooterManagementTab />;
      case "policies": return <PolicyPagesTab />;
      case "seo": return <WebsiteSEOTab />;
      case "services": return <ServicesTab />;
      case "reviews": return <ReviewsTab />;
      case "blog": return <BlogManagement />;
      case "features": return <ModernFeaturesTab />;
      case "pricing": return <PricingManagement />;
      case "contact": return <ContactManagement />;
      case "social": return <SocialMediaTab />;
      case "dynamodb": return <DynamoDBTab />;
      case "ses": return <SESTab />;
      case "s3": return <S3Tab />;
      case "sheets": return <GoogleSheetsTab />;
      case "emailjs": return <EmailJSTab />;
      case "formspree": return <FormspreeTab />;
      case "analytics": return <GoogleAnalyticsTab />;
      case "facebook": return <FacebookPixelTab />;
      case "test": return <IntegrationTestTab />;
      case "status": return <IntegrationStatusTab />;
      case "events": return <CustomEventsTab />;
      case "users": return <UserManagementTab />;
      case "cognito": return <CognitoTab />;
      case "clerk": return <ClerkTab />;
      case "auth0": return <Auth0Tab />;
      case "amplify": return <AmplifyTab />;
      case "chatgpt": return <ChatGPTTab />;
      case "cloudflare": return <CloudflareTab />;
      default: return <WebsiteTab />;
    }
  };

  const currentTab = tabSections.flatMap(section => section.tabs).find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar with transparent scroll */}
      <div className={`bg-white border-r border-gray-200 shadow-modern transition-all duration-300 ${collapsed ? 'w-16' : 'w-80'} flex flex-col`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-blue-100 text-sm">Manage your website</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation with transparent scroll */}
        <div className="flex-1 overflow-y-auto dashboard-scroll">
          <div className="p-4 space-y-6">
            {tabSections.map((section) => (
              <div key={section.category}>
                {!collapsed && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    {section.icon}
                    <span>{section.category}</span>
                  </div>
                )}
                
                <div className="space-y-1">
                  {section.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-modern'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      title={collapsed ? tab.label : undefined}
                    >
                      {tab.icon}
                      {!collapsed && <span>{tab.label}</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-modern">
          <div className="flex items-center gap-3">
            {currentTab?.icon}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentTab?.label}</h2>
              <p className="text-gray-600 text-sm">Configure and manage your {currentTab?.label.toLowerCase()}</p>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Tabs value={activeTab} className="space-y-6">
            {tabSections.flatMap(section => section.tabs).map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                {getTabComponent(tab.id)}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

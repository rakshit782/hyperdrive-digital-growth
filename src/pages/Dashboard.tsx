
import { useState } from "react";
import { DashboardTab } from "@/types/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
import IntegrationStatusTab from "@/components/dashboard/IntegrationStatusTab";
import IntegrationTestTab from "@/components/dashboard/IntegrationTestTab";
import FacebookPixelTab from "@/components/dashboard/FacebookPixelTab";
import GoogleAnalyticsTab from "@/components/dashboard/GoogleAnalyticsTab";
import ChatGPTTab from "@/components/dashboard/ChatGPTTab";
import ModernFeaturesTab from "@/components/dashboard/ModernFeaturesTab";
import WebsiteSEOTab from "@/components/dashboard/WebsiteSEOTab";
import CustomEventsTab from "@/components/dashboard/CustomEventsTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('services');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesTab />;
      case 'reviews':
        return <ReviewsTab />;
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
      default:
        return <ServicesTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agency Dashboard
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Manage your website content and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DashboardTab)} className="w-full">
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-2 bg-white/50 mb-8">
                <TabsTrigger value="services" className="text-xs">Services</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs">Reviews</TabsTrigger>
                <TabsTrigger value="website" className="text-xs">Website</TabsTrigger>
                <TabsTrigger value="logo" className="text-xs">Logo</TabsTrigger>
                <TabsTrigger value="contact" className="text-xs">Contact</TabsTrigger>
                <TabsTrigger value="homepage" className="text-xs">Homepage</TabsTrigger>
                <TabsTrigger value="about-us" className="text-xs">About Us</TabsTrigger>
                <TabsTrigger value="pricing" className="text-xs">Pricing</TabsTrigger>
                <TabsTrigger value="blog" className="text-xs">Blog</TabsTrigger>
                <TabsTrigger value="header" className="text-xs">Header</TabsTrigger>
                <TabsTrigger value="footer" className="text-xs">Footer</TabsTrigger>
                <TabsTrigger value="social-media" className="text-xs">Social</TabsTrigger>
                <TabsTrigger value="stats" className="text-xs">Stats</TabsTrigger>
                <TabsTrigger value="modern-features" className="text-xs">Features</TabsTrigger>
                <TabsTrigger value="policy-pages" className="text-xs">Policies</TabsTrigger>
                <TabsTrigger value="seo" className="text-xs">SEO</TabsTrigger>
                <TabsTrigger value="google-sheets" className="text-xs">Sheets</TabsTrigger>
                <TabsTrigger value="amplify" className="text-xs">Amplify</TabsTrigger>
                <TabsTrigger value="cognito" className="text-xs">Cognito</TabsTrigger>
                <TabsTrigger value="dynamodb" className="text-xs">DynamoDB</TabsTrigger>
                <TabsTrigger value="s3" className="text-xs">S3</TabsTrigger>
                <TabsTrigger value="ses" className="text-xs">SES</TabsTrigger>
                <TabsTrigger value="cloudflare" className="text-xs">Cloudflare</TabsTrigger>
                <TabsTrigger value="user-management" className="text-xs">Users</TabsTrigger>
                <TabsTrigger value="integration-status" className="text-xs">Status</TabsTrigger>
                <TabsTrigger value="integration-test" className="text-xs">Test</TabsTrigger>
                <TabsTrigger value="facebook-pixel" className="text-xs">FB Pixel</TabsTrigger>
                <TabsTrigger value="google-analytics" className="text-xs">Analytics</TabsTrigger>
                <TabsTrigger value="chatgpt" className="text-xs">ChatGPT</TabsTrigger>
                <TabsTrigger value="custom-events" className="text-xs">Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {renderTabContent()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

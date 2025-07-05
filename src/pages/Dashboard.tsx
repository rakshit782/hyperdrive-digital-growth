
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import PagesManager from '@/components/dashboard/PagesManager';
import WebsiteTab from '@/components/dashboard/WebsiteTab';
import Auth0Tab from '@/components/dashboard/Auth0Tab';
import HomepageElements from '@/components/dashboard/HomepageElements';
import BlogManagement from '@/components/dashboard/BlogManagement';
import ContactManagement from '@/components/dashboard/ContactManagement';
import LeadManagementTab from '@/components/dashboard/LeadManagementTab';
import WebsiteSEOTab from '@/components/dashboard/WebsiteSEOTab';
import AnalyticsDashboardTab from '@/components/dashboard/AnalyticsDashboardTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'website':
        return <WebsiteTab />;
      case 'auth0':
        return <Auth0Tab />;
      case 'pages':
        return <PagesManager />;
      case 'homepage':
        return <HomepageElements />;
      case 'blog':
        return <BlogManagement />;
      case 'contacts':
        return <ContactManagement />;
      case 'leads':
        return <LeadManagementTab />;
      case 'seo':
        return <WebsiteSEOTab />;
      case 'analytics':
        return <AnalyticsDashboardTab />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;

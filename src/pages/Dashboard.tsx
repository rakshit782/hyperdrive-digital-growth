
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import PagesManager from '@/components/dashboard/PagesManager';
import WebsiteTab from '@/components/dashboard/WebsiteTab';
import Auth0Tab from '@/components/dashboard/Auth0Tab';

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
      case 'blog':
        return <div className="p-8 text-center text-gray-500">Blog management coming soon...</div>;
      case 'media':
        return <div className="p-8 text-center text-gray-500">Media library coming soon...</div>;
      case 'tracking':
        return <div className="p-8 text-center text-gray-500">Tracking scripts management coming soon...</div>;
      case 'seo':
        return <div className="p-8 text-center text-gray-500">SEO settings coming soon...</div>;
      case 'analytics':
        return <div className="p-8 text-center text-gray-500">Analytics dashboard coming soon...</div>;
      case 'users':
        return <div className="p-8 text-center text-gray-500">User management coming soon...</div>;
      case 'settings':
        return <div className="p-8 text-center text-gray-500">Site settings coming soon...</div>;
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

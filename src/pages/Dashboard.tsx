
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import PagesManager from '@/components/dashboard/PagesManager';
import WebsiteTab from '@/components/dashboard/WebsiteTab';
import Auth0Tab from '@/components/dashboard/Auth0Tab';
import ComingSoonTab from '@/components/dashboard/ComingSoonTab';

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
        return <ComingSoonTab title="Blog Management" description="Create and manage your blog posts, categories, and featured content." />;
      case 'media':
        return <ComingSoonTab title="Media Library" description="Upload, organize, and manage your images, videos, and other media files." />;
      case 'tracking':
        return <ComingSoonTab title="Tracking Scripts" description="Add and manage tracking codes for Google Analytics, Facebook Pixel, and other services." />;
      case 'seo':
        return <ComingSoonTab title="SEO Settings" description="Configure meta tags, sitemaps, and search engine optimization settings." />;
      case 'analytics':
        return <ComingSoonTab title="Analytics Dashboard" description="View detailed analytics about your website traffic and performance." />;
      case 'users':
        return <ComingSoonTab title="User Management" description="Manage user accounts, roles, and permissions for your website." />;
      case 'settings':
        return <ComingSoonTab title="Site Settings" description="Configure global website settings, themes, and customization options." />;
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

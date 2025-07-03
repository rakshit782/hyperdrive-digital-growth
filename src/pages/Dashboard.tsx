
import React, { useState } from "react";
import ModernDashboardLayout from "@/components/dashboard/ModernDashboardLayout";
import WebsiteTab from "@/components/dashboard/WebsiteTab";
import HeroSliderTab from "@/components/dashboard/HeroSliderTab";
import ServicesTab from "@/components/dashboard/ServicesTab";
import ServicePagesManagementTab from "@/components/dashboard/ServicePagesManagementTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import FAQManagementTab from "@/components/dashboard/FAQManagementTab";
import CTAManagementTab from "@/components/dashboard/CTAManagementTab";
import FooterManagementTab from "@/components/dashboard/FooterManagementTab";
import BlogManagement from "@/components/dashboard/BlogManagement";
import LeadManagementTab from "@/components/dashboard/LeadManagementTab";
import ContactManagement from "@/components/dashboard/ContactManagement";
import EmailWorkflowTab from "@/components/dashboard/EmailWorkflowTab";
import ServiceHeaderImagesTab from "@/components/dashboard/ServiceHeaderImagesTab";
import ClienteleManagementTab from "@/components/dashboard/ClienteleManagementTab";
import PricingManagement from "@/components/dashboard/PricingManagement";
import WebsiteIntegrationsTab from "@/components/dashboard/WebsiteIntegrationsTab";
import IntegrationStatusTab from "@/components/dashboard/IntegrationStatusTab";
import { FormSecurityTab } from "@/components/dashboard/FormSecurityTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('website');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'website':
        return <WebsiteTab />;
      case 'hero-slider':
        return <HeroSliderTab />;
      case 'services':
        return <ServicesTab />;
      case 'service-pages':
        return <ServicePagesManagementTab />;
      case 'reviews':
        return <ReviewsTab />;
      case 'faq-management':
        return <FAQManagementTab />;
      case 'cta-management':
        return <CTAManagementTab />;
      case 'footer-management':
        return <FooterManagementTab />;
      case 'blog-management':
        return <BlogManagement />;
      case 'leads':
        return <LeadManagementTab />;
      case 'contact-management':
        return <ContactManagement />;
      case 'email-workflow':
        return <EmailWorkflowTab />;
      case 'form-security':
        return <FormSecurityTab />;
      case 'service-header-images':
        return <ServiceHeaderImagesTab />;
      case 'clientele-management':
        return <ClienteleManagementTab />;
      case 'pricing-management':
        return <PricingManagement />;
      case 'website-integrations':
        return <WebsiteIntegrationsTab />;
      case 'integration-status':
        return <IntegrationStatusTab />;
      default:
        return <WebsiteTab />;
    }
  };

  return (
    <ModernDashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </ModernDashboardLayout>
  );
};

export default Dashboard;

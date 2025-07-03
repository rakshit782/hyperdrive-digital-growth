
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useDashboardData } from "@/hooks/useDashboardData";
import { ServiceCard, Review } from "@/types/dashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('website');
  const { services, reviews, updateServices, updateReviews } = useDashboardData();

  const handleEditService = (service: ServiceCard) => {
    // This would open an edit modal - for now just log
    console.log('Edit service:', service);
  };

  const handleDeleteService = (id: string) => {
    const updatedServices = services.filter(s => s.id !== id);
    updateServices(updatedServices);
  };

  const handleAddService = () => {
    const newService: ServiceCard = {
      id: `service-${Date.now()}`,
      title: "New Service",
      description: "Service description",
      features: ["Feature 1", "Feature 2"],
      icon: "🚀"
    };
    updateServices([...services, newService]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'website':
        return <WebsiteTab />;
      case 'hero-slider':
        return <HeroSliderTab />;
      case 'services':
        return (
          <ServicesTab 
            services={services}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
            onAdd={handleAddService}
          />
        );
      case 'service-pages':
        return <ServicePagesManagementTab />;
      case 'reviews':
        return (
          <ReviewsTab 
            reviews={reviews}
            updateReviews={updateReviews}
          />
        );
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 gap-2 mb-6">
                <TabsTrigger value="website" className="text-xs">Website</TabsTrigger>
                <TabsTrigger value="hero-slider" className="text-xs">Hero</TabsTrigger>
                <TabsTrigger value="services" className="text-xs">Services</TabsTrigger>
                <TabsTrigger value="service-pages" className="text-xs">Pages</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs">Reviews</TabsTrigger>
                <TabsTrigger value="faq-management" className="text-xs">FAQ</TabsTrigger>
                <TabsTrigger value="cta-management" className="text-xs">CTA</TabsTrigger>
                <TabsTrigger value="footer-management" className="text-xs">Footer</TabsTrigger>
                <TabsTrigger value="blog-management" className="text-xs">Blog</TabsTrigger>
                <TabsTrigger value="leads" className="text-xs">Leads</TabsTrigger>
                <TabsTrigger value="contact-management" className="text-xs">Contact</TabsTrigger>
                <TabsTrigger value="form-security" className="text-xs">Security</TabsTrigger>
              </TabsList>
              
              <div className="space-y-6">
                {renderTabContent()}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

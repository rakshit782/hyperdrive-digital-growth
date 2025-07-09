
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import ModernDashboardLayout from "@/components/dashboard/ModernDashboardLayout";
import ServicesTab from "@/components/dashboard/ServicesTab";
import ServicePagesManagementTab from "@/components/dashboard/ServicePagesManagementTab";
import ReviewsTab from "@/components/dashboard/ReviewsTab";
import FAQManagementTab from "@/components/dashboard/FAQManagementTab";
import CTAManagementTab from "@/components/dashboard/CTAManagementTab";
import FooterManagementTab from "@/components/dashboard/FooterManagementTab";
import BlogManagement from "@/components/dashboard/BlogManagement";
import LeadManagementTab from "@/components/dashboard/LeadManagementTab";
import ContactManagement from "@/components/dashboard/ContactManagement";
import NewsletterEmailManagementTab from "@/components/dashboard/NewsletterEmailManagementTab";
import EmailWorkflowTab from "@/components/dashboard/EmailWorkflowTab";
import ServiceHeaderImagesTab from "@/components/dashboard/ServiceHeaderImagesTab";
import ClienteleManagementTab from "@/components/dashboard/ClienteleManagementTab";
import PricingManagement from "@/components/dashboard/PricingManagement";
import WebsiteIntegrationsTab from "@/components/dashboard/WebsiteIntegrationsTab";
import IntegrationStatusTab from "@/components/dashboard/IntegrationStatusTab";
import { FormSecurityTab } from "@/components/dashboard/FormSecurityTab";
import HomepageCustomizationTab from "@/components/dashboard/HomepageCustomizationTab";
import { SecuritySettingsTab } from "@/components/dashboard/SecuritySettingsTab";
import { useDashboardData } from "@/hooks/useDashboardData";
import { ServiceCard, Review } from "@/types/dashboard";
import { 
  Settings, 
  LayoutDashboard, 
  Star, 
  Shield, 
  Target,
  Link2,
  Database,
  Mail,
  Image,
  Users,
  Cog,
  Zap,
  Palette
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const { services, reviews, updateServices, updateReviews } = useDashboardData();

  const handleEditService = (service: ServiceCard) => {
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

  const getTabIcon = (tabId: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'services': Settings,
      'service-pages': LayoutDashboard,
      'reviews': Star,
      'faq-management': Shield,
      'cta-management': Target,
      'footer-management': Link2,
      'blog-management': LayoutDashboard,
      'leads': Database,
      'contact-management': Mail,
      'newsletter-email-management': Mail,
      'email-workflow': Mail,
      'form-security': Shield,
      'security-settings': Shield,
      'service-header-images': Image,
      'clientele-management': Users,
      'pricing-management': Cog,
      'website-integrations': Zap,
      'integration-status': Zap,
      'homepage-customization': Palette,
    };
    return iconMap[tabId] || Settings;
  };

  const getTabTitle = (tabId: string) => {
    const titleMap: { [key: string]: string } = {
      'services': 'Services Management',
      'service-pages': 'Service Pages Management',
      'reviews': 'Reviews Management',
      'faq-management': 'FAQ Management',
      'cta-management': 'CTA Management',
      'footer-management': 'Footer Management',
      'blog-management': 'Blog Management',
      'leads': 'Lead Management',
      'contact-management': 'Contact Management',
      'newsletter-email-management': 'Newsletter Email Management',
      'email-workflow': 'Email Workflow',
      'form-security': 'Form Security Monitor',
      'security-settings': 'Security Settings',
      'service-header-images': 'Service Images',
      'clientele-management': 'Clientele Management',
      'pricing-management': 'Pricing Management',
      'website-integrations': 'Website Integrations',
      'integration-status': 'Integration Status',
      'homepage-customization': 'Homepage Customization',
    };
    return titleMap[tabId] || 'Dashboard';
  };

  const getTabDescription = (tabId: string) => {
    const descriptionMap: { [key: string]: string } = {
      'services': 'Add, edit, and organize your service offerings',
      'service-pages': 'Manage service pages with real-time data editor for stats, case studies, and reviews',
      'reviews': 'Manage customer reviews and testimonials',
      'faq-management': 'Create and organize frequently asked questions',
      'cta-management': 'Configure call-to-action sections and buttons',
      'footer-management': 'Customize footer content and partner logos',
      'blog-management': 'Create and manage blog posts and articles',
      'leads': 'View and manage customer leads and inquiries',
      'contact-management': 'Handle contact form submissions and messages',
      'newsletter-email-management': 'Manage newsletter email subscribers and campaigns',
      'email-workflow': 'Set up automated email sequences and campaigns',
      'form-security': 'Monitor form security and spam protection',
      'security-settings': 'Configure security features and reCAPTCHA',
      'service-header-images': 'Upload and manage service page header images',
      'clientele-management': 'Manage client logos and testimonials',
      'pricing-management': 'Configure pricing plans and packages',
      'website-integrations': 'Manage third-party integrations and APIs',
      'integration-status': 'Monitor integration health and status',
      'homepage-customization': 'Customize homepage design and layout',
    };
    return descriptionMap[tabId] || 'Manage your dashboard settings';
  };

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
      case 'newsletter-email-management':
        return <NewsletterEmailManagementTab />;
      case 'email-workflow':
        return <EmailWorkflowTab />;
      case 'form-security':
        return <FormSecurityTab />;
      case 'security-settings':
        return <SecuritySettingsTab />;
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
      case 'homepage-customization':
        return <HomepageCustomizationTab />;
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

  const TabIcon = getTabIcon(activeTab);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full crm-gradient">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ModernDashboardLayout
                title={getTabTitle(activeTab)}
                description={getTabDescription(activeTab)}
                icon={<TabIcon className="w-6 h-6" />}
                category="Management"
              >
                {renderTabContent()}
              </ModernDashboardLayout>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

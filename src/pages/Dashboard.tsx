import React, { useState } from "react";
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
import AboutContentManagement from "@/components/dashboard/AboutContentManagement";
import SEOManagement from "@/components/dashboard/SEOManagement";
import PolicyPagesTab from "@/components/dashboard/PolicyPagesTab";
import LogoManagementTab from "@/components/dashboard/LogoManagementTab";
import WebsiteTab from "@/components/dashboard/WebsiteTab";
import { useDashboardData } from "@/hooks/useDashboardData";
import { ServiceCard } from "@/types/dashboard";
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
  Palette,
  FileText,
  Search,
  BookOpen,
  HelpCircle,
  DollarSign,
  Home,
  Scale
} from "lucide-react";
import PartnersManagementTab from "@/components/dashboard/PartnersManagementTab";
import MarketingEmailDashboard from "@/components/dashboard/MarketingEmailDashboard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const { services, updateServices } = useDashboardData();

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
      'about-content': FileText,
      'seo-management': Search,
      'blog-management': BookOpen,
      'reviews': Star,
      'faq-management': HelpCircle,
      'pricing-management': DollarSign,
      'cta-management': Target,
      'homepage-customization': Home,
      'footer-management': Link2,
      'leads': Database,
      'contact-management': Mail,
      'newsletter-email-management': Mail,
      'email-workflow': Mail,
      'clientele-management': Users,
      'partners-management': Users,
      'form-security': Shield,
      'security-settings': Shield,
      'service-header-images': Image,
      'website-integrations': Zap,
      'integration-status': Zap,
      'policy-pages': Scale,
      'logo-management': Palette,
      'website-settings': Cog,
    };
    return iconMap[tabId] || Settings;
  };

  const getTabTitle = (tabId: string) => {
    const titleMap: { [key: string]: string } = {
      'services': 'Services Management',
      'service-pages': 'Service Pages Management',
      'about-content': 'About Page Content',
      'seo-management': 'SEO Management',
      'blog-management': 'Blog Management',
      'reviews': 'Reviews Management',
      'faq-management': 'FAQ Management',
      'pricing-management': 'Pricing Management',
      'cta-management': 'CTA Management',
      'homepage-customization': 'Homepage Customization',
      'footer-management': 'Footer Management',
      'leads': 'Lead Management',
      'contact-management': 'Contact Management',
      'newsletter-email-management': 'Newsletter Email Management',
      'email-workflow': 'Email Workflow',
      'marketing-email-dashboard': 'Marketing Email Dashboard',
      'clientele-management': 'Clientele Management',
      'partners-management': 'Partners Management',
      'form-security': 'Form Security Monitor',
      'security-settings': 'Security Settings',
      'service-header-images': 'Service Images',
      'website-integrations': 'Website Integrations',
      'integration-status': 'Integration Status',
      'policy-pages': 'Policy Pages Management',
      'logo-management': 'Logo Management',
      'website-settings': 'Website Settings',
    };
    return titleMap[tabId] || 'Dashboard';
  };

  const getTabDescription = (tabId: string) => {
    const descriptionMap: { [key: string]: string } = {
      'services': 'Add, edit, and organize your service offerings',
      'service-pages': 'Manage service pages with real-time data editor for stats, case studies, and reviews',
      'about-content': 'Customize and manage content sections for your About page',
      'seo-management': 'Configure SEO settings, meta tags, and structured data for all pages',
      'blog-management': 'Create and manage blog posts and articles',
      'reviews': 'Manage customer reviews and testimonials',
      'faq-management': 'Create and organize frequently asked questions',
      'pricing-management': 'Configure pricing plans and packages',
      'cta-management': 'Configure call-to-action sections and buttons',
      'homepage-customization': 'Customize homepage design and layout',
      'footer-management': 'Customize footer content and partner logos',
      'leads': 'View and manage customer leads and inquiries',
      'contact-management': 'Handle contact form submissions and messages',
      'newsletter-email-management': 'Manage newsletter email subscribers and campaigns',
      'email-workflow': 'Set up automated email sequences and campaigns',
      'marketing-email-dashboard': 'Create and send marketing campaigns with multi-source email integration',
      'clientele-management': 'Manage client logos and testimonials',
      'partners-management': 'Manage partner logos and testimonials',
      'form-security': 'Monitor form security and spam protection',
      'security-settings': 'Configure security features and reCAPTCHA',
      'service-header-images': 'Upload and manage service page header images',
      'website-integrations': 'Manage third-party integrations and APIs',
      'integration-status': 'Monitor integration health and status',
      'policy-pages': 'Manage Privacy Policy, Terms of Service, and Terms & Conditions content',
      'logo-management': 'Customize your brand logo and display settings across the website',
      'website-settings': 'Configure website title, favicon, contact details, and branding with real-time updates',
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
      case 'about-content':
        return <AboutContentManagement />;
      case 'seo-management':
        return <SEOManagement />;
      case 'blog-management':
        return <BlogManagement />;
      case 'reviews':
        return <ReviewsTab />;
      case 'faq-management':
        return <FAQManagementTab />;
      case 'pricing-management':
        return <PricingManagement />;
      case 'cta-management':
        return <CTAManagementTab />;
      case 'homepage-customization':
        return <HomepageCustomizationTab />;
      case 'footer-management':
        return <FooterManagementTab />;
      case 'leads':
        return <LeadManagementTab />;
      case 'contact-management':
        return <ContactManagement />;
      case 'newsletter-email-management':
        return <NewsletterEmailManagementTab />;
      case 'email-workflow':
        return <EmailWorkflowTab />;
      case 'clientele-management':
        return <ClienteleManagementTab />;
      case 'partners-management':
        return <PartnersManagementTab />;
      case 'form-security':
        return <FormSecurityTab />;
      case 'security-settings':
        return <SecuritySettingsTab />;
      case 'service-header-images':
        return <ServiceHeaderImagesTab />;
      case 'website-integrations':
        return <WebsiteIntegrationsTab />;
      case 'integration-status':
        return <IntegrationStatusTab />;
      case 'policy-pages':
        return <PolicyPagesTab />;
      case 'logo-management':
        return <LogoManagementTab />;
      case 'website-settings':
        return <WebsiteTab />;
      case 'marketing-email-dashboard':
        return <MarketingEmailDashboard />;
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
    <div className="min-h-screen bg-gray-50">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <ModernDashboardLayout
        title={getTabTitle(activeTab)}
        description={getTabDescription(activeTab)}
        icon={<TabIcon className="w-6 h-6" />}
        category="Management"
      >
        {renderTabContent()}
      </ModernDashboardLayout>
    </div>
  );
};

export default Dashboard;

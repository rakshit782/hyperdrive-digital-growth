
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useSelectedContent } from "@/hooks/useSelectedContent";

const AccountManagement = () => {
  const selectedContent = useSelectedContent('account-management');

  const pageConfig = {
    serviceType: 'account-management',
    heroTitle: 'Professional Account Management Services',
    heroSubtitle: 'Strategic Oversight & Growth Management',
    heroDescription: 'Get dedicated account management with strategic planning, performance optimization, and growth strategies tailored to your business goals.',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center',
    ctaText: 'Get Account Manager',
    services: [
      {
        title: 'Dedicated Account Manager',
        description: 'Personal account manager focused on your success',
        icon: '👤'
      },
      {
        title: 'Strategic Planning',
        description: 'Comprehensive strategy development and execution',
        icon: '📋'
      },
      {
        title: 'Performance Reviews',
        description: 'Regular performance analysis and optimization',
        icon: '📊'
      },
      {
        title: 'Growth Strategies',
        description: 'Custom growth plans for scaling your business',
        icon: '📈'
      }
    ],
    benefits: [
      'Personal dedicated manager',
      'Strategic growth planning',
      'Regular performance reviews',
      'Priority support access',
      'Custom optimization strategies'
    ],
    stats: [
      { label: 'Client Retention', value: '98%', description: 'Long-term partnerships' },
      { label: 'Account Growth', value: '250%', description: 'Average annual growth' },
      { label: 'Response Time', value: '<2hr', description: 'Average response time' },
      { label: 'Success Rate', value: '95%', description: 'Goal achievement rate' }
    ]
  };

  return (
    <>
      <Header />
      <ServicePageLayout 
        config={pageConfig}
        caseStudies={selectedContent.caseStudies}
        reviews={selectedContent.reviews}
      />
      <Footer />
    </>
  );
};

export default AccountManagement;


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useServiceData } from "@/hooks/useServiceData";

const AccountManagement = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('account-management');

  return (
    <>
      <Header />
      <ServicePageLayout 
        title="Professional Account Management Services"
        subtitle="Strategic Oversight & Growth Management"
        heroDescription="Get dedicated account management with strategic planning, performance optimization, and growth strategies tailored to your business goals."
        primaryButtonText="Get Account Manager"
        secondaryButtonText="View Case Studies"
        primaryButtonUrl="/contact"
        secondaryButtonUrl="/case-studies"
        stats={stats}
        caseStudies={caseStudies}
        reviews={reviews}
        loading={loading}
        services={[
          {
            title: 'Dedicated Account Manager',
            description: 'Personal account manager focused on your success',
            icon: 'User',
            gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
          },
          {
            title: 'Strategic Planning',
            description: 'Comprehensive strategy development and execution',
            icon: 'Target',
            gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
          },
          {
            title: 'Performance Reviews',
            description: 'Regular performance analysis and optimization',
            icon: 'BarChart3',
            gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
          },
          {
            title: 'Growth Strategies',
            description: 'Custom growth plans for scaling your business',
            icon: 'TrendingUp',
            gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
          }
        ]}
        benefits={[
          {
            title: 'Personal Dedicated Manager',
            description: 'Get a dedicated account manager who knows your business inside and out',
            icon: 'User',
            color: 'bg-blue-500'
          },
          {
            title: 'Strategic Growth Planning',
            description: 'Comprehensive growth strategies tailored to your specific goals',
            icon: 'Target',
            color: 'bg-green-500'
          },
          {
            title: 'Regular Performance Reviews',
            description: 'Monthly performance reviews and optimization recommendations',
            icon: 'BarChart3',
            color: 'bg-purple-500'
          },
          {
            title: 'Priority Support Access',
            description: '24/7 priority support with guaranteed response times',
            icon: 'Clock',
            color: 'bg-orange-500'
          },
          {
            title: 'Custom Optimization Strategies',
            description: 'Personalized optimization strategies for maximum ROI',
            icon: 'Settings',
            color: 'bg-cyan-500'
          }
        ]}
        ctaTitle="Ready to Scale Your Business?"
        ctaDescription="Get a dedicated account manager and start seeing real results within 30 days."
        ctaButtonText="Get Started Today"
        ctaButtonUrl="/contact"
      />
      <Footer />
    </>
  );
};

export default AccountManagement;

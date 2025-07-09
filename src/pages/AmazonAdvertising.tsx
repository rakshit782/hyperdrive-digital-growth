
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useServiceData } from "@/hooks/useServiceData";
import { useServiceHeaderImages } from "@/hooks/useServiceHeaderImages";

const AmazonAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('amazon-advertising');
  const { imageUrl, altText } = useServiceHeaderImages('amazon-advertising');

  const services = [
    {
      title: 'Sponsored Products',
      description: 'Target customers actively searching for your products',
      icon: 'ShoppingCart',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      title: 'Sponsored Brands',
      description: 'Increase brand awareness with headline search ads',
      icon: 'Award',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Sponsored Display',
      description: 'Retarget customers with display advertising',
      icon: 'Monitor',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      title: 'DSP Campaigns',
      description: 'Programmatic advertising for maximum reach',
      icon: 'Target',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    }
  ];

  const benefits = [
    {
      title: 'Increased Sales Velocity',
      description: 'Boost your product rankings and sales with targeted advertising campaigns that convert.',
      icon: 'TrendingUp',
      color: 'bg-orange-500'
    },
    {
      title: 'Enhanced Brand Visibility',
      description: 'Get your products seen by millions of Amazon shoppers actively looking to buy.',
      icon: 'Eye',
      color: 'bg-blue-500'
    },
    {
      title: 'Optimized ACOS',
      description: 'Maximize your return on ad spend with data-driven optimization strategies.',
      icon: 'Target',
      color: 'bg-green-500'
    },
    {
      title: 'Competitive Advantage',
      description: 'Stay ahead of competitors with advanced bidding and targeting strategies.',
      icon: 'Zap',
      color: 'bg-purple-500'
    }
  ];

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Amazon Advertising Services - Boost Your Sales on Amazon"
          description="Professional Amazon PPC management services. Increase sales, improve rankings, and dominate your competition with our proven Amazon advertising strategies."
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <Header />
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Amazon Advertising Services - Boost Your Sales on Amazon"
        description="Professional Amazon PPC management services. Increase sales, improve rankings, and dominate your competition with our proven Amazon advertising strategies."
      />
      <Header />
      <ServicePageLayout
        title="Amazon Advertising Services"
        subtitle="Boost Your Sales & Dominate Your Competition"
        heroDescription="Professional Amazon PPC management services to increase sales, improve rankings, and maximize your ROI with proven advertising strategies."
        primaryButtonText="Get Free Amazon Audit"
        secondaryButtonText="View Case Studies"
        primaryButtonUrl="/free-audit"
        secondaryButtonUrl="/case-studies"
        stats={stats}
        caseStudies={caseStudies}
        reviews={reviews}
        services={services}
        benefits={benefits}
        ctaTitle="Ready to Dominate Amazon?"
        ctaDescription="Get a free Amazon advertising audit and discover how we can boost your sales and rankings."
        ctaButtonText="Get Free Audit"
        ctaButtonUrl="/free-audit"
        loading={loading}
      />
      <Footer />
    </>
  );
};

export default AmazonAdvertising;

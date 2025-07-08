
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServicePageLayout from "@/components/ServicePageLayout";
import { useServiceData } from "@/hooks/useServiceData";
import { useServiceHeaderImages } from "@/hooks/useServiceHeaderImages";

const MetaAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('meta-advertising');
  const { imageUrl, altText } = useServiceHeaderImages('meta-advertising');

  const services = [
    {
      title: 'Facebook Ads',
      description: 'Targeted advertising campaigns on the world\'s largest social network',
      icon: 'Users',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      title: 'Instagram Ads',
      description: 'Visual storytelling through engaging Instagram advertising campaigns',
      icon: 'Heart',
      gradient: 'bg-gradient-to-r from-pink-500 to-purple-500'
    },
    {
      title: 'Audience Development',
      description: 'Build and optimize custom audiences for maximum campaign effectiveness',
      icon: 'Target',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      title: 'Creative Strategy',
      description: 'Compelling ad creatives that capture attention and drive conversions',
      icon: 'Share2',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  const benefits = [
    {
      title: 'Massive Reach',
      description: 'Access to over 3 billion active users across Facebook and Instagram platforms.',
      icon: 'Users',
      color: 'bg-blue-500'
    },
    {
      title: 'Precise Targeting',
      description: 'Advanced targeting options to reach your ideal customers with laser precision.',
      icon: 'Target',
      color: 'bg-green-500'
    },
    {
      title: 'Visual Storytelling',
      description: 'Engage audiences with compelling visual content that drives action.',
      icon: 'Eye',
      color: 'bg-purple-500'
    },
    {
      title: 'Real-time Optimization',
      description: 'Continuous campaign optimization for maximum ROI and performance.',
      icon: 'Zap',
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Meta Advertising Services - Facebook & Instagram Ads Management"
          description="Professional Meta advertising services for Facebook and Instagram. Drive engagement, increase conversions, and grow your business with targeted social media advertising."
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <Header />
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Meta Advertising Services - Facebook & Instagram Ads Management"
        description="Professional Meta advertising services for Facebook and Instagram. Drive engagement, increase conversions, and grow your business with targeted social media advertising."
      />
      <Header />
      <ServicePageLayout
        title="Meta Advertising Services"
        subtitle="Facebook & Instagram Ads Management"
        heroDescription="Drive engagement, increase conversions, and grow your business with targeted social media advertising on Facebook and Instagram."
        primaryButtonText="Get Free Meta Audit"
        secondaryButtonText="View Case Studies"
        primaryButtonUrl="/free-audit"
        secondaryButtonUrl="/case-studies"
        stats={stats}
        caseStudies={caseStudies}
        reviews={reviews}
        services={services}
        benefits={benefits}
        ctaTitle="Ready to Scale Your Social Media Advertising?"
        ctaDescription="Get a free Meta advertising audit and discover how we can help you reach more customers and drive more conversions."
        ctaButtonText="Get Free Meta Audit"
        ctaButtonUrl="/free-audit"
        loading={loading}
      />
      <Footer />
    </>
  );
};

export default MetaAdvertising;

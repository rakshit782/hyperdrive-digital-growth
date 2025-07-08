
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
      
      {/* Hero Section with Custom Image */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full border border-orange-200/50 mb-6">
                  <span className="text-sm font-medium text-orange-700">Amazon PPC Experts</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                  Amazon Advertising Services
                </h1>
                <h2 className="text-xl md:text-2xl text-slate-700 font-medium mb-4">
                  Boost Your Sales & Dominate Your Competition
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Professional Amazon PPC management services to increase sales, improve rankings, and maximize your ROI with proven advertising strategies.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    Get Free Amazon Audit
                    <span className="ml-2">→</span>
                  </button>
                  
                  <button 
                    className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = '/case-studies'}
                  >
                    View Case Studies
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1523474438810-b04a6f72e20f?w=600&h=400&fit=crop&crop=center"}
                  alt={altText || "Amazon Advertising Services"}
                  className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
                />
                <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📈</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">300% ROAS</div>
                      <div className="text-sm text-slate-600">Average Client Results</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServicePageLayout
          title="Amazon Advertising"
          subtitle="Professional Amazon PPC Management"
          heroDescription="Increase sales, improve rankings, and maximize ROI with our proven Amazon advertising strategies."
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
      </div>
      <Footer />
    </>
  );
};

export default AmazonAdvertising;

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceStatsGrid from "@/components/ServiceStatsGrid";
import ServiceCTA from "@/components/ServiceCTA";
import CaseStudyPopup from "@/components/CaseStudyPopup";
import { useServicePageConfig } from '@/hooks/useServicePageConfig';
import { useServiceData } from '@/hooks/useServiceData';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, TrendingUp, Target, BarChart3, ArrowUpRight, Star } from 'lucide-react';
import { useServiceHeaderImages } from '@/hooks/useServiceHeaderImages';

const WalmartAdvertising = () => {
  const { configs, loading: configLoading } = useServicePageConfig();
  const { stats, caseStudies, reviews, loading: dataLoading } = useServiceData('walmart-advertising');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const { imageUrl, altText } = useServiceHeaderImages('walmart-advertising');

  const config = configs['walmart-advertising'] || configs['walmart'] || {
    title: 'Walmart Advertising Management',
    subtitle: 'Expert Walmart Connect & Marketplace Optimization',
    heroDescription: 'Dominate Walmart with strategic advertising campaigns and marketplace optimization. We help brands achieve exceptional ROI through expert Walmart Connect management and marketplace strategies.',
    primaryButtonText: 'Get Free Walmart Audit',
    secondaryButtonText: 'View Success Stories',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    ctaTitle: 'Ready to Dominate Walmart?',
    ctaDescription: 'Get your free Walmart advertising audit and discover how we can maximize your marketplace ROI.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/free-audit'
  };

  const features = [
    {
      icon: ShoppingCart,
      title: 'Walmart PPC Management',
      description: 'Strategic campaign optimization for maximum visibility and sales growth.',
      gradient: 'bg-agency-primary'
    },
    {
      icon: TrendingUp,
      title: 'Listing Optimization',
      description: 'Enhanced product listings that convert browsers into buyers.',
      gradient: 'bg-agency-secondary'
    },
    {
      icon: Target,
      title: 'Keyword Research',
      description: 'Advanced keyword targeting to reach your ideal customers.',
      gradient: 'bg-agency-accent'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Detailed reporting and insights to optimize your campaigns.',
      gradient: 'bg-agency-primary'
    }
  ];

  const handleCaseStudyClick = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCaseStudy(null);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const loading = configLoading || dataLoading;

  const walmartReviews = [
    {
      id: "walmart-review-1",
      client_name: "Jennifer Martinez",
      company: "HomeStyle Plus",
      rating: 5,
      review_text: "Outstanding Walmart Connect advertising strategy that delivered exceptional results. Our sales growth and category positioning exceeded all expectations.",
      results_achieved: "280% sales growth, 160% CTR increase"
    },
    {
      id: "walmart-review-2",
      client_name: "David Chen",
      company: "TechSmart Pro",
      rating: 5,
      review_text: "Professional Walmart advertising management that established our market leadership. The strategic optimization and inventory management were game-changing.",
      results_achieved: "350% revenue growth, 4.8x ROAS"
    },
    {
      id: "walmart-review-3",
      client_name: "Sarah Thompson",
      company: "Urban Trends",  
      rating: 5,
      review_text: "Incredible seasonal campaign strategies that maximized our fashion brand performance. The trend-based targeting delivered outstanding seasonal revenue.",
      results_achieved: "420% seasonal revenue, 180% brand recognition"
    },
    {
      id: "walmart-review-4",
      client_name: "Michael Rodriguez",
      company: "Wellness Essentials",
      rating: 5,
      review_text: "Expert Walmart advertising that achieved category leadership in health & beauty. The comprehensive brand strategy and customer acquisition were exceptional.",
      results_achieved: "#1 category ranking, 310% customer acquisition"
    },
    {
      id: "walmart-review-5",
      client_name: "Amanda Foster",
      company: "Elite Athletic",
      rating: 5,
      review_text: "Strategic multi-category expansion that drove massive growth across sports segments. The targeted campaigns delivered incredible market expansion.",
      results_achieved: "380% market expansion, 250% cross-category growth"  
    },
    {
      id: "walmart-review-6",
      client_name: "Robert Kim",
      company: "Culinary Masters",
      rating: 5,
      review_text: "Outstanding product bundling and cross-selling campaigns that transformed our kitchen brand performance and customer engagement levels.",
      results_achieved: "460% bundle sales, 195% cross-sell rate"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Walmart Advertising Management - Expert Walmart Connect Services"
        description="Professional Walmart advertising management services. Dominate the marketplace with our proven advertising strategies and listing optimization expertise."
      />
      <Header />
      
      <div className="space-y-32">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-agency-gradient-light relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-standard relative px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center px-6 py-3 bg-agency-neutral text-agency-primary rounded-full text-sm font-medium font-body border border-agency-primary/20">
                    🛒 Walmart Connect Certified
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-agency-dark mb-8 leading-tight">
                  {config.title}
                </h1>
                <p className="text-xl text-minimal leading-relaxed mb-10 max-w-xl font-body">
                  {config.heroDescription}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <Button 
                    size="lg" 
                    className="bg-agency-gradient text-white px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = config.primaryButtonUrl}
                  >
                    {config.primaryButtonText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-agency-primary bg-white/80 backdrop-blur-sm hover:bg-white text-agency-dark px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = config.secondaryButtonUrl}
                  >
                    {config.secondaryButtonText}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/60">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-agency-dark">350%</div>
                    <div className="text-sm text-minimal font-body mt-1">Avg ROI Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-agency-dark">9.0+</div>
                    <div className="text-sm text-minimal font-body mt-1">Listing Quality Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-agency-dark">55%</div>
                    <div className="text-sm text-minimal font-body mt-1">Conversion Boost</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-agency-gradient rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"}
                  alt={altText || "Walmart Store and Shopping Experience"}
                  className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container-standard">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-agency-dark mb-6">
                Master Walmart Advertising
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Dominate the Walmart marketplace and drive qualified traffic with our comprehensive advertising management services.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100">
                    <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-agency-dark mb-4">{feature.title}</h3>
                    <p className="text-minimal leading-relaxed font-body">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-agency-gradient-light">
          <div className="container-standard">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-agency-dark mb-6">
                Walmart Ads Success Stories
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                See how our Walmart Ads expertise has driven exceptional results across diverse industries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <div 
                  key={study.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  onClick={() => handleCaseStudyClick(study)}
                >
                  <div className="h-48 bg-agency-gradient relative overflow-hidden">
                    <img 
                      src={study.image_url} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-agency-neutral text-agency-primary rounded-full text-xs font-medium">
                        {study.industry}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {study.client_name}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                      {study.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {study.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {Object.entries(study.results).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-agency-primary">{value}</div>
                          <div className="text-xs text-slate-500">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-agency-gradient text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm"
                    >
                      View Full Case Study
                      <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 bg-white">
          <div className="container-standard">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-agency-dark mb-6">
                What Our Walmart Clients Say
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Discover how businesses have achieved remarkable growth with our Walmart advertising expertise.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {walmartReviews.map((review) => (
                <div key={review.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-agency-gradient rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold text-lg">
                        {review.client_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{review.client_name}</h4>
                      <p className="text-slate-600 text-sm">{review.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed mb-4 text-sm">
                    "{review.review_text}"
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm font-medium">
                      Results: {review.results_achieved}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <ServiceStatsGrid stats={stats} serviceType="Walmart Advertising" />

        {/* CTA Section */}
        <ServiceCTA 
          title={config.ctaTitle}
          description={config.ctaDescription}
          buttonText={config.ctaButtonText}
          serviceType="Walmart Advertising"
        />
      </div>

      <CaseStudyPopup 
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />

      <Footer />
    </>
  );
};

export default WalmartAdvertising;

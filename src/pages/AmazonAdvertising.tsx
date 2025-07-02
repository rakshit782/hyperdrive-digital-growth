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
import { ArrowRight, Package, TrendingUp, Target, BarChart3, ArrowUpRight, Star } from 'lucide-react';
import { useServiceHeaderImages } from '@/hooks/useServiceHeaderImages';

const AmazonAdvertising = () => {
  const { configs, loading: configLoading } = useServicePageConfig();
  const { stats, caseStudies, reviews, loading: dataLoading } = useServiceData('amazon-advertising');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const { imageUrl, altText } = useServiceHeaderImages('amazon-advertising');

  const config = configs['amazon-advertising'] || configs['amazon'] || {
    title: 'Amazon Advertising Management',
    subtitle: 'Expert Amazon PPC & Marketplace Optimization',
    heroDescription: 'Dominate Amazon with strategic advertising campaigns and marketplace optimization. We help brands achieve exceptional ROI through expert Amazon PPC management and listing optimization.',
    primaryButtonText: 'Get Free Amazon Audit',
    secondaryButtonText: 'View Success Stories',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    ctaTitle: 'Ready to Dominate Amazon?',
    ctaDescription: 'Get your free Amazon advertising audit and discover how we can maximize your marketplace ROI.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/free-audit'
  };

  const features = [
    {
      icon: Package,
      title: 'Amazon PPC Management',
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

  const amazonReviews = [
    {
      id: "amazon-review-1",
      client_name: "Sarah Johnson",
      company: "TechGear Pro",
      rating: 5,
      review_text: "Outstanding Amazon PPC management that transformed our product visibility and sales performance. The keyword optimization and bid management exceeded all expectations.",
      results_achieved: "340% sales increase, 5.2x ROAS"
    },
    {
      id: "amazon-review-2",
      client_name: "Michael Chen",
      company: "HomeStyle Solutions",
      rating: 5,
      review_text: "Professional Amazon advertising strategy that established our brand as a category leader. The listing optimization and sponsored ad campaigns delivered incredible growth.",
      results_achieved: "280% revenue growth, #1 BSR ranking"
    },
    {
      id: "amazon-review-3",
      client_name: "Lisa Rodriguez",
      company: "FitLife Essentials",  
      rating: 5,
      review_text: "Exceptional Amazon marketplace expertise that maximized our health & wellness brand performance. The strategic campaign management was game-changing.",
      results_achieved: "450% organic sales boost, 180% conversion rate"
    },
    {
      id: "amazon-review-4",
      client_name: "David Thompson",
      company: "Urban Tech",
      rating: 5,
      review_text: "Expert Amazon advertising that achieved remarkable market penetration in competitive electronics category. The data-driven approach delivered outstanding results.",
      results_achieved: "390% market share growth, 220% profit increase"
    },
    {
      id: "amazon-review-5",
      client_name: "Jennifer Foster",
      company: "Beauty Bliss Co",
      rating: 5,
      review_text: "Strategic Amazon campaign management that transformed our beauty brand presence and customer acquisition across multiple product lines.",
      results_achieved: "520% brand awareness, 165% customer lifetime value"  
    },
    {
      id: "amazon-review-6",
      client_name: "Robert Kim",
      company: "Outdoor Adventures",
      rating: 5,
      review_text: "Outstanding seasonal campaign optimization that maximized our outdoor gear performance during peak seasons and maintained year-round growth.",
      results_achieved: "380% seasonal revenue, 195% inventory turnover"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Amazon Advertising Management - Expert Amazon PPC Services"
        description="Professional Amazon advertising management services. Dominate the marketplace with our proven PPC strategies and listing optimization expertise."
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
                    📦 Amazon PPC Certified
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
                    <div className="text-3xl font-bold font-heading text-agency-dark">420%</div>
                    <div className="text-sm text-minimal font-body mt-1">Avg ROI Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-agency-dark">8.5+</div>
                    <div className="text-sm text-minimal font-body mt-1">Quality Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-agency-dark">65%</div>
                    <div className="text-sm text-minimal font-body mt-1">Conversion Boost</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-agency-gradient rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1523474438810-b04a6f72e20f?w=600&h=400&fit=crop&crop=center"}
                  alt={altText || "Amazon Packages and Logistics"}
                  className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container-standard px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-agency-dark mb-6">
                Master Amazon Advertising
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Dominate the Amazon marketplace and drive qualified traffic with our comprehensive PPC management services.
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
          <div className="container-standard px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-agency-dark mb-6">
                Amazon PPC Success Stories
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                See how our Amazon PPC expertise has driven exceptional results across diverse industries.
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
          <div className="container-standard px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-agency-dark mb-6">
                What Our Amazon Clients Say
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Discover how businesses have achieved remarkable growth with our Amazon advertising expertise.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amazonReviews.map((review) => (
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
        <ServiceStatsGrid stats={stats} serviceType="Amazon Advertising" />

        {/* CTA Section */}
        <ServiceCTA 
          title={config.ctaTitle}
          description={config.ctaDescription}
          buttonText={config.ctaButtonText}
          serviceType="Amazon Advertising"
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

export default AmazonAdvertising;

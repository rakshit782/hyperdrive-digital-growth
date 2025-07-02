import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceStatsGrid from "@/components/ServiceStatsGrid";
import ServiceReviewsGrid from "@/components/ServiceReviewsGrid";
import ServiceCTA from "@/components/ServiceCTA";
import CaseStudyPopup from "@/components/CaseStudyPopup";
import { useServicePageConfig } from '@/hooks/useServicePageConfig';
import { useServiceData } from '@/hooks/useServiceData';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, TrendingUp, Target, BarChart3, ArrowUpRight, Star } from 'lucide-react';

const AmazonAdvertising = () => {
  const { configs, loading: configLoading } = useServicePageConfig();
  const { stats, caseStudies, reviews, loading: dataLoading } = useServiceData('amazon-advertising');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const config = configs['amazon-advertising'] || configs['amazon'] || {
    title: 'Amazon Advertising Management',
    subtitle: 'Expert Amazon PPC & Marketplace Optimization',
    heroDescription: 'Dominate Amazon with strategic PPC campaigns and listing optimization. We help brands achieve exceptional ROI through expert Amazon advertising management and marketplace strategies.',
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
      icon: ShoppingCart,
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

  const amazonCaseStudies = [
    {
      id: "amazon-case-1",
      title: "Fashion Brand Scales to $2M Revenue",
      description: "Strategic PPC campaigns and listing optimization that increased Amazon sales by 400% in 6 months through advanced keyword targeting and bid optimization strategies.",
      industry: "Fashion & Apparel",
      client_name: "StyleHub Fashion",
      results: {
        "Revenue Increase": "400%",
        "ROAS Improvement": "5.2x",
        "Market Share Growth": "25%"
      },
      image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      service_type: "amazon"
    },
    {
      id: "amazon-case-2",
      title: "Electronics Brand Dominates Search",
      description: "Comprehensive keyword strategy and campaign restructuring that resulted in 300% sales growth and category leadership position.",
      industry: "Electronics",
      client_name: "TechGear Pro",
      results: {
        "Sales Growth": "300%",
        "Search Ranking": "#1 Position",
        "Market Share": "+45%"
      },
      image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      service_type: "amazon"
    },
    {
      id: "amazon-case-3",
      title: "Beauty Brand Market Leadership",
      description: "Brand-focused campaign strategy with sponsored brand ads that established market dominance and drove exceptional brand awareness.",
      industry: "Beauty & Cosmetics",
      client_name: "Pure Beauty",
      results: {
        "Brand Awareness": "+380%",
        "Sales Growth": "+250%",
        "Customer Acquisition": "+190%"
      },
      image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      service_type: "amazon"
    },
    {
      id: "amazon-case-4",
      title: "Sports Equipment Market Expansion",
      description: "Multi-category expansion strategy with targeted campaigns that drove massive growth across sports and recreation segments.",
      industry: "Sports & Recreation",
      client_name: "Elite Athletic",
      results: {
        "Market Expansion": "+380%",
        "Cross-Category Growth": "+250%",
        "Customer Lifetime Value": "+140%"
      },
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      service_type: "amazon"
    },
    {
      id: "amazon-case-5",
      title: "Kitchen Appliance Revenue Breakthrough",
      description: "Dynamic campaign scheduling and inventory-based bidding that transformed kitchen brand performance and customer engagement.",
      industry: "Kitchen & Home",
      client_name: "Chef's Choice Pro",
      results: {
        "Revenue Growth": "+365%",
        "Inventory Turnover": "+180%",
        "Profit Margin": "+90%"
      },
      image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      service_type: "amazon"
    },
    {
      id: "amazon-case-6",
      title: "Pet Supplies Category Domination",
      description: "Campaign consolidation and automated bidding implementation that established category leadership and drove exceptional growth.",
      industry: "Pet Supplies",
      client_name: "Happy Pets Co",
      results: {
        "Category Ranking": "#1 Position",
        "Sales Growth": "+430%",
        "Customer Retention": "+200%"
      },
      image_url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
      service_type: "amazon"
    }
  ];

  const amazonReviews = [
    {
      id: "amazon-review-1",
      client_name: "Sarah Mitchell",
      company: "StyleHub Fashion",
      rating: 5,
      review_text: "Incredible Amazon advertising management that transformed our business. Sales increased 400% in just 6 months with their strategic approach to PPC and listing optimization.",
      results_achieved: "400% sales increase, 5.2x ROAS improvement"
    },
    {
      id: "amazon-review-2", 
      client_name: "Michael Chen",
      company: "TechGear Pro",
      rating: 5,
      review_text: "Outstanding Amazon expertise that helped us dominate our category. The keyword strategy and campaign restructuring delivered exceptional results beyond our expectations.",
      results_achieved: "300% sales growth, #1 category ranking"
    },
    {
      id: "amazon-review-3",
      client_name: "Jessica Rodriguez",
      company: "Pure Beauty",
      rating: 5,
      review_text: "Professional team with deep Amazon knowledge. Our brand awareness and sales grew dramatically through their sponsored brand campaigns and strategic targeting.",
      results_achieved: "380% brand awareness increase, 250% sales growth"
    },
    {
      id: "amazon-review-4",
      client_name: "David Thompson",
      company: "Elite Athletic",
      rating: 5,
      review_text: "Exceptional Amazon advertising services that expanded our market reach across multiple categories. The multi-category strategy delivered outstanding growth.",
      results_achieved: "380% market expansion, 250% cross-category growth"
    },
    {
      id: "amazon-review-5",
      client_name: "Amanda Foster",
      company: "Chef's Choice Pro",
      rating: 5,
      review_text: "Strategic Amazon management that transformed our kitchen brand performance. Dynamic bidding and inventory optimization drove incredible revenue growth.",
      results_achieved: "365% revenue growth, 180% inventory turnover"
    },
    {
      id: "amazon-review-6",
      client_name: "Robert Kim",
      company: "Happy Pets Co",
      rating: 5,
      review_text: "Top-tier Amazon advertising that established our category leadership. Campaign consolidation and automated bidding delivered exceptional results.",
      results_achieved: "#1 category position, 430% sales growth"
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
          <div className="container-standard relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center px-6 py-3 bg-agency-neutral text-agency-primary rounded-full text-sm font-medium font-body border border-agency-primary/20">
                    🚀 Amazon Ads Certified
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
                    <div className="text-3xl font-bold font-heading text-agency-dark">450%</div>
                    <div className="text-sm text-minimal font-body mt-1">Avg ROI Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-agency-dark">9.0+</div>
                    <div className="text-sm text-minimal font-body mt-1">Listing Quality Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-agency-dark">70%</div>
                    <div className="text-sm text-minimal font-body mt-1">Conversion Boost</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-agency-gradient rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
                  alt="Amazon Advertising Management"
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
                Master Amazon Advertising
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Dominate the marketplace and drive sales with our comprehensive Amazon advertising management services.
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
                Amazon Ads Success Stories
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                See how our Amazon Ads expertise has driven exceptional results across diverse industries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amazonCaseStudies.map((study, index) => (
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
                What Our Amazon Clients Say
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Hear from businesses that have transformed their Amazon presence with our expert advertising management.
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

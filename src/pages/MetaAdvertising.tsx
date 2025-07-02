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
import { ArrowRight, Users, MessageSquare, LayoutDashboard, BarChart3, ArrowUpRight, Star } from 'lucide-react';

const MetaAdvertising = () => {
  const { configs, loading: configLoading } = useServicePageConfig();
  const { stats, caseStudies, reviews, loading: dataLoading } = useServiceData('meta-advertising');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const config = configs['meta-advertising'] || configs['meta'] || {
    title: 'Meta Advertising Management',
    subtitle: 'Expert Facebook & Instagram Ads Services',
    heroDescription: 'Drive community engagement and conversions with strategic Meta Ads campaigns. We help businesses achieve exceptional ROI through expert social media advertising and community building strategies.',
    primaryButtonText: 'Get Free Meta Audit',
    secondaryButtonText: 'View Success Stories',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    ctaTitle: 'Ready to Dominate Social Media?',
    ctaDescription: 'Get your free Meta advertising audit and discover how we can maximize your social media ROI.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/free-audit'
  };

  const features = [
    {
      icon: Users,
      title: 'Audience Targeting',
      description: 'Advanced audience segmentation to reach your ideal customers.',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      icon: MessageSquare,
      title: 'Community Building',
      description: 'Strategies to build a loyal and engaged community around your brand.',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      icon: LayoutDashboard,
      title: 'Campaign Optimization',
      description: 'Continuous optimization to improve ad performance and ROI.',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Detailed reporting and insights to track and improve your results.',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ];

  const metaCaseStudies = [
    {
      id: "meta-case-1",
      title: "E-commerce Fashion Brand Scaling",
      description: "Advanced audience segmentation with lookalike campaigns and retargeting funnels that transformed customer acquisition costs and drove massive growth.",
      industry: "Fashion & E-commerce",
      client_name: "Trendy Threads",
      results: {
        "ROAS Increase": "520%",
        "Sales Growth": "$2.1M",
        "Cost Per Acquisition": "-65%",
        "Customer Lifetime Value": "+140%"
      },
      image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      service_type: "meta"
    },
    {
      id: "meta-case-2",
      title: "SaaS Company Lead Generation",
      description: "B2B targeting with video campaigns and lead form optimization that revolutionized lead quality and conversion rates for enterprise software.",
      industry: "SaaS Technology",
      client_name: "CloudTech Solutions",
      results: {
        "Lead Quality": "+450%",
        "Conversion Rate": "+280%",
        "Sales Pipeline": "$1.8M",
        "Cost Per Lead": "-70%"
      },
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      service_type: "meta"
    },
    {
      id: "meta-case-3",
      title: "Local Restaurant Chain Growth",
      description: "Location-based targeting with dynamic product ads and event promotion that drove foot traffic and online orders across multiple locations.",
      industry: "Food & Hospitality",
      client_name: "Gourmet Bites",
      results: {
        "Foot Traffic": "+380%",
        "Online Orders": "+250%",
        "Brand Awareness": "+190%",
        "Customer Engagement": "+220%"
      },
      image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      service_type: "meta"
    },
    {
      id: "meta-case-4",
      title: "Fitness Brand Community Building",
      description: "Community-focused campaigns with user-generated content and influencer partnerships that built a loyal fitness community and drove sales.",
      industry: "Health & Fitness",
      client_name: "FitLife Pro",
      results: {
        "Community Growth": "+410%",
        "Engagement Rate": "+290%",
        "Subscription Sales": "$1.3M",
        "Customer Retention": "+95%"
      },
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      service_type: "meta"
    },
    {
      id: "meta-case-5",
      title: "Beauty Brand Influencer Success",
      description: "Micro-influencer campaigns with authentic content and social proof that broke through market saturation and established brand authority.",
      industry: "Beauty & Cosmetics",
      client_name: "Radiant Beauty",
      results: {
        "Influencer ROI": "+480%",
        "Brand Mentions": "+350%",
        "Sales Growth": "$1.6M",
        "Social Proof": "+280%"
      },
      image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      service_type: "meta"
    },
    {
      id: "meta-case-6",
      title: "Home Services Lead Generation",
      description: "Geo-targeted campaigns with seasonal messaging and lead nurturing that solved seasonal business challenges and ensured consistent growth.",
      industry: "Home Services",
      client_name: "Elite Contractors",
      results: {
        "Lead Generation": "+350%",
        "Service Bookings": "+240%",
        "Customer Acquisition": "$780K",
        "Cost Per Lead": "-60%"
      },
      image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      service_type: "meta"
    }
  ];

  const metaReviews = [
    {
      id: "meta-review-1",
      client_name: "Jessica Chen",
      company: "Trendy Threads",
      rating: 5,
      review_text: "Exceptional Meta advertising with advanced audience segmentation that transformed our customer acquisition costs and drove massive e-commerce growth.",
      results_achieved: "520% ROAS increase, $2.1M sales growth"
    },
    {
      id: "meta-review-2",
      client_name: "David Martinez",
      company: "CloudTech Solutions",
      rating: 5,
      review_text: "Outstanding B2B targeting with video campaigns that revolutionized our lead quality and conversion rates. The results exceeded all expectations.",
      results_achieved: "450% lead quality improvement, $1.8M pipeline"
    },
    {
      id: "meta-review-3",
      client_name: "Sarah Rodriguez",
      company: "Gourmet Bites",
      rating: 5,
      review_text: "Strategic location-based targeting that drove incredible foot traffic and online orders across all our restaurant locations.",
      results_achieved: "380% foot traffic increase, 250% online orders"
    },
    {
      id: "meta-review-4",
      client_name: "Michael Thompson",
      company: "FitLife Pro",
      rating: 5,
      review_text: "Community-focused campaigns with user-generated content that built a loyal fitness community and drove exceptional subscription sales.",
      results_achieved: "410% community growth, $1.3M subscriptions"
    },
    {
      id: "meta-review-5",
      client_name: "Amanda Foster",
      company: "Radiant Beauty",
      review_text: "Incredible micro-influencer campaigns with authentic content that broke through market saturation and established our brand authority.",
      rating: 5,
      results_achieved: "480% influencer ROI, $1.6M sales growth"
    },
    {
      id: "meta-review-6",
      client_name: "Robert Kim",
      company: "Elite Contractors",
      rating: 5,
      review_text: "Expert geo-targeted campaigns with seasonal messaging that solved our seasonal challenges and ensured consistent business growth.",
      results_achieved: "350% lead generation, $780K customer acquisition"
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
        title="Meta Advertising Management - Expert Facebook & Instagram Ads Services"
        description="Professional Meta advertising management services. Drive community engagement and maximize ROI with our proven social media strategies."
      />
      <Header />
      
      <div className="space-y-32">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-standard relative px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-700 rounded-full text-sm font-medium font-body border border-blue-100">
                    📣 Social Media Experts
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-dark mb-8 leading-tight">
                  {config.title}
                </h1>
                <p className="text-xl text-minimal leading-relaxed mb-10 max-w-xl font-body">
                  {config.heroDescription}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = config.primaryButtonUrl}
                  >
                    {config.primaryButtonText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white text-dark px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = config.secondaryButtonUrl}
                  >
                    {config.secondaryButtonText}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/60">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">420%</div>
                    <div className="text-sm text-minimal font-body mt-1">Avg ROI Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">95%</div>
                    <div className="text-sm text-minimal font-body mt-1">Community Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">70%</div>
                    <div className="text-sm text-minimal font-body mt-1">Conversion Boost</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e4a0ee?w=600&h=400&fit=crop&crop=center"
                  alt="Meta Advertising Management"
                  className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container-standard px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
                Master Meta Advertising
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Drive community engagement and maximize ROI with our comprehensive Meta Ads management services.
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
                    <h3 className="text-xl font-heading font-semibold text-dark mb-4">{feature.title}</h3>
                    <p className="text-minimal leading-relaxed font-body">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container-standard px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
                Meta Ads Success Stories
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                See how our Meta Ads expertise has driven exceptional results across diverse industries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {metaCaseStudies.map((study, index) => (
                <div 
                  key={study.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  onClick={() => handleCaseStudyClick(study)}
                >
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden">
                    <img 
                      src={study.image_url} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
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
                          <div className="text-lg font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-slate-500">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm group-hover:from-blue-700 group-hover:to-purple-700"
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
          <div className="container-standard px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
                What Our Meta Clients Say
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                See how businesses have achieved exceptional growth with our Meta advertising expertise.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {metaReviews.map((review) => (
                <div key={review.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
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
        <ServiceStatsGrid stats={stats} serviceType="Meta Advertising" />

        {/* CTA Section */}
        <ServiceCTA 
          title={config.ctaTitle}
          description={config.ctaDescription}
          buttonText={config.ctaButtonText}
          serviceType="Meta Advertising"
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

export default MetaAdvertising;

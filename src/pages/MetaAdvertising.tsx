
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceStatsGrid from "@/components/ServiceStatsGrid";
import ServiceReviewsGrid from "@/components/ServiceReviewsGrid";
import ServiceCaseStudiesGrid from "@/components/ServiceCaseStudiesGrid";
import ServiceCTA from "@/components/ServiceCTA";
import CaseStudyPopup from "@/components/CaseStudyPopup";
import { useServiceData } from "@/hooks/useServiceData";
import { useServicePageConfig } from "@/hooks/useServicePageConfig";
import { useSelectedContent } from "@/hooks/useSelectedContent";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, BarChart3, Megaphone, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const MetaAdvertising = () => {
  const { stats } = useServiceData('meta');
  const { configs } = useServicePageConfig();
  const { caseStudies, reviews } = useSelectedContent('meta');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const config = configs.meta;

  const features = [
    {
      icon: Users,
      title: "Audience Mastery",
      description: "Advanced audience targeting and lookalike campaigns to reach your ideal customers on Facebook and Instagram."
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Laser-focused ad targeting using Meta's powerful demographic, interest, and behavioral data."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive tracking and optimization to maximize your Meta advertising ROI and conversions."
    },
    {
      icon: Megaphone,
      title: "Creative Excellence",
      description: "High-converting ad creatives and copy that resonate with your target audience and drive action."
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
        "Customer Lifetime Value": "+180%"
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
        "Demo Bookings": "+320%"
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
        "Customer Retention": "+85%"
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
        "Brand Loyalty": "+220%"
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
        "Social Engagement": "+290%"
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
        "Seasonal Stability": "+95%"
      },
      image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      service_type: "meta"
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

  return (
    <>
      <SEOHead 
        title="Meta Advertising Management - Facebook & Instagram Ads"
        description="Expert Meta advertising management for Facebook and Instagram. Drive brand awareness and sales with our proven social media strategies."
      />
      <Header />
      
      <div className="space-y-32">
        {/* Enhanced Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-standard relative px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    📱 Meta Advertising Specialists
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-6 leading-tight">
                  {config?.title || 'Scale Your Business with Meta Advertising'}
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                  {config?.heroDescription || 'Achieve 650% average ROAS with expert Facebook and Instagram advertising campaigns that convert prospects into loyal customers.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    {config?.primaryButtonText || 'Get Free Meta Audit'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = '/case-studies'}
                  >
                    {config?.secondaryButtonText || 'View Success Stories'}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">650%</div>
                    <div className="text-sm text-slate-600">Average ROAS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">-55%</div>
                    <div className="text-sm text-slate-600">Cost Per Lead</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">300%</div>
                    <div className="text-sm text-slate-600">Reach Increase</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop&crop=center"
                  alt="Meta Advertising Management"
                  className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container-standard px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Master Meta Advertising with Expert Strategy
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Leverage the power of Facebook and Instagram to reach billions of potential customers with precision targeting and compelling creatives.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="container-standard px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
                Meta Success Stories
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                See how strategic Facebook and Instagram campaigns have transformed businesses across industries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {metaCaseStudies.map((study, index) => (
                <div 
                  key={study.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  onClick={() => handleCaseStudyClick(study)}
                >
                  <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative overflow-hidden">
                    <img 
                      src={study.image_url} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
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
                          <div className="text-lg font-bold text-purple-600">{value}</div>
                          <div className="text-xs text-slate-500">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm group-hover:from-purple-700 group-hover:to-pink-700"
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

        {/* Stats Section */}
        <ServiceStatsGrid stats={stats} serviceType="Meta Advertising" />

        {/* Reviews Section */}
        <ServiceReviewsGrid reviews={reviews} />

        {/* CTA Section */}
        <ServiceCTA 
          title={config?.ctaTitle || 'Ready to Scale with Meta?'}
          description={config?.ctaDescription || 'Get your free Meta advertising audit and discover how we can 10x your social media ROI.'}
          buttonText={config?.ctaButtonText || 'Get Free Audit'}
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

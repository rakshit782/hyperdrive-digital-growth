
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
import { ArrowRight, TrendingUp, Target, Zap, Award, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const AmazonAdvertising = () => {
  const { stats } = useServiceData('amazon');
  const { configs } = useServicePageConfig();
  const { caseStudies, reviews } = useSelectedContent('amazon');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const config = configs.amazon;

  const features = [
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Advanced bid management and keyword optimization to maximize your Amazon advertising ROI."
    },
    {
      icon: Target,
      title: "Strategic Targeting",
      description: "Precision audience targeting across Sponsored Products, Brands, and Display campaigns."
    },
    {
      icon: Zap,
      title: "Campaign Automation",
      description: "Smart automation tools to scale your campaigns while maintaining optimal performance."
    },
    {
      icon: Award,
      title: "Brand Domination",
      description: "Complete brand protection and market domination strategies on Amazon marketplace."
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
        "Conversion Rate": "+180%",
        "Market Share Growth": "+25%"
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
        "Market Share": "+45%",
        "Click-Through Rate": "+220%"
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
        "ROAS": "4.8x",
        "Customer Acquisition": "+190%"
      },
      image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      service_type: "amazon"
    },
    {
      id: "amazon-case-4",
      title: "Home Decor 7-Figure Success",
      description: "Complete campaign restructure with strategic product targeting that scaled a home decor brand to seven-figure revenue.",
      industry: "Home & Garden",
      client_name: "Modern Living Co.",
      results: {
        "Revenue Growth": "$1.2M+",
        "ROAS Increase": "450%",
        "Profit Margin": "+65%",
        "Customer Lifetime Value": "+140%"
      },
      image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      service_type: "amazon"
    },
    {
      id: "amazon-case-5",
      title: "Sports Equipment Expansion",
      description: "Multi-format campaign strategy with video ads and seasonal optimization that drove massive market expansion.",
      industry: "Sports & Recreation",
      client_name: "Active Sports",
      results: {
        "Market Expansion": "+410%",
        "Video Ad Performance": "+320%",
        "Seasonal Revenue": "$1.5M",
        "Brand Recognition": "+280%"
      },
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      service_type: "amazon"
    },
    {
      id: "amazon-case-6",
      title: "Kitchen Appliance Growth Story",
      description: "Dynamic campaign scheduling and inventory-based bidding that solved seasonal fluctuations and maximized year-round performance.",
      industry: "Kitchen & Appliances",
      client_name: "Chef's Choice",
      results: {
        "Year-Round Growth": "+365%",
        "Inventory Turnover": "+180%",
        "Profit Optimization": "+140%",
        "Customer Satisfaction": "4.9/5"
      },
      image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      service_type: "amazon"
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
        title="Amazon Advertising Management - Expert Amazon PPC Services"
        description="Professional Amazon advertising management services. Increase sales, improve ROAS, and dominate Amazon search with our proven PPC strategies."
      />
      <Header />
      
      <div className="space-y-32">
        {/* Enhanced Hero Section with proper spacing */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-standard relative px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-up">
                <div className="mb-8">
                  <span className="inline-flex items-center px-6 py-3 bg-blue-50 text-primary rounded-full text-sm font-medium font-body border border-blue-100">
                    🚀 Amazon PPC Experts
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-dark mb-8 leading-tight">
                  {config?.title || 'Dominate Amazon with Expert PPC Management'}
                </h1>
                <p className="text-xl text-minimal leading-relaxed mb-10 max-w-xl font-body">
                  {config?.heroDescription || 'Transform your Amazon presence with data-driven advertising strategies that deliver 350% average sales growth and 4.2x ROAS.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <Button 
                    size="lg" 
                    className="bg-gradient-primary hover:shadow-lg text-white px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    {config?.primaryButtonText || 'Get Free Amazon Audit'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white text-dark px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = '/case-studies'}
                  >
                    {config?.secondaryButtonText || 'View Success Stories'}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/60">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">350%</div>
                    <div className="text-sm text-minimal font-body mt-1">Avg Sales Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">4.2x</div>
                    <div className="text-sm text-minimal font-body mt-1">Average ROAS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">98%</div>
                    <div className="text-sm text-minimal font-body mt-1">Client Satisfaction</div>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-slide-in-left">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center"
                  alt="Amazon Advertising Management"
                  className="relative w-full rounded-3xl shadow-2xl object-cover h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with Enhanced Typography */}
        <section className="py-20 bg-white">
          <div className="container-standard px-8">
            <div className="text-center mb-20 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
                Why Choose Our Amazon Advertising Services?
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                We combine cutting-edge technology with proven strategies to deliver exceptional results for your Amazon business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in bg-white border border-gray-100" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                Amazon Success Stories
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                See how we've helped Amazon sellers achieve extraordinary growth and dominate their markets.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amazonCaseStudies.map((study, index) => (
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

        {/* Stats Section */}
        <ServiceStatsGrid stats={stats} serviceType="Amazon Advertising" />

        {/* Reviews Section */}
        <ServiceReviewsGrid reviews={reviews} />

        {/* CTA Section */}
        <ServiceCTA 
          title={config?.ctaTitle || 'Ready to Dominate Amazon?'}
          description={config?.ctaDescription || 'Get your free Amazon advertising audit and discover how we can triple your sales in 90 days.'}
          buttonText={config?.ctaButtonText || 'Get Free Audit'}
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

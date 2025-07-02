
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
import { ArrowRight, ShoppingCart, TrendingUp, Star, Package, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const WalmartAdvertising = () => {
  const { stats } = useServiceData('walmart');
  const { configs } = useServicePageConfig();
  const { caseStudies, reviews } = useSelectedContent('walmart');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const config = configs.walmart;

  const features = [
    {
      icon: ShoppingCart,
      title: "Walmart Connect Mastery",
      description: "Expert management of Walmart's advertising platform to maximize your marketplace visibility and sales."
    },
    {
      icon: TrendingUp,
      title: "Revenue Acceleration",
      description: "Proven strategies that deliver 380% average revenue growth through optimized campaigns and bidding."
    },
    {
      icon: Star,
      title: "Brand Excellence",
      description: "Build brand authority and customer trust with strategic positioning and review management."
    },
    {
      icon: Package,
      title: "Inventory Optimization",
      description: "Smart inventory management and fulfillment strategies to maintain competitive advantage."
    }
  ];

  const walmartCaseStudies = [
    {
      id: "walmart-case-1",
      title: "Home Goods Brand Walmart Success",
      description: "Complete Walmart Connect advertising strategy that resulted in 280% sales growth and category dominance through strategic product positioning.",
      industry: "Home & Garden",
      client_name: "HomeStyle Plus",
      results: {
        "Sales Growth": "280%",
        "Click-Through Rate": "+160%",
        "Conversion Rate": "+90%",
        "Market Position": "Top 3"
      },
      image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      service_type: "walmart"
    },
    {
      id: "walmart-case-2",
      title: "Tech Gadgets Marketplace Domination",
      description: "Strategic campaign optimization and inventory management that led to market leadership and exceptional ROI performance.",
      industry: "Technology",
      client_name: "TechSmart Pro",
      results: {
        "Revenue Growth": "+350%",
        "Market Share": "+65%",
        "ROAS": "4.8x",
        "Product Visibility": "+240%"
      },
      image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      service_type: "walmart"
    },
    {
      id: "walmart-case-3",
      title: "Fashion Brand Seasonal Success",
      description: "Seasonal campaign strategies and trend-based targeting that maximized fashion brand performance across all seasons.",
      industry: "Fashion & Apparel",
      client_name: "Urban Trends",
      results: {
        "Seasonal Revenue": "+420%",
        "Brand Recognition": "+180%",
        "Customer Retention": "+95%",
        "Profit Margin": "+75%"
      },
      image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      service_type: "walmart"
    },
    {
      id: "walmart-case-4",
      title: "Health & Beauty Category Leadership",
      description: "Comprehensive brand strategy and customer acquisition campaigns that established category leadership and drove sustainable growth.",
      industry: "Health & Beauty",
      client_name: "Wellness Essentials",
      results: {
        "Category Ranking": "#1 Position",
        "Customer Acquisition": "+310%",
        "Brand Loyalty": "+220%",
        "Revenue Growth": "$890K"
      },
      image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      service_type: "walmart"
    },
    {
      id: "walmart-case-5",
      title: "Sports Equipment Market Expansion",
      description: "Multi-category expansion strategy with targeted campaigns that drove massive growth across sports and recreation segments.",
      industry: "Sports & Recreation",
      client_name: "Elite Athletic",
      results: {
        "Market Expansion": "+380%",
        "Cross-Category Growth": "+250%",
        "Customer Lifetime Value": "+140%",
        "Inventory Turnover": "+180%"
      },
      image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      service_type: "walmart"
    },
    {
      id: "walmart-case-6",
      title: "Kitchen & Dining Revenue Breakthrough",
      description: "Strategic product bundling and cross-selling campaigns that transformed kitchen brand performance and customer engagement.",
      industry: "Kitchen & Dining",
      client_name: "Culinary Masters",
      results: {
        "Bundle Sales": "+460%",
        "Cross-Sell Rate": "+195%",
        "Customer Satisfaction": "4.9/5",
        "Repeat Purchase": "+220%"
      },
      image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      service_type: "walmart"
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
        title="Walmart Advertising Management - Walmart Connect Experts"
        description="Professional Walmart advertising management services. Boost your Walmart sales with expert Walmart Connect campaign optimization and management."
      />
      <Header />
      
      <div className="space-y-32">
        {/* Enhanced Hero Section with proper spacing */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-standard relative px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-full text-sm font-medium font-body border border-green-100">
                    🛒 Walmart Connect Certified
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-dark mb-8 leading-tight">
                  {config?.title || 'Dominate Walmart Marketplace'}
                </h1>
                <p className="text-xl text-minimal leading-relaxed mb-10 max-w-xl font-body">
                  {config?.heroDescription || 'Achieve 380% revenue growth with expert Walmart Connect advertising strategies and marketplace optimization tailored for success.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-12">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => window.location.href = '/free-audit'}
                  >
                    {config?.primaryButtonText || 'Get Free Walmart Audit'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white text-dark px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.location.href = '/case-studies'}
                  >
                    {config?.secondaryButtonText || 'View Case Studies'}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/60">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">380%</div>
                    <div className="text-sm text-minimal font-body mt-1">Revenue Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">40%</div>
                    <div className="text-sm text-minimal font-body mt-1">Market Share</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">4.8/5</div>
                    <div className="text-sm text-minimal font-body mt-1">Customer Rating</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center"
                  alt="Walmart Advertising Management"
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
                Excel on Walmart's Growing Marketplace
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Tap into Walmart's massive customer base with strategic advertising campaigns that drive sales and build brand recognition.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
        <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50">
          <div className="container-standard px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
                Walmart Success Stories
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Discover how we've helped brands achieve exceptional growth on Walmart's marketplace.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {walmartCaseStudies.map((study, index) => (
                <div 
                  key={study.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  onClick={() => handleCaseStudyClick(study)}
                >
                  <div className="h-48 bg-gradient-to-r from-green-500 to-blue-500 relative overflow-hidden">
                    <img 
                      src={study.image_url} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
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
                          <div className="text-lg font-bold text-green-600">{value}</div>
                          <div className="text-xs text-slate-500">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm group-hover:from-green-700 group-hover:to-blue-700"
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
        <ServiceStatsGrid stats={stats} serviceType="Walmart Advertising" />

        {/* Reviews Section */}
        <ServiceReviewsGrid reviews={reviews} />

        {/* CTA Section */}
        <ServiceCTA 
          title={config?.ctaTitle || 'Ready to Conquer Walmart?'}
          description={config?.ctaDescription || 'Get your free Walmart marketplace audit and learn how we can multiply your revenue.'}
          buttonText={config?.ctaButtonText || 'Get Free Audit'}
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

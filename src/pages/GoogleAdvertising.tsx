
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
import { ArrowRight, Target, Search, FileText, BarChart3, ArrowUpRight } from 'lucide-react';

const GoogleAdvertising = () => {
  const { configs, loading: configLoading } = useServicePageConfig();
  const { stats, caseStudies, reviews, loading: dataLoading } = useServiceData('google-advertising');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const config = configs['google-advertising'] || configs['google'] || {
    title: 'Google Advertising Management',
    subtitle: 'Expert Google Ads & Search Marketing',
    heroDescription: 'Drive targeted traffic and conversions with strategic Google Ads campaigns. We help businesses achieve exceptional ROI through expert PPC management and search marketing optimization.',
    primaryButtonText: 'Get Free Google Audit',
    secondaryButtonText: 'View Success Stories',
    primaryButtonUrl: '/free-audit',
    secondaryButtonUrl: '/case-studies',
    ctaTitle: 'Ready to Dominate Google Search?',
    ctaDescription: 'Get your free Google Ads audit and discover how we can maximize your search marketing ROI.',
    ctaButtonText: 'Get Free Audit',
    ctaButtonUrl: '/free-audit'
  };

  const features = [
    {
      icon: Target,
      title: 'Google Ads Management',
      description: 'Strategic campaign setup and optimization for maximum ROI and visibility.',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      icon: Search,
      title: 'Search Engine Marketing',  
      description: 'Comprehensive SEM strategies to dominate search results.',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      icon: FileText,
      title: 'Keyword Research',
      description: 'Advanced keyword analysis to target high-converting search terms.',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Detailed reporting and insights to optimize campaign performance.',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ];

  const googleCaseStudies = [
    {
      id: "google-case-1",
      title: "Local Business Google Ads Success",
      description: "Strategic Google Ads campaigns with local targeting that drove massive foot traffic and online conversions for local service business through advanced geo-targeting.",
      industry: "Local Services",
      client_name: "Premier Services",
      results: {
        "Lead Generation": "+380%",
        "Cost Per Click": "-45%",
        "Conversion Rate": "+220%",
        "Quality Score": "9.2/10"
      },
      image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      service_type: "google"
    },
    {
      id: "google-case-2",
      title: "B2B Software Google Search Domination",
      description: "Comprehensive search marketing strategy that established market leadership and drove high-quality enterprise leads through Google Ads optimization.",
      industry: "Enterprise Software",
      client_name: "CloudTech Enterprise",
      results: {
        "Search Visibility": "+450%",
        "Enterprise Leads": "+320%",
        "Cost Per Lead": "-60%",
        "Pipeline Value": "$2.4M"
      },
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      service_type: "google"
    },
    {
      id: "google-case-3",
      title: "E-commerce Google Shopping Success",
      description: "Google Shopping campaigns and product listing optimization that transformed online retail performance and drove exceptional ROAS.",
      industry: "E-commerce Retail",
      client_name: "Digital Commerce Pro",
      results: {
        "Shopping Revenue": "+520%",
        "Product Visibility": "+340%",
        "ROAS": "6.8x",
        "Click-Through Rate": "+280%"
      },
      image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      service_type: "google"
    },
    {
      id: "google-case-4",
      title: "Healthcare Practice Growth Strategy",
      description: "Medical practice Google Ads campaigns with compliance-focused approach that drove patient acquisition and appointment bookings.",
      industry: "Healthcare",
      client_name: "Elite Medical Group",
      results: {
        "Patient Leads": "+420%",
        "Appointment Bookings": "+310%",
        "Cost Per Patient": "-55%",
        "Practice Revenue": "+280%"
      },
      image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      service_type: "google"
    },
    {
      id: "google-case-5",
      title: "Real Estate Lead Generation Excellence",
      description: "Real estate Google Ads campaigns with advanced targeting that generated high-quality leads and property inquiries for top realtors.",
      industry: "Real Estate",
      client_name: "Premium Realty Group",
      results: {
        "Qualified Leads": "+380%",
        "Property Inquiries": "+290%",
        "Listing Views": "+450%",
        "Conversion Rate": "+190%"
      },
      image_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      service_type: "google"
    },
    {
      id: "google-case-6",
      title: "Legal Services Client Acquisition",
      description: "Law firm Google Ads strategy with reputation management that established market authority and drove high-value client acquisitions.",
      industry: "Legal Services",
      client_name: "Justice Law Partners",
      results: {
        "Client Inquiries": "+350%",
        "Case Value": "+240%",
        "Market Authority": "+180%",
        "Consultation Rate": "+85%"
      },
      image_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
      service_type: "google"
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

  const loading = configLoading || dataLoading;

  return (
    <>
      <SEOHead 
        title="Google Advertising Management - Expert Google Ads Services"
        description="Professional Google advertising management services. Drive targeted traffic and maximize ROI with our proven Google Ads strategies."
      />
      <Header />
      
      <div className="space-y-32">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container-standard relative px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center px-6 py-3 bg-red-50 text-red-700 rounded-full text-sm font-medium font-body border border-red-100">
                    🎯 Google Ads Certified
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
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold font-body rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
                    <div className="text-3xl font-bold font-heading text-dark">450%</div>
                    <div className="text-sm text-minimal font-body mt-1">Avg ROI Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">8.5+</div>
                    <div className="text-sm text-minimal font-body mt-1">Quality Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-heading text-dark">60%</div>
                    <div className="text-sm text-minimal font-body mt-1">Conversion Boost</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-3xl blur-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
                  alt="Google Advertising Management"
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
                Master Google Advertising
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                Dominate search results and drive qualified traffic with our comprehensive Google Ads management services.
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
        <section className="py-20 bg-gradient-to-br from-slate-50 to-red-50">
          <div className="container-standard px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
                Google Ads Success Stories
              </h2>
              <p className="text-xl text-minimal max-w-3xl mx-auto font-body leading-relaxed">
                See how our Google Ads expertise has driven exceptional results across diverse industries.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {googleCaseStudies.map((study, index) => (
                <div 
                  key={study.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                  onClick={() => handleCaseStudyClick(study)}
                >
                  <div className="h-48 bg-gradient-to-r from-red-500 to-orange-500 relative overflow-hidden">
                    <img 
                      src={study.image_url} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
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
                          <div className="text-lg font-bold text-red-600">{value}</div>
                          <div className="text-xs text-slate-500">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm group-hover:from-red-700 group-hover:to-orange-700"
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
        <ServiceStatsGrid stats={stats} serviceType="Google Advertising" />

        {/* Reviews Section */}
        <ServiceReviewsGrid reviews={reviews} />

        {/* CTA Section */}
        <ServiceCTA 
          title={config.ctaTitle}
          description={config.ctaDescription}
          buttonText={config.ctaButtonText}
          serviceType="Google Advertising"
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

export default GoogleAdvertising;

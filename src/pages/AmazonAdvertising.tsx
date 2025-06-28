
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceStats from "@/components/ServiceStats";
import ServiceCaseStudies from "@/components/ServiceCaseStudies";
import ServiceReviews from "@/components/ServiceReviews";
import { useServiceData } from "@/hooks/useServiceData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Target, TrendingUp, Users, BarChart3, Zap } from "lucide-react";

const AmazonAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('amazon');

  return (
    <>
      <SEOHead 
        title="Amazon PPC Management - Expert Amazon Advertising Services"
        description="Professional Amazon PPC management services. Increase sales, improve ROAS, and dominate Amazon search with our proven advertising strategies."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section with symmetrical padding */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Amazon PPC That Drives Results
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Dominate Amazon search results and maximize your ROI with our expert PPC management and optimization services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.location.href = '/free-audit'}
              >
                Get Free Amazon Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/amazon-case-studies'}
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {!loading && <ServiceStats stats={stats} title="Amazon Advertising Results" />}

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Amazon PPC Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Product Listing Optimization</h3>
                <p className="text-slate-600 leading-relaxed">Optimize your product listings for maximum visibility and conversion with keyword-rich titles, bullets, and descriptions.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Sponsored Product Ads</h3>
                <p className="text-slate-600 leading-relaxed">Drive targeted traffic to your products with optimized Sponsored Product campaigns that convert browsers into buyers.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Campaign Management</h3>
                <p className="text-slate-600 leading-relaxed">Full-service campaign management with continuous optimization, bid adjustments, and performance monitoring.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        {!loading && <ServiceCaseStudies caseStudies={caseStudies} />}

        {/* Reviews Section */}
        {!loading && <ServiceReviews reviews={reviews} />}

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-6">
                  Why Choose Our Amazon Management?
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Proven Results</h3>
                      <p className="text-slate-600">Average 300% increase in Amazon sales within 90 days of optimization.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Fast Setup</h3>
                      <p className="text-slate-600">Get your Amazon campaigns optimized and running within 24-48 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Expert Team</h3>
                      <p className="text-slate-600">Certified Amazon advertising specialists with years of marketplace experience.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to Dominate Amazon?</h3>
                <p className="text-slate-600 mb-6">Get a free audit of your Amazon advertising performance and discover opportunities to increase your sales.</p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  Get Your Free Amazon Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AmazonAdvertising;

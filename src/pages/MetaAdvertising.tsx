
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceStats from "@/components/ServiceStats";
import ServiceCaseStudies from "@/components/ServiceCaseStudies";
import ServiceReviews from "@/components/ServiceReviews";
import { useServiceData } from "@/hooks/useServiceData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, BarChart3, TrendingUp, Zap, Heart } from "lucide-react";

const MetaAdvertising = () => {
  const { caseStudies, stats, reviews, loading } = useServiceData('meta');

  return (
    <>
      <SEOHead 
        title="Meta Advertising Management - Facebook & Instagram Ads"
        description="Expert Meta advertising management for Facebook and Instagram. Drive brand awareness and sales with our proven social media strategies."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section with symmetrical padding */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Meta Advertising That Converts
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Reach your ideal customers on Facebook and Instagram with targeted campaigns that drive engagement and sales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.location.href = '/free-audit'}
              >
                Get Free Meta Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/meta-case-studies'}
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {!loading && <ServiceStats stats={stats} title="Meta Advertising Results" />}

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Meta Advertising Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Audience Targeting</h3>
                <p className="text-slate-600 leading-relaxed">Reach your ideal customers with laser-focused audience targeting based on demographics, interests, and behaviors.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Custom Campaigns</h3>
                <p className="text-slate-600 leading-relaxed">Develop custom Facebook and Instagram campaigns tailored to your specific business goals and target audience.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Performance Analytics</h3>
                <p className="text-slate-600 leading-relaxed">Track, analyze, and optimize your campaigns with detailed performance reporting and actionable insights.</p>
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
                  Why Choose Our Meta Management?
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Proven Results</h3>
                      <p className="text-slate-600">Average 200% increase in ROAS for our Meta clients within 90 days.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Fast Setup</h3>
                      <p className="text-slate-600">Get your campaigns live and optimized within 24-48 hours of onboarding.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Dedicated Support</h3>
                      <p className="text-slate-600">Dedicated account managers provide personalized support and guidance.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to Transform Your Social Media Advertising?</h3>
                <p className="text-slate-600 mb-6">Get a free audit of your current Meta advertising performance and discover opportunities for growth.</p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  Claim Your Free Audit
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

export default MetaAdvertising;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, ShoppingCart, BarChart3, TrendingUp, Zap, Users } from "lucide-react";

const WalmartAdvertising = () => {
  return (
    <>
      <SEOHead 
        title="Walmart Advertising Management - Walmart Connect Experts"
        description="Professional Walmart Connect advertising management. Grow your sales on Walmart Marketplace with our proven strategies."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section with symmetrical padding */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Dominate Walmart Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
              Unlock the power of Walmart Connect advertising and reach millions of shoppers with our expert campaign management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => window.location.href = '/free-audit'}
              >
                Get Free Walmart Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => window.location.href = '/walmart-case-studies'}
              >
                View Success Stories
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-16">
              Our Walmart Advertising Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Sponsored Products</h3>
                <p className="text-slate-600 leading-relaxed">Boost your product visibility and sales with targeted Sponsored Products campaigns on Walmart Marketplace.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Sponsored Brands</h3>
                <p className="text-slate-600 leading-relaxed">Increase brand awareness and drive traffic to your product listings with engaging Sponsored Brands campaigns.</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Performance Analytics</h3>
                <p className="text-slate-600 leading-relaxed">Track and optimize your campaign performance with detailed analytics and reporting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-6">
                  Why Choose Our Walmart Management?
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Proven Strategies</h3>
                      <p className="text-slate-600">We use data-driven strategies to maximize your ROI on Walmart Marketplace.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Fast Implementation</h3>
                      <p className="text-slate-600">We quickly implement and optimize your campaigns for rapid results.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Dedicated Support</h3>
                      <p className="text-slate-600">Our team provides dedicated support and ongoing optimization to ensure your success.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to Dominate Walmart Marketplace?</h3>
                <p className="text-slate-600 mb-6">Get a free audit of your Walmart advertising performance and discover opportunities for growth.</p>
                
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

export default WalmartAdvertising;

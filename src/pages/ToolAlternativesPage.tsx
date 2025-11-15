import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, TrendingUp, Users, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ToolAlternativesPage: React.FC = () => {
  const navigate = useNavigate();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Amazon Agency Alternative to Helium 10, Jungle Scout, AMZ Scout & Smart Scout",
    "description": "Discover why a professional Amazon advertising agency delivers better results than tools like Helium 10, Jungle Scout, AMZ Scout, or Smart Scout alone.",
    "author": {
      "@type": "Organization",
      "name": "AMZ Ad Scout"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AMZ Ad Scout",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    }
  };

  return (
    <>
      <SEOHead 
        title="Amazon Agency Alternative to Helium 10, Jungle Scout, AMZ Scout & Smart Scout"
        description="Looking for alternatives to Helium 10, Jungle Scout, AMZ Scout, or Smart Scout? Our Amazon advertising agency combines expert strategy with powerful tools for superior results. Compare tools vs full-service Amazon agency."
        keywords="helium 10 alternative, jungle scout alternative, amz scout alternative, smart scout alternative, amazon agency, advertising agency, digital marketing agency, amazon advertising, amazon ppc agency"
        canonical={window.location.href}
        schema={schema}
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                Expert Amazon Advertising Agency
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
                Beyond Helium 10 & Jungle Scout: <span className="block mt-2">Full-Service Amazon Agency</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
                Tools like Helium 10, Jungle Scout, AMZ Scout, and Smart Scout are great for data. But what if you need an expert <strong>Amazon advertising agency</strong> to execute winning strategies?
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg"
                onClick={() => navigate('/contact')}
              >
                Get Free Amazon Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Tools vs Agency Comparison */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Tools vs Full-Service Amazon Advertising Agency
            </h2>
            <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              Understand the difference between software tools and expert agency services
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tools Column */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Software Tools Only</h3>
                <p className="text-slate-600 mb-6">Helium 10, Jungle Scout, AMZ Scout, Smart Scout</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Product research data & analytics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Keyword research tools</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Market trend insights</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-500">No hands-on campaign management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-500">No strategic expertise included</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-500">No creative development</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-500">No ongoing optimization</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-500">You do all the work</span>
                  </div>
                </div>
              </div>

              {/* Agency Column */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 border-2 border-blue-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 px-4 py-1 text-sm font-bold">
                  RECOMMENDED
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 mt-4">Full-Service Amazon Agency</h3>
                <p className="text-blue-100 mb-6">Expert Digital Marketing Agency Services</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                    <span className="text-white font-medium">All tool features + expert analysis</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                    <span className="text-white font-medium">Complete PPC campaign management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                    <span className="text-white font-medium">Strategic planning & execution</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                    <span className="text-white font-medium">A+ content & listing optimization</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                    <span className="text-white font-medium">Continuous performance optimization</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                    <span className="text-white font-medium">Creative development & testing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                    <span className="text-white font-medium">Dedicated account manager</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                    <span className="text-white font-medium">We do the heavy lifting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Agency Section */}
        <section className="py-20 bg-white/50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why Top Amazon Sellers Choose an <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Advertising Agency</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-200">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Expert Team vs DIY</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get access to certified Amazon advertising specialists, PPC experts, and strategists instead of trying to learn complex tools like Helium 10 or Jungle Scout on your own.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-200">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Strategy + Execution</h3>
                <p className="text-slate-600 leading-relaxed">
                  We don't just provide data like AMZ Scout or Smart Scout - we develop winning strategies and execute campaigns that drive real sales growth and profit.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-200">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Time & Resource Savings</h3>
                <p className="text-slate-600 leading-relaxed">
                  Focus on sourcing products and growing your business while our Amazon agency handles all advertising, optimization, and technical execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Better Results Than Tools Alone?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join 500+ successful Amazon sellers who chose expert agency services over DIY tools
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                onClick={() => navigate('/contact')}
              >
                Get Free Strategy Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                onClick={() => navigate('/case-studies')}
              >
                View Success Stories
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ToolAlternativesPage;

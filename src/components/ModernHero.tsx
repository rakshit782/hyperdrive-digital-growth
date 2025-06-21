
import { ArrowRight, Play, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModernHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 shadow-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-600">Trusted by 500+ Brands</span>
              </div>

              {/* Main heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Scale Your
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block">
                    Digital Advertising
                  </span>
                  Performance
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Expert Amazon, Walmart & Meta advertising agency that drives measurable growth. 
                  Get proven results with our data-driven strategies.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Get Free Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Free Audit</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">No Contracts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Expert Team</span>
                </div>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative">
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl">
                {/* Chart placeholder */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">Revenue Growth</h3>
                    <span className="text-sm text-green-600 font-medium">+300% ROAS</span>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-80 flex items-end justify-center">
                    <div className="text-white font-bold text-lg mb-4">Performance Analytics</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border border-blue-100">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-3 shadow-lg">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;

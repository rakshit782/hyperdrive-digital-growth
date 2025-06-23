
import { ArrowRight, Play, CheckCircle, Star, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModernHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden pt-24 pb-16 flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="space-y-10 text-center lg:text-left">
              {/* Trust badge with social proof */}
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-indigo-100 shadow-lg">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-700">4.9/5 from 500+ Happy Clients</span>
              </div>

              {/* Main converting headline */}
              <div className="space-y-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                  <span className="block mb-3">Get 3x</span>
                  <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent block mb-3">
                    Higher ROAS
                  </span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">in 90 Days</span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  Join 500+ brands that increased their advertising revenue by an average of 
                  <span className="font-bold text-indigo-600"> 300%</span> with our proven Amazon, Walmart & Meta strategies.
                </p>
              </div>

              {/* Social proof numbers */}
              <div className="grid grid-cols-3 gap-6 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-indigo-600 mb-2">300%</div>
                  <div className="text-sm text-slate-600 font-medium">Avg ROAS Increase</div>
                </div>
                <div className="text-center border-x border-slate-200">
                  <div className="text-xl lg:text-2xl font-bold text-emerald-600 mb-2">24hrs</div>
                  <div className="text-sm text-slate-600 font-medium">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-violet-600 mb-2">98%</div>
                  <div className="text-sm text-slate-600 font-medium">Client Retention</div>
                </div>
              </div>

              {/* CTA buttons with urgency */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 border-0"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  Get FREE $2,000 Audit
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-3" />
                  Watch Success Stories
                </Button>
              </div>

              {/* Trust indicators with icons */}
              <div className="flex flex-wrap items-center gap-8 pt-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-semibold">No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Shield className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-semibold">Risk-Free Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-semibold">Results in 24hrs</span>
                </div>
              </div>

              {/* Urgency element */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 inline-block">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-orange-700 font-semibold text-sm">
                    🔥 Limited Time: Only 10 spots left this month
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - More Converting Visual */}
            <div className="relative mt-8 lg:mt-0">
              {/* Main converting image - Marketing dashboard/growth visualization */}
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center"
                  alt="Digital Marketing Analytics Dashboard"
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
                
                {/* Overlay with performance metrics */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                
                {/* Performance stats overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-800 text-lg">Live Campaign Results</h3>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm text-emerald-600 font-bold">+347% ROAS</span>
                      </div>
                    </div>
                    
                    {/* Mini performance chart visualization */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">$1.2M</div>
                        <div className="text-sm text-slate-600">Revenue This Month</div>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">4.7x</div>
                        <div className="text-sm text-slate-600">Return on Ad Spend</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating success indicators */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-400 to-green-400 text-white rounded-full p-4 shadow-xl animate-bounce">
                <TrendingUp className="w-6 h-6" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full p-4 shadow-xl">
                <Star className="w-6 h-6 fill-white" />
              </div>
              
              {/* Achievement badge */}
              <div className="absolute top-4 -left-6 bg-white rounded-full p-4 shadow-lg border-2 border-emerald-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">#1</div>
                  <div className="text-xs text-slate-600 whitespace-nowrap">Growth Agency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;

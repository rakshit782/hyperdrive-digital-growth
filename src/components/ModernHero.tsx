
import { ArrowRight, Play, CheckCircle, Star, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModernHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden pt-20 pb-12 flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-5 text-center lg:text-left">
              {/* Trust badge with social proof */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-100 shadow-lg">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-700">4.9/5 from 500+ Happy Clients</span>
              </div>

              {/* Main converting headline */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
                  <span className="block">Get 3x</span>
                  <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent block">
                    Higher ROAS
                  </span>
                  <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold">in 90 Days</span>
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                  Join 500+ brands that increased their advertising revenue by an average of 
                  <span className="font-bold text-indigo-600"> 300%</span> with our proven Amazon, Walmart & Meta strategies.
                </p>
              </div>

              {/* Social proof numbers */}
              <div className="grid grid-cols-3 gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/50 shadow-lg">
                <div className="text-center">
                  <div className="text-lg lg:text-xl font-bold text-indigo-600">300%</div>
                  <div className="text-xs text-slate-600 font-medium">Avg ROAS Increase</div>
                </div>
                <div className="text-center border-x border-slate-200">
                  <div className="text-lg lg:text-xl font-bold text-emerald-600">24hrs</div>
                  <div className="text-xs text-slate-600 font-medium">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-xl font-bold text-violet-600">98%</div>
                  <div className="text-xs text-slate-600 font-medium">Client Retention</div>
                </div>
              </div>

              {/* CTA buttons with urgency */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-3">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 text-base font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 border-0"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  Get FREE $2,000 Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 px-5 py-3 text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Success Stories
                </Button>
              </div>

              {/* Trust indicators with icons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold">No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Shield className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-semibold">Risk-Free Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold">Results in 24hrs</span>
                </div>
              </div>

              {/* Urgency element */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-2 inline-block">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-orange-700 font-semibold text-xs">
                    🔥 Limited Time: Only 10 spots left this month
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Visual */}
            <div className="relative">
              <div className="relative bg-white/30 backdrop-blur-sm rounded-3xl p-5 border border-white/40 shadow-2xl">
                {/* Performance Dashboard */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-4 border border-indigo-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-sm">Client Results Dashboard</h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs text-emerald-600 font-bold">+300% ROAS</span>
                    </div>
                  </div>
                  
                  {/* Mock chart */}
                  <div className="h-28 bg-gradient-to-r from-indigo-400 via-blue-500 to-violet-400 rounded-xl opacity-90 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-white font-bold text-lg mb-1">$847K</div>
                      <div className="text-indigo-100 text-xs">Revenue Generated This Month</div>
                    </div>
                  </div>
                  
                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-white/80 rounded-lg p-2">
                      <div className="text-sm font-bold text-indigo-600">$2.8M</div>
                      <div className="text-xs text-slate-600">Total Ad Spend Managed</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2">
                      <div className="text-sm font-bold text-emerald-600">127</div>
                      <div className="text-xs text-slate-600">Active Campaigns</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements with enhanced design */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full p-2 shadow-xl animate-bounce">
                <Star className="w-5 h-5 fill-white" />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full p-2 shadow-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              
              {/* Achievement badge */}
              <div className="absolute top-2 -left-5 bg-white rounded-full p-2 shadow-lg border-2 border-emerald-200">
                <div className="text-center">
                  <div className="text-sm font-bold text-emerald-600">#1</div>
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

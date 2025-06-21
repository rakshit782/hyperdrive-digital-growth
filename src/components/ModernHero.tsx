
import { ArrowRight, Play, CheckCircle, Star, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModernHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden pt-24 pb-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              {/* Trust badge with social proof */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 shadow-lg">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-700">4.9/5 from 500+ Happy Clients</span>
              </div>

              {/* Main converting headline */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                  <span className="block">Get 3x</span>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block">
                    Higher ROAS
                  </span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">in 90 Days</span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                  Join 500+ brands that increased their advertising revenue by an average of 
                  <span className="font-bold text-blue-600"> 300%</span> with our proven Amazon, Walmart & Meta strategies.
                </p>
              </div>

              {/* Social proof numbers */}
              <div className="grid grid-cols-3 gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg">
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600">300%</div>
                  <div className="text-xs text-slate-600 font-medium">Avg ROAS Increase</div>
                </div>
                <div className="text-center border-x border-slate-200">
                  <div className="text-xl lg:text-2xl font-bold text-green-600">24hrs</div>
                  <div className="text-xs text-slate-600 font-medium">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-xs text-slate-600 font-medium">Client Retention</div>
                </div>
              </div>

              {/* CTA buttons with urgency */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-0"
                  onClick={() => window.location.href = '/free-audit'}
                >
                  Get FREE $2,000 Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 px-6 py-4 text-base font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Success Stories
                </Button>
              </div>

              {/* Trust indicators with icons */}
              <div className="flex flex-wrap items-center gap-4 pt-2 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold">No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold">Risk-Free Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold">Results in 24hrs</span>
                </div>
              </div>

              {/* Urgency element */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-3 inline-block">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 font-semibold text-xs">
                    🔥 Limited Time: Only 10 spots left this month
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Visual */}
            <div className="relative">
              <div className="relative bg-white/30 backdrop-blur-sm rounded-3xl p-6 border border-white/40 shadow-2xl">
                {/* Performance Dashboard */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 text-base">Client Results Dashboard</h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 font-bold">+300% ROAS</span>
                    </div>
                  </div>
                  
                  {/* Mock chart */}
                  <div className="h-32 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-xl opacity-90 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-white font-bold text-xl mb-1">$847K</div>
                      <div className="text-blue-100 text-xs">Revenue Generated This Month</div>
                    </div>
                  </div>
                  
                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/80 rounded-lg p-2">
                      <div className="text-base font-bold text-blue-600">$2.8M</div>
                      <div className="text-xs text-slate-600">Total Ad Spend Managed</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2">
                      <div className="text-base font-bold text-green-600">127</div>
                      <div className="text-xs text-slate-600">Active Campaigns</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements with enhanced design */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full p-3 shadow-xl animate-bounce">
                <Star className="w-6 h-6 fill-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-3 shadow-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              
              {/* Achievement badge */}
              <div className="absolute top-2 -left-6 bg-white rounded-full p-2 shadow-lg border-2 border-green-200">
                <div className="text-center">
                  <div className="text-base font-bold text-green-600">#1</div>
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

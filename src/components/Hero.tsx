
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const Hero = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Hero logo failed to load:", e.currentTarget.src);
  };

  const handleImageLoad = () => {
    console.log("Hero logo loaded successfully");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo with enhanced styling */}
          <div className="flex justify-center mb-12 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <img 
                  src="/lovable-uploads/62efba66-13c2-4df1-98b5-809501c81cb6.png" 
                  alt="AMZ AD SCOUT - The Growth Agency" 
                  className="h-14 w-auto object-contain mx-auto"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  style={{ maxWidth: '180px', display: 'block' }}
                />
              </div>
            </div>
          </div>
          
          {/* Enhanced Typography */}
          <div className="mb-8 space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-100">Trusted by 500+ Businesses</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Scale Your Business with
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Expert Growth
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-slate-200">
                Across All Platforms
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-blue-100/90 max-w-4xl mx-auto leading-relaxed font-light">
            AMZ AD SCOUT specializes in <span className="font-semibold text-cyan-300">Amazon advertising</span>, 
            <span className="font-semibold text-cyan-300"> Walmart advertising</span>, and 
            <span className="font-semibold text-cyan-300"> Meta advertising</span> with complete account management, 
            Shopify development, and seamless integrations.
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-blue-400/30"
            >
              Get Free Strategy Call
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-2 border-cyan-400/50 bg-white/5 backdrop-blur-sm text-cyan-100 hover:bg-cyan-400/10 hover:border-cyan-400 px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2"
            >
              <Play className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              Watch Case Study
            </Button>
          </div>
          
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Campaigns Managed", color: "from-blue-400 to-cyan-400" },
              { number: "$50M+", label: "Ad Spend Managed", color: "from-cyan-400 to-purple-400" },
              { number: "300%", label: "Avg ROI Increase", color: "from-purple-400 to-pink-400" },
              { number: "24/7", label: "Account Monitoring", color: "from-pink-400 to-blue-400" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-blue-200/80 text-sm md:text-base font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

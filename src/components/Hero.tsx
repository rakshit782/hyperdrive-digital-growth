
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Hero logo failed to load:", e.currentTarget.src);
  };

  const handleImageLoad = () => {
    console.log("Hero logo loaded successfully");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/d76be5e2-f99d-4fae-aef6-a92d04f82d8e.png" 
              alt="AMZ AD SCOUT - The Growth Agency" 
              className="h-16 w-auto object-contain"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ maxWidth: '200px', display: 'block' }}
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Scale Your Business with
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Expert</span>
            <br />Amazon & Multi-Platform Growth
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            AMZ AD SCOUT specializes in Amazon advertising, Walmart advertising, and Meta advertising with complete account management, 
            Shopify development, and seamless integrations that drive real results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Get Free Strategy Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-2 border-blue-400 text-blue-100 hover:bg-blue-400 hover:text-blue-900 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
              <Play className="mr-2 w-5 h-5" />
              Watch Case Study
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">500+</div>
              <div className="text-blue-200">Campaigns Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">$50M+</div>
              <div className="text-blue-200">Ad Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">300%</div>
              <div className="text-blue-200">Avg ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-blue-200">Account Monitoring</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500 rounded-full opacity-10 animate-pulse"></div>
    </section>
  );
};

export default Hero;


import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const ModernCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm">
            <Zap className="w-8 h-8 text-yellow-300" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Scale Your Business?
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of successful brands who trust AMZ AD SCOUT to drive their growth. 
          Get your free audit and discover untapped opportunities today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={() => window.location.href = '/free-audit'}
          >
            Get Free Audit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="text-white/90">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Successful Campaigns</div>
          </div>
          <div className="text-white/90">
            <div className="text-3xl font-bold mb-2">$50M+</div>
            <div className="text-blue-100">Ad Spend Managed</div>
          </div>
          <div className="text-white/90">
            <div className="text-3xl font-bold mb-2">300%</div>
            <div className="text-blue-100">Average ROAS Increase</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;

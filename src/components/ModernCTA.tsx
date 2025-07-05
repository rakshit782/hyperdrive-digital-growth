
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ModernCTA = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/5"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/80 text-sm">4.9/5 from 500+ reviews</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ready to Scale Your Business?
          </h2>
          
          <p className="text-lg text-white/80 mb-6 max-w-xl mx-auto">
            Contact our team to learn how we can grow your revenue.
          </p>

          {/* CTA Button */}
          <div className="mb-6">
            <Button 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-white font-semibold"
              onClick={() => window.location.href = '/contact'}
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>500+ Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;

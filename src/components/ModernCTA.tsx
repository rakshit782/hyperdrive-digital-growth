
import { useState } from "react";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ModernCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

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
            Get your free audit and see how we can grow your revenue.
          </p>

          {/* CTA Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/60 focus:bg-white/30"
                required
              />
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-2 text-white font-semibold"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  "Thank You!"
                ) : (
                  <>
                    Get Free Audit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
            <p className="text-white/60 text-sm mt-3">
              No spam. Unsubscribe anytime.
            </p>
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

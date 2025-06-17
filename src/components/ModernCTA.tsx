
import { useState } from "react";
import { ArrowRight, CheckCircle, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ModernCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Add actual form submission logic here
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const benefits = [
    "Free audit and strategy consultation",
    "30-day money-back guarantee",
    "Dedicated account manager",
    "Real-time performance dashboard"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/80">4.9/5 from 500+ reviews</span>
          </div>

          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Ready to Scale Your Business?
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Start Today
            </span>
          </h2>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join 500+ successful brands that trust us with their advertising. 
            Get your free audit and see how we can grow your revenue.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
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
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-white font-semibold"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  "Thank You!"
                ) : (
                  <>
                    Get Free Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
            <p className="text-white/60 text-sm mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>Expert Team</span>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="mt-8 p-4 bg-orange-500/20 rounded-lg border border-orange-400/30">
            <p className="text-orange-200 font-medium">
              🔥 Limited Time: Get 20% off your first month when you start this week!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;

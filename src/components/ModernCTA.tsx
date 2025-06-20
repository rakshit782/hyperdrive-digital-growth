
import { useState } from "react";
import { ArrowRight, CheckCircle, Star, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ModernCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Submit to Google Sheets if configured
      const googleSheetsConfig = localStorage.getItem('googleSheetsConfig');
      if (googleSheetsConfig) {
        try {
          const config = JSON.parse(googleSheetsConfig);
          if (config.isEnabled && config.newsletterSheetUrl) {
            // In a real implementation, this would call the Google Sheets API
            console.log('Submitting newsletter signup to Google Sheets:', { email, timestamp: new Date().toISOString() });
          }
        } catch (error) {
          console.error('Error submitting to Google Sheets:', error);
        }
      }
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="section-minimal bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container-minimal">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 font-medium">4.9/5 from 500+ reviews</span>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 mb-6 shadow-sm">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ready to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Scale Your Business?</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Get your free audit and see how we can grow your revenue by 300% or more.
            </p>
          </div>

          {/* Email Signup Form */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 text-lg rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <Button 
                type="submit" 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Thank You!
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5 mr-2" />
                    Get Free Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              No spam. Unsubscribe anytime. Free audit includes ROI analysis & growth recommendations.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">30-Day Guarantee</h3>
              <p className="text-gray-600 text-sm">Money back if not satisfied</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">500+ Happy Clients</h3>
              <p className="text-gray-600 text-sm">Trusted by leading brands</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">300% ROI Increase</h3>
              <p className="text-gray-600 text-sm">Average client improvement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  ArrowRight 
} from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-cyan-400">Scale Your Business</span>?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Get a free strategy consultation with AMZ AD SCOUT and discover how we can 3x your revenue with our proven marketing systems
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <MessageCircle className="mr-3 w-6 h-6 text-cyan-400" />
                Get Your Free Strategy Call
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  placeholder="First Name" 
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400"
                />
                <Input 
                  placeholder="Last Name" 
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400"
                />
              </div>
              <Input 
                placeholder="Email Address" 
                type="email"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400"
              />
              <Input 
                placeholder="Phone Number" 
                type="tel"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400"
              />
              <Input 
                placeholder="Monthly Ad Spend Budget" 
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400"
              />
              <Textarea 
                placeholder="Tell us about your business and goals..."
                rows={4}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400"
              />
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Book Free Strategy Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Contact Info & Benefits */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-400">What You'll Get:</h3>
              <div className="space-y-4">
                {[
                  "Complete audit of your current marketing efforts",
                  "Custom strategy roadmap for your business",
                  "ROI projections and growth opportunities",
                  "Competitive analysis and market insights",
                  "No-obligation consultation with our experts"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span className="text-blue-100">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span className="text-blue-100">hello@amzadscout.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span className="text-blue-100">Mon-Fri: 9AM-6PM PST</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur rounded-2xl p-6 border border-green-400/30">
              <h4 className="text-lg font-bold text-green-400 mb-2">🚀 Limited Time Offer</h4>
              <p className="text-blue-100">
                Book your strategy call this week and receive a <strong>FREE</strong> competitive analysis report worth $500!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

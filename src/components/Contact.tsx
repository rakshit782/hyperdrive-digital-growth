
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  MapPin
} from "lucide-react";

interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
  address: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+1 (555) 123-4567",
    email: "hello@amzadscout.com",
    hours: "Mon-Fri: 9AM-6PM PST",
    address: "123 Business St, Suite 100, San Francisco, CA 94105"
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    budget: "",
    message: ""
  });

  useEffect(() => {
    console.log("Contact: Component mounted, loading contact data...");
    
    const loadContactInfo = () => {
      const savedContact = localStorage.getItem('contactData');
      if (savedContact) {
        try {
          const parsed = JSON.parse(savedContact);
          setContactInfo(prev => ({ ...prev, ...parsed }));
          console.log("Contact: Loaded contact info:", parsed);
        } catch (error) {
          console.error('Contact: Failed to parse contact data:', error);
        }
      }
    };

    // Initial load
    loadContactInfo();

    // Listen for updates from dashboard
    const handleContactUpdate = (event: any) => {
      console.log("Contact: Received contact update event:", event.detail);
      if (event.detail && typeof event.detail === 'object') {
        setContactInfo(prev => ({ ...prev, ...event.detail }));
      }
    };

    window.addEventListener('contactUpdated', handleContactUpdate);
    
    return () => {
      window.removeEventListener('contactUpdated', handleContactUpdate);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Backend Required",
      description: "Form submission requires a backend server. Please connect to Supabase to enable form submissions and email functionality.",
      variant: "destructive",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-8">
            <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-100 tracking-wide">GET STARTED</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Ready to <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Scale Your Business</span>?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed font-light">
            Get a free strategy consultation with AMZ AD SCOUT and discover how we can 3x your revenue with our proven marketing systems
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Enhanced Contact Form */}
          <Card className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <CardHeader className="relative z-10 pb-8">
              <CardTitle className="text-3xl font-bold text-white flex items-center">
                <MessageCircle className="mr-4 w-8 h-8 text-cyan-400" />
                Get Your Free Strategy Call
              </CardTitle>
              <p className="text-blue-100/80 text-lg">Fill out the form and we'll get back to you within 24 hours</p>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name" 
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 h-14 rounded-xl text-lg backdrop-blur-sm"
                  />
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name" 
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 h-14 rounded-xl text-lg backdrop-blur-sm"
                  />
                </div>
                <Input 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address" 
                  type="email"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 h-14 rounded-xl text-lg backdrop-blur-sm"
                />
                <Input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number" 
                  type="tel"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 h-14 rounded-xl text-lg backdrop-blur-sm"
                />
                <Input 
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Monthly Ad Spend Budget" 
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 h-14 rounded-xl text-lg backdrop-blur-sm"
                />
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your business and goals..."
                  rows={5}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl text-lg backdrop-blur-sm resize-none"
                />
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white py-6 text-xl font-semibold rounded-xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                >
                  Book Free Strategy Call
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Enhanced Contact Info & Benefits */}
          <div className="space-y-8">
            {/* Benefits */}
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">What You'll Get:</h3>
              <div className="space-y-6">
                {[
                  { icon: Shield, text: "Complete audit of your current marketing efforts" },
                  { icon: Zap, text: "Custom strategy roadmap for your business" },
                  { icon: TrendingUp, text: "ROI projections and growth opportunities" },
                  { icon: MessageCircle, text: "Competitive analysis and market insights" },
                  { icon: CheckCircle, text: "No-obligation consultation with our experts" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-blue-100 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dynamic Contact Information */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 space-y-6 border border-white/20 hover:border-white/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-blue-100 text-lg group-hover:text-white transition-colors duration-300">{contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-blue-100 text-lg group-hover:text-white transition-colors duration-300">{contactInfo.email}</span>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-blue-100 text-lg group-hover:text-white transition-colors duration-300">{contactInfo.hours}</span>
                </div>
                <div className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300 mt-0.5" />
                  <span className="text-blue-100 text-lg group-hover:text-white transition-colors duration-300">{contactInfo.address}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <h4 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                Limited Time Offer
              </h4>
              <p className="text-blue-100 text-lg leading-relaxed">
                Book your strategy call this week and receive a <strong className="text-white">FREE</strong> competitive analysis report worth <strong className="text-cyan-400">$500</strong>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

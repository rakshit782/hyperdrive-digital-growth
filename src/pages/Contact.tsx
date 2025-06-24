
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { emailService } from "@/services/emailService";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

const defaultContact: ContactInfo = {
  phone: "+1 (555) 123-4567",
  email: "hello@yourcompany.com",
  address: "123 Business Street, Suite 100, City, State 12345",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM"
};

const Contact = () => {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContact);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleContactUpdate = (event: CustomEvent) => {
      setContactInfo(event.detail);
    };

    const savedContact = localStorage.getItem('contactData');
    if (savedContact) {
      try {
        const parsed = JSON.parse(savedContact);
        setContactInfo({ ...defaultContact, ...parsed });
      } catch (error) {
        console.error('Failed to parse contact settings:', error);
      }
    }

    window.addEventListener('contactUpdated', handleContactUpdate as EventListener);
    return () => window.removeEventListener('contactUpdated', handleContactUpdate as EventListener);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailService.sendContactForm(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          message: ""
        });
      } else {
        toast({
          title: "Message Failed",
          description: result.error || "Failed to send message. Please try again or email us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  Thank You!
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="mr-4">
                  Send Another Message
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-slate-900 mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Ready to transform your e-commerce business? Let's discuss your goals and create a strategy that delivers results.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="John Doe"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your Company Inc."
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your project, goals, and how we can help..."
                        rows={6}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Email</h4>
                          <p className="text-slate-600">{contactInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Phone</h4>
                          <p className="text-slate-600">{contactInfo.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Office</h4>
                          <p className="text-slate-600 whitespace-pre-line">{contactInfo.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Business Hours</h4>
                          <p className="text-slate-600 whitespace-pre-line">{contactInfo.hours}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="mb-6 opacity-90">
                      Schedule a free consultation to discuss your e-commerce goals and discover how we can help you achieve them.
                    </p>
                    <Button variant="secondary" className="w-full">
                      Schedule Free Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;

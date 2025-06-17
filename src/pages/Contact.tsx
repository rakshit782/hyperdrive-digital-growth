
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Get In <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Ready to scale your business? Let's discuss how our advertising expertise can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-white border shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your business and advertising goals..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 text-blue-600 mr-4" />
                      <div>
                        <p className="font-semibold text-slate-900">Email</p>
                        <p className="text-slate-600">hello@amzadscout.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-6 h-6 text-blue-600 mr-4" />
                      <div>
                        <p className="font-semibold text-slate-900">Phone</p>
                        <p className="text-slate-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                      <div>
                        <p className="font-semibold text-slate-900">Address</p>
                        <p className="text-slate-600">123 Business Ave, Suite 100<br />City, State 12345</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-blue-600 mr-4" />
                      <div>
                        <p className="font-semibold text-slate-900">Business Hours</p>
                        <p className="text-slate-600">Monday - Friday: 9AM - 6PM EST</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3 text-slate-600">
                    <li>• 15+ years of advertising expertise</li>
                    <li>• $50M+ in managed ad spend</li>
                    <li>• 95% client retention rate</li>
                    <li>• Dedicated account managers</li>
                    <li>• Proven ROI improvements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;

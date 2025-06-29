
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, DollarSign, TrendingUp, Target } from "lucide-react";
import { useFormSubmission } from "@/hooks/useFormSubmission";

const FreeAuditForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    currentSpend: '',
    platforms: '',
    message: ''
  });

  const { submitForm, isSubmitting } = useFormSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      return;
    }

    const auditMessage = `Free Audit Request:
Website: ${formData.website}
Current Monthly Spend: ${formData.currentSpend}
Platforms: ${formData.platforms}
Additional Info: ${formData.message}`;

    const result = await submitForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: auditMessage,
      source: 'free_audit_form',
      formType: 'free_audit'
    });

    if (result.success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        currentSpend: '',
        platforms: '',
        message: ''
      });
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "ROI Analysis",
      description: "Detailed breakdown of your current return on ad spend"
    },
    {
      icon: Target,
      title: "Targeting Review",
      description: "Assessment of your audience targeting and optimization opportunities"
    },
    {
      icon: TrendingUp,
      title: "Growth Strategy",
      description: "Custom roadmap to scale your advertising results"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm font-medium mb-4">
                $2,000 Value - Completely Free
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                What You'll Get in Your Free Audit
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our comprehensive advertising audit typically costs $2,000. For a limited time, we're offering it completely free to qualified businesses.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-slate-900">100% Free Guarantee</h4>
                </div>
                <p className="text-slate-600 text-sm">
                  No hidden fees, no obligations. Just valuable insights to help you grow your business.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900">Get Your Free $2,000 Audit</CardTitle>
              <CardDescription className="text-slate-600">
                Fill out the form below and we'll send you a comprehensive audit within 48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-slate-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-slate-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                      Company Name *
                    </label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      className="border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-1">
                    Website URL
                  </label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="border-slate-300"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currentSpend" className="block text-sm font-medium text-slate-700 mb-1">
                      Current Monthly Ad Spend
                    </label>
                    <Input
                      id="currentSpend"
                      type="text"
                      value={formData.currentSpend}
                      onChange={(e) => setFormData({ ...formData, currentSpend: e.target.value })}
                      className="border-slate-300"
                      placeholder="e.g., $5,000/month"
                    />
                  </div>
                  <div>
                    <label htmlFor="platforms" className="block text-sm font-medium text-slate-700 mb-1">
                      Current Platforms
                    </label>
                    <Input
                      id="platforms"
                      type="text"
                      value={formData.platforms}
                      onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
                      className="border-slate-300"
                      placeholder="e.g., Amazon, Google, Facebook"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Additional Information
                  </label>
                  <Textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-slate-300"
                    placeholder="Tell us about your biggest advertising challenges..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free $2,000 Audit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FreeAuditForm;

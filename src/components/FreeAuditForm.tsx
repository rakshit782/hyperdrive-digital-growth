
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Send, Target, TrendingUp, Zap } from "lucide-react";
import { useFormSubmission } from "@/hooks/useFormSubmission";

const FreeAuditForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    monthlyAdSpend: '',
    primaryPlatform: '',
    businessGoals: '',
    currentChallenges: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { submitForm, isSubmitting } = useFormSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: `Free Audit Request - Website: ${formData.website}, Monthly Spend: ${formData.monthlyAdSpend}, Platform: ${formData.primaryPlatform}, Goals: ${formData.businessGoals}, Challenges: ${formData.currentChallenges}`,
      formType: 'free_audit',
      source: 'free_audit_form'
    });

    if (result.success) {
      setIsSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', company: '', website: '',
        monthlyAdSpend: '', primaryPlatform: '', businessGoals: '', currentChallenges: ''
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSubmitted) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-8" />
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Your Audit Request is Submitted!</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Thank you for requesting your free $2,000 advertising audit. Our team will analyze your current campaigns and provide you with a comprehensive report within 24-48 hours.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Deep Analysis</h3>
                  <p className="text-sm text-slate-600">Comprehensive audit of your campaigns</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Growth Opportunities</h3>
                  <p className="text-sm text-slate-600">Identify areas for improvement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Action Plan</h3>
                  <p className="text-sm text-slate-600">Custom strategy for your business</p>
                </div>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Request Another Audit
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
              Get Your Free $2,000 Advertising Audit
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Discover hidden opportunities and get a custom roadmap to increase your ROAS by 300%
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg border-slate-300"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 text-lg border-slate-300"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12 text-lg border-slate-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Name
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="h-12 text-lg border-slate-300"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Website URL
                  </label>
                  <Input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="h-12 text-lg border-slate-300"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Monthly Ad Spend
                  </label>
                  <Select onValueChange={(value) => handleSelectChange('monthlyAdSpend', value)}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select your monthly spend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1k">Under $1,000</SelectItem>
                      <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="over-50k">Over $50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Primary Advertising Platform
                </label>
                <Select onValueChange={(value) => handleSelectChange('primaryPlatform', value)}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select your main platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amazon">Amazon</SelectItem>
                    <SelectItem value="walmart">Walmart</SelectItem>
                    <SelectItem value="meta">Facebook/Instagram</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                    <SelectItem value="multiple">Multiple Platforms</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Business Goals
                </label>
                <Textarea
                  name="businessGoals"
                  value={formData.businessGoals}
                  onChange={handleChange}
                  rows={4}
                  className="text-lg border-slate-300 resize-none"
                  placeholder="What are your main business objectives? (e.g., increase sales, improve ROAS, expand to new markets)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Challenges
                </label>
                <Textarea
                  name="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={handleChange}
                  rows={4}
                  className="text-lg border-slate-300 resize-none"
                  placeholder="What advertising challenges are you facing? (e.g., high CPC, low conversion rates, account management issues)"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Processing Your Request...
                  </div>
                ) : (
                  <>
                    Get My Free $2,000 Audit
                    <Send className="ml-3 w-6 h-6" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-slate-500">
                No spam, ever. We'll send you a detailed audit report within 24-48 hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FreeAuditForm;

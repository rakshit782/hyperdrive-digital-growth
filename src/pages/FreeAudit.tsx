
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Search, TrendingUp, Target } from "lucide-react";

const FreeAudit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    platform: "",
    monthlyAdSpend: "",
    goals: "",
    currentChallenges: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Free audit form submitted:", formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    "Complete account audit and analysis",
    "Keyword opportunity identification", 
    "Competitor analysis insights",
    "Performance optimization recommendations",
    "Custom strategy roadmap",
    "ROI improvement projections"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Free <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Advertising Audit</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Get a comprehensive analysis of your current advertising performance and discover opportunities for growth - completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Form and Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Audit Form */}
            <Card className="bg-white border shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Request Your Free Audit</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll analyze your advertising performance within 48 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Your company"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website URL</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://yourwebsite.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="platform">Primary Advertising Platform</Label>
                      <Select value={formData.platform} onValueChange={(value) => handleInputChange("platform", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="amazon">Amazon</SelectItem>
                          <SelectItem value="walmart">Walmart</SelectItem>
                          <SelectItem value="meta">Meta (Facebook/Instagram)</SelectItem>
                          <SelectItem value="google">Google Ads</SelectItem>
                          <SelectItem value="multiple">Multiple Platforms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="monthlyAdSpend">Monthly Ad Spend</Label>
                      <Select value={formData.monthlyAdSpend} onValueChange={(value) => handleInputChange("monthlyAdSpend", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
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
                    <Label htmlFor="goals">Advertising Goals</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => handleInputChange("goals", e.target.value)}
                      placeholder="What are your main advertising objectives? (e.g., increase sales, improve ROAS, expand market share)"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentChallenges">Current Challenges</Label>
                    <Textarea
                      id="currentChallenges"
                      value={formData.currentChallenges}
                      onChange={(e) => handleInputChange("currentChallenges", e.target.value)}
                      placeholder="What challenges are you facing with your current advertising efforts?"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Get My Free Audit
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">What You'll Get</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0">
                  <CardContent className="p-6 text-center">
                    <Search className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Deep Analysis</h4>
                    <p className="text-slate-600 text-sm">We'll analyze every aspect of your campaigns to identify hidden opportunities.</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-0">
                  <CardContent className="p-6 text-center">
                    <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Custom Strategy</h4>
                    <p className="text-slate-600 text-sm">Receive a personalized roadmap tailored to your business goals.</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Growth Projections</h4>
                    <p className="text-slate-600 text-sm">See projected improvements in performance and ROI with our recommendations.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FreeAudit;

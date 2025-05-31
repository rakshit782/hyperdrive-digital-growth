
import Header from "@/components/Header";
import FreeAuditForm from "@/components/FreeAuditForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Target, DollarSign, Users, Clock } from "lucide-react";

const FreeAudit = () => {
  const benefits = [
    {
      icon: BarChart3,
      title: "Performance Analysis",
      description: "Deep dive into your campaign metrics, ROAS, and conversion data"
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Identify untapped potential and scaling opportunities"
    },
    {
      icon: Target,
      title: "Optimization Recommendations",
      description: "Actionable strategies to improve your advertising performance"
    },
    {
      icon: DollarSign,
      title: "Cost Reduction",
      description: "Find ways to reduce wasted spend and improve efficiency"
    },
    {
      icon: Users,
      title: "Expert Insights",
      description: "Get recommendations from certified advertising professionals"
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Receive your comprehensive audit within 24-48 hours"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechGear Pro",
      text: "The free audit revealed $15K in wasted spend. Within 3 months, we increased our ROAS by 280%!",
      result: "280% ROAS Increase"
    },
    {
      name: "Michael Chen",
      company: "GreenLife Products",
      text: "AMZ AD SCOUT's audit identified key optimization opportunities that doubled our monthly revenue.",
      result: "Revenue Doubled"
    },
    {
      name: "Emily Rodriguez",
      company: "StyleCraft Fashion",
      text: "Their detailed analysis helped us reduce ACOS by 45% while scaling our campaigns significantly.",
      result: "45% ACOS Reduction"
    }
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
              Get a comprehensive analysis of your advertising performance with actionable recommendations 
              to improve your ROAS, reduce costs, and scale your business.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-green-200/50">
              <span className="text-sm font-semibold text-green-600 tracking-wide">
                ✨ 100% FREE • NO COMMITMENT • DELIVERED IN 24-48 HOURS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">What's Included in Your Free Audit</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Form */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <FreeAuditForm />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">What Our Clients Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900">{testimonial.name}</CardTitle>
                      <CardDescription className="text-blue-600 font-semibold">{testimonial.company}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">{testimonial.result}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-white border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Is the audit really free?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Yes, absolutely! Our audit is 100% free with no strings attached. We provide detailed insights and recommendations regardless of whether you choose to work with us afterward.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">How long does it take to receive my audit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  You'll receive your comprehensive audit report within 24-48 hours of submitting your information and required reports.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">What reports do I need to provide?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  For Amazon audits, we need your Business Report, Sponsored Product Search Term Report, and Advertised ASIN Report from the last 30 days. These can be downloaded directly from your Amazon Seller Central or Amazon Advertising Console.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Absolutely. We treat all client data with the highest level of confidentiality and security. Your information is only used for the audit analysis and is never shared with third parties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeAudit;

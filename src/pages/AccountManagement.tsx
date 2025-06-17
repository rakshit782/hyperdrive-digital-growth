import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, BarChart3, Zap, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";

const AccountManagement = () => {
  const features = [
    {
      title: "Dedicated Account Manager",
      description: "A single point of contact to understand your business and advertising goals.",
      icon: Users,
    },
    {
      title: "Performance Monitoring",
      description: "Continuous tracking and analysis of your advertising campaigns to identify areas for improvement.",
      icon: BarChart3,
    },
    {
      title: "Fraud Prevention",
      description: "Advanced strategies to protect your accounts from fraudulent activities and ensure ad spend efficiency.",
      icon: Shield,
    },
    {
      title: "Customized Reporting",
      description: "Tailored reports to provide clear insights into your advertising performance and ROI.",
      icon: TrendingUp,
    },
    {
      title: "A/B Testing",
      description: "Systematic experimentation to optimize ad creatives, targeting, and bidding strategies.",
      icon: Zap,
    },
    {
      title: "Regular Strategy Reviews",
      description: "Scheduled meetings to discuss performance, insights, and strategic adjustments.",
      icon: CheckCircle,
    },
  ];

  const stats = [
    { label: "Client Retention Rate", value: "95%" },
    { label: "Average ROI Increase", value: "40%" },
    { label: "Ad Spend Efficiency", value: "30%" },
  ];

  const testimonials = [
    {
      name: "Jane Doe",
      title: "CEO, Tech Solutions Inc.",
      quote: "Their account management service has transformed our advertising ROI. Highly recommended!",
    },
    {
      name: "John Smith",
      title: "Marketing Director, E-Commerce Co.",
      quote: "The level of support and expertise we receive is unparalleled. They truly care about our success.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
            Maximize Your Advertising ROI with Expert <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Account Management</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Dedicated account managers, performance monitoring, and fraud prevention strategies to optimize your advertising campaigns.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl">
            Get a Free Consultation
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Key <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our account management services are designed to provide you with the support and expertise you need to succeed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                    <feature.icon className="mr-2 w-5 h-5 text-blue-600" />
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 via-white to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We are committed to delivering exceptional results for our clients. Here are some key stats:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients</span> Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Don't just take our word for it. See what our clients have to say about our account management services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent>
                  <p className="text-slate-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-slate-500">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50/30 via-white to-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">
            Ready to Transform Your Advertising Performance?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Contact us today for a free consultation and discover how our expert account management services can help you achieve your advertising goals.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl">
            Get Started Now
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AccountManagement;

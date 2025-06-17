import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, TrendingUp, Zap, CheckCircle, ArrowRight } from "lucide-react";

const MetaAdvertising = () => {
  const features = [
    {
      icon: Users,
      title: "Audience Targeting",
      description: "Reach your ideal customers with precision targeting options.",
    },
    {
      icon: Target,
      title: "Campaign Optimization",
      description: "Maximize your ROI with data-driven campaign optimization strategies.",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Monitor your campaign performance with detailed analytics and reporting.",
    },
    {
      icon: Zap,
      title: "Creative Solutions",
      description: "Engage your audience with visually stunning and high-converting ad creatives.",
    },
  ];

  const stats = [
    { label: "Increased Conversion Rate", value: "45%" },
    { label: "Reduced Cost Per Acquisition", value: "30%" },
    { label: "Improved Ad Relevance Score", value: "20%" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Marketing Manager",
      company: "Tech Solutions Inc.",
      quote:
        "Meta Advertising helped us achieve unprecedented growth and engagement with our target audience. Their expertise and support are invaluable.",
    },
    {
      name: "David Lee",
      title: "CEO",
      company: "Global Innovations Ltd.",
      quote:
        "We saw a significant improvement in our ROI after partnering with Meta Advertising. Their data-driven approach and creative solutions are unmatched.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-6 py-20 pt-32">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 tracking-wide">META ADVERTISING</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
              Unlock the Power of <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Meta</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Drive targeted traffic, increase brand awareness, and maximize your ROI with our Meta advertising solutions.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              Get a Free Consultation
            </Button>
          </section>

          {/* Features Section */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <feature.icon className="w-5 h-5 text-blue-600 mr-2" />
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </section>

          {/* Stats Section */}
          <section className="grid md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-md">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </section>

          {/* Testimonials Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">What Our Clients Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <p className="text-slate-600 italic mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <div className="font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-sm text-slate-500">{testimonial.title}, {testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Ready to Transform Your Meta Advertising?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Contact us today to learn how our Meta advertising solutions can help you achieve your business goals.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl">
              Get Started Now
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MetaAdvertising;

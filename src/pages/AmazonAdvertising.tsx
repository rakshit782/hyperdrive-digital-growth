import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, BarChart3, Zap, CheckCircle, ArrowRight } from "lucide-react";

const AmazonAdvertising = () => {
  const features = [
    {
      title: "Enhanced Brand Visibility",
      description: "Increase your brand's visibility on Amazon through strategic advertising placements.",
      icon: TrendingUp,
    },
    {
      title: "Targeted Advertising",
      description: "Reach your ideal customers with precision using Amazon's advanced targeting options.",
      icon: Target,
    },
    {
      title: "Performance Tracking",
      description: "Monitor your campaign's performance in real-time and make data-driven optimizations.",
      icon: BarChart3,
    },
    {
      title: "Maximize ROI",
      description: "Optimize your advertising spend to achieve the highest possible return on investment.",
      icon: Zap,
    },
  ];

  const stats = [
    { label: "Increased Sales", value: "30%" },
    { label: "Improved Conversion Rate", value: "15%" },
    { label: "Reduced ACoS", value: "20%" },
  ];

  const testimonials = [
    {
      name: "John Doe",
      title: "CEO of Tech Innovations",
      quote: "Amazon Advertising helped us significantly increase our product visibility and sales. Highly recommended!",
    },
    {
      name: "Jane Smith",
      title: "Marketing Director at Fashion Forward",
      quote: "We saw a remarkable improvement in our conversion rates after implementing Amazon Advertising strategies.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
            Dominate Amazon with <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Strategic Advertising</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Unlock the full potential of Amazon's advertising platform and drive exponential growth for your business.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Get a Free Consultation
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Key Benefits</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how our Amazon Advertising strategies can transform your business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <feature.icon className="w-5 h-5 text-blue-600" />
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
      <section className="py-20 bg-gradient-to-br from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Our Results</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See the impact of our Amazon Advertising expertise.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-lg text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">What Our Clients Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Read testimonials from businesses that have achieved success with our Amazon Advertising services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent>
                  <p className="text-slate-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">
            Ready to Elevate Your Amazon Presence?
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Contact us today for a free consultation and discover how we can help you achieve your business goals on Amazon.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Schedule a Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AmazonAdvertising;

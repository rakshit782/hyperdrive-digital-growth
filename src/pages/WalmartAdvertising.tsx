import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Target, TrendingUp, Zap, CheckCircle, ArrowRight } from "lucide-react";

const WalmartAdvertising = () => {
  const features = [
    {
      title: "Enhanced Product Visibility",
      description: "Increase your product's visibility on Walmart's marketplace, driving more traffic and sales.",
      icon: Target,
    },
    {
      title: "Targeted Advertising Campaigns",
      description: "Reach your ideal customers with precision using Walmart's advanced targeting options.",
      icon: TrendingUp,
    },
    {
      title: "Real-Time Performance Tracking",
      description: "Monitor your campaign's performance in real-time, making data-driven decisions to optimize your ROI.",
      icon: BarChart3,
    },
    {
      title: "Automated Campaign Management",
      description: "Save time and resources with our automated campaign management tools, designed to streamline your advertising efforts.",
      icon: Zap,
    },
  ];

  const stats = [
    { label: "Increased Sales", value: "30%" },
    { label: "Improved ROI", value: "25%" },
    { label: "Higher Conversion Rate", value: "15%" },
  ];

  const testimonials = [
    {
      name: "Jane Doe",
      title: "CEO of Acme Corp",
      quote: "Walmart Advertising helped us significantly increase our sales and reach a wider audience.",
    },
    {
      name: "John Smith",
      title: "Marketing Manager at Beta Co",
      quote: "We saw a noticeable improvement in our ROI after implementing Walmart's advertising solutions.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50/30 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
            Dominate <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-blue-600 bg-clip-text text-transparent">Walmart</span> Marketplace
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Unlock the full potential of your products on Walmart with our expert advertising strategies.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-orange-600 via-yellow-600 to-blue-600 hover:from-orange-700 hover:via-yellow-700 hover:to-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl">
            Get a Free Consultation
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
              <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 tracking-wide">KEY FEATURES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Why Choose <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">Walmart Advertising</span>?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Maximize your reach and ROI with our tailored Walmart advertising solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <feature.icon className="w-6 h-6 text-orange-500 mb-4" />
                  <CardTitle className="text-xl font-bold text-slate-900">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 via-white to-orange-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 tracking-wide">OUR IMPACT</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Proven <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how we've helped businesses like yours thrive on Walmart.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-orange-600">{stat.value}</CardTitle>
                  <CardDescription className="text-slate-600">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
              <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 tracking-wide">HAPPY CLIENTS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              What Our Clients <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real stories from businesses that have achieved success with Walmart Advertising.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <p className="text-slate-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-blue-50/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">
            Ready to <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">Transform</span> Your Walmart Presence?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Contact us today to learn how our Walmart advertising services can help you achieve your business goals.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-orange-600 via-yellow-600 to-blue-600 hover:from-orange-700 hover:via-yellow-700 hover:to-blue-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl">
            Get Started Now
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WalmartAdvertising;

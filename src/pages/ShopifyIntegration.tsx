import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Link, BarChart3, Zap, CheckCircle, ArrowRight, Code } from "lucide-react";

const ShopifyIntegration = () => {
  const features = [
    {
      title: "Custom Theme Development",
      description: "Bespoke Shopify themes tailored to your brand's unique identity.",
      icon: Code,
    },
    {
      title: "App Integration",
      description: "Seamless integration of powerful apps to enhance your store's functionality.",
      icon: Link,
    },
    {
      title: "Performance Optimization",
      description: "Enhance your store's speed and SEO for better visibility and customer experience.",
      icon: BarChart3,
    },
    {
      title: "Payment Gateway Setup",
      description: "Secure and reliable payment gateway integration for smooth transactions.",
      icon: Zap,
    },
    {
      title: "Ongoing Support",
      description: "Continuous support and maintenance to keep your store running smoothly.",
      icon: CheckCircle,
    },
  ];

  const stats = [
    { label: "Conversion Rate Increase", value: "+35%" },
    { label: "Mobile Traffic Growth", value: "+50%" },
    { label: "Customer Retention", value: "+25%" },
  ];

  const testimonials = [
    {
      name: "Jane Doe",
      title: "CEO, Tech Gadgets Inc.",
      quote: "Their Shopify integration expertise transformed our online store. Highly recommended!",
    },
    {
      name: "John Smith",
      title: "Founder, EcoFriendly Goods",
      quote: "We saw a significant boost in sales after their performance optimization. Fantastic work!",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50/30 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
            Seamless <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Shopify Integration</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Unlock the full potential of your e-commerce store with our expert Shopify integration services.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Key <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore the features that make our Shopify integration services stand out.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Proven <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how our Shopify integration services have helped businesses thrive.
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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients</span> Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Read testimonials from satisfied clients who have benefited from our Shopify integration services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent>
                  <p className="text-slate-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-slate-500">{testimonial.title}</div>
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
            Ready to Transform Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Shopify Store</span>?
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Contact us today to learn more about our Shopify integration services and how we can help you achieve your e-commerce goals.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl">
            Get a Free Consultation
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ShopifyIntegration;

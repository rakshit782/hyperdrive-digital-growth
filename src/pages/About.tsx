import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on measurable outcomes that drive real business growth and ROI for our clients."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Every strategy is tailored to your unique business needs and goals, ensuring personalized success."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from strategy to execution."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We stay ahead of industry trends and leverage cutting-edge tools and techniques."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "15+ years in digital marketing with expertise in Amazon advertising and e-commerce growth."
    },
    {
      name: "Michael Chen",
      role: "Head of Amazon Advertising",
      description: "Former Amazon employee with deep knowledge of advertising algorithms and optimization."
    },
    {
      name: "Emily Rodriguez",
      role: "Walmart Marketplace Specialist",
      description: "Specialist in Walmart advertising with 8+ years of marketplace experience."
    },
    {
      name: "David Thompson",
      role: "Meta Advertising Director",
      description: "Expert in social media advertising with proven track record in scaling campaigns."
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
              About <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">AMZ AD SCOUT</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We're a dedicated team of digital marketing experts specializing in Amazon, Walmart, and Meta advertising. 
              Our mission is to help businesses scale their online presence and maximize their advertising ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">Our Story</h2>
            <div className="prose prose-lg mx-auto text-slate-600">
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2019, AMZ AD SCOUT began as a small team of passionate marketers who recognized 
                the growing complexity of digital advertising across major platforms. What started as a 
                specialized Amazon advertising consultancy has evolved into a comprehensive growth agency.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Today, we manage over $50M in annual ad spend across Amazon, Walmart, and Meta platforms, 
                helping hundreds of businesses achieve their growth objectives. Our data-driven approach 
                and deep platform expertise have consistently delivered results that exceed client expectations.
              </p>
              <p className="text-lg leading-relaxed">
                We believe in transparent communication, continuous optimization, and building long-term 
                partnerships with our clients. Every campaign we manage is treated with the same dedication 
                and strategic thinking as if it were our own business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Work With Us?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help scale your business with our proven advertising strategies.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-xl"
            onClick={() => window.location.href = '/contact'}
          >
            Get Started Today
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, Users, Award, CheckCircle, Star, ArrowRight, TrendingUp, Zap, Globe, BarChart3 } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState({
    heroTitle: 'Your E-commerce Growth Partner',
    heroSubtitle: '900+ Happy Clients Served',
    heroDescription: "Premier agency with 9+ years expertise in Amazon advertising, Walmart optimization, and Shopify development. Our data-driven approach delivers measurable ROI across all major marketplaces.",
    missionText: 'To revolutionize e-commerce success through cutting-edge advertising strategies and marketplace optimization. We combine advanced analytics, AI-driven insights, and proven methodologies to maximize revenue and dominate categories.',
    visionText: 'To become the global leader in e-commerce growth solutions, transforming brands through innovative strategies and scalable systems. We envision every business having access to enterprise-level expertise to compete and win.'
  });

  useEffect(() => {
    const savedAbout = localStorage.getItem('about_data');
    if (savedAbout) {
      setAboutData(JSON.parse(savedAbout));
    }
  }, []);
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We believe in transparent communication and honest reporting. Your success is our success."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every strategy we implement is focused on delivering measurable results and ROI."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work as an extension of your team, collaborating closely to achieve your goals."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We continuously innovate and optimize to stay ahead of industry trends and changes."
    }
  ];

  const services = [
    "Advertising Management for Amazon Sellers - PPC Management",
    "Listing Optimization Services - A+ Content Creation", 
    "Walmart Advertising Management - Marketplace Specialists",
    "E-commerce Product Cataloging Services",
    "Shopify Development - Custom Theme Development",
    "Multi-Marketplace Integration Services",
    "Professional Shopify Developers - Store Experts",
    "Marketplace Advertising Management - Sponsored Products",
    "E-commerce Channel Management Solutions"
  ];

  const whyChooseUs = [
    {
      title: "Proven Track Record",
      description: "500+ brands scaled profitably with 50K+ successful campaigns achieving an average ROAS of 10x across all marketplaces"
    },
    {
      title: "Experienced Team",
      description: "Industry specialists with 50+ years combined experience in e-commerce advertising and marketplace management"
    },
    {
      title: "Advanced Data Analytics",
      description: "Proprietary analytics platform providing real-time insights, predictive modeling, and automated optimization"
    },
    {
      title: "White-Glove Service",
      description: "Dedicated account managers, weekly strategy calls, transparent reporting, and responsive support for all clients"
    }
  ];

  const stats = [
    { value: "500+", label: "Brands Scaled", icon: Users },
    { value: "10x", label: "Average ROAS", icon: TrendingUp },
    { value: "9+", label: "Years Experience", icon: Award },
    { value: "$50M+", label: "Ad Spend Managed", icon: BarChart3 }
  ];

  return (
    <>
      <SEOHead 
        title="About Us - E-commerce Growth Specialists | 10+ Years Proven Results"
        description="Independent e-commerce advertising specialists with 10+ years expertise helping brands succeed on Amazon, Walmart & Shopify. 500+ brands scaled profitably. We are not affiliated with or endorsed by Amazon."
        keywords="e-commerce advertising specialists, advertising for amazon sellers, walmart marketplace optimization, shopify development, digital marketing services, ppc management services, e-commerce optimization, multi-channel marketing, online marketplace advertising, seller solutions, performance marketing, roi-focused marketing, data-driven e-commerce, marketplace management, listing optimization, product catalog management, e-commerce growth, online retail marketing"
        canonical={window.location.href}
      />
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-semibold">
                <Star className="w-4 h-4 mr-2 inline-block" />
                Award-Winning Agency
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {aboutData.heroTitle}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl font-semibold text-foreground/80 mb-4">
                {aboutData.heroSubtitle}
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                {aboutData.heroDescription}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/contact')}
                  className="group"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/case-studies')}
                >
                  View Case Studies
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all hover:shadow-lg group">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border hover:border-primary/50 transition-all hover:shadow-xl group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Target className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground">
                      Our Mission
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {aboutData.missionText}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:border-primary/50 transition-all hover:shadow-xl group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-7 h-7 text-secondary" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground">
                      Our Vision
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {aboutData.visionText}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Our Foundation
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Core Values That Drive Us
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do and shape our culture
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="border-border hover:border-primary/50 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                    <CardHeader>
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-bold text-foreground">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Globe className="w-3 h-3 mr-2" />
                Our Expertise
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Comprehensive E-commerce Solutions
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Full-service digital marketing to accelerate your online growth
              </p>
            </div>

            <Card className="border-border overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="mt-1">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-foreground font-medium text-sm leading-relaxed">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                The Agency Advantage
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why Leading Brands Choose Us
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the difference that true e-commerce expertise makes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-foreground flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <span className="pt-1">{item.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-[3.75rem]">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-5xl mx-auto px-6">
            <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-12 md:p-16">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-6">
                      <Star className="w-3 h-3 mr-2" />
                      Start Your Growth Journey
                    </Badge>
                    
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                      Ready to Scale Your Business?
                    </h2>
                    
                    <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                      Join 900+ successful clients and start achieving breakthrough results with our proven strategies
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg"
                        onClick={() => navigate('/contact')}
                        className="group"
                      >
                        Get Free Strategy Session
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/case-studies')}
                      >
                        Explore Success Stories
                      </Button>
                    </div>
                  </div>
                </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;

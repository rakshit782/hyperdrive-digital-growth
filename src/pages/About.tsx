import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, Users, Award, CheckCircle, Star, ArrowRight, TrendingUp, Zap, Globe, BarChart3 } from "lucide-react";

const About = () => {
  const [aboutData, setAboutData] = useState({
    heroTitle: 'About AMZ AD SCOUT: E-commerce Growth Agency Since 2015',
    heroSubtitle: 'Amazon, Walmart, Meta & Google Ads, Managed from New York',
    heroDescription: "Founded in 2015 and headquartered in New York, AMZ AD SCOUT manages advertising for e-commerce brands on Amazon, Walmart, Meta and Google, plus listing optimization, product cataloging and Shopify development. Our performance target: 5% ACoS or 20x ROAS.",
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
    { name: "Amazon Advertising (PPC) Management", to: "/services/amazon-advertising" },
    { name: "Walmart Advertising Management", to: "/services/walmart-advertising" },
    { name: "Meta Advertising (Facebook & Instagram)", to: "/services/meta-advertising" },
    { name: "Google Ads Management", to: "/services/google-advertising" },
    { name: "Amazon Listing Optimization & A+ Content", to: "/services/listing-optimization" },
    { name: "E-commerce Product Cataloging", to: "/services/product-cataloging" },
    { name: "Shopify Store Development", to: "/services/shopify-development" },
    { name: "Shopify Multi-Marketplace Integration", to: "/services/shopify-integration" },
    { name: "E-commerce Account Management", to: "/services/account-management" }
  ];

  const whyChooseUs = [
    {
      title: "One Clear Performance Target",
      description: "Every account we manage works toward the same goal: 5% ACoS or 20x ROAS, so you always know what we are aiming for"
    },
    {
      title: "Realistic Timelines",
      description: "Existing accounts typically see results in 2-3 months. New accounts take 6-7 months to build data and momentum"
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
    { value: "2015", label: "Founded", icon: Award },
    { value: "5% ACoS", label: "or 20x ROAS target", icon: TrendingUp },
    { value: "4", label: "Ad Channels Managed", icon: BarChart3 },
    { value: "NYC", label: "Headquarters", icon: Globe }
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.amzadscout.com/#organization",
        "name": "AMZ AD SCOUT",
        "url": "https://www.amzadscout.com/",
        "logo": "https://www.amzadscout.com/logo.png",
        "description": "E-commerce growth agency managing Amazon, Walmart, Meta and Google ads for brands.",
        "foundingDate": "2015",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "WeWork 5th Floor, 18 W 18th St",
          "addressLocality": "New York",
          "addressRegion": "NY",
          "postalCode": "10011",
          "addressCountry": "US"
        },
        "sameAs": ["https://www.linkedin.com/company/amz-adscout/"]
      },
      {
        "@type": "AboutPage",
        "@id": "https://www.amzadscout.com/about#webpage",
        "url": "https://www.amzadscout.com/about",
        "name": "About Us: E-commerce Growth Agency Since 2015 | AMZ AD SCOUT",
        "about": { "@id": "https://www.amzadscout.com/#organization" }
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="About Us: E-commerce Growth Agency Since 2015 | AMZ AD SCOUT"
        description="Founded in 2015 and based in New York, AMZ AD SCOUT manages Amazon, Walmart, Meta and Google ads for e-commerce brands. See how we work and get a free audit."
        schema={aboutSchema}
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
                Since 2015
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
                  asChild
                  size="lg" 
                  className="group"
                >
                  <Link to="/contact" aria-label="Get Free Consultation — Contact">
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline"
                >
                  <Link to="/case-studies">View Case Studies</Link>
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
                      <Link to={service.to} className="text-foreground font-medium text-sm leading-relaxed hover:text-primary">{service.name}</Link>
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
                Why E-commerce Brands Choose AMZ AD SCOUT
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
                      Get a free audit of your Amazon, Walmart, Meta or Google ads. We'll show you where spend is being wasted and what we'd change first.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        asChild
                        size="lg"
                        className="group"
                      >
                        <Link to="/contact" aria-label="Get Free Strategy Session — Contact">
                          Get Free Strategy Session
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button 
                        asChild
                        size="lg"
                        variant="outline"
                      >
                        <Link to="/case-studies">Explore Success Stories</Link>
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

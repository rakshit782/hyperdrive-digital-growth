import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, Award, CheckCircle, Star, ArrowRight } from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState({
    heroTitle: 'Top E-commerce Digital Marketing Agency - 10 Years of Proven Results',
    heroDescription: "We're a certified team of E-commerce Advertising Experts with 10+ years experience delivering proven growth strategies. Specialized in Amazon PPC Management, Walmart Advertising, Shopify Development, and Multi-Marketplace Integration for online retailers.",
    missionText: 'To empower e-commerce businesses with expert-level advertising management and proven growth strategies. As a leading Amazon Advertising Agency and Walmart Connect Partner, we deliver measurable growth through data-driven digital marketing solutions.',
    visionText: 'To be recognized as the most trusted E-commerce Digital Marketing Agency worldwide, known for delivering exceptional results through innovative Amazon PPC strategies, professional Shopify development, and comprehensive multi-marketplace integration services.'
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
    "Amazon Advertising Agency - PPC Management Service",
    "Amazon Listing Optimization Service - A+ Content Creation", 
    "Walmart Advertising Agency - Walmart Connect Partner",
    "E-commerce Product Cataloging Services",
    "Shopify Development Partner - Custom Theme Development",
    "Multi-Marketplace Integration Agency",
    "Professional Shopify Developers - Shopify Plus Experts",
    "Amazon DSP Agency - Amazon Sponsored Products Management",
    "E-commerce Channel Management Solutions"
  ];

  const whyChooseUs = [
    {
      title: "Proven Track Record",
      description: "10K+ successful campaigns with an average ROAS of 10x"
    },
    {
      title: "Expert Team",
      description: "Certified professionals across all major advertising platforms"
    },
    {
      title: "Data-Driven Approach",
      description: "Every decision backed by comprehensive analytics and market research"
    },
    {
      title: "Dedicated Support",
      description: "Your dedicated account manager ensures personalized attention"
    }
  ];

  return (
    <>
      <SEOHead 
        title="About Us - Premier E-commerce Digital Marketing Agency | 10+ Years Proven Results"
        description="Leading E-commerce Digital Marketing Agency with 10+ years experience. Certified Amazon Advertising Agency, Walmart Connect Partner, and Shopify Development Partner. Proven E-commerce Growth Strategies for 500+ successful clients."
        keywords="e-commerce digital marketing agency, amazon advertising agency, walmart connect partner, shopify development partner, amazon ppc management, professional amazon agency, certified advertising experts, e-commerce growth strategies, multi-marketplace integration, amazon seller central management, vendor central consulting, walmart marketplace advertising, shopify plus developers, e-commerce consulting services, amazon dsp agency, sponsored products management, sponsored brands campaigns, product listing optimization, a+ content creation, enhanced brand content, amazon storefront design, brand registry services, e-commerce photography, product photography services, lifestyle photography, infographic design services, amazon seo optimization, keyword research services, product launch strategy, conversion rate optimization, roi optimization services, data-driven marketing, performance marketing agency, customer acquisition strategy, retention marketing, remarketing campaigns, amazon analytics, competitive analysis, market research services, profit margin optimization, inventory management consulting, supply chain optimization, fulfillment strategy, fba consulting, fbm strategy consulting, international expansion services, global marketplace strategy, cross-border e-commerce, localization services, account health management, suspension prevention, reinstatement services, review management, customer service optimization, ranking strategy, category domination, seasonal campaign planning, prime day strategy, black friday strategy, cyber monday planning, q4 planning services, budget management, acos optimization, tacos management, roas maximization, scalable growth strategies"
        canonical={window.location.href}
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        {/* Hero Section */}
        <section className="py-20 md:py-28 lg:py-36">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-6 leading-tight">
              {aboutData.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {aboutData.heroDescription}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-card/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {aboutData.missionText}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-secondary" />
                    </div>
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {aboutData.visionText}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-slate-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed">
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
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-slate-900 mb-4">
                  What We Do
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Comprehensive digital marketing services to grow your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-slate-600">
                What sets us apart in the digital marketing landscape
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
              <CardContent className="py-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Grow Your Business?
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  Let's discuss how we can help you achieve your digital marketing goals
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => navigate('/contact')}
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => navigate("/case-studies")}
                  >
                    View Our Work
                  </Button>
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

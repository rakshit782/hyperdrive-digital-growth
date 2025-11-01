import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, Award, CheckCircle, Star, ArrowRight } from "lucide-react";

const About = () => {
  const [aboutData, setAboutData] = useState({
    heroTitle: 'About Our Agency',
    heroDescription: "We're a team of digital marketing experts passionate about helping businesses achieve extraordinary growth through strategic advertising and innovative solutions.",
    missionText: 'To empower businesses with cutting-edge digital marketing strategies that drive measurable growth and sustainable success. We believe every business deserves access to expert-level advertising management and strategic guidance.',
    visionText: 'To become the most trusted digital growth partner for businesses worldwide, known for delivering exceptional results, innovative strategies, and unparalleled client service in the digital marketing space.'
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
    "Amazon Advertising Management",
    "Google Ads Optimization", 
    "Meta Advertising Campaigns",
    "Walmart Marketplace Marketing",
    "Website Development",
    "Shopify Store Development",
    "Account Management Services"
  ];

  const whyChooseUs = [
    {
      title: "Proven Track Record",
      description: "Over 500+ successful campaigns with an average 300% ROAS improvement"
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
        title="About Us - Digital Growth Agency"
        description="Learn about our mission to help businesses grow through strategic digital marketing and advertising solutions."
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              {aboutData.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              {aboutData.heroDescription}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                    <Target className="w-6 h-6 mr-3 text-blue-600" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {aboutData.missionText}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                    <Star className="w-6 h-6 mr-3 text-purple-600" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed text-lg">
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
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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

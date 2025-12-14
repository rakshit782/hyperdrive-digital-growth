import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Award, CheckCircle, TrendingUp, Users, Target, BarChart3, Shield, Zap } from "lucide-react";

const AmazonAdsPartner = () => {
  const benefits = [
    {
      icon: Award,
      title: "Experienced Team",
      description: "Our team has extensive experience managing advertising campaigns for brands selling on Amazon."
    },
    {
      icon: TrendingUp,
      title: "Proven Strategies",
      description: "Access to advanced tools and data-driven strategies that deliver measurable results."
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personalized account management with responsive support for all your advertising needs."
    },
    {
      icon: Target,
      title: "Results-Focused",
      description: "Track record of delivering exceptional ROI for brands across diverse categories."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Approach",
      description: "Leverage advanced analytics and reporting tools to optimize campaign performance."
    },
    {
      icon: CheckCircle,
      title: "Best Practices",
      description: "All campaigns follow advertising best practices and platform guidelines."
    }
  ];

  const stats = [
    { value: "500+", label: "Brands Scaled" },
    { value: "10x", label: "Average ROAS" },
    { value: "$50M+", label: "Ad Spend Managed" },
    { value: "$250M+", label: "Revenue Generated" }
  ];

  return (
    <>
      <Helmet>
        <title>Advertising Management for Amazon Sellers | AMZ AD SCOUT</title>
        <meta name="description" content="AMZ AD SCOUT provides expert advertising management services for brands selling on Amazon. We are an independent service provider - not affiliated with or endorsed by Amazon." />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-36 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-500 text-sm font-medium">E-commerce Growth Specialists</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Advertising Management for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Amazon Sellers
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                  AMZ AD SCOUT helps brands achieve advertising success on Amazon through 
                  expert campaign management and data-driven optimization strategies.
                </p>
                
                {/* Disclaimer */}
                <p className="text-sm text-slate-400 mb-8 italic">
                  We are not affiliated with or endorsed by Amazon.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 w-full sm:w-auto">
                      Get Free Consultation
                    </Button>
                  </Link>
                  <Link to="/case-studies">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                      View Success Stories
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Right Content - Services Highlight */}
              <div className="flex flex-col items-center lg:items-end">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">Our Services Include:</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-500" />
                      PPC Campaign Management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-500" />
                      Listing Optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-500" />
                      Keyword Research & Strategy
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-amber-500" />
                      Performance Analytics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">{stat.value}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 text-sm font-medium">Our Expertise</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Brands Choose AMZ AD SCOUT
              </h2>
              <p className="text-lg text-slate-600">
                We bring years of experience helping brands succeed with their 
                advertising campaigns on Amazon and other major marketplaces.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index}
                  className="group bg-white rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-7 h-7 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 mb-4">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700 text-sm font-medium">Your Growth Partner</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Helping Brands Advertise on Amazon
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Our experienced team provides comprehensive advertising management 
                  services tailored to help your brand succeed on Amazon.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Data-driven campaign optimization",
                    "Dedicated account management team",
                    "Transparent reporting and analytics",
                    "Continuous performance monitoring",
                    "Strategic growth planning"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                
                {/* Disclaimer */}
                <p className="text-sm text-slate-500 mt-6 italic">
                  We are an independent service provider and are not affiliated with or endorsed by Amazon.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Grow Your Amazon Business?</h3>
                <p className="text-white/90 mb-8">
                  Get a free audit of your current advertising performance and discover 
                  how our expertise can drive better results for your brand.
                </p>
                <div className="space-y-4">
                  <Link to="/contact" className="block">
                    <Button size="lg" className="bg-white text-amber-600 hover:bg-slate-100 font-semibold w-full">
                      Request Free Consultation
                    </Button>
                  </Link>
                  <Link to="/services/amazon-advertising" className="block">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full">
                      Explore Our Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Scale Your Advertising?
            </h2>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              Work with experienced advertising professionals and take your 
              marketplace performance to the next level.
            </p>
            <p className="text-sm text-slate-400 mb-10 italic">
              We are not affiliated with or endorsed by Amazon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8">
                  Request a Free Consultation
                </Button>
              </Link>
              <Link to="/services/amazon-advertising">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AmazonAdsPartner;
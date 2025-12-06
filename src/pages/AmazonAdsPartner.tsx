import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Award, CheckCircle, TrendingUp, Users, Target, BarChart3, Shield, Zap } from "lucide-react";
import amazonAdsPartnerLogo from "@/assets/amazon-ads-partner-logo.png";

const AmazonAdsPartner = () => {
  const benefits = [
    {
      icon: Award,
      title: "Certified Expertise",
      description: "Our team holds official Amazon Ads certifications, ensuring campaigns are managed by qualified professionals."
    },
    {
      icon: TrendingUp,
      title: "Advanced Strategies",
      description: "Access to beta features, advanced tools, and strategies exclusive to Amazon Ads partners."
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Priority access to Amazon Ads support and account management resources."
    },
    {
      icon: Target,
      title: "Proven Results",
      description: "Track record of delivering exceptional ROI for brands across diverse categories."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Approach",
      description: "Leverage advanced analytics and reporting tools to optimize campaign performance."
    },
    {
      icon: CheckCircle,
      title: "Compliance Assured",
      description: "All campaigns adhere to Amazon's advertising policies and best practices."
    }
  ];

  const stats = [
    { value: "500+", label: "Brands Served" },
    { value: "300%+", label: "Average ROAS" },
    { value: "$50M+", label: "Ad Spend Managed" },
    { value: "98%", label: "Client Retention" }
  ];

  return (
    <>
      <Helmet>
        <title>Authorized Amazon Ads Partner | AMZ AD SCOUT</title>
        <meta name="description" content="AMZ AD SCOUT is an authorized Amazon Ads Partner, delivering certified expertise and proven results for your Amazon advertising campaigns." />
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
                  <span className="text-amber-500 text-sm font-medium">Official Partner</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Authorized Partner of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Amazon Ads
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                  AMZ AD SCOUT is proud to be recognized as an authorized Amazon Ads Partner, 
                  demonstrating our commitment to excellence and expertise in Amazon advertising.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://advertising.amazon.com/partners/directory/details/amzn1.ads1.ma1.dspc6lp65lyixfrwl0focrtxh/AMZ-AD-SCOUT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 w-full sm:w-auto">
                      View Our Partner Profile
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                      Get Started Today
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Right Content - Partner Badge */}
              <div className="flex flex-col items-center lg:items-end">
                <a 
                  href="https://advertising.amazon.com/partners/directory/details/amzn1.ads1.ma1.dspc6lp65lyixfrwl0focrtxh/AMZ-AD-SCOUT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <img 
                    src={amazonAdsPartnerLogo} 
                    alt="Amazon Ads Partner Badge"
                    className="h-24 lg:h-32 w-auto"
                  />
                </a>
                <p className="text-slate-400 text-sm mt-4">Verified Partner Badge</p>
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

        {/* What It Means Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 text-sm font-medium">Partner Benefits</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                What Does Being an Amazon Ads Partner Mean?
              </h2>
              <p className="text-lg text-slate-600">
                As an authorized Amazon Ads Partner, we've demonstrated proven expertise, 
                a track record of success, and commitment to delivering exceptional results for our clients.
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
                  <span className="text-amber-700 text-sm font-medium">Why Choose Us</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Partner with Certified Amazon Advertising Experts
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Our Amazon Ads Partner status means you get access to exclusive tools, 
                  strategies, and support that non-partner agencies simply can't provide.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Direct access to Amazon Ads beta features",
                    "Priority support from Amazon's partner team",
                    "Advanced reporting and analytics tools",
                    "Certified campaign management expertise",
                    "Exclusive training and best practices"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Scale Your Amazon Advertising?</h3>
                <p className="text-white/90 mb-8">
                  Get a free audit of your current Amazon advertising performance and discover 
                  how our partner-level expertise can drive better results.
                </p>
                <div className="space-y-4">
                  <Link to="/contact" className="block">
                    <Button size="lg" className="bg-white text-amber-600 hover:bg-slate-100 font-semibold w-full">
                      Request Free Consultation
                    </Button>
                  </Link>
                  <Link to="/services/amazon-advertising" className="block">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full">
                      Explore Amazon Ad Services
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
              Ready to Work with an Authorized Partner?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Partner with a certified Amazon Ads agency and take your advertising to the next level. 
              Experience the difference that expertise makes.
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
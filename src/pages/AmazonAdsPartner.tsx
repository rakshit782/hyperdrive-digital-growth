import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, CheckCircle, TrendingUp, Users, Target, BarChart3 } from "lucide-react";
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

  return (
    <>
      <Helmet>
        <title>Authorized Amazon Ads Partner | AMZ AD SCOUT</title>
        <meta name="description" content="AMZ AD SCOUT is an authorized Amazon Ads Partner, delivering certified expertise and proven results for your Amazon advertising campaigns." />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
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
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a 
                  href="https://advertising.amazon.com/partners/directory/details/amzn1.ads1.ma1.dspc6lp65lyixfrwl0focrtxh/AMZ-AD-SCOUT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8">
                    View Our Partner Profile
                  </Button>
                </a>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Get Started Today
                  </Button>
                </Link>
              </div>
              
              {/* Partner Badge */}
              <div className="flex flex-col items-center gap-4">
                <p className="text-slate-400 text-sm">Verified Partner Badge</p>
                <a 
                  href="https://advertising.amazon.com/partners/directory/details/amzn1.ads1.ma1.dspc6lp65lyixfrwl0focrtxh/AMZ-AD-SCOUT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <img 
                    src={amazonAdsPartnerLogo} 
                    alt="Amazon Ads Partner Badge"
                    className="h-12 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What It Means Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                What Does Being an Amazon Ads Partner Mean?
              </h2>
              <p className="text-lg text-slate-600">
                As an authorized Amazon Ads Partner, we've demonstrated proven expertise, 
                a track record of success, and commitment to delivering exceptional results for our clients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Work with an Authorized Partner?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Partner with a certified Amazon Ads agency and take your advertising to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-amber-600 hover:bg-slate-100 font-semibold px-8">
                  Request a Free Consultation
                </Button>
              </Link>
              <Link to="/services/amazon-advertising">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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

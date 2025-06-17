
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Target, DollarSign, Users } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "E-commerce Brand Scales Amazon Revenue 400%",
      platform: "Amazon",
      industry: "Home & Garden",
      results: {
        revenue: "+400%",
        roas: "6.2x",
        impressions: "+250%"
      },
      description: "Complete account restructure and advanced keyword targeting helped this home goods brand dominate their category on Amazon.",
      link: "/amazon-case-studies"
    },
    {
      title: "Fashion Brand Conquers Walmart Marketplace",
      platform: "Walmart",
      industry: "Fashion & Apparel", 
      results: {
        sales: "+320%",
        conversion: "+45%",
        traffic: "+180%"
      },
      description: "Strategic product positioning and competitive pricing optimization led to market dominance in the fashion category.",
      link: "/walmart-case-studies"
    },
    {
      title: "Tech Startup Achieves 8x ROAS on Meta",
      platform: "Meta",
      industry: "Technology",
      results: {
        roas: "8.3x",
        cpa: "-60%",
        reach: "+400%"
      },
      description: "Precision audience targeting and creative optimization delivered exceptional performance for this SaaS company.",
      link: "/meta-case-studies"
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
              Success <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Stories</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Real results from real businesses. See how we've helped companies across different industries achieve remarkable growth through strategic advertising.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {study.platform}
                    </span>
                    <span className="text-sm text-slate-500">{study.industry}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {study.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(study.results).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{value}</div>
                        <div className="text-xs text-slate-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    onClick={() => window.location.href = study.link}
                  >
                    Read Full Case Study
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Be Our Next Success Story?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-xl"
            onClick={() => window.location.href = '/contact'}
          >
            Get Your Free Audit
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;

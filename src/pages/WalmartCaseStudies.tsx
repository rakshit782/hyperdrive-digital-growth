import { ArrowRight, TrendingUp, DollarSign, Target, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const WalmartCaseStudies = () => {
  const caseStudies = [
    {
      title: "Grocery Brand Marketplace Expansion",
      client: "Fresh Foods Co.",
      challenge: "New to Walmart marketplace with zero visibility",
      solution: "Comprehensive Walmart Connect campaign with sponsored products and display ads",
      results: {
        roasIncrease: "380%",
        salesGrowth: "$850K",
        timeline: "5 months"
      },
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
    },
    {
      title: "Home Improvement Brand Success",
      client: "DIY Solutions",
      challenge: "High competition from established retailers",
      solution: "Strategic keyword targeting and seasonal campaign optimization",
      results: {
        roasIncrease: "420%",
        salesGrowth: "$1.1M",
        timeline: "6 months"
      },
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
    },
    {
      title: "Baby Products Brand Growth",
      client: "Little Angels",
      challenge: "Struggling to reach target demographic effectively",
      solution: "Audience-focused campaigns with enhanced brand content",
      results: {
        roasIncrease: "350%",
        salesGrowth: "$680K",
        timeline: "4 months"
      },
      image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=300&fit=crop"
    },
    {
      title: "Automotive Parts Retailer Breakthrough",
      client: "Auto Express",
      challenge: "Complex product catalog and targeting challenges",
      solution: "Category-specific campaigns with advanced product targeting",
      results: {
        roasIncrease: "460%",
        salesGrowth: "$1.3M",
        timeline: "7 months"
      },
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop"
    },
    {
      title: "Outdoor Gear Brand Market Entry",
      client: "Adventure Gear",
      challenge: "Limited brand recognition on Walmart platform",
      solution: "Brand amplifier campaigns with video content optimization",
      results: {
        roasIncrease: "310%",
        salesGrowth: "$750K",
        timeline: "5 months"
      },
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"
    },
    {
      title: "Health & Wellness Brand Expansion",
      client: "Vitality Plus",
      challenge: "Strict advertising guidelines and compliance issues",
      solution: "Compliant campaign structure with educational content focus",
      results: {
        roasIncrease: "390%",
        salesGrowth: "$920K",
        timeline: "6 months"
      },
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      title: "Electronics Retailer Optimization",
      client: "TechWorld",
      challenge: "Poor campaign performance and high costs",
      solution: "Complete account restructure with automated bidding",
      results: {
        roasIncrease: "450%",
        salesGrowth: "$1.5M",
        timeline: "5 months"
      },
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
    },
    {
      title: "Fashion Brand Digital Transformation",
      client: "Style Maven",
      challenge: "Traditional retail transitioning to marketplace",
      solution: "Multi-format campaign strategy with brand storytelling",
      results: {
        roasIncrease: "370%",
        salesGrowth: "$800K",
        timeline: "6 months"
      },
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Walmart Advertising Case Studies | Marketplace Success Stories"
        description="See how our Walmart Connect advertising strategies helped brands achieve 300-450% ROAS increases on Walmart marketplace."
        keywords="Walmart advertising case studies, Walmart Connect success stories, Walmart marketplace results"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <div className="space-y-20 md:space-y-32">
          {/* Hero Section */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-20">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Walmart Success Stories</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                  Walmart Connect
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    Case Studies
                  </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Discover how our Walmart advertising expertise has helped brands dominate the marketplace with strategic campaigns that drive exceptional growth and ROI.
                </p>
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="pb-20">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {caseStudies.map((study, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-200 transform hover:-translate-y-2"
                  >
                    <div className="flex flex-col h-full">
                      {/* Image */}
                      <div className="relative rounded-2xl overflow-hidden mb-6">
                        <img 
                          src={study.image} 
                          alt={study.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {study.title}
                        </h3>
                        <p className="text-blue-600 font-medium mb-4">{study.client}</p>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-1">Challenge:</h4>
                            <p className="text-slate-600 text-sm">{study.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-1">Solution:</h4>
                            <p className="text-slate-600 text-sm">{study.solution}</p>
                          </div>
                        </div>

                        {/* Results */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                          <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                            Results Achieved
                          </h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{study.results.roasIncrease}</div>
                              <div className="text-xs text-slate-600">ROAS Increase</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{study.results.salesGrowth}</div>
                              <div className="text-xs text-slate-600">Revenue Growth</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-cyan-600">{study.results.timeline}</div>
                              <div className="text-xs text-slate-600">Timeline</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-20">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Ready to Dominate Walmart Marketplace?
                  </h2>
                  <p className="text-xl text-slate-600 mb-8">
                    Get your free Walmart Connect audit and discover how we can replicate these success stories for your brand.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Get Free Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WalmartCaseStudies;

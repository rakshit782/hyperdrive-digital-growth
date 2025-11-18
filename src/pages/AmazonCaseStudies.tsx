
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, DollarSign, Target, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const AmazonCaseStudies = () => {
  const navigate = useNavigate();
  const caseStudies = [
    {
      title: "Home Decor Brand Scales to 7-Figures",
      client: "Modern Living Co.",
      challenge: "Low visibility and poor ROAS on Amazon PPC campaigns",
      solution: "Complete campaign restructure with strategic keyword targeting and bid optimization",
      results: {
        roasIncrease: "450%",
        salesGrowth: "$1.2M",
        timeline: "6 months"
      },
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    },
    {
      title: "Tech Accessory Brand Dominates Search",
      client: "TechGear Pro",
      challenge: "High competition and rising advertising costs",
      solution: "Advanced keyword research and negative keyword optimization",
      results: {
        roasIncrease: "320%",
        salesGrowth: "$800K",
        timeline: "4 months"
      },
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
      title: "Beauty Brand Achieves Market Leadership",
      client: "Pure Beauty",
      challenge: "Struggling to compete with established brands",
      solution: "Brand-focused campaign strategy with sponsored brand ads",
      results: {
        roasIncrease: "380%",
        salesGrowth: "$950K",
        timeline: "5 months"
      },
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"
    },
    {
      title: "Sports Equipment Retailer Expansion",
      client: "Active Sports",
      challenge: "Limited reach and poor product visibility",
      solution: "Multi-format campaign strategy with video ads",
      results: {
        roasIncrease: "410%",
        salesGrowth: "$1.5M",
        timeline: "7 months"
      },
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      title: "Kitchen Appliance Brand Growth Story",
      client: "Chef's Choice",
      challenge: "Seasonal sales fluctuations and inventory issues",
      solution: "Dynamic campaign scheduling and inventory-based bidding",
      results: {
        roasIncrease: "365%",
        salesGrowth: "$700K",
        timeline: "4 months"
      },
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
      title: "Fashion Accessory Brand Breakthrough",
      client: "Style Forward",
      challenge: "Low conversion rates and high ACOS",
      solution: "Product targeting and competitor analysis optimization",
      results: {
        roasIncrease: "340%",
        salesGrowth: "$650K",
        timeline: "5 months"
      },
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    },
    {
      title: "Pet Supplies Brand Market Domination",
      client: "Happy Pets Co.",
      challenge: "Fragmented campaign structure and poor performance",
      solution: "Campaign consolidation and automated bidding implementation",
      results: {
        roasIncrease: "430%",
        salesGrowth: "$1.1M",
        timeline: "6 months"
      },
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
    },
    {
      title: "Electronics Brand Revenue Explosion",
      client: "Digital Pro",
      challenge: "Complex product catalog and targeting difficulties",
      solution: "AI-powered campaign optimization and advanced targeting",
      results: {
        roasIncrease: "500%",
        salesGrowth: "$2.1M",
        timeline: "8 months"
      },
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Amazon Advertising Case Studies | Proven Success Stories"
        description="Discover how our Amazon advertising strategies helped brands achieve 300-500% ROAS increases. Real results from real clients."
        keywords="Amazon advertising case studies, Amazon PPC success stories, Amazon marketing results, amazon advertising roi, amazon ppc case studies, amazon success stories, ecommerce case studies, amazon growth stories, advertising success stories, real results amazon, amazon advertising roi, amazon sales growth, amazon ppc results, sponsored products case studies, amazon dsp case studies, amazon brand registry, amazon seller success, marketplace success stories, ecommerce growth case studies, revenue growth amazon, roas improvement, acos reduction, conversion rate improvement, organic ranking case studies, amazon seo results, listing optimization results, a+ content success, brand store success, video ads results, sponsored brands results, sponsored display results, amazon retargeting, product targeting success, keyword optimization results, bid optimization case studies, campaign optimization, budget optimization, seasonal campaign success, prime day success, black friday success, cyber monday results, holiday sales growth, new product launch, brand awareness campaigns, market share growth, competitive analysis results, category domination, best seller rank improvement, product reviews growth, customer acquisition cost, lifetime value optimization, repeat purchase rate, customer retention, cross sell success, upsell strategies, bundle optimization, pricing strategy success, promotional strategy results"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Amazon Success Stories</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Amazon Advertising
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Case Studies
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Real results from real clients. See how our proven Amazon advertising strategies have helped businesses like yours achieve extraordinary growth and dominate their markets.
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
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Ready to Write Your Success Story?
                </h2>
                <p className="text-xl text-slate-600 mb-8">
                  Get your free Amazon advertising audit and discover how we can transform your performance like these success stories.
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => navigate('/contact')}
                >
                  Get Free Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AmazonCaseStudies;

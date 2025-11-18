
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, DollarSign, Target, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const MetaCaseStudies = () => {
  const navigate = useNavigate();
  const caseStudies = [
    {
      title: "E-commerce Fashion Brand Scaling",
      client: "Trendy Threads",
      challenge: "High customer acquisition costs and low ROAS",
      solution: "Advanced audience segmentation with lookalike campaigns and retargeting funnels",
      results: {
        roasIncrease: "520%",
        salesGrowth: "$2.1M",
        timeline: "6 months"
      },
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    },
    {
      title: "SaaS Company Lead Generation",
      client: "CloudTech Solutions",
      challenge: "Difficulty reaching decision-makers and converting leads",
      solution: "B2B targeting with video campaigns and lead form optimization",
      results: {
        roasIncrease: "450%",
        salesGrowth: "$1.8M",
        timeline: "5 months"
      },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      title: "Local Restaurant Chain Growth",
      client: "Gourmet Bites",
      challenge: "Limited reach and seasonal fluctuations",
      solution: "Location-based targeting with dynamic product ads and event promotion",
      results: {
        roasIncrease: "380%",
        salesGrowth: "$950K",
        timeline: "4 months"
      },
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
    },
    {
      title: "Fitness Brand Community Building",
      client: "FitLife Pro",
      challenge: "Building brand awareness and engagement",
      solution: "Community-focused campaigns with user-generated content and influencer partnerships",
      results: {
        roasIncrease: "410%",
        salesGrowth: "$1.3M",
        timeline: "7 months"
      },
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    },
    {
      title: "Beauty Brand Influencer Success",
      client: "Radiant Beauty",
      challenge: "Breaking through saturated market competition",
      solution: "Micro-influencer campaigns with authentic content and social proof",
      results: {
        roasIncrease: "480%",
        salesGrowth: "$1.6M",
        timeline: "6 months"
      },
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop"
    },
    {
      title: "Home Services Lead Generation",
      client: "Elite Contractors",
      challenge: "Seasonal business with inconsistent lead flow",
      solution: "Geo-targeted campaigns with seasonal messaging and lead nurturing",
      results: {
        roasIncrease: "350%",
        salesGrowth: "$780K",
        timeline: "5 months"
      },
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
    },
    {
      title: "Educational Platform Expansion",
      client: "LearnSmart Academy",
      challenge: "Reaching the right student demographics effectively",
      solution: "Age and interest-based targeting with educational content marketing",
      results: {
        roasIncrease: "420%",
        salesGrowth: "$1.1M",
        timeline: "6 months"
      },
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
    },
    {
      title: "Luxury Watch Brand Prestige",
      client: "Timepiece Elite",
      challenge: "Targeting high-value customers and building brand prestige",
      solution: "Premium audience targeting with luxury lifestyle content and exclusivity messaging",
      results: {
        roasIncrease: "390%",
        salesGrowth: "$2.3M",
        timeline: "8 months"
      },
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Meta Advertising Case Studies | Facebook & Instagram Success"
        description="Discover how our Meta advertising strategies helped brands achieve 350-520% ROAS increases on Facebook and Instagram."
        keywords="Meta advertising case studies, Facebook ads success stories, Instagram marketing results, meta advertising case studies, facebook advertising case studies, instagram advertising case studies, social media advertising success, facebook ads results, instagram ads results, meta ads roi, social commerce case studies, facebook marketing success, instagram marketing success, meta business success, social media growth, facebook campaign results, instagram campaign results, influencer marketing case studies, ugc campaign success, video ads results, story ads success, reels advertising, facebook shops success, instagram shopping, catalog sales, dynamic ads results, collection ads, carousel ads success, lead generation facebook, lead ads results, messenger ads, whatsapp business ads, audience targeting success, lookalike audience results, custom audience success, pixel optimization, conversion api results, ios 14 solutions, attribution success, retargeting campaigns, remarketing success, funnel optimization, awareness campaigns, consideration campaigns, conversion campaigns, brand awareness results, engagement rate improvement, follower growth, community building, page growth, group marketing, event promotion success, local business success, ecommerce facebook, dtc brand success, b2b facebook ads, saas lead generation, app install campaigns, mobile app growth, customer acquisition facebook, cac reduction, ltv optimization, roas improvement meta, cpm optimization, cpc reduction, ctr improvement, conversion rate facebook"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Meta Success Stories</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Meta Advertising
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Case Studies
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Explore real success stories from our Meta advertising campaigns. See how strategic Facebook and Instagram marketing drives exceptional business growth.
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
                  Ready to Achieve Meta Success?
                </h2>
                <p className="text-xl text-slate-600 mb-8">
                  Get your free Meta advertising audit and discover how we can create similar success stories for your brand.
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

export default MetaCaseStudies;

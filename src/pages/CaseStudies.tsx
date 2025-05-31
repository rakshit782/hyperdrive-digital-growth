
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, ArrowRight, ShoppingCart, Share2 } from "lucide-react";

const CaseStudies = () => {
  const caseStudyCategories = [
    {
      platform: "Amazon",
      icon: ShoppingCart,
      color: "from-blue-600 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      description: "Discover how we've helped Amazon sellers achieve remarkable growth through strategic advertising optimization",
      href: "/amazon-case-studies",
      stats: [
        { label: "Average ROAS Increase", value: "300%" },
        { label: "ACOS Reduction", value: "45%" },
        { label: "Revenue Growth", value: "250%" }
      ],
      highlights: [
        "Electronics Brand: 300% ROAS increase in 6 months",
        "Home & Garden: Scaled to $100K monthly revenue",
        "Fashion Brand: 60% ACOS reduction while doubling sales"
      ]
    },
    {
      platform: "Walmart",
      icon: DollarSign,
      color: "from-yellow-600 to-blue-600",
      bgColor: "from-yellow-50 to-blue-50",
      description: "See how our Walmart advertising expertise has helped brands dominate their categories",
      href: "/walmart-case-studies",
      stats: [
        { label: "Revenue Growth", value: "400%" },
        { label: "Market Share Increase", value: "150%" },
        { label: "Conversion Rate Boost", value: "190%" }
      ],
      highlights: [
        "Health & Wellness: 400% revenue growth in 9 months",
        "Baby Products: Dominated competitive market",
        "Electronics: Scaled to $75K monthly revenue"
      ]
    },
    {
      platform: "Meta",
      icon: Share2,
      color: "from-purple-600 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      description: "Transform your social media advertising with our proven Meta strategies",
      href: "/meta-case-studies",
      stats: [
        { label: "ROAS Achievement", value: "500%" },
        { label: "CPA Reduction", value: "65%" },
        { label: "Engagement Growth", value: "320%" }
      ],
      highlights: [
        "Beauty Brand: 500% ROAS with Meta advertising",
        "Fitness Brand: Scaled to 6-figure monthly revenue",
        "Home Decor: 200% market share increase"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Case Studies</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Discover how we've transformed businesses across Amazon, Walmart, and Meta platforms 
              through data-driven advertising strategies and proven optimization techniques.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                <span>Proven Results</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                <span>ROI Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {caseStudyCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="max-w-7xl mx-auto">
                  <Card className="overflow-hidden shadow-xl border-0">
                    <CardHeader className={`bg-gradient-to-r ${category.color} text-white p-8`}>
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-8 h-8 mr-3" />
                        <CardTitle className="text-4xl font-bold">{category.platform} Case Studies</CardTitle>
                      </div>
                      <CardDescription className="text-lg text-white/90">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-2 gap-12">
                        {/* Stats & Highlights */}
                        <div className="space-y-8">
                          {/* Key Stats */}
                          <div className={`bg-gradient-to-r ${category.bgColor} p-6 rounded-xl`}>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Average Results</h3>
                            <div className="grid grid-cols-1 gap-4">
                              {category.stats.map((stat, statIndex) => (
                                <div key={statIndex} className="flex justify-between items-center">
                                  <span className="text-slate-700 font-medium">{stat.label}</span>
                                  <span className="text-2xl font-bold text-green-600">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Success Highlights */}
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Success Highlights</h3>
                            <div className="space-y-3">
                              {category.highlights.map((highlight, highlightIndex) => (
                                <div key={highlightIndex} className="flex items-start">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-slate-600">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* CTA Section */}
                        <div className="flex flex-col justify-center space-y-6">
                          <div className="text-center">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                              Ready to See Detailed Results?
                            </h3>
                            <p className="text-slate-600 mb-6">
                              Explore comprehensive case studies with in-depth metrics, 
                              strategies, and step-by-step breakdowns of our success stories.
                            </p>
                            <Button 
                              size="lg" 
                              className={`bg-gradient-to-r ${category.color} hover:opacity-90 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105`}
                              onClick={() => window.location.href = category.href}
                            >
                              View {category.platform} Case Studies
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Become Our Next Success Story?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's analyze your current advertising performance and create a custom strategy 
            that delivers the same exceptional results you've seen in our case studies.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 text-lg rounded-xl"
            onClick={() => window.location.href = '/free-audit'}
          >
            Get Your Free Audit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;

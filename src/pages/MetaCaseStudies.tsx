
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Target, BarChart3, ArrowRight, Share2 } from "lucide-react";

const MetaCaseStudies = () => {
  const caseStudies = [
    {
      title: "Beauty Brand Achieves 500% ROAS with Meta Advertising",
      client: "GlowUp Cosmetics",
      category: "Beauty & Personal Care",
      challenge: "High customer acquisition costs and low engagement rates across Facebook and Instagram",
      solution: "Implemented advanced audience targeting with custom lookalike audiences and dynamic retargeting campaigns",
      results: {
        roasIncrease: "500%",
        cpaReduction: "65%",
        engagementGrowth: "320%",
        timeframe: "5 months"
      },
      metrics: [
        { label: "ROAS", before: "1.2", after: "7.2", improvement: "+500%" },
        { label: "Cost Per Acquisition", before: "$45", after: "$16", improvement: "-64%" },
        { label: "Engagement Rate", before: "1.8%", after: "7.5%", improvement: "+317%" },
        { label: "Monthly Revenue", before: "$12K", after: "$85K", improvement: "+608%" }
      ]
    },
    {
      title: "Fitness Brand Scales to 6-Figure Monthly Revenue",
      client: "FitCore Equipment",
      category: "Sports & Fitness",
      challenge: "Seasonal fluctuations and difficulty reaching target demographic effectively",
      solution: "Developed comprehensive funnel strategy with video ads and conversion optimization",
      results: {
        revenueGrowth: "450%",
        leadIncrease: "280%",
        conversionRate: "190%",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Monthly Revenue", before: "$22K", after: "$121K", improvement: "+450%" },
        { label: "Qualified Leads", before: "180/mo", after: "684/mo", improvement: "+280%" },
        { label: "Conversion Rate", before: "2.1%", after: "6.1%", improvement: "+190%" },
        { label: "Cost Per Click", before: "$1.20", after: "$0.75", improvement: "-38%" }
      ]
    },
    {
      title: "Home Decor Brand Increases Market Share by 200%",
      client: "ModernLiving Designs",
      category: "Home & Garden",
      challenge: "Limited brand awareness and struggling to compete with established home decor brands",
      solution: "Created compelling visual storytelling campaigns with carousel ads and Instagram Shopping integration",
      results: {
        brandAwareness: "300%",
        marketShare: "200%",
        socialFollowing: "400%",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Brand Awareness", before: "15%", after: "60%", improvement: "+300%" },
        { label: "Market Share", before: "3%", after: "9%", improvement: "+200%" },
        { label: "Social Following", before: "5K", after: "25K", improvement: "+400%" },
        { label: "Website Traffic", before: "8K/mo", after: "45K/mo", improvement: "+463%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Meta <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Case Studies</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Discover how our Meta advertising strategies have transformed businesses through 
              powerful Facebook and Instagram campaigns that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <div key={index} className="max-w-6xl mx-auto">
                <Card className="bg-white border shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <CardTitle className="text-3xl font-bold">{study.title}</CardTitle>
                    <CardDescription className="text-purple-100 text-lg">
                      {study.client} • {study.category}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                      {/* Challenge & Solution */}
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                            <Target className="w-6 h-6 mr-2 text-red-500" />
                            Challenge
                          </h3>
                          <p className="text-slate-600 leading-relaxed">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                            <BarChart3 className="w-6 h-6 mr-2 text-purple-500" />
                            Solution
                          </h3>
                          <p className="text-slate-600 leading-relaxed">{study.solution}</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                            Results in {study.results.timeframe}
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(study.results).map(([key, value]) => {
                              if (key === 'timeframe') return null;
                              return (
                                <div key={key} className="text-center">
                                  <div className="text-2xl font-bold text-green-600">{value}</div>
                                  <div className="text-sm text-slate-600 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Metrics */}
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                          <Share2 className="w-6 h-6 mr-2 text-purple-500" />
                          Key Metrics
                        </h3>
                        
                        <div className="space-y-6">
                          {study.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="bg-slate-50 p-6 rounded-xl">
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-slate-900">{metric.label}</span>
                                <span className="text-lg font-bold text-green-600">{metric.improvement}</span>
                              </div>
                              <div className="flex justify-between text-sm text-slate-600">
                                <span>Before: {metric.before}</span>
                                <span>After: {metric.after}</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: '75%' }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Social Media Advertising?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Let's create a powerful Meta advertising strategy that connects with your audience and drives conversions.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-purple-50 font-semibold px-8 py-4 text-lg rounded-xl"
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

export default MetaCaseStudies;


import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Target, BarChart3, ArrowRight } from "lucide-react";

const AmazonCaseStudies = () => {
  const caseStudies = [
    {
      title: "Electronics Brand Achieves 300% ROAS Increase",
      client: "TechGear Pro",
      category: "Consumer Electronics",
      challenge: "Low conversion rates and high ACOS across sponsored product campaigns",
      solution: "Implemented advanced keyword research, negative keyword optimization, and bid management strategies",
      results: {
        roasIncrease: "300%",
        acosReduction: "45%",
        salesGrowth: "250%",
        timeframe: "6 months"
      },
      metrics: [
        { label: "ROAS", before: "2.1", after: "6.3", improvement: "+300%" },
        { label: "ACOS", before: "48%", after: "26%", improvement: "-45%" },
        { label: "Monthly Sales", before: "$15K", after: "$52K", improvement: "+247%" },
        { label: "Conversion Rate", before: "2.1%", after: "4.8%", improvement: "+129%" }
      ]
    },
    {
      title: "Home & Garden Brand Scales to $100K Monthly Revenue",
      client: "Garden Essentials",
      category: "Home & Garden",
      challenge: "Limited brand visibility and struggling to compete with established sellers",
      solution: "Comprehensive campaign restructure with focus on long-tail keywords and brand defense",
      results: {
        revenueGrowth: "400%",
        impressionIncrease: "180%",
        clickIncrease: "220%",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Monthly Revenue", before: "$20K", after: "$100K", improvement: "+400%" },
        { label: "Impressions", before: "500K", after: "1.4M", improvement: "+180%" },
        { label: "Click-Through Rate", before: "0.8%", after: "1.9%", improvement: "+138%" },
        { label: "Organic Ranking", before: "Page 3", after: "Page 1", improvement: "Top 10" }
      ]
    },
    {
      title: "Fashion Brand Reduces ACOS by 60% While Doubling Sales",
      client: "StyleCraft Apparel",
      category: "Fashion & Clothing",
      challenge: "High advertising costs with declining profitability and market share loss",
      solution: "Strategic campaign optimization with automated bidding and dayparting strategies",
      results: {
        acosReduction: "60%",
        salesDouble: "100%",
        profitIncrease: "180%",
        timeframe: "4 months"
      },
      metrics: [
        { label: "ACOS", before: "55%", after: "22%", improvement: "-60%" },
        { label: "Monthly Sales", before: "$35K", after: "$70K", improvement: "+100%" },
        { label: "Profit Margin", before: "15%", after: "42%", improvement: "+180%" },
        { label: "Brand Search Volume", before: "2K", after: "8K", improvement: "+300%" }
      ]
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
              Amazon <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Case Studies</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Discover how we've helped Amazon sellers achieve remarkable growth through strategic 
              advertising optimization and data-driven campaign management.
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
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <CardTitle className="text-3xl font-bold">{study.title}</CardTitle>
                    <CardDescription className="text-blue-100 text-lg">
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
                            <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
                            Solution
                          </h3>
                          <p className="text-slate-600 leading-relaxed">{study.solution}</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
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
                          <DollarSign className="w-6 h-6 mr-2 text-green-500" />
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
                                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Achieve Similar Results?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's analyze your Amazon advertising performance and create a custom strategy for your business.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-xl"
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

export default AmazonCaseStudies;

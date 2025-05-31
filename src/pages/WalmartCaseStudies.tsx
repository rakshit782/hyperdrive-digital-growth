
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Target, BarChart3, ArrowRight, ShoppingCart } from "lucide-react";

const WalmartCaseStudies = () => {
  const caseStudies = [
    {
      title: "Health & Wellness Brand Achieves 400% Revenue Growth",
      client: "VitalHealth Supplements",
      category: "Health & Wellness",
      challenge: "New to Walmart marketplace with zero brand recognition and limited advertising experience",
      solution: "Built comprehensive Walmart advertising strategy from ground up with focus on search visibility and sponsored products",
      results: {
        revenueGrowth: "400%",
        roasIncrease: "280%",
        rankingImprovement: "Top 5",
        timeframe: "9 months"
      },
      metrics: [
        { label: "Monthly Revenue", before: "$8K", after: "$40K", improvement: "+400%" },
        { label: "ROAS", before: "1.8", after: "6.8", improvement: "+278%" },
        { label: "Category Ranking", before: "Page 5+", after: "Top 5", improvement: "95% up" },
        { label: "Click-Through Rate", before: "0.6%", after: "2.4%", improvement: "+300%" }
      ]
    },
    {
      title: "Baby Products Brand Dominates Competitive Market",
      client: "LittleOnes Essentials",
      category: "Baby & Toddler",
      challenge: "Highly competitive category with established brands and price-sensitive customers",
      solution: "Strategic campaign optimization with focus on long-tail keywords and seasonal promotions",
      results: {
        marketShareIncrease: "150%",
        profitMarginGrowth: "85%",
        customerAcquisition: "300%",
        timeframe: "7 months"
      },
      metrics: [
        { label: "Market Share", before: "2%", after: "5%", improvement: "+150%" },
        { label: "Profit Margin", before: "18%", after: "33%", improvement: "+83%" },
        { label: "New Customers", before: "200/mo", after: "800/mo", improvement: "+300%" },
        { label: "Average Order Value", before: "$24", after: "$38", improvement: "+58%" }
      ]
    },
    {
      title: "Electronics Accessories Brand Scales to $75K Monthly",
      client: "TechConnect Pro",
      category: "Electronics",
      challenge: "Struggling with low visibility and high competition from generic brands",
      solution: "Implemented advanced bidding strategies and comprehensive negative keyword management",
      results: {
        salesGrowth: "320%",
        visibilityIncrease: "250%",
        conversionRate: "190%",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Monthly Sales", before: "$18K", after: "$75K", improvement: "+317%" },
        { label: "Impressions", before: "800K", after: "2.8M", improvement: "+250%" },
        { label: "Conversion Rate", before: "1.2%", after: "3.5%", improvement: "+192%" },
        { label: "Cost Per Click", before: "$0.85", after: "$0.52", improvement: "-39%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-yellow-50 via-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              Walmart <span className="bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">Case Studies</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              See how our Walmart advertising expertise has helped brands achieve exceptional growth 
              and dominate their categories on America's largest retailer platform.
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
                  <CardHeader className="bg-gradient-to-r from-yellow-600 to-blue-600 text-white">
                    <CardTitle className="text-3xl font-bold">{study.title}</CardTitle>
                    <CardDescription className="text-yellow-100 text-lg">
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
                            <BarChart3 className="w-6 h-6 mr-2 text-yellow-500" />
                            Solution
                          </h3>
                          <p className="text-slate-600 leading-relaxed">{study.solution}</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-yellow-50 to-blue-50 p-6 rounded-xl">
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
                          <ShoppingCart className="w-6 h-6 mr-2 text-yellow-500" />
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
                                  className="bg-gradient-to-r from-yellow-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
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
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Dominate Walmart Marketplace?</h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Let's analyze your Walmart advertising potential and create a winning strategy for your brand.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-yellow-600 hover:bg-yellow-50 font-semibold px-8 py-4 text-lg rounded-xl"
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

export default WalmartCaseStudies;


import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Target, BarChart3, ArrowRight, ShoppingCart, Share2 } from "lucide-react";

const CaseStudies = () => {
  const allCaseStudies = [
    // Amazon Case Studies
    {
      platform: "Amazon",
      platformColor: "from-blue-600 to-cyan-600",
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
      platform: "Amazon",
      platformColor: "from-blue-600 to-cyan-600",
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
      platform: "Amazon",
      platformColor: "from-blue-600 to-cyan-600",
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
    },
    // Walmart Case Studies
    {
      platform: "Walmart",
      platformColor: "from-yellow-600 to-blue-600",
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
      platform: "Walmart",
      platformColor: "from-yellow-600 to-blue-600",
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
      platform: "Walmart",
      platformColor: "from-yellow-600 to-blue-600",
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
    },
    // Meta Case Studies
    {
      platform: "Meta",
      platformColor: "from-purple-600 to-pink-600",
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
      platform: "Meta",
      platformColor: "from-purple-600 to-pink-600",
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
      platform: "Meta",
      platformColor: "from-purple-600 to-pink-600",
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

  console.log("Case studies loaded:", allCaseStudies.length);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Amazon": return ShoppingCart;
      case "Walmart": return DollarSign;
      case "Meta": return Share2;
      default: return TrendingUp;
    }
  };

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

      {/* All Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Debug information */}
          <div className="mb-8 text-center">
            <p className="text-lg text-slate-600">
              Showing {allCaseStudies.length} Case Studies
            </p>
          </div>
          
          <div className="space-y-20">
            {allCaseStudies.map((study, index) => {
              console.log(`Rendering case study ${index + 1}:`, study.title);
              const IconComponent = getPlatformIcon(study.platform);
              return (
                <div key={index} className="max-w-6xl mx-auto">
                  <Card className="bg-white border shadow-xl overflow-hidden">
                    <CardHeader className={`bg-gradient-to-r ${study.platformColor} text-white`}>
                      <div className="flex items-center mb-2">
                        <IconComponent className="w-6 h-6 mr-2" />
                        <span className="text-lg font-semibold">{study.platform}</span>
                      </div>
                      <CardTitle className="text-3xl font-bold">{study.title}</CardTitle>
                      <CardDescription className="text-white/90 text-lg">
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
                            <IconComponent className="w-6 h-6 mr-2 text-green-500" />
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
                                    className={`bg-gradient-to-r ${study.platformColor} h-2 rounded-full transition-all duration-1000`}
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

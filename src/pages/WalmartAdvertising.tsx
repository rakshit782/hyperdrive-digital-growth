
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, TrendingUp, Search, Video, ArrowRight, CheckCircle } from "lucide-react";

const WalmartAdvertising = () => {
  const features = [
    "Search ads optimization",
    "Display campaign management",
    "Video advertising creation",
    "Performance analytics",
    "Keyword strategy development",
    "Competitive analysis"
  ];

  const benefits = [
    { title: "Growing Marketplace", description: "Tap into Walmart's rapidly expanding customer base" },
    { title: "Lower Competition", description: "Less crowded than Amazon with better opportunities" },
    { title: "Cost-Effective", description: "Generally lower cost-per-click than other platforms" },
    { title: "Expert Setup", description: "Professional campaign setup and ongoing optimization" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
            <Store className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 tracking-wide">WALMART ADVERTISING</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
            Scale on <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Walmart Connect</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive Walmart advertising solutions to boost visibility and drive sales on America's fastest-growing marketplace
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-900 flex items-center">
                <TrendingUp className="mr-4 w-8 h-8 text-blue-600" />
                Our Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-lg text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl"
          >
            Launch Walmart Campaigns
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalmartAdvertising;

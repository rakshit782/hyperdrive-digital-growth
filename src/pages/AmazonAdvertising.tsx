
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Target, Search, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

const AmazonAdvertising = () => {
  const features = [
    "Sponsored Products optimization",
    "Sponsored Brands campaigns",
    "Keyword research & targeting",
    "Performance analytics & reporting",
    "Bid management strategies",
    "Campaign structure optimization"
  ];

  const benefits = [
    { title: "Increased Visibility", description: "Get your products in front of more potential customers" },
    { title: "Higher Sales", description: "Drive more traffic and conversions to your listings" },
    { title: "Better ROI", description: "Optimize your ad spend for maximum return on investment" },
    { title: "Expert Management", description: "Let our certified Amazon specialists handle your campaigns" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-full border border-orange-200/50 mb-8">
            <ShoppingCart className="w-5 h-5 mr-2 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600 tracking-wide">AMAZON ADVERTISING</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
            Dominate <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Amazon Search</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Expert Amazon PPC management that drives sales, increases visibility, and maximizes your return on ad spend
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-900 flex items-center">
                <Target className="mr-4 w-8 h-8 text-orange-600" />
                What We Offer
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
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl"
          >
            Start Your Amazon Campaign
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AmazonAdvertising;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Camera, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

const MetaAdvertising = () => {
  const features = [
    "Facebook ads management",
    "Instagram campaign optimization",
    "Advanced audience targeting",
    "Creative optimization",
    "A/B testing strategies",
    "Conversion tracking setup"
  ];

  const benefits = [
    { title: "Massive Reach", description: "Access billions of users across Facebook and Instagram" },
    { title: "Precise Targeting", description: "Reach your exact audience with detailed demographics" },
    { title: "Visual Impact", description: "Showcase your products with stunning visual content" },
    { title: "Proven Results", description: "Data-driven strategies that deliver measurable ROI" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full border border-purple-200/50 mb-8">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600 tracking-wide">META ADVERTISING</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
            Connect with <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Billions</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Professional Facebook and Instagram advertising that drives traffic, generates leads, and converts followers into customers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-900 flex items-center">
                <Camera className="mr-4 w-8 h-8 text-purple-600" />
                What We Do
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl"
          >
            Start Meta Campaigns
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetaAdvertising;

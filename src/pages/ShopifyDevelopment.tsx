
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Smartphone, Zap, Palette, ArrowRight, CheckCircle } from "lucide-react";

const ShopifyDevelopment = () => {
  const features = [
    "Custom theme development",
    "Third-party app integration",
    "Mobile optimization",
    "Performance enhancement",
    "SEO optimization",
    "Custom functionality development"
  ];

  const benefits = [
    { title: "Unique Design", description: "Stand out with custom themes tailored to your brand" },
    { title: "Enhanced Performance", description: "Lightning-fast loading speeds for better conversions" },
    { title: "Mobile-First", description: "Optimized for mobile users who drive most sales" },
    { title: "Scalable Solution", description: "Built to handle growth and increased traffic" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-violet-200/50 mb-8">
            <Code className="w-5 h-5 mr-2 text-violet-600" />
            <span className="text-sm font-semibold text-violet-600 tracking-wide">SHOPIFY DEVELOPMENT</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
            Custom <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">E-commerce</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Professional Shopify development and customization to create a powerful, unique e-commerce presence that converts visitors into customers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-900 flex items-center">
                <Palette className="mr-4 w-8 h-8 text-violet-600" />
                Development Services
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
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl"
          >
            Start Development
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopifyDevelopment;

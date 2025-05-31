
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Package, RefreshCw, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

const ShopifyIntegration = () => {
  const features = [
    "Automated inventory sync",
    "Multi-platform order management",
    "Product listing optimization",
    "Real-time data synchronization",
    "Unified dashboard control",
    "Automated price updates"
  ];

  const benefits = [
    { title: "Seamless Integration", description: "Connect your Shopify store with Amazon and Walmart effortlessly" },
    { title: "Centralized Management", description: "Manage all platforms from one unified dashboard" },
    { title: "Time Saving", description: "Automated processes save hours of manual work daily" },
    { title: "Scalable Solution", description: "Grows with your business across all channels" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-cyan-200/50 mb-8">
            <Link2 className="w-5 h-5 mr-2 text-cyan-600" />
            <span className="text-sm font-semibold text-cyan-600 tracking-wide">SHOPIFY INTEGRATION</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
            Unified <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Multi-Channel</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Seamless integration of your Shopify store with Amazon and Walmart marketplaces for unified inventory and order management
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-900 flex items-center">
                <Package className="mr-4 w-8 h-8 text-cyan-600" />
                Integration Features
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
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl"
          >
            Start Integration
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopifyIntegration;

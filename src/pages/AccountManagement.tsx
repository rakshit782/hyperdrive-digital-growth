
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Clock, BarChart3, Users, ArrowRight, CheckCircle } from "lucide-react";

const AccountManagement = () => {
  const features = [
    "24/7 campaign monitoring",
    "Weekly performance reports",
    "Strategy optimization",
    "Dedicated account manager",
    "Monthly strategy calls",
    "Real-time alerts & notifications"
  ];

  const benefits = [
    { title: "Always Optimized", description: "Continuous monitoring ensures peak performance" },
    { title: "Dedicated Support", description: "Your personal account manager knows your business" },
    { title: "Transparent Reporting", description: "Clear, detailed reports on all your campaigns" },
    { title: "Proactive Management", description: "We spot issues and opportunities before you do" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-full border border-emerald-200/50 mb-8">
            <Settings className="w-5 h-5 mr-2 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-600 tracking-wide">ACCOUNT MANAGEMENT</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
            Complete <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Peace of Mind</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Full-service account management with dedicated specialists monitoring and optimizing your campaigns around the clock
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-900 flex items-center">
                <Clock className="mr-4 w-8 h-8 text-emerald-600" />
                Our Management
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
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl"
          >
            Get Managed Service
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;

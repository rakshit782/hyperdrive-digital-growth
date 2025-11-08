
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Award } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      title: "Happy Clients",
      value: "500+",
      description: "Satisfied customers worldwide"
    },
    {
      icon: Award,
      title: "Projects Completed",
      value: "1000+",
      description: "Successful projects delivered"
    },
    {
      icon: TrendingUp,
      title: "Growth Rate",
      value: "150%",
      description: "Average client growth"
    },
    {
      icon: BarChart3,
      title: "Years Experience",
      value: "10+",
      description: "In digital marketing"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Proven <span className="bg-gradient-to-r from-yellow-400 to-lime-400 bg-clip-text text-transparent">Results</span> That Speak for Themselves
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our track record demonstrates our commitment to delivering exceptional results for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-lime-400 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-black" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white mb-2">{stat.title}</h3>
                  <p className="text-white/70">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;

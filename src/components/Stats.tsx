
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Award } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      title: "Happy Clients",
      value: "900+",
      description: "Satisfied customers worldwide"
    },
    {
      icon: Award,
      title: "Projects Completed",
      value: "1500+",
      description: "Successful projects delivered"
    },
    {
      icon: TrendingUp,
      title: "Client Growth",
      value: "300%",
      description: "Average client growth"
    },
    {
      icon: BarChart3,
      title: "Years Experience",
      value: "9+",
      description: "In digital marketing"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Proven Results That Speak for Themselves
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our track record demonstrates our commitment to delivering exceptional results for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
                  <p className="text-gray-600">{stat.description}</p>
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

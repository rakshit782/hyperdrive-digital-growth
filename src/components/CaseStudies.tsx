
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "E-commerce Growth Strategy",
      client: "TechStore Inc.",
      description: "Increased online sales by 300% through strategic digital marketing campaigns.",
      results: "300% Sales Increase",
      industry: "E-commerce",
      image: "/placeholder.svg"
    },
    {
      title: "Brand Awareness Campaign",
      client: "Fashion Forward",
      description: "Built brand recognition and customer engagement across multiple channels.",
      results: "250% Brand Reach",
      industry: "Fashion",
      image: "/placeholder.svg"
    },
    {
      title: "Local Business Optimization",
      client: "Downtown Café",
      description: "Transformed local presence and increased foot traffic through targeted marketing.",
      results: "180% Foot Traffic",
      industry: "Food & Beverage",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Our Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses like yours achieve remarkable growth and success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-gray-400" />
                </div>
                <CardTitle className="text-xl">{study.title}</CardTitle>
                <CardDescription className="text-blue-600 font-medium">{study.client}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{study.industry}</span>
                  <span className="text-green-600 font-semibold">{study.results}</span>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Read Full Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import CaseStudyPopup from "./CaseStudyPopup";

const CaseStudies = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const caseStudies = [
    {
      id: "1",
      title: "E-commerce Growth Strategy",
      client_name: "TechStore Inc.",
      description: "Increased online sales by 300% through strategic digital marketing campaigns and conversion optimization.",
      results: {
        "sales_increase": "300%",
        "conversion_rate": "45%",
        "roi": "250%"
      },
      industry: "E-commerce"
    },
    {
      id: "2",
      title: "Brand Awareness Campaign",
      client_name: "Fashion Forward",
      description: "Built brand recognition and customer engagement across multiple channels with targeted social media strategy.",
      results: {
        "brand_reach": "250%",
        "engagement_rate": "180%",
        "followers": "500K+"
      },
      industry: "Fashion"
    },
    {
      id: "3",
      title: "Local Business Optimization",
      client_name: "Downtown Café",
      description: "Transformed local presence and increased foot traffic through targeted local SEO and marketing campaigns.",
      results: {
        "foot_traffic": "180%",
        "local_searches": "220%",
        "revenue": "165%"
      },
      industry: "Food & Beverage"
    }
  ];

  const handleCaseStudyClick = (caseStudy: any) => {
    setSelectedCaseStudy(caseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCaseStudy(null);
  };

  return (
    <>
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
              <Card key={study.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{study.client_name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-100">
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(study.results).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="text-green-600 font-semibold">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{study.industry}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    onClick={() => handleCaseStudyClick(study)}
                  >
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

      <CaseStudyPopup 
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </>
  );
};

export default CaseStudies;

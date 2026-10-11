
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
import CaseStudyPopup from "./CaseStudyPopup";
import { allBulkCaseStudies, FormattedCaseStudy } from "@/data/bulkCaseStudiesAdapter";

const CaseStudies = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Take top 6 representative case studies from the uploaded dataset
  const displayStudies = allBulkCaseStudies.slice(0, 6);

  const handleCaseStudyClick = (study: FormattedCaseStudy) => {
    setSelectedCaseStudy({
      id: study.id,
      title: study.title,
      description: study.description,
      industry: study.industry,
      client_name: study.client_name,
      image_url: study.imageUrl,
      results: {
        [study.results.metric1.label]: study.results.metric1.value,
        [study.results.metric2.label]: study.results.metric2.value,
        [study.results.metric3.label]: study.results.metric3.value,
      },
    });
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
            {displayStudies.map((study) => (
              <Card key={study.id} className="group hover:shadow-xl transition-all border-slate-200/90 overflow-hidden flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          {study.industry}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                          {study.client_name}
                        </span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {study.channel}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {study.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {study.challenge}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                      <div className="text-center">
                        <div className="text-sm font-bold text-blue-600">{study.results.metric1.value}</div>
                        <div className="text-[10px] text-slate-500 truncate">{study.results.metric1.label}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-emerald-600">{study.results.metric2.value}</div>
                        <div className="text-[10px] text-slate-500 truncate">{study.results.metric2.label}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-orange-600">{study.results.metric3.value}</div>
                        <div className="text-[10px] text-slate-500 truncate">{study.results.metric3.label}</div>
                      </div>
                    </div>
                  </CardContent>

                <div className="p-6 pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    onClick={() => handleCaseStudyClick(study)}
                  >
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-8 rounded-xl shadow-lg">
              <Link to="/case-studies">
                View All {allBulkCaseStudies.length} Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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

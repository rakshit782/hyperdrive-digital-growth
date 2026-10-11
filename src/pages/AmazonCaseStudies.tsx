
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, DollarSign, Target, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getCaseStudiesByService, FormattedCaseStudy } from "@/data/bulkCaseStudiesAdapter";
import CaseStudyPopup from "@/components/CaseStudyPopup";

const AmazonCaseStudies = () => {
  const caseStudies = getCaseStudiesByService("Amazon Advertising");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
  return (
    <>
      <SEOHead 
        title="Amazon Advertising Case Studies | Proven Success Stories"
        description="Discover how our Amazon advertising strategies helped brands achieve extraordinary growth. Real results from real clients."
        keywords="Amazon advertising case studies, Amazon PPC success stories, Amazon marketing results, amazon advertising roi, amazon ppc case studies, amazon success stories"
      />
      <div className="min-h-screen bg-slate-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12 bg-white border-b border-slate-200/60">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200 mb-6">
                <Star className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">Amazon Advertising Portfolio</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Amazon Advertising Case Studies ({caseStudies.length})
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Audited performance records from real client accounts across Amazon US, UK, and global marketplaces.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {caseStudies.map((study) => (
                <div 
                  key={study.id}
                  onClick={() => handleCaseStudyClick(study)}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-orange-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                            {study.industry}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 font-medium">
                            {study.client_name}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {study.channel}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-orange-600 transition-colors">
                        {study.title}
                      </h3>

                      <div className="space-y-3 mb-6">
                        <div>
                          <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-1">Challenge:</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">{study.challenge}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-1">Solution:</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">{study.solution}</p>
                        </div>
                      </div>
                    </div>

                  <div>
                    {/* Results */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 mb-4">
                      <div className="text-center p-3 rounded-xl bg-orange-50/50 border border-orange-100/60">
                        <div className="text-lg font-bold text-orange-600">{study.results.metric1.value}</div>
                        <div className="text-[10px] text-slate-500 font-semibold truncate">{study.results.metric1.label}</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                        <div className="text-lg font-bold text-emerald-600">{study.results.metric2.value}</div>
                        <div className="text-[10px] text-slate-500 font-semibold truncate">{study.results.metric2.label}</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-blue-50/50 border border-blue-100/60">
                        <div className="text-lg font-bold text-blue-600">{study.results.metric3.value}</div>
                        <div className="text-[10px] text-slate-500 font-semibold truncate">{study.results.metric3.label}</div>
                      </div>
                    </div>

                    <Button 
                      variant="outline"
                      className="w-full border-slate-200 hover:border-orange-400 hover:bg-orange-50/40 text-slate-700 hover:text-orange-700 font-semibold text-xs py-2 rounded-xl"
                    >
                      Read Full Case Study
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-200 max-w-3xl mx-auto">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                  Ready to Scale Your Amazon Account?
                </h2>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                  Get your free Amazon PPC and listing audit. We will pinpoint wasted spend, identify missed keyword targets, and build a growth roadmap.
                </p>
                <Button 
                  asChild
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-base font-bold rounded-xl shadow-lg transition-all"
                >
                  <Link to="/contact">
                    Claim Your Free Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CaseStudyPopup 
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedCaseStudy(null);
        }}
      />

      <Footer />
    </>
  );
};

export default AmazonCaseStudies;

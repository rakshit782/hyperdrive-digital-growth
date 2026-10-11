import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, DollarSign, Target, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getCaseStudiesByService, FormattedCaseStudy } from "@/data/bulkCaseStudiesAdapter";
import CaseStudyPopup from "@/components/CaseStudyPopup";

const WalmartCaseStudies = () => {
  const caseStudies = getCaseStudiesByService("Walmart Advertising");
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
        title="Walmart Advertising Case Studies | Marketplace Success Stories"
        description="See how our Walmart Connect advertising strategies helped brands achieve 300-450% ROAS increases on Walmart marketplace."
        keywords="Walmart advertising case studies, Walmart Connect success stories, Walmart marketplace results, walmart advertising case studies, walmart connect case studies, walmart marketplace success, walmart advertising results, walmart ppc success, walmart sponsored products, walmart display ads, walmart connect roi, walmart sales growth, walmart advertising roi, walmart seller success, marketplace advertising success, walmart brand amplifier, walmart video ads, walmart search ads, omnichannel advertising, walmart retail media, walmart dsp, walmart audience targeting, walmart product targeting, walmart category targeting, walmart keyword optimization, walmart bid optimization, walmart campaign optimization, walmart seasonal success, walmart grocery advertising, walmart online grocery, walmart pickup delivery ads, walmart fulfillment services, walmart wfs success, walmart seller central, walmart item setup, walmart content optimization, walmart enhanced content, walmart rich media, walmart product reviews, walmart ratings optimization, walmart search ranking, walmart organic growth, walmart conversion rate, walmart basket size, walmart average order value, walmart customer acquisition, walmart repeat purchase, walmart customer loyalty, walmart promotional success, walmart rollback campaigns, walmart clearance optimization, walmart price competitiveness, walmart shipping optimization, walmart two day shipping, walmart free shipping, walmart site to store"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <div className="space-y-20 md:space-y-32">
          {/* Hero Section */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-20">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Walmart Success Stories</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                  Walmart Connect
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    Case Studies
                  </span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Discover how our Walmart advertising expertise has helped brands dominate the marketplace with strategic campaigns that drive exceptional growth and ROI.
                </p>
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="pb-20">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {caseStudies.map((study) => (
                  <div 
                    key={study.id}
                    onClick={() => handleCaseStudyClick(study)}
                    className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-400 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                  >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                              {study.industry}
                            </span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                              {study.client_name}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {study.channel}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
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
                        <div className="text-center p-3 rounded-xl bg-blue-50/50 border border-blue-100/60">
                          <div className="text-lg font-bold text-blue-600">{study.results.metric1.value}</div>
                          <div className="text-[10px] text-slate-500 font-semibold truncate">{study.results.metric1.label}</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                          <div className="text-lg font-bold text-emerald-600">{study.results.metric2.value}</div>
                          <div className="text-[10px] text-slate-500 font-semibold truncate">{study.results.metric2.label}</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/60">
                          <div className="text-lg font-bold text-indigo-600">{study.results.metric3.value}</div>
                          <div className="text-[10px] text-slate-500 font-semibold truncate">{study.results.metric3.label}</div>
                        </div>
                      </div>

                      <Button 
                        variant="outline"
                        className="w-full border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-700 hover:text-blue-700 font-semibold text-xs py-2 rounded-xl"
                      >
                        Read Full Case Study
                        <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-20">
                <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-200 max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                    Ready to Dominate Walmart Marketplace?
                  </h2>
                  <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                    Get your free Walmart Connect audit and discover how we can replicate these success stories for your brand.
                  </p>
                  <Button 
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-bold rounded-xl shadow-lg transition-all"
                  >
                    <Link to="/contact">
                      Get Free Walmart Audit
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
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

export default WalmartCaseStudies;

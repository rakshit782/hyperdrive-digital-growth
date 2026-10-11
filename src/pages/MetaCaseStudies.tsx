import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, DollarSign, Target, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getCaseStudiesByService, FormattedCaseStudy } from "@/data/bulkCaseStudiesAdapter";
import CaseStudyPopup from "@/components/CaseStudyPopup";

const MetaCaseStudies = () => {
  const caseStudies = getCaseStudiesByService("Meta & Google Ads");
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
        title="Meta Advertising Case Studies | Facebook & Instagram Success"
        description="Discover how our Meta advertising strategies helped brands achieve 350-520% ROAS increases on Facebook and Instagram."
        keywords="Meta advertising case studies, Facebook ads success stories, Instagram marketing results, meta advertising case studies, facebook advertising case studies, instagram advertising case studies, social media advertising success, facebook ads results, instagram ads results, meta ads roi, social commerce case studies, facebook marketing success, instagram marketing success, meta business success, social media growth, facebook campaign results, instagram campaign results, influencer marketing case studies, ugc campaign success, video ads results, story ads success, reels advertising, facebook shops success, instagram shopping, catalog sales, dynamic ads results, collection ads, carousel ads success, lead generation facebook, lead ads results, messenger ads, whatsapp business ads, audience targeting success, lookalike audience results, custom audience success, pixel optimization, conversion api results, ios 14 solutions, attribution success, retargeting campaigns, remarketing success, funnel optimization, awareness campaigns, consideration campaigns, conversion campaigns, brand awareness results, engagement rate improvement, follower growth, community building, page growth, group marketing, event promotion success, local business success, ecommerce facebook, dtc brand success, b2b facebook ads, saas lead generation, app install campaigns, mobile app growth, customer acquisition facebook, cac reduction, ltv optimization, roas improvement meta, cpm optimization, cpc reduction, ctr improvement, conversion rate facebook"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Meta Success Stories</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Meta Advertising
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Case Studies
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Explore real success stories from our Meta advertising campaigns. See how strategic Facebook and Instagram marketing drives exceptional business growth.
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
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-purple-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                            {study.industry}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-medium">
                            {study.client_name}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {study.channel}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-purple-600 transition-colors">
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
                      <div className="text-center p-3 rounded-xl bg-purple-50/50 border border-purple-100/60">
                        <div className="text-lg font-bold text-purple-600">{study.results.metric1.value}</div>
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
                      className="w-full border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 text-slate-700 hover:text-purple-700 font-semibold text-xs py-2 rounded-xl"
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
                  Ready to Achieve Meta & Google Ads Scale?
                </h2>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                  Get your free advertising audit. We will evaluate your paid funnels, creatives, and remarketing audiences to unlock sustainable ROI.
                </p>
                <Button 
                  asChild
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-base font-bold rounded-xl shadow-lg transition-all"
                >
                  <Link to="/contact">
                    Get Free Meta & Google Audit
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

export default MetaCaseStudies;

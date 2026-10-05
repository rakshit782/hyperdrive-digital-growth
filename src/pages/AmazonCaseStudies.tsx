import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePublishedCaseStudies } from "@/hooks/useCaseStudies";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CaseStudiesEmptyPanel } from "@/components/case-studies/CaseStudiesBlocks";

const AmazonCaseStudies = () => {
  const { rows } = usePublishedCaseStudies();
  const studies = rows.filter((study) => study.channel === "amazon");
  const empty = studies.length === 0;

  return (
    <>
      <SEOHead
        title="Amazon Advertising Case Studies | Proven Success Stories"
        description="Discover how our Amazon advertising strategies helped brands achieve 300-500% ROAS increases. Real results from real clients."
        keywords="Amazon advertising case studies, Amazon PPC success stories, Amazon marketing results, amazon advertising roi, amazon ppc case studies, amazon success stories, ecommerce case studies, amazon growth stories, advertising success stories, real results amazon, amazon advertising roi, amazon sales growth, amazon ppc results, sponsored products case studies, amazon dsp case studies, amazon brand registry, amazon seller success, marketplace success stories, ecommerce growth case studies, revenue growth amazon, roas improvement, acos reduction, conversion rate improvement, organic ranking case studies, amazon seo results, listing optimization results, a+ content success, brand store success, video ads results, sponsored brands results, sponsored display results, amazon retargeting, product targeting success, keyword optimization results, bid optimization case studies, campaign optimization, budget optimization, seasonal campaign success, prime day success, black friday success, cyber monday results, holiday sales growth, new product launch, brand awareness campaigns, market share growth, competitive analysis results, category domination, best seller rank improvement, product reviews growth, customer acquisition cost, lifetime value optimization, repeat purchase rate, customer retention, cross sell success, upsell strategies, bundle optimization, pricing strategy success, promotional strategy results"
        {...(empty ? { robots: "noindex, follow" } : {})}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <section className="pt-20 pb-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Amazon Success Stories</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Amazon Advertising
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Case Studies
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Real results from real clients. See how our proven Amazon advertising strategies have helped businesses like yours achieve extraordinary growth and dominate their markets.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-6">
            {empty ? (
              <div className="mb-16">
                <CaseStudiesEmptyPanel />
              </div>
            ) : (
              <div className="mb-16">
                <CaseStudyGrid studies={studies} />
              </div>
            )}
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Ready to Write Your Success Story?
                </h2>
                <p className="text-xl text-slate-600 mb-8">
                  Get your free Amazon advertising audit and discover how we can transform your performance like these success stories.
                </p>
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to="/contact" aria-label="Get Free Audit — Contact">
                    Get Free Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default AmazonCaseStudies;

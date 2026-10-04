import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePublishedCaseStudies } from "@/hooks/useCaseStudies";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CaseStudiesEmptyPanel } from "@/components/case-studies/CaseStudiesBlocks";

const MetaCaseStudies = () => {
  const { rows } = usePublishedCaseStudies();
  const studies = rows.filter((study) => study.channel === "meta");
  const empty = studies.length === 0;

  return (
    <>
      <SEOHead
        title="Meta Advertising Case Studies | Facebook & Instagram Success"
        description="Discover how our Meta advertising strategies helped brands achieve 350-520% ROAS increases on Facebook and Instagram."
        keywords="Meta advertising case studies, Facebook ads success stories, Instagram marketing results, meta advertising case studies, facebook advertising case studies, instagram advertising case studies, social media advertising success, facebook ads results, instagram ads results, meta ads roi, social commerce case studies, facebook marketing success, instagram marketing success, meta business success, social media growth, facebook campaign results, instagram campaign results, influencer marketing case studies, ugc campaign success, video ads results, story ads success, reels advertising, facebook shops success, instagram shopping, catalog sales, dynamic ads results, collection ads, carousel ads success, lead generation facebook, lead ads results, messenger ads, whatsapp business ads, audience targeting success, lookalike audience results, custom audience success, pixel optimization, conversion api results, ios 14 solutions, attribution success, retargeting campaigns, remarketing success, funnel optimization, awareness campaigns, consideration campaigns, conversion campaigns, brand awareness results, engagement rate improvement, follower growth, community building, page growth, group marketing, event promotion success, local business success, ecommerce facebook, dtc brand success, b2b facebook ads, saas lead generation, app install campaigns, mobile app growth, customer acquisition facebook, cac reduction, ltv optimization, roas improvement meta, cpm optimization, cpc reduction, ctr improvement, conversion rate facebook"
        {...(empty ? { robots: "noindex, follow" } : {})}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
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
                  Ready to Achieve Meta Success?
                </h2>
                <p className="text-xl text-slate-600 mb-8">
                  Get your free Meta advertising audit and discover how we can create similar success stories for your brand.
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

export default MetaCaseStudies;

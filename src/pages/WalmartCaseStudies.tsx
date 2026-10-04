import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePublishedCaseStudies } from "@/hooks/useCaseStudies";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CaseStudiesEmptyPanel } from "@/components/case-studies/CaseStudiesBlocks";

const WalmartCaseStudies = () => {
  const { rows } = usePublishedCaseStudies();
  const studies = rows.filter((study) => study.channel === "walmart");
  const empty = studies.length === 0;

  return (
    <>
      <SEOHead
        title="Walmart Advertising Case Studies | Marketplace Success Stories"
        description="See how our Walmart Connect advertising strategies helped brands achieve 300-450% ROAS increases on Walmart marketplace."
        keywords="Walmart advertising case studies, Walmart Connect success stories, Walmart marketplace results, walmart advertising case studies, walmart connect case studies, walmart marketplace success, walmart advertising results, walmart ppc success, walmart sponsored products, walmart display ads, walmart connect roi, walmart sales growth, walmart advertising roi, walmart seller success, marketplace advertising success, walmart brand amplifier, walmart video ads, walmart search ads, omnichannel advertising, walmart retail media, walmart dsp, walmart audience targeting, walmart product targeting, walmart category targeting, walmart keyword optimization, walmart bid optimization, walmart campaign optimization, walmart seasonal success, walmart grocery advertising, walmart online grocery, walmart pickup delivery ads, walmart fulfillment services, walmart wfs success, walmart seller central, walmart item setup, walmart content optimization, walmart enhanced content, walmart rich media, walmart product reviews, walmart ratings optimization, walmart search ranking, walmart organic growth, walmart conversion rate, walmart basket size, walmart average order value, walmart customer acquisition, walmart repeat purchase, walmart customer loyalty, walmart promotional success, walmart rollback campaigns, walmart clearance optimization, walmart price competitiveness, walmart shipping optimization, walmart two day shipping, walmart free shipping, walmart site to store"
        {...(empty ? { robots: "noindex, follow" } : {})}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        
        <div className="space-y-20 md:space-y-32">
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
              <div className="mt-20">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Ready to Dominate Walmart Marketplace?
                  </h2>
                  <p className="text-xl text-slate-600 mb-8">
                    Get your free Walmart Connect audit and discover how we can replicate these success stories for your brand.
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

      </div>
      <Footer />
    </>
  );
};

export default WalmartCaseStudies;

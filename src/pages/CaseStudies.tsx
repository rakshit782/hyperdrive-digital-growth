import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CaseStudyPopup from "@/components/CaseStudyPopup";
import { ArrowUpRight, TrendingUp, Target, DollarSign, Search, Filter, Sparkles } from "lucide-react";
import { allBulkCaseStudies, FormattedCaseStudy } from "@/data/bulkCaseStudiesAdapter";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const CaseStudies = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [caseStudies, setCaseStudies] = useState<FormattedCaseStudy[]>(allBulkCaseStudies);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedChannel, setSelectedChannel] = useState<string>("all");

  useEffect(() => {
    // Load case studies from localStorage if available, otherwise default to all 160 sample studies
    const loadCaseStudies = () => {
      const savedStudies = localStorage.getItem("caseStudiesData");
      if (savedStudies) {
        try {
          const parsed = JSON.parse(savedStudies);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCaseStudies(parsed);
            return;
          }
        } catch (error) {
          console.error("Failed to parse case studies:", error);
        }
      }
      setCaseStudies(allBulkCaseStudies);
    };

    loadCaseStudies();

    // Listen for live updates from admin dashboard
    const handleStudiesUpdate = (event: CustomEvent) => {
      if (event.detail && Array.isArray(event.detail)) {
        setCaseStudies(event.detail);
      }
    };

    window.addEventListener("caseStudiesUpdated", handleStudiesUpdate as EventListener);
    return () => {
      window.removeEventListener("caseStudiesUpdated", handleStudiesUpdate as EventListener);
    };
  }, []);

  const handleCaseStudyClick = (study: FormattedCaseStudy) => {
    const popupCaseStudy = {
      id: study.id,
      title: study.title,
      description: study.description,
      industry: study.industry,
      client_name: study.client_name || "Confidential Client",
      image_url: study.imageUrl || study.image_url,
      results: {
        [study.results.metric1.label]: study.results.metric1.value,
        [study.results.metric2.label]: study.results.metric2.value,
        [study.results.metric3.label]: study.results.metric3.value,
      },
      service_type: study.service.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };

    setSelectedCaseStudy(popupCaseStudy);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCaseStudy(null);
  };

  // Filter case studies
  const servicesList = Array.from(new Set(caseStudies.map((c) => c.service))).filter(Boolean);
  const channelsList = Array.from(new Set(caseStudies.map((c) => c.channel))).filter(Boolean);

  const filteredStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (study.caseId && study.caseId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesService =
      selectedService === "all" || study.service === selectedService;

    const matchesChannel =
      selectedChannel === "all" || study.channel === selectedChannel;

    return matchesSearch && matchesService && matchesChannel;
  });

  return (
    <>
      <SEOHead
        title="E-commerce Advertising Case Studies | AMZ AD SCOUT"
        description="Explore 160+ real brand performance case studies across Amazon, Walmart, Meta and Google ads. Discover proven growth metrics, ACOS reductions and ROAS lift."
        keywords="amazon advertising case studies, walmart advertising results, e-commerce success stories, amazon ppc case studies, marketplace growth results, proven advertising results"
        canonical={typeof window !== "undefined" ? window.location.href : ""}
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{caseStudies.length} Verified Brand Case Studies</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 tracking-tight">
              E-commerce Growth Case Studies
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Real performance results across Amazon, Walmart Connect, Meta Ads and Google. Explore verified growth metrics, spend efficiencies, and organic keyword rank gains.
            </p>

            {/* Search and Filters Bar */}
            <div className="mt-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/80 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search by brand, keyword, industry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 bg-slate-50/60 border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Services ({servicesList.length})</option>
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Marketplaces ({channelsList.length})</option>
                    {channelsList.map((chn) => (
                      <option key={chn} value={chn}>
                        {chn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-medium text-slate-600">
                Showing <span className="font-bold text-slate-900">{filteredStudies.length}</span> case studies
              </p>
              {(searchTerm || selectedService !== "all" || selectedChannel !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedService("all");
                    setSelectedChannel("all");
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Reset filters
                </button>
              )}
            </div>

            {filteredStudies.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">
                <p className="text-lg font-semibold text-slate-800">No case studies found</p>
                <p className="text-sm text-slate-500 mt-1">Try adjusting your search terms or filters.</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredStudies.map((study) => (
                  <div
                    key={study.id}
                    className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group border border-slate-100 flex flex-col justify-between"
                    onClick={() => handleCaseStudyClick(study)}
                  >
                    <div className="p-7">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                          {study.channel}
                        </span>
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          {study.industry}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {study.description}
                      </p>

                      {/* Results Metrics */}
                      <div className="grid grid-cols-3 gap-2.5 mb-6 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mb-1 mx-auto">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="text-base font-bold text-green-600 truncate">{study.results.metric1.value}</div>
                          <div className="text-[10px] text-slate-500 truncate" title={study.results.metric1.label}>
                            {study.results.metric1.label}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mb-1 mx-auto">
                            <Target className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="text-base font-bold text-purple-600 truncate">{study.results.metric2.value}</div>
                          <div className="text-[10px] text-slate-500 truncate" title={study.results.metric2.label}>
                            {study.results.metric2.label}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mb-1 mx-auto">
                            <DollarSign className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="text-base font-bold text-blue-600 truncate">{study.results.metric3.value}</div>
                          <div className="text-[10px] text-slate-500 truncate" title={study.results.metric3.label}>
                            {study.results.metric3.label}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-7 pt-0">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:shadow-md transition-all duration-300 flex items-center justify-center text-sm group-hover:from-blue-700 group-hover:to-indigo-700">
                        View Full Case Study
                        <ArrowUpRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <CaseStudyPopup 
        caseStudy={selectedCaseStudy}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />

      <Footer />
    </>
  );
};

export default CaseStudies;

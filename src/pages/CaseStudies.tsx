import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { CaseStudyGrid, CaseStudySkeletonGrid } from "@/components/case-studies/CaseStudyGrid";
import { CaseStudiesCtaBand, CaseStudiesEmptyPanel } from "@/components/case-studies/CaseStudiesBlocks";
import { usePublishedCaseStudies } from "@/hooks/useCaseStudies";
import {
  caseStudiesFilterAll,
  caseStudiesFilterLabel,
  caseStudiesIndexDescription,
  caseStudiesIndexH1,
  caseStudiesIndexIntro,
  caseStudiesIndexTitle,
  CHANNELS,
  channelLabel,
  type Channel,
} from "@/content/caseStudiesCopy";

const CaseStudies = () => {
  const { rows, isPending, fromBuild } = usePublishedCaseStudies();
  const [channel, setChannel] = useState<Channel | "all">("all");
  const available = useMemo(
    () => CHANNELS.filter((item) => rows.some((study) => study.channel === item)),
    [rows],
  );
  const showChannelFilters = available.length >= 2;
  const visible = !showChannelFilters || channel === "all" ? rows : rows.filter((study) => study.channel === channel);
  const empty = rows.length === 0;
  const showSkeleton = !fromBuild && isPending;

  return (
    <>
      <SEOHead
        title={caseStudiesIndexTitle}
        description={caseStudiesIndexDescription}
        canonical="/case-studies"
        robots={empty ? "noindex, follow" : "index, follow"}
      />
      <Header />
      <div className="min-h-screen bg-white">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">{caseStudiesIndexH1}</h1>
              {empty && !showSkeleton ? null : (
                <p className="mt-4 text-lg text-slate-600">{caseStudiesIndexIntro}</p>
              )}
            </div>
            {showSkeleton ? (
              <CaseStudySkeletonGrid count={3} />
            ) : empty ? (
              <CaseStudiesEmptyPanel />
            ) : (
              <>
                {showChannelFilters ? (
                  <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label={caseStudiesFilterLabel}>
                    <FilterChip pressed={channel === "all"} onClick={() => setChannel("all")}>
                      {caseStudiesFilterAll}
                    </FilterChip>
                    {available.map((item) => (
                      <FilterChip key={item} pressed={channel === item} onClick={() => setChannel(item)}>
                        {channelLabel(item)}
                      </FilterChip>
                    ))}
                  </div>
                ) : null}
                <CaseStudyGrid studies={visible} />
                <div className="mt-16">
                  <CaseStudiesCtaBand />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 ${
        pressed ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

export default CaseStudies;

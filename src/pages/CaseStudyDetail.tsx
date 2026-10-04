import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NotFound from "@/pages/NotFound";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublishedCaseStudies, fetchCaseStudyBySlug, type CaseStudy } from "@/hooks/useCaseStudies";
import { CaseStudyLogo } from "@/components/case-studies/CaseStudyCard";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CaseStudiesCtaBand } from "@/components/case-studies/CaseStudiesBlocks";
import { moreCaseStudies } from "@/lib/caseStudyFormat";
import { useQuery } from "@tanstack/react-query";
import {
  caseStudiesBreadcrumb,
  caseStudiesDetailChallenge,
  caseStudiesDetailMore,
  caseStudiesDetailResults,
  caseStudiesDetailSolution,
  caseStudiesDetailTestimonial,
  channelLabel,
  detailPageDescription,
  detailPageH1,
  detailPageTitle,
  formatMetricValue,
  metricAccessibleText,
  metricFromText,
} from "@/content/caseStudiesCopy";

const CaseStudyDetail = () => {
  const { slug = "" } = useParams();
  const { rows, isPending, fromBuild } = usePublishedCaseStudies();
  const fromList = rows.find((study) => study.slug === slug);
  const lookup = useQuery({
    queryKey: ["case-studies", "slug", slug],
    queryFn: () => fetchCaseStudyBySlug(slug),
    enabled: !!slug && !fromList && !isPending,
    retry: 1,
  });
  const study = fromList || lookup.data || null;
  const waiting = !study && ((!fromBuild && isPending) || lookup.isFetching);

  if (waiting) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-6 py-16" aria-busy="true">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-6 h-12 w-2/3" />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-28" />
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!study) {
    return (
      <>
        <SEOHead
          title="Page not found"
          description="The page you're looking for doesn't exist or has been moved to a different location."
          canonical={`/case-studies/${slug}`}
          robots="noindex, follow"
        />
        <NotFound browseCaseStudies />
      </>
    );
  }

  const headline = study.results[0];
  const related = moreCaseStudies(rows, study);

  return (
    <>
      <SEOHead
        title={detailPageTitle(study.brand_name, study.channel)}
        description={detailPageDescription({
          brandName: study.brand_name,
          channel: study.channel,
          label: headline?.label,
          before: headline?.before,
          after: headline?.after,
          unit: headline?.unit,
          timePeriod: study.time_period,
        })}
        canonical={`/case-studies/${study.slug}`}
        robots="index, follow"
      />
      <Header />
      <article className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <li>
                <Link
                  to="/case-studies"
                  className="inline-flex min-h-11 items-center font-medium text-blue-800 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                >
                  {caseStudiesBreadcrumb}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-slate-900" aria-current="page">
                {study.brand_name}
              </li>
            </ol>
          </nav>

          <DetailHeader study={study} />

          <section className="mt-10" aria-labelledby="case-results">
            <h2 id="case-results" className="text-2xl font-bold text-slate-900">
              {caseStudiesDetailResults}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {study.results.map((metric) => (
                <li key={`${metric.label}-${metric.after}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="sr-only">{metricAccessibleText(metric)}</p>
                  <p className="text-2xl font-bold text-slate-900 md:text-3xl" aria-hidden="true">
                    {formatMetricValue(metric.after, metric.unit)}
                  </p>
                  {metricFromText(metric) ? (
                    <p className="text-sm text-slate-600" aria-hidden="true">
                      {metricFromText(metric)}
                    </p>
                  ) : null}
                  <p className="mt-1 text-sm font-medium text-slate-700" aria-hidden="true">
                    {metric.label}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {study.challenge ? (
            <section className="mt-12 max-w-[68ch]" aria-labelledby="case-challenge">
              <h2 id="case-challenge" className="text-2xl font-bold text-slate-900">
                {caseStudiesDetailChallenge}
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-slate-700">{study.challenge}</p>
            </section>
          ) : null}

          {study.solution ? (
            <section className="mt-10 max-w-[68ch]" aria-labelledby="case-solution">
              <h2 id="case-solution" className="text-2xl font-bold text-slate-900">
                {caseStudiesDetailSolution}
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-slate-700">{study.solution}</p>
            </section>
          ) : null}

          {study.testimonial_quote ? (
            <section className="mt-10 max-w-[68ch]" aria-labelledby="case-quote">
              <h2 id="case-quote" className="text-2xl font-bold text-slate-900">
                {caseStudiesDetailTestimonial}
              </h2>
              <blockquote className="mt-3 border-l-4 border-slate-300 pl-4">
                <p className="text-lg leading-7 text-slate-800">“{study.testimonial_quote}”</p>
                {study.testimonial_author ? (
                  <footer className="mt-2 text-sm font-medium text-slate-600">{study.testimonial_author}</footer>
                ) : null}
              </blockquote>
            </section>
          ) : null}

          <div className="mt-14">
            <CaseStudiesCtaBand />
          </div>

          {related.length > 0 ? (
            <section className="mt-16" aria-labelledby="case-more">
              <h2 id="case-more" className="mb-6 text-2xl font-bold text-slate-900">
                {caseStudiesDetailMore}
              </h2>
              <CaseStudyGrid studies={related} />
            </section>
          ) : null}
        </div>
      </article>
      <Footer />
    </>
  );
};

function DetailHeader({ study }: { study: CaseStudy }) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex h-10 items-center">
        <CaseStudyLogo
          study={study}
          className="max-h-10 max-w-[160px] object-contain"
          fallbackClassName="truncate text-sm font-semibold text-slate-800"
        />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">{detailPageH1(study.brand_name, study.channel)}</h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        {study.channel ? <Badge variant="outline">{channelLabel(study.channel)}</Badge> : null}
        {study.category ? <span>{study.category}</span> : null}
        {study.time_period ? <span>{study.time_period}</span> : null}
      </div>
    </header>
  );
}

export default CaseStudyDetail;

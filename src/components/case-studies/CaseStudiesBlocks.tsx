import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePublishedCaseStudies } from "@/hooks/useCaseStudies";
import { CaseStudyGrid, CaseStudySkeletonGrid } from "@/components/case-studies/CaseStudyGrid";
import {
  caseStudiesAuditButton,
  caseStudiesCtaBody,
  caseStudiesCtaHeading,
  caseStudiesEmptyMessage,
  caseStudiesHomeH2,
  caseStudiesHomeSubline,
  caseStudiesServiceLinks,
  caseStudiesServicesLead,
  caseStudiesViewAll,
  SERVICE_SLUG_CHANNEL,
  serviceH2,
} from "@/content/caseStudiesCopy";

export function CaseStudiesCtaBand() {
  return (
    <section className="rounded-2xl bg-slate-900 px-6 py-10 text-white sm:px-10">
      <h2 className="text-2xl font-bold sm:text-3xl">{caseStudiesCtaHeading}</h2>
      <p className="mt-3 max-w-2xl text-base text-slate-100">{caseStudiesCtaBody}</p>
      <Button asChild size="lg" className="mt-6 min-h-11 bg-white text-slate-900 hover:bg-slate-100">
        <Link to="/contact">{caseStudiesAuditButton}</Link>
      </Button>
    </section>
  );
}

export function CaseStudiesEmptyPanel() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-lg text-slate-700">{caseStudiesEmptyMessage}</p>
      <Button asChild size="lg" className="mt-6 min-h-11">
        <Link to="/contact">{caseStudiesAuditButton}</Link>
      </Button>
      <p className="mt-8 text-sm font-medium text-slate-700">{caseStudiesServicesLead}</p>
      <ul className="mt-3 flex flex-wrap justify-center gap-2">
        {caseStudiesServiceLinks.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-4 text-sm font-medium text-slate-800 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomeCaseStudies() {
  const { rows, isPending, fromBuild } = usePublishedCaseStudies();
  if (!fromBuild && isPending) {
    return (
      <section className="bg-white py-20" aria-busy="true" aria-label={caseStudiesHomeH2}>
        <div className="container mx-auto px-6">
          <CaseStudySkeletonGrid count={3} />
        </div>
      </section>
    );
  }
  const studies = rows.slice(0, 3);
  if (studies.length === 0) return null;
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{caseStudiesHomeH2}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">{caseStudiesHomeSubline}</p>
        </div>
        <CaseStudyGrid studies={studies} />
        <div className="mt-10 text-center">
          <Link
            to="/case-studies"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            {caseStudiesViewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ServiceCaseStudiesBlock({ serviceSlug }: { serviceSlug?: string }) {
  const channel = serviceSlug ? SERVICE_SLUG_CHANNEL[serviceSlug] : undefined;
  const { rows, isPending, fromBuild } = usePublishedCaseStudies();
  if (!channel) return null;
  if (!fromBuild && isPending) {
    return (
      <section className="py-16" aria-busy="true">
        <div className="mx-auto max-w-6xl px-6">
          <CaseStudySkeletonGrid count={3} />
        </div>
      </section>
    );
  }
  const studies = rows.filter((study) => study.channel === channel).slice(0, 3);
  if (studies.length === 0) return null;
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{serviceH2(channel)}</h2>
          <Link
            to="/case-studies"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-800 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            {caseStudiesViewAll}
          </Link>
        </div>
        <CaseStudyGrid studies={studies} />
      </div>
    </section>
  );
}


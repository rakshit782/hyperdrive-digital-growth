import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { CaseStudy } from "@/hooks/useCaseStudies";
import {
  cardAccessibleName,
  caseStudiesCardLink,
  channelLabel,
  formatMetricValue,
  metricAccessibleText,
  metricFromText,
} from "@/content/caseStudiesCopy";

function Logo({ study }: { study: CaseStudy }) {
  const [failed, setFailed] = useState(false);
  if (!study.logo_url || failed) {
    return (
      <span className="max-w-16 truncate text-sm font-semibold text-slate-800">
        {study.brand_name}
      </span>
    );
  }
  return (
    <img
      src={study.logo_url}
      alt={study.brand_name}
      className="max-h-10 max-w-16 object-contain"
      width={64}
      height={40}
      onError={() => setFailed(true)}
    />
  );
}

function channelClass(channel: string): string {
  switch (channel) {
    case "amazon":
      return "bg-amber-100 text-amber-950 border-amber-200";
    case "walmart":
      return "bg-sky-100 text-sky-950 border-sky-200";
    case "meta":
      return "bg-indigo-100 text-indigo-950 border-indigo-200";
    case "google":
      return "bg-emerald-100 text-emerald-950 border-emerald-200";
    case "shopify":
      return "bg-green-100 text-green-950 border-green-200";
    default:
      return "bg-slate-100 text-slate-900 border-slate-200";
  }
}

export function CaseStudyCard({ study, preview = false }: { study: CaseStudy; preview?: boolean }) {
  const headline = study.results[0];
  const more = study.results.slice(1, 3);
  const described = study.results
    .map((metric) => metricAccessibleText(metric))
    .filter(Boolean)
    .join(". ");
  const readId = `case-read-${study.slug || study.id || "preview"}`;
  const metricId = `case-metric-${study.slug || study.id || "preview"}`;

  const body = (
    <>
      <span id={readId} className="sr-only">
        {cardAccessibleName(study.brand_name || "this brand")}
      </span>
      {described ? (
        <span id={metricId} className="sr-only">
          {described}
        </span>
      ) : null}
      <div className="flex items-center justify-between gap-3" aria-hidden="true">
        <div className="flex h-10 w-16 shrink-0 items-center">
          <Logo study={study} />
        </div>
        {study.channel ? (
          <Badge variant="outline" className={channelClass(study.channel)}>
            {channelLabel(study.channel)}
          </Badge>
        ) : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900" aria-hidden="true">
        {study.brand_name || "Untitled"}
      </h3>
      {study.category ? (
        <p className="text-sm text-slate-600" aria-hidden="true">
          {study.category}
        </p>
      ) : null}
      {headline ? (
        <div className="mt-4" aria-hidden="true">
          <div className="flex flex-wrap items-end gap-2">
            {metricFromText(headline) ? (
              <span className="inline-flex items-center gap-1 pb-0.5 text-sm text-slate-600">
                {metricFromText(headline)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            ) : null}
            <span className="text-3xl font-bold leading-none text-slate-900">
              {formatMetricValue(headline.after, headline.unit)}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-700">{headline.label}</p>
        </div>
      ) : null}
      {more.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1" aria-hidden="true">
          {more.map((metric) => (
            <span key={`${metric.label}-${metric.after}`} className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">
                {formatMetricValue(metric.after, metric.unit)}
              </span>{" "}
              {metric.label}
            </span>
          ))}
        </div>
      ) : null}
      {study.time_period ? (
        <p className="mt-3 text-sm text-slate-600" aria-hidden="true">
          {study.time_period}
        </p>
      ) : null}
      <span className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-blue-800" aria-hidden="true">
        {caseStudiesCardLink}
        <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
      </span>
    </>
  );

  const className =
    "flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm outline-none transition hover:border-slate-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2";

  if (preview) {
    return (
      <div className={className} data-testid="case-study-card-preview">
        {body}
      </div>
    );
  }

  return (
    <Link
      to={`/case-studies/${study.slug}`}
      className={className}
      aria-labelledby={readId}
      aria-describedby={described ? metricId : undefined}
      data-testid="case-study-card"
    >
      {body}
    </Link>
  );
}

export function CaseStudyCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5" aria-hidden="true">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-16" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="mt-4 h-6 w-2/3" />
      <Skeleton className="mt-2 h-4 w-1/3" />
      <Skeleton className="mt-4 h-9 w-24" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-4 h-4 w-28" />
    </div>
  );
}

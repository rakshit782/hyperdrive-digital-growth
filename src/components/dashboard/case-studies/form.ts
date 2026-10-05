import type { CaseStudy, CaseStudyMetric, CaseStudyWrite } from "@/hooks/useCaseStudies";
import { slugifyBrand } from "@/hooks/useCaseStudies";
import { isChannel, type Channel } from "@/content/caseStudiesCopy";

export const METRIC_UNITS = ["%", "$", "x", "units"] as const;
export const UNSAVED_CASE_STUDY_KEY = "case_studies_unsaved_form";

export interface MetricDraft {
  key: string;
  label: string;
  before: string;
  after: string;
  unit: string;
}

export interface CaseStudyDraft {
  id?: string;
  brand_name: string;
  slug: string;
  slugTouched: boolean;
  channel: Channel | "";
  category: string;
  logo_url: string;
  challenge: string;
  solution: string;
  time_period: string;
  results: MetricDraft[];
  testimonial_quote: string;
  testimonial_author: string;
  sort_order: number;
}

export type FieldErrors = Record<string, string>;

function newKey(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function emptyMetric(): MetricDraft {
  return { key: newKey(), label: "", before: "", after: "", unit: "%" };
}

export function emptyDraft(sortOrder = 0): CaseStudyDraft {
  return {
    brand_name: "",
    slug: "",
    slugTouched: false,
    channel: "",
    category: "",
    logo_url: "",
    challenge: "",
    solution: "",
    time_period: "",
    results: [emptyMetric()],
    testimonial_quote: "",
    testimonial_author: "",
    sort_order: sortOrder,
  };
}

function unitFields(unit: string): { unit: string } {
  return { unit: unit || "%" };
}

export function draftFromCaseStudy(study: CaseStudy, asCopy = false): CaseStudyDraft {
  const metrics = (study.results || []).slice(0, 6).map((metric) => ({
    key: newKey(),
    label: metric.label || "",
    before: metric.before || "",
    after: metric.after || "",
    unit: metric.unit || "%",
  }));
  const brand = study.brand_name || "";
  const slug = asCopy ? slugifyBrand(`${brand} copy`) : study.slug || slugifyBrand(brand);
  return {
    id: asCopy ? undefined : study.id,
    brand_name: brand,
    slug,
    slugTouched: true,
    channel: isChannel(study.channel) ? study.channel : "",
    category: study.category || "",
    logo_url: study.logo_url || "",
    challenge: study.challenge || "",
    solution: study.solution || "",
    time_period: study.time_period || "",
    results: metrics.length ? metrics : [emptyMetric()],
    testimonial_quote: study.testimonial_quote || "",
    testimonial_author: study.testimonial_author || "",
    sort_order: asCopy ? study.sort_order + 1 : study.sort_order,
  };
}

export function validateDraft(draft: CaseStudyDraft, mode: "draft" | "publish"): FieldErrors {
  const errors: FieldErrors = {};
  if (!draft.brand_name.trim()) errors.brand_name = "Brand name is required.";
  if (draft.challenge.length > 600) errors.challenge = "Challenge must be 600 characters or fewer.";
  if (draft.solution.length > 800) errors.solution = "Solution must be 800 characters or fewer.";
  if (draft.testimonial_quote.length > 300) errors.testimonial_quote = "Quote must be 300 characters or fewer.";
  if (draft.testimonial_quote.trim() && !draft.testimonial_author.trim()) {
    errors.testimonial_author = "Add the author whenever there is a quote.";
  }
  if (draft.results.length > 6) errors.results = "Use at most 6 metrics.";

  if (mode === "publish") {
    if (!draft.channel) errors.channel = "Channel is required to publish.";
    if (!draft.challenge.trim()) errors.challenge = "Challenge is required to publish.";
    if (!draft.solution.trim()) errors.solution = "Solution is required to publish.";
    let complete = 0;
    draft.results.forEach((metric, index) => {
      const started = metric.label.trim() || metric.before.trim() || metric.after.trim();
      if (metric.label.trim() && metric.after.trim()) complete += 1;
      if (started && !metric.label.trim()) errors[`metric-${index}-label`] = "Metric label is required.";
      if (started && !metric.after.trim()) errors[`metric-${index}-after`] = "After value is required.";
    });
    if (complete < 1) errors.results = "Add at least one metric with a label and an after value.";
  }
  return errors;
}

export function firstErrorId(errors: FieldErrors): string | null {
  const order = [
    "brand_name",
    "slug",
    "channel",
    "category",
    "logo_url",
    "challenge",
    "solution",
    "time_period",
    "results",
    "testimonial_quote",
    "testimonial_author",
  ];
  for (let index = 0; index < 6; index += 1) {
    order.push(`metric-${index}-label`, `metric-${index}-before`, `metric-${index}-after`, `metric-${index}-unit`);
  }
  for (const key of order) {
    if (errors[key]) return `field-${key}`;
  }
  const extra = Object.keys(errors)[0];
  return extra ? `field-${extra}` : null;
}

export function draftToWrite(draft: CaseStudyDraft, published: boolean): CaseStudyWrite {
  const results: CaseStudyMetric[] = draft.results
    .map((metric) => ({
      label: metric.label.trim(),
      before: metric.before.trim() ? metric.before.trim() : null,
      after: metric.after.trim(),
      unit: unitFields(metric.unit).unit,
    }))
    .filter((metric) => metric.label || metric.after || metric.before);
  return {
    brand_name: draft.brand_name.trim(),
    slug: (draft.slug || slugifyBrand(draft.brand_name)).trim(),
    channel: draft.channel || undefined,
    category: draft.category.trim() || null,
    logo_url: draft.logo_url.trim() || null,
    challenge: draft.challenge.trim() || null,
    solution: draft.solution.trim() || null,
    results,
    time_period: draft.time_period.trim() || null,
    testimonial_quote: draft.testimonial_quote.trim() || null,
    testimonial_author: draft.testimonial_author.trim() || null,
    published,
    sort_order: draft.sort_order,
  };
}

export function draftFingerprint(draft: CaseStudyDraft): string {
  const { slugTouched: _slugTouched, ...rest } = draft;
  return JSON.stringify(rest);
}

export function matchServerField(message: string): string | null {
  const lower = message.toLowerCase();
  const fields = [
    "brand_name",
    "slug",
    "channel",
    "category",
    "logo_url",
    "challenge",
    "solution",
    "time_period",
    "testimonial_quote",
    "testimonial_author",
    "results",
    "sort_order",
  ];
  for (const field of fields) {
    if (lower.includes(field) || lower.includes(field.replace(/_/g, " "))) return field;
  }
  return null;
}

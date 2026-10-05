/**
 * Public case-study copy. Owned by SEO Writer.
 * Titles, meta descriptions, headings, and empty-state text live in this file.
 */

export const CHANNELS = ["amazon", "walmart", "meta", "google", "shopify"] as const;
export type Channel = (typeof CHANNELS)[number];

export const CHANNEL_LABELS: Record<Channel, string> = {
  amazon: "Amazon Ads",
  walmart: "Walmart Ads",
  meta: "Meta Ads",
  google: "Google Ads",
  shopify: "Shopify",
};

/** Service page slug → channel. Pages not listed do not show a case-study block. */
export const SERVICE_SLUG_CHANNEL: Record<string, Channel> = {
  "amazon-advertising": "amazon",
  "amazon-integration": "amazon",
  "listing-optimization": "amazon",
  "product-cataloging": "amazon",
  "walmart-advertising": "walmart",
  "meta-advertising": "meta",
  "google-advertising": "google",
  "shopify-development": "shopify",
  "shopify-integration": "shopify",
};

export const caseStudiesIndexTitle = "Amazon & Walmart Ads Case Studies | AMZ AD SCOUT";

export const caseStudiesIndexDescription =
  "Real results from AMZ AD SCOUT clients across Amazon, Walmart, Meta and Google ads. See the challenge, our approach and the numbers for each brand.";

export const caseStudiesIndexH1 = "Client Case Studies";

export const caseStudiesIndexIntro =
  "Real brands, real numbers. Each case study shows what was holding the account back, what we changed and what happened next.";

export const caseStudiesFilterLabel = "Filter case studies by channel";
export const caseStudiesFilterAll = "All";

export const caseStudiesEmptyMessage =
  "We're adding our client case studies now. In the meantime, get a free audit of your account and see where your ad spend could work harder.";

export const caseStudiesAuditButton = "Get a Free Audit";
export const caseStudiesServicesLead = "Or explore our services:";

export const caseStudiesCtaHeading = "Want results like these for your brand?";
export const caseStudiesCtaBody =
  "Get a free audit of your Amazon, Walmart, Meta or Google ads. We'll show you where spend is being wasted and what we'd change first.";

export const caseStudiesHomeH2 = "Client Results";
export const caseStudiesHomeSubline = "A few of the brands we manage ads for, and what changed.";
export const caseStudiesViewAll = "View all case studies";

export const caseStudiesCardLink = "Read case study";

export const caseStudiesDetailResults = "Results";
export const caseStudiesDetailChallenge = "The Challenge";
export const caseStudiesDetailSolution = "Our Solution";
export const caseStudiesDetailTestimonial = "What the Client Says";
export const caseStudiesDetailMore = "More Case Studies";
export const caseStudiesBreadcrumb = "Case Studies";
export const caseStudiesBrowseAll = "Browse all case studies";

export const caseStudiesServiceLinks: { href: string; label: string }[] = [
  { href: "/services/amazon-advertising", label: CHANNEL_LABELS.amazon },
  { href: "/services/walmart-advertising", label: CHANNEL_LABELS.walmart },
  { href: "/services/meta-advertising", label: CHANNEL_LABELS.meta },
  { href: "/services/google-advertising", label: CHANNEL_LABELS.google },
  { href: "/services/shopify-development", label: CHANNEL_LABELS.shopify },
];

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;
const TITLE_SUFFIX = " | AMZ AD SCOUT";

export function isChannel(value: string): value is Channel {
  return (CHANNELS as readonly string[]).includes(value);
}

export function channelLabel(channel: string): string {
  return isChannel(channel) ? CHANNEL_LABELS[channel] : channel;
}

export function serviceH2(channel: Channel): string {
  return `${CHANNEL_LABELS[channel]} Case Studies`;
}

export function cardAccessibleName(brandName: string): string {
  return `Read the ${brandName} case study`;
}

export function detailPageH1(brandName: string, channel: string): string {
  return `${brandName}: ${channelLabel(channel)} Case Study`;
}

/** "{brand} {channelLabel} Case Study | AMZ AD SCOUT", dropping the suffix past 60 characters. */
export function detailPageTitle(brandName: string, channel: string): string {
  const base = `${brandName} ${channelLabel(channel)} Case Study`;
  const full = `${base}${TITLE_SUFFIX}`;
  return full.length > TITLE_LIMIT ? base : full;
}

export function formatMetricValue(value: string, unit: string): string {
  const trimmed = value.trim();
  const u = unit.trim();
  if (!u) return trimmed;
  if (u === "$") return `$${trimmed}`;
  if (u === "%" || u === "x") return `${trimmed}${u}`;
  return `${trimmed} ${u}`;
}

export interface DetailDescriptionInput {
  brandName: string;
  channel: string;
  label?: string | null;
  before?: string | null;
  after?: string | null;
  unit?: string | null;
  timePeriod?: string | null;
}

/**
 * Meta description from metric 1.
 * Over 160 characters: drop " in {time_period}", then the "with AMZ AD SCOUT's …" tail.
 */
export function detailPageDescription(input: DetailDescriptionInput): string {
  const label = (input.label || "").trim();
  const after = (input.after || "").trim();
  const before = input.before == null ? "" : String(input.before).trim();
  const unit = input.unit || "";
  const channel = channelLabel(input.channel);
  const time = (input.timePeriod || "").trim();

  if (!label || !after) {
    const fallback = `${input.brandName}: ${channel} Case Study.`;
    return fallback.length > DESCRIPTION_LIMIT ? fallback.slice(0, DESCRIPTION_LIMIT).trim() : fallback;
  }

  const afterText = formatMetricValue(after, unit);
  const core = before
    ? `See how ${input.brandName} took ${label} from ${formatMetricValue(before, unit)} to ${afterText}`
    : `See how ${input.brandName} reached ${afterText} ${label}`;
  const tail = ` with AMZ AD SCOUT's ${channel} management.`;
  const timePart = time ? ` in ${time}` : "";

  const withTime = `${core}${timePart}${tail}`;
  if (withTime.length <= DESCRIPTION_LIMIT) return withTime;

  const withoutTime = `${core}${tail}`;
  if (withoutTime.length <= DESCRIPTION_LIMIT) return withoutTime;

  const withoutTail = `${core}.`;
  return withoutTail;
}

export function metricAccessibleText(metric: {
  label: string;
  before?: string | null;
  after: string;
  unit?: string | null;
}): string {
  const label = metric.label.trim();
  const after = formatMetricValue(metric.after || "", metric.unit || "");
  const before = metric.before == null || String(metric.before).trim() === "" ? "" : String(metric.before).trim();
  if (!before) return `${label}: ${after}`;
  return `${label} went from ${formatMetricValue(before, metric.unit || "")} to ${after}`;
}

export function metricFromText(metric: { before?: string | null; unit?: string | null }): string | null {
  if (metric.before == null || String(metric.before).trim() === "") return null;
  return `from ${formatMetricValue(String(metric.before), metric.unit || "")}`;
}

/**
 * Case-studies API base URL.
 * Override with VITE_CASE_STUDIES_API_URL when the endpoint moves
 * (for example to a same-origin `/api/...` route). One constant, used by
 * the client hook and the build-time prerender fetch.
 */
const DEFAULT_CASE_STUDIES_API_URL =
  "https://hznbshxhmhtenxcuffhx.supabase.co/functions/v1/neon-case-studies";

export const CASE_STUDIES_API_URL =
  import.meta.env.VITE_CASE_STUDIES_API_URL || DEFAULT_CASE_STUDIES_API_URL;

/** Anon key already used by authService. Sent only for Supabase hosts. */
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bmJzaHhobWh0ZW54Y3VmZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzEzMjEsImV4cCI6MjA2NDIwNzMyMX0.jydxpMEn5Z-fDDJXA9XAbx_mHEi_eQPFNEYikM21gnY";

export function isSupabaseCaseStudiesUrl(url: string = CASE_STUDIES_API_URL): boolean {
  try {
    const parsed = new URL(url, "https://www.amzadscout.com");
    return parsed.hostname === "supabase.co" || parsed.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

/** Headers for every case-studies request. Adds apikey only on supabase.co. */
export function caseStudiesHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (isSupabaseCaseStudiesUrl()) {
    headers.apikey = SUPABASE_ANON_KEY;
  }
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      if (value != null) headers[key] = value;
    }
  }
  return headers;
}

/** Absolute or same-origin URL with query params appended. */
export function caseStudiesEndpoint(params?: Record<string, string | undefined>): string {
  const absolute = new URL(CASE_STUDIES_API_URL, "https://www.amzadscout.com");
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value != null && value !== "") absolute.searchParams.set(key, value);
    }
  }
  if (/^https?:\/\//i.test(CASE_STUDIES_API_URL)) return absolute.toString();
  return `${absolute.pathname}${absolute.search}`;
}

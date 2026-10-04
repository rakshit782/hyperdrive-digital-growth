import type { CaseStudy } from "@/hooks/useCaseStudies";

declare global {
  interface Window {
    __CASE_STUDIES__?: CaseStudy[];
  }
}

/** Set only during prerender, before renderToString. Undefined in the browser bundle. */
let serverSnapshot: CaseStudy[] | undefined;

export function setServerCaseStudies(rows: CaseStudy[]) {
  serverSnapshot = rows;
  if (typeof window !== "undefined") {
    window.__CASE_STUDIES__ = rows;
  }
}

/**
 * Build-time rows for the first paint. Server and client must agree:
 * prerender sets the module value, and the HTML embeds the same JSON on window.
 * An explicit empty array still counts as build data so the empty state hydrates.
 */
export function readCaseStudiesSnapshot(): { rows: CaseStudy[]; fromBuild: boolean } {
  if (serverSnapshot !== undefined) {
    return { rows: serverSnapshot, fromBuild: true };
  }
  if (typeof window !== "undefined" && Array.isArray(window.__CASE_STUDIES__)) {
    return { rows: window.__CASE_STUDIES__, fromBuild: true };
  }
  return { rows: [], fromBuild: false };
}

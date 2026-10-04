import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bmJzaHhobWh0ZW54Y3VmZmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzEzMjEsImV4cCI6MjA2NDIwNzMyMX0.jydxpMEn5Z-fDDJXA9XAbx_mHEi_eQPFNEYikM21gnY";

const DEFAULT_SITE_SETTINGS_API_URL =
  "https://hznbshxhmhtenxcuffhx.supabase.co/functions/v1/neon-site-settings";

/** Change this one line (or set VITE_SITE_SETTINGS_API_URL) if the endpoint moves. */
export const SITE_SETTINGS_API_URL =
  (import.meta.env.VITE_SITE_SETTINGS_API_URL || "").trim() || DEFAULT_SITE_SETTINGS_API_URL;

export interface SiteSettings {
  rating_value: number;
  review_count: number;
  review_source_url: string | null;
  rating_visible: boolean;
  updated_at: string | null;
}

export interface SiteSettingsInput {
  rating_value: number;
  review_count: number;
  review_source_url: string | null;
  rating_visible: boolean;
}

export class SiteSettingsRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "SiteSettingsRequestError";
    this.status = status;
  }
}

const MAX_REVIEW_COUNT = 2147483647;
const MAX_REVIEW_URL_LENGTH = 500;

export function isSupabaseSiteSettingsUrl(url: string): boolean {
  try {
    const base =
      typeof window !== "undefined" ? window.location.origin : "https://www.amzadscout.com";
    const hostname = new URL(url, base).hostname.toLowerCase();
    return hostname === "supabase.co" || hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

function requestHeaders(url: string, extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = { ...extra };
  if (isSupabaseSiteSettingsUrl(url)) {
    headers.apikey = SUPABASE_ANON_KEY;
  }
  return headers;
}

export function isValidReviewSourceUrl(value: string): boolean {
  if (!value.startsWith("https://") || value.length > MAX_REVIEW_URL_LENGTH) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function reviewSourceLabel(url: string): string {
  let hostname = "";
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
  const bare = hostname.replace(/^www\./, "");
  if (
    bare === "g.page" ||
    bare.endsWith(".g.page") ||
    bare === "maps.app.goo.gl" ||
    /(^|\.)google\./.test(bare)
  ) {
    return "Google";
  }
  if (bare === "clutch.co" || bare.endsWith(".clutch.co")) return "Clutch";
  if (bare.includes("trustpilot")) return "Trustpilot";
  return bare;
}

export function canShowReviewsBadge(
  settings: SiteSettings | null | undefined,
): settings is SiteSettings & { review_source_url: string } {
  if (!settings || settings.rating_visible !== true) return false;
  if (typeof settings.rating_value !== "number" || !(settings.rating_value > 0)) return false;
  if (
    typeof settings.review_count !== "number" ||
    !Number.isInteger(settings.review_count) ||
    !(settings.review_count > 0)
  ) {
    return false;
  }
  return typeof settings.review_source_url === "string" && isValidReviewSourceUrl(settings.review_source_url);
}

export function reviewsBadgeAriaLabel(settings: SiteSettings & { review_source_url: string }): string {
  const noun = settings.review_count === 1 ? "review" : "reviews";
  const source = reviewSourceLabel(settings.review_source_url);
  return `Rated ${settings.rating_value.toFixed(1)} out of 5 from ${settings.review_count} ${source} ${noun}, opens in new tab`;
}

function isSiteSettings(value: unknown): value is SiteSettings {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.rating_value === "number" &&
    Number.isFinite(row.rating_value) &&
    typeof row.review_count === "number" &&
    Number.isFinite(row.review_count) &&
    (row.review_source_url === null || typeof row.review_source_url === "string") &&
    typeof row.rating_visible === "boolean" &&
    (row.updated_at === null || typeof row.updated_at === "string")
  );
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

function errorMessage(data: unknown, fallback: string): string {
  if (data && typeof data === "object" && typeof (data as { error?: unknown }).error === "string") {
    return (data as { error: string }).error;
  }
  return fallback;
}

export async function fetchSiteSettings(url: string = SITE_SETTINGS_API_URL): Promise<SiteSettings> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: requestHeaders(url),
    });
  } catch {
    throw new SiteSettingsRequestError(0, "Couldn't load review settings");
  }

  let data: unknown;
  try {
    data = await readJson(response);
  } catch {
    data = undefined;
  }

  if (!response.ok || data === undefined || !isSiteSettings(data)) {
    throw new SiteSettingsRequestError(response.status, errorMessage(data, "Couldn't load review settings"));
  }
  return data;
}

export async function saveSiteSettings(
  payload: SiteSettingsInput,
  url: string = SITE_SETTINGS_API_URL,
): Promise<SiteSettings> {
  const post = (token: string) =>
    fetch(url, {
      method: "POST",
      headers: requestHeaders(url, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify(payload),
    });

  const token = await authService.getValidAccessToken();
  if (!token) {
    throw new SiteSettingsRequestError(401, "Your session has expired. Please sign in again.");
  }

  let response: Response;
  try {
    response = await post(token);
  } catch {
    throw new SiteSettingsRequestError(0, "Couldn't save review settings");
  }

  if (response.status === 401) {
    const refreshed = await authService.refreshToken();
    const next = refreshed.data ? authService.getAccessToken() : null;
    if (!next) {
      let data: unknown;
      try {
        data = await readJson(response);
      } catch {
        data = undefined;
      }
      throw new SiteSettingsRequestError(401, errorMessage(data, "Your session has expired. Please sign in again."));
    }
    try {
      response = await post(next);
    } catch {
      throw new SiteSettingsRequestError(0, "Couldn't save review settings");
    }
  }

  let data: unknown;
  try {
    data = await readJson(response);
  } catch {
    data = undefined;
  }

  if (!response.ok || data === undefined || !isSiteSettings(data)) {
    throw new SiteSettingsRequestError(response.status, errorMessage(data, "Couldn't save review settings"));
  }
  return data;
}

export function useSiteSettings() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return useQuery({
    queryKey: ["site-settings", SITE_SETTINGS_API_URL],
    queryFn: () => fetchSiteSettings(SITE_SETTINGS_API_URL),
    enabled: mounted,
    retry: false,
    staleTime: 60_000,
  });
}

export function validateSiteSettingsInput(input: {
  ratingValue: string;
  reviewCount: string;
  reviewSourceUrl: string;
  ratingVisible: boolean;
}): { ok: true; value: SiteSettingsInput } | { ok: false; error: string } {
  if (input.ratingValue.trim() === "") {
    return { ok: false, error: "Rating must be a number from 0 to 5." };
  }
  const ratingNumber = Number(input.ratingValue);
  if (!Number.isFinite(ratingNumber) || ratingNumber < 0 || ratingNumber > 5) {
    return { ok: false, error: "Rating must be a number from 0 to 5." };
  }
  const rating_value = Number(ratingNumber.toFixed(1));
  if (rating_value < 0 || rating_value > 5) {
    return { ok: false, error: "Rating must be a number from 0 to 5." };
  }

  if (input.reviewCount.trim() === "") {
    return { ok: false, error: "Number of reviews must be a whole number, 0 or more." };
  }
  const reviewCount = Number(input.reviewCount);
  if (!Number.isInteger(reviewCount) || reviewCount < 0 || reviewCount > MAX_REVIEW_COUNT) {
    return { ok: false, error: "Number of reviews must be a whole number, 0 or more." };
  }

  const trimmed = input.reviewSourceUrl.trim();
  let review_source_url: string | null = null;
  if (trimmed !== "") {
    if (!isValidReviewSourceUrl(trimmed)) {
      return {
        ok: false,
        error: "Review source link must be an https URL of at most 500 characters.",
      };
    }
    review_source_url = trimmed;
  }

  if (input.ratingVisible && !(rating_value > 0 && reviewCount > 0 && review_source_url)) {
    return {
      ok: false,
      error: "Enter a rating above 0, at least one review, and a valid https link before showing the badge.",
    };
  }

  return {
    ok: true,
    value: {
      rating_value,
      review_count: reviewCount,
      review_source_url,
      rating_visible: input.ratingVisible,
    },
  };
}

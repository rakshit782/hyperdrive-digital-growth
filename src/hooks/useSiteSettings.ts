import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

let inFlightSettingsPromise: Promise<SiteSettings> | null = null;
let cachedSettingsData: { data: SiteSettings; timestamp: number } | null = null;
const CACHE_TTL_MS = 60_000;

export const SITE_SETTINGS_API_URL =
  (import.meta.env.VITE_SITE_SETTINGS_API_URL || "").trim();

export interface SiteSettings {
  rating_value: number;
  review_count: number;
  review_source_url: string | null;
  rating_visible: boolean;
  resend_api_key?: string | null;
  has_resend_api_key?: boolean;
  notification_email?: string | null;
  email_notifications_enabled?: boolean;
  email_subject_template?: string | null;
  email_html_template?: string | null;
  footer_email?: string | null;
  footer_address?: string | null;
  logo_settings?: any;
  header_settings?: any;
  maintenance_mode?: boolean;
  updated_at: string | null;
}

export interface SiteSettingsInput {
  rating_value?: number;
  review_count?: number;
  review_source_url?: string | null;
  rating_visible?: boolean;
  resend_api_key?: string | null;
  notification_email?: string | null;
  email_notifications_enabled?: boolean;
  email_subject_template?: string | null;
  email_html_template?: string | null;
  footer_email?: string | null;
  footer_address?: string | null;
  logo_settings?: any;
  header_settings?: any;
  maintenance_mode?: boolean;
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
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    if (typeof obj.error === "string") return obj.error;
    if (obj.error && typeof obj.error === "object" && typeof (obj.error as any).message === "string") {
      return (obj.error as any).message;
    }
  }
  return fallback;
}

import { adminCall, publicCall } from "@/services/apiClient";
import { authService } from "@/services/authService";

const EMPTY_SETTINGS: SiteSettings = {
  rating_value: 0, review_count: 0, review_source_url: null, rating_visible: false,
  resend_api_key: null, has_resend_api_key: false, notification_email: null, email_notifications_enabled: false,
  email_subject_template: null, email_html_template: null, footer_email: null, footer_address: null,
  logo_settings: null, header_settings: null, maintenance_mode: false, updated_at: null,
};

/**
 * Site settings from /api. Visitors get the public fields only; a signed-in admin also gets the
 * email settings (Resend key masked). The Resend key itself never reaches the browser.
 */
export async function fetchSiteSettings(_url?: string): Promise<SiteSettings> {
  const now = Date.now();
  if (cachedSettingsData && now - cachedSettingsData.timestamp < CACHE_TTL_MS) {
    return cachedSettingsData.data;
  }
  if (inFlightSettingsPromise) {
    return inFlightSettingsPromise;
  }
  inFlightSettingsPromise = (async () => {
    try {
      const isAdmin = authService.getUser()?.role === "admin";
      const data = isAdmin
        ? await adminCall<SiteSettings>("settings.get").catch(() => publicCall<SiteSettings>("settings.get"))
        : await publicCall<SiteSettings>("settings.get");
      const settings = { ...EMPTY_SETTINGS, ...data };
      cachedSettingsData = { data: settings, timestamp: Date.now() };
      return settings;
    } catch (err) {
      console.warn("Site settings not loaded:", err);
      return { ...EMPTY_SETTINGS };
    } finally {
      inFlightSettingsPromise = null;
    }
  })();
  return inFlightSettingsPromise;
}

export async function saveSiteSettings(
  payload: SiteSettingsInput,
  _url?: string,
): Promise<SiteSettings> {
  const saved = await adminCall<SiteSettings>("settings.save", { settings: payload });
  const result = { ...EMPTY_SETTINGS, ...saved };
  cachedSettingsData = { data: result, timestamp: Date.now() };
  inFlightSettingsPromise = null;
  return result;
}

export async function sendTestEmail(
  recipientEmail: string,
  resendApiKey?: string,
  _url: string = SITE_SETTINGS_API_URL,
): Promise<{ success: boolean; message: string }> {
  return adminCall<{ success: boolean; message: string }>("settings.test_email", {
    to: recipientEmail,
    resend_api_key: resendApiKey?.trim() || undefined,
  });
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
  resendApiKey?: string;
  notificationEmail?: string;
  emailNotificationsEnabled?: boolean;
  emailSubjectTemplate?: string;
  emailHtmlTemplate?: string;
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

  let notification_email: string | null = null;
  if (input.notificationEmail !== undefined && input.notificationEmail.trim() !== "") {
    notification_email = input.notificationEmail.trim();
  }

  let resend_api_key: string | null = null;
  if (input.resendApiKey !== undefined && input.resendApiKey.trim() !== "") {
    resend_api_key = input.resendApiKey.trim();
  }

  let email_subject_template: string | null = null;
  if (input.emailSubjectTemplate !== undefined && input.emailSubjectTemplate.trim() !== "") {
    email_subject_template = input.emailSubjectTemplate.trim();
  }

  let email_html_template: string | null = null;
  if (input.emailHtmlTemplate !== undefined && input.emailHtmlTemplate.trim() !== "") {
    email_html_template = input.emailHtmlTemplate.trim();
  }

  return {
    ok: true,
    value: {
      rating_value,
      review_count: reviewCount,
      review_source_url,
      rating_visible: input.ratingVisible,
      resend_api_key,
      notification_email,
      email_notifications_enabled: input.emailNotificationsEnabled ?? false,
      email_subject_template,
      email_html_template,
    },
  };
}

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
  resend_api_key?: string | null;
  has_resend_api_key?: boolean;
  notification_email?: string | null;
  email_notifications_enabled?: boolean;
  email_subject_template?: string | null;
  email_html_template?: string | null;
  footer_email?: string | null;
  footer_address?: string | null;
  logo_settings?: any;
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

import { getNeonSql } from "@/services/neonClient";

export async function fetchSiteSettings(_url?: string): Promise<SiteSettings> {
  // Directly query Neon database
  try {
    const sql = getNeonSql();
    const rows = await sql`
      SELECT 
        rating_value, review_count, review_source_url, rating_visible,
        resend_api_key, notification_email, email_notifications_enabled,
        email_subject_template, email_html_template, footer_email, footer_address,
        logo_settings, updated_at
      FROM public.site_settings
      WHERE id = 1;
    `;
    if (rows && rows.length > 0) {
      const r = rows[0];
      let displayKey = r.resend_api_key ?? null;
      if (displayKey && displayKey.length > 8) {
        displayKey = `${displayKey.slice(0, 5)}...${displayKey.slice(-4)}`;
      }
      return {
        rating_value: Number(r.rating_value) || 0,
        review_count: Number(r.review_count) || 0,
        review_source_url: r.review_source_url ?? null,
        rating_visible: r.rating_visible === true,
        resend_api_key: displayKey,
        has_resend_api_key: Boolean(r.resend_api_key && r.resend_api_key.trim().length > 0),
        notification_email: r.notification_email ?? null,
        email_notifications_enabled: r.email_notifications_enabled === true,
        email_subject_template: r.email_subject_template ?? null,
        email_html_template: r.email_html_template ?? null,
        footer_email: r.footer_email ?? null,
        footer_address: r.footer_address ?? null,
        logo_settings: r.logo_settings ?? null,
        updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : null,
      };
    }
  } catch (neonErr) {
    console.warn("Direct Neon fetch error:", neonErr);
  }

  return {
    rating_value: 0,
    review_count: 0,
    review_source_url: null,
    rating_visible: false,
    resend_api_key: null,
    has_resend_api_key: false,
    notification_email: null,
    email_notifications_enabled: false,
    email_subject_template: null,
    email_html_template: null,
    footer_email: null,
    footer_address: null,
    logo_settings: null,
    updated_at: null,
  };
}

export async function saveSiteSettings(
  payload: SiteSettingsInput,
  _url?: string,
): Promise<SiteSettings> {
  // Directly save to Neon database
  try {
    const sql = getNeonSql();
    
    // Check existing row to preserve API key and other fields if not re-entered
    const existing = await sql`
      SELECT 
        resend_api_key, notification_email, email_subject_template, 
        email_html_template, footer_email, footer_address, logo_settings
      FROM public.site_settings 
      WHERE id = 1;
    `;
    const existingRow = existing[0];
    
    let finalApiKey = payload.resend_api_key;
    if (!finalApiKey && existingRow?.resend_api_key) {
      finalApiKey = existingRow.resend_api_key;
    }

    const saved = await sql`
      INSERT INTO public.site_settings (
        id, rating_value, review_count, review_source_url, rating_visible,
        resend_api_key, notification_email, email_notifications_enabled,
        email_subject_template, email_html_template, footer_email, footer_address,
        logo_settings, updated_at
      )
      VALUES (
        1,
        ${payload.rating_value ?? 0},
        ${payload.review_count ?? 0},
        ${payload.review_source_url ?? null},
        ${payload.rating_visible ?? false},
        ${finalApiKey ?? null},
        ${payload.notification_email !== undefined ? payload.notification_email : (existingRow?.notification_email ?? null)},
        ${payload.email_notifications_enabled ?? false},
        ${payload.email_subject_template !== undefined ? payload.email_subject_template : (existingRow?.email_subject_template ?? null)},
        ${payload.email_html_template !== undefined ? payload.email_html_template : (existingRow?.email_html_template ?? null)},
        ${payload.footer_email !== undefined ? payload.footer_email : (existingRow?.footer_email ?? null)},
        ${payload.footer_address !== undefined ? payload.footer_address : (existingRow?.footer_address ?? null)},
        ${payload.logo_settings !== undefined ? JSON.stringify(payload.logo_settings) : (existingRow?.logo_settings ?? null)}::jsonb,
        now()
      )
      ON CONFLICT (id) DO UPDATE SET
        rating_value = EXCLUDED.rating_value,
        review_count = EXCLUDED.review_count,
        review_source_url = EXCLUDED.review_source_url,
        rating_visible = EXCLUDED.rating_visible,
        resend_api_key = COALESCE(EXCLUDED.resend_api_key, public.site_settings.resend_api_key),
        notification_email = COALESCE(EXCLUDED.notification_email, public.site_settings.notification_email),
        email_notifications_enabled = EXCLUDED.email_notifications_enabled,
        email_subject_template = COALESCE(EXCLUDED.email_subject_template, public.site_settings.email_subject_template),
        email_html_template = COALESCE(EXCLUDED.email_html_template, public.site_settings.email_html_template),
        footer_email = COALESCE(EXCLUDED.footer_email, public.site_settings.footer_email),
        footer_address = COALESCE(EXCLUDED.footer_address, public.site_settings.footer_address),
        logo_settings = COALESCE(EXCLUDED.logo_settings, public.site_settings.logo_settings),
        updated_at = now()
      RETURNING *;
    `;

    const row = saved[0];
    let displayKey = row.resend_api_key ?? null;
    if (displayKey && displayKey.length > 8) {
      displayKey = `${displayKey.slice(0, 5)}...${displayKey.slice(-4)}`;
    }

    return {
      rating_value: Number(row.rating_value) || 0,
      review_count: Number(row.review_count) || 0,
      review_source_url: row.review_source_url ?? null,
      rating_visible: row.rating_visible === true,
      resend_api_key: displayKey,
      has_resend_api_key: Boolean(row.resend_api_key && row.resend_api_key.trim().length > 0),
      notification_email: row.notification_email ?? null,
      email_notifications_enabled: row.email_notifications_enabled === true,
      email_subject_template: row.email_subject_template ?? null,
      email_html_template: row.email_html_template ?? null,
      footer_email: row.footer_email ?? null,
      footer_address: row.footer_address ?? null,
      logo_settings: row.logo_settings ?? null,
      updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
    };
  } catch (neonErr: any) {
    console.error("Direct Neon save error:", neonErr);
    throw new Error(neonErr?.message || "Failed to save settings to Neon database");
  }
}

export async function sendTestEmail(
  recipientEmail: string,
  resendApiKey?: string,
  url: string = SITE_SETTINGS_API_URL,
): Promise<{ success: boolean; message: string }> {
  let effectiveApiKey = resendApiKey?.trim();

  // If apiKey not provided or masked (e.g. 4bff4...7e4c), load full key directly from Neon database
  if (!effectiveApiKey || effectiveApiKey.includes("...")) {
    try {
      const sql = getNeonSql();
      const rows = await sql`
        SELECT resend_api_key FROM public.site_settings WHERE id = 1 LIMIT 1;
      `;
      if (rows && rows[0]?.resend_api_key) {
        effectiveApiKey = rows[0].resend_api_key;
      }
    } catch (dbErr) {
      console.warn("Could not load API key from Neon:", dbErr);
    }
  }

  if (!effectiveApiKey) {
    throw new Error("No Resend API key found. Please save your Resend API key first.");
  }

  // Dispatch directly to Resend API
  try {
    const directResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${effectiveApiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AMZ Leads <onboarding@resend.dev>",
        to: recipientEmail.split(",").map((e) => e.trim()).filter(Boolean),
        subject: "AMZ AD SCOUT: Test Lead Delivery Verification",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0284c7; margin-top: 0;">🚀 Resend Integration Successful!</h2>
            <p style="font-size: 15px; color: #334155;">
              Your Resend API key and notification email pipeline are connected and functioning properly with Neon database.
            </p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0; font-size: 14px;">
              <p style="margin: 4px 0;"><strong>Recipient:</strong> ${recipientEmail}</p>
              <p style="margin: 4px 0;"><strong>Dispatched At:</strong> ${new Date().toUTCString()}</p>
              <p style="margin: 4px 0;"><strong>Sender:</strong> AMZ Leads &lt;onboarding@resend.dev&gt;</p>
            </div>
            <p style="font-size: 13px; color: #64748b;">
              All future leads received through your website audit forms will be sent to this email address.
            </p>
          </div>
        `,
      }),
    });

    const resData = await readJson(directResponse);
    if (!directResponse.ok) {
      const errorMsg = errorMessage(
        resData,
        `Resend API error (${directResponse.status})`
      );
      throw new Error(errorMsg);
    }

    return {
      success: true,
      message: "Test email delivered successfully via Resend!",
    };
  } catch (directErr: any) {
    console.error("Direct Resend error:", directErr);
    throw new Error(directErr.message || "Failed to deliver test email via Resend API");
  }
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

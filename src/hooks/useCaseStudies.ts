import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { caseStudiesEndpoint, caseStudiesHeaders } from "@/lib/api";
import { readCaseStudiesSnapshot } from "@/lib/caseStudiesSnapshot";
import { CHANNELS, type Channel, isChannel } from "@/content/caseStudiesCopy";

export { CHANNELS, type Channel };

export interface CaseStudyMetric {
  label: string;
  before: string | null;
  after: string;
  unit: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  brand_name: string;
  channel: Channel | string;
  category: string | null;
  logo_url: string | null;
  challenge: string | null;
  solution: string | null;
  results: CaseStudyMetric[];
  time_period: string | null;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ImportError {
  row: number;
  column: string;
  message: string;
}

export interface ImportPreviewRow {
  row: number;
  brand_name: string;
  channel: string;
  metrics: number;
  errors: ImportError[];
}

export interface ImportPreview {
  rows: ImportPreviewRow[];
  errors: ImportError[];
  imported?: number;
}

export class CaseStudiesApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "CaseStudiesApiError";
    this.status = status;
  }
}

export const PUBLIC_CASE_STUDIES_KEY = ["case-studies", "published"] as const;
export const ADMIN_CASE_STUDIES_KEY = ["case-studies", "admin"] as const;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text ? text : null;
}

function parseResults(value: unknown): CaseStudyMetric[] {
  let raw = value;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 6).map((item) => {
    const row = asRecord(item) || {};
    const before = row.before == null || row.before === "" ? null : String(row.before);
    return {
      label: row.label == null ? "" : String(row.label),
      before,
      after: row.after == null ? "" : String(row.after),
      unit: row.unit == null ? "" : String(row.unit),
    };
  });
}

export function normalizeCaseStudy(value: unknown): CaseStudy | null {
  const row = asRecord(value);
  if (!row) return null;
  const brand = asString(row.brand_name) || asString(row.brand) || "";
  const slug = asString(row.slug) || "";
  if (!brand && !slug) return null;
  const channelRaw = asString(row.channel) || "";
  return {
    id: asString(row.id) || slug || brand,
    slug,
    brand_name: brand,
    channel: isChannel(channelRaw) ? channelRaw : channelRaw,
    category: asString(row.category),
    logo_url: asString(row.logo_url) || asString(row.logo),
    challenge: asString(row.challenge),
    solution: asString(row.solution),
    results: parseResults(row.results),
    time_period: asString(row.time_period),
    testimonial_quote: asString(row.testimonial_quote) || asString(row.quote),
    testimonial_author: asString(row.testimonial_author) || asString(row.author),
    published: row.published === undefined ? true : Boolean(row.published),
    sort_order: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : 0,
    created_at: asString(row.created_at) || "",
    updated_at: asString(row.updated_at) || asString(row.created_at) || "",
  };
}

export function compareCaseStudies(a: CaseStudy, b: CaseStudy): number {
  const order = (a.sort_order ?? 0) - (b.sort_order ?? 0);
  if (order !== 0) return order;
  const aTime = Date.parse(a.created_at || "") || 0;
  const bTime = Date.parse(b.created_at || "") || 0;
  return bTime - aTime;
}

function listFromPayload(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const row = asRecord(payload);
  if (!row) return [];
  for (const key of ["case_studies", "caseStudies", "rows", "data", "results", "items"]) {
    if (Array.isArray(row[key])) return row[key] as unknown[];
  }
  return [];
}

export function parseCaseStudyList(payload: unknown): CaseStudy[] {
  return listFromPayload(payload)
    .map(normalizeCaseStudy)
    .filter((row): row is CaseStudy => !!row && !!row.slug)
    .sort(compareCaseStudies);
}

async function readError(response: Response): Promise<string> {
  const data = await response.json().catch(() => null);
  const row = asRecord(data);
  const message = row && typeof row.error === "string" ? row.error : "";
  return message || `Request failed (${response.status})`;
}

async function publicGet(params?: Record<string, string>): Promise<unknown> {
  const response = await fetch(caseStudiesEndpoint(params), {
    headers: caseStudiesHeaders(),
  });
  if (!response.ok) {
    throw new CaseStudiesApiError(response.status, await readError(response));
  }
  return response.json().catch(() => null);
}

export async function fetchPublishedCaseStudies(): Promise<CaseStudy[]> {
  const payload = await publicGet();
  return parseCaseStudyList(payload).filter((row) => row.published !== false);
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const payload = await publicGet({ slug });
  const direct = normalizeCaseStudy(payload);
  if (direct && direct.slug === slug) return direct.published === false ? null : direct;
  const list = parseCaseStudyList(payload).filter((row) => row.slug === slug && row.published !== false);
  return list[0] || null;
}

async function adminFetch(params: Record<string, string> | undefined, init: RequestInit, allowRefresh = true): Promise<Response> {
  const token = authService.getAccessToken();
  if (!token) {
    throw new CaseStudiesApiError(401, "Session expired, please log in again");
  }
  const headers = caseStudiesHeaders({
    Authorization: `Bearer ${token}`,
    ...(init.body ? { "Content-Type": "application/json" } : {}),
  });
  const response = await fetch(caseStudiesEndpoint(params), { ...init, headers });
  if (response.status === 401 && allowRefresh) {
    const refreshed = await authService.refreshToken();
    if (refreshed.data) return adminFetch(params, init, false);
    throw new CaseStudiesApiError(401, "Session expired, please log in again");
  }
  return response;
}

async function adminJson<T>(params: Record<string, string> | undefined, init: RequestInit): Promise<T> {
  const response = await adminFetch(params, init);
  if (!response.ok) {
    throw new CaseStudiesApiError(response.status, await readError(response));
  }
  if (response.status === 204) return {} as T;
  return (await response.json().catch(() => ({}))) as T;
}

export async function fetchAllCaseStudies(): Promise<CaseStudy[]> {
  const payload = await adminJson<unknown>({ all: "1" }, { method: "GET" });
  return parseCaseStudyList(payload);
}

export type CaseStudyWrite = Partial<Omit<CaseStudy, "id" | "created_at" | "updated_at">> & {
  brand_name: string;
};

export async function createCaseStudy(body: CaseStudyWrite): Promise<CaseStudy> {
  const payload = await adminJson<unknown>(undefined, { method: "POST", body: JSON.stringify(body) });
  return normalizeCaseStudy(payload) || normalizeCaseStudy(asRecord(payload)?.case_study) || {
    ...emptyStudy(),
    ...body,
    id: "",
    slug: body.slug || "",
    published: Boolean(body.published),
    results: body.results || [],
  };
}

export async function updateCaseStudy(id: string, body: Partial<CaseStudyWrite>): Promise<void> {
  await adminJson({ id }, { method: "PUT", body: JSON.stringify(body) });
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await adminJson({ id }, { method: "DELETE" });
}

function emptyStudy(): CaseStudy {
  return {
    id: "",
    slug: "",
    brand_name: "",
    channel: "",
    category: null,
    logo_url: null,
    challenge: null,
    solution: null,
    results: [],
    time_period: null,
    testimonial_quote: null,
    testimonial_author: null,
    published: false,
    sort_order: 0,
    created_at: "",
    updated_at: "",
  };
}

function parseImportErrors(value: unknown): ImportError[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const row = asRecord(item) || {};
    return {
      row: Number(row.row ?? row.line ?? 0),
      column: row.column == null ? "" : String(row.column),
      message: row.message == null ? "Invalid value" : String(row.message),
    };
  });
}

export function parseImportPreview(payload: unknown): ImportPreview {
  const record = asRecord(payload) || {};
  const errors = parseImportErrors(record.errors);
  const rawRows = listFromPayload(record.rows ? { rows: record.rows } : record.parsed ? { rows: record.parsed } : payload);
  const errorsByRow = new Map<number, ImportError[]>();
  for (const error of errors) {
    const list = errorsByRow.get(error.row) || [];
    list.push(error);
    errorsByRow.set(error.row, list);
  }
  const rows: ImportPreviewRow[] = rawRows.map((item, index) => {
    const row = asRecord(item) || {};
    const rowNumber = Number(row.row ?? row.line ?? row.row_number ?? index + 3);
    const results = parseResults(row.results);
    const metricCount = results.length || Number(row.metrics ?? row.metric_count ?? 0) || 0;
    return {
      row: rowNumber,
      brand_name: asString(row.brand_name) || asString(row.brand) || "",
      channel: asString(row.channel) || "",
      metrics: metricCount,
      errors: errorsByRow.get(rowNumber) || parseImportErrors(row.errors),
    };
  });
  const known = new Set(rows.map((row) => row.row));
  for (const [rowNumber, rowErrors] of errorsByRow) {
    if (!known.has(rowNumber)) {
      rows.push({
        row: rowNumber,
        brand_name: "",
        channel: "",
        metrics: 0,
        errors: rowErrors,
      });
    }
  }
  rows.sort((a, b) => a.row - b.row);
  const imported = Number(record.imported ?? record.created ?? record.count);
  return {
    rows,
    errors,
    imported: Number.isFinite(imported) ? imported : undefined,
  };
}

export async function importCaseStudies(csv: string, dryRun: boolean): Promise<ImportPreview> {
  const payload = await adminJson<unknown>(
    { action: "import" },
    { method: "POST", body: JSON.stringify({ csv, dry_run: dryRun }) },
  );
  return parseImportPreview(payload);
}

export function slugifyBrand(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function usePublishedCaseStudies() {
  const snapshot = readCaseStudiesSnapshot();
  const query = useQuery({
    queryKey: PUBLIC_CASE_STUDIES_KEY,
    queryFn: fetchPublishedCaseStudies,
    initialData: snapshot.fromBuild ? snapshot.rows : undefined,
    initialDataUpdatedAt: snapshot.fromBuild ? 0 : undefined,
    staleTime: 0,
    refetchOnMount: true,
    retry: 1,
  });
  return {
    ...query,
    rows: query.data ?? [],
    fromBuild: snapshot.fromBuild,
  };
}

export function useAdminCaseStudies() {
  return useQuery({
    queryKey: ADMIN_CASE_STUDIES_KEY,
    queryFn: fetchAllCaseStudies,
    retry: false,
  });
}

export function useInvalidateCaseStudies() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_CASE_STUDIES_KEY });
    queryClient.invalidateQueries({ queryKey: PUBLIC_CASE_STUDIES_KEY });
  };
}

export const EXAMPLE_ROW_MESSAGE = "Example row from the template - replace or delete it";

export const CHANNELS = ["amazon", "walmart", "meta", "google", "shopify"] as const;

export type Channel = typeof CHANNELS[number];

export type ResultMetric = {
  label: string;
  before: number | null;
  after: number;
  unit: string;
};

export type CaseStudyWrite = {
  brand_name: string;
  channel: Channel;
  category: string | null;
  logo_url: string | null;
  challenge: string | null;
  solution: string | null;
  results: ResultMetric[];
  time_period: string | null;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  published: boolean;
  sort_order: number;
};

export type ImportRow = CaseStudyWrite & { slug: string };

export type FieldError = { column: string; message: string };

export type RowError = { row: number; column: string; message: string };

export type CsvRecord = { line: number; fields: string[] };

export type ImportParse =
  | { ok: false; error: string }
  | { ok: true; rows: ImportRow[]; errors: RowError[] };

const KNOWN_HEADERS = new Set<string>([
  "brand_name",
  "channel",
  "category",
  "logo_url",
  "challenge",
  "solution",
  "time_period",
  "testimonial_quote",
  "testimonial_author",
  "sort_order",
]);

for (let i = 1; i <= 4; i++) {
  KNOWN_HEADERS.add(`metric${i}_label`);
  KNOWN_HEADERS.add(`metric${i}_before`);
  KNOWN_HEADERS.add(`metric${i}_after`);
  KNOWN_HEADERS.add(`metric${i}_unit`);
}

const IGNORED_HEADERS = new Set(["published"]);

const MAX_DATA_ROWS = 200;

export function slugify(brandName: string): string {
  const base = brandName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
  return base || "case-study";
}

export function withUniqueSlugs(rows: CaseStudyWrite[]): ImportRow[] {
  const used = new Set<string>();
  return rows.map((row) => {
    const base = slugify(row.brand_name);
    let slug = base;
    let n = 2;
    while (used.has(slug)) {
      slug = `${base}-${n}`;
      n++;
    }
    used.add(slug);
    return { ...row, slug };
  });
}

export function parseMetricNumber(raw: string): number | null {
  const cleaned = raw.trim().replace(/\$/g, "").replace(/%/g, "").replace(/,/g, "");
  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function stripBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function skipHashLinesBeforeHeader(text: string): { rest: string; skippedLines: number } {
  let i = 0;
  let skippedLines = 0;
  while (i < text.length) {
    let j = i;
    while (j < text.length && text[j] !== "\n" && text[j] !== "\r") j++;
    if (!text.slice(i, j).startsWith("#")) break;
    skippedLines++;
    if (text[j] === "\r" && text[j + 1] === "\n") j += 2;
    else if (j < text.length) j += 1;
    i = j;
  }
  return { rest: text.slice(i), skippedLines };
}

export function parseCsv(text: string, lineOffset = 0): { records: CsvRecord[]; unclosedQuote: boolean } {
  const records: CsvRecord[] = [];
  let field = "";
  let fields: string[] = [];
  let line = 1 + lineOffset;
  let recordLine = line;
  let i = 0;
  let inQuotes = false;

  const endRecord = () => {
    fields.push(field);
    records.push({ line: recordLine, fields });
    field = "";
    fields = [];
  };

  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      if (c === "\r") {
        field += "\n";
        i += text[i + 1] === "\n" ? 2 : 1;
        line++;
        continue;
      }
      if (c === "\n") {
        field += "\n";
        line++;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }

    if (c === '"' && field.length === 0) {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      fields.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r" || c === "\n") {
      i += c === "\r" && text[i + 1] === "\n" ? 2 : 1;
      line++;
      endRecord();
      recordLine = line;
      continue;
    }
    field += c;
    i++;
  }

  if (field.length > 0 || fields.length > 0 || inQuotes) {
    endRecord();
  }

  return { records, unclosedQuote: inQuotes };
}

function classifyHeaders(fields: string[]): { error?: string; index: Map<string, number> } {
  const index = new Map<string, number>();
  const unknown: string[] = [];
  const duplicate: string[] = [];
  const last = fields.length - 1;

  fields.forEach((raw, i) => {
    const name = raw.trim().toLowerCase();
    if (name === "") {
      if (i === last) return;
      unknown.push("(blank)");
      return;
    }
    if (IGNORED_HEADERS.has(name)) return;
    if (!KNOWN_HEADERS.has(name)) {
      unknown.push(raw.trim());
      return;
    }
    if (index.has(name)) duplicate.push(name);
    else index.set(name, i);
  });

  if (unknown.length > 0) return { error: `Unknown headers: ${unknown.join(", ")}`, index };
  if (duplicate.length > 0) return { error: `Duplicate headers: ${duplicate.join(", ")}`, index };
  if (!index.has("brand_name") || !index.has("channel")) {
    return { error: "CSV header row must include brand_name and channel", index };
  }
  return { index };
}

function isBlankRecord(fields: string[]): boolean {
  return fields.every((field) => field.trim() === "");
}

function readBrand(raw: string, errors: FieldError[]): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    errors.push({ column: "brand_name", message: "Brand name is required" });
    return "";
  }
  if (trimmed.length > 120) {
    errors.push({ column: "brand_name", message: "Brand name must be 1-120 characters" });
  }
  return trimmed;
}

function readChannel(raw: string, errors: FieldError[]): Channel | "" {
  const channel = raw.trim().toLowerCase();
  if (!CHANNELS.includes(channel as Channel)) {
    errors.push({
      column: "channel",
      message: "Channel must be one of amazon, walmart, meta, google, shopify",
    });
    return "";
  }
  return channel as Channel;
}

function readOptionalText(
  raw: string,
  column: string,
  max: number,
  label: string,
  errors: FieldError[],
): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) {
    errors.push({ column, message: `${label} must be at most ${max} characters` });
    return null;
  }
  return trimmed;
}

function isHttpsUrl(value: string): boolean {
  if (!value.startsWith("https://")) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function readLogo(raw: string, errors: FieldError[]): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.length > 500) {
    errors.push({ column: "logo_url", message: "Logo URL must be at most 500 characters" });
    return null;
  }
  if (!isHttpsUrl(trimmed)) {
    errors.push({ column: "logo_url", message: "Logo URL must start with https://" });
    return null;
  }
  return trimmed;
}

function readSortOrder(raw: string, errors: FieldError[]): number {
  const trimmed = raw.trim();
  if (!trimmed) return 0;
  if (!/^-?\d+$/.test(trimmed)) {
    errors.push({ column: "sort_order", message: "Sort order must be an integer" });
    return 0;
  }
  const value = Number(trimmed);
  if (!Number.isSafeInteger(value) || value < -2147483648 || value > 2147483647) {
    errors.push({ column: "sort_order", message: "Sort order must be an integer" });
    return 0;
  }
  return value;
}

function readCsvMetrics(get: (name: string) => string, errors: FieldError[]): ResultMetric[] {
  const results: ResultMetric[] = [];
  for (let i = 1; i <= 4; i++) {
    const labelRaw = get(`metric${i}_label`).trim();
    const beforeRaw = get(`metric${i}_before`).trim();
    const afterRaw = get(`metric${i}_after`).trim();
    const unit = get(`metric${i}_unit`).trim();
    if (labelRaw === "" && afterRaw === "") continue;

    let ok = true;
    if (!labelRaw || labelRaw.length > 80) {
      errors.push({
        column: `metric${i}_label`,
        message: labelRaw ? "Metric label must be 1-80 characters" : "Metric label is required",
      });
      ok = false;
    }
    let after = 0;
    if (!afterRaw) {
      errors.push({ column: `metric${i}_after`, message: "Metric after value is required" });
      ok = false;
    } else {
      const parsed = parseMetricNumber(afterRaw);
      if (parsed === null) {
        errors.push({ column: `metric${i}_after`, message: "Metric after must be a number" });
        ok = false;
      } else {
        after = parsed;
      }
    }
    let before: number | null = null;
    if (beforeRaw) {
      const parsed = parseMetricNumber(beforeRaw);
      if (parsed === null) {
        errors.push({ column: `metric${i}_before`, message: "Metric before must be a number" });
        ok = false;
      } else {
        before = parsed;
      }
    }
    if (unit.length > 20) {
      errors.push({ column: `metric${i}_unit`, message: "Metric unit must be at most 20 characters" });
      ok = false;
    }
    if (ok) results.push({ label: labelRaw, before, after, unit });
  }
  return results;
}

function validateCsvRecord(
  fields: string[],
  headerLength: number,
  index: Map<string, number>,
): { errors: FieldError[]; value?: CaseStudyWrite } {
  const errors: FieldError[] = [];
  if (fields.length > headerLength && fields.slice(headerLength).some((field) => field.trim() !== "")) {
    errors.push({ column: "csv", message: "Row has more columns than the header" });
  }

  const get = (name: string) => {
    const at = index.get(name);
    if (at === undefined) return "";
    return fields[at] ?? "";
  };

  const brand = readBrand(get("brand_name"), errors);
  if (brand.toLowerCase().startsWith("example")) {
    errors.push({ column: "brand_name", message: EXAMPLE_ROW_MESSAGE });
  }
  const channel = readChannel(get("channel"), errors);
  const category = readOptionalText(get("category"), "category", 120, "Category", errors);
  const logoUrl = readLogo(get("logo_url"), errors);
  const challenge = readOptionalText(get("challenge"), "challenge", 4000, "Challenge", errors);
  const solution = readOptionalText(get("solution"), "solution", 4000, "Solution", errors);
  const timePeriod = readOptionalText(get("time_period"), "time_period", 80, "Time period", errors);
  const quote = readOptionalText(get("testimonial_quote"), "testimonial_quote", 1000, "Testimonial quote", errors);
  const author = readOptionalText(get("testimonial_author"), "testimonial_author", 120, "Testimonial author", errors);
  const sortOrder = readSortOrder(get("sort_order"), errors);
  const results = readCsvMetrics(get, errors);

  if (errors.length > 0 || !channel) return { errors };
  return {
    errors,
    value: {
      brand_name: brand,
      channel,
      category,
      logo_url: logoUrl,
      challenge,
      solution,
      results,
      time_period: timePeriod,
      testimonial_quote: quote,
      testimonial_author: author,
      published: false,
      sort_order: sortOrder,
    },
  };
}

export function parseCaseStudyImport(csv: string): ImportParse {
  if (typeof csv !== "string") return { ok: false, error: "csv must be a string" };
  const { rest, skippedLines } = skipHashLinesBeforeHeader(stripBom(csv));
  const { records, unclosedQuote } = parseCsv(rest, skippedLines);
  if (unclosedQuote) return { ok: false, error: "CSV has an unclosed quote" };
  if (records.length === 0) return { ok: false, error: "CSV header row is required" };

  const header = records[0];
  const classified = classifyHeaders(header.fields);
  if (classified.error) return { ok: false, error: classified.error };

  const data = records.slice(1).filter((record) => !isBlankRecord(record.fields));
  if (data.length > MAX_DATA_ROWS) {
    return { ok: false, error: "A maximum of 200 data rows is allowed" };
  }

  const errors: RowError[] = [];
  const valid: CaseStudyWrite[] = [];
  for (const record of data) {
    const result = validateCsvRecord(record.fields, header.fields.length, classified.index);
    if (result.errors.length > 0 || !result.value) {
      for (const error of result.errors) {
        errors.push({ row: record.line, column: error.column, message: error.message });
      }
      continue;
    }
    valid.push(result.value);
  }

  return { ok: true, rows: withUniqueSlugs(valid), errors };
}

function errorText(errors: FieldError[]): string {
  return errors.map((error) => error.message).join("; ");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function validateResults(value: unknown, errors: FieldError[]): ResultMetric[] | undefined {
  if (!Array.isArray(value)) {
    errors.push({ column: "results", message: "Results must be an array of at most 6 metrics" });
    return;
  }
  if (value.length > 6) {
    errors.push({ column: "results", message: "Results must be an array of at most 6 metrics" });
    return;
  }
  const metrics: ResultMetric[] = [];
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    const prefix = `results[${i}]`;
    if (!isRecord(item)) {
      errors.push({ column: prefix, message: "Each result must be an object with label, before, after, and unit" });
      continue;
    }
    let ok = true;
    let label = "";
    if (typeof item.label !== "string" || item.label.trim() === "" || item.label.trim().length > 80) {
      errors.push({ column: `${prefix}.label`, message: "Metric label must be 1-80 characters" });
      ok = false;
    } else {
      label = item.label.trim();
    }
    let before: number | null = null;
    if (item.before !== null && item.before !== undefined) {
      if (typeof item.before !== "number" || !Number.isFinite(item.before)) {
        errors.push({ column: `${prefix}.before`, message: "Metric before must be a number or null" });
        ok = false;
      } else {
        before = item.before;
      }
    }
    let after = 0;
    if (typeof item.after !== "number" || !Number.isFinite(item.after)) {
      errors.push({ column: `${prefix}.after`, message: "Metric after must be a number" });
      ok = false;
    } else {
      after = item.after;
    }
    let unit = "";
    if (item.unit === undefined || item.unit === null) {
      unit = "";
    } else if (typeof item.unit !== "string") {
      errors.push({ column: `${prefix}.unit`, message: "Metric unit must be a string of at most 20 characters" });
      ok = false;
    } else if (item.unit.trim().length > 20) {
      errors.push({ column: `${prefix}.unit`, message: "Metric unit must be at most 20 characters" });
      ok = false;
    } else {
      unit = item.unit.trim();
    }
    if (ok) metrics.push({ label, before, after, unit });
  }
  return errors.some((error) => error.column === "results" || error.column.startsWith("results["))
    ? undefined
    : metrics;
}

function readJsonBrand(value: unknown, errors: FieldError[], required: boolean): string | undefined {
  if (value === undefined) {
    if (required) errors.push({ column: "brand_name", message: "Brand name is required" });
    return;
  }
  if (typeof value !== "string") {
    errors.push({ column: "brand_name", message: "Brand name is required" });
    return;
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 120) {
    errors.push({
      column: "brand_name",
      message: trimmed ? "Brand name must be 1-120 characters" : "Brand name is required",
    });
    return;
  }
  return trimmed;
}

function readJsonChannel(value: unknown, errors: FieldError[], required: boolean): Channel | undefined {
  if (value === undefined) {
    if (required) {
      errors.push({
        column: "channel",
        message: "Channel must be one of amazon, walmart, meta, google, shopify",
      });
    }
    return;
  }
  if (typeof value !== "string") {
    errors.push({
      column: "channel",
      message: "Channel must be one of amazon, walmart, meta, google, shopify",
    });
    return;
  }
  const channel = value.trim().toLowerCase();
  if (!CHANNELS.includes(channel as Channel)) {
    errors.push({
      column: "channel",
      message: "Channel must be one of amazon, walmart, meta, google, shopify",
    });
    return;
  }
  return channel as Channel;
}

function readJsonOptionalText(
  value: unknown,
  column: string,
  max: number,
  label: string,
  errors: FieldError[],
): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") {
    errors.push({ column, message: `${label} must be a string` });
    return undefined;
  }
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) {
    errors.push({ column, message: `${label} must be at most ${max} characters` });
    return undefined;
  }
  return trimmed;
}

function readJsonLogo(value: unknown, errors: FieldError[]): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") {
    errors.push({ column: "logo_url", message: "Logo URL must start with https://" });
    return undefined;
  }
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > 500) {
    errors.push({ column: "logo_url", message: "Logo URL must be at most 500 characters" });
    return undefined;
  }
  if (!isHttpsUrl(trimmed)) {
    errors.push({ column: "logo_url", message: "Logo URL must start with https://" });
    return undefined;
  }
  return trimmed;
}

function readJsonSort(value: unknown, errors: FieldError[], requiredDefault: boolean): number | undefined {
  if (value === undefined) return requiredDefault ? 0 : undefined;
  if (typeof value !== "number" || !Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
    errors.push({ column: "sort_order", message: "Sort order must be an integer" });
    return undefined;
  }
  return value;
}

function readJsonPublished(value: unknown, errors: FieldError[], requiredDefault: boolean): boolean | undefined {
  if (value === undefined) return requiredDefault ? false : undefined;
  if (typeof value !== "boolean") {
    errors.push({ column: "published", message: "Published must be true or false" });
    return undefined;
  }
  return value;
}

export function validateSlug(value: unknown, errors: FieldError[]): string | undefined {
  if (typeof value !== "string" || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value.trim()) || value.trim().length > 160) {
    errors.push({ column: "slug", message: "Slug must be lowercase letters, numbers, and hyphens" });
    return;
  }
  return value.trim();
}

export function validateCreateBody(body: unknown): { ok: true; value: CaseStudyWrite } | { ok: false; error: string } {
  if (!isRecord(body)) return { ok: false, error: "Request body must be a JSON object" };
  const errors: FieldError[] = [];
  const brand = readJsonBrand(body.brand_name, errors, true);
  const channel = readJsonChannel(body.channel, errors, true);
  const category = readJsonOptionalText(body.category, "category", 120, "Category", errors);
  const logoUrl = readJsonLogo(body.logo_url, errors);
  const challenge = readJsonOptionalText(body.challenge, "challenge", 4000, "Challenge", errors);
  const solution = readJsonOptionalText(body.solution, "solution", 4000, "Solution", errors);
  const timePeriod = readJsonOptionalText(body.time_period, "time_period", 80, "Time period", errors);
  const quote = readJsonOptionalText(body.testimonial_quote, "testimonial_quote", 1000, "Testimonial quote", errors);
  const author = readJsonOptionalText(body.testimonial_author, "testimonial_author", 120, "Testimonial author", errors);
  const sortOrder = readJsonSort(body.sort_order, errors, true);
  const published = readJsonPublished(body.published, errors, true);
  const results = body.results === undefined ? [] : validateResults(body.results, errors);

  if (
    errors.length > 0 ||
    brand === undefined ||
    channel === undefined ||
    sortOrder === undefined ||
    published === undefined ||
    results === undefined
  ) {
    return { ok: false, error: errorText(errors) || "Validation failed" };
  }

  return {
    ok: true,
    value: {
      brand_name: brand,
      channel,
      category: category ?? null,
      logo_url: logoUrl ?? null,
      challenge: challenge ?? null,
      solution: solution ?? null,
      results,
      time_period: timePeriod ?? null,
      testimonial_quote: quote ?? null,
      testimonial_author: author ?? null,
      published,
      sort_order: sortOrder,
    },
  };
}

export type CaseStudyPatch = Partial<CaseStudyWrite> & { slug?: string };

export function validateUpdateBody(body: unknown): { ok: true; patch: CaseStudyPatch } | { ok: false; error: string } {
  if (!isRecord(body)) return { ok: false, error: "Request body must be a JSON object" };
  const errors: FieldError[] = [];
  const patch: CaseStudyPatch = {};

  if ("slug" in body) {
    const slug = validateSlug(body.slug, errors);
    if (slug) patch.slug = slug;
  }
  if ("brand_name" in body) {
    const brand = readJsonBrand(body.brand_name, errors, true);
    if (brand) patch.brand_name = brand;
  }
  if ("channel" in body) {
    const channel = readJsonChannel(body.channel, errors, true);
    if (channel) patch.channel = channel;
  }
  if ("category" in body) {
    const category = readJsonOptionalText(body.category, "category", 120, "Category", errors);
    if (category !== undefined && !errors.some((error) => error.column === "category")) patch.category = category;
  }
  if ("logo_url" in body) {
    const logo = readJsonLogo(body.logo_url, errors);
    if (logo !== undefined && !errors.some((error) => error.column === "logo_url")) patch.logo_url = logo;
  }
  if ("challenge" in body) {
    const challenge = readJsonOptionalText(body.challenge, "challenge", 4000, "Challenge", errors);
    if (challenge !== undefined && !errors.some((error) => error.column === "challenge")) patch.challenge = challenge;
  }
  if ("solution" in body) {
    const solution = readJsonOptionalText(body.solution, "solution", 4000, "Solution", errors);
    if (solution !== undefined && !errors.some((error) => error.column === "solution")) patch.solution = solution;
  }
  if ("time_period" in body) {
    const timePeriod = readJsonOptionalText(body.time_period, "time_period", 80, "Time period", errors);
    if (timePeriod !== undefined && !errors.some((error) => error.column === "time_period")) {
      patch.time_period = timePeriod;
    }
  }
  if ("testimonial_quote" in body) {
    const quote = readJsonOptionalText(body.testimonial_quote, "testimonial_quote", 1000, "Testimonial quote", errors);
    if (quote !== undefined && !errors.some((error) => error.column === "testimonial_quote")) {
      patch.testimonial_quote = quote;
    }
  }
  if ("testimonial_author" in body) {
    const author = readJsonOptionalText(body.testimonial_author, "testimonial_author", 120, "Testimonial author", errors);
    if (author !== undefined && !errors.some((error) => error.column === "testimonial_author")) {
      patch.testimonial_author = author;
    }
  }
  if ("results" in body) {
    const results = validateResults(body.results, errors);
    if (results) patch.results = results;
  }
  if ("published" in body) {
    const published = readJsonPublished(body.published, errors, false);
    if (published !== undefined) patch.published = published;
  }
  if ("sort_order" in body) {
    const sortOrder = readJsonSort(body.sort_order, errors, false);
    if (sortOrder !== undefined) patch.sort_order = sortOrder;
  }

  if (errors.length > 0) return { ok: false, error: errorText(errors) };
  return { ok: true, patch };
}

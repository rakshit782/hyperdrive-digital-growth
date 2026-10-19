import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import {
  EXAMPLE_ROW_MESSAGE,
  parseCaseStudyImport,
  parseCsv,
  parseMetricNumber,
  validateCreateBody,
  validateReorderBody,
} from "./validate.ts";

const HEADER = [
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
  "metric1_label",
  "metric1_before",
  "metric1_after",
  "metric1_unit",
  "metric2_label",
  "metric2_before",
  "metric2_after",
  "metric2_unit",
  "metric3_label",
  "metric3_before",
  "metric3_after",
  "metric3_unit",
  "metric4_label",
  "metric4_before",
  "metric4_after",
  "metric4_unit",
].join(",");

Deno.test("parser keeps quotes, commas, escaped quotes, and newlines", () => {
  const csv = `brand_name,channel,challenge\r\n"Say ""hi"", friend",amazon,"line one\r\nline two"\r\n`;
  const { records, unclosedQuote } = parseCsv(csv);
  assertEquals(unclosedQuote, false);
  assertEquals(records[1].line, 2);
  assertEquals(records[1].fields[0], 'Say "hi", friend');
  assertEquals(records[1].fields[2], "line one\nline two");
});

Deno.test("comment lines before the header count toward physical row numbers", () => {
  const csv = [
    "# comment",
    HEADER,
    'Northwind,amazon,EXAMPLE category,https://example.com/logo.png,"hello',
    'world",EXAMPLE solution text,EXAMPLE time period,EXAMPLE quote,EXAMPLE author,0,EXAMPLE metric label,"$1,234","15%",%,',
  ].join("\n");
  const parsed = parseCaseStudyImport(csv);
  if (!parsed.ok) throw new Error(parsed.error);
  assertEquals(parsed.errors, []);
  assertEquals(parsed.rows.length, 1);
  assertEquals(parsed.rows[0].brand_name, "Northwind");
  assertEquals(parsed.rows[0].slug, "northwind");
  assertEquals(parsed.rows[0].published, false);
  assertEquals(parsed.rows[0].challenge, "hello\nworld");
  assertEquals(parsed.rows[0].results, [{ label: "EXAMPLE metric label", before: 1234, after: 15, unit: "%" }]);
});

Deno.test("template example row is rejected on physical line 3", async () => {
  const csv = await Deno.readTextFile(new URL("../../../public/templates/case-studies-template.csv", import.meta.url));
  assertEquals(
    csv.split(/\r?\n/)[0],
    "# AMZ AD SCOUT case studies template. CSV supports up to 4 metrics per brand (add metrics 5-6 in the dashboard form). Rows are imported as drafts. Rows whose brand_name starts with EXAMPLE are rejected.",
  );
  assertEquals(csv.split(/\r?\n/)[1].includes("published"), false);
  const parsed = parseCaseStudyImport(csv);
  if (!parsed.ok) throw new Error(parsed.error);
  assertEquals(parsed.rows, []);
  assertEquals(parsed.errors, [{
    row: 3,
    column: "brand_name",
    message: EXAMPLE_ROW_MESSAGE,
  }]);
});

Deno.test("published header is ignored and rows stay drafts", () => {
  const csv = `brand_name,channel,published\nAcme Goods,Walmart,true\nexample shop,meta,yes\n`;
  const parsed = parseCaseStudyImport("\uFEFF" + csv);
  if (!parsed.ok) throw new Error(parsed.error);
  assertEquals(parsed.rows.length, 1);
  assertEquals(parsed.rows[0].brand_name, "Acme Goods");
  assertEquals(parsed.rows[0].channel, "walmart");
  assertEquals(parsed.rows[0].published, false);
  assertEquals(parsed.rows[0].slug, "acme-goods");
  assertEquals(parsed.errors, [{
    row: 3,
    column: "brand_name",
    message: EXAMPLE_ROW_MESSAGE,
  }]);
});

Deno.test("unknown headers are rejected and hash lines after the header are data", () => {
  const unknown = parseCaseStudyImport("brand_name,channel,notes\nAcme,amazon,hello\n");
  assertEquals(unknown.ok, false);
  if (unknown.ok) return;
  assertEquals(unknown.error, "Unknown headers: notes");

  const hashed = parseCaseStudyImport("brand_name,channel\n# not a comment,amazon\n");
  if (!hashed.ok) throw new Error(hashed.error);
  assertEquals(hashed.errors, []);
  assertEquals(hashed.rows[0].brand_name, "# not a comment");
  assertEquals(hashed.rows[0].slug, "not-a-comment");
});

Deno.test("metric groups, duplicate slugs, and the 200 row cap", () => {
  assertEquals(parseMetricNumber(" $1,234.50 "), 1234.5);
  assertEquals(parseMetricNumber("15%"), 15);
  assertEquals(parseMetricNumber("nope"), null);

  const missing = parseCaseStudyImport(
    "brand_name,channel,metric1_label,metric1_before,metric1_after,metric1_unit,metric2_before\nAcme,amazon,Sales,,,$ ,only-before\n",
  );
  if (!missing.ok) throw new Error(missing.error);
  assertEquals(parsedColumns(missing.errors), ["metric1_after"]);
  assertEquals(missing.rows, []);

  const dupes = parseCaseStudyImport("brand_name,channel\nHello There,amazon\nHello There,google\n");
  if (!dupes.ok) throw new Error(dupes.error);
  assertEquals(dupes.rows.map((row) => row.slug), ["hello-there", "hello-there-2"]);

  const lines = ["brand_name,channel"];
  for (let i = 0; i < 201; i++) lines.push(`Brand ${i},amazon`);
  const capped = parseCaseStudyImport(lines.join("\n"));
  assertEquals(capped.ok, false);
  if (capped.ok) return;
  assertEquals(capped.error, "A maximum of 200 data rows is allowed");
});

Deno.test("create validation allows six metrics and rejects a seventh", () => {
  const metric = (n: number) => ({ label: `Metric ${n}`, before: null, after: n, unit: "x" });
  const ok = validateCreateBody({
    brand_name: "  Acme  ",
    channel: "Shopify",
    logo_url: "https://example.com/a.png",
    results: [1, 2, 3, 4, 5, 6].map(metric),
  });
  if (!ok.ok) throw new Error(ok.error);
  assertEquals(ok.value.brand_name, "Acme");
  assertEquals(ok.value.channel, "shopify");
  assertEquals(ok.value.published, false);
  assertEquals(ok.value.results.length, 6);

  const tooMany = validateCreateBody({
    brand_name: "Acme",
    channel: "amazon",
    results: [1, 2, 3, 4, 5, 6, 7].map(metric),
  });
  assertEquals(tooMany.ok, false);
});

function parsedColumns(errors: { column: string }[]): string[] {
  return errors.map((error) => error.column);
}

const REORDER_A = "11111111-1111-4111-8111-111111111111";
const REORDER_B = "22222222-2222-4222-8222-222222222222";

Deno.test("reorder body accepts ids and integer sort orders", () => {
  const result = validateReorderBody({
    order: [
      { id: REORDER_A, sort_order: 0 },
      { id: REORDER_B, sort_order: 1000000 },
    ],
  });
  assertEquals(result, {
    ok: true,
    order: [
      { id: REORDER_A, sort_order: 0 },
      { id: REORDER_B, sort_order: 1000000 },
    ],
  });
});

Deno.test("reorder body rejects an empty order array", () => {
  assertEquals(validateReorderBody({ order: [] }), {
    ok: false,
    error: "order must be a non-empty array",
  });
});

Deno.test("reorder body rejects more than 500 items", () => {
  const order = Array.from({ length: 501 }, (_, index) => ({
    id: `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`,
    sort_order: index,
  }));
  assertEquals(validateReorderBody({ order }), {
    ok: false,
    error: "order must contain at most 500 items",
  });
});

Deno.test("reorder body rejects a bad uuid", () => {
  assertEquals(validateReorderBody({ order: [{ id: "not-a-uuid", sort_order: 1 }] }), {
    ok: false,
    error: "Each order item must have a valid UUID id",
  });
});

Deno.test("reorder body rejects a non-integer or negative sort_order", () => {
  assertEquals(validateReorderBody({ order: [{ id: REORDER_A, sort_order: 1.5 }] }), {
    ok: false,
    error: "sort_order must be an integer between 0 and 1000000",
  });
  assertEquals(validateReorderBody({ order: [{ id: REORDER_A, sort_order: -1 }] }), {
    ok: false,
    error: "sort_order must be an integer between 0 and 1000000",
  });
});

Deno.test("reorder body rejects duplicate ids", () => {
  assertEquals(validateReorderBody({
    order: [
      { id: REORDER_A, sort_order: 1 },
      { id: REORDER_A, sort_order: 2 },
    ],
  }), {
    ok: false,
    error: "order contains duplicate ids",
  });
  assertEquals(validateReorderBody({
    order: [
      { id: REORDER_A, sort_order: 1 },
      { id: REORDER_A.toUpperCase(), sort_order: 2 },
    ],
  }), {
    ok: false,
    error: "order contains duplicate ids",
  });
});

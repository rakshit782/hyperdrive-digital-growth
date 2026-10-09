/**
 * Writes sitemap.xml from the React Router routes in src/App.tsx.
 *
 * Run automatically as npm "postbuild" (do not fold this into the "build"
 * script; Frontend owns that line). Vite copies public/ into dist/ during
 * build, so this also overwrites dist/sitemap.xml when dist/ already exists.
 *
 * Included: every concrete public route, plus service slugs from
 * DetailedServicePage's serviceConfigs (so /services/amazon-integration is
 * listed even though it only matches /services/:serviceType). /blog is
 * included. Each published post in src/content/blogPosts.ts adds
 * /blog/<slug> with lastmod set to that post's updated_at date.
 * Excluded: /free-audit and /contact-us (308 to /contact),
 * /verify-certificate, client-only routes (/ad-landing, /dashboard and
 * children, /blog/:slug), and the "*" not-found route.
 *
 * Hosting for those URLs lives in vercel.json (valid JSON, so the notes are
 * here). Vercel serves a real file before any rewrite, and trailingSlash is
 * false so /pricing serves dist/pricing/index.html with no redirect.
 *
 * Extending vercel.json when a route is added:
 * - Public page that will be prerendered to dist/<path>/index.html: add
 *   { "source": "/<path>", "destination": "/index.html" }. Leave that rewrite
 *   in place after prerender; the file wins when it exists, and the rewrite
 *   is the fallback until then. New service slugs are already covered by
 *   /services/:serviceType.
 * - Client-only page (/dashboard, /dashboard/:path*, /ad-landing, /blog/:slug):
 *   destination /spa.html, which Frontend emits at dist/spa.html. Do not point
 *   these at /index.html.
 * - Do not add a catch-all rewrite. Unmatched paths must fall through to
 *   public/404.html (HTTP 404).
 *
 * This script fails the build if a sitemap URL other than "/" has no rewrite.
 *
 * Published case studies are fetched at the end. When at least one item
 * comes back, /case-studies stays (lastmod = newest updated_at) and each
 * study adds /case-studies/<slug>. A failed or empty fetch removes the
 * /case-studies URL emitted from App.tsx and must not fail the build.
 * /case-studies/:slug must stay in vercel.json as a rewrite to /spa.html.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.amzadscout.com";
const SITEMAP_EXCLUDE = new Set([
  "/home",
  "/free-audit",
  "/contact-us",
  "/verify-certificate",
  "/ad-landing",
  "/dashboard",
  "/dashboard/login",
  "/dashboard/signup",
]);

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function pageFile(importSpec) {
  const base = path.normalize(path.join(root, "src", importSpec));
  for (const ext of ["", ".tsx", ".ts", ".jsx", ".js"]) {
    const candidate = base + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return path.relative(root, candidate);
    }
  }
  throw new Error(`Cannot resolve page import ${importSpec}`);
}

function parseRoutes() {
  const app = read("src/App.tsx");
  const imports = new Map();
  for (const match of app.matchAll(/import\s+(\w+)\s+from\s+"([^"]+)"/g)) {
    imports.set(match[1], match[2]);
  }

  const routes = [];
  for (const match of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*\/>\}/g)) {
    const [, routePath, component] = match;
    const spec = imports.get(component);
    if (!spec) throw new Error(`No import for route component ${component}`);
    routes.push({ path: routePath, file: pageFile(spec) });
  }
  return routes;
}

function serviceSlugs() {
  const src = read("src/pages/DetailedServicePage.tsx");
  const start = src.indexOf("const serviceConfigs");
  const end = src.indexOf("const DetailedServicePage");
  if (start < 0 || end < start) {
    throw new Error("Could not find serviceConfigs in DetailedServicePage.tsx");
  }
  const block = src.slice(start, end);
  return [...block.matchAll(/^\s{2}'([a-z0-9-]+)':\s*\{/gm)].map((match) => match[1]);
}

function gitDate(file) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: root,
      encoding: "utf8",
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function headDate() {
  return execFileSync("git", ["log", "-1", "--format=%cs"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
}

function previousDates(xmlPath) {
  const dates = new Map();
  if (!fs.existsSync(xmlPath)) return dates;
  const xml = fs.readFileSync(xmlPath, "utf8");
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    dates.set(match[1], match[2]);
  }
  return dates;
}

function sourceCovers(source, pathname) {
  const srcSegs = source.split("/").filter(Boolean);
  const pathSegs = pathname.split("/").filter(Boolean);
  let pathIndex = 0;

  for (let i = 0; i < srcSegs.length; i += 1) {
    const seg = srcSegs[i];
    if (seg.startsWith(":") && seg.endsWith("*")) {
      return i === srcSegs.length - 1;
    }
    if (seg.startsWith(":") && seg.endsWith("+")) {
      return i === srcSegs.length - 1 && pathIndex < pathSegs.length;
    }
    if (seg.startsWith(":")) {
      if (pathIndex >= pathSegs.length) return false;
      pathIndex += 1;
      continue;
    }
    if (pathSegs[pathIndex] !== seg) return false;
    pathIndex += 1;
  }

  return pathIndex === pathSegs.length;
}

function assertRewritten(entries) {
  const vercel = JSON.parse(read("vercel.json"));
  const sources = (vercel.rewrites ?? []).map((rule) => rule.source);
  const missing = entries
    .map((entry) => new URL(entry.loc).pathname)
    .filter((pathname) => pathname !== "/" && !sources.some((source) => sourceCovers(source, pathname)));

  if (missing.length > 0) {
    throw new Error(
      `Sitemap URLs have no vercel.json rewrite (filesystem fallback would 404 before prerender):\n${missing.join("\n")}`,
    );
  }
}

function buildEntries() {
  const routes = parseRoutes();
  const entries = [];
  const seen = new Set();

  const add = (routePath, file) => {
    if (!routePath.startsWith("/")) return;
    if (seen.has(routePath) || SITEMAP_EXCLUDE.has(routePath) || routePath.includes(":")) return;
    seen.add(routePath);
    entries.push({ path: routePath, file });
  };

  for (const route of routes) {
    if (route.path === "/services/:serviceType") {
      const detailed = route.file;
      for (const slug of serviceSlugs()) add(`/services/${slug}`, detailed);
      continue;
    }
    add(route.path, route.file);
  }

  const fallbackDate = headDate();
  const prior = previousDates(path.join(root, "public", "sitemap.xml"));

  return entries.map((entry) => {
    const loc = entry.path === "/" ? `${SITE}/` : `${SITE}${entry.path}`;
    if (!/^https:\/\/www\.amzadscout\.com\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(loc)) {
      throw new Error(`Refusing non-canonical sitemap URL: ${loc}`);
    }
    const fromGit = gitDate(entry.file);
    const lastmod = fromGit || prior.get(loc) || fallbackDate;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
      throw new Error(`Invalid lastmod ${lastmod} for ${loc}`);
    }
    if (!fromGit) {
      console.warn(`No git history for ${entry.file}; lastmod ${lastmod} (${loc})`);
    }
    return { loc, lastmod, file: entry.file };
  });
}

function render(entries) {
  const body = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function readPublishableKey() {
  const fromProcess = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (typeof fromProcess === "string" && fromProcess.trim()) {
    return fromProcess.trim().replace(/^["']|["']$/g, "");
  }
  try {
    const text = fs.readFileSync(path.join(root, ".env"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 0 || trimmed.slice(0, eq).trim() !== "VITE_SUPABASE_PUBLISHABLE_KEY") continue;
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      return value;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Could not read .env for VITE_SUPABASE_PUBLISHABLE_KEY: ${message}`);
  }
  return "";
}

function caseStudyLastmod(value) {
  if (typeof value !== "string") return null;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
  return match ? match[1] : null;
}

function appendCaseStudies(entries, items) {
  const seen = new Set(entries.map((entry) => entry.loc));
  const indexLoc = `${SITE}/case-studies`;
  const dates = items
    .map((item) => caseStudyLastmod(item && item.updated_at))
    .filter(Boolean)
    .sort();
  const lastmod = dates[dates.length - 1];
  const existing = entries.find((entry) => entry.loc === indexLoc);
  if (lastmod) {
    if (existing) existing.lastmod = lastmod;
    else {
      entries.push({ loc: indexLoc, lastmod, file: "case-studies" });
      seen.add(indexLoc);
    }
  } else {
    console.warn("Skipping /case-studies sitemap URL: published rows have no updated_at");
  }

  for (const item of items) {
    const slug = item && typeof item.slug === "string" ? item.slug : "";
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      console.warn(`Skipping case study sitemap URL with unexpected slug: ${slug}`);
      continue;
    }
    const loc = `${SITE}/case-studies/${slug}`;
    if (seen.has(loc)) continue;
    const lastmod = caseStudyLastmod(item.updated_at);
    if (!lastmod) {
      console.warn(`Skipping case study sitemap URL ${loc}: missing updated_at`);
      continue;
    }
    entries.push({ loc, lastmod, file: "case-studies" });
    seen.add(loc);
  }
}

async function fetchPublishedCaseStudies() {
  const key = readPublishableKey();
  if (!key) {
    console.warn("Skipping case study sitemap URLs: VITE_SUPABASE_PUBLISHABLE_KEY is not set");
    return null;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(
      "https://hznbshxhmhtenxcuffhx.supabase.co/functions/v1/neon-case-studies",
      {
        headers: { apikey: key },
        signal: controller.signal,
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const items = Array.isArray(data?.items) ? data.items : null;
    if (!items || items.length === 0) {
      console.warn("No published case studies returned; not adding case study URLs");
      return null;
    }
    return items;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Case study sitemap fetch failed (${message}); not adding case study URLs`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function staticBlogPosts() {
  const src = read("src/content/blogPosts.ts");
  const posts = [];
  for (const block of src.split(/\n\s*\{/).slice(1)) {
    const slug = /^\s*slug:\s*"([a-z0-9-]+)"/m.exec(block);
    const updated = /^\s*updated_at:\s*"(\d{4}-\d{2}-\d{2})/m.exec(block);
    const status = /^\s*status:\s*"([^"]+)"/m.exec(block);
    if (!slug || !updated) continue;
    if (status && status[1] !== "published") continue;
    posts.push({ slug: slug[1], lastmod: updated[1] });
  }
  if (posts.length === 0) {
    throw new Error("No published static blog posts found in src/content/blogPosts.ts");
  }
  return posts;
}

function appendStaticBlogPosts(entries) {
  const seen = new Set(entries.map((entry) => entry.loc));
  for (const post of staticBlogPosts()) {
    const loc = `${SITE}/blog/${post.slug}`;
    if (!/^https:\/\/www\.amzadscout\.com\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(loc)) {
      throw new Error(`Refusing non-canonical sitemap URL: ${loc}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.lastmod)) {
      throw new Error(`Invalid lastmod ${post.lastmod} for ${loc}`);
    }
    if (seen.has(loc)) continue;
    entries.push({ loc, lastmod: post.lastmod, file: "src/content/blogPosts.ts" });
    seen.add(loc);
  }
}

async function main() {
  const entries = buildEntries();
  const caseStudies = await fetchPublishedCaseStudies();
  if (caseStudies && caseStudies.length > 0) {
    appendCaseStudies(entries, caseStudies);
  } else {
    const indexLoc = `${SITE}/case-studies`;
    const index = entries.findIndex((entry) => entry.loc === indexLoc);
    if (index !== -1) {
      entries.splice(index, 1);
      console.warn("Removing /case-studies from the sitemap: no published case studies were returned");
    }
  }
  appendStaticBlogPosts(entries);
  assertRewritten(entries);
  const xml = render(entries);

  const publicPath = path.join(root, "public", "sitemap.xml");
  fs.writeFileSync(publicPath, xml);

  const distDir = path.join(root, "dist");
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
    console.log(`Wrote ${entries.length} URLs to public/sitemap.xml and dist/sitemap.xml`);
  } else {
    console.log(`Wrote ${entries.length} URLs to public/sitemap.xml (dist/ not present yet)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

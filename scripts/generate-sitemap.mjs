/**
 * Writes sitemap.xml from the React Router routes in src/App.tsx.
 *
 * Run automatically as npm "postbuild" (do not fold this into the "build"
 * script; Frontend owns that line). Vite copies public/ into dist/ during
 * build, so this also overwrites dist/sitemap.xml when dist/ already exists.
 *
 * Included: every concrete public route, plus service slugs from
 * DetailedServicePage's serviceConfigs (so /services/amazon-integration is
 * listed even though it only matches /services/:serviceType).
 * Excluded: /blog (noindex; PR #3), /free-audit and /contact-us (308 to
 * /contact), /verify-certificate, client-only routes (/ad-landing, /dashboard
 * and children, /blog/:slug), and the "*" not-found route.
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
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.amzadscout.com";
const SITEMAP_EXCLUDE = new Set([
  "/blog",
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

const entries = buildEntries();
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

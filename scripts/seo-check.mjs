/**
 * Static SEO check over the built dist/ folder (no server needed).
 *
 * For every prerendered page it reads the raw HTML and checks:
 *   - indexable pages (no noindex): title <= 60 chars, meta description
 *     150 to 160 chars, exactly one <h1>, a self-referencing
 *     https://www canonical, and at least one valid JSON-LD block
 *   - noindex pages: not listed in sitemap.xml
 *   - dist/sitemap.xml lists exactly the indexable pages, and none of its
 *     URLs is a redirect source in vercel.json
 *   - every internal link points at a page that exists in dist/, is not a
 *     redirect source in vercel.json and has no trailing slash
 *   - no page mentions the wrong brand name ("Angel Fitness")
 *   - public/sitemap-noindex-recrawl.xml (if present) lists only noindex pages
 *
 * Usage: npm run build && npm run seo:check
 * Exits non-zero if anything fails.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://www.stretchedbyangel.com";

if (!existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

const vercel = JSON.parse(readFileSync(resolve(ROOT, "vercel.json"), "utf8"));
const redirectSources = new Set((vercel.redirects ?? []).map((r) => r.source.replace(/\/$/, "") || "/"));

const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;|&#39;/g, "'");

// ------------------------------------------------------------ collect pages
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name === "index.html") out.push(full);
  }
  return out;
}

const routeOf = (file) => {
  const rel = relative(DIST, dirname(file)).split(sep).join("/");
  return rel ? `/${rel}` : "/";
};

const pages = new Map();
for (const file of walk(DIST)) {
  const html = readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  pages.set(routeOf(file), {
    html,
    title: decode(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
    description: decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ""),
    robots: head.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "",
    canonical: head.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? null,
    h1: (body.match(/<h1[\s>]/g) ?? []).length,
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]),
    links: [...body.matchAll(/<a\s[^>]*href="([^"]*)"/g)].map((m) => decode(m[1])),
  });
}

const exists = (path) => {
  if (pages.has(path)) return true;
  const file = resolve(DIST, "." + path);
  return file.startsWith(DIST) && existsSync(file) && statSync(file).isFile();
};

// ------------------------------------------------------------ per page
const indexable = new Set();
for (const [route, p] of pages) {
  const noindex = /noindex/i.test(p.robots);
  if (/angel fitness/i.test(p.html)) fail(route, 'mentions "Angel Fitness"');

  if (!noindex) {
    indexable.add(route);
    if (!p.title) fail(route, "missing <title>");
    else if (p.title.length > 60) fail(route, `title is ${p.title.length} chars (max 60): "${p.title}"`);
    const d = p.description.length;
    if (d < 150 || d > 160) fail(route, `meta description is ${d} chars (want 150 to 160)`);
    if (p.h1 !== 1) fail(route, `has ${p.h1} <h1> tags (want 1)`);
    const want = route === "/" ? `${SITE}/` : `${SITE}${route}`;
    if (p.canonical !== want) fail(route, `canonical is ${p.canonical ?? "missing"} (want ${want})`);
    if (p.jsonLd.length === 0) fail(route, "no JSON-LD");
  }

  for (const block of p.jsonLd) {
    try {
      const data = JSON.parse(block);
      for (const node of Array.isArray(data) ? data : [data]) {
        if (!node["@context"] || !node["@type"]) fail(route, "JSON-LD node missing @context or @type");
      }
    } catch (e) {
      fail(route, `invalid JSON-LD (${e.message})`);
    }
  }

  // Internal links
  for (const href of p.links) {
    let url;
    try {
      url = new URL(href, SITE + route);
    } catch {
      fail(route, `unparseable link ${href}`);
      continue;
    }
    if (!/^https?:$/.test(url.protocol)) continue;
    if (!/^(www\.)?stretchedbyangel\.com$/.test(url.hostname)) continue;
    const path = url.pathname;
    if (path.startsWith("/api/")) continue;
    if (path.length > 1 && path.endsWith("/")) fail(route, `link has a trailing slash: ${href}`);
    const clean = path.replace(/\/+$/, "") || "/";
    if (redirectSources.has(clean)) fail(route, `link points at a redirect: ${href}`);
    else if (!exists(clean)) fail(route, `link points at a missing page (404): ${href}`);
  }
}

// ------------------------------------------------------------ sitemap
const locs = (file) =>
  [...readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const toRoute = (loc) => {
  const u = new URL(loc);
  return u.pathname.replace(/\/+$/, "") || "/";
};

const sitemapFile = resolve(DIST, "sitemap.xml");
if (!existsSync(sitemapFile)) {
  fail("sitemap.xml", "missing from dist/");
} else {
  const listed = new Set();
  for (const loc of locs(sitemapFile)) {
    const route = toRoute(loc);
    listed.add(route);
    if (!loc.startsWith(`${SITE}/`)) fail("sitemap.xml", `${loc} is not an https://www URL`);
    if (redirectSources.has(route)) fail("sitemap.xml", `${loc} is a redirect source`);
    if (!pages.has(route)) fail("sitemap.xml", `${loc} has no prerendered page`);
    else if (!indexable.has(route)) fail("sitemap.xml", `${loc} is noindex`);
  }
  for (const route of indexable) {
    if (!listed.has(route)) fail("sitemap.xml", `indexable page ${route} is not listed`);
  }
}

// ------------------------------------------------------------ recrawl sitemap
const recrawlFile = resolve(DIST, "sitemap-noindex-recrawl.xml");
if (existsSync(recrawlFile)) {
  for (const loc of locs(recrawlFile)) {
    const route = toRoute(loc);
    if (!loc.startsWith(`${SITE}/`)) fail("sitemap-noindex-recrawl.xml", `${loc} is not an https://www URL`);
    if (!pages.has(route)) fail("sitemap-noindex-recrawl.xml", `${loc} has no prerendered page`);
    else if (indexable.has(route)) fail("sitemap-noindex-recrawl.xml", `${loc} is indexable, not noindex`);
  }
}

// ------------------------------------------------------------ report
const noindexCount = pages.size - indexable.size;
console.log(`Checked ${pages.size} pages (${indexable.size} indexable, ${noindexCount} noindex).`);
if (failures.length) {
  console.log(`\n${failures.length} problem(s):`);
  for (const f of failures) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log("✓ All SEO checks passed.");

/**
 * SEO audit of the built site, served the way Vercel serves it.
 *
 * Starts scripts/serve-dist.mjs, then checks:
 *   - every URL in dist/sitemap.xml: HTTP 200, exactly one <h1> in the raw
 *     HTML, unique <title>, unique meta description (150 to 160 chars),
 *     self-referencing canonical, no noindex, JSON-LD present and valid
 *   - every other prerendered route (Tier 2 suburbs): 200, one <h1>,
 *     noindex, not in the sitemap
 *   - an unknown URL returns 404 with noindex
 *   - /personal-training returns 301 to /personal-training-gold-coast
 *
 * Usage: npm run build && npm run audit:seo
 * Exits non-zero if anything fails.
 */
import { spawn } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://www.stretchedbyangel.com";
const PORT = 4190 + Math.floor(Math.random() * 100);
const BASE = `http://localhost:${PORT}`;

const server = spawn(process.execPath, [resolve(ROOT, "scripts/serve-dist.mjs"), String(PORT)], {
  stdio: "ignore",
});
process.on("exit", () => server.kill());
for (let i = 0; i < 50; i++) {
  try {
    await fetch(BASE + "/robots.txt");
    break;
  } catch {
    await new Promise((r) => setTimeout(r, 100));
  }
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x27;|&#39;/g, "'");

function inspect(html) {
  const head = html.slice(0, html.indexOf("</head>"));
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1]
  );
  let ldValid = true;
  for (const block of ld) {
    try {
      JSON.parse(block);
    } catch {
      ldValid = false;
    }
  }
  return {
    h1: (html.match(/<h1[\s>]/g) ?? []).length,
    title: decode(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
    description: decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ""),
    canonical: head.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? null,
    robots: head.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "",
    ldCount: ld.length,
    ldValid,
  };
}

const sitemap = readFileSync(resolve(DIST, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapPaths = new Set(sitemapUrls.map((u) => u.replace(SITE, "") || "/"));

const failures = [];
const fail = (route, check, detail) => failures.push({ route, check, detail });
const titles = new Map();
const descriptions = new Map();

// --- sitemap URLs ----------------------------------------------------------
for (const url of sitemapUrls) {
  const path = url.replace(SITE, "") || "/";
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== 200) {
    fail(path, "status", res.status);
    continue;
  }
  const p = inspect(await res.text());
  if (p.h1 !== 1) fail(path, "h1 count", p.h1);
  if (!p.title) fail(path, "title", "missing");
  if (p.description.length < 150 || p.description.length > 160)
    fail(path, "description length", p.description.length);
  if (p.canonical !== url) fail(path, "canonical", p.canonical ?? "missing");
  if (/noindex/i.test(p.robots)) fail(path, "robots", p.robots);
  if (p.ldCount === 0) fail(path, "JSON-LD", "missing");
  if (!p.ldValid) fail(path, "JSON-LD", "invalid JSON");
  titles.set(p.title, [...(titles.get(p.title) ?? []), path]);
  descriptions.set(p.description, [...(descriptions.get(p.description) ?? []), path]);
}
for (const [t, paths] of titles) if (paths.length > 1) paths.forEach((p) => fail(p, "duplicate title", t));
for (const [d, paths] of descriptions)
  if (paths.length > 1) paths.forEach((p) => fail(p, "duplicate description", d.slice(0, 60) + "…"));

// --- prerendered routes not in the sitemap ------------------------------------
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = resolve(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
const routes = walk(DIST)
  .filter((f) => f.endsWith(`${sep}index.html`))
  .map((f) => "/" + relative(DIST, dirname(f)).split(sep).join("/"))
  .map((r) => (r === "/" ? "/" : r.replace(/\/$/, "")));
let offSitemap = 0;
for (const route of routes) {
  if (sitemapPaths.has(route)) continue;
  offSitemap++;
  const res = await fetch(BASE + route, { redirect: "manual" });
  const p = inspect(await res.text());
  if (res.status !== 200) fail(route, "status", res.status);
  if (p.h1 !== 1) fail(route, "h1 count", p.h1);
  if (!/noindex/i.test(p.robots)) fail(route, "not in sitemap but indexable", p.robots || "no robots");
  if (p.description.length < 150 || p.description.length > 160)
    fail(route, "description length", p.description.length);
}

// --- 404 and redirect ---------------------------------------------------------
{
  const res = await fetch(BASE + "/this-page-does-not-exist", { redirect: "manual" });
  const p = inspect(await res.text());
  if (res.status !== 404) fail("/this-page-does-not-exist", "status", res.status);
  if (!/noindex/i.test(p.robots)) fail("/this-page-does-not-exist", "robots", p.robots || "missing");
}
{
  const res = await fetch(BASE + "/personal-training", { redirect: "manual" });
  const loc = res.headers.get("location");
  if (res.status !== 301 || loc !== "/personal-training-gold-coast")
    fail("/personal-training", "301 redirect", `${res.status} -> ${loc}`);
}

// --- report --------------------------------------------------------------------
console.log(
  `Checked ${sitemapUrls.length} sitemap URLs, ${offSitemap} noindexed routes, 404 and redirect.`
);
if (failures.length) {
  console.log(`\n${failures.length} failure(s):\n`);
  console.log("| Route | Check | Detail |\n|---|---|---|");
  for (const f of failures) console.log(`| ${f.route} | ${f.check} | ${f.detail} |`);
  process.exitCode = 1;
} else {
  console.log("✓ All checks passed.");
}
server.kill();

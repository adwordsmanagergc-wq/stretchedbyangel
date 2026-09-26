/**
 * Post-build static prerender.
 *
 * `vite build` produces the client bundle and dist/index.html (the shell).
 * `vite build --ssr src/entry-server.tsx` produces dist-ssr/entry-server.js,
 * which renders any route to an HTML string and returns the page's head
 * data (title, meta, canonical, JSON-LD) collected via usePageHead().
 *
 * This script renders every route into its own dist/<route>/index.html so
 * crawlers receive full content (headings, copy, internal links, JSON-LD)
 * without executing JavaScript. The browser then hydrates the markup.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SSR_DIR = resolve(ROOT, "dist-ssr");

const { render, ALL_ROUTES } = await import(
  pathToFileURL(resolve(SSR_DIR, "entry-server.js")).href
);

// Strip the static SEO tags from the shell; each route supplies its own.
const TEMPLATE = readFileSync(resolve(DIST, "index.html"), "utf8")
  .replace(/\s*<title>[\s\S]*?<\/title>/, "")
  .replace(/\s*<meta\s+name="(description|robots|twitter:[^"]+)"[^>]*>/g, "")
  .replace(/\s*<meta\s+property="og:[^"]+"[^>]*>/g, "")
  .replace(/\s*<link\s+rel="canonical"[^>]*>/g, "");

if (!TEMPLATE.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is missing <div id="root"></div>');
}

export function toDocument({ html, headTags }) {
  return TEMPLATE.replace("</head>", `${headTags}\n  </head>`).replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );
}

function outPathFor(route) {
  return route === "/"
    ? resolve(DIST, "index.html")
    : resolve(DIST, route.replace(/^\//, ""), "index.html");
}

const SITE = "https://www.stretchedbyangel.com";
const indexable = [];

let count = 0;
for (const route of ALL_ROUTES) {
  const out = outPathFor(route);
  const page = render(route);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, toDocument(page), "utf8");
  count++;

  // Sitemap = pages that are indexable and self-canonical.
  const noindex = /noindex/i.test(page.head.robots ?? "");
  const canonical = page.head.canonical
    ? new URL(page.head.canonical, SITE).href.replace(/\/$/, "")
    : null;
  if (!noindex && canonical === `${SITE}${route}`.replace(/\/$/, "")) indexable.push(route);
}

// --- sitemap.xml ----------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const meta = (route) => {
  if (route === "/") return ["weekly", "1.0"];
  if (/^\/(assisted-stretching|personal-training)\//.test(route)) return ["monthly", "0.7"];
  if (route === "/areas-i-service") return ["monthly", "0.8"];
  if (route === "/disclaimer" || route === "/waiver") return ["yearly", "0.3"];
  return ["monthly", "0.9"];
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((route) => {
    const [changefreq, priority] = meta(route);
    return `  <url>\n    <loc>${SITE}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n")}
</urlset>
`;
writeFileSync(resolve(DIST, "sitemap.xml"), sitemap, "utf8");
// Keep the committed copy in sync so it can be reviewed in git.
writeFileSync(resolve(ROOT, "public/sitemap.xml"), sitemap, "utf8");

// 404 page: any path with no route renders <NotFoundPage>. Vercel serves
// dist/404.html with HTTP 404 for every URL that has no static file.
writeFileSync(resolve(DIST, "404.html"), toDocument(render("/__not-found__")), "utf8");

// The SSR bundle is a build-time tool only; never deploy it.
rmSync(SSR_DIR, { recursive: true, force: true });

console.log(`✓ prerendered ${count} routes to static HTML`);
console.log(`✓ sitemap.xml written (${indexable.length} indexable URLs)`);

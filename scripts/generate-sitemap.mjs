import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://stretchedbyangel.com";
const OUT = resolve(ROOT, "public/sitemap.xml");

const suburbsSource = readFileSync(resolve(ROOT, "src/data/suburbs.ts"), "utf8");
const arrMatch = suburbsSource.match(/export const SUBURBS = \[([\s\S]*?)\] as const;/);
if (!arrMatch) {
  throw new Error("Could not parse SUBURBS array from src/data/suburbs.ts");
}
const SUBURBS = [...arrMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

const slugify = (s) =>
  s.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/personal-training", changefreq: "weekly", priority: "0.9" },
  { loc: "/areas-i-service", changefreq: "monthly", priority: "0.8" },
  { loc: "/assisted-stretching-gold-coast", changefreq: "monthly", priority: "0.9" },
  { loc: "/personal-training-gold-coast", changefreq: "monthly", priority: "0.9" },
  { loc: "/disclaimer", changefreq: "yearly", priority: "0.3" },
  { loc: "/waiver", changefreq: "yearly", priority: "0.3" },
  ...SUBURBS.map((s) => ({
    loc: `/assisted-stretching/${slugify(s)}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
  ...SUBURBS.map((s) => ({
    loc: `/personal-training/${slugify(s)}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
];

const body = urls
  .map(
    ({ loc, changefreq, priority }) =>
      `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, xml, "utf8");
console.log(`✓ sitemap.xml written (${urls.length} URLs) → ${OUT.replace(ROOT + "/", "")}`);

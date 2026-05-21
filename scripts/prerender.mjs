/**
 * Post-build prerender step.
 *
 * Vite outputs a single dist/index.html for this SPA. Served as-is for
 * every route, crawlers see the homepage title / description / og:url and
 * no canonical until JavaScript runs — which causes Google Search Console
 * "redirect error" and canonical confusion.
 *
 * This script writes a real static HTML file per route with the correct
 * <title>, <meta name="description">, <link rel="canonical"> and og tags
 * baked in. The React app still mounts and hydrates on top normally.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://www.stretchedbyangel.com";

const slugify = (s) => s.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");

// --- suburb list (parsed from the single source of truth) ---------------
const suburbsSrc = readFileSync(resolve(ROOT, "src/data/suburbs.ts"), "utf8");
const arr = suburbsSrc.match(/export const SUBURBS = \[([\s\S]*?)\] as const;/);
if (!arr) throw new Error("Could not parse SUBURBS from src/data/suburbs.ts");
const SUBURBS = [...arr[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);

// --- static routes ------------------------------------------------------
const STATIC_ROUTES = [
  {
    path: "/",
    title: "Assisted Stretching Gold Coast | Stretched By Angel",
    description:
      "Assisted Stretching Gold Coast — professional PNF stretching by Angel Elliott. Increase flexibility, improve range of motion, reduce pain and muscle tension. Sessions at Wicked Bodz Fitness Centre, Surfers Paradise, or in the comfort of your home. Book now.",
  },
  {
    path: "/personal-training",
    title: "Personal Training Gold Coast | Angel Fitness",
    description:
      "Personal Training Gold Coast — qualified personal trainer Angel Elliott with 10+ years experience. In-person sessions on the Gold Coast, online coaching, and custom programs available worldwide. Transform your body today.",
  },
  {
    path: "/areas-i-service",
    title: "Areas I Service | Stretched By Angel Gold Coast",
    description:
      "Professional personal training & assisted stretching across the entire Gold Coast. Home visits and online coaching available in 77+ suburbs.",
  },
  {
    path: "/assisted-stretching-gold-coast",
    title:
      "Assisted Stretching Gold Coast: The Complete Guide to PNF Benefits | Stretched By Angel",
    description:
      "Assisted Stretching Gold Coast — the complete guide to PNF stretching benefits, who it helps, and what to expect. Covering pain relief, flexibility, recovery, injury prevention, posture, sleep and more from Gold Coast stretch therapist Angel Elliott.",
  },
  {
    path: "/personal-training-gold-coast",
    title:
      "Personal Training Gold Coast: The Complete Guide to Training With Angel | Angel Fitness",
    description:
      "Personal Training Gold Coast — the complete guide to what personal training actually does, who it helps, results to expect, and how to choose between in-person, online and custom programs. Written by qualified trainer Angel Elliott (10+ years).",
  },
  {
    path: "/disclaimer",
    title: "Terms & Disclaimer | Stretched By Angel",
    description:
      "Terms and disclaimer for assisted stretching and personal training sessions with Stretched By Angel on the Gold Coast.",
  },
  {
    path: "/waiver",
    title: "Liability Waiver | Stretched By Angel",
    description:
      "Client intake and liability waiver for assisted stretching and personal training with Angel Elliott, Gold Coast.",
  },
];

// --- dynamic suburb routes ---------------------------------------------
const suburbRoutes = [];
for (const name of SUBURBS) {
  const slug = slugify(name);
  suburbRoutes.push({
    path: `/assisted-stretching/${slug}`,
    title: `Assisted Stretching ${name} | Stretched By Angel`,
    description: `Assisted Stretching ${name} — professional PNF stretching with Angel Elliott on the Gold Coast. Mobile home visits and in-studio sessions. Improve flexibility, reduce pain, book today.`,
  });
  suburbRoutes.push({
    path: `/personal-training/${slug}`,
    title: `Personal Training ${name} | Angel Fitness Gold Coast`,
    description: `Personal Training ${name} — qualified personal trainer Angel Elliott with 10+ years experience. In-person sessions, online coaching and custom programs. Book today.`,
  });
}

const ROUTES = [...STATIC_ROUTES, ...suburbRoutes];

// --- HTML rewriting -----------------------------------------------------
const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const TEMPLATE = readFileSync(resolve(DIST, "index.html"), "utf8");

function renderRoute({ path, title, description }) {
  const url = `${SITE}${path}`;
  let html = TEMPLATE;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${esc(description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${esc(title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${esc(description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"[^>]*>/,
    `<meta property="og:url" content="${esc(url)}" />`
  );

  // canonical: replace if present, otherwise inject before </head>
  const canonicalTag = `<link rel="canonical" href="${esc(url)}" />`;
  if (/<link\s+rel="canonical"[^>]*>/.test(html)) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/, canonicalTag);
  } else {
    html = html.replace("</head>", `    ${canonicalTag}\n  </head>`);
  }

  return html;
}

let count = 0;
for (const route of ROUTES) {
  const html = renderRoute(route);
  const outPath =
    route.path === "/"
      ? resolve(DIST, "index.html")
      : resolve(DIST, route.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  count++;
}

console.log(`✓ prerendered ${count} routes with per-page title/description/canonical`);

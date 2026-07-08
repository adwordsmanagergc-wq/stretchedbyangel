/**
 * Favicon generator.
 *
 * Source priority:
 *   1. stretched-by-angel-transparent-logo.png at repo root
 *   2. public/source-logo.png
 *   3. source-logo.png at repo root
 *
 * The Stretched By Angel logo is white-on-transparent, so we composite it
 * onto a branded pink gradient rounded-square background — otherwise the
 * favicon would be invisible on Google's white search-results background.
 *
 * If no source PNG is found, falls back to a "SBA" wordmark placeholder.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = resolve(ROOT, "public");

const SOURCE_CANDIDATES = [
  resolve(PUBLIC, "stretched-by-angel-transparent-logo.png"),
  resolve(ROOT, "stretched-by-angel-transparent-logo.png"),
  resolve(PUBLIC, "source-logo.png"),
  resolve(ROOT, "source-logo.png"),
  resolve(ROOT, "stretched-by-angel-transparent.png"),
];

const BG_SVG = (size) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="url(#g)"/>
</svg>
`);

const FALLBACK_SVG = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#g)"/>
  <text x="50%" y="58%" text-anchor="middle"
        font-family="Arial Black, Helvetica, sans-serif"
        font-size="220" font-weight="900" letter-spacing="-8"
        fill="#ffffff">SBA</text>
</svg>
`);

const SIZES = [
  { name: "favicon-16.png", size: 16 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-48.png", size: 48 },
  { name: "favicon-96.png", size: 96 },
  { name: "favicon-192.png", size: 192 },
  { name: "favicon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

function findSource() {
  for (const candidate of SOURCE_CANDIDATES) {
    if (existsSync(candidate)) {
      console.log(`✓ source: ${candidate.replace(ROOT + "/", "")}`);
      return readFileSync(candidate);
    }
  }
  return null;
}

async function renderFromLogo(size, logoBuffer) {
  const baseBuf = await sharp(BG_SVG(size))
    .resize(size, size)
    .png()
    .toBuffer();
  const logoPadding = Math.max(1, Math.round(size * 0.14));
  const logoSize = size - logoPadding * 2;
  const logoBuf = await sharp(logoBuffer)
    .resize({
      width: logoSize,
      height: logoSize,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  return sharp(baseBuf)
    .composite([{ input: logoBuf, gravity: "center" }])
    .png({ compressionLevel: 9 });
}

async function renderFallback(size) {
  return sharp(FALLBACK_SVG)
    .resize(size, size)
    .png({ compressionLevel: 9 });
}

async function main() {
  mkdirSync(PUBLIC, { recursive: true });
  const source = findSource();
  const render = source
    ? (size) => renderFromLogo(size, source)
    : (size) => renderFallback(size);
  if (!source) console.log("ℹ no source logo PNG found — using branded placeholder");

  for (const { name, size } of SIZES) {
    const out = resolve(PUBLIC, name);
    const info = await (await render(size)).toFile(out);
    console.log(`  ${name.padEnd(24)} ${String(size).padStart(3)}x${size}  ${Math.round(info.size / 1024)} KB`);
  }

  // Legacy /favicon.ico — modern browsers and Google accept a PNG here.
  await (await render(32)).toFile(resolve(PUBLIC, "favicon.ico"));
  console.log(`  ${"favicon.ico".padEnd(24)}  32x32  (PNG content)`);

  const manifest = {
    name: "Stretched By Angel",
    short_name: "Stretched By Angel",
    description:
      "Professional assisted PNF stretching and personal training on the Gold Coast.",
    icons: [
      { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#090f15",
    background_color: "#ec4899",
    display: "standalone",
    start_url: "/",
  };
  writeFileSync(
    resolve(PUBLIC, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );
  console.log("  site.webmanifest         written");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

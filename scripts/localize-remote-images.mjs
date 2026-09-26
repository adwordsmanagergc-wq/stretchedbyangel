/**
 * Downloads images that used to be hot-linked from mochausercontent.com,
 * converts them to WebP with sharp, and writes them to public/images/ so
 * the site serves them from its own domain.
 *
 * Runs in `prebuild`. Files that already exist are skipped, so once the
 * images are committed this is a no-op. If a download fails and the file
 * is missing, the build fails on Vercel (so a broken image never ships)
 * and only warns elsewhere.
 */
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "public/images");
const BASE = "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/";

// [remote file, local WebP name, max width]
const JOBS = [
  ["Picsart_26-03-05_07-10-49-345.jpg", "angel-elliott-stretch-therapist-gold-coast.webp", 900],
  ["Screenshot-2026-03-23-at-10.34.41-am.png", "personal-training-gold-coast-online-coaching.webp", 910],
  ["Screenshot-2026-03-23-at-10.35.28-am.png", "personal-training-gold-coast-gym-session.webp", 692],
  ["Screenshot-2026-03-23-at-10.36.51-am.png", "personal-training-gold-coast-physique.webp", 1016],
  ["Screenshot-2026-03-23-at-10.55.51-am.png", "personal-training-gold-coast-transformation.webp", 772],
  ["Screenshot_20260304_175606_Instagram.jpg", "pnf-stretching-session-gold-coast.webp", 1200],
];

mkdirSync(OUT, { recursive: true });
const missing = [];
for (const [remote, name, maxWidth] of JOBS) {
  const dest = resolve(OUT, name);
  if (existsSync(dest)) continue;
  try {
    const res = await fetch(BASE + remote);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    const info = await sharp(input)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    console.log(`✓ ${name} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
  } catch (err) {
    missing.push(`${name}: ${err.message}`);
  }
}

if (missing.length) {
  const msg = `Could not localise ${missing.length} image(s):\n  ${missing.join("\n  ")}`;
  if (process.env.VERCEL) throw new Error(msg);
  console.warn(`⚠ ${msg}`);
}

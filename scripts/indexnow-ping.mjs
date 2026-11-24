// Pings IndexNow with every URL in the sitemap after a production build on Vercel.
// Never fails the build: any error is logged and the script exits 0.
import { readFile } from 'node:fs/promises';

const KEY = '33bd0beb3c3b19f391bafd103591b6e3';
const HOST = 'www.stretchedbyangel.com';

if (process.env.VERCEL_ENV !== 'production') {
  console.log('[indexnow] Skipped (not a Vercel production build).');
  process.exit(0);
}

async function readSitemap() {
  for (const path of ['dist/sitemap.xml', 'public/sitemap.xml']) {
    try {
      return await readFile(path, 'utf8');
    } catch {}
  }
  return null;
}

try {
  const xml = await readSitemap();
  if (!xml) {
    console.log('[indexnow] No sitemap.xml found, skipping.');
    process.exit(0);
  }
  const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => new URL(u).host === HOST);

  if (!urlList.length) {
    console.log('[indexnow] Sitemap has no URLs for', HOST);
    process.exit(0);
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
    signal: AbortSignal.timeout(15000),
  });
  console.log(`[indexnow] Submitted ${urlList.length} URLs: HTTP ${res.status}`);
} catch (err) {
  console.log('[indexnow] Ping failed (build continues):', err?.message || err);
}
process.exit(0);

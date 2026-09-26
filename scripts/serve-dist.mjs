/**
 * Tiny static server that approximates Vercel's routing for dist/, so the
 * prerendered output can be checked locally with curl before deploying:
 *
 *   1. vercel.json "redirects" (exact paths or :param patterns)
 *   2. trailingSlash: false  (/foo/ -> 308 /foo)
 *   3. filesystem: exact file, then <path>/index.html, then <path>.html
 *   4. vercel.json "rewrites"
 *   5. otherwise dist/404.html with HTTP 404
 *
 * Usage: node scripts/serve-dist.mjs [port]
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const PORT = Number(process.argv[2] ?? 4173);
const config = JSON.parse(readFileSync(resolve(ROOT, "vercel.json"), "utf8"));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const toRegex = (source) =>
  new RegExp(
    "^" +
      source
        .replace(/\/:(\w+)\*/g, "/(?<$1>.*)")
        .replace(/\/:(\w+)/g, "/(?<$1>[^/]+)") +
      "$"
  );

function findFile(pathname) {
  const p = decodeURIComponent(pathname);
  for (const candidate of [p, join(p, "index.html"), `${p}.html`]) {
    const full = resolve(DIST, "." + candidate);
    if (full.startsWith(DIST) && existsSync(full) && statSync(full).isFile()) return full;
  }
  return null;
}

function send(res, status, file, headOnly) {
  const body = readFileSync(file);
  res.writeHead(status, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(headOnly ? undefined : body);
}

createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const headOnly = req.method === "HEAD";

  for (const r of config.redirects ?? []) {
    const m = url.pathname.match(toRegex(r.source));
    if (m) {
      const dest = r.destination.replace(/:(\w+)\*?/g, (_, k) => m.groups?.[k] ?? "");
      res.writeHead(r.statusCode ?? (r.permanent === false ? 307 : 308), { Location: dest });
      return res.end();
    }
  }

  if (config.trailingSlash === false && url.pathname.length > 1 && url.pathname.endsWith("/")) {
    res.writeHead(308, { Location: url.pathname.replace(/\/+$/, "") + url.search });
    return res.end();
  }

  const file = findFile(url.pathname);
  if (file) return send(res, 200, file, headOnly);

  for (const r of config.rewrites ?? []) {
    if (toRegex(r.source).test(url.pathname)) {
      const target = findFile(r.destination);
      if (target) return send(res, 200, target, headOnly);
    }
  }

  const notFound = resolve(DIST, "404.html");
  if (existsSync(notFound)) return send(res, 404, notFound, headOnly);
  res.writeHead(404);
  res.end("Not found");
}).listen(PORT, () => console.log(`serving dist/ on http://localhost:${PORT}`));

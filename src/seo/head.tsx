/**
 * Per-page <head> management that works for both the static prerender
 * (server) and the live React app (client).
 *
 * - During prerender, entry-server.tsx wraps the tree in <HeadProvider>,
 *   and usePageHead() records the page's head data synchronously while the
 *   page renders. The prerender script then serialises it with
 *   renderHeadTags() into the static HTML.
 * - In the browser there is no provider, so usePageHead() applies the same
 *   data to document.head in an effect (for client-side navigation).
 */
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { websiteSchema } from "@/seo/schema";

import { SITE_URL } from "@/seo/site";

export { SITE_URL };
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assisted-stretching-gold-coast-hero.webp`;

export type HeadData = {
  title: string;
  description: string;
  /** Path (e.g. "/robina") or absolute URL. Omit for pages with no canonical (404). */
  canonical?: string;
  robots?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  /** Extra <meta> tags, e.g. article:published_time. */
  meta?: { attr: "name" | "property"; key: string; content: string }[];
  jsonLd?: object[];
  /** Above-the-fold image (LCP) to preload in the static HTML. */
  preloadImage?: string;
};

type Collector = { head?: HeadData };
const HeadContext = createContext<Collector | null>(null);

export function HeadProvider({ collector, children }: { collector: Collector; children: ReactNode }) {
  return <HeadContext.Provider value={collector}>{children}</HeadContext.Provider>;
}

export function absoluteUrl(pathOrUrl: string) {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

/** Flatten a HeadData object into the list of tags it represents. */
function toTags(head: HeadData) {
  const canonical = head.canonical ? absoluteUrl(head.canonical) : undefined;
  const ogImage = head.ogImage ?? DEFAULT_OG_IMAGE;
  const metas: { attr: "name" | "property"; key: string; content: string }[] = [
    { attr: "name", key: "description", content: head.description },
    { attr: "property", key: "og:type", content: head.ogType ?? "website" },
    { attr: "property", key: "og:title", content: head.title },
    { attr: "property", key: "og:description", content: head.description },
    { attr: "property", key: "og:image", content: ogImage },
    { attr: "name", key: "twitter:card", content: "summary_large_image" },
    { attr: "name", key: "twitter:title", content: head.title },
    { attr: "name", key: "twitter:description", content: head.description },
    { attr: "name", key: "twitter:image", content: ogImage },
    ...(head.meta ?? []),
  ];
  if (canonical) metas.push({ attr: "property", key: "og:url", content: canonical });
  if (head.robots) metas.push({ attr: "name", key: "robots", content: head.robots });
  // Every real page (anything with a canonical) carries the site-level
  // WebSite node that WebPage nodes reference via isPartOf.
  const jsonLd = canonical ? [websiteSchema(), ...(head.jsonLd ?? [])] : head.jsonLd ?? [];
  return { canonical, metas, jsonLd };
}

export function usePageHead(head: HeadData) {
  const collector = useContext(HeadContext);
  if (collector) collector.head = head;

  const key = JSON.stringify(head);
  useEffect(() => {
    applyHead(head);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

// ---------------------------------------------------------------- client

function applyHead(head: HeadData) {
  if (typeof document === "undefined") return;
  const { canonical, metas, jsonLd } = toTags(head);
  document.title = head.title;

  // Remove tags a previous page may have added that this page does not set.
  document.head
    .querySelectorAll('meta[name="robots"], meta[property^="article:"]')
    .forEach((el) => el.remove());

  for (const { attr, key, content } of metas) {
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) {
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  } else {
    link?.remove();
  }

  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  for (const data of jsonLd) {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify(data);
    document.head.appendChild(el);
  }
}

// ---------------------------------------------------------------- server

const escAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** JSON-LD is embedded in a <script>, so only "</" needs neutralising. */
const escJson = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export function renderHeadTags(head: HeadData): string {
  const { canonical, metas, jsonLd } = toTags(head);
  const lines = [
    `<title>${escAttr(head.title)}</title>`,
    ...metas.map(
      ({ attr, key, content }) => `<meta ${attr}="${key}" content="${escAttr(content)}" />`
    ),
  ];
  if (canonical) lines.push(`<link rel="canonical" href="${escAttr(canonical)}" />`);
  if (head.preloadImage) {
    lines.push(
      `<link rel="preload" as="image" href="${escAttr(head.preloadImage)}" fetchpriority="high" />`
    );
  }
  for (const data of jsonLd) {
    lines.push(`<script type="application/ld+json">${escJson(data)}</script>`);
  }
  return lines.map((l) => `    ${l}`).join("\n");
}

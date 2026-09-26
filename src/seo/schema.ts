/**
 * Shared JSON-LD builders. The business node (#business) and Person node
 * (#angel) are defined in components/SchemaMarkup.tsx; everything here
 * references them by @id.
 */
import { SITE_URL } from "@/seo/site";
import { BUSINESS } from "@/react-app/lib/business";

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Site-level WebSite node, emitted on every indexable page. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "Stretched By Angel",
    description:
      "Assisted PNF stretching and personal training on the Gold Coast with Angel Elliott.",
    inLanguage: "en-AU",
    publisher: { "@id": BUSINESS_ID },
  };
}

/** BreadcrumbList from [name, path] pairs, starting after Home. */
export function breadcrumbSchema(trail: [name: string, path: string][]) {
  const items: [string, string][] = [["Home", "/"], ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

/** Service offered in one suburb, with areaServed set to that suburb. */
export function suburbServiceSchema({
  service,
  suburb,
  path,
}: {
  service: "stretch" | "pt";
  suburb: string;
  path: string;
}) {
  const isStretch = service === "stretch";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name: `${isStretch ? "Assisted Stretching" : "Personal Training"} ${suburb}`,
    serviceType: isStretch ? "Assisted Stretching" : "Personal Training",
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      "@id": BUSINESS_ID,
      name: BUSINESS.name,
      url: BUSINESS.url,
      telephone: BUSINESS.telephone,
      address: { "@type": "PostalAddress", ...BUSINESS.address },
    },
    areaServed: {
      "@type": "Place",
      name: `${suburb}, Gold Coast QLD`,
      address: {
        "@type": "PostalAddress",
        addressLocality: suburb,
        addressRegion: "QLD",
        addressCountry: "AU",
      },
    },
    ...(isStretch
      ? {
          offers: [
            { "@type": "Offer", name: "60 Minute Home Visit", price: "130", priceCurrency: "AUD" },
            { "@type": "Offer", name: "60 Minute Studio Session", price: "90", priceCurrency: "AUD" },
            { "@type": "Offer", name: "30 Minute Studio Session", price: "60", priceCurrency: "AUD" },
          ],
        }
      : {}),
  };
}

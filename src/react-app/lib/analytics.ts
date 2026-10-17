import { track } from "@vercel/analytics";

/**
 * Vercel Web Analytics custom events. One delegated click listener covers
 * every contact link on the site (floating buttons, nav, footer, page CTAs),
 * so new links are tracked automatically as long as they use these hrefs.
 *
 * Contact clicks also fire `generate_lead` so there is a single lead count
 * across channels in the Vercel "Events" panel.
 */
type ClickEvent =
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "google_review_click"
  | "google_maps_click"
  | "instagram_click";

const LEAD_EVENTS = new Set<ClickEvent>(["whatsapp_click", "phone_click", "email_click"]);

function classify(href: string): ClickEvent | null {
  if (href.startsWith("tel:") || href.startsWith("sms:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (/wa\.me|whatsapp\.com/i.test(href)) return "whatsapp_click";
  if (/writereview|search\.google\.com\/local\/reviews|g\.page\/r\//i.test(href)) return "google_review_click";
  if (/maps\.google\.|google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(href)) return "google_maps_click";
  if (/instagram\.com/i.test(href)) return "instagram_click";
  return null;
}

export function initClickTracking() {
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const event = classify(href);
      if (!event) return;

      const props = { page: window.location.pathname };
      track(event, props);
      if (LEAD_EVENTS.has(event)) track("generate_lead", { ...props, method: event.replace("_click", "") });
    },
    true,
  );
}

export { track };

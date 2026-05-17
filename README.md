# Stretched By Angel

Marketing site for **Stretched By Angel** — assisted PNF stretching and personal
training on the Gold Coast, Australia. Single-page React app with 161 SEO
landing pages (home, personal training, two long-form blog guides, 77×2 suburb
pages, plus a PAR-Q liability waiver form that emails completed submissions to
Angel).

Live: <https://stretchedbyangel.com>

---

## Tech stack

- **Vite + React 18 + TypeScript** — front-end
- **Tailwind CSS 3** with CSS-variable theme tokens (dark theme)
- **react-router 7** — client-side routing
- **lucide-react** — icons
- **@fontsource-variable/inter** — body font
- **Vercel serverless function** at `/api/waiver` (Node runtime)
- **Resend** for transactional email

---

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
```

The Vite dev server does **not** run the `/api/waiver` serverless function.
To test the waiver form locally, either:

- run `vercel dev` after installing `npm i -g vercel` (recommended), or
- deploy a preview to Vercel and test there.

---

## Build

```bash
npm run build        # generates sitemap, type-checks, builds to dist/
npm run preview      # serve dist/ locally
npm run sitemap      # regenerate public/sitemap.xml manually
```

`npm run build` runs `prebuild` first, which executes
`scripts/generate-sitemap.mjs` to regenerate `public/sitemap.xml` from
`src/data/suburbs.ts`. If you add or remove suburbs, the sitemap stays in sync
automatically on every build.

---

## Deployment (Vercel)

The project is configured to deploy to Vercel out of the box. `vercel.json`
handles:

- **SPA rewrites** — deep links like `/assisted-stretching/burleigh-heads`
  render the React app instead of 404'ing.
- **Content-Type headers** for `sitemap.xml`, `robots.txt`, `llms.txt`.
- **`/api/*` bypass** so the waiver function is reachable.
- **Immutable caching** on `/assets/*`.

### First-time setup

1. **Import the repo** in the Vercel dashboard — it auto-detects Vite.
2. **Set environment variables** (see below).
3. **Connect the domain** `stretchedbyangel.com` in Project Settings → Domains.
   DNS already points to Vercel (`A @ → 216.198.79.1`,
   `CNAME www → 9ddf6d118e1fb899.vercel-dns-017.com`).
4. Push to the production branch → Vercel builds and deploys.

---

## Environment variables

Configure these in **Vercel → Project → Settings → Environment Variables** for
all environments (Production, Preview, Development).

| Variable | Required? | Purpose | Example |
|---|---|---|---|
| `RESEND_API_KEY` | **Yes** (for waiver form) | API key from [resend.com](https://resend.com) used by `/api/waiver` to send waiver emails. | `re_abc123...` |
| `WAIVER_FROM_EMAIL` | No (default provided) | The `From:` address on waiver emails. Must be on a domain you've verified with Resend. | `Stretched By Angel <waivers@stretchedbyangel.com>` |

Without `RESEND_API_KEY` the waiver form returns a friendly 500 (`"Email
service is not configured. Please contact Angel directly."`) — the rest of the
site continues to work normally.

---

## Setting up Resend for the waiver form

The waiver form posts to `/api/waiver`, which emails the completed waiver to
**`angelfitnessjsyci@icloud.com`** (cc'ing the client).

### Steps

1. **Sign up** at <https://resend.com> (free tier: 100 emails/day, 3,000/month
   — more than enough).
2. **Add and verify your domain** `stretchedbyangel.com` in
   Resend → Domains → Add Domain. Resend will give you 3 DNS records to add:
   - one **SPF** TXT record
   - one **DKIM** TXT record
   - one **DMARC** TXT record
3. **Add those records at IONOS** alongside the existing IONOS mail records.
   They do not conflict — Resend uses different selectors than IONOS.
4. Once Resend shows green ticks (usually 5–60 minutes), the domain is
   verified.
5. **Create an API key** in Resend → API Keys (full sending access is fine).
6. **Paste it into Vercel** as `RESEND_API_KEY`.
7. **Redeploy** so the function picks up the new env var.

### Testing

Submit a waiver from the live site at `/waiver`. Angel should receive a
formatted email at `angelfitnessjsyci@icloud.com` containing:

- Personal details
- All 10 PAR-Q answers (with a medical-clearance banner if any are YES)
- Acknowledgement checkboxes
- Typed signature and submission timestamp (Brisbane time)

The client also receives a CC of the same email at the address they entered.
The reply-to header is set to the client's email so Angel can reply directly
from her inbox.

---

## Routes

| Route | Page |
|---|---|
| `/` | Home — assisted stretching landing page |
| `/personal-training` | Personal training landing page |
| `/areas-i-service` | Hub of all 77 Gold Coast suburbs (two grids — stretching + PT) |
| `/assisted-stretching/:slug` | Dynamic per-suburb stretching page (77 suburbs) |
| `/personal-training/:slug` | Dynamic per-suburb personal training page (77 suburbs) |
| `/assisted-stretching-gold-coast` | Long-form SEO blog: stretching benefits guide |
| `/personal-training-gold-coast` | Long-form SEO blog: personal training guide |
| `/disclaimer` | Terms & disclaimer |
| `/waiver` | PAR-Q intake & liability waiver form |

Unknown suburb slugs redirect to `/areas-i-service`.

---

## SEO setup

- **Sitemap**: `/sitemap.xml` (auto-generated at build, 161 URLs)
- **Robots**: `/robots.txt`
- **AI crawlers**: `/llms.txt` (per [llmstxt.org](https://llmstxt.org/))
- **JSON-LD schemas emitted**:
  - All pages: `HealthAndBeautyBusiness`, `Person`, `Service`+`OfferCatalog`,
    `WebPage`
  - Home, suburb pages, and blogs add `FAQPage`
  - Blog pages add `BlogPosting`

### Submitting to Google Search Console

1. Verify ownership via the existing `google-site-verification` TXT record at
   IONOS (already in place from the previous host — should pass instantly).
2. Sitemaps → Submit `https://stretchedbyangel.com/sitemap.xml`.
3. Should report **"Success — 161 URLs discovered"** within minutes.

---

## Editing content

| What you want to change | File(s) |
|---|---|
| Add/remove a suburb | `src/data/suburbs.ts` (sitemap regenerates on next build) |
| Phone / Instagram / email | `src/data/contact.ts` |
| Business address, hours, geo | `src/react-app/lib/business.ts` |
| Home page copy | `src/react-app/pages/Home.tsx` |
| Personal training page copy | `src/react-app/pages/PersonalTraining.tsx` |
| Stretching blog | `src/react-app/pages/Blog.tsx` |
| Personal training blog | `src/react-app/pages/PersonalTrainingBlog.tsx` |
| Waiver questions / acknowledgements | `src/react-app/pages/Waiver.tsx` (front-end) and `api/waiver.ts` (email) |
| Waiver recipient email | `api/waiver.ts` — `TO_EMAIL` constant |
| JSON-LD schema | `src/react-app/components/SchemaMarkup.tsx` |
| Meta descriptions (home / PT) | `src/react-app/components/SchemaMarkup.tsx` (`META` constant) |
| Meta descriptions (suburb pages) | The `setMeta(...)` call near the top of each `Suburb*Page.tsx` |
| Sitemap priorities / frequencies | `scripts/generate-sitemap.mjs` |

---

## File layout

```
api/
  waiver.ts              # Vercel serverless function — emails waivers via Resend
  tsconfig.json          # API-only TypeScript config
public/
  robots.txt
  llms.txt
  sitemap.xml            # Generated — do not edit by hand
scripts/
  generate-sitemap.mjs   # Reads src/data/suburbs.ts → public/sitemap.xml
src/
  data/
    contact.ts           # CONTACT constant (phone, instagram, email, etc.)
    suburbs.ts           # SUBURBS array + slugify / unslugify
  react-app/
    components/
      SchemaMarkup.tsx   # Injects JSON-LD + meta tags per page
      StubLayout.tsx     # Shared layout for plain text pages (Disclaimer)
    lib/
      business.ts        # Business profile data for schema markup
    pages/               # Route components
  index.css              # Tailwind directives + theme variables
  main.tsx               # Router setup
index.html               # Static head defaults
vercel.json              # SPA rewrites, headers, /api passthrough
vite.config.ts
tailwind.config.ts
```

---

## Troubleshooting

**Waiver form returns "Email service is not configured"**
→ `RESEND_API_KEY` is missing in Vercel env vars. Add it and redeploy.

**Resend rejects the From address**
→ `WAIVER_FROM_EMAIL` is on a domain you haven't verified with Resend yet.
Either verify `stretchedbyangel.com` or use the Resend onboarding sender
(`onboarding@resend.dev`) temporarily.

**Deep links 404 on refresh**
→ `vercel.json` should be deployed. Check the rewrite block is intact.

**Sitemap doesn't include a new suburb**
→ Run `npm run sitemap` locally, commit `public/sitemap.xml`, and redeploy.
The `prebuild` script runs this automatically on every `npm run build`.

**`/api/waiver` returns HTML instead of JSON in local dev**
→ `vite dev` doesn't run Vercel functions. Use `vercel dev` (after `npm i -g
vercel`) or deploy a preview to test the form.

---

## License & credits

Built for Angel Elliott · [@angelfitnessau](https://instagram.com/angelfitnessau).

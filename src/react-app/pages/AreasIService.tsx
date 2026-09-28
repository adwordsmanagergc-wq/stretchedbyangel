import { usePageHead } from "@/seo/head";
import { Link } from "react-router";
import { Phone, MapPin, Sparkles, Dumbbell, ArrowRight } from "lucide-react";
import { SUBURBS, slugify, unslugify } from "@/data/suburbs";
import { getTier } from "@/data/suburbContent";
import { BUSINESS } from "@/react-app/lib/business";
import { CONTACT } from "@/data/contact";
import { IMG } from "@/data/images";
import { SiteHeader, FooterLinks } from "@/react-app/components/SiteNav";

export default function AreasIServicePage() {
  usePageHead({
    title: "Areas I Service | Stretched By Angel Gold Coast",
    description:
      "Assisted stretching and personal training across the Gold Coast. Find your suburb for home visits, studio sessions in Surfers Paradise and online coaching.",
    canonical: "/areas-i-service",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/20 via-rose-500/10 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent">
            Areas I Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional personal training & assisted stretching across the entire Gold Coast.
            Home visits and online coaching available.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 space-y-10 text-lg text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Where I work</h2>
            <p className="mb-4">
              I'm Angel Elliott, and I run Stretched By Angel from {BUSINESS.venue},{" "}
              {BUSINESS.addressLine}. Studio sessions of 30 or 60 minutes happen there, close to
              the Cavill Avenue light rail station and a short walk from the beach.
            </p>
            <p>
              If getting to Surfers Paradise doesn't suit you, I come to you. Mobile sessions run
              right across the Gold Coast, from Ormeau and Jacobs Well in the north to Coolangatta
              in the south, and out into the hinterland. Personal training is available in person
              at the studio or online from anywhere.
            </p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">How mobile sessions work</h2>
            <p className="mb-4">
              A mobile session is a 60 minute assisted stretching session at your home, unit or
              office, priced at $130. To book, call or message me on{" "}
              <a href={CONTACT.phoneLink} className="text-primary hover:underline">{CONTACT.phone}</a>{" "}
              (WhatsApp works too) with your suburb and a few times that suit you.
            </p>
            <p>
              Before your first session, please fill in the online{" "}
              <Link to="/waiver" className="text-primary hover:underline">liability waiver</Link>{" "}
              so I know about any injuries or health conditions. On the day, wear comfortable
              clothes you can move in. The session itself is the same full body PNF stretch you
              would get in the studio, just without the drive or the parking.
            </p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">How far I travel</h2>
            <p className="mb-4">
              Suburbs close to the studio, such as Main Beach, Broadbeach, Bundall and Southport,
              are usually a 5 to 15 minute drive, so they are the easiest to fit in at short
              notice. The southern beaches and the northern growth corridor are 15 to 40 minutes
              away, and hinterland areas such as Springbrook and Lower Beechmont are available by
              arrangement.
            </p>
            <p>
              Each suburb page below shows the typical drive time from Surfers Paradise, along
              with local details and answers to common questions. If your suburb isn't listed,
              call me anyway. If you're on the Gold Coast, I can usually get to you.
            </p>
          </div>
        </div>
      </section>

      {REGIONS.map((region, i) => (
        <RegionSection key={region.name} region={region} alt={i % 2 === 0} />
      ))}

      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4" /> View General Gold Coast Stretching Page <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/personal-training-gold-coast"
            className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <Dumbbell className="w-4 h-4" /> View General Personal Training Page <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            No matter where you are on the Gold Coast, Angel can help you move better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-full hover:from-pink-400 hover:to-rose-300 transition-all duration-300 shadow-lg shadow-pink-500/25"
            >
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center gap-2 border border-border font-medium px-8 py-4 rounded-full hover:bg-secondary transition-all"
            >
              View Prices <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <img {...IMG.logo} alt="Stretched By Angel" loading="lazy" className="h-12 w-12 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm mb-4">
            Personal Training & Assisted Stretching on the Gold Coast
          </p>
          <FooterLinks />
          <p className="text-muted-foreground/60 text-xs mt-6">
            © {new Date().getFullYear()} Stretched By Angel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

type Region = { name: string; blurb: string; slugs: string[] };

/**
 * Suburbs grouped by region. Within each region the Tier 1 (indexed)
 * suburbs come first, then the rest alphabetically.
 */
const REGION_SLUGS: { name: string; blurb: string; slugs: string[] }[] = [
  {
    name: "Central Gold Coast",
    blurb: "Surfers Paradise and the suburbs around it, all within about 20 minutes of the studio.",
    slugs: [
      "surfers-paradise", "main-beach", "broadbeach", "bundall", "broadbeach-waters", "benowa",
      "mermaid-beach", "mermaid-waters", "southport", "ashmore",
      "carrara", "chevron-island", "clear-island-waters", "highland-park", "isle-of-capri",
      "merrimac", "midway", "molendinar", "nerang", "paradise-waters", "parkwood",
    ],
  },
  {
    name: "Northern Gold Coast",
    blurb: "The Broadwater suburbs and the northern corridor up to Ormeau and Jacobs Well.",
    slugs: [
      "labrador",
      "arundel", "biggera-waters", "coombabah", "coomera", "gaven", "helensvale", "hollywell",
      "hope-island", "jacobs-well", "maudsland", "norwell", "ormeau", "ormeau-hills", "oxenford",
      "pacific-pines", "paradise-point", "pimpama", "runaway-bay", "sanctuary-cove",
      "south-stradbroke-island", "stapylton", "steiglitz", "upper-coomera", "willow-vale",
      "woongoolba", "yatala",
    ],
  },
  {
    name: "Southern Gold Coast",
    blurb: "From Miami and Burleigh down the beaches to Coolangatta, plus Robina and Varsity Lakes.",
    slugs: [
      "miami", "burleigh-heads", "robina", "varsity-lakes",
      "bilinga", "burleigh-waters", "coolangatta", "currumbin", "currumbin-waters", "elanora",
      "kirra", "palm-beach", "reedy-creek", "tallebudgera", "tugun",
    ],
  },
  {
    name: "Gold Coast Hinterland",
    blurb: "Mudgeeraba and the acreage and rainforest suburbs to the west, available by arrangement.",
    slugs: [
      "advancetown", "bonogin", "clagiraba", "currumbin-valley", "gilston", "guanaba",
      "lower-beechmont", "mudgeeraba", "neranwood", "springbrook", "tallai",
      "tallebudgera-valley", "wongawallan", "worongary",
    ],
  },
];

const REGIONS: (Region & { tier1: Set<string> })[] = REGION_SLUGS.map((r) => ({
  ...r,
  tier1: new Set(r.slugs.filter((slug) => getTier(slug) === 1)),
}));

// Every suburb must appear in exactly one region, or its links would drop off this page.
{
  const listed = REGION_SLUGS.flatMap((r) => r.slugs);
  const all = SUBURBS.map(slugify);
  const missing = all.filter((s) => !listed.includes(s));
  const extra = listed.filter((s) => !all.includes(s));
  if (missing.length || extra.length || listed.length !== all.length) {
    throw new Error(`Areas regions out of sync. Missing: ${missing}. Unknown: ${extra}`);
  }
}

function RegionSection({ region, alt }: { region: Region & { tier1: Set<string> }; alt?: boolean }) {
  const suburbs = region.slugs.map((slug) => ({ slug, name: unslugify(slug)! }));
  const ordered = [
    ...suburbs.filter((s) => region.tier1.has(s.slug)),
    ...suburbs.filter((s) => !region.tier1.has(s.slug)).sort((a, b) => a.name.localeCompare(b.name)),
  ];
  const columns = [
    { label: "Assisted stretching", icon: Sparkles, base: "/assisted-stretching" },
    { label: "Personal training", icon: Dumbbell, base: "/personal-training" },
  ];

  return (
    <section className={`py-16 ${alt ? "bg-card" : "bg-background"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{region.name}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{region.blurb}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {columns.map(({ label, icon: Icon, base }) => (
            <div key={base}>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                <Icon className="w-4 h-4" /> {label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ordered.map(({ slug, name }) => (
                  <Link
                    key={slug}
                    to={`${base}/${slug}`}
                    className={`px-3 py-2 rounded-xl border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-sm text-center hover:text-primary ${
                      region.tier1.has(slug) ? "border-primary/50 text-foreground font-medium" : "border-border text-muted-foreground"
                    }`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

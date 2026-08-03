import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router";
import {
  Phone,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Target,
  Dumbbell,
  Users,
  MapPin,
  Compass,
} from "lucide-react";
import { unslugify, slugify } from "@/data/suburbs";
import { CONTACT } from "@/data/contact";
import {
  getProfile,
  getNeighbors,
  studioDistanceLabel,
} from "@/data/suburbProfiles";

const LOGO =
  "/stretched-by-angel-transparent-logo.png";

function setMeta(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function SuburbStretchPage() {
  const { slug = "" } = useParams();
  const suburb = unslugify(slug);
  const profile = suburb ? getProfile(slug) : null;
  const neighbors = suburb ? getNeighbors(slug) : [];

  useEffect(() => {
    if (!suburb || !profile) return;
    document.title = `Assisted Stretching ${suburb} | Stretched By Angel`;
    setMeta(
      "description",
      `Assisted Stretching ${suburb} — professional PNF stretching with Angel Elliott for ${profile.lifestyle.split(",")[0]}. Mobile home visits and in-studio sessions. Improve flexibility, reduce pain, book today.`
    );
    setCanonical(`https://www.stretchedbyangel.com/assisted-stretching/${slug}`);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify(buildFaqSchema(suburb, profile));
    document.head.appendChild(ld);
    return () => {
      ld.remove();
    };
  }, [suburb, profile, slug]);

  if (!suburb || !profile) return <Navigate to="/areas-i-service" replace />;

  const faqs = buildFaqs(suburb, profile);
  const distanceLabel = studioDistanceLabel(profile.studioMin);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="bg-background/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO} alt="Stretched By Angel" className="h-12 w-12" />
            <span className="font-semibold text-lg">Stretched By Angel</span>
          </Link>
          <div className="flex items-center gap-4">
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 rounded-full transition-all"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Book Now</span>
            </a>
          </div>
        </div>
      </nav>

      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-rose-500/10 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent">
              Assisted Stretching
            </span>
            <br />
            <span className="text-white">{suburb}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
            Professional PNF stretching for {suburb} — {profile.vibe}.
            Mobile home visits, or come into the Wicked Bodz studio in Surfers
            Paradise ({distanceLabel}).
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-8">
            Local landmarks: {profile.landmarks.join(" · ")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-full hover:from-pink-400 hover:to-rose-300 transition-all shadow-lg shadow-pink-500/25"
            >
              View Prices & Book <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all border border-white/20"
            >
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Unique per-suburb introduction */}
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Assisted Stretching for the {suburb} Lifestyle
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {profile.stretchAngle}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {suburb} life means {profile.lifestyle}. The body pays for it in{" "}
            {profile.bodyToll} — none of which solo stretching ever quite
            reaches. Targeted assisted PNF stretching does.
          </p>
        </div>
      </section>

      {/* Feature cards — kept but visually compact */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              What {suburb} Sessions Look Like
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every session in {suburb} is built around your body on the day,
              not a checklist.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Full Body PNF Flow",
                desc: "Hips, glutes, lower and upper back, shoulders, calves — all the places the daily routine quietly locks up.",
              },
              {
                icon: Dumbbell,
                title: "Active-Release Stretches",
                desc: "Brief muscle contractions paired with deep passive stretches to access genuinely new range of motion.",
              },
              {
                icon: Users,
                title: "Tailored to You",
                desc: "Athlete or office worker, every session is paced to your breath and your tolerance — never one-size-fits-all.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-background/50 border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-all"
              >
                <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why locals — now lifestyle-specific */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            Why {suburb} Locals Book Assisted Stretching
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            The specific bodies I work with in {suburb} share a recognisable
            pattern — and a recognisable set of wins.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              `Release the ${profile.bodyToll.split(",")[0]} that comes with ${profile.lifestyle.split(",")[0]}`,
              "Improve flexibility faster than stretching alone ever will",
              "Recover faster from training, work and weekend activity",
              "Reduce lower back, neck and shoulder pain",
              "Stay active and injury-free into your 50s, 60s and beyond",
              "Experience deep nervous system relaxation in every session",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio location context */}
      <section className="py-16 bg-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Stretching Services in {suburb}
          </h2>
          <p className="text-muted-foreground text-lg mb-3">
            {profile.faqLocation}
          </p>
          <p className="text-muted-foreground text-base mb-8 max-w-2xl mx-auto">
            Mobile home visits across {suburb} are $130 for the 60-minute
            session, or $110 per session as part of a 10-pack. Just provide a
            quiet space and a yoga mat — everything else comes with me.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all"
          >
            Meet Angel & See Prices <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Stretching {suburb} FAQ
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            The questions I get most often from {suburb} clients.
          </p>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group border border-border rounded-xl bg-card/50 overflow-hidden"
              >
                <summary className="cursor-pointer px-6 py-5 font-semibold list-none flex items-center justify-between hover:bg-white/5 transition-colors">
                  {f.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby suburbs — internal linking */}
      {neighbors.length > 0 && (
        <section className="py-16 bg-card">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Compass className="w-6 h-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold text-center">
                Stretching in suburbs near {suburb}
              </h2>
            </div>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              I also run assisted stretching sessions across these nearby
              {" "}Gold Coast suburbs:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {neighbors.map((nslug) => {
                const name = unslugify(nslug);
                if (!name) return null;
                return (
                  <Link
                    key={nslug}
                    to={`/assisted-stretching/${slugify(name)}`}
                    className="px-4 py-2 rounded-full border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-sm text-foreground hover:text-primary"
                  >
                    Stretching {name}
                  </Link>
                );
              })}
            </div>
            <p className="text-center mt-8">
              <Link
                to="/areas-i-service"
                className="text-primary hover:underline text-sm"
              >
                View all 77 Gold Coast suburbs →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready for Professional Stretching in {suburb}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book your first assisted stretching session in {suburb} today —
            most clients feel noticeably looser walking out the door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-full hover:from-pink-400 hover:to-rose-300 transition-all shadow-lg shadow-pink-500/25"
            >
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
            <Link
              to="/areas-i-service"
              className="inline-flex items-center justify-center gap-2 border border-border font-medium px-8 py-4 rounded-full hover:bg-secondary transition-all"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <a
        href={CONTACT.whatsappStretch}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <footer className="py-8 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Professional Assisted Stretching in {suburb} and across the Gold
            Coast
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>•</span>
            <Link to="/areas-i-service" className="hover:text-primary transition-colors">Areas I Service</Link>
            <span>•</span>
            <Link to="/assisted-stretching-gold-coast" className="hover:text-primary transition-colors">Stretching Guide</Link>
            <span>•</span>
            <Link to="/waiver" className="hover:text-primary transition-colors">Liability Waiver</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">Terms & Disclaimer</Link>
          </div>
          <p className="text-muted-foreground/60 text-xs mt-6">
            © {new Date().getFullYear()} Stretched By Angel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function buildFaqs(suburb: string, profile: ReturnType<typeof getProfile>) {
  const firstLifestyle = profile.lifestyle.split(",")[0].trim();
  const firstBodyToll = profile.bodyToll.split(",")[0].trim();
  const landmark = profile.landmarks[0] ?? `central ${suburb}`;

  return [
    {
      q: `Where can I find assisted stretching in ${suburb}?`,
      a: profile.faqLocation,
    },
    {
      q: "What is assisted stretching and how does PNF work?",
      a: "Assisted stretching uses PNF (Proprioceptive Neuromuscular Facilitation) techniques — a trained therapist guides your body into deeper, safer stretches than you could achieve alone. It combines passive stretching with brief isometric contractions to release the nervous system's protective brake and access genuinely new range of motion.",
    },
    {
      q: `How much does stretching cost in ${suburb}?`,
      a: `Single sessions are $60 (30 minutes), $90 (60 minutes in-studio), or $130 for a 60-minute home visit in ${suburb}. The 10-session packs work out to $55 per 30-minute session, or $80 per 60-minute session — with home visits adding $30 per session.`,
    },
    {
      q: `What does assisted stretching specifically help with for ${suburb} residents?`,
      a: `In ${suburb}, the most common things I work on are ${profile.bodyToll}. The lifestyle here — ${profile.lifestyle} — loads up the same muscle patterns repeatedly, and PNF stretching is the most efficient way I've found to undo it.`,
    },
    {
      q: `Is assisted stretching suitable for athletes and active locals in ${suburb}?`,
      a: `Absolutely. ${suburb} has plenty of active locals — surfers, runners, gym-goers, parents who don't stop moving — and PNF stretching is what most use to recover faster, perform better, and stay injury-free. It's a perfect complement to any training routine.`,
    },
    {
      q: `Can assisted stretching help with ${firstBodyToll}?`,
      a: `Yes — that's one of the most common things ${suburb} clients book for. ${firstBodyToll.charAt(0).toUpperCase() + firstBodyToll.slice(1)} usually comes from ${firstLifestyle}, and targeted PNF stretching addresses the muscle and fascial tightness directly. Most clients notice a real difference inside one or two sessions.`,
    },
    {
      q: `How often should ${suburb} locals book in?`,
      a: "For best results, weekly for 4-6 weeks produces noticeable, measurable flexibility gains. Once you're feeling looser, fortnightly or monthly maintenance keeps you there. We'll work out a cadence that fits your goals and schedule.",
    },
    {
      q: `Do you offer mobile stretching home visits in ${suburb}?`,
      a: `Yes — mobile home visits to ${suburb} are one of the most popular options. Sessions are 60 minutes for $130, or $110 per session as part of a 10-pack. Just provide a quiet space and a yoga mat. Especially handy if you're based near ${landmark} and would rather not drive into Surfers.`,
    },
    {
      q: "Do I need to be flexible to start?",
      a: `Not at all. I work with clients across every flexibility level — from people who can barely touch their shins to ex-dancers — and every session is paced to your body on the day. In fact, the less flexible you are right now, the more dramatic the early-session gains tend to be.`,
    },
  ];
}

function buildFaqSchema(suburb: string, profile: ReturnType<typeof getProfile>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: buildFaqs(suburb, profile).map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

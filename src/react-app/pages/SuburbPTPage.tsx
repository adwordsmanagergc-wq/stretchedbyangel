import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router";
import {
  Phone,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Monitor,
  Target,
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
  "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/stretched-by-angel-transparent.png";

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

export default function SuburbPTPage() {
  const { slug = "" } = useParams();
  const suburb = unslugify(slug);
  const profile = suburb ? getProfile(slug) : null;
  const neighbors = suburb ? getNeighbors(slug) : [];

  useEffect(() => {
    if (!suburb || !profile) return;
    document.title = `Personal Training ${suburb} | Angel Fitness Gold Coast`;
    setMeta(
      "description",
      `Personal Training ${suburb} — qualified trainer Angel Elliott with 10+ years experience. Strength training for ${profile.lifestyle.split(",")[0]}. In-person, online and custom programs. Book today.`
    );
    setCanonical(`https://www.stretchedbyangel.com/personal-training/${slug}`);

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
            <img src={LOGO} alt="Angel Fitness" className="h-12 w-12" />
            <span className="font-semibold text-lg">Angel Fitness</span>
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
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Dumbbell className="w-4 h-4" />
            10+ Years Experience
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent">
              Personal Training
            </span>
            <br />
            <span className="text-white">{suburb}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
            One-on-one personal training for {suburb} — {profile.vibe}.
            Train in-person at Wicked Bodz in Surfers Paradise ({distanceLabel}),
            or online from anywhere in the world.
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-8">
            Local landmarks: {profile.landmarks.join(" · ")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-full hover:from-pink-400 hover:to-rose-300 transition-all shadow-lg shadow-pink-500/25"
            >
              <Phone className="w-5 h-5" /> Call {CONTACT.phone}
            </a>
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all border border-white/20"
            >
              <Instagram className="w-5 h-5" /> {CONTACT.instagram}
            </a>
          </div>
        </div>
      </section>

      {/* Unique per-suburb introduction */}
      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Personal Training for the {suburb} Lifestyle
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {profile.ptAngle}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Most of my {suburb} clients live a version of: {profile.lifestyle}.
            That's a lifestyle that builds particular strengths and particular
            blind spots — {profile.bodyToll} — and coaching is what turns the
            blind spots into resilient strength.
          </p>
        </div>
      </section>

      {/* Training options */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Three Ways to Train in {suburb}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you live around {profile.landmarks[0]} or further out, one
              of these formats will fit your schedule.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "In-Person Training",
                desc: `One-on-one sessions for ${suburb} locals at Wicked Bodz Fitness Centre, Surfers Paradise — ${distanceLabel}.`,
              },
              {
                icon: Monitor,
                title: "Online Coaching",
                desc: "Train remotely with a custom program, weekly video form reviews, and ongoing programming adjustments — perfect for busy schedules.",
              },
              {
                icon: Target,
                title: "Custom Programs",
                desc: "Self-motivated and just need the plan? Get a personalised program built for your goals, equipment and schedule to run independently.",
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
            Why {suburb} Locals Train With Angel
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            The {suburb} clients who get the most out of coaching share a few
            patterns — and a few common goals.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              `Programs that correct what ${profile.lifestyle.split(",")[0]} does to your body`,
              "Real strength gains, not just sweat",
              "Weekly accountability and progress tracking",
              "Technique coaching to train safely for years",
              "Nutrition guidance that supports the training",
              "Flexibility around shift work, commutes and family",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Location context */}
      <section className="py-16 bg-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Training Locations Near {suburb}
          </h2>
          <p className="text-muted-foreground text-lg mb-3">
            {profile.faqLocation}
          </p>
          <p className="text-muted-foreground text-base mb-8 max-w-2xl mx-auto">
            Online clients can train from anywhere — particularly handy for
            FIFO, shift work, and {suburb} locals who'd rather not add another
            commute to their week.
          </p>
          <Link
            to="/personal-training"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all"
          >
            Meet Angel & See Options <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Personal Training {suburb} FAQ
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            What {suburb} clients usually ask before getting started.
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
                Personal training in suburbs near {suburb}
              </h2>
            </div>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              I also coach clients across these nearby Gold Coast suburbs —
              in-person, online, or both:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {neighbors.map((nslug) => {
                const name = unslugify(nslug);
                if (!name) return null;
                return (
                  <Link
                    key={nslug}
                    to={`/personal-training/${slugify(name)}`}
                    className="px-4 py-2 rounded-full border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-sm text-foreground hover:text-primary"
                  >
                    PT in {name}
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
            Ready to Transform Your Fitness in {suburb}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get in touch today. Whether you're new to training or trying to
            break through a plateau, we'll design a plan that actually fits
            your week.
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
              View All Areas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <a
        href={CONTACT.whatsappPT}
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
            Personal Training in {suburb} and across the Gold Coast
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>•</span>
            <Link to="/personal-training" className="hover:text-primary transition-colors">Personal Training</Link>
            <span>•</span>
            <Link to="/areas-i-service" className="hover:text-primary transition-colors">Areas I Service</Link>
            <span>•</span>
            <Link to="/personal-training-gold-coast" className="hover:text-primary transition-colors">Training Guide</Link>
            <span>•</span>
            <Link to="/waiver" className="hover:text-primary transition-colors">Liability Waiver</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">Terms & Disclaimer</Link>
          </div>
          <p className="text-muted-foreground/60 text-xs mt-6">
            © {new Date().getFullYear()} Angel Fitness. All rights reserved.
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
      q: `Do you offer personal training in ${suburb}?`,
      a: profile.faqLocation,
    },
    {
      q: "How long have you been a personal trainer?",
      a: "Over 10 years. I've coached clients from Jersey to Australia and helped hundreds of people build strength, lose fat, and rebuild confidence through structured training.",
    },
    {
      q: `What's the most common reason ${suburb} locals start personal training?`,
      a: `Usually one of three things: ${firstLifestyle} is starting to wear them down, they've plateaued after years of solo gym time, or they just turned 40 and realised strength is non-negotiable. Coaching solves all three.`,
    },
    {
      q: `Can personal training help with ${firstBodyToll}?`,
      a: `Yes — that's actually one of the most common things ${suburb} clients want fixed. ${firstBodyToll.charAt(0).toUpperCase() + firstBodyToll.slice(1)} usually shows up because of ${firstLifestyle}, and a coached strength program addresses both the symptom and the underlying weakness. Most clients feel a real difference inside 4-6 weeks.`,
    },
    {
      q: "Do you offer online coaching as well?",
      a: `Absolutely. Online clients get a custom program, weekly video form-checks, regular check-ins and ongoing programming adjustments. It's especially popular with ${suburb} clients who can't easily get to Surfers Paradise during the week — FIFO workers, shift workers, busy parents.`,
    },
    {
      q: `Is personal training in ${suburb} suitable for total beginners?`,
      a: `100%. Most of my ${suburb} clients are beginners or returning to training after a long break. Every program scales to your starting point — no judgement, no ego, no being thrown into the deep end.`,
    },
    {
      q: "Will I get bulky if I lift weights?",
      a: "No. Building visible muscle takes years of dedicated training and a huge calorie surplus. What lifting actually gives you is strength, shape, better posture, denser bones, faster metabolism and confidence. Nearly every female client I've ever coached has wished they started sooner.",
    },
    {
      q: `What kind of results can ${suburb} clients expect?`,
      a: "Most clients see meaningful changes in 4-8 weeks — strength up, body composition shifting, energy and mood noticeably better. Visible body changes typically lock in around the 8-12 week mark with consistent training and nutrition.",
    },
    {
      q: `How do I get started from ${suburb}?`,
      a: `Call ${CONTACT.phone} or DM ${CONTACT.instagram} on Instagram. I'll run through your goals, your schedule, and your current fitness level, recommend the right option (in-person, online or program-only), and book you in for your first session. Whether you're near ${landmark} or anywhere else on the coast, getting started is the same call.`,
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

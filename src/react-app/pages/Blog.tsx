import { useEffect } from "react";
import { Link } from "react-router";
import {
  Phone,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Activity,
  Brain,
  HeartPulse,
  Trophy,
  Briefcase,
  Footprints,
  Waves,
  MapPin,
} from "lucide-react";
import { CONTACT } from "@/data/contact";

const LOGO =
  "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/stretched-by-angel-transparent.png";
const HERO_IMG =
  "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/openart-image_1772760489433_e96da448_1772760489635_73d8343e.jpg";
const SECONDARY_IMG =
  "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/Screenshot_20260304_175606_Instagram.jpg";

const URL = "https://stretchedbyangel.com/assisted-stretching-gold-coast";
const TITLE =
  "Assisted Stretching Gold Coast: The Complete Guide to PNF Benefits | Stretched By Angel";
const DESCRIPTION =
  "Assisted Stretching Gold Coast — the complete guide to PNF stretching benefits, who it helps, and what to expect. Covering pain relief, flexibility, recovery, injury prevention, posture, sleep and more from Gold Coast stretch therapist Angel Elliott.";
const PUBLISHED = "2026-05-17";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
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

const PHYSICAL_BENEFITS = [
  "Dramatically increased flexibility",
  "Greater joint range of motion",
  "Better posture and alignment",
  "Lower back pain relief",
  "Neck and shoulder tension release",
  "Hip mobility and tight hip flexor relief",
  "Hamstring and glute release",
  "Faster muscle recovery after training",
  "Reduced delayed onset muscle soreness (DOMS)",
  "Improved circulation and blood flow",
  "Better lymphatic drainage",
  "Improved balance and coordination",
  "Enhanced sports performance",
  "Stronger mind-muscle connection",
  "Reduced risk of strains, tears and overuse injuries",
  "Healthier, more lubricated joints",
  "Better breathing through diaphragm and rib mobility",
  "Relief from sciatic-style nerve symptoms",
];

const MENTAL_BENEFITS = [
  "Deep nervous system relaxation",
  "Lower stress and cortisol levels",
  "Better sleep quality",
  "Improved mood and mental clarity",
  "Reduced anxiety and overwhelm",
  "A genuine pause from screens and busyness",
];

const CONDITIONS_HELPED = [
  "Chronic lower back pain",
  "Tight hip flexors from sitting",
  "Tech neck and rounded shoulders",
  "IT band tightness",
  "Sciatica-style symptoms (tight piriformis/glutes)",
  "Plantar fasciitis (calf and foot tension)",
  "Frozen shoulder and shoulder impingement",
  "Tight hamstrings and limited toe-touch",
  "Knee pain from quad and hip tightness",
  "Tension headaches from neck and jaw tightness",
  "TMJ and jaw clenching",
  "Postural pain from desk work",
  "Stiffness from long-haul travel or driving",
  "General age-related loss of mobility",
];

const WHO_IT_HELPS = [
  {
    icon: Trophy,
    title: "Athletes & gym-goers",
    body: "Whether you train at the gym, run the beach, surf the breaks at Burleigh, or chase a 1RM, assisted PNF stretching speeds recovery, restores range of motion, and keeps you in the game.",
  },
  {
    icon: Briefcase,
    title: "Office workers & desk dwellers",
    body: "Eight hours hunched at a laptop leaves chronic tightness through hip flexors, glutes, upper back and neck. Targeted assisted stretching unwinds the damage your chair is doing.",
  },
  {
    icon: Waves,
    title: "Surfers, paddlers & swimmers",
    body: "The Gold Coast is a saltwater playground — but paddling overworks the shoulders and back. Assisted stretching keeps your shoulders open and your duck-dives easy.",
  },
  {
    icon: Footprints,
    title: "Runners & walkers",
    body: "Tight calves, hamstrings, hip flexors and IT bands are the silent injury machine for runners. PNF stretching releases them in a way solo stretching can't touch.",
  },
  {
    icon: HeartPulse,
    title: "Over-50s & seniors",
    body: "As we age, mobility quietly walks out the door. Assisted stretching is the gentlest, safest way to put it back — improving balance, joint health, and confidence in everyday movement.",
  },
  {
    icon: Brain,
    title: "Stressed-out humans",
    body: "Some people leave a session more relaxed than after a massage. The combination of deep stretching and slow breathing flips the nervous system into recovery mode.",
  },
];

const FAQS = [
  {
    q: "Is assisted stretching the same as yoga or massage?",
    a: "No. Yoga is self-directed movement and breath. Massage is hands-on soft-tissue work. Assisted stretching uses PNF — Proprioceptive Neuromuscular Facilitation — where Angel guides your body into deeper, longer stretches than you can achieve alone, using brief muscle contractions to unlock the nervous system's safety brake on your flexibility.",
  },
  {
    q: "Does assisted stretching hurt?",
    a: "It shouldn't. You'll feel intensity in the stretch, but never sharp or stabbing pain. Every position is communicated, paced to your breath, and adjusted in real time. Many clients describe it as 'intense relief'.",
  },
  {
    q: "How is this different from stretching at home?",
    a: "When you stretch alone, your nervous system reflexively limits how far you go to protect the muscle. With a trained partner applying gentle pressure and guiding contraction–relaxation cycles (PNF), that brake releases and you access genuinely new range. You'll get more out of a single 50-minute session than weeks of unguided stretching.",
  },
  {
    q: "How soon will I notice results?",
    a: "Most clients walk out of session one feeling visibly looser — straighter posture, easier breathing, reduced low back or neck tension. Lasting change comes from consistency. One session a week for 4–6 weeks produces dramatic, measurable improvements in flexibility.",
  },
  {
    q: "Where on the Gold Coast can I book?",
    a: "Studio sessions are at Wicked Bodz Fitness Centre, 45 Cavill Ave, Surfers Paradise. Mobile home visits are available across all Gold Coast suburbs — from Coolangatta in the south to Coomera in the north and everywhere in between.",
  },
];

const BLOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Assisted Stretching Gold Coast: The Complete Guide to PNF Stretching Benefits",
  description: DESCRIPTION,
  image: HERO_IMG,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: {
    "@type": "Person",
    name: "Angel Elliott",
    url: "https://stretchedbyangel.com/",
  },
  publisher: {
    "@type": "Organization",
    name: "Stretched By Angel",
    logo: { "@type": "ImageObject", url: LOGO },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  keywords:
    "assisted stretching Gold Coast, PNF stretching Gold Coast, stretch therapy, mobile stretching, flexibility, pain relief, sports recovery",
  articleSection: "Health & Wellness",
  inLanguage: "en-AU",
};

const ARTICLE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function BlogPage() {
  useEffect(() => {
    document.title = TITLE;
    setMeta("name", "description", DESCRIPTION);
    setMeta("name", "keywords",
      "assisted stretching Gold Coast, PNF stretching Gold Coast, mobile stretching Gold Coast, stretch therapy, flexibility training, sports recovery, pain relief, Surfers Paradise stretching, Burleigh stretching, Broadbeach stretching"
    );
    setMeta("property", "og:type", "article");
    setMeta("property", "og:title", TITLE);
    setMeta("property", "og:description", DESCRIPTION);
    setMeta("property", "og:image", HERO_IMG);
    setMeta("property", "og:url", URL);
    setMeta("property", "article:published_time", PUBLISHED);
    setMeta("property", "article:author", "Angel Elliott");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", TITLE);
    setMeta("name", "twitter:description", DESCRIPTION);
    setMeta("name", "twitter:image", HERO_IMG);
    setCanonical(URL);

    const scripts = [BLOG_SCHEMA, ARTICLE_FAQ_SCHEMA].map((data) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify(data);
      document.head.appendChild(el);
      return el;
    });
    return () => {
      scripts.forEach((el) => el.remove());
    };
  }, []);

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

      <article>
        {/* Hero */}
        <header className="relative py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-rose-500/10 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Stretching Guide · Gold Coast
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent">
                Assisted Stretching Gold Coast
              </span>
              <br />
              <span className="text-white text-3xl sm:text-4xl lg:text-5xl">
                The Complete Guide to PNF Stretching Benefits
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Everything assisted stretching on the Gold Coast helps with — from
              chronic pain and posture to sleep, sports performance and stress.
              Written by certified stretch therapist Angel Elliott.
            </p>
            <p className="text-sm text-white/50">
              Published {new Date(PUBLISHED).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · 8 min read · By{" "}
              <Link to="/" className="text-primary hover:underline">
                Angel Elliott
              </Link>
            </p>
          </div>
        </header>

        {/* Lead image */}
        <div className="max-w-4xl mx-auto px-4 -mt-8 mb-12">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Assisted stretching Gold Coast — PNF stretch therapy with Angel Elliott"
              className="relative rounded-2xl shadow-2xl w-full object-cover ring-1 ring-white/10"
            />
          </div>
        </div>

        {/* Body content */}
        <div className="max-w-3xl mx-auto px-4 pb-16 space-y-12">
          {/* Intro */}
          <section>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              If you live on the <strong className="text-foreground">Gold Coast</strong>,
              you're probably moving more than the average person — surfing,
              gym sessions, beach runs, paddling, hiking the Hinterland. But all
              that activity, combined with hours at a desk or behind a wheel,
              quietly destroys your flexibility. <strong className="text-foreground">Assisted
              stretching Gold Coast clients book with me</strong> isn't a luxury
              — it's the maintenance work your body has been begging for.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This guide walks through exactly what assisted stretching does,
              who it helps, and what changes you can expect. If you'd rather
              skip the reading and just book,{" "}
              <Link to="/" className="text-primary underline hover:text-primary/80">
                head back to the home page for pricing and to lock in a session
              </Link>
              .
            </p>
          </section>

          {/* What is assisted stretching */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What is assisted stretching?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Assisted stretching</strong> is
              exactly what it sounds like: a trained stretch therapist guides
              your body into stretches you couldn't safely or effectively
              perform alone. The method I use is{" "}
              <strong className="text-foreground">PNF — Proprioceptive
              Neuromuscular Facilitation</strong> — the same advanced technique
              used by elite sports physios and rehab specialists for decades.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PNF works in cycles: a passive stretch, a short isometric muscle
              contraction, then a deeper passive stretch as the nervous system
              releases its protective brake. The result is genuinely new range
              of motion in a single session — not the temporary "feel-good"
              you get from solo stretching at home.
            </p>
          </section>

          {/* Physical benefits */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              The physical benefits of assisted stretching
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Most Gold Coast clients come to me for one specific problem.
              They stay because of everything else that improves. Here's the
              full list of physical benefits you can expect:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {PHYSICAL_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Mental benefits */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              The mental & nervous-system benefits
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We don't talk about this enough. A proper assisted stretch
              session is one of the most underrated nervous-system resets
              available. Here's what changes upstairs:
            </p>
            <ul className="space-y-3">
              {MENTAL_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Conditions */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Specific conditions assisted stretching helps with
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Assisted stretching is not a medical treatment — but it directly
              addresses the muscle and fascial tightness that drives a long
              list of common complaints. Clients across the Gold Coast come to
              me for help with:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {CONDITIONS_HELPED.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 bg-card/50 border border-border rounded-xl px-4 py-3"
                >
                  <Activity className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{c}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Always check with your doctor or physio first if you're dealing
              with a diagnosed injury or chronic condition.
            </p>
          </section>

          {/* Who it helps */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Who assisted stretching helps most
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Honestly? Almost everyone. But these are the people who notice
              the biggest changes the fastest:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {WHO_IT_HELPS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Gold Coast */}
          <section className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why assisted stretching matters specifically on the Gold Coast
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Gold Coast life is uniquely demanding on the body. The
                lifestyle here pulls in two directions: high-output activity
                (surf, gym, running the beachfront, paddleboarding, hiking
                Springbrook) on one side, and long sedentary stretches on the
                other — long commutes, tradie ute days, FIFO rosters, beach
                days that turn into chair days.
              </p>
              <p>
                Both extremes tighten the same muscles: hip flexors, hamstrings,
                glutes, lats and upper back. Assisted stretching is the
                shortest path to fixing both.
              </p>
              <p>
                I run sessions from{" "}
                <strong className="text-foreground">Wicked Bodz Fitness
                Centre in Surfers Paradise</strong>, and I do mobile home
                visits across the entire coast. Wherever you are between
                Coolangatta and Coomera — including{" "}
                <Link to="/assisted-stretching/burleigh-heads" className="text-primary hover:underline">
                  Burleigh Heads
                </Link>
                ,{" "}
                <Link to="/assisted-stretching/broadbeach" className="text-primary hover:underline">
                  Broadbeach
                </Link>
                ,{" "}
                <Link to="/assisted-stretching/palm-beach" className="text-primary hover:underline">
                  Palm Beach
                </Link>
                ,{" "}
                <Link to="/assisted-stretching/robina" className="text-primary hover:underline">
                  Robina
                </Link>
                ,{" "}
                <Link to="/assisted-stretching/southport" className="text-primary hover:underline">
                  Southport
                </Link>{" "}
                and{" "}
                <Link to="/areas-i-service" className="text-primary hover:underline">
                  every other Gold Coast suburb
                </Link>{" "}
                — I can come to you.
              </p>
            </div>
          </section>

          {/* Secondary image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
            <img
              src={SECONDARY_IMG}
              alt="PNF stretching session on the Gold Coast"
              className="relative rounded-2xl shadow-2xl w-full ring-1 ring-white/10"
            />
          </div>

          {/* What to expect */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What to expect in your first session
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              No experience needed. You don't have to be flexible. You don't
              need to "prep". Here's how a typical 50-minute session runs:
            </p>
            <ol className="space-y-3 text-lg text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">1.</span>
                <span>
                  <strong className="text-foreground">Quick chat (5 min):</strong>{" "}
                  what's tight, what's painful, what your week looked like,
                  any injuries or pregnancies to know about.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">2.</span>
                <span>
                  <strong className="text-foreground">Full body PNF flow (40 min):</strong>{" "}
                  table-based assisted stretches working through legs, hips,
                  glutes, lower and upper back, chest, shoulders, neck.
                  Everything paced to your breath.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">3.</span>
                <span>
                  <strong className="text-foreground">Reset & rebook (5 min):</strong>{" "}
                  a couple of homework stretches, water, and we lock in your
                  next session if you want one.
                </span>
              </li>
            </ol>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6">
              Wear comfortable activewear. Bring water. That's it.
            </p>
          </section>

          {/* Frequency */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How often should you book?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Honest answer: it depends on your goals.
            </p>
            <ul className="space-y-3 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-foreground">Maintenance:</strong>{" "}
                  once every 2–4 weeks keeps you out of pain and moving well.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-foreground">Active flexibility gains:</strong>{" "}
                  weekly for 6–8 weeks produces visible, measurable change.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-foreground">Injury recovery or chronic tightness:</strong>{" "}
                  twice weekly initially, scaling back as you improve.
                </span>
              </li>
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6">
              The 10-session packs on{" "}
              <Link to="/#pricing" className="text-primary hover:underline">
                the pricing section of the home page
              </Link>{" "}
              are how most regulars commit — they save real money and lock
              you into the cadence that actually produces change.
            </p>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Assisted stretching Gold Coast: FAQ
            </h2>
            <div className="space-y-3">
              {FAQS.map((f) => (
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
          </section>

          {/* Closing CTA */}
          <section className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 border border-primary/30 rounded-3xl p-8 sm:p-10 text-center">
            <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to feel the difference?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              The fastest way to understand what{" "}
              <strong className="text-foreground">assisted stretching on the
              Gold Coast</strong> actually does for your body is to book a
              single session. Most people walk out shocked at how different
              they feel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-full hover:from-pink-400 hover:to-rose-300 transition-all shadow-lg shadow-pink-500/25"
              >
                See Pricing & Book
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={CONTACT.phoneLink}
                className="inline-flex items-center justify-center gap-2 border border-border font-medium px-8 py-4 rounded-full hover:bg-secondary transition-all"
              >
                <Phone className="w-5 h-5" /> Call {CONTACT.phone}
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Or{" "}
              <Link to="/areas-i-service" className="text-primary hover:underline">
                find your suburb
              </Link>{" "}
              ·{" "}
              <Link to="/personal-training" className="text-primary hover:underline">
                check out personal training
              </Link>
            </p>
          </section>
        </div>
      </article>

      {/* WhatsApp */}
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
          <Link to="/" className="inline-block mb-4">
            <img src={LOGO} alt="Stretched By Angel" className="h-12 w-12 mx-auto" />
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            Professional Assisted Stretching across the Gold Coast
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>•</span>
            <Link to="/personal-training" className="hover:text-primary transition-colors">Personal Training</Link>
            <span>•</span>
            <Link to="/areas-i-service" className="hover:text-primary transition-colors">Areas I Service</Link>
            <span>•</span>
            <Link to="/waiver" className="hover:text-primary transition-colors">Liability Waiver</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">Terms & Disclaimer</Link>
          </div>
          <p className="text-muted-foreground/60 text-xs mt-6">
            © {new Date().getFullYear()} Stretched By Angel. Gold Coast, Australia.
          </p>
        </div>
      </footer>
    </div>
  );
}

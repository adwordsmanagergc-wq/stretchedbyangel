import { useEffect } from "react";
import { Link } from "react-router";
import {
  Phone,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Brain,
  Trophy,
  Briefcase,
  Heart,
  HeartPulse,
  Target,
  Users,
  Monitor,
  MapPin,
  Flame,
} from "lucide-react";
import { CONTACT } from "@/data/contact";

const LOGO =
  "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/stretched-by-angel-transparent.png";
const HERO_IMG =
  "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/Screenshot-2026-03-23-at-10.55.51-am.png";
const SECONDARY_IMG =
  "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/Screenshot-2026-03-23-at-10.35.28-am.png";

const URL = "https://www.stretchedbyangel.com/personal-training-gold-coast";
const TITLE =
  "Personal Training Gold Coast: The Complete Guide to Training With Angel | Angel Fitness";
const DESCRIPTION =
  "Personal Training Gold Coast — the complete guide to what personal training actually does, who it helps, results to expect, and how to choose between in-person, online and custom programs. Written by qualified trainer Angel Elliott (10+ years).";
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

const PHYSICAL_RESULTS = [
  "Build genuine, lasting strength",
  "Lose body fat sustainably",
  "Visibly change body composition",
  "Build lean muscle (yes, women too)",
  "Improve cardiovascular fitness",
  "Increase bone density",
  "Better balance, coordination and agility",
  "Improved posture and movement quality",
  "Stronger joints and connective tissue",
  "Reduced everyday aches and pains",
  "More energy throughout the day",
  "Better sleep quality",
  "Higher resting metabolic rate",
  "Improved hormonal health",
];

const MENTAL_RESULTS = [
  "Genuine, earned confidence",
  "Lower stress and anxiety",
  "Better mood and emotional resilience",
  "Sharper focus and productivity",
  "A reliable sense of accomplishment each week",
  "Discipline and habits that bleed into the rest of life",
  "Body-image improvements that aren't dependent on the scale",
];

const CONDITIONS_PT_HELPS = [
  "Stubborn weight that won't shift",
  "Postpartum return to training",
  "Recovery from injury or surgery (with medical clearance)",
  "Pre-diabetic or metabolic syndrome risk",
  "Osteoporosis prevention",
  "Sarcopenia (age-related muscle loss)",
  "Office-job stiffness and weakness",
  "Anxiety, depression and burnout (as adjunct to professional care)",
  "Plateaus after years of solo training",
  "Lack of motivation or consistency",
];

const WHO_IT_HELPS = [
  {
    icon: Users,
    title: "Beginners & comeback clients",
    body: "Never lifted a weight, or haven't trained in years? This is the most common starting point. We strip everything back to fundamentals and build from there — no judgement, no ego.",
  },
  {
    icon: Briefcase,
    title: "Busy professionals",
    body: "If you have 2–3 hours a week and want maximum return on time, structured personal training crushes random gym sessions. We build a program that fits your schedule, not the other way around.",
  },
  {
    icon: HeartPulse,
    title: "Postpartum mums",
    body: "Returning to training after a baby needs structure and patience. We rebuild your core and pelvic floor first, then progressively layer strength on top.",
  },
  {
    icon: Heart,
    title: "Over-40s",
    body: "Strength training in your 40s, 50s and 60s is the single best thing you can do for long-term health, mobility and independence. We train smart, not destructively.",
  },
  {
    icon: Trophy,
    title: "Athletes & active Gold Coasters",
    body: "Surfers, runners, triathletes, footballers — if you have a sport, you need a strength program that supports it without wrecking your recovery. We periodise around your season.",
  },
  {
    icon: Flame,
    title: "Anyone stuck in a plateau",
    body: "Been training for years but the needle hasn't moved? Outside eyes, structured programming and proper progressive overload solve this fast.",
  },
];

const TRAINING_OPTIONS = [
  {
    icon: Users,
    title: "In-person training",
    body: "One-on-one sessions at Wicked Bodz Fitness Centre in Surfers Paradise. Best for technique-heavy training, accountability, and people who genuinely thrive on having a coach in the room.",
  },
  {
    icon: Monitor,
    title: "Online coaching",
    body: "Custom programming delivered weekly, video form reviews, regular check-ins, and ongoing adjustments. Best for people who travel, work shift work, or live further out from Surfers.",
  },
  {
    icon: Target,
    title: "Custom programs",
    body: "A personalised program designed for your goals, equipment and schedule — that you run independently. Best for self-motivated trainees who just need the plan, not the hand-holding.",
  },
];

const FAQS = [
  {
    q: "Do I have to be fit to start personal training on the Gold Coast?",
    a: "No — quite the opposite. Most of my Gold Coast clients walk in for their first session as total beginners or after a long break from the gym. Every program is built around your current ability and progressed from there.",
  },
  {
    q: "How fast will I see results?",
    a: "Most clients see and feel meaningful changes inside 4–8 weeks — strength up, body composition shifting, energy and mood noticeably better. Visible body changes typically lock in around the 8–12 week mark with consistent training and nutrition.",
  },
  {
    q: "How is personal training different from just going to the gym?",
    a: "Three things: programming, technique, and accountability. A coached program is built specifically for your body and goals; technique gets corrected in real time so you actually progress; and someone is expecting you each week. Most people make more progress in 12 weeks of coaching than 12 months of solo training.",
  },
  {
    q: "Do you do online coaching or just in-person?",
    a: "Both. In-person clients meet me at Wicked Bodz Fitness Centre in Surfers Paradise. Online clients receive a custom program, video form-checks, and weekly check-ins — and can train anywhere in the world. Many clients combine the two.",
  },
  {
    q: "Will I get bulky if I lift weights?",
    a: "No. Building visible muscle requires huge calorie surplus and years of dedicated training. What lifting actually gives you is strength, shape, better posture, denser bones, faster metabolism and confidence. Almost every female client I've ever coached has wished they started sooner.",
  },
  {
    q: "How much does personal training on the Gold Coast cost?",
    a: `Pricing depends on whether you choose in-person, online or a custom program-only plan, and how many sessions per week you want. Give me a call on ${CONTACT.phone} or DM ${CONTACT.instagram} and I'll talk you through the options that fit your goals and budget.`,
  },
];

const BLOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Personal Training Gold Coast: The Complete Guide to Training With Angel",
  description: DESCRIPTION,
  image: HERO_IMG,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: {
    "@type": "Person",
    name: "Angel Elliott",
    url: "https://www.stretchedbyangel.com/personal-training",
  },
  publisher: {
    "@type": "Organization",
    name: "Angel Fitness",
    logo: { "@type": "ImageObject", url: LOGO },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  keywords:
    "personal training Gold Coast, personal trainer Gold Coast, online coaching, strength training Gold Coast, female personal trainer, Surfers Paradise PT",
  articleSection: "Fitness & Training",
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

export default function PersonalTrainingBlogPage() {
  useEffect(() => {
    document.title = TITLE;
    setMeta("name", "description", DESCRIPTION);
    setMeta(
      "name",
      "keywords",
      "personal training Gold Coast, personal trainer Gold Coast, online personal trainer, strength training Gold Coast, Surfers Paradise personal training, female personal trainer Gold Coast, Burleigh personal trainer, Broadbeach personal trainer"
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

      <article>
        {/* Hero */}
        <header className="relative py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-rose-500/10 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Dumbbell className="w-4 h-4" />
              Training Guide · Gold Coast · 10+ Years Experience
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 bg-clip-text text-transparent">
                Personal Training Gold Coast
              </span>
              <br />
              <span className="text-white text-3xl sm:text-4xl lg:text-5xl">
                The Complete Guide to Training With Angel
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Everything personal training on the Gold Coast actually does for
              your body and your life — strength, fat loss, energy, mood,
              confidence — and how to pick the right option for you.
            </p>
            <p className="text-sm text-white/50">
              Published{" "}
              {new Date(PUBLISHED).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · 9 min read · By{" "}
              <Link to="/personal-training" className="text-primary hover:underline">
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
              alt="Personal training Gold Coast — Angel Elliott coaching strength training"
              className="relative rounded-2xl shadow-2xl w-full object-cover ring-1 ring-white/10"
            />
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-4 pb-16 space-y-12">
          {/* Intro */}
          <section>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              Most people on the{" "}
              <strong className="text-foreground">Gold Coast</strong> who hire
              a personal trainer have tried gyms before. They've started
              programs, lost momentum, tried again, plateaued. The thing solo
              training can't give you is{" "}
              <strong className="text-foreground">a system</strong> — a
              real, periodised program built for your body, your schedule and
              your goals, plus the accountability to actually run it.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              That's what{" "}
              <strong className="text-foreground">personal training Gold
              Coast clients come to me for</strong>. Below is exactly what it
              does, who it helps most, and how to choose between in-person,
              online or program-only. If you just want pricing,{" "}
              <Link to="/personal-training" className="text-primary underline hover:text-primary/80">
                head to the personal training page
              </Link>{" "}
              or head back{" "}
              <Link to="/" className="text-primary underline hover:text-primary/80">
                home
              </Link>
              .
            </p>
          </section>

          {/* What is PT */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What personal training actually is (and isn't)
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Personal training</strong> is
              not someone yelling at you in a sweaty room until you collapse.
              It's structured, periodised programming designed specifically
              for one person — you — coached week-on-week so the program keeps
              progressing and the technique keeps improving. Done right, it's
              the single highest-ROI use of your gym time.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I've been coaching for{" "}
              <strong className="text-foreground">over a decade</strong>, with
              clients spanning Jersey to the Gold Coast — from complete
              beginners to athletes and over-60s. The principles are the same
              whether the goal is fat loss, strength, postpartum recovery or
              athletic performance: <em>progressive overload, recoverable
              workload, technique that scales, and habits that stick</em>.
            </p>
          </section>

          {/* Physical results */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What personal training does for your body
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Strength training is the closest thing we have to a longevity
              drug. Most clients arrive with one goal — usually fat loss —
              and walk away with everything else as a bonus. Here's the full
              list:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {PHYSICAL_RESULTS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Mental results */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What it does for your mind
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The mental return on personal training is, honestly, often
              bigger than the physical one. Clients consistently report:
            </p>
            <ul className="space-y-3">
              {MENTAL_RESULTS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Conditions PT helps */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Situations where personal training helps most
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Personal training isn't medical care — but structured strength
              and conditioning is part of the gold-standard intervention for
              a long list of common situations:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {CONDITIONS_PT_HELPS.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 bg-card/50 border border-border rounded-xl px-4 py-3"
                >
                  <Target className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{c}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Always check with your doctor first if you're working around a
              diagnosed condition, injury, or post-surgical rehab.
            </p>
          </section>

          {/* Who it helps */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Who personal training helps most
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The clients who get the most out of coaching aren't necessarily
              the fittest or the most motivated. They're the ones who show up
              consistently and let the system work:
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

          {/* Training options */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              In-person vs online vs custom programs
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              I offer three ways to work together. Most clients pick one and
              stick with it — but some combine in-person and online during
              busy seasons or while travelling.
            </p>
            <div className="space-y-4">
              {TRAINING_OPTIONS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-xl mb-1">
                        {title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Gold Coast */}
          <section className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why personal training on the Gold Coast specifically
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                The Gold Coast lifestyle is misleading. From the outside, it
                looks like everyone's beach-fit by default. In reality, the
                exact same patterns play out here as everywhere else: long
                hours at a desk, FIFO rotations, tradie shoulders, postnatal
                rebuilds, and decades-deep gym plateaus.
              </p>
              <p>
                What's different here is{" "}
                <em>access</em>. The climate means you can train year-round.
                The beachfront makes conditioning easy. And the gym scene
                here is genuinely excellent. Once you have a real program,
                the Gold Coast is one of the best places on the planet to
                execute it.
              </p>
              <p>
                I'm based at{" "}
                <strong className="text-foreground">Wicked Bodz Fitness
                Centre, Surfers Paradise</strong>, working with clients from{" "}
                <Link to="/personal-training/burleigh-heads" className="text-primary hover:underline">
                  Burleigh Heads
                </Link>
                ,{" "}
                <Link to="/personal-training/broadbeach" className="text-primary hover:underline">
                  Broadbeach
                </Link>
                ,{" "}
                <Link to="/personal-training/main-beach" className="text-primary hover:underline">
                  Main Beach
                </Link>
                ,{" "}
                <Link to="/personal-training/robina" className="text-primary hover:underline">
                  Robina
                </Link>
                ,{" "}
                <Link to="/personal-training/southport" className="text-primary hover:underline">
                  Southport
                </Link>{" "}
                and{" "}
                <Link to="/areas-i-service" className="text-primary hover:underline">
                  every other Gold Coast suburb
                </Link>
                . Online clients train from anywhere in the world.
              </p>
            </div>
          </section>

          {/* Secondary image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
            <img
              src={SECONDARY_IMG}
              alt="Personal trainer Angel Elliott coaching a strength session on the Gold Coast"
              className="relative rounded-2xl shadow-2xl w-full ring-1 ring-white/10"
            />
          </div>

          {/* What to expect */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What to expect from your first 12 weeks
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              The first three months produce the most dramatic visible change
              — and the foundation for everything that follows.
            </p>
            <ol className="space-y-3 text-lg text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">Weeks 1–2:</span>
                <span>
                  Movement assessment, technique work, baseline strength
                  numbers, lifestyle and nutrition audit. You'll feel sore
                  but capable.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">Weeks 3–4:</span>
                <span>
                  Energy levels lift. Sleep improves. The big lifts start
                  feeling familiar. Friends start asking what you're doing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">Weeks 5–8:</span>
                <span>
                  Visible body composition changes. Clothes fit differently.
                  Strength gains are obvious and measurable. Confidence
                  noticeably up.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary shrink-0">Weeks 9–12:</span>
                <span>
                  The "transformation" people post on Instagram. By this
                  point training is a non-negotiable habit, not a willpower
                  battle.
                </span>
              </li>
            </ol>
          </section>

          {/* Pair with stretching */}
          <section className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 border border-primary/20 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Pair training with assisted stretching for faster results
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The single biggest accelerator I see for clients is adding{" "}
              <Link to="/assisted-stretching-gold-coast" className="text-primary underline hover:text-primary/80">
                assisted PNF stretching
              </Link>{" "}
              to their training week. It accelerates recovery, reduces
              injury risk, and unlocks range of motion you didn't know you'd
              lost. I offer both services, so it's easy to combine.
            </p>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Personal training Gold Coast: FAQ
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
              Ready to actually change?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              The clients who get results are the ones who book the call.
              Whether you train with me in-person on the Gold Coast or online
              from anywhere in the world, the first step is the same — get in
              touch and we'll work out the right plan for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link
                to="/personal-training"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-full hover:from-pink-400 hover:to-rose-300 transition-all shadow-lg shadow-pink-500/25"
              >
                See Training Options
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
              <Link to="/" className="text-primary hover:underline">
                explore assisted stretching
              </Link>{" "}
              ·{" "}
              <a
                href={CONTACT.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                DM on Instagram
              </a>
            </p>
          </section>
        </div>
      </article>

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
          <Link to="/" className="inline-block mb-4">
            <img src={LOGO} alt="Angel Fitness" className="h-12 w-12 mx-auto" />
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            Personal Training & Assisted Stretching on the Gold Coast
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>•</span>
            <Link to="/personal-training" className="hover:text-primary transition-colors">Personal Training</Link>
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
            © {new Date().getFullYear()} Angel Fitness. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

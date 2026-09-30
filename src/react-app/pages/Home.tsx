import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Phone,
  Instagram,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap,
  Heart,
  Shield,
  Brain,
  ArrowRight,
  Building2,
  Briefcase,
  Users,
  TrendingUp,
  Quote,
  CalendarClock,
  MapPin,
} from "lucide-react";
import SchemaMarkup from "@/react-app/components/SchemaMarkup";
import { BUSINESS } from "@/react-app/lib/business";
import { IMG } from "@/data/images";
import { SiteHeader, SiteFooter } from "@/react-app/components/SiteNav";

const IMAGES = IMG;

const CONTACT = {
  phone: "0434 773 815",
  phoneLink: "tel:0434773815",
  instagram: "@stretchedbyangel",
  instagramLink: "https://www.instagram.com/stretchedbyangel/",
  address: BUSINESS.addressLine,
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(
    `${BUSINESS.venue}, ${BUSINESS.addressLine}`
  )}&output=embed`,
  directions: BUSINESS.googleMapsUrl,
};

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Increase Flexibility",
    description: "Achieve deeper stretches than possible on your own, dramatically improving your overall flexibility.",
  },
  {
    icon: Zap,
    title: "Improve Range of Motion",
    description: "Unlock restricted joints and muscles to move more freely in daily activities and sports.",
  },
  {
    icon: Heart,
    title: "Pain Relief",
    description: "Release chronic muscle tension and reduce pain from tight muscles, poor posture, or injuries.",
  },
  {
    icon: Shield,
    title: "Prevent Injuries",
    description: "Regular stretching keeps muscles supple and joints healthy, reducing your risk of strains and tears.",
  },
  {
    icon: Brain,
    title: "Reduce Stress",
    description: "Experience deep relaxation as tension melts away, improving your mental wellbeing.",
  },
  {
    icon: CheckCircle2,
    title: "Enhanced Recovery",
    description: "Speed up muscle recovery after workouts and reduce delayed onset muscle soreness.",
  },
];

const FAQS = [
  {
    question: "What is PNF stretching?",
    answer: "PNF (Proprioceptive Neuromuscular Facilitation) stretching is an advanced technique that combines passive stretching with isometric contractions. Research suggests it can produce greater flexibility gains than traditional static stretching, often in less time.",
  },
  {
    question: "How is assisted stretching different from stretching on my own?",
    answer: "With assisted stretching, a trained professional guides your body into deeper, more effective stretches than you could achieve alone. I can apply the right amount of pressure, ensure proper form, and target muscles you might not be able to reach yourself.",
  },
  {
    question: "Who can benefit from PNF stretching?",
    answer: "Everyone! Whether you're an athlete looking to improve performance, someone with chronic pain or stiffness, an office worker with tight shoulders and neck, or just want to move and feel better—assisted stretching can help you.",
  },
  {
    question: "How often should I get stretched?",
    answer: "For best results, I recommend 1-2 sessions per week. However, even a single session can provide noticeable relief. We'll discuss a schedule that works for your goals and lifestyle.",
  },
  {
    question: "What should I wear to a session?",
    answer: "Wear comfortable, flexible clothing you can move in—activewear, leggings, shorts, or athletic gear works great. Avoid jeans or restrictive clothing.",
  },
  {
    question: "Do I need to be flexible to start?",
    answer: "Absolutely not! I work with people of all flexibility levels. In fact, the less flexible you are, the more you'll benefit from assisted stretching. Every session is tailored to your current ability.",
  },
];

const PRICING = [
  { duration: "30 mins", price: "$60", description: "Perfect for targeting specific problem areas" },
  { duration: "60 mins", price: "$90", description: "Full body stretch for complete relief" },
  { duration: "60 mins (Home Visit)", price: "$130", description: "Full body stretch in the comfort of your home" },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function BookButton({ className = "", children = "Book Now" }: { className?: string; children?: React.ReactNode }) {
  return (
    <a
      href={CONTACT.phoneLink}
      className={`btn-primary inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full ${className}`}
    >
      <Phone className="w-5 h-5" />
      {children}
    </a>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [whatsappBottom, setWhatsappBottom] = useState(80);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const minBottom = window.innerWidth >= 640 ? 24 : 80;
        const spacing = 16;

        if (footerRect.top < windowHeight) {
          const newBottom = windowHeight - footerRect.top + spacing;
          setWhatsappBottom(Math.max(newBottom, minBottom));
        } else {
          setWhatsappBottom(minBottom);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SchemaMarkup type="home" />
      {/* Navigation */}
      <SiteHeader overlay scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden grain pt-28 pb-16 sm:pt-32 lg:pt-24">
        <div className="absolute inset-0 hero-bg" />
        <div aria-hidden="true" className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full border border-white/[0.05]" />
        <div aria-hidden="true" className="absolute -top-16 -right-16 w-[28rem] h-[28rem] rounded-full border border-white/[0.04]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full surface px-4 py-1.5 text-xs font-medium text-muted-foreground mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
              Certified stretch therapist in Surfers Paradise
            </p>
            <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] font-bold mb-7">
              Professional{" "}
              <span className="text-gradient accent-italic">
                Assisted Stretching Gold Coast
              </span>{" "}
              & Personal Training
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-9 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Unlock your body's full potential with assisted stretching by trained professional Angel Elliott.
              Feel better, move better, live better.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#stretching"
                className="btn-primary inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full"
              >
                <Sparkles className="w-5 h-5" />
                Assisted Stretching
              </a>
              <Link
                to="/personal-training-gold-coast"
                className="surface inline-flex items-center justify-center gap-2 text-foreground font-medium px-7 py-3.5 rounded-full hover:border-white/20 transition-colors"
              >
                Personal Training
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#corporate"
                className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground font-medium px-4 py-3.5 transition-colors"
              >
                <Building2 className="w-4 h-4" />
                Corporate Wellness
              </a>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4">
              By booking, you agree to our <a href="/disclaimer" className="underline hover:text-muted-foreground">terms & disclaimer</a>.
            </p>

            <dl className="mt-10 pt-8 border-t border-white/[0.07] grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              {[
                ["10+ yrs", "Experience"],
                ["From $60", "30 minute sessions"],
                ["Mobile", "Home visits Gold Coast wide"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-xl sm:text-3xl text-foreground whitespace-nowrap">{value}</dd>
                  <dd className="text-xs sm:text-sm text-muted-foreground mt-1 leading-snug">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative max-w-md mx-auto w-full lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-accent/35" />
            <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-white/10 aspect-[4/5] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
              <img
                {...IMAGES.heroAngel}
                fetchPriority="high"
                alt="Angel Elliott delivering an assisted PNF stretching session on the Gold Coast"
                className="w-full h-full object-cover object-center"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute left-3 sm:-left-8 bottom-6 sm:bottom-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/10 px-5 py-4 shadow-2xl">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary font-semibold">PNF technique</p>
              <p className="font-display text-lg leading-tight mt-1">Studio or home visit</p>
              <p className="text-xs text-muted-foreground mt-0.5">30 and 60 minute sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="stretching" className="py-20 lg:py-28 bg-gradient-to-b from-background to-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1 max-w-md mx-auto w-full">
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-2xl border border-accent/35" />
              <img
                {...IMAGES.promo}
                loading="lazy"
                alt="Stretched By Angel - PNF Stretching Services"
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto object-contain ring-1 ring-white/10"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="eyebrow">
                Meet Your Stretch Therapist
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
                Angel Elliott
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I'm a certified stretch therapist passionate about helping people move and feel their best.
                  Based on the beautiful Gold Coast, I specialise in PNF stretching—a well-researched technique that
                  delivers results you can feel from your very first session.
                </p>
                <p>
                  Whether you're dealing with chronic tightness, recovering from training, or simply want to
                  improve your flexibility, I'm here to help. Every session is tailored to your body and goals.
                </p>
                <p>
                  I offer sessions at <strong className="text-foreground">Wicked Bodz Fitness Centre</strong> or
                  in the comfort of <strong className="text-foreground">your own home</strong>—whatever works
                  best for you.
                </p>
                <p>
                  I'm also a <strong className="text-foreground">qualified personal trainer</strong> with over
                  10 years of experience helping people transform their bodies and lives.{" "}
                  <Link to="/personal-training-gold-coast" className="text-primary hover:text-primary/80 underline transition-colors">
                    Learn more about personal training →
                  </Link>
                </p>
              </div>
              <div className="mt-8">
                <BookButton>Book With Angel</BookButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 lg:py-28 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="eyebrow">
              Why Choose Assisted Stretching?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Benefits of PNF Stretching
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              PNF stretching is one of the most effective forms of flexibility training,
              backed by science and trusted by athletes worldwide.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, index) => (
              <div
                key={index}
                className="surface rounded-2xl p-6 surface-hover group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing: single sessions, then 10 session packs */}
      <section id="pricing" className="py-20 lg:py-28 bg-background relative overflow-hidden">
        <div aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 w-[60rem] h-[30rem] bg-[radial-gradient(closest-side,hsl(var(--primary)/0.10),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="eyebrow">Casual Sessions</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5">Single Session Pricing</h2>
            <p className="text-muted-foreground text-lg">Not ready for a multipack? Try a single session first.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {PRICING.map((tier, index) => (
              <div
                key={index}
                className={`surface surface-hover rounded-3xl p-7 flex flex-col text-center ${
                  index === 1 ? "sm:-translate-y-3 border-primary/40 ring-1 ring-primary/20" : ""
                }`}
              >
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{tier.duration}</span>
                </div>
                <div className="font-display text-5xl sm:text-6xl text-foreground mb-3">{tier.price}</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-7 flex-1">{tier.description}</p>
                <BookButton className="w-full !px-5 !py-3 text-sm">Book {tier.duration}</BookButton>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center mb-12">
            <span className="eyebrow">Save More</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5">10 Session Discount</h2>
            <p className="text-muted-foreground text-lg">Commit to your flexibility journey and save with a 10 session package.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "30 Minute Sessions", total: "$550", per: "$55 / session", save: "Save $50", extra: null },
              { title: "60 Minute Sessions", total: "$800", per: "$80 / session", save: "Save $100", extra: "+ $30 per session for home visit" },
            ].map((pack) => (
              <div key={pack.title} className="surface rounded-3xl p-8 relative overflow-hidden">
                <div aria-hidden="true" className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4 mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">10 session pack</p>
                    <h3 className="font-display text-2xl mt-2">{pack.title}</h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent/15 text-accent text-xs font-semibold px-3 py-1">{pack.save}</span>
                </div>
                <div className="relative flex items-end gap-3 mb-2">
                  <span className="font-display text-6xl leading-none">{pack.total}</span>
                  <span className="text-muted-foreground mb-1.5">{pack.per}</span>
                </div>
                <p className="relative text-sm text-primary min-h-[1.25rem] mb-7">{pack.extra}</p>
                <BookButton className="relative w-full">Get Started</BookButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Action Shot */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="eyebrow">
                See It In Action
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
                Professional Technique, Real Results
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                PNF stretching combines passive stretches with targeted muscle contractions
                to achieve deeper flexibility gains. Under my guidance, you'll experience
                stretches that unlock tension you didn't know you had.
              </p>
              <ul className="space-y-3">
                {["Tailored to your flexibility level", "Safe, controlled movements", "Immediate and lasting results"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-2xl border border-accent/35" />
              <img
                {...IMAGES.studio1}
                loading="lazy"
                alt="PNF stretching session"
                className="relative rounded-2xl shadow-2xl w-full ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate & Workplace Stretching */}
      <section id="corporate" className="py-20 lg:py-28 bg-gradient-to-b from-background to-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="eyebrow">
              Corporate & Workplace Wellness
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Fewer Sick Days. Better Posture.{" "}
              <span className="text-gradient accent-italic">
                A Perk Your Team Will Actually Use.
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              On-site assisted stretching and mobility sessions for office and corporate
              teams across the Gold Coast — from Bundall and Southport to Robina and
              Broadbeach. A workplace wellness investment your staff will feel the same day.
            </p>
          </div>

          {/* Pain points */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              "Neck & shoulder tension from all-day screen work",
              "Lower back pain and tight hips from sitting",
              "Afternoon fatigue, low focus and presenteeism",
              "Rising absenteeism and sick-leave costs",
            ].map((point, i) => (
              <div
                key={i}
                className="surface rounded-2xl p-5 flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-muted-foreground text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          {/* What we offer — 3 packages */}
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3">
            Office Stretching Service — Three Ways to Run It
          </h3>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Every package is delivered on-site at your workplace, or in-studio at Wicked
            Bodz in Surfers Paradise.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Clock,
                name: "“Desk Reset” Express",
                detail: "30-minute on-site express sessions",
                body: "Short, sharp resets that target the neck, shoulders, hip flexors and lower back — ideal for a lunchtime rotation through a team.",
              },
              {
                icon: Briefcase,
                name: "One-on-One On-Site",
                detail: "60-minute assisted stretching at your office",
                body: "A full PNF mobility session delivered to executives and key staff at their desks — no travel, no downtime out of the office.",
              },
              {
                icon: CalendarClock,
                name: "Recurring Wellness Program",
                detail: "Weekly or fortnightly on-site visits",
                body: "An ongoing corporate wellness program with a regular schedule — the cadence that actually shifts posture, energy and sick-leave numbers.",
              },
            ].map((pkg, i) => (
              <div
                key={i}
                className="surface rounded-2xl p-6 surface-hover group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <pkg.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-1">{pkg.name}</h4>
                <p className="text-primary text-sm font-medium mb-3">{pkg.detail}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{pkg.body}</p>
              </div>
            ))}
          </div>

          {/* Benefits + Who it's for */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            <div className="surface rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">The Return for Your Business</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Reduced absenteeism and sick-leave costs",
                  "Improved staff retention and morale",
                  "Better posture, energy and focus across the team",
                  "Measurable wellbeing ROI, not just a token perk",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <Building2 className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Who It's For</h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Assisted stretching for businesses of every size — from boutique firms to
                large floors:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Gold Coast offices",
                  "Co-working spaces",
                  "Corporate teams",
                  "Professional services firms",
                  "Call centres",
                  "SMBs with 10+ staff",
                ].map((who, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-secondary/60 border border-border rounded-full px-3 py-1.5 text-sm text-foreground"
                  >
                    <Users className="w-3.5 h-3.5 text-primary" />
                    {who}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social proof placeholder */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 text-center">
            <Quote className="w-8 h-8 text-primary/60 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto mb-4">
              Corporate client testimonial coming soon — be one of the first Gold Coast
              workplaces to bring assisted stretching to your team.
            </p>
            <p className="text-sm text-muted-foreground/60">
              Trusted by Gold Coast businesses in Bundall, Southport, Robina and Broadbeach.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={CONTACT.phoneLink}
                className="btn-primary inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full"
              >
                <Phone className="w-5 h-5" />
                Book a Free On-Site Demo
              </a>
              <a
                href="https://wa.me/61434773815?text=Hi%20Angel!%20I'd%20like%20to%20request%20your%20Corporate%20Wellness%20Guide%20for%20our%20Gold%20Coast%20team."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                Request our Corporate Wellness Guide
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4">
              Free demos for your leadership team — the fastest way to see what corporate
              stretching on the Gold Coast can do for your staff.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="eyebrow">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="surface rounded-2xl px-6 sm:px-8 py-2">
            {FAQS.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="eyebrow">
              Follow The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              {CONTACT.instagram}
            </h2>
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-amber-400 transition-colors font-medium"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex sm:grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[IMAGES.studio1, IMAGES.promo, IMAGES.heroAngel].map((img, index) => (
              <a
                key={index}
                href={CONTACT.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex-shrink-0 w-[280px] sm:w-auto aspect-square rounded-2xl overflow-hidden group snap-center ring-1 ring-white/10"
              >
                <img
                  {...img}
                  loading="lazy"
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Studio location */}
      <section id="location" className="py-20 lg:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Assisted Stretching Studio in{" "}
              <span className="text-gradient accent-italic">
                Surfers Paradise
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Studio sessions run inside {BUSINESS.venue} on Cavill Avenue, a short walk from
              the Surfers Paradise light rail station and the beach. Can&apos;t make it in? Angel
              also comes to you with mobile assisted stretching across the Gold Coast.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="surface rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                <address className="not-italic">
                  <p className="font-semibold text-lg">{BUSINESS.name}</p>
                  <p className="text-muted-foreground">{BUSINESS.venue}</p>
                  <p className="text-muted-foreground">{BUSINESS.address.streetAddress}</p>
                  <p className="text-muted-foreground">
                    {BUSINESS.address.addressLocality} {BUSINESS.address.addressRegion}{" "}
                    {BUSINESS.address.postalCode}
                  </p>
                </address>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                <a href={CONTACT.phoneLink} className="text-lg hover:text-primary transition-colors">
                  {CONTACT.phone}
                </a>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-muted-foreground">
                  {BUSINESS.hoursDisplay.map(([day, hours]) => (
                    <div key={day} className="contents">
                      <dt className="font-medium text-foreground">{day}</dt>
                      <dd>{hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href={CONTACT.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <MapPin className="w-5 h-5" />
                  Get Directions
                </a>
                <a
                  href="/areas-i-service"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  Mobile Service Areas
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border min-h-[320px] bg-card">
              <iframe
                title={`Map to ${BUSINESS.name}, ${BUSINESS.addressLine}`}
                src={CONTACT.mapEmbed}
                className="block w-full h-full min-h-[320px] border-0"
                style={{ width: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-background relative">
        <div className="relative max-w-5xl mx-auto px-4">
        <div className="relative overflow-hidden grain rounded-[2.5rem] border border-white/[0.08] px-6 py-16 sm:px-12 sm:py-20 text-center hero-bg">
        <div aria-hidden="true" className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-[radial-gradient(closest-side,hsl(var(--primary)/0.25),transparent)]" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Feel{" "}
            <span className="text-gradient accent-italic">
              Amazing
            </span>
            ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Your body will thank you. Book your assisted stretching session today
            and experience the difference professional PNF stretching can make.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <BookButton>
              Call {CONTACT.phone}
            </BookButton>
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              <Instagram className="w-5 h-5" />
              Message on Instagram
            </a>
          </div>
          <p className="text-xs text-muted-foreground/60 mb-12 text-center">
            By booking, you agree to our <a href="/disclaimer" className="underline hover:text-muted-foreground">terms & disclaimer</a>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
            <a href={CONTACT.phoneLink} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
              {CONTACT.phone}
            </a>
            <a
              href={CONTACT.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              {CONTACT.instagram}
            </a>
          </div>
        </div>
        </div>
        </div>
      </section>

      <SiteFooter ref={footerRef} />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/61434773815?text=Hi%20Angel!%20I'd%20like%20to%20book%20a%20stretching%20session."
        target="_blank"
        rel="noopener noreferrer"
        style={{ bottom: `${whatsappBottom}px` }}
        className="fixed right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

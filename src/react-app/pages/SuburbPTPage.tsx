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
} from "lucide-react";
import { unslugify } from "@/data/suburbs";
import { CONTACT } from "@/data/contact";

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

export default function SuburbPTPage() {
  const { slug = "" } = useParams();
  const suburb = unslugify(slug);

  useEffect(() => {
    if (!suburb) return;
    document.title = `Personal Training ${suburb} | Angel Fitness Gold Coast`;
    setMeta(
      "description",
      `Personal training in ${suburb} with Angel Elliott—10+ years experience. In-person sessions, online coaching, and custom programs available. Start your transformation today.`
    );

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify(buildFaqSchema(suburb));
    document.head.appendChild(ld);
    return () => {
      ld.remove();
    };
  }, [suburb]);

  if (!suburb) return <Navigate to="/areas-i-service" replace />;

  const faqs = buildFaqs(suburb);

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
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            One-on-one personal training in {suburb} with Angel Elliott—qualified trainer with a
            decade of experience helping people transform their bodies and lives. In-person on
            the Gold Coast or online anywhere in the world.
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

      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Personal Training in {suburb}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose how you train. Whether you live in {suburb} or are training remotely,
              there's an option that fits your lifestyle and goals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "In-Person Training", desc: `One-on-one sessions for clients in ${suburb} and nearby suburbs at Wicked Bodz Fitness Centre.` },
              { icon: Monitor, title: "Online Coaching", desc: "Train remotely with custom programs, video form-checks, and weekly check-ins." },
              { icon: Target, title: "Custom Programs", desc: "Confident training solo? Get a personalised program designed for your goals." },
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

      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            Why {suburb} Locals Train With Angel
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
            <p>
              Living in {suburb} means access to one of Australia's most active lifestyles—but
              real, lasting results don't come from random workouts. They come from a plan
              tailored to your body, your goals, and your schedule.
            </p>
            <p>
              With 10+ years coaching clients from Jersey to the Gold Coast, Angel brings the
              structure, accountability, and technique that turns effort into outcomes.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Programs tailored to your goals and experience",
              "Build strength, lose fat, or improve performance",
              "Weekly accountability and progress tracking",
              "Technique coaching to train safely",
              "Nutrition guidance to support training",
              "Flexibility around your schedule",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Personal Training {suburb} FAQ
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Everything you need to know about training with Angel in {suburb}.
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

      <section className="py-16 bg-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Training Locations Near {suburb}</h2>
          <p className="text-muted-foreground text-lg mb-8">
            In-person sessions are held at Wicked Bodz Fitness Centre, 45 Cavill Ave, Surfers
            Paradise—an easy drive from {suburb}. Prefer to train at home or overseas? Online
            coaching and custom programs are available worldwide.
          </p>
          <Link
            to="/personal-training"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all"
          >
            Meet Angel & See Options <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Fitness in {suburb}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get in touch today. Whether you're new to training or looking to break through a
            plateau, Angel will design a plan that works for you.
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

function buildFaqs(s: string) {
  return [
    {
      q: `Do you offer personal training in ${s}?`,
      a: `Yes. Angel coaches clients from ${s} at Wicked Bodz Fitness Centre in Surfers Paradise—a short drive from most ${s} addresses—as well as online for clients who prefer to train at home or while travelling.`,
    },
    {
      q: "How long have you been a personal trainer?",
      a: "Over 10 years. Angel has coached clients from Jersey to Australia and has helped hundreds of people build strength, lose fat, and rebuild confidence through structured training.",
    },
    {
      q: `What does personal training in ${s} include?`,
      a: `Tailored programming, one-on-one coaching, technique work, accountability check-ins, and nutrition guidance. Every plan is built around your goals, schedule, and current fitness level in ${s}.`,
    },
    {
      q: "Do you offer online coaching as well?",
      a: "Absolutely. Online clients get a custom workout program, video form reviews, weekly check-ins, and ongoing programming adjustments—no matter where in the world they are.",
    },
    {
      q: `What kind of results can I expect training in ${s}?`,
      a: "Results depend on consistency and goals, but most clients see meaningful changes in strength, body composition, and confidence within the first 4–8 weeks. Long-term clients consistently report life-changing transformations.",
    },
    {
      q: `Is personal training in ${s} suitable for beginners?`,
      a: `100%. Most of Angel's ${s} clients are beginners or returning to the gym after a long break. Every program scales to your starting point—no judgement, no ego.`,
    },
    {
      q: "Can I combine personal training with assisted stretching?",
      a: "Yes—and many clients do. Assisted PNF stretching is the perfect recovery complement to strength training, helping you stay mobile, recover faster, and reduce injury risk.",
    },
    {
      q: `How do I get started in ${s}?`,
      a: `Call ${CONTACT.phone} or DM ${CONTACT.instagram} on Instagram. Angel will run through your goals, recommend the right option (in-person, online, or program-only), and book you in for your first session.`,
    },
  ];
}

function buildFaqSchema(suburb: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: buildFaqs(suburb).map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

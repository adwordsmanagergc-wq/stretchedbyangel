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

export default function SuburbStretchPage() {
  const { slug = "" } = useParams();
  const suburb = unslugify(slug);

  useEffect(() => {
    if (!suburb) return;
    document.title = `Assisted Stretching ${suburb} | Stretched By Angel`;
    setMeta(
      "description",
      `Assisted Stretching ${suburb} — professional PNF stretching by Angel Elliott. Mobile home visits and in-studio sessions in ${suburb} and across the Gold Coast. Improve flexibility, reduce pain, book today.`
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
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Professional PNF stretching services in {suburb} to improve your flexibility,
            relieve pain, and help you move better—delivered by Angel Elliott at your home
            or at Wicked Bodz Fitness Centre.
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

      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {suburb} Stretching Sessions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the difference professional assisted stretching makes for your
              flexibility, recovery, and overall wellbeing in {suburb}.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Full Body Stretching", desc: "Targeting all major muscle groups" },
              { icon: Dumbbell, title: "PNF Technique", desc: "Advanced stretching methods" },
              { icon: Users, title: "One-on-One Sessions", desc: "Personalised attention" },
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
            Why {suburb} Locals Choose Assisted Stretching
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
            <p>
              Living in {suburb} on the Gold Coast means an active lifestyle—surfing, gym
              sessions, running, or simply enjoying the outdoors. But all that activity
              takes a toll on your body.
            </p>
            <p>
              Professional assisted stretching helps you maintain the flexibility and
              mobility you need to keep doing what you love, pain-free.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Improve flexibility faster than stretching alone",
              "Release chronic muscle tension and tightness",
              "Recover faster from workouts and training",
              "Reduce lower back, neck, and shoulder pain",
              "Prevent injuries and stay active longer",
              "Experience deep relaxation and stress relief",
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
            Stretching {suburb} FAQ
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Everything you need to know about assisted stretching services in {suburb}.
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
          <h2 className="text-3xl font-bold mb-4">Stretching Services in {suburb}</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Angel offers mobile stretching services right to your door in {suburb}. You can
            also visit Wicked Bodz Fitness Centre in Surfers Paradise for in-studio
            sessions.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all"
          >
            Meet Angel & See Prices <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-background to-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready for Professional Stretching in {suburb}?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book your first assisted stretching session in {suburb} today. Your body will
            thank you.
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
            Professional Assisted Stretching in {suburb} and the Gold Coast
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>•</span>
            <Link to="/areas-i-service" className="hover:text-primary transition-colors">Areas I Service</Link>
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

function buildFaqs(s: string) {
  return [
    {
      q: `Where can I find assisted stretching in ${s}?`,
      a: `Angel offers mobile assisted stretching directly to your home in ${s}, or you can book an in-studio session at Wicked Bodz Fitness Centre in Surfers Paradise—just a short drive from ${s}.`,
    },
    {
      q: "What is assisted stretching and how does it work?",
      a: "Assisted stretching uses PNF (Proprioceptive Neuromuscular Facilitation) techniques where a trained therapist guides your body into deeper, safer stretches than you could achieve alone. It combines passive stretching with brief isometric contractions for fast flexibility gains.",
    },
    {
      q: `How much does stretching cost in ${s}?`,
      a: `Single sessions: $60 for 30 minutes, $90 for 50 minutes in-studio, or $110 for a 50-minute home visit in ${s}. 10-session packages: $550 (30 min) or $800 (50 min), with home visits adding $20 per session.`,
    },
    {
      q: `What are the benefits of professional stretching in ${s}?`,
      a: "Increased flexibility, better range of motion, reduced muscle tension, improved recovery, injury prevention, lower back/neck/shoulder pain relief, and deep relaxation.",
    },
    {
      q: `Is assisted stretching good for athletes in ${s}?`,
      a: `Absolutely. Athletes in ${s} use assisted PNF stretching to improve performance, speed up recovery, and prevent overuse injuries. It's a perfect complement to any training program.`,
    },
    {
      q: `Can assisted stretching help with back pain in ${s}?`,
      a: "Yes. Tight hips, hamstrings, and glutes are common contributors to lower back pain. Targeted assisted stretching releases these muscles and can provide noticeable relief from the very first session.",
    },
    {
      q: `How often should I get stretched in ${s}?`,
      a: "For best results, 1–2 sessions per week. However, even a single monthly session provides noticeable relief and maintenance. Angel will recommend a schedule based on your goals and lifestyle.",
    },
    {
      q: `Do you offer mobile stretching services in ${s}?`,
      a: `Yes. Angel travels to homes throughout ${s} for 50-minute mobile sessions at $110, or $100 per session as part of a 10-pack. Just provide a quiet space and a yoga mat—Angel brings everything else.`,
    },
    {
      q: "Do I need to be flexible to start?",
      a: `Not at all. Angel works with clients across every flexibility level in ${s}—including total beginners and people recovering from injury. Every session is tailored to your body on the day.`,
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

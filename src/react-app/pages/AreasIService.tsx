import { useEffect } from "react";
import { Link } from "react-router";
import { Phone, Instagram, MapPin, Sparkles, Dumbbell, ArrowRight } from "lucide-react";
import { SUBURBS, slugify } from "@/data/suburbs";
import { CONTACT } from "@/data/contact";

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

export default function AreasIServicePage() {
  useEffect(() => {
    document.title = "Areas I Service | Stretched By Angel Gold Coast";
    setMeta(
      "description",
      "Professional personal training & assisted stretching across the entire Gold Coast. Home visits and online coaching available in 77+ suburbs."
    );
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

      <SuburbGrid
        kicker={
          <>
            <Sparkles className="w-4 h-4" /> Assisted Stretching
          </>
        }
        title={
          <>
            Stretching by{" "}
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Suburb
            </span>
          </>
        }
        subtitle="Click on your suburb to learn more about assisted stretching services in your area."
        basePath="/assisted-stretching"
        viewAllHref="/"
        viewAllLabel="View General Gold Coast Stretching Page"
      />

      <SuburbGrid
        kicker={
          <>
            <Dumbbell className="w-4 h-4" /> Personal Training
          </>
        }
        title={
          <>
            Personal Training by{" "}
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Suburb
            </span>
          </>
        }
        subtitle="Click on your suburb to learn more about personal training services in your area."
        basePath="/personal-training"
        viewAllHref="/personal-training"
        viewAllLabel="View General Personal Training Page"
        alt
      />

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
          <img src={LOGO} alt="Angel Fitness" className="h-12 w-12 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm mb-4">
            Personal Training & Assisted Stretching on the Gold Coast
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>•</span>
            <Link to="/personal-training" className="hover:text-primary transition-colors">Personal Training</Link>
            <span>•</span>
            <Link to="/" className="hover:text-primary transition-colors">Stretching</Link>
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

function SuburbGrid({
  kicker,
  title,
  subtitle,
  basePath,
  viewAllHref,
  viewAllLabel,
  alt,
}: {
  kicker: React.ReactNode;
  title: React.ReactNode;
  subtitle: string;
  basePath: string;
  viewAllHref: string;
  viewAllLabel: string;
  alt?: boolean;
}) {
  return (
    <section className={`py-20 ${alt ? "bg-card" : "bg-background"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            {kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {SUBURBS.map((name) => (
            <Link
              key={name}
              to={`${basePath}/${slugify(name)}`}
              className="px-4 py-3 rounded-xl border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-sm text-center text-foreground hover:text-primary"
            >
              {name}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to={viewAllHref}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {viewAllLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

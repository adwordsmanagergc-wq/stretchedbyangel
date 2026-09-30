/**
 * Shared site header and footer links, used on every page so crawlers and
 * visitors always get the same core navigation.
 */
import { forwardRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { Clock, Instagram, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { CONTACT } from "@/data/contact";
import { IMG } from "@/data/images";
import { BUSINESS } from "@/react-app/lib/business";

export const MAIN_NAV = [
  { to: "/", label: "Assisted Stretching" },
  { to: "/personal-training-gold-coast", label: "Personal Training" },
  { to: "/areas-i-service", label: "Areas" },
];

const FOOTER_EXTRA = [
  { to: "/pnf-stretching", label: "PNF Stretching Guide" },
  { to: "/waiver", label: "Liability Waiver" },
  { to: "/disclaimer", label: "Terms & Disclaimer" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-foreground ${
    isActive ? "text-foreground" : "text-muted-foreground"
  }`;

/**
 * Site header. `overlay` renders the home page variant: fixed, transparent
 * over the hero until `scrolled` is true.
 */
export function SiteHeader({ overlay = false, scrolled = true }: { overlay?: boolean; scrolled?: boolean }) {
  const [open, setOpen] = useState(false);
  const solid = !overlay || scrolled || open;

  return (
    <nav
      aria-label="Main"
      className={`${overlay ? "fixed top-0 left-0 right-0" : "sticky top-0"} z-50 transition-all duration-300 ${
        solid ? "bg-background/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <img {...IMG.logo} alt="Stretched By Angel" className="h-11 w-11" />
          <span className="font-display text-xl tracking-tight hidden sm:inline">Stretched By Angel</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {MAIN_NAV.map(({ to, label }) => (
            <NavLink key={to} to={to} end className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href={CONTACT.phoneLink}
            className="btn-primary inline-flex items-center gap-2 text-primary-foreground text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{CONTACT.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="md:hidden border-t border-white/[0.06] bg-background">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
          {MAIN_NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) => `py-3 border-b border-border/50 ${navLinkClass({ isActive })}`}
            >
              {label}
            </NavLink>
          ))}
          <a href={CONTACT.phoneLink} className="py-3 text-sm font-medium text-primary">
            Call {CONTACT.phone}
          </a>
        </div>
      </div>
    </nav>
  );
}

/** Footer link row: the header links plus the guide and legal pages. */
export function FooterLinks({ className = "", phone = true }: { className?: string; phone?: boolean }) {
  return (
    <nav aria-label="Footer" className={`flex items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground flex-wrap ${className}`}>
      {[...MAIN_NAV, ...FOOTER_EXTRA].map(({ to, label }) => (
        <Link key={to} to={to} className="hover:text-primary transition-colors">
          {label}
        </Link>
      ))}
      {phone && (
        <a href={CONTACT.phoneLink} className="hover:text-primary transition-colors">
          {CONTACT.phone}
        </a>
      )}
    </nav>
  );
}

/**
 * Site footer: brand, navigation, studio details and contact. `children`
 * renders above the columns (e.g. a page-specific tagline).
 */
export const SiteFooter = forwardRef<HTMLElement, { tagline?: string }>(function SiteFooter({ tagline }, ref) {
  const heading = "text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 mb-4";
  const item = "text-sm text-muted-foreground hover:text-primary transition-colors";
  return (
    <footer ref={ref} className="relative bg-card border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img {...IMG.logo} alt="Stretched By Angel" loading="lazy" className="h-12 w-12" />
              <span className="font-display text-2xl tracking-tight">Stretched By Angel</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {tagline ?? "Assisted PNF stretching and personal training on the Gold Coast with Angel Elliott."}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={CONTACT.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full surface flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CONTACT.whatsappStretch}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full surface flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={CONTACT.phoneLink}
                aria-label="Call"
                className="w-10 h-10 rounded-full surface flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <p className={heading}>Explore</p>
            <FooterLinks className="!flex-col !items-start !justify-start gap-y-3" phone={false} />
          </div>

          <div>
            <p className={heading}>Studio</p>
            <a
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${item} flex gap-2`}
            >
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>
                {BUSINESS.venue}
                <br />
                {BUSINESS.addressLine}
              </span>
            </a>
            <div className="mt-4 flex gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                {BUSINESS.hoursDisplay.map(([day, hours]) => (
                  <div key={day} className="contents">
                    <dt className="text-foreground/80">{day}</dt>
                    <dd>{hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div>
            <p className={heading}>Book</p>
            <a href={CONTACT.phoneLink} className="font-display text-2xl text-foreground hover:text-primary transition-colors">
              {CONTACT.phone}
            </a>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Call, text or WhatsApp. Studio sessions in Surfers Paradise and home visits across the Gold Coast.
            </p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-muted-foreground/70">
          <p>© {new Date().getFullYear()} Stretched By Angel. Gold Coast, Australia.</p>
          <p>
            Website by{" "}
            <a
              href="https://metatapdigital.com"
              target="_blank"
              rel="noopener"
              className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Metatap Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
});

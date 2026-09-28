/**
 * Shared site header and footer links, used on every page so crawlers and
 * visitors always get the same core navigation.
 */
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Instagram, Menu, Phone, X } from "lucide-react";
import { CONTACT } from "@/data/contact";
import { IMG } from "@/data/images";

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
  `text-sm font-medium transition-colors hover:text-primary ${
    isActive ? "text-primary" : "text-muted-foreground"
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
        solid ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <img {...IMG.logo} alt="Stretched By Angel" className="h-12 w-12" />
          <span className="font-semibold text-lg hidden sm:inline">Stretched By Angel</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
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
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 rounded-full transition-all"
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

      <div id="mobile-menu" hidden={!open} className="md:hidden border-t border-border bg-background">
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

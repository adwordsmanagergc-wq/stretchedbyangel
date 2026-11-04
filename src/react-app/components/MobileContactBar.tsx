import { Instagram, MessageSquare, Phone } from "lucide-react";
import { CONTACT } from "@/data/contact";

const SMS_HREF = `sms:+61434773815?&body=${encodeURIComponent(
  "Hi Angel, I'd like to book a session."
)}`;

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
    <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1112 20.3z" />
  </svg>
);

const btn =
  "flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-semibold tracking-wide transition-colors [-webkit-tap-highlight-color:transparent]";

/**
 * Mobile-only contact bar that floats at the bottom of the screen on every
 * page: Call (highlighted), Text, WhatsApp and Instagram. Desktop keeps the
 * round WhatsApp button instead.
 */
export default function MobileContactBar() {
  return (
    <nav
      aria-label="Contact Stretched By Angel"
      className="sm:hidden fixed inset-x-2 z-[60]"
      style={{ bottom: "calc(8px + env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-[1.35fr_1fr_1fr_1fr] gap-1 p-1.5 rounded-[22px] bg-background/90 backdrop-blur-xl border border-white/10 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.8)]">
        <a href={CONTACT.phoneLink} className={`${btn} btn-primary text-white`}>
          <Phone className="w-5 h-5" />
          <span>Call</span>
        </a>
        <a href={SMS_HREF} className={`${btn} text-foreground/90 active:bg-white/10`}>
          <MessageSquare className="w-5 h-5" />
          <span>Text</span>
        </a>
        <a
          href={CONTACT.whatsappStretch}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} text-foreground/90 active:bg-white/10`}
        >
          <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
        <a
          href={CONTACT.instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btn} text-foreground/90 active:bg-white/10`}
        >
          <Instagram className="w-5 h-5 text-primary" />
          <span>Instagram</span>
        </a>
      </div>
    </nav>
  );
}

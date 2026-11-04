import { useEffect, useState } from "react";
import { IMG, type ImageAsset } from "@/data/images";

type Slide = { img: ImageAsset; alt: string; kicker: string; title: string; detail: string };

/** Real client sessions, alternating studio and home visits. */
const SLIDES: Slide[] = [
  {
    img: IMG.heroAngel,
    alt: "Angel Elliott delivering an assisted PNF stretching session on the Gold Coast",
    kicker: "Studio session",
    title: "Surfers Paradise studio",
    detail: "30 and 60 minute sessions",
  },
  {
    img: IMG.clientQuadStretch,
    alt: "Angel Elliott giving a client an assisted quad and hip flexor stretch during a home visit",
    kicker: "Home visit",
    title: "We come to you",
    detail: "60 minute home visits across the Gold Coast",
  },
  {
    img: IMG.studio1,
    alt: "Angel Elliott stretching a client's neck and shoulders on the stretching table",
    kicker: "PNF technique",
    title: "Neck and shoulder release",
    detail: "Hands-on PNF stretching",
  },
  {
    img: IMG.clientHipStretch,
    alt: "Angel Elliott giving a client an assisted hip and glute stretch during a home visit",
    kicker: "Home visit",
    title: "Hip and glute stretch",
    detail: "Full body stretch in your own home",
  },
];

const INTERVAL_MS = 4500;

/**
 * Auto-playing hero slideshow. The first slide is the LCP image (eager,
 * high priority) and is what the prerendered HTML shows. Autoplay pauses
 * on hover or focus, and is off for people who prefer reduced motion.
 */
export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <div
      className="relative max-w-md mx-auto w-full lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-accent/35" />
      <div
        className="relative rounded-[2rem] overflow-hidden ring-1 ring-white/10 aspect-[4/5] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] bg-card"
        role="region"
        aria-roledescription="carousel"
        aria-label="Real client sessions"
      >
        {SLIDES.map((s, i) => (
          <img
            key={s.img.src}
            {...s.img}
            {...(i === 0 ? { loading: "eager" as const, fetchpriority: "high" } : { loading: "lazy" as const })}
            alt={s.alt}
            aria-hidden={i !== index}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute right-5 bottom-5 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.img.src}
              type="button"
              aria-label={`Show photo ${i + 1}: ${s.kicker}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
      <div
        aria-live="polite"
        className="absolute left-3 sm:-left-8 bottom-6 sm:bottom-8 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/10 px-5 py-4 shadow-2xl"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary font-semibold">{slide.kicker}</p>
        <p className="font-display text-lg leading-tight mt-1">{slide.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{slide.detail}</p>
      </div>
    </div>
  );
}

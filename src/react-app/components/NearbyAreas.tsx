import { Link } from "react-router";
import { ArrowRight, Compass } from "lucide-react";
import { unslugify } from "@/data/suburbs";
import { getTier1Nearby } from "@/data/suburbContent";

/**
 * "Nearby areas" block for Tier 1 suburb pages: links to nearby Tier 1
 * suburbs for the same service, the same suburb's other service, and the
 * main service page. Only indexed (Tier 1) suburbs are linked.
 */
export default function NearbyAreas({
  service,
  slug,
  suburb,
}: {
  service: "stretch" | "pt";
  slug: string;
  suburb: string;
}) {
  const isStretch = service === "stretch";
  const base = isStretch ? "/assisted-stretching" : "/personal-training";
  const label = isStretch ? "Assisted stretching" : "Personal training";
  const nearby = getTier1Nearby(slug)
    .map((s) => ({ slug: s, name: unslugify(s) }))
    .filter((n): n is { slug: string; name: NonNullable<typeof n.name> } => Boolean(n.name));

  return (
    <section className="py-16 bg-card">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Compass className="w-6 h-6 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Nearby areas</h2>
        </div>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          {isStretch
            ? `Not in ${suburb}? I also run assisted stretching sessions in these nearby suburbs:`
            : `Not in ${suburb}? I also coach clients in these nearby suburbs:`}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {nearby.map((n) => (
            <Link
              key={n.slug}
              to={`${base}/${n.slug}`}
              className="px-4 py-2 rounded-full border border-border bg-background/50 hover:border-primary hover:bg-primary/5 transition-all text-sm text-foreground hover:text-primary"
            >
              {label} {n.name}
            </Link>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 gap-4 text-sm">
          <Link
            to={isStretch ? `/personal-training/${slug}` : `/assisted-stretching/${slug}`}
            className="flex items-center justify-between gap-2 px-5 py-4 rounded-xl border border-border bg-background/50 hover:border-primary transition-all text-foreground hover:text-primary"
          >
            {isStretch ? `Personal training in ${suburb}` : `Assisted stretching in ${suburb}`}
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
          <Link
            to={isStretch ? "/" : "/personal-training-gold-coast"}
            className="flex items-center justify-between gap-2 px-5 py-4 rounded-xl border border-border bg-background/50 hover:border-primary transition-all text-foreground hover:text-primary"
          >
            {isStretch ? "Assisted stretching Gold Coast" : "Personal training Gold Coast"}
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
        <p className="text-center mt-8">
          <Link to="/areas-i-service" className="text-primary hover:underline text-sm">
            View every Gold Coast suburb I service
          </Link>
        </p>
      </div>
    </section>
  );
}

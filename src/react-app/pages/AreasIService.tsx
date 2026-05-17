import { useEffect } from "react";
import { MapPin } from "lucide-react";
import StubLayout from "@/react-app/components/StubLayout";
import { AREAS_SERVED } from "@/react-app/lib/business";

export default function AreasIServicePage() {
  useEffect(() => {
    document.title = "Areas I Service | Stretched By Angel — Gold Coast";
  }, []);

  return (
    <StubLayout
      title="Areas I Service"
      intro="Mobile assisted stretching and personal training across the Gold Coast and surrounding suburbs. Can't see your suburb? Get in touch — I may still be able to come to you."
    >
      <ul className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3">
        {AREAS_SERVED.map((area) => (
          <li
            key={area}
            className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3 text-foreground"
          >
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>{area}</span>
          </li>
        ))}
      </ul>
      <p className="pt-6">
        Home visits available across all listed suburbs for an additional fee. Studio
        sessions are held at Wicked Bodz Fitness Centre, 45 Cavill Ave, Surfers Paradise.
      </p>
    </StubLayout>
  );
}

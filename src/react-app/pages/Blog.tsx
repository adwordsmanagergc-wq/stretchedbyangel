import { useEffect } from "react";
import StubLayout from "@/react-app/components/StubLayout";

export default function BlogPage() {
  useEffect(() => {
    document.title = "Assisted Stretching Gold Coast — Blog | Stretched By Angel";
  }, []);

  return (
    <StubLayout
      title="Assisted Stretching Gold Coast"
      intro="Tips, technique guides, and behind-the-scenes from a Gold Coast stretch therapist. New posts coming soon."
    >
      <p>
        In the meantime, follow{" "}
        <a href="https://instagram.com/angelfitnessau" className="text-primary hover:underline">@angelfitnessau</a>{" "}
        on Instagram for stretch demos, client wins, and Gold Coast training content.
      </p>
    </StubLayout>
  );
}

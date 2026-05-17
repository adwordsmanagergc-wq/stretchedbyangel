import { useEffect } from "react";
import StubLayout from "@/react-app/components/StubLayout";

export default function WaiverPage() {
  useEffect(() => {
    document.title = "Liability Waiver | Stretched By Angel";
  }, []);

  return (
    <StubLayout
      title="Liability Waiver"
      intro="All clients are required to acknowledge and accept this waiver before participating in any assisted stretching or personal training session."
    >
      <h2 className="text-2xl font-semibold text-foreground">Assumption of Risk</h2>
      <p>
        I understand that participating in assisted stretching and physical training
        carries inherent risks, including but not limited to muscle strain, joint
        discomfort, and other physical injury. I voluntarily accept these risks.
      </p>

      <h2 className="text-2xl font-semibold text-foreground">Medical Clearance</h2>
      <p>
        I confirm that I am physically able to participate. I have disclosed all relevant
        medical conditions, injuries, and medications to Angel Elliott. I will obtain medical
        clearance where appropriate prior to commencing sessions.
      </p>

      <h2 className="text-2xl font-semibold text-foreground">Release of Liability</h2>
      <p>
        To the fullest extent permitted by law, I release Stretched By Angel and Angel
        Elliott from any claims, demands, or causes of action arising out of my
        participation, except where caused by gross negligence or wilful misconduct.
      </p>

      <h2 className="text-2xl font-semibold text-foreground">Acknowledgement</h2>
      <p>
        By booking and attending a session, I acknowledge that I have read, understood, and
        accepted this waiver in full.
      </p>
    </StubLayout>
  );
}

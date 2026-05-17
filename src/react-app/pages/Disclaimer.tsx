import { useEffect } from "react";
import StubLayout from "@/react-app/components/StubLayout";

export default function DisclaimerPage() {
  useEffect(() => {
    document.title = "Terms & Disclaimer | Stretched By Angel";
  }, []);

  return (
    <StubLayout
      title="Terms & Disclaimer"
      intro="Please read these terms carefully before booking a session with Stretched By Angel."
    >
      <h2 className="text-2xl font-semibold text-foreground">General</h2>
      <p>
        Stretched By Angel provides assisted stretching and personal training services. By
        booking a session you agree to the terms set out on this page. Sessions are intended
        for general wellness purposes and are not a substitute for medical advice, diagnosis
        or treatment.
      </p>

      <h2 className="text-2xl font-semibold text-foreground">Health & Safety</h2>
      <p>
        You are responsible for disclosing any injuries, medical conditions, pregnancy, or
        recent surgeries prior to your session. If you experience pain or discomfort during
        a session, please inform Angel immediately.
      </p>

      <h2 className="text-2xl font-semibold text-foreground">Cancellations</h2>
      <p>
        Please provide at least 24 hours notice to reschedule or cancel a booking. Late
        cancellations or no-shows may be charged at the full session rate.
      </p>

      <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
      <p>
        Questions about these terms? Call 0434 773 815 or message{" "}
        <a href="https://instagram.com/angelfitnessau" className="text-primary hover:underline">@angelfitnessau</a>.
      </p>
    </StubLayout>
  );
}

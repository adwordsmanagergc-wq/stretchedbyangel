import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, AlertCircle, ArrowLeft, Download } from "lucide-react";

const LOGO_URL =
  "https://019cb84d-8ead-73c3-a40b-714550aaa6fe.mochausercontent.com/stretched-by-angel-transparent.png";

const HEALTH_QUESTIONS = [
  "Heart condition requiring restricted activity?",
  "Chest pain during exercise?",
  "Chest pain in last 4 weeks (not exercising)?",
  "Dizziness or loss of balance?",
  "Injury that may worsen with exercise/stretching?",
  "High blood pressure/heart condition with medication?",
  "69+ and not active?",
  "Insulin dependent diabetes?",
  "Pregnant or possibly pregnant?",
  "Any other reason to avoid exercise?",
];

export default function WaiverPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    answers: Array(10).fill(null) as (boolean | null)[],
    acceptRisk: false,
    acceptConsent: false,
    acceptNonMedical: false,
    acceptLiability: false,
    acceptDeclaration: false,
    signature: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Liability Waiver | Stretched By Angel";
  }, []);

  const handleAnswerChange = (index: number, value: boolean) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({ ...formData, answers: newAnswers });
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.dateOfBirth !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.answers.every((a) => a !== null) &&
      formData.acceptRisk &&
      formData.acceptConsent &&
      formData.acceptNonMedical &&
      formData.acceptLiability &&
      formData.acceptDeclaration &&
      formData.signature.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          questions: HEALTH_QUESTIONS,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error || "Failed to submit waiver");
        setSubmitStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasYesAnswers = formData.answers.some((a) => a === true);

  const handleDownload = async () => {
    const { downloadWaiverPdf } = await import("@/react-app/lib/waiverPdf");
    downloadWaiverPdf(
      {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        answers: formData.answers,
        acceptRisk: formData.acceptRisk,
        acceptConsent: formData.acceptConsent,
        acceptNonMedical: formData.acceptNonMedical,
        acceptLiability: formData.acceptLiability,
        acceptDeclaration: formData.acceptDeclaration,
        signature: formData.signature,
      },
      HEALTH_QUESTIONS
    );
  };

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Waiver Submitted</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for completing the Client Intake & Liability Waiver. A copy has been
            emailed to you and Angel. Download a PDF copy for your records below.
          </p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-full hover:from-pink-400 hover:to-rose-300 transition-all duration-300 shadow-lg shadow-pink-500/25 mb-6"
          >
            <Download className="w-5 h-5" />
            Download Your Copy (PDF)
          </button>
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={LOGO_URL} alt="Stretched By Angel" className="h-24 w-24 mx-auto mb-4" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
            ANGEL FITNESS & STRETCHED BY ANGEL
          </h1>
          <p className="text-lg text-muted-foreground">
            Client Intake & Liability Waiver
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">DOB *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>

          {/* Health Screening (PAR-Q) */}
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Health Screening (PAR-Q)</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Answer YES or NO. If YES to any, medical clearance may be required.
            </p>
            <div className="space-y-4">
              {HEALTH_QUESTIONS.map((question, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="text-sm text-foreground flex-1">{question}</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.answers[index] === true}
                        onChange={() => handleAnswerChange(index, true)}
                        className="w-5 h-5 text-primary focus:ring-primary rounded"
                      />
                      <span className="text-sm text-foreground">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.answers[index] === false}
                        onChange={() => handleAnswerChange(index, false)}
                        className="w-5 h-5 text-primary focus:ring-primary rounded"
                      />
                      <span className="text-sm text-foreground">No</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Advice Warning */}
          {hasYesAnswers && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 sm:p-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-500 mb-1">Medical Clearance May Be Required</p>
                <p className="text-sm text-muted-foreground">
                  Based on your answers, you may need to seek medical advice from your GP before participating.
                </p>
              </div>
            </div>
          )}

          {/* Services */}
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Services</h2>
            <p className="text-sm text-muted-foreground">
              Personal training and assisted stretching sessions.
            </p>
          </div>

          {/* Acknowledgements */}
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4">
            {/* Risk */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-2">Risk</h3>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptRisk}
                  onChange={(e) => setFormData({ ...formData, acceptRisk: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-primary focus:ring-primary rounded"
                />
                <span className="text-sm text-foreground">
                  I accept risks including soreness, injury, or aggravation of conditions. *
                </span>
              </label>
            </div>

            {/* Consent */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-2">Consent</h3>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptConsent}
                  onChange={(e) => setFormData({ ...formData, acceptConsent: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-primary focus:ring-primary rounded"
                />
                <span className="text-sm text-foreground">
                  I consent to hands-on assisted stretching. *
                </span>
              </label>
            </div>

            {/* Non-medical */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-2">Non-medical</h3>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptNonMedical}
                  onChange={(e) => setFormData({ ...formData, acceptNonMedical: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-primary focus:ring-primary rounded"
                />
                <span className="text-sm text-foreground">
                  I understand this is not a substitute for medical advice. *
                </span>
              </label>
            </div>

            {/* Liability Waiver */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-2">Liability Waiver</h3>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptLiability}
                  onChange={(e) => setFormData({ ...formData, acceptLiability: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-primary focus:ring-primary rounded"
                />
                <span className="text-sm text-foreground">
                  I release Angel Fitness & Stretched by Angel from liability. *
                </span>
              </label>
            </div>
          </div>

          {/* Declaration */}
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Declaration</h2>
            <label className="flex items-start gap-3 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={formData.acceptDeclaration}
                onChange={(e) => setFormData({ ...formData, acceptDeclaration: e.target.checked })}
                className="w-5 h-5 mt-0.5 text-primary focus:ring-primary rounded"
              />
              <span className="text-sm text-foreground">
                I confirm all info is accurate and agree to this waiver. *
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Signature (Type Full Name) *</label>
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                  placeholder="Type your full name as signature"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString("en-AU")}
                  readOnly
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center space-y-3">
              <p className="text-sm text-red-400">{errorMessage}</p>
              {isFormValid() && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 text-sm text-foreground border border-border rounded-full px-4 py-2 hover:bg-secondary transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download a PDF copy
                </button>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold px-8 py-4 rounded-full hover:from-pink-400 hover:to-rose-300 transition-all duration-300 shadow-lg shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Waiver"}
          </button>

          {/* Back Link */}
          <div className="text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

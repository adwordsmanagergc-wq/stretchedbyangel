import jsPDF from "jspdf";

export type WaiverFormData = {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  answers: (boolean | null)[];
  acceptRisk: boolean;
  acceptConsent: boolean;
  acceptNonMedical: boolean;
  acceptLiability: boolean;
  acceptDeclaration: boolean;
  signature: string;
};

const ACK_LABELS: Array<[keyof WaiverFormData, string]> = [
  ["acceptRisk", "Accepts risks (soreness, injury, aggravation of conditions)"],
  ["acceptConsent", "Consents to hands-on assisted stretching"],
  ["acceptNonMedical", "Understands service is not a substitute for medical advice"],
  ["acceptLiability", "Releases Angel Fitness & Stretched By Angel from liability"],
  ["acceptDeclaration", "Declares all information accurate and agrees to waiver"],
];

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;

function formatAuDate(value: string): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatAuDateTime(d: Date): string {
  return d.toLocaleString("en-AU", {
    timeZone: "Australia/Brisbane",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function generateWaiverPdf(
  data: WaiverFormData,
  questions: string[]
): { doc: jsPDF; filename: string } {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const submittedAt = new Date();
  let y = MARGIN;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("ANGEL FITNESS & STRETCHED BY ANGEL", PAGE_W / 2, y, { align: "center" });
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(90);
  doc.text("Client Intake & Liability Waiver", PAGE_W / 2, y, { align: "center" });
  y += 5;
  doc.setFontSize(9);
  doc.text(`Submitted ${formatAuDateTime(submittedAt)} (Brisbane time)`, PAGE_W / 2, y, {
    align: "center",
  });
  doc.setTextColor(0);

  y += 5;
  doc.setDrawColor(180);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  // Personal Details
  y = drawSection(doc, "Personal Details", y);
  y = drawKeyValue(doc, "Full Name", data.fullName, y);
  y = drawKeyValue(doc, "Date of Birth", formatAuDate(data.dateOfBirth), y);
  y = drawKeyValue(doc, "Email", data.email, y);
  y = drawKeyValue(doc, "Phone", data.phone, y);
  y += 4;

  // PAR-Q Health Screening
  y = drawSection(doc, "Health Screening (PAR-Q)", y);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  questions.forEach((q, i) => {
    y = ensureSpace(doc, y, 10);
    const answer = data.answers[i];
    const answerLabel = answer === true ? "YES" : answer === false ? "NO" : "—";
    const lines = doc.splitTextToSize(`${i + 1}. ${q}`, CONTENT_W - 25) as string[];

    doc.setTextColor(0);
    doc.text(lines, MARGIN, y);

    if (answer === true) doc.setTextColor(180, 40, 40);
    else if (answer === false) doc.setTextColor(40, 130, 60);
    else doc.setTextColor(120);
    doc.setFont("helvetica", "bold");
    doc.text(answerLabel, PAGE_W - MARGIN, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);

    y += lines.length * 4.5 + 1.5;
  });
  y += 3;

  // Medical clearance flag
  if (data.answers.some((a) => a === true)) {
    y = ensureSpace(doc, y, 14);
    doc.setFillColor(255, 247, 220);
    doc.setDrawColor(230, 180, 60);
    doc.roundedRect(MARGIN, y, CONTENT_W, 11, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(150, 100, 0);
    doc.text("Medical clearance flag:", MARGIN + 3, y + 4.5);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Client answered YES to one or more PAR-Q questions. Medical advice may be required.",
      MARGIN + 3,
      y + 8.5
    );
    doc.setTextColor(0);
    y += 16;
  }

  // Acknowledgements
  y = drawSection(doc, "Acknowledgements", y);
  doc.setFontSize(10);
  ACK_LABELS.forEach(([key, label]) => {
    y = ensureSpace(doc, y, 8);
    const checked = Boolean(data[key]);
    doc.setDrawColor(80);
    doc.setFillColor(checked ? 220 : 255, checked ? 245 : 255, checked ? 220 : 255);
    doc.roundedRect(MARGIN, y - 3.5, 4.5, 4.5, 0.6, 0.6, "FD");
    if (checked) {
      doc.setDrawColor(20, 110, 50);
      doc.setLineWidth(0.5);
      doc.line(MARGIN + 0.8, y - 1.4, MARGIN + 2, y - 0.2);
      doc.line(MARGIN + 2, y - 0.2, MARGIN + 3.9, y - 2.8);
      doc.setLineWidth(0.2);
    }
    const lines = doc.splitTextToSize(label, CONTENT_W - 8) as string[];
    doc.text(lines, MARGIN + 7, y);
    y += lines.length * 4.5 + 1.5;
  });
  y += 4;

  // Signature
  y = drawSection(doc, "Signature", y);
  y = drawKeyValue(doc, "Signed", data.signature, y);
  y = drawKeyValue(doc, "Date", formatAuDateTime(submittedAt), y);

  // Footer
  const footerY = PAGE_H - MARGIN;
  doc.setDrawColor(200);
  doc.line(MARGIN, footerY - 6, PAGE_W - MARGIN, footerY - 6);
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    "Stretched By Angel · 0434 773 815 · angelfitnessjsyci@icloud.com · stretchedbyangel.com",
    PAGE_W / 2,
    footerY - 1.5,
    { align: "center" }
  );

  const safeName = (data.fullName || "client").replace(/[^a-zA-Z0-9-]+/g, "-");
  const dateStamp = submittedAt.toISOString().slice(0, 10);
  const filename = `Waiver-${safeName}-${dateStamp}.pdf`;

  return { doc, filename };
}

function drawSection(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(title, MARGIN, y);
  doc.setDrawColor(220);
  doc.line(MARGIN, y + 1.5, PAGE_W - MARGIN, y + 1.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  return y + 6;
}

function drawKeyValue(doc: jsPDF, key: string, value: string, y: number): number {
  y = ensureSpace(doc, y, 7);
  doc.setTextColor(110);
  doc.text(key, MARGIN, y);
  doc.setTextColor(0);
  const lines = doc.splitTextToSize(value || "—", CONTENT_W - 45) as string[];
  doc.text(lines, MARGIN + 45, y);
  return y + Math.max(5, lines.length * 5);
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_H - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

export function downloadWaiverPdf(data: WaiverFormData, questions: string[]): void {
  const { doc, filename } = generateWaiverPdf(data, questions);
  doc.save(filename);
}

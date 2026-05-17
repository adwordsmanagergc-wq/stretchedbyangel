import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const TO_EMAIL = "angelfitnessjsyci@icloud.com";
const FROM_EMAIL =
  process.env.WAIVER_FROM_EMAIL || "Stretched By Angel <waivers@stretchedbyangel.com>";

type Payload = {
  fullName?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  answers?: (boolean | null)[];
  questions?: string[];
  acceptRisk?: boolean;
  acceptConsent?: boolean;
  acceptNonMedical?: boolean;
  acceptLiability?: boolean;
  acceptDeclaration?: boolean;
  signature?: string;
  submittedAt?: string;
};

function esc(s: string | undefined | null): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(d: Payload): string {
  const submittedAt = d.submittedAt ? new Date(d.submittedAt) : new Date();
  const submittedLabel = submittedAt.toLocaleString("en-AU", {
    timeZone: "Australia/Brisbane",
    dateStyle: "full",
    timeStyle: "short",
  });

  const questions = d.questions ?? [];
  const answers = d.answers ?? [];
  const hasYes = answers.some((a) => a === true);

  const qaRows = questions
    .map((q, i) => {
      const a = answers[i];
      const label = a === true ? "YES" : a === false ? "NO" : "—";
      const color = a === true ? "#dc2626" : a === false ? "#16a34a" : "#6b7280";
      return `<tr>
        <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:14px;">${esc(q)}</td>
        <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;color:${color};text-align:center;width:60px;">${label}</td>
      </tr>`;
    })
    .join("");

  const ack = (label: string, ok: boolean | undefined) =>
    `<li style="padding:4px 0;">${ok ? "✅" : "❌"} ${esc(label)}</li>`;

  return `<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;margin:0;padding:24px;color:#111827;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e7eb;">
    <h1 style="margin:0 0 4px;font-size:20px;">New Liability Waiver Submitted</h1>
    <p style="margin:0 0 20px;color:#6b7280;font-size:14px;">${esc(submittedLabel)} (Brisbane time)</p>

    ${hasYes ? `<div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;margin-bottom:20px;color:#92400e;font-size:14px;">
      <strong>⚠ Medical clearance flag:</strong> Client answered YES to one or more PAR-Q questions.
    </div>` : ""}

    <h2 style="margin:24px 0 8px;font-size:16px;border-bottom:1px solid #e5e7eb;padding-bottom:4px;">Personal Details</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;color:#6b7280;width:120px;">Full Name</td><td style="padding:6px 0;font-weight:600;">${esc(d.fullName)}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Date of Birth</td><td style="padding:6px 0;">${esc(d.dateOfBirth)}</td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(d.email)}" style="color:#db2777;">${esc(d.email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;"><a href="tel:${esc(d.phone)}" style="color:#db2777;">${esc(d.phone)}</a></td></tr>
    </table>

    <h2 style="margin:24px 0 8px;font-size:16px;border-bottom:1px solid #e5e7eb;padding-bottom:4px;">PAR-Q Health Screening</h2>
    <table style="width:100%;border-collapse:collapse;">${qaRows}</table>

    <h2 style="margin:24px 0 8px;font-size:16px;border-bottom:1px solid #e5e7eb;padding-bottom:4px;">Acknowledgements</h2>
    <ul style="padding-left:20px;margin:8px 0;font-size:14px;">
      ${ack("Accepts risks (soreness, injury, aggravation)", d.acceptRisk)}
      ${ack("Consents to hands-on assisted stretching", d.acceptConsent)}
      ${ack("Understands service is not a substitute for medical advice", d.acceptNonMedical)}
      ${ack("Releases Angel Fitness & Stretched By Angel from liability", d.acceptLiability)}
      ${ack("Declares all information accurate and agrees to waiver", d.acceptDeclaration)}
    </ul>

    <h2 style="margin:24px 0 8px;font-size:16px;border-bottom:1px solid #e5e7eb;padding-bottom:4px;">Signature</h2>
    <p style="margin:8px 0;font-size:14px;"><strong>Signed:</strong> ${esc(d.signature)}</p>
    <p style="margin:8px 0;font-size:14px;color:#6b7280;">Submitted electronically on ${esc(submittedLabel)}</p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="font-size:12px;color:#9ca3af;margin:0;">This is an automated message from the Stretched By Angel waiver form. Reply directly to email the client back.</p>
  </div>
</body></html>`;
}

function buildText(d: Payload): string {
  const submittedAt = d.submittedAt ? new Date(d.submittedAt) : new Date();
  const submittedLabel = submittedAt.toLocaleString("en-AU", {
    timeZone: "Australia/Brisbane",
    dateStyle: "full",
    timeStyle: "short",
  });
  const questions = d.questions ?? [];
  const answers = d.answers ?? [];

  const qa = questions
    .map((q, i) => {
      const a = answers[i];
      return `  ${a === true ? "[YES]" : a === false ? "[NO ]" : "[ - ]"} ${q}`;
    })
    .join("\n");

  return `NEW LIABILITY WAIVER SUBMITTED
${submittedLabel} (Brisbane time)

PERSONAL DETAILS
  Full Name:      ${d.fullName}
  Date of Birth:  ${d.dateOfBirth}
  Email:          ${d.email}
  Phone:          ${d.phone}

PAR-Q HEALTH SCREENING
${qa}

ACKNOWLEDGEMENTS
  ${d.acceptRisk ? "[x]" : "[ ]"} Accepts risks (soreness, injury, aggravation)
  ${d.acceptConsent ? "[x]" : "[ ]"} Consents to hands-on assisted stretching
  ${d.acceptNonMedical ? "[x]" : "[ ]"} Understands service is not a substitute for medical advice
  ${d.acceptLiability ? "[x]" : "[ ]"} Releases Angel Fitness from liability
  ${d.acceptDeclaration ? "[x]" : "[ ]"} Declares all information accurate

SIGNATURE
  Signed: ${d.signature}
  Submitted electronically on ${submittedLabel}
`;
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable");
    return res
      .status(500)
      .json({ error: "Email service is not configured. Please contact Angel directly." });
  }

  const data = (req.body ?? {}) as Payload;

  if (
    !data.fullName?.trim() ||
    !data.dateOfBirth ||
    !data.email?.trim() ||
    !data.phone?.trim() ||
    !data.signature?.trim() ||
    !Array.isArray(data.answers) ||
    data.answers.length !== 10 ||
    data.answers.some((a) => a === null || a === undefined) ||
    !data.acceptRisk ||
    !data.acceptConsent ||
    !data.acceptNonMedical ||
    !data.acceptLiability ||
    !data.acceptDeclaration
  ) {
    return res.status(400).json({ error: "Form is incomplete." });
  }

  if (!isValidEmail(data.email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const resend = new Resend(apiKey);
  const subject = `Waiver — ${data.fullName} (${new Date().toLocaleDateString("en-AU")})`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      cc: [data.email],
      replyTo: data.email,
      subject,
      html: buildHtml(data),
      text: buildText(data),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Failed to send waiver email." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Waiver handler error:", err);
    return res.status(500).json({ error: "Unexpected error sending waiver." });
  }
}

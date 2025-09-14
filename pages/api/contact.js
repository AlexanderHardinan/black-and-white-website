// pages/api/contact.js
export const config = { api: { bodyParser: { sizeLimit: "1mb" } } };

const isEmail = (v = "") => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
const CONTACT_TO = process.env.CONTACT_TO || "blackchef.alex@gmail.com";
const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev"; // safe default

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, message, botcheck } = req.body || {};

  // Basic validations + spam trap
  if (botcheck) return res.status(400).json({ ok: false, error: "Spam detected" });
  if (!name || !email || !message) return res.status(400).json({ ok: false, error: "Missing fields" });
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email" });
  if (String(message).length > 5000) return res.status(413).json({ ok: false, error: "Message too long" });

  // If no key, don't crash in dev; just acknowledge
  if (!process.env.RESEND_API_KEY) {
    console.log("CONTACT_SUBMISSION (no RESEND_API_KEY):", {
      to: CONTACT_TO, from: EMAIL_FROM, name, email, len: String(message).length, ts: new Date().toISOString(),
    });
    return res.status(200).json({ ok: true, emailed: false, reason: "NO_API_KEY" });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: EMAIL_FROM,          // keep this value unless you've verified your own domain in Resend
      to: CONTACT_TO,
      reply_to: email,
      subject: `New message from ${name}`,
      html: `
        <h2 style="margin:0 0 8px">New Contact Submission</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;font-family:Inter,ui-sans-serif,system-ui">${escapeHtml(message)}</pre>
      `,
    });

    // Log only non-sensitive result info
    if (result?.data?.id) console.log("CONTACT_EMAIL_SENT", { id: result.data.id });

    if (result?.error) {
      console.error("CONTACT_EMAIL_ERROR", String(result.error));
      return res.status(200).json({ ok: true, emailed: false, reason: String(result.error) });
    }

    return res.status(200).json({ ok: true, emailed: true, id: result?.data?.id || null });
  } catch (e) {
    console.error("CONTACT_EMAIL_EXCEPTION", e?.message || e);
    return res.status(200).json({ ok: true, emailed: false, reason: "EXCEPTION" });
  }
}

function escapeHtml(s = "") {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// pages/api/contact.js
export const config = { api: { bodyParser: { sizeLimit: "1mb" } } };
const isEmail = (v = "") => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

const CONTACT_TO = process.env.CONTACT_TO || "blackchef.alex@gmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, message, botcheck } = req.body || {};

  if (botcheck) return res.status(400).json({ ok: false, error: "Spam detected" });
  if (!name || !email || !message) return res.status(400).json({ ok: false, error: "Missing fields" });
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email" });
  if (String(message).length > 5000) return res.status(413).json({ ok: false, error: "Message too long" });

  // If RESEND_API_KEY is missing, just log & succeed (so dev still works)
  if (!process.env.RESEND_API_KEY) {
    console.log("CONTACT_SUBMISSION (no RESEND_API_KEY, logged only):", {
      to: CONTACT_TO, name, email, message, ts: new Date().toISOString(),
    });
    return res.status(200).json({ ok: true, dev: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "contact@your-domain.dev", // or a verified Resend domain/sender
      to: CONTACT_TO,
      reply_to: email,
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;font-family:Inter,ui-sans-serif,system-ui">${escapeHtml(message)}</pre>
      `,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("EMAIL_SEND_ERROR", e);
    // still return ok so user isn't blocked
    return res.status(200).json({ ok: true, emailed: false });
  }
}

function escapeHtml(s = "") {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

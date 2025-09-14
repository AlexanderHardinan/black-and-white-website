// components/ContactWidget.js
import { useState } from "react";

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({ name: "", email: "", message: "", botcheck: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (data?.ok && data?.emailed) {
        setStatus("success");
        setTimeout(() => { setOpen(false); setStatus("idle"); setForm({ name:"", email:"", message:"", botcheck:"" }); }, 1500);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 1500);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 rounded-full px-4 py-3 bg-[var(--gold)] text-black font-semibold shadow-lg hover:shadow-xl transition"
        aria-label="Contact Us"
      >
        {/* message icon (inline svg) */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:-translate-y-0.5">
          <path d="M4 6h16v10H7l-3 3V6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Contact Us</span>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[92vw] max-w-md rounded-2xl border border-white/10 bg-black/80 text-white shadow-2xl transition-all ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-wide">Send us a message</h3>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white" aria-label="Close">✕</button>
          </div>

          <form onSubmit={submit} className="mt-4 grid gap-3">
            <input
              name="name"
              placeholder="Your name"
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold)]"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold)]"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <textarea
              name="message"
              placeholder="How can we help?"
              rows={4}
              className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold)]"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            {/* honeypot (hidden) */}
            <input
              type="text"
              name="botcheck"
              value={form.botcheck}
              onChange={(e) => setForm({ ...form, botcheck: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 inline-flex items-center justify-center rounded-lg bg-[var(--gold)] px-4 py-2 font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : status === "success" ? "Sent ✓" : status === "error" ? "Try again" : "Send message"}
            </button>

            <p className={`text-sm ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-white/60"}`}>
              {status === "success"
                ? "Your message was sent!"
                : status === "error"
                ? "We couldn’t send your message. Please try again."
                : "We’ll reply to your email soon."}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

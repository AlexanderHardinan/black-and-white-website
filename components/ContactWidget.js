// components/ContactWidget.js
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // simple mount signal (check dev console)
  useEffect(() => { console.log("ContactWidget mounted"); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.message) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setOk(res.ok);
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setOk(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[999] group flex items-center gap-2 rounded-full bg-black text-white px-4 py-3 shadow-xl border border-white/15 hover:text-[var(--gold)]"
        aria-label="Contact Us"
        data-testid="contact-fab"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4V6Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        <span className="font-medium">Contact Us</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[998] bg-black/60"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setOk(false); setOpen(false); }}
            />
            <motion.div
              className="fixed inset-0 z-[1000] grid place-items-center p-4"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              role="dialog" aria-modal="true" aria-label="Contact form"
            >
              <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[var(--bg)] text-[var(--fg)] shadow-2xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <h3 className="font-semibold tracking-wide">Contact Us</h3>
                  <button
                    onClick={() => { setOk(false); setOpen(false); }}
                    className="rounded-md px-3 py-1.5 hover:bg-black/5"
                    aria-label="Close"
                  >✕</button>
                </div>

                <div className="p-5">
                  {ok ? (
                    <div className="rounded-lg border border-white/15 bg-black/5 p-4 text-sm">
                      Thanks! Your message was sent. We’ll get back to you soon.
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="grid gap-3">
                      <input type="text" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" onChange={() => {}} />
                      <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input
                          className="w-full rounded-lg border border-white/15 bg-black/5 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold)]"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                          type="email"
                          className="w-full rounded-lg border border-white/15 bg-black/5 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold)]"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Message</label>
                        <textarea
                          rows={5}
                          className="w-full rounded-lg border border-white/15 bg-black/5 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold)]"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => { setOk(false); setOpen(false); }}
                          className="btn-ghost border px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={sending}
                          className="btn-primary px-4 py-2 rounded-lg"
                        >
                          {sending ? "Sending…" : "Send message"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

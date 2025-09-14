import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 240, damping: 22 } },
  exit: { opacity: 0, y: 12, scale: 0.98 },
};

export default function ContactWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "", botcheck: "" });

  useEffect(() => {
    // let the button softly fade/slide in after mount
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.message) {
      setErr("Please complete all fields with a valid email.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to send");
      }
      setOk(true);
      setForm({ name: "", email: "", message: "", botcheck: "" });
    } catch (e) {
      setErr(e.message || "Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating FAB */}
      <AnimatePresence>
        {mounted && !open && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] group flex items-center gap-2 rounded-full bg-black text-white px-4 py-3 shadow-xl border border-white/15"
            aria-label="Contact Us"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Message icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4V6Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span className="font-medium">Contact Us</span>
            {/* subtle shine */}
            <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
              <motion.span
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.5 }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[9998] bg-black/60"
              variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              onClick={() => { setOk(false); setErr(""); setOpen(false); }}
            />
            <motion.div
              key="panel"
              className="fixed inset-0 z-[10000] grid place-items-center p-4"
              initial="hidden" animate="visible" exit="exit" variants={panelVariants}
              role="dialog" aria-modal="true" aria-label="Contact form"
            >
              <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[var(--bg)] text-[var(--fg)] shadow-2xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <h3 className="font-semibold tracking-wide">Contact Us</h3>
                  <button
                    onClick={() => { setOk(false); setErr(""); setOpen(false); }}
                    className="rounded-md px-3 py-1.5 hover:bg-black/5"
                    aria-label="Close"
                  >✕</button>
                </div>

                <div className="p-5">
                  {ok ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-white/15 bg-black/5 p-4 text-sm"
                    >
                      Thanks! Your message was sent. We’ll get back to you soon.
                    </motion.div>
                  ) : (
                    <form onSubmit={onSubmit} className="grid gap-3">
                      {/* honeypot */}
                      <input
                        type="text" name="botcheck" autoComplete="off"
                        className="hidden" tabIndex={-1} aria-hidden="true"
                        value={form.botcheck} onChange={(e)=>setForm({...form, botcheck:e.target.value})}
                      />
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

                      {err && (
                        <div className="text-sm text-red-400">{err}</div>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => { setOk(false); setErr(""); setOpen(false); }}
                          className="btn-ghost border px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                        <motion.button
                          type="submit"
                          disabled={sending}
                          className="btn-primary px-4 py-2 rounded-lg"
                          whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                        >
                          {sending ? "Sending…" : "Send message"}
                        </motion.button>
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

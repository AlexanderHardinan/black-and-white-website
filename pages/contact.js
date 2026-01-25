// pages/contact.js
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
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
        setForm({ name: "", email: "", message: "", botcheck: "" });
        setTimeout(() => setStatus("idle"), 1600);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 1600);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1600);
    }
  };

  return (
    <>
      <Head>
        <title>Contact | The Culinary World Gazette</title>
        <meta
          name="description"
          content="Suggest a destination, share a story lead, or contact the Gazette editorial desk."
        />
      </Head>

      {/* Sticky header */}
      <header className="border-b border-white/10 bg-[var(--bg)]/70 backdrop-blur sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-white/80 hover:text-[var(--gold)] transition"
          >
            ← Home
          </Link>
          <div className="text-sm text-white/60 tracking-widest uppercase">Contact</div>
        </div>
      </header>

      <main className="container py-10 sm:py-12 text-white">
        {/* Page header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full">
            Editorial Desk
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Contact the <span className="text-[var(--gold)]">Gazette</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Suggest a destination, nominate a restaurant, or share a story lead. The Gazette reviews
            submissions with care and replies by email.
          </p>
        </motion.div>

        {/* Content shell */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="rounded-3xl border border-white/12 bg-white/5 backdrop-blur overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        >
          <div className="px-5 sm:px-7 py-5 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="text-xs text-white/60 tracking-widest uppercase">Send a Message</div>
            <div className="text-xs text-white/60">Suggestions welcome</div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              {/* Left: Form */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-5 sm:p-6">
                <form onSubmit={submit} className="grid gap-3">
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
                    placeholder="Suggest a destination (city + restaurant), or share your story lead…"
                    rows={6}
                    className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />

                  {/* honeypot */}
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
                    {status === "sending"
                      ? "Sending…"
                      : status === "success"
                      ? "Sent ✓"
                      : status === "error"
                      ? "Try again"
                      : "Send message"}
                  </button>

                  <p
                    className={`text-sm ${
                      status === "success"
                        ? "text-green-400"
                        : status === "error"
                        ? "text-red-400"
                        : "text-white/60"
                    }`}
                  >
                    {status === "success"
                      ? "Message received. The Gazette will reply by email."
                      : status === "error"
                      ? "We couldn’t send your message. Please try again."
                      : "Editorial replies are sent to your email."}
                  </p>
                </form>
              </div>

              {/* Right: Editorial note */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-5 sm:p-6">
                  <div className="text-xs text-white/60 tracking-widest uppercase">
                    What to include
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-white/75 leading-relaxed">
                    <div className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Destination:</span> city, country,
                        and neighborhood.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Why it matters:</span> what makes
                        it exceptional (craft, heritage, view, story).
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Links:</span> official site or
                        map pin if available.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-5 sm:p-6">
                  <div className="text-xs text-white/60 tracking-widest uppercase">Quick paths</div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/top-restaurants"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                    >
                      Top Restaurants <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href="/top-chefs"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                    >
                      Top Chefs <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 text-[11px] text-white/50">
              This page matches the Gazette’s dark/glass editorial language.
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}

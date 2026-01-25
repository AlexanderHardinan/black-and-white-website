// pages/top-chefs.js
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const chefs = [
  {
    name: "Chef Alan Coxon",
    role: "Consultant, Innovator, Global Ambassador",
    blurb:
      "Chef Alan Coxon is more than a chef — he’s a storyteller, innovator, and global culinary ambassador.",
    img: "/images/coxon.png?v=2",
  },
  {
    name: "Chef Alexander Hardinan",
    role: "Executive Chef — The Globe’s Heritage by Chef Alex - Pattaya",
    blurb: "Transforms simple and forgotten ingredients into refined, modern craftsmanship.",
    img: "/images/chefalex.png?v=2",
  },
  {
    name: "Chef Pam (Pichaya Soontornyanakij)",
    role: "Chef-Owner — Potong, Bangkok",
    blurb:
      "Known as Thailand’s rising culinary star, Chef Pam blends Thai-Chinese heritage with bold innovation, leading Restaurant Potong into Asia’s dining spotlight.",
    img: "/images/chefpam.png?v=2",
  },
  {
    name: "Chef Hélène Darroze",
    role: "Chef Patron — Paris & London",
    blurb:
      "A fourth-generation chef, known for her heartfelt French cuisine at restaurants including Hélène Darroze at The Connaught (three Michelin stars).",
    img: "/images/chefhelene.png?v=2",
  },
  {
    name: "Chef Massimo Bottura",
    role: "Osteria Francescana — Italy",
    blurb: "A pioneer of modern Italian cuisine, mixing art, memory, and flavor.",
    img: "/images/chefbottura.png?v=2",
  },
  {
    name: "Chef Dominique Crenn",
    role: "Atelier Crenn — San Francisco",
    blurb: "The first female chef in the US with three Michelin stars.",
    img: "/images/chefcrenn.png?v=2",
  },
  {
    name: "Chef René Redzepi",
    role: "Noma — Copenhagen",
    blurb: "Leader of New Nordic cuisine, showcasing local and foraged ingredients.",
    img: "/images/chefrenezep.png?v=2",
  },
  {
    name: "Chef José Andrés",
    role: "World Central Kitchen — USA",
    blurb: "Spanish-American chef, restaurateur, and humanitarian.",
    img: "/images/chefandres.png?v=2",
  },
  {
    name: "Chef Anne-Sophie Pic",
    role: "Maison Pic — France",
    blurb: "France’s most decorated female chef, renowned for elegance and finesse.",
    img: "/images/chefpic.png?v=2",
  },
  {
    name: "Chef Gaggan Anand",
    role: "Gaggan Anand — Bangkok",
    blurb: "Revolutionary Indian cuisine with playful storytelling.",
    img: "/images/chefgaggan.png?v=2",
  },
  {
    name: "Chef Clare Smyth",
    role: "Core — London",
    blurb: "The first female British chef with three Michelin stars.",
    img: "/images/chefclare.png?v=2",
  },
  {
    name: "Chef Daniel Humm",
    role: "Eleven Madison Park — New York",
    blurb: "Visionary behind plant-based fine dining.",
    img: "/images/chefhumm.png?v=2",
  },
  {
    name: "Chef Yoshihiro Murata",
    role: "Kikunoi — Kyoto",
    blurb: "Master of Kaiseki, blending tradition with subtle innovation.",
    img: "/images/chefmurata.png?v=2",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function TopChefs() {
  const [selectedChef, setSelectedChef] = useState(null);

  return (
    <>
      <Head>
        <title>Top Chefs — The Culinary World Gazette</title>
        <meta
          name="description"
          content="Chef profiles curated by The Culinary World Gazette — technique, philosophy, and signature work."
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
          <div className="text-sm text-white/60 tracking-widest uppercase">Top Chefs</div>
        </div>
      </header>

      <main className="container py-10 sm:py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full">
            Gazette Selection
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Top <span className="text-[var(--gold)]">Chefs</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Profiles from kitchens and ateliers — technique, philosophy, and the signatures that
            define a modern culinary voice.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {chefs.map((c, idx) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(0.25, idx * 0.03) }}
              onClick={() => setSelectedChef(c)}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition"
            >
              {/* Portrait */}
              <div className="w-full h-72 sm:h-80 md:h-[420px] overflow-hidden flex items-center justify-center bg-black/20 border-b border-white/10">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="font-semibold text-lg text-white tracking-[0.015em]">
                  {c.name}
                </h3>
                <div className="text-[11px] text-white/60 tracking-widest uppercase mt-2">
                  {c.role}
                </div>
                <p className="text-sm text-white/70 mt-3 leading-relaxed">{c.blurb}</p>

                <div className="mt-5 text-xs text-[var(--gold)] font-medium">
                  Open profile →
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedChef && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChef(null)}
              aria-hidden="true"
            />

            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Chef profile"
            >
              <div className="w-full max-w-4xl rounded-3xl border border-white/12 bg-black/60 backdrop-blur shadow-[0_40px_120px_rgba(0,0,0,0.65)] overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-white/60 tracking-widest uppercase">
                      Chef Profile
                    </div>
                    <div className="text-sm font-semibold text-white">{selectedChef.name}</div>
                  </div>

                  <button
                    onClick={() => setSelectedChef(null)}
                    className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-0">
                  <div className="w-full h-[320px] sm:h-[420px] md:h-full flex items-center justify-center bg-black/25 border-b md:border-b-0 md:border-r border-white/10">
                    <img
                      src={selectedChef.img}
                      alt={selectedChef.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="text-[11px] text-white/60 tracking-widest uppercase">
                      {selectedChef.role}
                    </div>

                    <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white leading-tight">
                      {selectedChef.name}
                    </h2>

                    <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
                      {selectedChef.blurb}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedChef(null)}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                      >
                        Close <span aria-hidden>→</span>
                      </button>

                      <Link
                        href="/top-restaurants"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                      >
                        Explore Restaurants <span aria-hidden>→</span>
                      </Link>
                    </div>

                    <div className="mt-4 text-[11px] text-white/50">
                      Gazette profile — concise, curated, and updated over time.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

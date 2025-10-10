// pages/top-chefs.js
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const chefs = [
  {
    name: "Chef Alan Coxon",
    role: "Consultant, Innovator, Global Ambassador",
    blurb: "Chef Alan Coxon is more than a chef — he’s a storyteller, innovator, and global culinary ambassador.",
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
    blurb: "Known as Thailand’s rising culinary star, Chef Pam blends Thai-Chinese heritage with bold innovation, leading Restaurant Potong into Asia’s dining spotlight.",
    img: "/images/chefpam.png?v=2",
  },
  {
    name: "Chef Hélène Darroze",
    role: "Chef Patron — Paris & London",
    blurb: "A fourth-generation chef, known for her heartfelt French cuisine at restaurants including Hélène Darroze at The Connaught (three Michelin stars).",
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

export default function TopChefs() {
  const [selectedChef, setSelectedChef] = useState(null);

  return (
    <>
      <Head>
        <title>Top Chefs — The Culinary World Gazette</title>
      </Head>

      {/* Sticky header */}
      <header className="border-b border-white/10 bg-[var(--bg)]/70 backdrop-blur sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-wide hover:text-[var(--gold)] transition"
          >
            ← Home
          </Link>
          <div className="text-sm text-white/70">Top Chefs</div>
        </div>
      </header>

      <main className="container py-10">
        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-[0.015em] mb-6 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Top Chefs
        </motion.h1>
        <motion.p
          className="text-black/80 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Profiles from kitchens and labs — technique, philosophy, and signature
          dishes.
        </motion.p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((c) => (
            <motion.article
              key={c.name}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedChef(c)}
            >
              {/* Full portrait image */}
              <div className="w-full h-80 sm:h-96 md:h-[500px] overflow-hidden flex items-center justify-center bg-gray-100">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-black tracking-[0.015em]">
                  {c.name}
                </h3>
                <div className="text-xs text-gray-500 mt-1">{c.role}</div>
                <p className="text-sm text-gray-700 mt-3">{c.blurb}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedChef && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChef(null)}
            />
            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden">
                <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                  <img
                    src={selectedChef.img}
                    alt={selectedChef.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 text-black">
                  <h2 className="text-2xl font-bold">{selectedChef.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedChef.role}</p>
                  <p className="mt-4 text-gray-700">{selectedChef.blurb}</p>
                  <button
                    onClick={() => setSelectedChef(null)}
                    className="mt-6 px-4 py-2 rounded bg-[var(--gold)] text-black font-semibold hover:brightness-110 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

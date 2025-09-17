// pages/top-chefs.js
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const chefs = [
  {
    name: "Chef Alexander Hardinan",
    role: "Executive Chef — The Globe’s Heritage by Chef Alex - Pattaya",
    blurb: "Transforms simple and forgotten ingredients into refined, modern craftsmanship.",
    img: "/images/chefalex.png?v=2", // ✅ cache-busting query string
  },
  {
    name: "Chef Pam (Pichaya Soontornyanakij)",
    role: "Chef-Owner — Potong, Bangkok",
    blurb: "Known as Thailand’s rising culinary star, Chef Pam blends Thai-Chinese heritage with bold innovation, leading Restaurant Potong into Asia’s dining spotlight.",
    img: "/images/chefs/pam.jpg",
  },
  {
    name: "Chef Rio T.",
    role: "R&D — Tokyo",
    blurb: "Fermentation-forward cuisine and clean presentations.",
    img: "/images/hero.png",
  },
  {
    name: "Chef Massimo Bottura",
    role: "Osteria Francescana — Italy",
    blurb: "A pioneer of modern Italian cuisine, mixing art, memory, and flavor.",
    img: "/images/chefs/bottura.jpg",
  },
  {
    name: "Chef Dominique Crenn",
    role: "Atelier Crenn — San Francisco",
    blurb: "The first female chef in the US with three Michelin stars.",
    img: "/images/chefs/crenn.jpg",
  },
  {
    name: "Chef René Redzepi",
    role: "Noma — Copenhagen",
    blurb: "Leader of New Nordic cuisine, showcasing local and foraged ingredients.",
    img: "/images/chefs/renezep.jpg",
  },
  {
    name: "Chef José Andrés",
    role: "World Central Kitchen — USA",
    blurb: "Spanish-American chef, restaurateur, and humanitarian.",
    img: "/images/chefs/andres.jpg",
  },
  {
    name: "Chef Anne-Sophie Pic",
    role: "Maison Pic — France",
    blurb: "France’s most decorated female chef, renowned for elegance and finesse.",
    img: "/images/chefs/pic.jpg",
  },
  {
    name: "Chef Gaggan Anand",
    role: "Gaggan Anand — Bangkok",
    blurb: "Revolutionary Indian cuisine with playful storytelling.",
    img: "/images/chefs/gaggan.jpg",
  },
  {
    name: "Chef Clare Smyth",
    role: "Core — London",
    blurb: "The first female British chef with three Michelin stars.",
    img: "/images/chefs/clare.jpg",
  },
  {
    name: "Chef Daniel Humm",
    role: "Eleven Madison Park — New York",
    blurb: "Visionary behind plant-based fine dining.",
    img: "/images/chefs/humm.jpg",
  },
  {
    name: "Chef Yoshihiro Murata",
    role: "Kikunoi — Kyoto",
    blurb: "Master of Kaiseki, blending tradition with subtle innovation.",
    img: "/images/chefs/murata.jpg",
  },
];

export default function TopChefs() {
  return (
    <>
      <Head>
        <title>Top Chefs — The Culinary World Gazette</title>
      </Head>

      {/* Sticky header */}
      <header className="border-b border-white/10 bg-[var(--bg)]/70 backdrop-blur sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide hover:text-[var(--gold)] transition">
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
          Profiles from kitchens and labs — technique, philosophy, and signature dishes.
        </motion.p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((c) => (
            <motion.article
              key={c.name}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Full-size image */}
              <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-black tracking-[0.015em]">{c.name}</h3>
                <div className="text-xs text-gray-500 mt-1">{c.role}</div>
                <p className="text-sm text-gray-700 mt-3">{c.blurb}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </>
  );
}

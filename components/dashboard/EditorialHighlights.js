// components/dashboard/EditorialHighlights.js
import { motion } from "framer-motion";
import Link from "next/link";

const highlights = [
  {
    title: "Bangkok’s New Fine-Dining Vanguard",
    tag: "Feature",
    href: "/top-restaurants",
    excerpt:
      "A curated look at chefs redefining contemporary Thai cuisine with precision and restraint.",
  },
  {
    title: "Rising Chefs to Watch in 2026",
    tag: "Spotlight",
    href: "/top-chefs",
    excerpt:
      "Emerging talents shaping the next chapter of modern gastronomy across continents.",
  },
  {
    title: "Cities Driving Global Food Culture",
    tag: "Editorial",
    href: "#cities",
    excerpt:
      "From Tokyo to Copenhagen, a data-backed view of culinary influence by city.",
  },
];

export default function EditorialHighlights() {
  return (
    <div className="flex flex-col gap-4">
      {highlights.map((h, i) => (
        <motion.div
          key={h.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
          className="rounded-xl border border-white/10 bg-black/25 backdrop-blur p-4 hover:border-[var(--gold)]/40 transition"
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[var(--gold)]">
              {h.tag}
            </span>
            <span className="text-[10px] text-white/50">
              Editorial pick
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-semibold leading-snug">
            {h.title}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-white/65 leading-relaxed">
            {h.excerpt}
          </p>

          <div className="mt-3">
            <Link
              href={h.href}
              className="inline-flex items-center gap-2 text-xs font-medium text-white/80 hover:text-[var(--gold)] transition"
            >
              View story
              <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

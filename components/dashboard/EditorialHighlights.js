// components/dashboard/EditorialHighlights.js
import { motion } from "framer-motion";

const items = [
  {
    title: "Hidden Gems Series",
    meta: "Curated list • Weekly",
    desc: "High-conversion editorial format with strong time-on-page.",
    tag: "Featured",
  },
  {
    title: "Chef Spotlight",
    meta: "Profiles • Global",
    desc: "Human stories with premium presentation and strong retention.",
    tag: "Trending",
  },
  {
    title: "Top Cities Radar",
    meta: "Heat list • Monthly",
    desc: "Discovery-first structure to guide readers through destinations.",
    tag: "New",
  },
];

export default function EditorialHighlights() {
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <motion.div
          key={it.title}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-4 hover:border-[var(--gold)]/40 transition"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white">{it.title}</div>
              <div className="text-xs text-white/60 mt-1">{it.meta}</div>
            </div>

            <span className="text-[10px] px-2 py-1 rounded-full border border-white/15 bg-black/25 text-[var(--gold)] tracking-widest uppercase">
              {it.tag}
            </span>
          </div>

          <p className="mt-2 text-xs text-white/70 leading-relaxed">
            {it.desc}
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] text-white/55">
            <span>Module {idx + 1}</span>
            <span className="text-[var(--gold)]">View details →</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// components/dashboard/EditorialHighlights.js
import { motion } from "framer-motion";

const items = [
  { label: "Top City", title: "Tokyo: late-night omakase wave", meta: "Rising interest" },
  { label: "Cuisine", title: "Modern Thai: fire + fermentation", meta: "Strong momentum" },
  { label: "Chef Watch", title: "New tasting menus gaining traction", meta: "Editors’ pick" },
  { label: "Restaurant", title: "Hidden gems: 8-seat counters", meta: "High saves" },
];

export default function EditorialHighlights() {
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <motion.div
          key={it.title}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-4 hover:border-[var(--gold)]/35 transition"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] text-white/55 tracking-widest uppercase">
                {it.label}
              </div>
              <div className="mt-1 text-sm font-semibold text-white leading-snug">
                {it.title}
              </div>
              <div className="mt-1 text-xs text-white/60">{it.meta}</div>
            </div>

            <div className="text-xs font-medium text-[var(--gold)]">+</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// components/dashboard/StatsOverview.js
import { motion } from "framer-motion";

const kpis = [
  { label: "Articles", value: "92", hint: "Published" },
  { label: "Tags", value: "18", hint: "Topics" },
  { label: "Signals", value: "3×", hint: "Trend lift" },
  { label: "Engagement", value: "92%", hint: "Editorial quality" },
  { label: "Cities", value: "41", hint: "Covered" },
  { label: "Chefs", value: "12", hint: "Spotlighted" },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {kpis.map((k) => (
        <motion.div
          key={k.label}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-4 hover:border-[var(--gold)]/35 transition"
        >
          <div className="text-[10px] text-white/55 tracking-widest uppercase">
            {k.label}
          </div>
          <div className="mt-1 text-xl sm:text-2xl font-semibold text-[var(--gold)]">
            {k.value}
          </div>
          <div className="mt-1 text-[11px] text-white/55">{k.hint}</div>
        </motion.div>
      ))}
    </div>
  );
}

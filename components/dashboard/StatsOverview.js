// components/dashboard/StatsOverview.js
import { motion } from "framer-motion";

const stats = [
  {
    label: "Published Articles",
    value: "128",
    delta: "+12%",
    hint: "Last 30 days",
  },
  {
    label: "Featured Restaurants",
    value: "64",
    delta: "+6",
    hint: "Curated list",
  },
  {
    label: "Cities Covered",
    value: "38",
    delta: "+4",
    hint: "Global reach",
  },
  {
    label: "Chefs Highlighted",
    value: "52",
    delta: "+9",
    hint: "Editorial picks",
  },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
          className="rounded-xl border border-white/10 bg-black/30 backdrop-blur px-4 py-4 hover:border-[var(--gold)]/40 transition"
        >
          <div className="text-xs text-white/60 tracking-wide">
            {s.label}
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            <div className="text-2xl sm:text-3xl font-semibold">
              {s.value}
            </div>
            <div className="text-xs text-[var(--gold)] font-medium">
              {s.delta}
            </div>
          </div>

          <div className="mt-1 text-[11px] text-white/50">
            {s.hint}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

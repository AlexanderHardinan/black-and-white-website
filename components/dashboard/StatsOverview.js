// components/dashboard/StatsOverview.js
import { motion } from "framer-motion";

const stats = [
  { label: "Articles", value: "92", hint: "Published this year", delta: "+8%" },
  { label: "Regions", value: "7", hint: "Covered globally", delta: "+2" },
  { label: "Avg. Quality", value: "92%", hint: "Editorial scoring", delta: "+3%" },
  { label: "Engagement", value: "4.9", hint: "Reader rating", delta: "+0.2" },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((s) => (
        <motion.div
          key={s.label}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-4 hover:border-[var(--gold)]/40 transition"
        >
          <div className="text-[10px] text-white/55 tracking-widest uppercase">
            {s.label}
          </div>

          <div className="mt-1 flex items-end justify-between gap-2">
            <div className="text-xl sm:text-2xl font-semibold text-[var(--gold)]">
              {s.value}
            </div>
            <div className="text-[11px] text-white/60">{s.delta}</div>
          </div>

          <div className="mt-1 text-[11px] text-white/55 leading-snug">
            {s.hint}
          </div>

          <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--gold)]"
              style={{ width: barWidthFor(s.label) }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function barWidthFor(label) {
  switch (label) {
    case "Articles":
      return "78%";
    case "Regions":
      return "52%";
    case "Avg. Quality":
      return "92%";
    case "Engagement":
      return "84%";
    default:
      return "65%";
  }
}

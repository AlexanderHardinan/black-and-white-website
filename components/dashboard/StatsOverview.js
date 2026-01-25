// components/dashboard/StatsOverview.js
import { motion } from "framer-motion";

export default function StatsOverview({ postsCount = 0, tagsCount = 0 }) {
  const kpis = [
    { label: "Articles", value: String(postsCount), hint: "Published" },
    { label: "Tags", value: String(tagsCount), hint: "Topics" },
    { label: "Signals", value: "3×", hint: "Trend lift" },
    { label: "Engagement", value: "92%", hint: "Editorial quality" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <motion.div
          key={k.label}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-3"
        >
          <div className="text-[10px] text-white/55 tracking-widest uppercase">{k.label}</div>
          <div className="mt-1 text-lg font-semibold text-[var(--gold)]">{k.value}</div>
          <div className="text-[11px] text-white/55">{k.hint}</div>
        </motion.div>
      ))}
    </div>
  );
}

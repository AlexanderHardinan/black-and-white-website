// components/dashboard/WorldMap.js
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

const MAP_REGIONS = [
  { id: "na", name: "North America", score: 78, path: "M 110 90 L 215 70 L 295 95 L 280 155 L 205 175 L 135 140 Z" },
  { id: "sa", name: "South America", score: 52, path: "M 255 175 L 300 195 L 290 265 L 255 288 L 230 230 Z" },
  { id: "eu", name: "Europe", score: 84, path: "M 365 88 L 420 72 L 452 105 L 415 130 L 360 118 Z" },
  { id: "af", name: "Africa", score: 46, path: "M 390 145 L 455 150 L 475 210 L 430 268 L 382 215 Z" },
  { id: "me", name: "Middle East", score: 61, path: "M 452 120 L 500 125 L 505 155 L 468 168 L 442 145 Z" },
  { id: "as", name: "Asia", score: 92, path: "M 518 105 L 655 95 L 710 140 L 650 190 L 540 165 Z" },
  { id: "oc", name: "Oceania", score: 57, path: "M 635 215 L 710 225 L 705 270 L 630 265 Z" },
];

function scoreOpacity(score) {
  const t = clamp(score, 0, 100) / 100;
  return 0.18 + t * 0.35;
}

export default function WorldMap() {
  const [active, setActive] = useState("as");

  const region = useMemo(
    () => MAP_REGIONS.find((r) => r.id === active) || MAP_REGIONS[0],
    [active]
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
      <div className="xl:col-span-8 rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="text-xs text-white/60 tracking-widest uppercase">Global Map</div>
          <div className="text-xs text-white/60">
            Active: <span className="text-[var(--gold)]">{region.name}</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden">
          <svg
            viewBox="0 0 820 330"
            className="w-full h-[210px] sm:h-[240px]"
            role="img"
            aria-label="World map chart"
          >
            <defs>
              <pattern id="gridDash" width="28" height="28" patternUnits="userSpaceOnUse">
                <path
                  d="M 28 0 L 0 0 0 28"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect x="0" y="0" width="820" height="330" fill="url(#gridDash)" />
            <ellipse
              cx="410"
              cy="165"
              rx="370"
              ry="140"
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="2"
            />

            {MAP_REGIONS.map((r) => {
              const selected = r.id === active;
              return (
                <motion.path
                  key={r.id}
                  d={r.path}
                  initial={false}
                  animate={{
                    opacity: selected ? 0.92 : scoreOpacity(r.score),
                    scale: selected ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  fill={selected ? "var(--gold)" : "white"}
                  stroke={selected ? "rgba(203,161,53,0.9)" : "rgba(255,255,255,0.16)"}
                  strokeWidth={selected ? 2.2 : 1.4}
                  style={{ transformOrigin: "center" }}
                  onClick={() => setActive(r.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select ${r.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(r.id);
                    }
                  }}
                  className="cursor-pointer"
                />
              );
            })}
          </svg>
        </div>

        <div className="mt-2 text-[11px] text-white/50">
          Click a region to spotlight (demo visualization).
        </div>
      </div>

      <motion.div
        key={region.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="xl:col-span-4 rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-4"
      >
        <div className="text-xs text-white/60 tracking-widest uppercase">Spotlight</div>

        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="text-base font-semibold text-white">{region.name}</div>
          <div className="text-xs font-medium text-[var(--gold)]">Score {region.score}</div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-white/55">Priority</div>
            <div className="mt-1 font-semibold text-white">
              {region.score >= 80 ? "High" : region.score >= 60 ? "Medium" : "Build"}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-white/55">Next</div>
            <div className="mt-1 font-semibold text-white">
              {region.score >= 80 ? "Feature push" : region.score >= 60 ? "Curate" : "Discover"}
            </div>
          </div>
        </div>

        <div className="mt-3 text-[11px] text-white/50">
          Replace scores with real content + analytics later.
        </div>
      </motion.div>
    </div>
  );
}

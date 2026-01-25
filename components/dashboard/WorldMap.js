// components/dashboard/WorldMap.js
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const REGIONS = [
  {
    id: "na",
    name: "North America",
    hint: "Restaurant features & city guides",
    score: 78,
    // simple silhouette block (map-chart style, not geo-accurate)
    path: "M 120 95 L 220 70 L 300 90 L 285 150 L 210 170 L 145 140 Z",
  },
  {
    id: "sa",
    name: "South America",
    hint: "Emerging culinary destinations",
    score: 52,
    path: "M 265 175 L 305 190 L 290 260 L 255 285 L 235 230 Z",
  },
  {
    id: "eu",
    name: "Europe",
    hint: "Fine dining editorial momentum",
    score: 84,
    path: "M 370 90 L 425 75 L 455 105 L 420 130 L 365 120 Z",
  },
  {
    id: "af",
    name: "Africa",
    hint: "Regional spotlights expanding",
    score: 46,
    path: "M 395 145 L 455 150 L 475 210 L 430 265 L 385 215 Z",
  },
  {
    id: "me",
    name: "Middle East",
    hint: "Luxury openings & chef moves",
    score: 61,
    path: "M 455 120 L 500 125 L 505 155 L 470 165 L 445 145 Z",
  },
  {
    id: "as",
    name: "Asia",
    hint: "High velocity features & chefs",
    score: 92,
    path: "M 520 105 L 655 95 L 710 140 L 650 190 L 545 165 Z",
  },
  {
    id: "oc",
    name: "Oceania",
    hint: "Boutique scenes & hidden gems",
    score: 57,
    path: "M 640 215 L 710 225 L 705 270 L 630 265 Z",
  },
];

function scoreToOpacity(score) {
  // 0..100 -> 0.20..0.55
  const t = Math.max(0, Math.min(100, score)) / 100;
  return 0.2 + t * 0.35;
}

export default function WorldMap() {
  const [active, setActive] = useState("as");

  const activeRegion = useMemo(
    () => REGIONS.find((r) => r.id === active) || REGIONS[0],
    [active]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
      {/* Map */}
      <div className="lg:col-span-8">
        <div className="rounded-xl border border-white/10 bg-black/25 backdrop-blur p-4 sm:p-5 overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="text-xs text-white/60 tracking-wide">
              REGIONAL SPOTLIGHT
            </div>
            <div className="text-xs text-white/60">
              Active: <span className="text-[var(--gold)]">{activeRegion.name}</span>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <svg
              viewBox="0 0 840 360"
              className="w-full h-[240px] sm:h-[290px] md:h-[320px]"
              role="img"
              aria-label="World map chart"
            >
              {/* background grid */}
              <defs>
                <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path
                    d="M 28 0 L 0 0 0 28"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect x="0" y="0" width="840" height="360" fill="url(#grid)" />

              {/* subtle globe line */}
              <ellipse
                cx="420"
                cy="180"
                rx="380"
                ry="150"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="2"
              />

              {/* regions */}
              {REGIONS.map((r) => {
                const selected = r.id === active;
                const baseOpacity = scoreToOpacity(r.score);

                return (
                  <g key={r.id}>
                    <motion.path
                      d={r.path}
                      initial={false}
                      animate={{
                        opacity: selected ? 0.9 : baseOpacity,
                        scale: selected ? 1.02 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 240, damping: 22 }}
                      fill={selected ? "var(--gold)" : "white"}
                      stroke={selected ? "rgba(203,161,53,0.85)" : "rgba(255,255,255,0.16)"}
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
                    {/* label dot */}
                    <circle
                      cx={(() => {
                        // approximate center for label dot by averaging path points
                        // (simple: hardcode by region id for stable visuals)
                        const centers = {
                          na: 210, sa: 275, eu: 410, af: 430, me: 485, as: 620, oc: 675,
                        };
                        return centers[r.id] ?? 420;
                      })()}
                      cy={(() => {
                        const centers = {
                          na: 120, sa: 235, eu: 105, af: 205, me: 145, as: 145, oc: 245,
                        };
                        return centers[r.id] ?? 180;
                      })()}
                      r={selected ? 5 : 3.5}
                      fill={selected ? "rgba(203,161,53,1)" : "rgba(255,255,255,0.30)"}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 text-[11px] text-white/50">
            Map chart is a lightweight editorial visualization (demo). Click a region to spotlight.
          </div>
        </div>
      </div>

      {/* Spotlight panel */}
      <div className="lg:col-span-4">
        <motion.div
          key={activeRegion.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-xl border border-white/10 bg-black/25 backdrop-blur p-4 sm:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-white/60 tracking-wide">SPOTLIGHT</div>
              <div className="mt-1 text-lg font-semibold">{activeRegion.name}</div>
            </div>
            <div className="text-xs font-medium text-[var(--gold)]">
              Score {activeRegion.score}
            </div>
          </div>

          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            {activeRegion.hint}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="text-[11px] text-white/55">Priority</div>
              <div className="mt-1 text-sm font-semibold">
                {activeRegion.score >= 80 ? "High" : activeRegion.score >= 60 ? "Medium" : "Build"}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="text-[11px] text-white/55">Next action</div>
              <div className="mt-1 text-sm font-semibold">
                {activeRegion.score >= 80 ? "Feature push" : activeRegion.score >= 60 ? "Curate" : "Discover"}
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-white/50">
            Replace demo scoring with real traffic + content signals later.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

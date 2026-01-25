// components/dashboard/TrendCharts.js
import { motion } from "framer-motion";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function linePath(values, w, h, pad) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const xStep = (w - pad * 2) / (values.length - 1);

  return values
    .map((v, i) => {
      const x = pad + i * xStep;
      const t = (v - min) / span;
      const y = pad + (1 - t) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function areaPath(values, w, h, pad) {
  const p = linePath(values, w, h, pad);
  const xEnd = w - pad;
  const xStart = pad;
  const yBase = h - pad;
  return `${p} L ${xEnd} ${yBase} L ${xStart} ${yBase} Z`;
}

function MiniChartCard({ title, subtitle, values }) {
  const w = 520;
  const h = 160;
  const pad = 14;

  const dLine = linePath(values, w, h, pad);
  const dArea = areaPath(values, w, h, pad);

  const last = values[values.length - 1];
  const prev = values[values.length - 2] ?? last;
  const pct = prev === 0 ? 0 : ((last - prev) / prev) * 100;
  const pctText = `${pct >= 0 ? "+" : ""}${clamp(pct, -99, 999).toFixed(0)}%`;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-4 hover:border-[var(--gold)]/40 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs text-white/60 mt-1">{subtitle}</div>
        </div>
        <div className="text-xs font-medium text-[var(--gold)]">{pctText}</div>
      </div>

      <div className="mt-3 w-full overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-[130px] sm:h-[150px]"
          role="img"
          aria-label={`${title} chart`}
        >
          <defs>
            <linearGradient id={`areaGold-${title}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {Array.from({ length: 5 }).map((_, i) => {
            const y = pad + i * ((h - pad * 2) / 4);
            return (
              <line
                key={i}
                x1={pad}
                x2={w - pad}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            );
          })}

          <path d={dArea} fill={`url(#areaGold-${title})`} />
          <path
            d={dLine}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-2 text-[11px] text-white/50">
        Demo signal — wire real analytics later.
      </div>
    </motion.div>
  );
}

export default function TrendCharts() {
  const storyVelocity = [18, 22, 19, 26, 29, 33, 30, 38, 42, 47, 45, 53];
  const cityMomentum = [9, 11, 12, 10, 14, 16, 18, 17, 20, 22, 24, 26];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MiniChartCard
        title="Story Velocity"
        subtitle="Publishing rhythm & attention curve"
        values={storyVelocity}
      />
      <MiniChartCard
        title="City Momentum"
        subtitle="Discovery interest by location"
        values={cityMomentum}
      />
    </div>
  );
}

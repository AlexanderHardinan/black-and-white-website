// components/home/DashboardHero.js
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AnimatedButton from "../AnimatedButton";

/* ---------- helpers ---------- */
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function safeId(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

/* ---------- mini chart ---------- */
function MiniChartCard({ title, subtitle, values, live = false }) {
  const reduceMotion = useReducedMotion();

  const w = 520;
  const h = 150;
  const pad = 14;

  const [liveValues, setLiveValues] = useState(values);
  const chartValues = live ? liveValues : values;

  useEffect(() => {
    setLiveValues(values);
  }, [values]);

  useEffect(() => {
    if (!live || reduceMotion || !Array.isArray(values) || values.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setLiveValues((currentValues) => {
        const current =
          Array.isArray(currentValues) && currentValues.length === values.length
            ? currentValues
            : values;
        const lastValue = current[current.length - 1] ?? 20;
        const previousValue = current[current.length - 2] ?? lastValue;
        const direction = lastValue >= previousValue ? 1 : -1;
        const wave = Math.sin(Date.now() / 650) * 4;
        const drift = direction * 1.6;
        const pulse = Math.round((Math.random() - 0.35) * 7);
        const nextValue = clamp(Math.round(lastValue + wave + drift + pulse), 6, 96);

        return [...current.slice(1), nextValue];
      });
    }, 850);

    return () => window.clearInterval(timer);
  }, [live, reduceMotion, values]);

  const dLine = linePath(chartValues, w, h, pad);
  const dArea = areaPath(chartValues, w, h, pad);

  const last = chartValues[chartValues.length - 1];
  const prev = chartValues[chartValues.length - 2] ?? last;
  const pct = prev === 0 ? 0 : ((last - prev) / prev) * 100;
  const pctText = `${pct >= 0 ? "+" : ""}${clamp(pct, -99, 999).toFixed(0)}%`;

  const min = Math.min(...chartValues);
  const max = Math.max(...chartValues);
  const span = Math.max(1, max - min);
  const lastX = pad + (chartValues.length - 1) * ((w - pad * 2) / (chartValues.length - 1));
  const lastY = pad + (1 - (last - min) / span) * (h - pad * 2);

  const gradId = `areaGold-${safeId(title)}`;

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

        <div className="flex flex-col items-end gap-1">
          <div className="text-xs font-medium text-[var(--gold)]">{pctText}</div>
          {live ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/25 bg-[var(--gold)]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]"
                animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.85, 1.25, 0.85] }}
                transition={reduceMotion ? undefined : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
              Live
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-3 w-full overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-[120px] sm:h-[140px]"
          role="img"
          aria-label={`${title} live chart`}
        >
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
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

          <motion.path
            initial={false}
            animate={{ d: dArea }}
            transition={{ duration: reduceMotion ? 0 : 0.58, ease: "easeInOut" }}
            fill={`url(#${gradId})`}
          />
          <motion.path
            initial={false}
            animate={{ d: dLine }}
            transition={{ duration: reduceMotion ? 0 : 0.58, ease: "easeInOut" }}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {live ? (
            <>
              <motion.circle
                cx={lastX}
                cy={lastY}
                r="4"
                fill="var(--gold)"
                animate={reduceMotion ? undefined : { r: [4, 7, 4], opacity: [0.95, 0.45, 0.95] }}
                transition={reduceMotion ? undefined : { duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx={lastX}
                cy={lastY}
                r="2.4"
                fill="white"
                animate={reduceMotion ? undefined : { opacity: [0.65, 1, 0.65] }}
                transition={reduceMotion ? undefined : { duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          ) : null}
        </svg>
      </div>

      <div className="mt-2 text-[11px] text-white/50">
        {live ? "Live movement simulation updating continuously." : ""}
      </div>
    </motion.div>
  );
}

/* ---------- world map module ---------- */
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

function WorldMapModule() {
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
          
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- KPI strip ---------- */
function KpiStrip({ postsCount, tagsCount }) {
  const kpis = [
    { label: "Articles", value: String(postsCount || 0), hint: "Published" },
    { label: "Tags", value: String(tagsCount || 0), hint: "Topics" },
    { label: "Signals", value: "3×", hint: "Trend lift" },
    { label: "Engagement", value: "92%", hint: "Editorial quality" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-3"
        >
          <div className="text-[10px] text-white/55 tracking-widest uppercase">{k.label}</div>
          <div className="mt-1 text-lg font-semibold text-[var(--gold)]">{k.value}</div>
          <div className="text-[11px] text-white/55">{k.hint}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- LEFT MID STACK (fills the middle gap on desktop) ---------- */
function LeftMidStack({ posts, allTags, onOpenFeaturedAt }) {
  const cards = [
    {
      label: "Featured",
      title: "Open the latest highlights",
      desc: "",
      action: () => onOpenFeaturedAt(0),
    },
    {
      label: "Coverage",
      title: `${Math.max(0, (allTags || []).length - 1)} Topics tracked`,
      desc: "Tags, cities, cuisines, chefs.",
    },
    {
      label: "Publishing",
      title: `${(posts || []).length} Articles live`,
      desc: "",
    },
  ];

  return (
    <div className="hidden lg:block mt-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-white/60 tracking-widest uppercase">Overview</div>
          <div className="text-xs text-white/60"></div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-4 hover:border-[var(--gold)]/40 transition"
            >
              <div className="text-[10px] text-white/55 tracking-widest uppercase">
                {c.label}
              </div>
              <div className="mt-1 text-sm font-semibold text-white">{c.title}</div>
              <div className="mt-1 text-xs text-white/65 leading-relaxed">{c.desc}</div>

              {c.action ? (
                <button
                  type="button"
                  onClick={c.action}
                  className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition"
                >
                  Open <span aria-hidden>→</span>
                </button>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
          <div className="relative h-[160px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
            <img
              src="/images/hero.png"
              alt="Preview"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="text-[10px] tracking-widest uppercase text-white/65">
                
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                
              </div>
              <div className="mt-1 text-xs text-white/70">
                
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <KpiStrip
            postsCount={(posts || []).length}
            tagsCount={(allTags || []).length - 1}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- main section ---------- */
export default function DashboardHero({ posts, allTags, topFeatured, onOpenFeaturedAt }) {
  const reduceMotion = useReducedMotion();

  const [bookFlip, setBookFlip] = useState(null);
  const bookFlipTimerRef = useRef(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  const floaty = (delay = 0) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 10, scale: 0.98 },
          animate: {
            opacity: 1,
            y: [0, -6, 0],
            scale: 1,
            transition: { delay, duration: 4.8, repeat: Infinity, ease: "easeInOut" },
          },
        };

  const storyVelocity = useMemo(
    () => [18, 22, 19, 26, 29, 33, 30, 38, 42, 47, 45, 53],
    []
  );
  const cityMomentum = useMemo(
    () => [9, 11, 12, 10, 14, 16, 18, 17, 20, 22, 24, 26],
    []
  );

  useEffect(() => {
    return () => {
      if (bookFlipTimerRef.current) {
        window.clearTimeout(bookFlipTimerRef.current);
      }
    };
  }, []);

  function triggerProfessionalBookFlip(x, y) {
    const id = Date.now();

    if (bookFlipTimerRef.current) {
      window.clearTimeout(bookFlipTimerRef.current);
    }

    setBookFlip({
      id,
      x,
      y,
    });

    bookFlipTimerRef.current = window.setTimeout(() => {
      setBookFlip((current) => (current?.id === id ? null : current));
    }, 1400);
  }

  function handleDashboardClickableClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    const clickable = target?.closest('button, a[href], [role="button"]');

    if (!clickable || !event.currentTarget.contains(clickable)) {
      return;
    }

    if (clickable instanceof HTMLButtonElement && clickable.disabled) {
      return;
    }

    if (clickable.getAttribute("aria-disabled") === "true") {
      return;
    }

    const rect = clickable.getBoundingClientRect();

    triggerProfessionalBookFlip(
      event.clientX || rect.left + rect.width / 2,
      event.clientY || rect.top + rect.height / 2
    );
  }

  function renderProfessionalBookFlip() {
    return (
      <AnimatePresence>
        {bookFlip ? (
          <div
            key={bookFlip.id}
            className="pointer-events-none fixed z-[2147483647]"
            style={{
              left: bookFlip.x,
              top: bookFlip.y,
              transform: "translate(-50%, -50%)",
              perspective: 1200,
            }}
            aria-hidden="true"
          >
            <motion.div
              className="relative h-28 w-40"
              style={{
                transformStyle: "preserve-3d",
              }}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.55, rotateX: 16, y: 14 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, rotateX: 0, y: 0 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.82, rotateX: -8, y: -12 }
              }
              transition={
                reduceMotion
                  ? { duration: 0.12 }
                  : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <motion.div
                className="absolute left-1/2 top-[88%] h-5 w-32 rounded-full bg-black/40 blur-xl"
                style={{ transform: "translateX(-50%)" }}
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={{ opacity: 0.72, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.5 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[86px] w-[118px]"
                style={{
                  transform: "translate(-50%, -50%)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full w-1/2 rounded-l-xl border border-white/25 bg-gradient-to-br from-[#3b2f1d] via-[#9a6b1f] to-[#facc15] shadow-2xl"
                  style={{
                    transformOrigin: "right center",
                    boxShadow:
                      "inset -10px 0 20px rgba(0,0,0,0.22), 0 18px 38px rgba(0,0,0,0.34)",
                  }}
                  initial={reduceMotion ? { opacity: 0 } : { rotateY: 68 }}
                  animate={reduceMotion ? { opacity: 1 } : { rotateY: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { rotateY: 48 }}
                  transition={{
                    duration: reduceMotion ? 0.12 : 0.48,
                    ease: "easeOut",
                  }}
                />

                <motion.div
                  className="absolute right-0 top-0 h-full w-1/2 rounded-r-xl border border-white/25 bg-gradient-to-br from-[#f8dfa0] via-[#facc15] to-[#b7791f] shadow-2xl"
                  style={{
                    transformOrigin: "left center",
                    boxShadow:
                      "inset 10px 0 20px rgba(255,255,255,0.18), 0 18px 38px rgba(0,0,0,0.34)",
                  }}
                  initial={reduceMotion ? { opacity: 0 } : { rotateY: -68 }}
                  animate={reduceMotion ? { opacity: 1 } : { rotateY: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { rotateY: -48 }}
                  transition={{
                    duration: reduceMotion ? 0.12 : 0.48,
                    ease: "easeOut",
                  }}
                />

                <span
                  className="absolute left-1/2 top-0 h-full w-[5px] rounded-full bg-gradient-to-b from-white/40 via-[#7c4a03] to-black/25"
                  style={{
                    transform: "translateX(-50%) translateZ(8px)",
                    boxShadow: "0 0 16px rgba(250,204,21,0.35)",
                  }}
                />

                {Array.from({ length: 7 }).map((_, page) => (
                  <motion.span
                    key={`dashboard-book-page-${page}`}
                    className="absolute left-1/2 top-[6px] h-[74px] w-[52px] rounded-r-lg border border-amber-100/80 bg-gradient-to-br from-white via-amber-50 to-amber-100"
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      boxShadow:
                        "inset 8px 0 14px rgba(120,53,15,0.12), 0 8px 18px rgba(0,0,0,0.16)",
                    }}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            rotateY: 0,
                            x: 0,
                            z: page * 0.8,
                            opacity: 0,
                          }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: [0, 1, 0] }
                        : {
                            rotateY: [0, -26, -118, -172],
                            x: [0, -1, -4, -8],
                            z: [page * 0.8, 12 + page, 16 + page, page],
                            opacity: [0, 1, 1, 0.18],
                          }
                    }
                    transition={{
                      duration: reduceMotion ? 0.42 : 0.9,
                      delay: reduceMotion ? page * 0.02 : 0.14 + page * 0.075,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="absolute left-3 right-3 top-4 h-px bg-amber-800/20" />
                    <span className="absolute left-3 right-4 top-7 h-px bg-amber-800/16" />
                    <span className="absolute left-3 right-5 top-10 h-px bg-amber-800/14" />
                  </motion.span>
                ))}

                <motion.span
                  className="absolute left-1/2 top-1/2 h-[92px] w-[126px] rounded-2xl border border-[var(--gold)]/35"
                  style={{
                    transform: "translate(-50%, -50%)",
                    boxShadow:
                      "0 0 30px rgba(250,204,21,0.28), inset 0 0 28px rgba(250,204,21,0.10)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.08, 1.18] }}
                  transition={{
                    duration: reduceMotion ? 0.42 : 1,
                    ease: "easeOut",
                  }}
                />

                <motion.span
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white"
                  style={{
                    transform: "translate(-50%, -50%)",
                    boxShadow:
                      "0 0 24px rgba(255,255,255,0.95), 0 0 38px rgba(250,204,21,0.75)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 2.1, 0] }}
                  transition={{
                    duration: reduceMotion ? 0.36 : 0.9,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    );
  }

  return (
    <>
    <section className="container py-12 sm:py-14 md:py-16" onClickCapture={handleDashboardClickableClick}>
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left hero text */}
        <motion.div
          className="lg:col-span-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full">
            Official Gazette
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight tracking-[0.02em] text-white">
            Discover the <span style={{ color: "var(--gold)" }}>Best Restaurants</span>{" "}
            Worldwide
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl">
            Showcasing your craft and passion
            worldwide
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <AnimatedButton href="#latest" variant="primary">
              Explore Articles →
            </AnimatedButton>
            <AnimatedButton href="/about" variant="outline">
              About
            </AnimatedButton>
          </div>

          <div className="mt-6 space-y-2 text-sm text-white/70">
            <div className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              World discovery map + spotlight
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              Trend graphs + editorial signals
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              Curated modules for restaurants, cities, and chefs
            </div>
          </div>

          {/* ✅ This is what fixes the “middle gap” on desktop */}
          <LeftMidStack posts={posts} allTags={allTags} onOpenFeaturedAt={onOpenFeaturedAt} />
        </motion.div>

        {/* Right dashboard card */}
        <motion.div
          className="lg:col-span-7 relative"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            {...(floaty(0.15) || {})}
            className="hidden md:block absolute -left-6 top-8 w-[220px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur p-4 shadow-2xl text-white"
          >
            <div className="text-xs text-white/60 tracking-widest uppercase">Editorial</div>
            <div className="mt-2 text-sm font-semibold">Curated Features</div>
            <div className="mt-2 text-xs text-white/65 leading-relaxed">
              Latest launches and highlighted stories in a premium layout.
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-white/60">
              <span>Quality</span>
              <span className="text-[var(--gold)] font-medium">92%</span>
            </div>
          </motion.div>

          <motion.div
            {...(floaty(0.25) || {})}
            className="hidden md:block absolute -right-4 top-10 w-[220px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur p-4 shadow-2xl text-white"
          >
            <div className="text-xs text-white/60 tracking-widest uppercase">Signals</div>
            <div className="mt-2 text-sm font-semibold">Trend Lift</div>
            <div className="mt-2 text-xs text-white/65 leading-relaxed">
              Fast-moving cities, chefs, and restaurants gaining traction.
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-white/10 bg-black/25 p-2">
                <div className="text-white/55">Score</div>
                <div className="text-[var(--gold)] font-semibold">4.9</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 p-2">
                <div className="text-white/55">Lift</div>
                <div className="text-[var(--gold)] font-semibold">+18%</div>
              </div>
            </div>
          </motion.div>

          <div className="relative rounded-3xl border border-white/12 bg-white/5 backdrop-blur overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.55)] text-white">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <div className="text-xs text-white/70 tracking-wide">
                  The Culinary World Gazette
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs text-white/60">
                <span className="hover:text-[var(--gold)] transition cursor-default">Home</span>
                <span className="hover:text-[var(--gold)] transition cursor-default">Features</span>
                <span className="hover:text-[var(--gold)] transition cursor-default">Cities</span>
                <span className="hover:text-[var(--gold)] transition cursor-default">Chefs</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
              <img
                src="/images/hero.png"
                alt="Hero"
                className="block w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover object-center"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase border border-white/15 bg-black/25 px-3 py-1 rounded-full">
                  Editorial Overview
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                  Global Discovery.
                  <br />
                  <span className="text-white/85">Curated.</span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
                  
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenFeaturedAt(0)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition"
                  >
                    Open Featured Carousel <span aria-hidden>→</span>
                  </button>
                  <div className="hidden sm:flex items-center -space-x-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-7 w-7 rounded-full border border-white/15 bg-white/10"
                      />
                    ))}
                  </div>
                  <span className="hidden sm:block text-xs text-white/60"></span>
                </div>
              </div>
            </div>

            <div className="px-5 sm:px-6 pt-5">
              <KpiStrip postsCount={(posts || []).length} tagsCount={(allTags || []).length - 1} />
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4">
                <WorldMapModule />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <MiniChartCard
                    title="Story Velocity"
                    subtitle="Publishing rhythm & attention curve"
                    values={storyVelocity}
                    live
                  />
                  <MiniChartCard
                    title="City Momentum"
                    subtitle="Discovery interest by location"
                    values={cityMomentum}
                    live
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => onOpenFeaturedAt(0)}
                  className="group text-left rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60"
                  aria-label="Open latest featured carousel"
                >
                  <div className="h-28 w-full overflow-hidden">
                    <img
                      src={topFeatured?.frontmatter?.cover || "/images/hero.png"}
                      alt={topFeatured?.frontmatter?.title || "Featured"}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] text-white/60 tracking-widest uppercase">
                      Latest Featured
                    </div>
                    <div className="mt-1 text-sm font-semibold leading-snug text-white">
                      {(topFeatured?.frontmatter?.title || "Curated highlight") + " "}
                      <span className="text-[var(--gold)]">• Open carousel</span>
                    </div>
                    <div className="mt-2 text-xs text-white/60">
                      {topFeatured?.frontmatter?.date || "Updated weekly"}
                    </div>
                  </div>
                </button>

                <Link
                  href="#cities"
                  className="group rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition"
                >
                  <div className="h-28 w-full overflow-hidden">
                    <img
                      src="/images/hero.png"
                      alt="Top Cities"
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] text-white/60 tracking-widest uppercase">
                      Top Cities
                    </div>
                    <div className="mt-1 text-sm font-semibold leading-snug text-white">
                      Discovery heat by region
                    </div>
                    <div className="mt-2 text-xs text-white/60">Global coverage</div>
                  </div>
                </Link>

                <Link
                  href="/top-chefs"
                  className="group rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition"
                >
                  <div className="h-28 w-full overflow-hidden">
                    <img
                      src="/images/hero.png"
                      alt="Chef Spotlights"
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-[11px] text-white/60 tracking-widest uppercase">
                      Chef Spotlights
                    </div>
                    <div className="mt-1 text-sm font-semibold leading-snug text-white">
                      Profiles gaining traction
                    </div>
                    <div className="mt-2 text-xs text-white/60">Editorial picks</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <motion.div
            {...(floaty(0.35) || {})}
            className="hidden md:block absolute right-3 -bottom-5 w-[260px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur p-4 shadow-2xl text-white"
          >
            <div className="text-xs text-white/60 tracking-widest uppercase">Live Pulse</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                <div className="text-white/55">Coverage</div>
                <div className="mt-1 text-[var(--gold)] font-semibold text-lg">
                  {(allTags || []).length - 1}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                <div className="text-white/55">Articles</div>
                <div className="mt-1 text-[var(--gold)] font-semibold text-lg">
                  {(posts || []).length}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

      {renderProfessionalBookFlip()}
    </>
  );
}

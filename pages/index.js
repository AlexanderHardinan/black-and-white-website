// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles";
import AnimatedButton from "../components/AnimatedButton";
import { getAllPostsMeta } from "../lib/posts";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/* ---------------------------
   Inline dashboard modules
   (kept inside this file only)
---------------------------- */

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
  const h = 150;
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
          className="w-full h-[120px] sm:h-[140px]"
          role="img"
          aria-label={`${title} chart`}
        >
          <defs>
            <linearGradient id="areaGold" x1="0" x2="0" y1="0" y2="1">
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

          <path d={dArea} fill="url(#areaGold)" />
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

      <div className="mt-2 text-[11px] text-white/50">Editorial trend signal (demo)</div>
    </motion.div>
  );
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

/* ---------------------------
   Modal Carousel (Latest Featured)
---------------------------- */

function FeaturedModalCarousel({ open, onClose, items, startIndex = 0 }) {
  const [selected, setSelected] = useState(startIndex);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    []
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, emblaApi]);

  useEffect(() => {
    if (!open) return;
    if (!emblaApi) return;

    emblaApi.reInit();
    const safe = clamp(startIndex, 0, Math.max(0, (items?.length || 1) - 1));
    emblaApi.scrollTo(safe, true);

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [open, emblaApi, startIndex, items?.length]);

  const canRender = Array.isArray(items) && items.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Latest featured carousel"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-5xl rounded-3xl border border-white/12 bg-black/60 backdrop-blur shadow-[0_40px_120px_rgba(0,0,0,0.65)] overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-white/60 tracking-widest uppercase">
                    Latest Featured
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Editorial carousel
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                  aria-label="Close modal"
                >
                  Close
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {!canRender ? (
                  <div className="text-white/70 text-sm">No featured items available.</div>
                ) : (
                  <>
                    <div
                      ref={emblaRef}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-black/25"
                    >
                      <div className="flex">
                        {items.map((it, idx) => (
                          <div
                            key={it.slug || idx}
                            className="min-w-0 flex-[0_0_100%] px-0"
                          >
                            <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 sm:p-5">
                              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                                <img
                                  src={it.frontmatter?.cover || "/images/hero.png"}
                                  alt={it.frontmatter?.title || "Featured"}
                                  className="w-full h-[220px] sm:h-[280px] md:h-[340px] object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <div className="text-xs text-white/60 tracking-wider">
                                  {it.frontmatter?.date || "—"}
                                </div>

                                <div className="mt-2 text-2xl sm:text-3xl font-semibold text-white leading-tight">
                                  {it.frontmatter?.title || "Untitled"}
                                </div>

                                <p className="mt-3 text-white/75 text-sm sm:text-base leading-relaxed">
                                  {it.frontmatter?.excerpt || ""}
                                </p>

                                <div className="mt-5 flex flex-wrap items-center gap-3">
                                  <Link
                                    href={`/posts/${it.slug}`}
                                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                                    onClick={onClose}
                                  >
                                    Read article <span aria-hidden>→</span>
                                  </Link>

                                  <div className="text-xs text-white/50">
                                    {idx + 1} / {items.length}
                                  </div>
                                </div>

                                <div className="mt-auto pt-4">
                                  <div className="flex flex-wrap gap-2">
                                    {(it.frontmatter?.tags || []).slice(0, 5).map((t) => (
                                      <span
                                        key={t}
                                        className="text-[11px] px-2 py-1 rounded-full border border-white/10 bg-black/20 text-white/70"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => emblaApi?.scrollPrev()}
                          className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                          aria-label="Previous slide"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => emblaApi?.scrollNext()}
                          className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                          aria-label="Next slide"
                        >
                          Next
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {items.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            className={`h-2.5 w-2.5 rounded-full border transition ${
                              i === selected
                                ? "bg-[var(--gold)] border-[var(--gold)]"
                                : "bg-white/10 border-white/20 hover:border-[var(--gold)]/50"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-pressed={i === selected}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 text-[11px] text-white/50">
                      Tip: Use ← → arrow keys to navigate.
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Home({ posts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [featuredStartIndex, setFeaturedStartIndex] = useState(0);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const allTags = useMemo(() => {
    const t = new Set();
    (posts || []).forEach((p) =>
      (p.frontmatter?.tags || []).forEach((tag) => t.add(tag))
    );
    return ["All", ...Array.from(t)];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    return (posts || []).filter(({ frontmatter }) => {
      const title = (frontmatter?.title || "").toLowerCase();
      const excerpt = (frontmatter?.excerpt || "").toLowerCase();
      const tags = frontmatter?.tags || [];
      const matchQ = !q || title.includes(q) || excerpt.includes(q);
      const matchTag = activeTag === "All" || tags.includes(activeTag);
      return matchQ && matchTag;
    });
  }, [posts, query, activeTag]);

  const featuredItems = useMemo(() => (filtered || []).slice(0, 8), [filtered]);

  const openFeaturedModalAt = useCallback((index) => {
    setFeaturedStartIndex(clamp(index, 0, Math.max(0, (featuredItems?.length || 1) - 1)));
    setFeaturedOpen(true);
  }, [featuredItems?.length]);

  const closeFeaturedModal = useCallback(() => setFeaturedOpen(false), []);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  const floaty = (delay = 0) => ({
    initial: { opacity: 0, y: 10, scale: 0.98 },
    animate: {
      opacity: 1,
      y: [0, -6, 0],
      scale: 1,
      transition: { delay, duration: 4.8, repeat: Infinity, ease: "easeInOut" },
    },
  });

  const topFeatured = filtered?.[0];

  const storyVelocity = [18, 22, 19, 26, 29, 33, 30, 38, 42, 47, 45, 53];
  const cityMomentum = [9, 11, 12, 10, 14, 16, 18, 17, 20, 22, 24, 26];

  return (
    <>
      <Head>
        <title>The Culinary World Gazette</title>
        <meta
          name="description"
          content="Discover the best restaurants around the world — guides, reviews, and chef stories."
        />
      </Head>

      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(270deg, #000, #0b0b0b, #111, #0b0e10)",
          backgroundSize: "400% 400%",
        }}
      />

      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#CBA135" },
            move: { enable: true, speed: 0.55, direction: "top" },
            number: { value: 28, density: { enable: true, area: 900 } },
            opacity: { value: 0.38 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />

      <FeaturedModalCarousel
        open={featuredOpen}
        onClose={closeFeaturedModal}
        items={featuredItems}
        startIndex={featuredStartIndex}
      />

      <main className="relative z-10 pt-10 md:pt-14 text-white">
        {/* HERO */}
        <section className="container py-12 sm:py-14 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <motion.div
              className="lg:col-span-5"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full">
                Editorial Dashboard
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight tracking-[0.02em] text-white">
                Discover the <span style={{ color: "var(--gold)" }}>Best Restaurants</span>{" "}
                Worldwide
              </h1>

              <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl">
                A complete editorial control room—global map, trend graphs, and curated modules—
                presented as a premium dashboard landing page.
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
            </motion.div>

            <motion.div
              className="lg:col-span-7 relative"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                {...floaty(0.15)}
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
                {...floaty(0.25)}
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
                      World map insights, trend graphs, and curated modules—presented as a clean dashboard.
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => openFeaturedModalAt(0)}
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
                      <span className="hidden sm:block text-xs text-white/60">25+ Editors</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pt-5">
                  <KpiStrip
                    postsCount={(posts || []).length}
                    tagsCount={(allTags || []).length - 1}
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <WorldMapModule />

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
                  </div>

                  {/* DASHBOARD MODULE CARDS ROW */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => openFeaturedModalAt(0)}
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
                {...floaty(0.35)}
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

        {/* SEARCH + TAGS */}
        <section className="container">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 mb-6">
            <div className="grid gap-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search restaurants, cities, cuisines…"
                className="w-full rounded-lg border border-white/15 bg-black/20 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--gold)]"
                aria-label="Search posts"
              />

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-3 py-2 rounded-full text-sm border transition ${
                        activeTag === tag
                          ? "border-[var(--gold)] text-[var(--gold)] bg-black/20"
                          : "border-white/15 text-white/75 hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
                      }`}
                      aria-pressed={activeTag === tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {(query || activeTag !== "All") && (
                <div className="bg-black/80 border border-white/15 rounded-lg p-3 max-h-72 overflow-y-auto space-y-2">
                  {filtered.length > 0 ? (
                    filtered.slice(0, 10).map(({ slug, frontmatter }) => (
                      <Link
                        href={`/posts/${slug}`}
                        key={slug}
                        className="flex gap-3 items-center px-2 py-2 rounded hover:bg-white/10"
                      >
                        {frontmatter?.cover && (
                          <img
                            src={frontmatter.cover}
                            alt={frontmatter.title}
                            className="w-16 h-16 rounded object-cover flex-shrink-0"
                          />
                        )}
                        <div>
                          <span className="font-medium text-[var(--gold)]">
                            {frontmatter.title}
                          </span>
                          <div className="text-sm text-white/70 line-clamp-2">
                            {frontmatter.excerpt}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-white/60">No results found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* LATEST (REPLACED: now dashboard-style + opens modal carousel) */}
        <section id="latest" className="container py-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-[0.015em] text-white">
                Latest Features
              </h2>
              <div className="mt-1 text-sm text-white/60">
                Open the editorial carousel to browse latest stories.
              </div>
            </div>

            <button
              type="button"
              onClick={() => openFeaturedModalAt(0)}
              className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
            >
              Open Carousel →
            </button>
          </div>

          {/* Editorial tiles (click any to open modal at that index) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(featuredItems || []).slice(0, 6).map((it, idx) => (
              <button
                key={it.slug || idx}
                type="button"
                onClick={() => openFeaturedModalAt(idx)}
                className="group text-left rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60"
              >
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={it.frontmatter?.cover || "/images/hero.png"}
                    alt={it.frontmatter?.title || "Latest"}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-white/60 tracking-wider">
                    {it.frontmatter?.date || "—"}
                  </div>
                  <div className="mt-1 text-base font-semibold text-white leading-snug">
                    {it.frontmatter?.title || "Untitled"}
                  </div>
                  <div className="mt-2 text-sm text-white/70 line-clamp-2">
                    {it.frontmatter?.excerpt || ""}
                  </div>
                  <div className="mt-3 text-xs text-[var(--gold)] font-medium">
                    Open in carousel →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPostsMeta() } };
}

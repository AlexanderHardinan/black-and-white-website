// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles";
import AnimatedButton from "../components/AnimatedButton";
import { getAllPostsMeta } from "../lib/posts";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Home({ posts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Collect all unique tags
  const allTags = useMemo(() => {
    const t = new Set();
    (posts || []).forEach((p) =>
      (p.frontmatter?.tags || []).forEach((tag) => t.add(tag))
    );
    return ["All", ...Array.from(t)];
  }, [posts]);

  // Filter posts by search + tag
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

  // Embla carousel
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  // Motion helpers
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

  return (
    <>
      <Head>
        <title>The Culinary World Gazette</title>
        <meta
          name="description"
          content="Discover the best restaurants around the world — guides, reviews, and chef stories."
        />
      </Head>

      {/* Background */}
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

      {/* MAIN */}
      <main className="relative z-10 pt-10 md:pt-14">
        {/* DASHBOARD-EDITORIAL HERO (matches reference structure) */}
        <section className="container py-12 sm:py-14 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left editorial copy */}
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

              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight tracking-[0.02em]">
                Discover the <span style={{ color: "var(--gold)" }}>Best Restaurants</span>{" "}
                Worldwide
              </h1>

              <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl">
                A modern editorial control room—curated features, trend signals, and global
                discovery—presented in a clean dashboard layout.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <AnimatedButton href="#latest" variant="primary">
                  Explore Articles →
                </AnimatedButton>
                <AnimatedButton href="/about" variant="outline">
                  About
                </AnimatedButton>
              </div>

              {/* quick bullets like reference */}
              <div className="mt-6 space-y-2 text-sm text-white/70">
                <div className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Clean, modern editorial layout
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Trend + discovery signals
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Curated stories, chefs, and cities
                </div>
              </div>
            </motion.div>

            {/* Right: layered dashboard mock (hero) */}
            <motion.div
              className="lg:col-span-7 relative"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Floating side widgets (like reference panels) */}
              <motion.div
                {...floaty(0.15)}
                className="hidden md:block absolute -left-6 top-8 w-[220px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur p-4 shadow-2xl"
              >
                <div className="text-xs text-white/60 tracking-widest uppercase">
                  Modern Homes
                </div>
                <div className="mt-2 text-sm font-semibold">Curated Features</div>
                <div className="mt-2 text-xs text-white/65 leading-relaxed">
                  A clean feed of the latest editorial highlights and story launches.
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                  <span>Quality</span>
                  <span className="text-[var(--gold)] font-medium">92%</span>
                </div>
              </motion.div>

              <motion.div
                {...floaty(0.25)}
                className="hidden md:block absolute -right-4 top-10 w-[220px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur p-4 shadow-2xl"
              >
                <div className="text-xs text-white/60 tracking-widest uppercase">
                  Crafted
                </div>
                <div className="mt-2 text-sm font-semibold">Trend Signals</div>
                <div className="mt-2 text-xs text-white/65 leading-relaxed">
                  Spotlights on cities, chefs, and restaurants gaining traction.
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

              {/* Main “browser frame” dashboard (central layer) */}
              <div className="relative rounded-3xl border border-white/12 bg-white/5 backdrop-blur overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
                {/* top bar like a web app */}
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

                {/* hero image + overlay title (like reference) */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
                  <img
                    src="/images/hero.png"
                    alt="Hero"
                    className="block w-full h-[240px] sm:h-[280px] md:h-[320px] object-cover object-center"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <div className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase border border-white/15 bg-black/25 px-3 py-1 rounded-full">
                      Editorial Overview
                    </div>
                    <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                      Discover Your Space.
                      <br />
                      <span className="text-white/85">Redefined.</span>
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
                      A modern editorial dashboard: featured content, discovery signals, and
                      curated highlights—built for a clean premium experience.
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href="#latest"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition"
                      >
                        Explore Latest
                        <span aria-hidden>→</span>
                      </a>
                      <div className="hidden sm:flex items-center -space-x-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <span
                            key={i}
                            className="h-7 w-7 rounded-full border border-white/15 bg-white/10"
                          />
                        ))}
                      </div>
                      <span className="hidden sm:block text-xs text-white/60">
                        25+ Editors
                      </span>
                    </div>
                  </div>
                </div>

                {/* bottom module cards row (like reference) */}
                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Featured Restaurant",
                        subtitle: topFeatured?.frontmatter?.title || "Curated highlight",
                        meta: topFeatured?.frontmatter?.date || "Updated weekly",
                        cover: topFeatured?.frontmatter?.cover || "/images/hero.png",
                        href: topFeatured ? `/posts/${topFeatured.slug}` : "#latest",
                      },
                      {
                        title: "Top Cities",
                        subtitle: "Discovery heat by region",
                        meta: "Global coverage",
                        cover: "/images/hero.png",
                        href: "#cities",
                      },
                      {
                        title: "Chef Spotlights",
                        subtitle: "Profiles gaining traction",
                        meta: "Editorial picks",
                        cover: "/images/hero.png",
                        href: "/top-chefs",
                      },
                    ].map((c) => (
                      <Link
                        key={c.title}
                        href={c.href}
                        className="group rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition"
                      >
                        <div className="h-28 w-full overflow-hidden">
                          <img
                            src={c.cover}
                            alt={c.title}
                            className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-[11px] text-white/60 tracking-widest uppercase">
                            {c.title}
                          </div>
                          <div className="mt-1 text-sm font-semibold leading-snug">
                            {c.subtitle}
                          </div>
                          <div className="mt-2 text-xs text-white/60">
                            {c.meta}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* small KPI strip (bottom-right like reference) */}
              <motion.div
                {...floaty(0.35)}
                className="hidden md:block absolute right-3 -bottom-5 w-[260px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur p-4 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                    <div className="text-white/55">Engagement</div>
                    <div className="mt-1 text-[var(--gold)] font-semibold text-lg">
                      92%
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                    <div className="text-white/55">Signals</div>
                    <div className="mt-1 text-[var(--gold)] font-semibold text-lg">
                      3×
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SEARCH + TAGS + RESULTS (kept, just visually consistent) */}
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

        {/* LATEST (kept) */}
        <section id="latest" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6 tracking-[0.015em]">
            Latest Features
          </h2>

          {filtered.length > 0 && (
            <Link href={`/posts/${filtered[0].slug}`} className="group block mb-10">
              <article className="grid md:grid-cols-2 gap-6 items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-6">
                <img
                  src={filtered[0].frontmatter.cover}
                  alt={filtered[0].frontmatter.title}
                  className="rounded-xl h-[280px] w-full object-cover"
                />
                <div>
                  <div className="text-xs text-white/70 tracking-wider">
                    {filtered[0].frontmatter.date}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold group-hover:text-[var(--gold)] transition tracking-wide">
                    {filtered[0].frontmatter.title}
                  </h3>
                  <p className="mt-2 text-white/80">{filtered[0].frontmatter.excerpt}</p>
                  <div className="mt-4">
                    <span className="text-[var(--gold)] font-semibold">Read more →</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(1).map(({ slug, frontmatter }) => (
              <Link href={`/posts/${slug}`} key={slug} className="group block">
                <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden hover:translate-y-[-4px] transition p-4">
                  <img
                    src={frontmatter.cover}
                    alt={frontmatter.title}
                    className="rounded-lg h-48 w-full object-cover mb-3"
                  />
                  <div className="text-xs text-white/60 tracking-wider">{frontmatter.date}</div>
                  <h4 className="mt-1 font-semibold group-hover:text-[var(--gold)] transition tracking-wide">
                    {frontmatter.title}
                  </h4>
                  <p className="text-white/80 text-sm mt-1 tracking-[0.01em]">
                    {frontmatter.excerpt}
                  </p>
                </article>
              </Link>
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

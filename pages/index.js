// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles";
import AnimatedButton from "../components/AnimatedButton";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { getAllPostsMeta } from "../lib/posts";
import { NAV_LINKS } from "../lib/nav";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Home({ posts }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  // tsParticles init
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Build unique tags
  const allTags = useMemo(() => {
    const t = new Set();
    (posts || []).forEach((p) =>
      (p.frontmatter?.tags || []).forEach((tag) => t.add(tag))
    );
    return ["All", ...Array.from(t)];
  }, [posts]);

  // Filter posts
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

  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

  // Tag carousel
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <>
      <Head>
        <title>The Culinary World Gazette</title>
        <meta
          name="description"
          content="Discover the best restaurants around the world — guides, reviews, and chef stories."
        />
      </Head>

      {/* Animated background */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(270deg, #000, #111, #CBA135, #0b0b0b)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Particles behind content */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#CBA135" },
            move: { enable: true, speed: 0.6, direction: "top" },
            number: { value: 35, density: { enable: true, area: 800 } },
            opacity: { value: 0.45 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold tracking-wide">The Culinary World Gazette</span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm text-white/80 tracking-wide">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[var(--gold)]">
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden rounded-md px-3 py-2 border border-white/15 hover:border-[var(--gold)]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <Sidebar open={menuOpen} setOpen={setMenuOpen} />

      {/* MAIN */}
      <main className="relative z-10 pt-10 md:pt-16">
        {/* HERO */}
        <section className="container py-14 sm:py-16 md:py-20 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span
              className="inline-block text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full"
              variants={fadeUp}
            >
              Article on the Global Restaurant Industry
            </motion.span>

            <motion.h2
              className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-[0.02em] break-words"
              variants={fadeUp}
            >
              Discover the <span style={{ color: "var(--gold)" }}>Best Restaurants</span> Worldwide
            </motion.h2>

            <motion.p className="mt-4 text-lg text-white/80 max-w-xl" variants={fadeUp}>
              From Michelin-starred dining rooms to hidden street cafés — our editors curate the world’s most exciting places to eat.
            </motion.p>

            <motion.div className="mt-6 flex gap-3" variants={fadeUp}>
              <AnimatedButton href="#latest" variant="primary">Explore Articles →</AnimatedButton>
            </motion.div>
          </motion.div>

          {/* HERO IMAGE — robust rendering on small screens */}
          <motion.div
            className="relative rounded-2xl overflow-hidden card aspect-[16/10] md:aspect-[4/3] bg-black/20"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/hero.png"
              alt="Hero"
              loading="eager"
              decoding="async"
              className="block w-full h-[220px] sm:h-[280px] md:h-[420px] object-cover object-center"
              onError={(e) => {
                // graceful fallback if the file path is wrong or missing
                e.currentTarget.style.display = "none";
                const ph = e.currentTarget.parentElement.querySelector(".hero-fallback");
                if (ph) ph.style.display = "block";
              }}
            />
            <div
              className="hero-fallback hidden absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 40%, rgba(203,161,53,0.18) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.9) 100%)",
              }}
            />
          </motion.div>
        </section>

        {/* SEARCH + TAGS + RESULTS */}
        <section className="container">
          <div className="card p-5 mb-6">
            <div className="grid gap-4">
              {/* Search input */}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search restaurants, cities, cuisines…"
                className="w-full rounded-lg border border-white/15 bg-black/20 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--gold)]"
                aria-label="Search posts"
              />

              {/* Tag carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-3 py-2 rounded-full text-sm border transition ${
                        activeTag === tag
                          ? "border-[var(--gold)] text-[var(--gold)]"
                          : "border-white/30 text-white/70 hover:border-white/50"
                      }`}
                      aria-pressed={activeTag === tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results dropdown */}
              {(query || activeTag !== "All") && (
                <div className="bg-black/80 border border-white/15 rounded-lg p-3 max-h-72 overflow-y-auto space-y-2">
                  {filtered.length > 0 ? (
                    filtered.slice(0, 10).map(({ slug, frontmatter }) => (
                      <Link
                        href={`/posts/${slug}`}
                        key={slug}
                        className="flex gap-3 items-center px-2 py-2 rounded hover:bg-white/10"
                      >
                        {frontmatter?.cover ? (
                          <img
                            src={frontmatter.cover}
                            alt={frontmatter.title}
                            className="w-16 h-16 rounded object-cover flex-shrink-0"
                          />
                        ) : null}
                        <div>
                          <span className="font-medium text-[var(--gold)]">{frontmatter.title}</span>
                          <div className="text-sm text-white/70 line-clamp-2">{frontmatter.excerpt}</div>
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

        {/* LATEST */}
        <section id="latest" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6 tracking-[0.015em]">Latest Features</h2>

          {filtered[0] && (
            <Link href={`/posts/${filtered[0].slug}`} className="group">
              <article className="grid md:grid-cols-2 gap-6 items-center card p-4 md:p-6 mb-10">
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
              <Link href={`/posts/${slug}`} key={slug} className="group">
                <article className="card overflow-hidden hover:translate-y-[-4px] transition p-4">
                  <img
                    src={frontmatter.cover}
                    alt={frontmatter.title}
                    className="rounded-lg h-48 w-full object-cover mb-3"
                  />
                  <div className="text-xs text-white/60 tracking-wider">{frontmatter.date}</div>
                  <h4 className="mt-1 font-semibold group-hover:text-[var(--gold)] transition tracking-wide">
                    {frontmatter.title}
                  </h4>
                  <p className="text-white/80 text-sm mt-1 tracking-[0.01em]">{frontmatter.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPostsMeta() } };
}

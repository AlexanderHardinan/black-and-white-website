// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import AnimatedButton from "../components/AnimatedButton";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { getAllPostsMeta } from "../lib/posts";
import { NAV_LINKS } from "../lib/nav";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Home({ posts }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const particlesInit = async (engine) => {
    await loadFull(engine);
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  // Embla carousel with autoplay
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
          background:
            "linear-gradient(270deg, #000, #111, #CBA135, #0b0b0b)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Champagne particles */}
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
            <span className="font-bold tracking-wide">
              The Culinary World Gazette
            </span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm text-white/80 tracking-wide">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[var(--gold)]"
              >
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

      <main className="relative z-10 pt-10 md:pt-16">
        {/* HERO */}
        <section className="container py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span
              className="inline-block text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full"
              variants={fadeUp}
            >
              Article on the Global Restaurant Industry
            </motion.span>

            <motion.h2
              className="mt-5 text-5xl md:text-6xl font-extrabold leading-tight tracking-[0.02em]"
              variants={fadeUp}
            >
              Discover the{" "}
              <span style={{ color: "var(--gold)" }}>Best Restaurants</span>{" "}
              Worldwide
            </motion.h2>

            <motion.p
              className="mt-4 text-lg text-white/80 max-w-xl"
              variants={fadeUp}
            >
              From Michelin-starred dining rooms to hidden street cafés — our
              editors curate the world’s most exciting places to eat.
            </motion.p>

            <motion.div className="mt-6 flex gap-3" variants={fadeUp}>
              <AnimatedButton href="#latest" variant="primary">
                Explore Articles{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </AnimatedButton>
              <AnimatedButton href="#about" variant="outline">
                About
              </AnimatedButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden card aspect-[16/10] md:aspect-[4/3]"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/hero.png"
              className="w-full h-[420px] object-cover"
              alt="Hero"
            />
          </motion.div>
        </section>

        {/* SEARCH + TAGS */}
        <section className="container">
          <div className="card p-5 mb-6">
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search restaurants, cities, cuisines…"
                className="md:col-span-2 w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--gold)]"
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
                          ? "border-[var(--gold)] text-[var(--gold)]"
                          : "border-black text-black hover:border-gray-700"
                      }`}
                      aria-pressed={activeTag === tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rest of the file unchanged ... */}
        {/* Keep Latest, Cities, About, Filters, Footer as they are */}
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPostsMeta() } };
}

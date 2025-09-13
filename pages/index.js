// pages/index.js
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useMemo, useState } from "react";
import AnimatedButton from "../components/AnimatedButton";
import { getAllPostsMeta } from "../lib/posts"; // relative path (works on Vercel)

export default function Home({ posts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const particlesInit = async (engine) => { await loadFull(engine); };

  // Build unique tag list from frontmatter
  const allTags = useMemo(() => {
    const t = new Set();
    (posts || []).forEach(p => (p.frontmatter?.tags || []).forEach(tag => t.add(tag)));
    return ["All", ...Array.from(t)];
  }, [posts]);

  // Client-side filter by query + tag
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
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: .8 } } };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: .12 } } };

  return (
    <>
      <Head><title>The Culinary World Gazette</title></Head>

      {/* Animated luxury gradient bg */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ background: "linear-gradient(270deg, #000, #111, #CBA135, #0b0b0b)", backgroundSize: "400% 400%" }}
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
            move: { enable: true, speed: .6, direction: "top" },
            number: { value: 35, density: { enable: true, area: 800 } },
            opacity: { value: 0.45 },
            size: { value: { min: 1, max: 3 } },
          }
        }}
      />

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="The Culinary World Gazette logo"
              width={100}
              height={100}
              className="h-20 w-auto"
              priority
            />
            <span className="font-bold tracking-wide">The Culinary World Gazette</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-white/80 tracking-wide">
            <a href="#latest" className="hover:text-[var(--gold)]">Latest</a>
            <a href="#cities" className="hover:text-[var(--gold)]">Cities</a>
            <a href="#about" className="hover:text-[var(--gold)]">About</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="container py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span className="inline-block text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full" variants={fadeUp}>
              Global Restaurant Review
            </motion.span>
            <motion.h2 className="mt-5 text-5xl md:text-6xl font-extrabold leading-tight tracking-[0.02em]" variants={fadeUp}>
              Discover the <span style={{ color: "var(--gold)" }}>Best Restaurants</span> Worldwide
            </motion.h2>
            <motion.p className="mt-4 text-lg text-white/80 max-w-xl" variants={fadeUp}>
              From Michelin-starred dining rooms to hidden street cafés — our editors curate the world’s most exciting places to eat.
            </motion.p>
            <motion.div className="mt-6 flex gap-3" variants={fadeUp}>
              <AnimatedButton href="#latest" variant="primary">
                Explore Articles <span className="transition-transform group-hover:translate-x-1">→</span>
              </AnimatedButton>
              <AnimatedButton href="#about" variant="outline">
                About
              </AnimatedButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="rounded-2xl overflow-hidden card"
            initial={{ opacity: 0, scale: .92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src="/images/hero.jpg" className="w-full h-[420px] object-cover" alt="Hero" />
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
              />
              <div className="flex gap-2 overflow-x-auto">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-3 py-2 rounded-full text-sm border transition ${
                      activeTag === tag ? "border-[var(--gold)] text-[var(--gold)]" : "border-white/15 text-white/80"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LATEST (filtered) */}
        <section id="latest" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">Latest Features</h2>

          {/* Featured first */}
          {filtered[0] && (
            <Link href={`/posts/${filtered[0].slug}`} className="group">
              <article className="grid md:grid-cols-2 gap-6 items-center card p-4 md:p-6 mb-10">
                <img src={filtered[0].frontmatter.cover} alt={filtered[0].frontmatter.title} className="rounded-xl h-[280px] w-full object-cover" />
                <div>
                  <div className="text-xs text-white/70 tracking-wider">{filtered[0].frontmatter.date}</div>
                  <h3 className="mt-2 text-2xl font-bold group-hover:text-[var(--gold)] transition tracking-wide">{filtered[0].frontmatter.title}</h3>
                  <p className="mt-2 text-white/80">{filtered[0].frontmatter.excerpt}</p>
                  <div className="mt-4"><span className="text-[var(--gold)] font-semibold">Read more →</span></div>
                </div>
              </article>
            </Link>
          )}

          {/* Grid for rest */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(1).map(({ slug, frontmatter }) => (
              <Link href={`/posts/${slug}`} key={slug} className="group">
                <article className="card overflow-hidden hover:translate-y-[-4px] transition p-4">
                  <img src={frontmatter.cover} alt={frontmatter.title} className="rounded-lg h-48 w-full object-cover mb-3" />
                  <div className="text-xs text-white/60 tracking-wider">{frontmatter.date}</div>
                  <h4 className="mt-1 font-semibold group-hover:text-[var(--gold)] transition tracking-wide">{frontmatter.title}</h4>
                  <p className="text-white/80 text-sm mt-1 tracking-[0.01em]">{frontmatter.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <p className="text-white/70">No posts match your search/filter.</p>
          )}
        </section>

        {/* CITIES (static pill list for now) */}
        <section id="cities" className="container py-16">
          <h2 className="text-2xl font-semibold mb-6">Browse by City</h2>
          <div className="flex flex-wrap gap-3">
            {["Paris","Tokyo","Bangkok","New York","Dubai","Copenhagen","Pattaya"].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full border border-white/15 text-sm text-white/80">{tag}</span>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="container py-16">
          <div className="card p-6">
            <h3 className="text-xl font-semibold tracking-wide">About The Gazette</h3>
            <p className="text-white/80 mt-2">
              <b>The Culinary World Gazette</b> is a design-forward restaurant blog celebrating craftsmanship and flavor. We spotlight dining rooms, pastry labs, and coffee bars that care about details.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 mt-10">
        <div className="container py-8 text-sm text-white/70">
          © {new Date().getFullYear()} The Culinary World Gazette
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPostsMeta() } };
}

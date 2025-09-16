// pages/index.js
import Head from "next/head";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";

import AnimatedButton from "../components/AnimatedButton";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { getAllPostsMeta } from "../lib/posts";
import { NAV_LINKS } from "../lib/nav";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home({ posts }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { t } = useTranslation("common");

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <>
      <Head>
        <title>{t("title")}</title>
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
          background:
            "linear-gradient(270deg, #000, #111, #CBA135, #0b0b0b)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Particles */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
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
          <a href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold tracking-wide">{t("title")}</span>
          </a>

          <nav className="hidden md:flex gap-6 text-sm text-white/80 tracking-wide">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[var(--gold)]">
                {l.label}
              </a>
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
              {t("heroBadge")}
            </motion.span>

            <motion.h2
              className="mt-5 text-5xl md:text-6xl font-extrabold leading-tight tracking-[0.02em]"
              variants={fadeUp}
            >
              {t("heroText")}{" "}
              <span style={{ color: "var(--gold)" }}>Worldwide</span>
            </motion.h2>

            <motion.p
              className="mt-4 text-lg text-white/80 max-w-xl"
              variants={fadeUp}
            >
              {t("heroDescription")}
            </motion.p>

            {/* Primary buttons */}
            <motion.div className="mt-6 flex gap-3" variants={fadeUp}>
              <AnimatedButton href="#latest" variant="primary">
                {t("exploreArticles")} →
              </AnimatedButton>
              <AnimatedButton href="/about" variant="outline">
                {t("about")}
              </AnimatedButton>
            </motion.div>

            {/* Translation dropdown */}
            <motion.div
              className="relative mt-6"
              variants={fadeUp}
              ref={dropdownRef}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 text-white text-sm px-4 py-2 font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                🌐 {t("selectLanguage") || "Language"}
              </button>

              {dropdownOpen && (
                <div className="absolute mt-2 w-44 rounded-lg border border-white/10 bg-black/90 shadow-xl overflow-hidden z-50 flex flex-col text-sm">
                  {[
                    { code: "en", label: "English" },
                    { code: "ar", label: "العربية" },
                    { code: "th", label: "ไทย" },
                    { code: "zh", label: "中文" },
                    { code: "ja", label: "日本語" },
                    { code: "ko", label: "한국어" },
                    { code: "ru", label: "Русский" },
                  ].map(({ code, label }) => (
                    <div
                      key={code}
                      onClick={() => setDropdownOpen(false)} // auto-close
                    >
                      <AnimatedButton href="/" locale={code} variant="outline">
                        {label}
                      </AnimatedButton>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Search + Tags + Results */}
            <motion.div className="mt-8 max-w-lg space-y-4" variants={fadeUp}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-lg border border-white/15 bg-black/20 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--gold)]"
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
                          : "border-black text-black hover:border-gray-700"
                      }`}
                      aria-pressed={activeTag === tag}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results */}
              {(query || activeTag !== "All") && (
                <div className="bg-black/80 border border-white/15 rounded-lg p-3 max-h-72 overflow-y-auto space-y-2">
                  {filtered.length > 0 ? (
                    filtered.map(({ slug, frontmatter }) => (
                      <a
                        href={`/posts/${slug}`}
                        key={slug}
                        className="flex gap-3 items-center px-2 py-2 rounded hover:bg-white/10"
                      >
                        {frontmatter.cover && (
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
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-white/60">{t("noResults")}</p>
                  )}
                </div>
              )}
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

        {/* Other sections remain unchanged */}
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      posts: getAllPostsMeta(),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

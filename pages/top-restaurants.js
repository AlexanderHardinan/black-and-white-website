// pages/top-restaurants.js
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAllPostsMeta } from "../lib/posts";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function TopRestaurants({ posts }) {
  return (
    <>
      <Head>
        <title>Top Restaurants — The Culinary World Gazette</title>
        <meta
          name="description"
          content="Curated picks and destination dining — updated as we eat our way around the world."
        />
      </Head>

      {/* Sticky header */}
      <header className="border-b border-white/10 bg-[var(--bg)]/70 backdrop-blur sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-white/80 hover:text-[var(--gold)] transition"
          >
            ← Home
          </Link>
          <div className="text-sm text-white/60 tracking-widest uppercase">Top Restaurants</div>
        </div>
      </header>

      <main className="container py-10 sm:py-12 text-white">
        {/* Page Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full">
            Gazette Selection
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Top <span className="text-[var(--gold)]">Restaurants</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            Curated destinations defined by craft, consistency, and culinary identity — updated as
            the Gazette continues its global search.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/top-chefs"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
            >
              Meet the Chefs <span aria-hidden>→</span>
            </Link>

            {/* CHANGED: route to Contact page (main contact form entry) */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
            >
              Suggest a Destination <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>

        {/* Content shell */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="rounded-3xl border border-white/12 bg-white/5 backdrop-blur overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        >
          <div className="px-5 sm:px-7 py-5 border-b border-white/10 flex items-center justify-between gap-4">
            <div className="text-xs text-white/60 tracking-widest uppercase">Curated List</div>
            <div className="text-xs text-white/60">{posts?.length || 0} entries</div>
          </div>

          <div className="p-5 sm:p-7">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-6 text-center">
                <div className="text-sm text-white/80">We’re preparing this list.</div>
                <div className="mt-2 text-xs text-white/60">Check back soon for new selections.</div>
                <div className="mt-5">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                  >
                    <span aria-hidden>←</span> Back to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {posts.map(({ slug, frontmatter }, idx) => (
                  <motion.div
                    key={slug}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: Math.min(0.25, idx * 0.03),
                    }}
                  >
                    <Link href={`/posts/${slug}`} className="group block">
                      <article className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition">
                        {/* Cover */}
                        <div className="relative h-48 w-full overflow-hidden border-b border-white/10 bg-black/20">
                          <Image
                            src={frontmatter.cover || "/images/hero.png"}
                            alt={frontmatter.title || "Restaurant"}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                          <div className="absolute left-4 top-4 inline-flex items-center gap-2 text-[10px] tracking-widest uppercase border border-white/15 bg-black/30 px-3 py-1 rounded-full text-white/80">
                            Gazette Pick
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="text-[11px] text-white/60 tracking-widest uppercase">
                            {frontmatter.date || "—"}
                          </div>

                          <h3 className="mt-2 font-semibold text-lg text-white tracking-[0.015em] leading-snug group-hover:text-[var(--gold)] transition">
                            {frontmatter.title}
                          </h3>

                          {frontmatter.excerpt && (
                            <p className="text-sm text-white/70 mt-3 leading-relaxed line-clamp-3">
                              {frontmatter.excerpt}
                            </p>
                          )}

                          <div className="mt-5 text-xs text-[var(--gold)] font-medium">
                            Read feature →
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
              >
                <span aria-hidden>←</span> Back to Homepage
              </Link>

              <Link
                href="/top-chefs"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
              >
                Meet the Chefs <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const all = getAllPostsMeta();
  const posts = all.filter(({ frontmatter }) => {
    const t = (frontmatter?.title || "").toLowerCase();
    const tags = (frontmatter?.tags || []).map((x) => x.toLowerCase());
    return (
      t.includes("top") ||
      t.includes("best") ||
      tags.includes("top restaurants") ||
      tags.includes("best restaurant")
    );
  });

  return { props: { posts } };
}

import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { getAllPostsMeta } from "../lib/posts";

export default function Home({ posts }) {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  // Animation presets
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <>
      <Head>
        <title>The Culinary World Gazette</title>
      </Head>

      {/* Gradient background */}
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

      {/* Gold particles */}
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

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">The World Culinary Gazette</h1>
          <nav className="hidden md:flex gap-6 text-sm text-white/80">
            <a href="#latest" className="hover:text-[var(--gold)]">Latest</a>
            <a href="#cities" className="hover:text-[var(--gold)]">Cities</a>
            <a href="#about" className="hover:text-[var(--gold)]">About</a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10">
        {/* HERO */}
        <section className="container py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span
              className="inline-block text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full"
              variants={fadeUp}
            >
              Global Restaurant Blog
            </motion.span>
            <motion.h2
              className="mt-5 text-5xl md:text-6xl font-extrabold leading-tight"
              variants={fadeUp}
            >
              Discover the <span style={{ color: "var(--gold)" }}>Best Restaurants</span> Worldwide
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-white/80 max-w-xl"
              variants={fadeUp}
            >
              From Michelin-starred dining rooms to hidden street cafés —
              our editors curate the world’s most exciting places to eat.
            </motion.p>
            <motion.div className="mt-6 flex gap-3" variants={fadeUp}>
              <a href="#latest" className="btn btn-primary">
                Explore Articles
              </a>
              <a href="#about" className="btn border border-white/20">
                About
              </a>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            className="rounded-2xl overflow-hidden card"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/hero.jpg"
              className="w-full h-[420px] object-cover"
              alt="Hero"
            />
          </motion.div>
        </section>

        {/* LATEST POSTS */}
        <section id="latest" className="container py-12">
          <h2 className="text-2xl font-semibold mb-6">Latest Features</h2>

          {/* Featured post (first one) */}
          {posts[0] && (
            <Link href={`/posts/${posts[0].slug}`} className="group">
              <article className="grid md:grid-cols-2 gap-6 items-center card p-4 md:p-6 mb-10">
                <img
                  src={posts[0].frontmatter.cover}
                  alt={posts[0].frontmatter.title}
                  className="rounded-xl h-[280px] w-full object-cover"
                />
                <div>
                  <div className="text-xs text-white/70">
                    {posts[0].frontmatter.date}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold group-hover:text-[var(--gold)] transition">
                    {posts[0].frontmatter.title}
                  </h3>
                  <p className="mt-2 text-white/80">
                    {posts[0].frontmatter.excerpt}
                  </p>
                  <div className="mt-4">
                    <span className="text-[var(--gold)] font-semibold">
                      Read more →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Grid for rest */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map(({ slug, frontmatter }) => (
              <Link href={`/posts/${slug}`} key={slug} className="group">
                <article className="card overflow-hidden hover:translate-y-[-4px] transition p-4">
                  <img
                    src={frontmatter.cover}
                    alt={frontmatter.title}
                    className="rounded-lg h-48 w-full object-cover mb-3"
                  />
                  <div className="text-xs text-white/60">
                    {frontmatter.date}
                  </div>
                  <h4 className="mt-1 font-semibold group-hover:text-[var(--gold)] transition">
                    {frontmatter.title}
                  </h4>
                  <p className="text-white/80 text-sm mt-1">
                    {frontmatter.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="container py-16">
          <div className="card p-6">
            <h3 className="text-xl font-semibold">About The Gazette</h3>
            <p className="text-white/80 mt-2">
              <b>The Culinary World Gazette</b> is your guide to fine dining,
              street food gems, and global food culture. We spotlight
              restaurants that define creativity, passion, and taste.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
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

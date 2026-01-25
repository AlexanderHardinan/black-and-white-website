// pages/about.js
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <>
      <Head>
        <title>About | The Culinary World Gazette</title>
        <meta
          name="description"
          content="Mission, vision, values, and promise of The Culinary World Gazette."
        />
      </Head>

      <main className="relative z-10 text-white">
        <section className="container py-12 sm:py-14 md:py-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-white/10 border border-white/10 px-3 py-1 rounded-full">
              About
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              About{" "}
              <span className="text-[var(--gold)]">The Culinary World Gazette</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed">
              A curated guide to the world’s most remarkable dining—built on craft, integrity,
              and discovery.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <AnimatedButton href="/top-restaurants" variant="primary">
                Explore Top Restaurants →
              </AnimatedButton>
              <AnimatedButton href="/top-chefs" variant="outline">
                Meet the Chefs
              </AnimatedButton>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="rounded-3xl border border-white/12 bg-white/5 backdrop-blur overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          >
            <div className="px-5 sm:px-7 py-5 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="text-xs text-white/60 tracking-widest uppercase">
                Editorial Standard
              </div>
              <div className="text-xs text-white/60">
                Built for a premium, modern experience
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
                {/* Left: mission/vision */}
                <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-5 sm:p-6">
                  <div className="prose prose-invert max-w-none">
                    <h2 className="text-[var(--gold)]">Mission</h2>
                    <p>
                      To discover, recognize, and share the world’s best restaurants and
                      chefs—guiding travelers and diners to unforgettable culinary experiences.
                    </p>

                    <h2 className="text-[var(--gold)]">Vision</h2>
                    <p>
                      To become the most trusted global voice in gastronomy, where every reader
                      finds inspiration to explore new flavors, cultures, and destinations
                      through food.
                    </p>
                  </div>
                </div>

                {/* Right: values + promise */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-5 sm:p-6">
                    <div className="text-xs text-white/60 tracking-widest uppercase">
                      Values
                    </div>

                    <div className="mt-4 space-y-3 text-sm text-white/75 leading-relaxed">
                      <div className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                        <div>
                          <span className="font-semibold text-white">Excellence:</span>{" "}
                          We highlight chefs and restaurants that set the highest standards in
                          taste, craft, and service.
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                        <div>
                          <span className="font-semibold text-white">Discovery:</span>{" "}
                          We uncover hidden gems and celebrated icons, giving readers authentic
                          insight into where the world eats best.
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                        <div>
                          <span className="font-semibold text-white">Inspiration:</span>{" "}
                          We aim to inspire journeys—whether across the globe or within one’s own
                          city—through food and culture.
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                        <div>
                          <span className="font-semibold text-white">Integrity:</span>{" "}
                          Every recommendation is based on genuine quality and culinary merit, not
                          trends or hype.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur p-5 sm:p-6">
                    <div className="text-xs text-white/60 tracking-widest uppercase">
                      Our Promise
                    </div>
                    <p className="mt-3 text-sm text-white/75 leading-relaxed">
                      The Culinary World Gazette is more than a guide—it is a curated experience.
                      Each article connects readers to the people, places, and stories that define
                      the future of dining.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                      >
                        <span aria-hidden>←</span> Back to Homepage
                      </Link>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                      >
                        Contact <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-[11px] text-white/50">
                This page follows the same dark/glass dashboard visual language as the landing.
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

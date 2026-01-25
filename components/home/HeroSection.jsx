// components/home/HeroSection.jsx
import { motion } from "framer-motion";
import AnimatedButton from "../AnimatedButton";

export default function HeroSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
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
  );
}

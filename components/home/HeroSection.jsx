// components/home/HeroSection.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedButton from "../AnimatedButton";

export default function HeroSection() {
  const [bookPop, setBookPop] = useState(null);
  const bookTimerRef = useRef(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    return () => {
      if (bookTimerRef.current) {
        window.clearTimeout(bookTimerRef.current);
      }
    };
  }, []);

  function triggerOpeningBook(event) {
    const target = event.target instanceof Element ? event.target : null;
    const clickable = target?.closest("a, button");

    if (!clickable) {
      return;
    }

    const rect = clickable.getBoundingClientRect();
    const id = Date.now();

    if (bookTimerRef.current) {
      window.clearTimeout(bookTimerRef.current);
    }

    setBookPop({
      id,
      x: event.clientX || rect.left + rect.width / 2,
      y: event.clientY || rect.top + rect.height / 2,
    });

    bookTimerRef.current = window.setTimeout(() => {
      setBookPop((current) => (current?.id === id ? null : current));
    }, 900);
  }

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

      <div className="mt-6 flex flex-wrap gap-3" onClickCapture={triggerOpeningBook}>
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

      <AnimatePresence>
        {bookPop ? (
          <motion.div
            key={bookPop.id}
            className="pointer-events-none fixed z-[2147483647]"
            style={{
              left: bookPop.x,
              top: bookPop.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.35, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.65, y: -18 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <motion.div
              className="relative h-16 w-20"
              initial={{ rotate: -4 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 4 }}
            >
              <motion.span
                className="absolute left-1/2 top-1/2 h-12 w-8 origin-left rounded-l-md border border-white/40 bg-gradient-to-br from-[var(--gold)] to-amber-600 shadow-2xl"
                style={{ transform: "translate(-100%, -50%)" }}
                initial={{ rotateY: 88 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: -60 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
              />

              <motion.span
                className="absolute left-1/2 top-1/2 h-12 w-8 origin-left rounded-r-md border border-white/40 bg-gradient-to-br from-amber-300 to-[var(--gold)] shadow-2xl"
                style={{ transform: "translate(0, -50%)" }}
                initial={{ rotateY: -88 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: 60 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
              />

              {[0, 1, 2].map((page) => (
                <motion.span
                  key={page}
                  className="absolute left-1/2 top-1/2 h-10 w-[2px] rounded-full bg-white/80"
                  style={{ transformOrigin: "bottom center" }}
                  initial={{
                    opacity: 0,
                    rotate: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    rotate: [-18 + page * 18, 0 + page * 14, 18 + page * 12],
                    x: [-4 + page * 4, page * 2],
                    y: [-8 - page * 4, -24 - page * 8],
                  }}
                  transition={{
                    duration: 0.68,
                    delay: page * 0.06,
                    ease: "easeOut",
                  }}
                />
              ))}

              <motion.span
                className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.9)]"
                style={{ transform: "translate(-50%, -50%)" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.7, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.72, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
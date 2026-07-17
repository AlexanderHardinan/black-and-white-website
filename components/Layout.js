// components/Layout.js
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { NAV_LINKS } from "../lib/nav";

export default function Layout({ children }) {
  const reduceMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [bookFlip, setBookFlip] = useState(null);

  const bookFlipTimerRef = useRef(null);

  useEffect(() => {
    function triggerProfessionalBookFlip(x, y) {
      const id = Date.now();

      if (bookFlipTimerRef.current) {
        window.clearTimeout(bookFlipTimerRef.current);
      }

      setBookFlip({
        id,
        x,
        y,
      });

      bookFlipTimerRef.current = window.setTimeout(() => {
        setBookFlip((current) => (current?.id === id ? null : current));
      }, 1400);
    }

    function handleLayoutClickableClick(event) {
      const target = event.target instanceof Element ? event.target : null;
      const clickable = target?.closest("button, a[href]");

      if (!clickable) {
        return;
      }

      if (clickable instanceof HTMLButtonElement && clickable.disabled) {
        return;
      }

      if (clickable.getAttribute("aria-disabled") === "true") {
        return;
      }

      const rect = clickable.getBoundingClientRect();

      triggerProfessionalBookFlip(
        event.clientX || rect.left + rect.width / 2,
        event.clientY || rect.top + rect.height / 2
      );
    }

    document.addEventListener("click", handleLayoutClickableClick, true);

    return () => {
      document.removeEventListener("click", handleLayoutClickableClick, true);

      if (bookFlipTimerRef.current) {
        window.clearTimeout(bookFlipTimerRef.current);
      }
    };
  }, []);

  function renderProfessionalBookFlip() {
    return (
      <AnimatePresence>
        {bookFlip ? (
          <div
            key={bookFlip.id}
            className="pointer-events-none fixed z-[2147483647]"
            style={{
              left: bookFlip.x,
              top: bookFlip.y,
              transform: "translate(-50%, -50%)",
              perspective: 1200,
            }}
            aria-hidden="true"
          >
            <motion.div
              className="relative h-28 w-40"
              style={{
                transformStyle: "preserve-3d",
              }}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.55, rotateX: 16, y: 14 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, rotateX: 0, y: 0 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.82, rotateX: -8, y: -12 }
              }
              transition={
                reduceMotion
                  ? { duration: 0.12 }
                  : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <motion.div
                className="absolute left-1/2 top-[88%] h-5 w-32 rounded-full bg-black/40 blur-xl"
                style={{ transform: "translateX(-50%)" }}
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={{ opacity: 0.72, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.5 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[86px] w-[118px]"
                style={{
                  transform: "translate(-50%, -50%)",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full w-1/2 rounded-l-xl border border-white/25 bg-gradient-to-br from-[#3b2f1d] via-[#9a6b1f] to-[#facc15] shadow-2xl"
                  style={{
                    transformOrigin: "right center",
                    boxShadow:
                      "inset -10px 0 20px rgba(0,0,0,0.22), 0 18px 38px rgba(0,0,0,0.34)",
                  }}
                  initial={reduceMotion ? { opacity: 0 } : { rotateY: 68 }}
                  animate={reduceMotion ? { opacity: 1 } : { rotateY: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { rotateY: 48 }}
                  transition={{
                    duration: reduceMotion ? 0.12 : 0.48,
                    ease: "easeOut",
                  }}
                />

                <motion.div
                  className="absolute right-0 top-0 h-full w-1/2 rounded-r-xl border border-white/25 bg-gradient-to-br from-[#f8dfa0] via-[#facc15] to-[#b7791f] shadow-2xl"
                  style={{
                    transformOrigin: "left center",
                    boxShadow:
                      "inset 10px 0 20px rgba(255,255,255,0.18), 0 18px 38px rgba(0,0,0,0.34)",
                  }}
                  initial={reduceMotion ? { opacity: 0 } : { rotateY: -68 }}
                  animate={reduceMotion ? { opacity: 1 } : { rotateY: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { rotateY: -48 }}
                  transition={{
                    duration: reduceMotion ? 0.12 : 0.48,
                    ease: "easeOut",
                  }}
                />

                <span
                  className="absolute left-1/2 top-0 h-full w-[5px] rounded-full bg-gradient-to-b from-white/40 via-[#7c4a03] to-black/25"
                  style={{
                    transform: "translateX(-50%) translateZ(8px)",
                    boxShadow: "0 0 16px rgba(250,204,21,0.35)",
                  }}
                />

                {Array.from({ length: 7 }).map((_, page) => (
                  <motion.span
                    key={`layout-book-page-${page}`}
                    className="absolute left-1/2 top-[6px] h-[74px] w-[52px] rounded-r-lg border border-amber-100/80 bg-gradient-to-br from-white via-amber-50 to-amber-100"
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      boxShadow:
                        "inset 8px 0 14px rgba(120,53,15,0.12), 0 8px 18px rgba(0,0,0,0.16)",
                    }}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            rotateY: 0,
                            x: 0,
                            z: page * 0.8,
                            opacity: 0,
                          }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: [0, 1, 0] }
                        : {
                            rotateY: [0, -26, -118, -172],
                            x: [0, -1, -4, -8],
                            z: [page * 0.8, 12 + page, 16 + page, page],
                            opacity: [0, 1, 1, 0.18],
                          }
                    }
                    transition={{
                      duration: reduceMotion ? 0.42 : 0.9,
                      delay: reduceMotion ? page * 0.02 : 0.14 + page * 0.075,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="absolute left-3 right-3 top-4 h-px bg-amber-800/20" />
                    <span className="absolute left-3 right-4 top-7 h-px bg-amber-800/16" />
                    <span className="absolute left-3 right-5 top-10 h-px bg-amber-800/14" />
                  </motion.span>
                ))}

                <motion.span
                  className="absolute left-1/2 top-1/2 h-[92px] w-[126px] rounded-2xl border border-[var(--gold)]/35"
                  style={{
                    transform: "translate(-50%, -50%)",
                    boxShadow:
                      "0 0 30px rgba(250,204,21,0.28), inset 0 0 28px rgba(250,204,21,0.10)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.8, 1.08, 1.18] }}
                  transition={{
                    duration: reduceMotion ? 0.42 : 1,
                    ease: "easeOut",
                  }}
                />

                <motion.span
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white"
                  style={{
                    transform: "translate(-50%, -50%)",
                    boxShadow:
                      "0 0 24px rgba(255,255,255,0.95), 0 0 38px rgba(250,204,21,0.75)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 2.1, 0] }}
                  transition={{
                    duration: reduceMotion ? 0.36 : 0.9,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold tracking-wide">
              The Culinary World Gazette
            </span>
          </Link>

          {/* Desktop Nav */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md px-3 py-2 border border-white/15 hover:border-[var(--gold)]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Sidebar (mobile nav) */}
      <Sidebar open={menuOpen} setOpen={setMenuOpen} />

      {/* Main Page Content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <Footer />

      {renderProfessionalBookFlip()}
    </>
  );
}
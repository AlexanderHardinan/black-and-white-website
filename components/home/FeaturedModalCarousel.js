// components/home/FeaturedModalCarousel.js
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function FeaturedModalCarousel({ open, onClose, items, startIndex = 0 }) {
  const reduceMotion = useReducedMotion();

  const [selected, setSelected] = useState(startIndex);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, []);

  const dialogRef = useRef(null);
  const prevBodyOverflowRef = useRef("");

  const canRender = Array.isArray(items) && items.length > 0;

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (!open) return;

    prevBodyOverflowRef.current = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflowRef.current;
    };
  }, [open]);

  // Focus dialog on open
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      dialogRef.current?.focus?.();
    }, 0);
    return () => clearTimeout(t);
  }, [open]);

  // Keyboard controls (Escape, arrows, Tab focus trap)
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();

      if (e.key === "Tab") {
        // Simple focus trap within the dialog
        const root = dialogRef.current;
        if (!root) return;

        const focusables = root.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, emblaApi]);

  // Sync Embla selected + jump to startIndex on open
  useEffect(() => {
    if (!open) return;
    if (!emblaApi) return;

    emblaApi.reInit();

    const safe = clamp(startIndex, 0, Math.max(0, (items?.length || 1) - 1));
    emblaApi.scrollTo(safe, true);

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [open, emblaApi, startIndex, items?.length]);

  // Keep selected in range if items change while open
  useEffect(() => {
    if (!open) return;
    const max = Math.max(0, (items?.length || 1) - 1);
    setSelected((s) => clamp(s, 0, max));
  }, [open, items?.length]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Latest featured carousel"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 outline-none"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            transition={reduceMotion ? { duration: 0.12 } : { duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-5xl rounded-3xl border border-white/12 bg-black/60 backdrop-blur shadow-[0_40px_120px_rgba(0,0,0,0.65)] overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-white/60 tracking-widest uppercase">
                    Latest Featured
                  </div>
                  <div className="text-sm font-semibold text-white">Editorial carousel</div>
                </div>

                <button
                  onClick={close}
                  className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                  aria-label="Close modal"
                >
                  Close
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {!canRender ? (
                  <div className="text-white/70 text-sm">No featured items available.</div>
                ) : (
                  <>
                    <div
                      ref={emblaRef}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-black/25"
                    >
                      <div className="flex">
                        {items.map((it, idx) => (
                          <div key={it.slug || idx} className="min-w-0 flex-[0_0_100%] px-0">
                            <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 sm:p-5">
                              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                                <img
                                  src={it.frontmatter?.cover || "/images/hero.png"}
                                  alt={it.frontmatter?.title || "Featured"}
                                  className="w-full h-[220px] sm:h-[280px] md:h-[340px] object-cover"
                                />
                              </div>

                              <div className="flex flex-col">
                                <div className="text-xs text-white/60 tracking-wider">
                                  {it.frontmatter?.date || "—"}
                                </div>

                                <div className="mt-2 text-2xl sm:text-3xl font-semibold text-white leading-tight">
                                  {it.frontmatter?.title || "Untitled"}
                                </div>

                                <p className="mt-3 text-white/75 text-sm sm:text-base leading-relaxed">
                                  {it.frontmatter?.excerpt || ""}
                                </p>

                                <div className="mt-5 flex flex-wrap items-center gap-3">
                                  <Link
                                    href={`/posts/${it.slug}`}
                                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                                    onClick={close}
                                  >
                                    Read article <span aria-hidden>→</span>
                                  </Link>

                                  <div className="text-xs text-white/50">
                                    {idx + 1} / {items.length}
                                  </div>
                                </div>

                                <div className="mt-auto pt-4">
                                  <div className="flex flex-wrap gap-2">
                                    {(it.frontmatter?.tags || []).slice(0, 5).map((t) => (
                                      <span
                                        key={t}
                                        className="text-[11px] px-2 py-1 rounded-full border border-white/10 bg-black/20 text-white/70"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => emblaApi?.scrollPrev()}
                          className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                          aria-label="Previous slide"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => emblaApi?.scrollNext()}
                          className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
                          aria-label="Next slide"
                        >
                          Next
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {items.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            className={`h-2.5 w-2.5 rounded-full border transition ${
                              i === selected
                                ? "bg-[var(--gold)] border-[var(--gold)]"
                                : "bg-white/10 border-white/20 hover:border-[var(--gold)]/50"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-pressed={i === selected}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 text-[11px] text-white/50">
                      Tip: Use ← → arrow keys to navigate.
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

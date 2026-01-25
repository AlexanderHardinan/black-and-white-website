// components/Sidebar.js
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "../lib/nav";

export default function Sidebar({ open, setOpen }) {
  const router = useRouter();

  // Refs for a11y & focus management
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // Close on route change and with ESC
  useEffect(() => {
    const onRoute = () => setOpen(false);
    const onEsc = (e) => e.key === "Escape" && setOpen(false);

    router.events.on("routeChangeComplete", onRoute);
    window.addEventListener("keydown", onEsc);
    return () => {
      router.events.off("routeChangeComplete", onRoute);
      window.removeEventListener("keydown", onEsc);
    };
  }, [router.events, setOpen]);

  // Scroll lock + autofocus + restore focus
  useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      setTimeout(() => closeBtnRef.current?.focus(), 0);

      return () => {
        document.body.style.overflow = originalOverflow;
        lastFocusedRef.current?.focus?.();
      };
    }
  }, [open]);

  // Simple focus trap inside the panel
  const onKeyDownTrap = useCallback((e) => {
    if (e.key !== "Tab") return;
    const root = panelRef.current;
    if (!root) return;

    const focusables = root.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  // Active link (hash links count as active while on the homepage)
  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    if (href.startsWith("#")) return router.pathname === "/";
    return router.asPath.split("#")[0] === href;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[98] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sidebar-title"
            className="
              fixed right-0 top-0 z-[99] h-full w-[86%] max-w-sm
              bg-[var(--bg)] text-[var(--fg)]
              border-l border-white/10
              shadow-[0_40px_120px_rgba(0,0,0,0.65)]
              outline-none
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onKeyDown={onKeyDownTrap}
          >
            {/* Glass top strip */}
            <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-white/10 to-transparent" />

            {/* Header */}
            <div className="relative p-5 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur">
              <div className="flex flex-col">
                <h2 id="sidebar-title" className="font-semibold tracking-wide text-white">
                  Menu
                </h2>
                <div className="text-[11px] text-white/55 tracking-widest uppercase mt-1">
                  The Culinary World Gazette
                </div>
              </div>

              <button
                ref={closeBtnRef}
                className="
                  rounded-full px-4 py-2 text-xs
                  border border-white/15 bg-black/30
                  hover:border-[var(--gold)]/50
                  focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60
                  transition
                "
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            {/* Nav */}
            <nav className="px-4 py-5">
              <div className="text-[10px] text-white/55 tracking-widest uppercase px-2 mb-3">
                Navigation
              </div>

              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`
                        group flex items-center justify-between
                        rounded-2xl px-4 py-3 text-sm
                        border transition
                        focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60
                        ${
                          isActive(l.href)
                            ? "bg-white/5 border-[var(--gold)]/35 text-[var(--gold)]"
                            : "bg-black/25 border-white/10 text-white/85 hover:border-[var(--gold)]/30 hover:bg-white/5 hover:text-[var(--gold)]"
                        }
                      `}
                      onClick={() => setOpen(false)}
                    >
                      <span className="tracking-wide">{l.label}</span>
                      <span
                        className={`
                          text-xs transition
                          ${isActive(l.href) ? "text-[var(--gold)]" : "text-white/40 group-hover:text-[var(--gold)]"}
                        `}
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer footer */}
            <div className="mt-auto p-4 border-t border-white/10 bg-white/5 backdrop-blur">
              <div className="text-xs text-white/60">
                © {new Date().getFullYear()} The Culinary World Gazette
              </div>
              <div className="text-[11px] text-white/45 mt-1">
                Editorial navigation panel
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

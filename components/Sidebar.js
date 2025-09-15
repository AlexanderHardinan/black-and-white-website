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
      // remember last focused element to restore later
      lastFocusedRef.current = document.activeElement;
      // lock scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // next tick focus the close button (accessible)
      setTimeout(() => closeBtnRef.current?.focus(), 0);

      return () => {
        document.body.style.overflow = originalOverflow;
        // restore focus where the user was
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
      // Shift+Tab on first -> go to last
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab on last -> go to first
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
            className="fixed inset-0 z-[98] bg-black/50"
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
            className="fixed right-0 top-0 z-[99] h-full w-[86%] max-w-sm bg-background text-foreground border-l border-white/10 shadow-2xl outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onKeyDown={onKeyDownTrap}
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-white/10">
              <h2 id="sidebar-title" className="font-semibold tracking-wide">
                Menu
              </h2>
              <button
                ref={closeBtnRef}
                className="rounded-md px-3 py-2 border border-white/15 hover:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            {/* Nav */}
            <nav className="px-4 py-4">
              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`block rounded-lg px-3 py-3 text-base transition focus:outline-none focus:ring-2 focus:ring-[var(--gold)]
                        ${
                          isActive(l.href)
                            ? "bg-white/5 text-[var(--gold)] border border-[var(--gold)]/30"
                            : "text-white/85 hover:text-[var(--gold)] hover:bg-white/5 border border-transparent"
                        }`}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer footer (optional) */}
            <div className="mt-auto p-4 text-xs text-white/60 border-t border-white/10">
              © {new Date().getFullYear()} The Culinary World Gazette
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// components/Sidebar.js
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Props:
 *  open: boolean
 *  onClose: () => void
 *  title?: string
 *  side?: "left" | "right"
 *  children?: ReactNode
 */
export default function Sidebar({
  open,
  onClose,
  title = "Browse & Filter",
  side = "left",
  children,
}) {
  // ESC to close + scroll lock when open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Tailwind cannot compile dynamic class names, so use fixed conditionals:
  const sideClasses = side === "right" ? "right-0 border-l" : "left-0 border-r";
  const fromX = side === "right" ? 60 : -60;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className={`fixed top-0 ${sideClasses} z-[70] h-screen bg-[var(--bg)] text-[var(--fg)] shadow-2xl w-[88%] sm:w-[420px] flex flex-col`}
            initial={{ opacity: 0, x: fromX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: fromX }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h3 className="font-semibold tracking-wide">{title}</h3>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-md hover:bg-black/5"
                aria-label="Close sidebar"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

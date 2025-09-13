// components/AnimatedButton.js
import { motion } from "framer-motion";

export default function AnimatedButton({
  href = "#",
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "relative inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium tracking-[0.02em] overflow-hidden group";
  const styles = {
    // Black button with gold hover ring + glow
    primary:
      "bg-black text-white hover:bg-neutral-900 focus:outline-none",
    // Minimal outline, turns gold on hover
    outline:
      "border border-white/20 text-white hover:text-[var(--gold)] hover:border-[var(--gold)] bg-transparent",
    // Clean text button
    ghost: "text-white hover:text-[var(--gold)] bg-transparent",
  };

  return (
    <motion.a
      href={href}
      className={`${base} ${styles[variant]} ${className} btn-anim`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* Hover ring */}
      <span className="absolute inset-0 rounded-xl ring-0 transition group-hover:ring-2 group-hover:ring-[var(--gold)]/60" />
      {/* Gold glow on hover */}
      <span className="absolute inset-0 rounded-xl shadow-none group-hover:shadow-[0_8px_30px_rgba(203,161,53,0.25)] transition-shadow" />
      {/* Shine sweep */}
      <span className="btn-shine" aria-hidden />
      {/* Label */}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

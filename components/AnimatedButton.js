// components/AnimatedButton.js
import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedButton({
  href = "#",
  locale,
  variant = "primary",
  children
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition focus:outline-none whitespace-nowrap";
  const variants = {
    primary: "bg-[var(--gold)] text-black hover:brightness-110",
    outline:
      "border border-white/20 text-white hover:border-[var(--gold)] hover:text-[var(--gold)]"
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        locale={locale}
        className={`${base} ${variants[variant]}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

// components/Header.js
import Link from "next/link";
import { useState, useMemo } from "react";
import { NAV_LINKS } from "../lib/nav";
import Sidebar from "./Sidebar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Remove "Cities" from nav (by label or href)
  const links = useMemo(() => {
    return (NAV_LINKS || []).filter((l) => {
      const label = String(l?.label || "").toLowerCase().trim();
      const href = String(l?.href || "").toLowerCase().trim();
      return label !== "cities" && href !== "#cities" && href !== "/cities";
    });
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--bg)]/70 backdrop-blur">
        <div className="container py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img
              src="/images/logo.png"
              alt="The Culinary World Gazette"
              className="h-10 w-auto"
            />
            <div className="min-w-0">
              <div className="font-bold tracking-wide text-white leading-tight truncate">
                The Culinary World Gazette
              </div>
              <div className="hidden sm:block text-[10px] text-white/55 tracking-widest uppercase">
                Editorial Gazette
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 text-sm text-white/80">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="
                  rounded-full px-4 py-2
                  border border-transparent
                  hover:border-white/10 hover:bg-white/5
                  hover:text-[var(--gold)]
                  transition
                "
              >
                <span className="tracking-wide">{l.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile button */}
          <button
            className="
              md:hidden rounded-full px-4 py-2 text-xs
              border border-white/15 bg-black/30
              hover:border-[var(--gold)]/50
              focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60
              transition
            "
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <Sidebar open={menuOpen} setOpen={setMenuOpen} />
    </>
  );
}

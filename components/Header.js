// components/Header.js
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "../lib/nav";
import Sidebar from "./Sidebar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-[var(--bg)]/70">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold tracking-wide">The Culinary World Gazette</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm text-white/80 tracking-wide">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[var(--gold)]">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile button */}
          <button
            className="md:hidden rounded-md px-3 py-2 border border-white/15 hover:border-[var(--gold)]"
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

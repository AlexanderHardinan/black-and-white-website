// components/Layout.js
import { useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { NAV_LINKS } from "../lib/nav";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
    </>
  );
}

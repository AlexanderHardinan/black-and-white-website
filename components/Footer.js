// components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[var(--bg)]/80 backdrop-blur">
      <div className="container py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <div className="font-semibold tracking-wide text-white">
              The Culinary World Gazette
            </div>
            <div className="text-[11px] text-white/55 tracking-widest uppercase">
              Global Editorial on Dining & Culture
            </div>
            <div className="text-[11px] text-white/45 mt-1">
              © {new Date().getFullYear()} All rights reserved
            </div>
          </div>

          {/* Center: Minimal editorial links */}
          <div className="flex items-center gap-4 text-xs text-white/65">
            <Link
              href="/about"
              className="hover:text-[var(--gold)] transition"
            >
              About
            </Link>
            <span className="opacity-30">•</span>
            <Link
              href="/top-restaurants"
              className="hover:text-[var(--gold)] transition"
            >
              Restaurants
            </Link>
            <span className="opacity-30">•</span>
            <Link
              href="/top-chefs"
              className="hover:text-[var(--gold)] transition"
            >
              Chefs
            </Link>
          </div>

          {/* Right: Socials */}
          <div className="flex items-center gap-5 text-white/70">
            {/* Instagram */}
            <a
              href="https://instagram.com/tcwgazette"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[var(--gold)] transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[var(--gold)] transition"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9c0-.55.45-1 1-1Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

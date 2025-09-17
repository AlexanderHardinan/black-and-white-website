// components/Footer.js
export default function Footer() {
  return (
    <footer className="mt-10 bg-black">
      <div className="container py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
        {/* Left: Brand + year */}
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide">The Culinary World Gazette</span>
          <span className="opacity-60">© {new Date().getFullYear()}</span>
        </div>

        {/* Right: Socials only */}
        <div className="flex items-center gap-6">
          {/* Instagram */}
          <a
            href="https://instagram.com/tcwgazette"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[var(--gold)] transition"
            title="Instagram"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-[var(--gold)] transition"
            title="Facebook"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9c0-.55.45-1 1-1Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

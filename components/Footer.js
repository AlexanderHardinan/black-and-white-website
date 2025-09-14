// components/Footer.js
export default function Footer() {
  return (
    <footer className="mt-10 bg-black">
      <div className="container py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
        {/* Left: Brand + year */}
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide">
            The Culinary World Gazette
          </span>
          <span className="opacity-60">© {new Date().getFullYear()}</span>
        </div>

        {/* Right: Email + Socials */}
        <div className="flex items-center gap-5">
          {/* Email */}
          <a
            href="mailto:blackchef.alex@gmail.com"
            aria-label="Email"
            className="flex items-center gap-2 hover:text-[var(--gold)] transition"
          >
            {/* Envelope */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="hidden sm:inline">blackchef.alex@gmail.com</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/tcwgazette"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[var(--gold)] transition"
            title="Instagram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/>
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9c0-.55.45-1 1-1Z" fill="currentColor"/>
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="hover:text-[var(--gold)] transition"
            title="X"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 4l7.3 9.6L4.5 20H7l5-5.3L16.8 20H20l-7.5-9.9L19.5 4H17L12 9l-3.5-5H4z" fill="currentColor"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-[var(--gold)] transition"
            title="YouTube"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M22 12s0-3.5-.45-5.1a3 3 0 0 0-2.1-2.1C17.8 4.3 12 4.3 12 4.3s-5.8 0-7.45.5a3 3 0 0 0-2.1 2.1C2 8.5 2 12 2 12s0 3.5.45 5.1c.24.9.95 1.6 1.85 1.85C5.2 19.7 12 19.7 12 19.7s5.8 0 7.45-.5a3 3 0 0 0 2.1-2.1C22 15.5 22 12 22 12Z" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10 9.75v4.5L14.5 12 10 9.75Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

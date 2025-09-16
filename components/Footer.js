// components/Footer.js
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const isAboutPage = router.pathname === "/about";

  return (
    <footer
      className={`mt-10 ${
        isAboutPage
          ? "bg-white text-black border-t border-black/10"
          : "bg-black text-white border-t border-white/10"
      }`}
    >
      <div className="container py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
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
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m4 7 8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span className="hidden sm:inline">
              blackchef.alex@gmail.com
            </span>
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
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
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
              <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
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
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9c0-.55.45-1 1-1Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

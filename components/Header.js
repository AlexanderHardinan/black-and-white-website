// components/Header.js
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../lib/nav";
import Sidebar from "./Sidebar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [titleActive, setTitleActive] = useState(false);

  const links = (NAV_LINKS || []).filter(
    (l) => l?.label !== "Cities" && l?.href !== "#cities"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 8) {
        setTitleActive(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-[var(--bg)]/70">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />

            <span
              className={`tcwg-title-wrap ${
                titleActive ? "tcwg-title-active" : ""
              }`}
            >
              <span className="tcwg-comet" aria-hidden="true" />
              <span className="tcwg-title-text">
                The Culinary World Gazette
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm text-white/80 tracking-wide">
            {links.map((l) => (
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

      <style jsx>{`
        .tcwg-title-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          max-width: min(62vw, 320px);
          color: #ffffff;
          font-weight: 800;
          letter-spacing: 0.04em;
          white-space: nowrap;
          filter: drop-shadow(0 0 0 rgba(255, 180, 60, 0));
        }

        .tcwg-title-text {
          display: inline-block;
          max-width: 0;
          overflow: hidden;
          border-right: 2px solid transparent;
          opacity: 0;
          transform: translateY(6px) scale(0.96);
        }

        .tcwg-comet {
          position: absolute;
          left: -42px;
          top: 50%;
          z-index: 2;
          width: 38px;
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 190, 75, 0.2),
            rgba(255, 229, 150, 1)
          );
          box-shadow:
            0 0 12px rgba(255, 181, 61, 0.9),
            0 0 24px rgba(255, 117, 35, 0.65),
            0 0 42px rgba(255, 68, 0, 0.38);
          opacity: 0;
          transform: translateY(-50%) translateX(0);
        }

        .tcwg-title-active {
          animation: tcwgTitleGlow 2.6s ease forwards;
        }

        .tcwg-title-active .tcwg-comet {
          animation: tcwgCometFire 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .tcwg-title-active .tcwg-title-text {
          animation:
            tcwgPopIn 0.42s ease forwards,
            tcwgTypewriter 1.65s steps(27, end) 0.48s forwards,
            tcwgCaret 0.72s step-end 0.48s 4;
        }

        @keyframes tcwgCometFire {
          0% {
            opacity: 0;
            transform: translateY(-50%) translateX(0) scaleX(0.5);
          }

          20% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateY(-50%) translateX(390px) scaleX(1.35);
          }
        }

        @keyframes tcwgPopIn {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.94);
            text-shadow: 0 0 0 rgba(255, 183, 63, 0);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            text-shadow:
              0 0 14px rgba(255, 189, 73, 0.45),
              0 0 28px rgba(255, 111, 38, 0.18);
          }
        }

        @keyframes tcwgTypewriter {
          from {
            max-width: 0;
          }

          to {
            max-width: 320px;
          }
        }

        @keyframes tcwgCaret {
          0%,
          100% {
            border-right-color: transparent;
          }

          50% {
            border-right-color: var(--gold);
          }
        }

        @keyframes tcwgTitleGlow {
          0% {
            filter: drop-shadow(0 0 0 rgba(255, 180, 60, 0));
          }

          40% {
            filter: drop-shadow(0 0 14px rgba(255, 180, 60, 0.45));
          }

          100% {
            filter: drop-shadow(0 0 5px rgba(255, 180, 60, 0.22));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tcwg-title-wrap,
          .tcwg-title-active,
          .tcwg-title-active .tcwg-comet,
          .tcwg-title-active .tcwg-title-text {
            animation: none !important;
          }

          .tcwg-title-text {
            max-width: 320px;
            opacity: 1;
            transform: none;
            border-right-color: transparent;
          }

          .tcwg-comet {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
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
              <span className="tcwg-fire-burst" aria-hidden="true" />
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
          width: min(62vw, 340px);
          min-height: 26px;
          overflow: hidden;
          color: #ffffff;
          font-weight: 800;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .tcwg-title-text {
          position: relative;
          z-index: 3;
          display: inline-block;
          max-width: 0;
          overflow: hidden;
          border-right: 2px solid transparent;
          opacity: 0;
          transform: translateY(6px) scale(0.96);
          text-shadow: 0 0 0 rgba(255, 183, 63, 0);
        }

        .tcwg-comet {
          position: absolute;
          left: -120px;
          top: 50%;
          z-index: 5;
          width: 110px;
          height: 8px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 92% 50%, #fff8d8 0 8%, #ffd36c 10% 18%, #ff7a1a 20% 34%, transparent 38%),
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 72, 0, 0.08) 10%,
              rgba(255, 116, 22, 0.48) 35%,
              rgba(255, 190, 75, 0.9) 70%,
              rgba(255, 244, 190, 1) 100%
            );
          box-shadow:
            0 0 14px rgba(255, 214, 106, 1),
            0 0 30px rgba(255, 124, 31, 0.95),
            0 0 58px rgba(255, 57, 0, 0.72),
            0 0 90px rgba(255, 174, 42, 0.42);
          opacity: 0;
          transform: translateY(-50%) translateX(0) scaleX(0.8);
          filter: blur(0.2px);
        }

        .tcwg-fire-burst {
          position: absolute;
          left: 0;
          top: 50%;
          z-index: 2;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background:
            radial-gradient(circle, rgba(255, 238, 171, 0.8) 0 8%, rgba(255, 164, 42, 0.55) 22%, rgba(255, 70, 0, 0.18) 52%, transparent 72%);
          opacity: 0;
          transform: translateY(-50%) scale(0.3);
          filter: blur(2px);
        }

        .tcwg-title-active {
          animation: tcwgTitlePulse 2.8s ease-in-out infinite;
        }

        .tcwg-title-active .tcwg-comet {
          animation: tcwgCometFireLoop 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        .tcwg-title-active .tcwg-fire-burst {
          animation: tcwgFireBurstLoop 3.2s ease-out infinite;
        }

        .tcwg-title-active .tcwg-title-text {
          animation:
            tcwgTextPop 0.38s ease forwards,
            tcwgTypewriterLoop 4.8s steps(27, end) 0.36s infinite,
            tcwgCaretLoop 0.72s step-end 0.36s infinite;
        }

        @keyframes tcwgCometFireLoop {
          0% {
            opacity: 0;
            transform: translateY(-50%) translateX(0) scaleX(0.72);
          }

          8% {
            opacity: 1;
          }

          36% {
            opacity: 1;
            transform: translateY(-50%) translateX(430px) scaleX(1.28);
          }

          46% {
            opacity: 0;
            transform: translateY(-50%) translateX(470px) scaleX(0.85);
          }

          100% {
            opacity: 0;
            transform: translateY(-50%) translateX(470px) scaleX(0.85);
          }
        }

        @keyframes tcwgFireBurstLoop {
          0% {
            left: 0;
            opacity: 0;
            transform: translateY(-50%) scale(0.25);
          }

          10% {
            opacity: 0.9;
            transform: translateY(-50%) scale(1);
          }

          34% {
            left: 82%;
            opacity: 0.45;
            transform: translateY(-50%) scale(1.35);
          }

          45% {
            opacity: 0;
            transform: translateY(-50%) scale(0.5);
          }

          100% {
            left: 82%;
            opacity: 0;
          }
        }

        @keyframes tcwgTextPop {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.94);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes tcwgTypewriterLoop {
          0% {
            max-width: 0;
          }

          42% {
            max-width: 340px;
          }

          78% {
            max-width: 340px;
          }

          100% {
            max-width: 0;
          }
        }

        @keyframes tcwgCaretLoop {
          0%,
          100% {
            border-right-color: transparent;
          }

          50% {
            border-right-color: var(--gold);
          }
        }

        @keyframes tcwgTitlePulse {
          0%,
          100% {
            filter:
              drop-shadow(0 0 4px rgba(255, 180, 60, 0.18))
              drop-shadow(0 0 0 rgba(255, 92, 0, 0));
          }

          45% {
            filter:
              drop-shadow(0 0 14px rgba(255, 211, 108, 0.65))
              drop-shadow(0 0 28px rgba(255, 94, 0, 0.32));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tcwg-title-wrap,
          .tcwg-title-active,
          .tcwg-title-active .tcwg-comet,
          .tcwg-title-active .tcwg-fire-burst,
          .tcwg-title-active .tcwg-title-text {
            animation: none !important;
          }

          .tcwg-title-text {
            max-width: 340px;
            opacity: 1;
            transform: none;
            border-right-color: transparent;
          }

          .tcwg-comet,
          .tcwg-fire-burst {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
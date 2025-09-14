// pages/_app.js
import { useEffect } from "react";
import "../styles/globals.css";
import ContactWidget from "../components/ContactWidget";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Reveal-on-scroll helper for .fade-up/.fade-left/.fade-right
    const animatedEls = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("show"); });
    }, { threshold: 0.2 });

    animatedEls.forEach((el) => observer.observe(el));
    return () => animatedEls.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ContactWidget />
    </>
  );
}

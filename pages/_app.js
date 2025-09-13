import { useEffect } from "react";
import "../styles/globals.css";
import ContactWidget from "../components/ContactWidget";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const animatedEls = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );
    animatedEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ContactWidget />
    </>
  );
}

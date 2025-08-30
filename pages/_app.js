import { useEffect } from "react";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const animatedEls = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedEls.forEach((el) => observer.observe(el));
    return () => animatedEls.forEach((el) => observer.unobserve(el));
  }, []);

  return <Component {...pageProps} />;
}

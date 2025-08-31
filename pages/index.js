import Head from "next/head";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(0);

  // Carousel data
  const slides = [
    {
      title: "Experience Luxury Dining",
      text: "Pure, Bold, and Timeless — crafted with passion by Chef Alex.",
      img: "/images/hero.jpg",
    },
    {
      title: "Handcrafted Viennoiseries",
      text: "Freshly baked every morning with the finest ingredients.",
      img: "/images/bakery.jpg",
    },
    {
      title: "Gourmet Coffee & Delights",
      text: "A journey of aroma and flavor in every cup.",
      img: "/images/coffee.jpg",
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-slide every 5s

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, [slides.length]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Black and White — Chef Alex</title>
      </Head>

      {/* --- LUXURY GRADIENT BG --- */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(270deg, #000000, #1a1a1a, #CBA135, #111)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* --- GOLD PARTICLES --- */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#CBA135" },
            links: { enable: false },
            move: { enable: true, speed: 1, direction: "top" },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.5 },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* --- NAVBAR --- */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all ${
          scrolled ? "bg-white/90 shadow-lg backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
            <span className="font-bold">Black & White</span>
          </div>

          <nav className="hidden md:flex gap-6 font-medium">
            <a href="#about" className="hover:text-[var(--gold)]">About</a>
            <a href="#menu" className="hover:text-[var(--gold)]">Menu</a>
            <a href="#gallery" className="hover:text-[var(--gold)]">Gallery</a>
            <a href="#reserve" className="hover:text-[var(--gold)]">Reserve</a>
            <a href="#contact" className="hover:text-[var(--gold)]">Contact</a>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* --- HERO CAROUSEL --- */}
      <main className="pt-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-28">
          <motion.div
            key={current} // re-trigger animation on slide change
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Left: Text */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-black text-white">
                Black & White by Chef Alex
              </span>
              <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
                <span className="text-[var(--gold)]">{slides[current].title.split(" ")[0]}</span>{" "}
                {slides[current].title.split(" ").slice(1).join(" ")}
              </h1>
              <motion.p
                className="mt-4 text-gray-200 max-w-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {slides[current].text}
              </motion.p>
              <div className="mt-6 flex gap-4">
                <a href="#menu" className="btn-primary">Explore Menu</a>
                <a href="#reserve" className="px-4 py-2 border rounded-lg">Reserve</a>
              </div>
            </div>

            {/* Right: Image */}
            <motion.div
              key={slides[current].img}
              className="rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <img
                src={slides[current].img}
                alt="Slide"
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-6 gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? "bg-[var(--gold)]" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

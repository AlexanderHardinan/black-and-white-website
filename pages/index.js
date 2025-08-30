import Head from "next/head";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mouse position for 3D tilt
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    const onMouseMove = (e) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [x, y]);

  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Black and White — Chef Alex</title>
      </Head>

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
      {/* --- HERO --- */}
<main className="pt-24 relative z-10">
  <motion.section
    className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-8 items-center perspective-[1200px]"
    style={{
      rotateX,
      rotateY,
    }}
    transition={{ type: "spring", stiffness: 80, damping: 15 }}
  >
    <div className="col-span-2 grid md:grid-cols-2 gap-8 items-center rounded-3xl p-10 shadow-2xl bg-white/60 backdrop-blur-lg">
      {/* Left: Text */}
      <div>
        <span className="inline-block px-3 py-1 rounded-full text-xs bg-black text-white">
          Black & White by Chef Alex
        </span>
        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
          Experience <span className="text-[var(--gold)]">Luxury</span> Dining
        </h1>
        <p className="mt-4 text-gray-600 max-w-lg">
          Pure, Bold, and Timeless — crafted with passion by Chef Alex.
        </p>
        <div className="mt-6 flex gap-4">
          <a href="#menu" className="btn-primary">Explore Menu</a>
          <a href="#reserve" className="px-4 py-2 border rounded-lg">Reserve</a>
        </div>
      </div>

      {/* Right: Image */}
      <motion.div
        className="rounded-3xl overflow-hidden shadow-2xl"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <img
          src="/images/hero.jpg"
          alt="Restaurant Interior"
          className="w-full h-96 object-cover"
        />
      </motion.div>
    </div>
  </motion.section>
</main>
    </div>
  );
}

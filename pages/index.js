import Head from "next/head";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Variants for animation
  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
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
          className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-8 items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Left Text */}
          <motion.div variants={fadeUp}>
            <span className="inline-block px-3 py-1 rounded-full text-xs bg-black text-white">
              Black & White by Chef Alex
            </span>
            <motion.h1
              className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight"
              variants={zoomIn}
            >
              Experience <span className="text-[var(--gold)]">Luxury</span> Dining
            </motion.h1>
            <motion.p className="mt-4 text-gray-600 max-w-lg" variants={fadeUp}>
              Pure, Bold, and Timeless — crafted with passion by Chef Alex.
            </motion.p>
            <motion.div className="mt-6 flex gap-4" variants={fadeUp}>
              <a href="#menu" className="btn-primary">Explore Menu</a>
              <a href="#reserve" className="px-4 py-2 border rounded-lg">Reserve</a>
            </motion.div>
          </motion.div>

          {/* Right Image auto slide up */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.img
              key="hero"
              src="/images/hero.jpg"
              alt="Restaurant Interior"
              className="w-full h-96 object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }} // auto zoom in-out
            />
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

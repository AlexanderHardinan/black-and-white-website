import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, Facebook, Phone } from "lucide-react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <Head>
        <title>Black and White — Chef Alex</title>
      </Head>

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all ${
          scrolled ? "bg-white shadow" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/images/logo.png"
              alt="Black and White Logo"
              className="h-16 w-auto"
            />
            <div>
              <div className="font-semibold">Black and White</div>
              <div className="text-xs text-gray-500">by Chef Alex</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-[var(--gold)] transition">
              About
            </a>
            <a href="#menu" className="hover:text-[var(--gold)] transition">
              Menu
            </a>
            <a href="#gallery" className="hover:text-[var(--gold)] transition">
              Gallery
            </a>
            <a href="#reserve" className="hover:text-[var(--gold)] transition">
              Reserve
            </a>
            <a href="#contact" className="hover:text-[var(--gold)] transition">
              Contact
            </a>
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
            <a href="#menu" onClick={() => setMobileOpen(false)}>Menu</a>
            <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
            <a href="#reserve" onClick={() => setMobileOpen(false)}>Reserve</a>
            <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          </motion.div>
        )}
      </header>

      {/* HERO */}
      <main className="pt-24">
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8 items-center">
          {/* Left Text with staggered animations */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.span
              className="inline-block px-3 py-1 rounded-full text-xs bg-black text-white"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              Black and White by Chef Alex
            </motion.span>

            <motion.h1
              className="mt-6 text-4xl md:text-6xl font-bold"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              Black <span style={{ color: "#CBA135" }}>and</span> White
            </motion.h1>

            <motion.p
              className="mt-4 text-gray-600 max-w-xl"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              Pure, Bold, and Timeless.
            </motion.p>

            <motion.div
              className="mt-6 flex gap-3"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <a href="#menu" className="btn-primary">
                Explore Menu
              </a>
              <a href="#reserve" className="btn-ghost border px-4 py-2 rounded-lg">
                Reserve
              </a>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src="/images/hero.jpg"
              alt="BW Restaurant"
              className="w-full h-96 object-cover"
            />
          </motion.div>
        </section>

        {/* ABOUT Section */}
        <motion.section
          id="about"
          className="max-w-6xl mx-auto px-6 py-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At <b>Black and White</b>, we blend timeless flavors with modern artistry.
            Chef Alex crafts every dish with passion, balance, and elegance.
          </p>
        </motion.section>

        {/* MENU Section */}
        <motion.section
          id="menu"
          className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="col-span-3 text-center mb-10">
            <h2 className="text-3xl font-bold">Signature Menu</h2>
          </div>
          {[
            { img: "/images/dish1.jpg", title: "Croissant au Beurre", desc: "Golden layers, pure butter" },
            { img: "/images/dish2.jpg", title: "Espresso Noir", desc: "Rich, bold, and smooth" },
            { img: "/images/dish3.jpg", title: "Tarte au Chocolat", desc: "Decadent dark chocolate tart" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 shadow rounded-xl cursor-pointer bg-white"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={item.img} alt={item.title} className="rounded-xl mb-4" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* GALLERY Section */}
        <motion.section
          id="gallery"
          className="max-w-6xl mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["gallery1.jpg","gallery2.jpg","gallery3.jpg","gallery4.jpg","gallery5.jpg","gallery6.jpg"].map((g,i)=>(
              <motion.img
                key={i}
                src={`/images/${g}`}
                className="rounded-xl cursor-pointer"
                whileHover={{ scale: 1.03 }}
              />
            ))}
          </div>
        </motion.section>

        {/* RESERVE Section */}
        <motion.section
          id="reserve"
          className="max-w-6xl mx-auto px-6 py-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold mb-4">Reserve a Table</h2>
          <p className="text-gray-600 mb-6">
            Secure your spot for an unforgettable dining experience.
          </p>
          <motion.a
            href="/reserve"
            className="btn-primary inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Book Now
          </motion.a>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-8 text-sm text-gray-500 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://instagram.com" target="_blank"><Instagram size={20} /></a>
          <a href="https://facebook.com" target="_blank"><Facebook size={20} /></a>
          <a href="tel:+123456789"><Phone size={20} /></a>
        </div>
        © {new Date().getFullYear()} Black and White — Chef Alex
      </footer>
    </div>
  );
}

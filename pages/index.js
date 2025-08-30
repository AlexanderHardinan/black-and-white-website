import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Black and White — Chef Alex</title>
      </Head>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Black and White Logo"
              className="h-10 w-auto"
            />
            <div>
              <div className="font-semibold">Black and White</div>
              <div className="text-xs text-gray-500">by Chef Alex</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#gallery">Gallery</a>
            <a href="#reserve">Reserve</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
          
          {/* Left Text - animated */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs bg-black text-white">
              Black and White by Chef Alex
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold">
              Black <span style={{ color: "#CBA135" }}>and</span> White
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Pure, Bold, and Timeless.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#menu" className="btn-primary">
                Explore Menu
              </a>
              <a href="#reserve" className="btn-ghost">
                Reserve
              </a>
            </div>
          </motion.div>

          {/* Right Image - animated */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
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
          <div className="p-6 shadow rounded-xl hover:shadow-lg transition">
            <img src="/images/dish1.jpg" alt="Dish 1" className="rounded-xl mb-4"/>
            <h3 className="font-semibold">Croissant au Beurre</h3>
            <p className="text-gray-500 text-sm">Golden layers, pure butter</p>
          </div>
          <div className="p-6 shadow rounded-xl hover:shadow-lg transition">
            <img src="/images/dish2.jpg" alt="Dish 2" className="rounded-xl mb-4"/>
            <h3 className="font-semibold">Espresso Noir</h3>
            <p className="text-gray-500 text-sm">Rich, bold, and smooth</p>
          </div>
          <div className="p-6 shadow rounded-xl hover:shadow-lg transition">
            <img src="/images/dish3.jpg" alt="Dish 3" className="rounded-xl mb-4"/>
            <h3 className="font-semibold">Tarte au Chocolat</h3>
            <p className="text-gray-500 text-sm">Decadent dark chocolate tart</p>
          </div>
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
            <img src="/images/gallery1.jpg" className="rounded-xl" />
            <img src="/images/gallery2.jpg" className="rounded-xl" />
            <img src="/images/gallery3.jpg" className="rounded-xl" />
            <img src="/images/gallery4.jpg" className="rounded-xl" />
            <img src="/images/gallery5.jpg" className="rounded-xl" />
            <img src="/images/gallery6.jpg" className="rounded-xl" />
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
          <p className="text-gray-600 mb-6">Secure your spot for an unforgettable dining experience.</p>
          <a href="/reserve" className="btn-primary">Book Now</a>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-8 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Black and White — Chef Alex
      </footer>
    </div>
  );
}

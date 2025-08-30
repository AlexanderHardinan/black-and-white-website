import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Black and White — Chef Alex</title>
      </Head>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center bg-black text-white">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Black and White Cuisine"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative z-10">
          <img
            src="/images/logo.png"
            alt="Black and White Logo"
            className="mx-auto h-40 mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold">
            Pure, Bold, and Timeless
          </h1>
          <p className="mt-4 text-lg text-gold-300">
            An elegant dining experience by Chef Alex
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="/menu"
              className="px-6 py-3 rounded-full bg-[#CBA135] text-black font-semibold hover:bg-yellow-600 transition"
            >
              Explore Menu
            </Link>
            <Link
              href="/reserve"
              className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="/images/chef.png"
            alt="Chef Alex"
            className="rounded-3xl shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold">By Chef Alex</h2>
          <p className="mt-4 text-white-600">
            Black and White is a timeless dining concept blending bold flavors
            with modern elegance. Our menu is crafted with precision, passion,
            and artistry — delivering an unforgettable experience in every bite.
          </p>
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Signature Dishes</h2>
          <p className="mt-2 text-gray-600">
            Discover the highlights from our carefully curated menu
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            <div className="group rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/dish1.jpg"
                alt="Dish 1"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
              <div className="p-4">
                <h3 className="font-semibold">Golden Pastry</h3>
                <p className="text-sm text-gray-600">Flaky, buttery, perfect.</p>
              </div>
            </div>
            <div className="group rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/dish2.jpg"
                alt="Dish 2"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
              <div className="p-4">
                <h3 className="font-semibold">Signature Coffee</h3>
                <p className="text-sm text-gray-600">
                  Bold flavors, smooth finish.
                </p>
              </div>
            </div>
            <div className="group rounded-xl overflow-hidden shadow-lg">
              <img
                src="/images/dish3.jpg"
                alt="Dish 3"
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
              <div className="p-4">
                <h3 className="font-semibold">Chef’s Special</h3>
                <p className="text-sm text-gray-600">
                  A masterpiece on every plate.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/menu"
              className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
              See Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* RESERVATION CALL TO ACTION */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-3xl font-bold">
          Your seat awaits — Reserve today
        </h2>
        <div className="mt-6">
          <Link
            href="/reserve"
            className="px-8 py-3 rounded-full bg-[#CBA135] text-black font-semibold hover:bg-yellow-600 transition"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-sm text-gray-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-8" />
            <span>Black and White — by Chef Alex</span>
          </div>
          <nav className="flex gap-4">
            <Link href="/menu">Menu</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/reserve">Reserve</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div>© {new Date().getFullYear()} Black and White</div>
        </div>
      </footer>
    </div>
  );
}

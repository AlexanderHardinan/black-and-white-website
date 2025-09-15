// pages/about.js
import Head from "next/head";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>About The Culinary World Gazette</title>
        <meta
          name="description"
          content="Learn about our mission, vision, values, and promise at The Culinary World Gazette."
        />
      </Head>

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold tracking-wide">
              The Culinary World Gazette
            </span>
          </Link>
          <button
            className="md:hidden rounded-md px-3 py-2 border border-white/15 hover:border-[var(--gold)]"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <Sidebar open={menuOpen} setOpen={setMenuOpen} />

      <main className="container py-16 prose prose-invert max-w-3xl">
        <h1>About The Culinary World Gazette</h1>

        <h2>Mission</h2>
        <p>
          To discover, recognize, and share the world’s best restaurants and
          chefs—guiding travelers and diners to unforgettable culinary
          experiences.
        </p>

        <h2>Vision</h2>
        <p>
          To become the most trusted global voice in gastronomy, where every
          reader finds inspiration to explore new flavors, cultures, and
          destinations through food.
        </p>

        <h2>Values</h2>
        <p><b>Excellence:</b> We highlight chefs and restaurants that set the highest standards in taste, craft, and service.</p>
        <p><b>Discovery:</b> We uncover hidden gems and celebrated icons, giving readers authentic insight into where the world eats best.</p>
        <p><b>Inspiration:</b> We aim to inspire journeys—whether across the globe or within one’s own city—through food and culture.</p>
        <p><b>Integrity:</b> Every recommendation is based on genuine quality and culinary merit, not trends or hype.</p>

        <h2>Our Promise</h2>
        <p>
          The Culinary World Gazette is more than a guide—it is a curated
          experience. Each article connects readers to the people, places, and
          stories that define the future of dining.
        </p>

        {/* Back button */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition"
          >
            ← Back to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

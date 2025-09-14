// pages/top-chefs.js
import Head from "next/head";
import Link from "next/link";

const chefs = [
  {
    name: "Chef Alexander Hardinan",
    role: "Executive Chef — The Globe’s Heritage",
    blurb: "Transforms simple ingredients into refined, modern craftsmanship.",
    img: "/images/gallery1.jpg",
  },
  {
    name: "Chef Maya K.",
    role: "Pastry Lead — Bangkok",
    blurb: "Precision lamination and flavor balance with seasonal fruits.",
    img: "/images/gallery2.jpg",
  },
  {
    name: "Chef Rio T.",
    role: "R&D — Tokyo",
    blurb: "Fermentation-forward cuisine and clean presentations.",
    img: "/images/hero.png",
  },
];

export default function TopChefs() {
  return (
    <>
      <Head>
        <title>Top Chefs — The Culinary World Gazette</title>
      </Head>

      <header className="border-b border-white/10 bg-[var(--bg)]/70 backdrop-blur sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide">← Home</Link>
          <div className="text-sm text-white/70">Top Chefs</div>
        </div>
      </header>

      <main className="container py-10">
        <h1 className="text-3xl font-bold tracking-[0.015em] mb-6">Top Chefs</h1>
        <p className="text-white/70 mb-8">
          Profiles from kitchens and labs — technique, philosophy, and signature dishes.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chefs.map((c) => (
            <article key={c.name} className="card overflow-hidden p-0">
              <div className="h-48 w-full overflow-hidden">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold tracking-[0.015em]">{c.name}</h3>
                <div className="text-xs text-white/60 mt-0.5">{c.role}</div>
                <p className="text-sm text-white/80 mt-2">{c.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

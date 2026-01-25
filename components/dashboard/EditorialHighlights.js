// components/dashboard/EditorialHighlights.js
import Link from "next/link";

export default function EditorialHighlights({ topFeatured }) {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Link
        href="/"
        className="group rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition"
      >
        <div className="h-28 w-full overflow-hidden">
          <img
            src={topFeatured?.frontmatter?.cover || "/images/hero.png"}
            alt={topFeatured?.frontmatter?.title || "Featured"}
            className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
          />
        </div>
        <div className="p-4">
          <div className="text-[11px] text-white/60 tracking-widest uppercase">Latest Featured</div>
          <div className="mt-1 text-sm font-semibold leading-snug text-white">
            {(topFeatured?.frontmatter?.title || "Curated highlight") + " "}
            <span className="text-[var(--gold)]">• Open carousel</span>
          </div>
          <div className="mt-2 text-xs text-white/60">
            {topFeatured?.frontmatter?.date || "Updated weekly"}
          </div>
        </div>
      </Link>

      <Link
        href="/top-restaurants"
        className="group rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition"
      >
        <div className="h-28 w-full overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Top Cities"
            className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
          />
        </div>
        <div className="p-4">
          <div className="text-[11px] text-white/60 tracking-widest uppercase">Top Cities</div>
          <div className="mt-1 text-sm font-semibold leading-snug text-white">
            Discovery heat by region
          </div>
          <div className="mt-2 text-xs text-white/60">Global coverage</div>
        </div>
      </Link>

      <Link
        href="/top-chefs"
        className="group rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition"
      >
        <div className="h-28 w-full overflow-hidden">
          <img
            src="/images/hero.png"
            alt="Chef Spotlights"
            className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
          />
        </div>
        <div className="p-4">
          <div className="text-[11px] text-white/60 tracking-widest uppercase">Chef Spotlights</div>
          <div className="mt-1 text-sm font-semibold leading-snug text-white">
            Profiles gaining traction
          </div>
          <div className="mt-2 text-xs text-white/60">Editorial picks</div>
        </div>
      </Link>
    </div>
  );
}

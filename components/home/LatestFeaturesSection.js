// components/home/LatestFeaturesSection.js
export default function LatestFeaturesSection({ featuredItems, onOpenFeaturedAt }) {
  return (
    <section id="latest" className="container py-12">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-[0.015em] text-white">
            Latest Features
          </h2>
          <div className="mt-1 text-sm text-white/60">
            Open the editorial carousel to browse latest stories.
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenFeaturedAt(0)}
          className="rounded-full px-4 py-2 text-xs border border-white/15 bg-black/30 hover:border-[var(--gold)]/50 transition text-white"
        >
          Open Carousel →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {(featuredItems || []).slice(0, 6).map((it, idx) => (
          <button
            key={it.slug || idx}
            type="button"
            onClick={() => onOpenFeaturedAt(idx)}
            className="group text-left rounded-2xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden hover:border-[var(--gold)]/40 transition focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60"
          >
            <div className="h-44 w-full overflow-hidden">
              <img
                src={it.frontmatter?.cover || "/images/hero.png"}
                alt={it.frontmatter?.title || "Latest"}
                className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
              />
            </div>
            <div className="p-4">
              <div className="text-xs text-white/60 tracking-wider">{it.frontmatter?.date || "—"}</div>
              <div className="mt-1 text-base font-semibold text-white leading-snug">
                {it.frontmatter?.title || "Untitled"}
              </div>
              <div className="mt-2 text-sm text-white/70 line-clamp-2">{it.frontmatter?.excerpt || ""}</div>
              <div className="mt-3 text-xs text-[var(--gold)] font-medium">Open in carousel →</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

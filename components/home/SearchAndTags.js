// components/home/SearchAndTags.js
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function SearchAndTags({
  query,
  setQuery,
  activeTag,
  setActiveTag,
  allTags,
  filtered,
}) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <section className="container">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 mb-6">
        <div className="grid gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, cities, cuisines…"
            className="w-full rounded-lg border border-white/15 bg-black/20 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--gold)]"
            aria-label="Search posts"
          />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-2 rounded-full text-sm border transition ${
                    activeTag === tag
                      ? "border-[var(--gold)] text-[var(--gold)] bg-black/20"
                      : "border-white/15 text-white/75 hover:border-[var(--gold)]/40 hover:text-[var(--gold)]"
                  }`}
                  aria-pressed={activeTag === tag}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {(query || activeTag !== "All") && (
            <div className="bg-black/80 border border-white/15 rounded-lg p-3 max-h-72 overflow-y-auto space-y-2">
              {filtered.length > 0 ? (
                filtered.slice(0, 10).map(({ slug, frontmatter }) => (
                  <Link
                    href={`/posts/${slug}`}
                    key={slug}
                    className="flex gap-3 items-center px-2 py-2 rounded hover:bg-white/10"
                  >
                    {frontmatter?.cover && (
                      <img
                        src={frontmatter.cover}
                        alt={frontmatter.title}
                        className="w-16 h-16 rounded object-cover flex-shrink-0"
                      />
                    )}
                    <div>
                      <span className="font-medium text-[var(--gold)]">{frontmatter.title}</span>
                      <div className="text-sm text-white/70 line-clamp-2">
                        {frontmatter.excerpt}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-white/60">No results found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

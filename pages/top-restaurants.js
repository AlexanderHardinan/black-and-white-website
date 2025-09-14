import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "../lib/posts";

export default function TopRestaurants({ posts }) {
  return (
    <>
      <Head>
        <title>Top Restaurants — The Culinary World Gazette</title>
      </Head>

      <header className="border-b border-white/10 bg-[var(--bg)]/70 backdrop-blur sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide">← Home</Link>
          <div className="text-sm text-white/70">Top Restaurants</div>
        </div>
      </header>

      <main className="container py-10">
        <h1 className="text-3xl font-bold tracking-[0.015em] mb-6">Top Restaurants</h1>
        <p className="text-white/70 mb-8">
          Curated picks and destination dining — updated as we eat our way around the world.
        </p>

        {posts.length === 0 ? (
          <p className="text-white/60">We’re preparing this list. Check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(({ slug, frontmatter }) => (
              <Link key={slug} href={`/posts/${slug}`} className="group">
                <article className="card overflow-hidden hover:translate-y-[-4px] transition p-4">
                  <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={frontmatter.cover || "/images/hero.png"}
                      alt={frontmatter.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="text-xs text-white/60 tracking-wider">{frontmatter.date}</div>
                  <h3 className="mt-1 font-semibold group-hover:text-[var(--gold)] transition tracking-wide">
                    {frontmatter.title}
                  </h3>
                  {frontmatter.excerpt && (
                    <p className="text-white/80 text-sm mt-1">{frontmatter.excerpt}</p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Filter posts that look like "top" lists or best-of
  const all = getAllPostsMeta();
  const posts = all.filter(({ frontmatter }) => {
    const t = (frontmatter?.title || "").toLowerCase();
    const tags = (frontmatter?.tags || []).map((x) => x.toLowerCase());
    return t.includes("top") || t.includes("best") || tags.includes("top restaurants") || tags.includes("best restaurant");
  });
  return { props: { posts } };
}

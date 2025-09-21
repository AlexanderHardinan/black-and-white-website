// pages/top-restaurants.js
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "../lib/posts";

export default function TopRestaurants({ posts }) {
  return (
    <>
      <Head>
        <title>Top Restaurants — The Culinary World Gazette</title>
        <meta
          name="description"
          content="Curated picks and destination dining — updated as we eat our way around the world."
        />
      </Head>

      <main className="container py-10 bg-white text-black">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            🌍 Top Restaurants
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Curated picks and destination dining — updated as we eat our way
            around the world.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">
            We’re preparing this list. Check back soon.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(({ slug, frontmatter }) => (
              <Link key={slug} href={`/posts/${slug}`} className="group">
                <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1">
                  {/* Cover */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={frontmatter.cover || "/images/hero.png"}
                      alt={frontmatter.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="text-xs text-gray-500 tracking-wider">
                      {frontmatter.date}
                    </div>
                    <h3 className="mt-1 font-semibold text-lg group-hover:text-[var(--gold)] transition tracking-wide">
                      {frontmatter.title}
                    </h3>
                    {frontmatter.excerpt && (
                      <p className="text-gray-700 text-sm mt-2">
                        {frontmatter.excerpt}
                      </p>
                    )}
                  </div>
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
    return (
      t.includes("top") ||
      t.includes("best") ||
      tags.includes("top restaurants") ||
      tags.includes("best restaurant")
    );
  });
  return { props: { posts } };
}

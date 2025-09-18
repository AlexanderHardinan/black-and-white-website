// pages/posts/[slug].js
import Head from "next/head";
import Link from "next/link";
import { getPostBySlug, getAllPostsMeta } from "../../lib/posts";

export default function Post({ frontmatter, content }) {
  // Uniform post style (black on white)
  const isSpecial =
    (frontmatter?.tags || []).includes("Special Edition") ||
    (frontmatter?.title || "").includes("Special Edition");

  return (
    <div className="container py-10 bg-white text-black">
      <Head>
        <title>{frontmatter.title} — The Culinary World Gazette</title>
        <meta name="description" content={frontmatter.excerpt} />
      </Head>

      {/* Special Edition banner */}
      {isSpecial && (
        <div className="mb-6 rounded-xl border border-[var(--gold)]/50 bg-gradient-to-r from-[rgba(203,161,53,0.08)] via-white to-[rgba(203,161,53,0.08)] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="m12 3 2.5 5.5L20 9l-4 3.6L17 18l-5-2.8L7 18l1-5.4L4 9l5.5-.5L12 3Z"
              stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <div className="text-sm sm:text-base">
            <span className="font-semibold text-[var(--gold)]">Special Edition 2025</span>
            <span className="ml-2 text-black/70">Feature article from The Culinary World Gazette</span>
          </div>
        </div>
      )}

      {/* Post Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {frontmatter.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600">{frontmatter.date}</p>
      </div>

      {/* Cover Image with corner ribbon if special */}
      {frontmatter.cover && (
        <div className="mb-8 relative rounded-lg overflow-hidden">
          <img
            src={frontmatter.cover}
            alt={frontmatter.title}
            className="w-full max-h-[480px] object-cover"
          />
          {isSpecial && (
            <div className="absolute left-3 top-3">
              <span className="inline-block rounded-md bg-[var(--gold)] text-black text-xs font-semibold px-2.5 py-1.5 shadow">
                Special Edition 2025
              </span>
            </div>
          )}
        </div>
      )}

      {/* Article Content */}
      <article
        className="post-content max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Back to Homepage */}
      <div className="mt-12">
        <Link
          href="/"
          className="inline-block rounded-md border border-black px-5 py-2 font-medium text-black hover:bg-black hover:text-white transition"
        >
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getAllPostsMeta();
  return { paths: posts.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const { frontmatter, content } = await getPostBySlug(params.slug);
  return { props: { frontmatter, content } };
}

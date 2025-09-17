// pages/posts/[slug].js
import Head from "next/head";
import Link from "next/link";
import { getPostBySlug, getAllPostsMeta } from "../../lib/posts";

export default function Post({ frontmatter, content }) {
  return (
    <div className="container py-10 bg-white text-black">
      <Head>
        <title>{frontmatter.title} — The Culinary World Gazette</title>
        <meta name="description" content={frontmatter.excerpt} />
      </Head>

      {/* Post Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black">
          {frontmatter.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600">{frontmatter.date}</p>
      </div>

      {/* Cover Image */}
      {frontmatter.cover && (
        <div className="mb-8">
          <img
            src={frontmatter.cover}
            alt={frontmatter.title}
            className="w-full rounded-lg object-cover max-h-[480px]"
          />
        </div>
      )}

      {/* Article Content */}
      <article
        className="prose prose-lg max-w-none prose-black"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Back to Homepage */}
      <div className="mt-12">
        <Link
          href="/"
          className="inline-block rounded-md border px-5 py-2 font-medium transition border-black text-black hover:bg-black hover:text-white"
        >
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}

/* Generate static paths for all posts */
export async function getStaticPaths() {
  const posts = getAllPostsMeta();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

/* Generate props for a single post */
export async function getStaticProps({ params }) {
  const { frontmatter, content } = await getPostBySlug(params.slug);
  return { props: { frontmatter, content } };
}

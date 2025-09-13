import Head from "next/head";
import Link from "next/link";
import { getPostBySlug, getAllPostsMeta } from "../../lib/posts";

export default function Post({ frontmatter, content }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title} — The Culinary World Gazette</title>
      </Head>

      <main className="container py-12">
        <Link href="/" className="text-[var(--gold)]">← Back to Home</Link>

        <article className="mt-6">
          <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
          <div className="text-white/70 mt-2">{frontmatter.date}</div>

          {frontmatter.cover && (
            <img
              src={frontmatter.cover}
              alt={frontmatter.title}
              className="rounded-2xl mt-6 w-full max-h-[480px] object-cover"
            />
          )}

          {/* Blog content */}
          <div
            className="prose prose-lg prose-invert max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
    </>
  );
}

// Tell Next.js what pages to create
export async function getStaticPaths() {
  const posts = getAllPostsMeta();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })), // ex: /posts/pattaya-thailand
    fallback: false,
  };
}

// Load content for each page
export async function getStaticProps({ params }) {
  const { frontmatter, content } = await getPostBySlug(params.slug);
  return { props: { frontmatter, content } };
}

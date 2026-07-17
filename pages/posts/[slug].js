// pages/posts/[slug].js
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getPostBySlug, getAllPostsMeta } from "../../lib/posts";

const ORIGIN = "https://tcwgazette.com";
const SITE_NAME = "The Culinary World Gazette";
const LOGO_URL = `${ORIGIN}/images/logo.png`;

export default function Post({ frontmatter, content }) {
  const router = useRouter();

  // Build canonical and absolute asset URLs using the official domain.
  const pathname = router.asPath?.split(/[?#]/)[0] || "/";
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = `${ORIGIN}${normalizedPath}`;

  const absCover = frontmatter.cover
    ? frontmatter.cover.startsWith("http")
      ? frontmatter.cover
      : `${ORIGIN}${frontmatter.cover.startsWith("/") ? "" : "/"}${
          frontmatter.cover
        }`
    : undefined;

  const isSpecial =
    (frontmatter?.tags || []).includes("Special Edition") ||
    (frontmatter?.title || "").includes("Special Edition");

  const articleTitle = `${frontmatter.title} — ${SITE_NAME}`;

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: absCover ? [absCover] : undefined,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated || frontmatter.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: ORIGIN,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      url: ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    inLanguage: "en",
    keywords: Array.isArray(frontmatter.tags)
      ? frontmatter.tags.join(", ")
      : undefined,
  };

  return (
    <div className="container py-10 bg-white text-black">
      <Head>
        <title>{articleTitle}</title>

        <link rel="canonical" href={pageUrl} />

        <meta name="description" content={frontmatter.excerpt} />

        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />

        <meta
          name="googlebot"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={articleTitle} />
        <meta property="og:description" content={frontmatter.excerpt} />
        <meta property="og:site_name" content={SITE_NAME} />

        {absCover && (
          <>
            <meta property="og:image" content={absCover} />
            <meta property="og:image:secure_url" content={absCover} />
            <meta
              property="og:image:alt"
              content={frontmatter.title}
            />
          </>
        )}

        {frontmatter.date && (
          <meta
            property="article:published_time"
            content={frontmatter.date}
          />
        )}

        {frontmatter.updated && (
          <meta
            property="article:modified_time"
            content={frontmatter.updated}
          />
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleTitle} />
        <meta name="twitter:description" content={frontmatter.excerpt} />

        {absCover && (
          <>
            <meta name="twitter:image" content={absCover} />
            <meta
              name="twitter:image:alt"
              content={frontmatter.title}
            />
          </>
        )}

        {Array.isArray(frontmatter.tags) &&
          frontmatter.tags.map((tag) => (
            <meta
              key={tag}
              property="article:tag"
              content={tag}
            />
          ))}
      </Head>

      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />

      {/* Special Edition banner */}
      {isSpecial && (
        <div className="mb-6 rounded-xl border border-[var(--gold)]/50 bg-gradient-to-r from-[rgba(203,161,53,0.08)] via-white to-[rgba(203,161,53,0.08)] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="m12 3 2.5 5.5L20 9l-4 3.6L17 18l-5-2.8L7 18l1-5.4L4 9l5.5-.5L12 3Z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>

          <div className="text-sm sm:text-base">
            <span className="font-semibold text-[var(--gold)]">
              Special Edition 2025
            </span>

            <span className="ml-2 text-black/70">
              Feature article from The Culinary World Gazette
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          {frontmatter.title}
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          {frontmatter.date}
        </p>
      </div>

      {/* Cover */}
      {frontmatter.cover && (
        <div className="mb-8 relative rounded-lg overflow-hidden">
          <img
            src={frontmatter.cover}
            alt={frontmatter.title}
            className="w-full max-h-[480px] object-cover"
            loading="eager"
            fetchPriority="high"
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

      {/* Body */}
      <article
        className="post-content max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Featured Chefs */}
      {Array.isArray(frontmatter.chefs) &&
        frontmatter.chefs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-[0.015em] mb-2">
              Featured Master Chefs 2025
            </h2>

            <p className="text-black/70 mb-6">
              Profiles highlighted in this special edition.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {frontmatter.chefs.map((chef) => (
                <article
                  key={chef.name}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1"
                >
                  <div className="w-full h-80 sm:h-96 md:h-[28rem] bg-white overflow-hidden flex items-center justify-center">
                    <img
                      src={chef.img}
                      alt={chef.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-black tracking-[0.015em]">
                      {chef.name}
                    </h3>

                    <div className="text-xs text-gray-500 mt-1">
                      {chef.role}
                    </div>

                    <p className="text-sm text-gray-700 mt-3">
                      {chef.blurb}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      {/* Featured Cards */}
      {Array.isArray(frontmatter.cards) &&
        frontmatter.cards.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-[0.015em] mb-2">
              Highlights
            </h2>

            <p className="text-black/70 mb-6">
              Explore featured destinations and dining spots.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontmatter.cards.map((card, index) => (
                <article
                  key={`${card.name}-${index}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1"
                >
                  <div className="w-full h-80 sm:h-96 md:h-[28rem] flex items-center justify-center bg-gray-100 overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-black tracking-[0.015em]">
                      {card.name}
                    </h3>

                    <p className="text-sm text-gray-700 mt-3">
                      {card.blurb}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      {/* Per-restaurant covers */}
      {Array.isArray(frontmatter.covers) &&
        frontmatter.covers.length > 0 && (
          <section className="mt-12 space-y-8">
            {frontmatter.covers.map((item, index) => (
              <figure
                key={`${item.src}-${index}`}
                className="bg-white"
              >
                <img
                  src={item.src}
                  alt={item.title || `Cover ${index + 1}`}
                  className="w-full h-auto rounded-xl shadow-sm"
                  loading="lazy"
                />

                {item.title && (
                  <figcaption className="mt-2 text-sm text-black/60">
                    {item.title}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>
        )}

      {/* Back link */}
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

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { frontmatter, content } = await getPostBySlug(params.slug);

  return {
    props: {
      frontmatter,
      content,
    },
  };
}
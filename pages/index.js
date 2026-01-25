// pages/index.js
import Head from "next/head";
import { useMemo, useState, useCallback } from "react";

import { getAllPostsMeta } from "../lib/posts";

import BackgroundFX from "../components/home/BackgroundFX";
import FeaturedModalCarousel from "../components/home/FeaturedModalCarousel";
import DashboardHero from "../components/home/DashboardHero";
import SearchAndTags from "../components/home/SearchAndTags";
import LatestFeaturesSection from "../components/home/LatestFeaturesSection";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function Home({ posts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [featuredStartIndex, setFeaturedStartIndex] = useState(0);

  const allTags = useMemo(() => {
    const t = new Set();
    (posts || []).forEach((p) => (p.frontmatter?.tags || []).forEach((tag) => t.add(tag)));
    return ["All", ...Array.from(t)];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    return (posts || []).filter(({ frontmatter }) => {
      const title = (frontmatter?.title || "").toLowerCase();
      const excerpt = (frontmatter?.excerpt || "").toLowerCase();
      const tags = frontmatter?.tags || [];
      const matchQ = !q || title.includes(q) || excerpt.includes(q);
      const matchTag = activeTag === "All" || tags.includes(activeTag);
      return matchQ && matchTag;
    });
  }, [posts, query, activeTag]);

  const featuredItems = useMemo(() => (filtered || []).slice(0, 8), [filtered]);
  const topFeatured = filtered?.[0];

  const openFeaturedModalAt = useCallback(
    (index) => {
      setFeaturedStartIndex(clamp(index, 0, Math.max(0, (featuredItems?.length || 1) - 1)));
      setFeaturedOpen(true);
    },
    [featuredItems?.length]
  );

  const closeFeaturedModal = useCallback(() => setFeaturedOpen(false), []);

  return (
    <>
      <Head>
        <title>The Culinary World Gazette</title>
        <meta
          name="description"
          content="Discover the best restaurants around the world — guides, reviews, and chef stories."
        />
      </Head>

      <BackgroundFX />

      <FeaturedModalCarousel
        open={featuredOpen}
        onClose={closeFeaturedModal}
        items={featuredItems}
        startIndex={featuredStartIndex}
      />

      <main className="relative z-10 pt-10 md:pt-14 text-white">
        <DashboardHero
          posts={posts}
          allTags={allTags}
          topFeatured={topFeatured}
          onOpenFeaturedAt={openFeaturedModalAt}
        />

        <SearchAndTags
          query={query}
          setQuery={setQuery}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          allTags={allTags}
          filtered={filtered}
        />

        <LatestFeaturesSection
          featuredItems={featuredItems}
          onOpenFeaturedAt={openFeaturedModalAt}
        />
      </main>
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPostsMeta() } };
}

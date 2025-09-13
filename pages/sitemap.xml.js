// pages/sitemap.xml.js
import { getAllPostsMeta } from "../lib/posts";

const SITE = process.env.SITE_URL || "http://localhost:3000";

function generateSitemap(posts) {
  const staticUrls = [`${SITE}/`, `${SITE}/rss.xml`];

  const statics = staticUrls
    .map(
      (u) => `
    <url>
      <loc>${u}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join("");

  const articles = posts
    .map(({ slug, frontmatter }) => {
      const loc = `${SITE}/posts/${slug}`;
      const lastmod = new Date(frontmatter.date).toISOString();
      return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${statics}
    ${articles}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  const posts = getAllPostsMeta();
  const xml = generateSitemap(posts);
  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() { return null; }

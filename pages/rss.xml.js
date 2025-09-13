// pages/rss.xml.js
import { getAllPostsMeta } from "../lib/posts";

const SITE = process.env.SITE_URL || "http://localhost:3000";

function generateRss(posts) {
  const items = posts
    .map(({ slug, frontmatter }) => {
      const url = `${SITE}/posts/${slug}`;
      return `
      <item>
        <title><![CDATA[${frontmatter.title}]]></title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${new Date(frontmatter.date).toUTCString()}</pubDate>
        <description><![CDATA[${frontmatter.excerpt || ""}]]></description>
      </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>The Culinary World Gazette</title>
      <link>${SITE}</link>
      <description>Global restaurant features and guides.</description>
      ${items}
    </channel>
  </rss>`;
}

export async function getServerSideProps({ res }) {
  const posts = getAllPostsMeta();
  const xml = generateRss(posts);
  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function RSS() { return null; }

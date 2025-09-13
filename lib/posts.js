import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "_posts");

export function getAllPostsMeta() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));
  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, "");
    const source = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(source);
    return { slug, frontmatter: data };
  });
  return posts.sort((a,b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);
  return { frontmatter: data, content: processed.toString() };
}

import type { MetadataRoute } from "next";
import { getAllPosts, getAllCategories } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 静态页
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/behind`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/workshop`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/releases`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
  ];

  // 分类页
  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: `${SITE_URL}/blog/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 文章页（从 frontmatter.date 取最后修改时间）
  const postPages: MetadataRoute.Sitemap = getAllPosts()
    .filter((p) => p.frontmatter.published !== false)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.category}/${p.slug}`,
      lastModified: new Date(p.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...categoryPages, ...postPages];
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getCategoryLabel, getPostsByCategory } from "@/lib/content";
import { PostClient } from "./PostClient";

export function generateStaticParams() {
  const fs = require("fs");
  const path = require("path");
  const blogDir = path.join(process.cwd(), "content", "blog");
  const params: { category: string; slug: string }[] = [];

  const categories = fs.readdirSync(blogDir);
  for (const cat of categories) {
    const catDir = path.join(blogDir, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;
    const files = fs.readdirSync(catDir);
    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
      params.push({
        category: cat,
        slug: file.replace(/\.(md|mdx)$/, ""),
      });
    }
  }

  return params;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) {
    notFound();
  }

  // 同分类的其他文章（最多 3 篇，排除当前文章）
  const relatedPosts = getPostsByCategory(category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <PostClient
      category={category}
      categoryLabel={getCategoryLabel(category)}
      post={post}
      relatedPosts={relatedPosts}
    />
  );
}

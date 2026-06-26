import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getCategoryLabel, getPostsByCategory } from "@/lib/content";
import { PostClient } from "./PostClient";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
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

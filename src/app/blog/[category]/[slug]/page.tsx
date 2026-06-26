import { notFound } from "next/navigation";
import {
  getAllCategories,
  getAllPosts,
  getCategoryLabel,
  getPost,
  getPostsByCategory,
} from "@/lib/content";
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
  const categories = getAllCategories();
  const allPosts = getAllPosts();

  if (!post) {
    notFound();
  }

  const relatedPosts = getPostsByCategory(category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <PostClient
      category={category}
      categoryLabel={getCategoryLabel(category)}
      post={post}
      relatedPosts={relatedPosts}
      categories={categories}
      allPosts={allPosts}
    />
  );
}

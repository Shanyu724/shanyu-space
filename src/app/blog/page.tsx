import { getAllPosts, getAllCategories, getCategoryLabel } from "@/lib/content";
import { BlogClient } from "./BlogClient";

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const labels = Object.fromEntries(
    categories.map((c) => [c.id, getCategoryLabel(c.id)])
  );

  return (
    <BlogClient
      posts={posts}
      categories={categories}
      labels={labels}
    />
  );
}

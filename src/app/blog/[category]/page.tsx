import { getAllCategories, getAllPosts, getPostsByCategory, getCategoryLabel, getCategoryDescription } from "@/lib/content";
import { CategoryClient } from "./CategoryClient";

export function generateStaticParams() {
  const categories = ["modeling", "finance", "study", "assets", "macro", "essays"];
  return categories.map((cat) => ({ category: cat }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const label = getCategoryLabel(category);
  const description = getCategoryDescription(category);
  const categories = getAllCategories();
  const allPosts = getAllPosts();

  return (
    <CategoryClient
      category={category}
      posts={posts}
      label={label}
      description={description}
      categories={categories}
      allPosts={allPosts}
    />
  );
}

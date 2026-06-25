import Link from "next/link";
import { getPostsByCategory, getCategoryLabel, getCategoryDescription } from "@/lib/content";
import { CategoryClient } from "./CategoryClient";

export function generateStaticParams() {
  const categories = ["geo", "finance", "study", "essays"];
  return categories.map((cat) => ({ category: cat }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const label = getCategoryLabel(category);
  const description = getCategoryDescription(category);

  return (
    <CategoryClient
      category={category}
      posts={posts}
      label={label}
      description={description}
    />
  );
}

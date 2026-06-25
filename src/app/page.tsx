import { getAllPosts, getAllCategories, getCategoryLabel } from "@/lib/content";
import { HomeClient } from "./HomeClient";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);
  const categories = getAllCategories();

  const labels = Object.fromEntries(
    categories.map((c) => [c.id, getCategoryLabel(c.id)])
  );

  return (
    <HomeClient
      categories={categories}
      latestPosts={latestPosts}
      labels={labels}
    />
  );
}
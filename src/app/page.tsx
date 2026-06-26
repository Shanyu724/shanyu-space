import { getAllPosts, getAllCategories, getCategoryLabel } from "@/lib/content";
import { getMe } from "@/lib/me";
import { HomeClient } from "./HomeClient";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);
  const categories = getAllCategories();
  const me = getMe();

  const labels = Object.fromEntries(categories.map((c) => [c.id, getCategoryLabel(c.id)]));

  return <HomeClient me={me} categories={categories} latestPosts={latestPosts} labels={labels} />;
}

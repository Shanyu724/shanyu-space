"use client";

import Link from "next/link";
import { SiteIcon } from "@/components/SiteIcon";
import { getCategoryMeta } from "@/lib/utils";
import type { Post } from "@/lib/content";

interface CategoryInfo {
  id: string;
  label: string;
  description: string;
}

interface BlogShelfNavProps {
  categories: CategoryInfo[];
  posts: Post[];
  currentCategory?: string;
  currentSlug?: string;
}

function formatDate(date: string) {
  return date.replace(/-/g, ".");
}

export function BlogShelfNav({
  categories,
  posts,
  currentCategory,
  currentSlug,
}: BlogShelfNavProps) {
  const postsByCategory = new Map<string, Post[]>();

  for (const category of categories) {
    postsByCategory.set(
      category.id,
      posts.filter((post) => post.category === category.id),
    );
  }

  return (
    <aside className="hidden xl:flex xl:h-[calc(100dvh-10rem)] xl:w-[18.5rem] xl:flex-shrink-0 xl:self-start xl:sticky xl:top-4">
      <div className="blog-surface blog-sidebar-card flex min-h-0 flex-1 flex-col rounded-[1.5rem] px-4 py-5">
        <div className="border-b border-mint-900/10 pb-4">
          <p className="text-[10px] uppercase tracking-[0.32em] text-earth-300">Archive</p>
          <h2 className="mt-2 font-serif text-[2rem] leading-none text-mint-900">博客 Blog</h2>
          <p className="mt-2 text-xs leading-6 text-mint-600">
            按主题归档，慢慢长成一整套自己的目录。
          </p>
        </div>

        <div className="blog-soft-scroll mt-5 min-h-0 flex-1 overflow-y-auto pr-2">
          <div className="space-y-5">
            {categories.map((category) => {
              const meta = getCategoryMeta(category.id);
              const items = postsByCategory.get(category.id) || [];
              const isCurrentCategory = currentCategory === category.id;

              return (
                <section key={category.id} className="relative pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px rounded-full bg-mint-900/10"
                  />
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-mint-900/10 bg-white/70"
                      style={{ color: meta.color }}
                    >
                      <SiteIcon name={meta.icon} className="h-3.5 w-3.5" />
                    </span>
                    <Link
                      href={`/blog/${category.id}`}
                      className={`min-w-0 text-sm transition-colors ${
                        isCurrentCategory ? "text-mint-900" : "text-mint-700 hover:text-rose-500"
                      }`}
                    >
                      <span className="font-medium">{category.label}</span>
                      <span className="ml-2 text-[11px] text-earth-300">{items.length}</span>
                    </Link>
                  </div>

                  {items.length > 0 ? (
                    <ul className="space-y-1.5">
                      {items.map((post) => {
                        const isCurrentPost =
                          currentCategory === post.category && currentSlug === post.slug;

                        return (
                          <li key={`${post.category}/${post.slug}`}>
                            <Link
                              href={`/blog/${post.category}/${post.slug}`}
                              className={`group block rounded-xl border px-3 py-2 transition-all ${
                                isCurrentPost
                                  ? "border-mint-200/90 bg-mint-900/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
                                  : "border-transparent hover:border-mint-100/90 hover:bg-white/55"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  aria-hidden="true"
                                  className={`mt-[0.38rem] h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                                    isCurrentPost ? "bg-rose-400" : "bg-mint-300"
                                  }`}
                                />
                                <div className="min-w-0 flex-1">
                                  <p
                                    className={`line-clamp-2 text-[13px] leading-5 transition-colors ${
                                      isCurrentPost
                                        ? "text-mint-900"
                                        : "text-mint-700 group-hover:text-mint-900"
                                    }`}
                                  >
                                    {post.frontmatter.title}
                                  </p>
                                  <p className="mt-1 text-[11px] tracking-[0.08em] text-earth-300">
                                    {formatDate(post.frontmatter.date)}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="rounded-xl border border-dashed border-mint-100/80 px-3 py-2 text-[12px] text-mint-400">
                      这一卷暂未刊出文章
                    </p>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

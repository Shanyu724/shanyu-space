"use client";

import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { BlogShelfNav } from "@/components/BlogShelfNav";
import { SiteIcon } from "@/components/SiteIcon";
import { getCategoryMeta } from "@/lib/utils";
import type { Post } from "@/lib/content";

interface CategoryInfo {
  id: string;
  label: string;
  description: string;
}

interface BlogClientProps {
  posts: Post[];
  categories: CategoryInfo[];
  labels: Record<string, string>;
}

export function BlogClient({ posts, categories, labels }: BlogClientProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredPosts = useMemo(
    () => (filter === "all" ? posts : posts.filter((post) => post.category === filter)),
    [posts, filter],
  );

  const featuredPosts = filteredPosts.slice(0, 6);
  const currentCategory = filter === "all" ? undefined : filter;
  const currentLabel =
    filter === "all"
      ? "全部文章"
      : categories.find((category) => category.id === filter)?.label || "全部文章";

  return (
    <div className="mx-auto max-w-[94rem] px-4 py-8 sm:px-6 md:py-10">
      <div className="blog-shell grid gap-6 xl:grid-cols-[18.5rem_minmax(0,1fr)]">
        <BlogShelfNav categories={categories} posts={posts} currentCategory={currentCategory} />

        <main className="min-w-0">
          <FadeIn>
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="blog-surface rounded-[1.5rem] px-5 py-5 md:px-7 md:py-7">
                <div className="border-b border-mint-900/10 pb-4">
                  <div className="max-w-[44rem]">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-earth-300">
                      Current Shelf
                    </p>
                    <h1 className="mt-2 font-serif text-[clamp(2.5rem,4vw,3.8rem)] leading-[0.94] text-mint-900">
                      {currentLabel}
                    </h1>
                    <p className="mt-3 text-sm leading-7 text-mint-700 md:text-[15px]">
                      这里直接展开卷册，左侧书架固定，正文区只负责把内容安静地铺开。
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                      <SiteIcon name="book" className="h-4 w-4" />
                      <span>全部</span>
                      <span className="text-[10px] opacity-65">({posts.length})</span>
                    </FilterButton>
                    {categories.map((category) => {
                      const meta = getCategoryMeta(category.id);
                      const count = posts.filter((post) => post.category === category.id).length;
                      return (
                        <FilterButton
                          key={category.id}
                          active={filter === category.id}
                          onClick={() => setFilter(category.id)}
                        >
                          <SiteIcon name={meta.icon} className="h-4 w-4" />
                          <span>{category.label}</span>
                          <span className="text-[10px] opacity-65">({count})</span>
                        </FilterButton>
                      );
                    })}
                  </div>
                </div>

                {featuredPosts.length > 0 ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {featuredPosts.map((post, index) => {
                      const meta = getCategoryMeta(post.category);
                      return (
                        <motion.div
                          key={`${post.category}/${post.slug}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.08 + index * 0.05 }}
                        >
                          <Link
                            href={`/blog/${post.category}/${post.slug}`}
                            className="group block h-full rounded-[1.25rem] border border-mint-900/8 bg-white/55 p-5 transition-all hover:-translate-y-0.5 hover:border-mint-900/16 hover:bg-white/72"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px]"
                                style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                              >
                                <SiteIcon name={meta.icon} className="h-3.5 w-3.5" />
                                <span>{labels[post.category] || post.category}</span>
                              </span>
                              <span className="text-[11px] tracking-[0.08em] text-earth-300">
                                {post.frontmatter.date.replace(/-/g, ".")}
                              </span>
                            </div>

                            <h3 className="mt-4 font-serif text-[1.7rem] leading-tight text-mint-900 transition-colors group-hover:text-rose-500">
                              {post.frontmatter.title}
                            </h3>
                            {post.frontmatter.description && (
                              <p className="mt-3 text-sm leading-7 text-mint-700">
                                {post.frontmatter.description}
                              </p>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-5 rounded-[1.25rem] border border-dashed border-mint-100/90 bg-white/35 px-5 py-10 text-center">
                    <SiteIcon name="sprout" className="mx-auto h-8 w-8 text-mint-400" />
                    <p className="mt-4 font-serif text-2xl text-mint-800">这一卷还在生长</p>
                    <p className="mt-2 text-sm text-mint-500">先去别的卷里看看，过几天再回来。</p>
                  </div>
                )}
              </div>

              <div className="blog-surface rounded-[1.5rem] px-5 py-5 md:px-6">
                <p className="text-[11px] uppercase tracking-[0.32em] text-earth-300">Volumes</p>
                <div className="mt-4 space-y-3">
                  {categories.map((category, index) => {
                    const meta = getCategoryMeta(category.id);
                    const count = posts.filter((post) => post.category === category.id).length;
                    return (
                      <Link
                        key={category.id}
                        href={`/blog/${category.id}`}
                        className="group flex items-start gap-3 rounded-[1.15rem] border border-mint-900/8 bg-white/40 px-4 py-3 transition-all hover:border-mint-900/14 hover:bg-white/65"
                      >
                        <span
                          className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-mint-900/10 bg-white/60"
                          style={{ color: meta.color }}
                        >
                          <SiteIcon name={meta.icon} className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-medium text-mint-900 transition-colors group-hover:text-rose-500">
                              {category.label}
                            </h3>
                            <span className="text-[11px] text-earth-300">{String(index + 1).padStart(2, "0")}</span>
                          </div>
                          <p className="mt-1 text-xs leading-6 text-mint-600">{category.description}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-earth-300">
                            {count} 篇文章
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          </FadeIn>
        </main>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs transition-all ${
        active
          ? "border-mint-900/18 bg-mint-900/[0.07] text-mint-900"
          : "border-mint-900/8 bg-white/35 text-mint-700 hover:border-mint-900/16 hover:bg-white/60 hover:text-mint-900"
      }`}
    >
      {children}
    </button>
  );
}

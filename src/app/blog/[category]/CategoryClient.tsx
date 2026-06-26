"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { BlogShelfNav } from "@/components/BlogShelfNav";
import { SiteIcon } from "@/components/SiteIcon";
import type { Post } from "@/lib/content";
import { getCategoryMeta } from "@/lib/utils";

interface CategoryInfo {
  id: string;
  label: string;
  description: string;
}

interface CategoryClientProps {
  category: string;
  posts: Post[];
  label: string;
  description: string;
  categories: CategoryInfo[];
  allPosts: Post[];
}

export function CategoryClient({
  category,
  posts,
  label,
  description,
  categories,
  allPosts,
}: CategoryClientProps) {
  const meta = getCategoryMeta(category);

  return (
    <div className="mx-auto max-w-[94rem] px-4 py-8 sm:px-6 md:py-10">
      <div className="blog-shell grid gap-6 xl:grid-cols-[18.5rem_minmax(0,1fr)]">
        <BlogShelfNav categories={categories} posts={allPosts} currentCategory={category} />

        <main className="min-w-0 space-y-6">
          <FadeIn>
            <section className="blog-surface rounded-[1.45rem] px-5 py-5 md:px-7 md:py-7">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-mint-900/10 bg-white/38 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-earth-300 transition-colors hover:text-rose-500"
              >
                <span>←</span>
                <span>返回目录</span>
              </Link>

              <div className="mt-6 flex items-start gap-4">
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-mint-900/10 bg-white/48"
                  style={{ color: meta.color }}
                >
                  <SiteIcon name={meta.icon} className="h-7 w-7" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-earth-300">Volume</p>
                  <h1 className="mt-2 font-serif text-[clamp(2.5rem,4vw,3.8rem)] leading-[0.94] text-mint-900">
                    {label}
                  </h1>
                  <p className="mt-4 max-w-[40rem] text-sm leading-7 text-mint-700 md:text-[15px]">
                    {description}
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          <FadeIn delay={0.08}>
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="blog-surface rounded-[1.5rem] px-5 py-5 md:px-7 md:py-7">
                <div className="flex items-center justify-between gap-3 border-b border-mint-900/10 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-earth-300">Archive</p>
                    <h2 className="mt-2 font-serif text-[2rem] leading-none text-mint-900">这一卷的文章</h2>
                  </div>
                  <span className="rounded-full border border-mint-900/10 bg-white/45 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-earth-300">
                    {posts.length} 篇
                  </span>
                </div>

                {posts.length > 0 ? (
                  <div className="mt-5 space-y-4">
                    {posts.map((post, index) => (
                      <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08 + index * 0.05 }}
                      >
                        <Link
                          href={`/blog/${category}/${post.slug}`}
                          className="group block rounded-[1.25rem] border border-mint-900/8 bg-white/55 px-5 py-5 transition-all hover:-translate-y-0.5 hover:border-mint-900/16 hover:bg-white/72"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px]"
                              style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                            >
                              <SiteIcon name={meta.icon} className="h-3.5 w-3.5" />
                              <span>{label}</span>
                            </span>
                            <span className="text-[11px] tracking-[0.08em] text-earth-300">
                              {post.frontmatter.date.replace(/-/g, ".")}
                            </span>
                          </div>

                          <h3 className="mt-4 font-serif text-[1.9rem] leading-tight text-mint-900 transition-colors group-hover:text-rose-500">
                            {post.frontmatter.title}
                          </h3>

                          {post.frontmatter.description && (
                            <p className="mt-3 max-w-[44rem] text-sm leading-7 text-mint-700">
                              {post.frontmatter.description}
                            </p>
                          )}

                          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {post.frontmatter.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-mint-900/8 bg-white/48 px-2 py-1 text-[11px] text-mint-500"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-[1.25rem] border border-dashed border-mint-100/90 bg-white/35 px-5 py-10 text-center">
                    <SiteIcon name="sprout" className="mx-auto h-8 w-8 text-mint-400" />
                    <p className="mt-4 font-serif text-2xl text-mint-800">这一卷还未展开</p>
                    <p className="mt-2 text-sm text-mint-500">目录已经放好，文章会慢慢补进来。</p>
                  </div>
                )}
              </div>

              <div className="blog-surface rounded-[1.5rem] px-5 py-5 md:px-6">
                <p className="text-[11px] uppercase tracking-[0.32em] text-earth-300">Volumes</p>
                <div className="mt-4 space-y-3">
                  {categories
                    .filter((item) => item.id !== category)
                    .map((item) => {
                      const itemMeta = getCategoryMeta(item.id);
                      return (
                        <Link
                          key={item.id}
                          href={`/blog/${item.id}`}
                          className="group flex items-start gap-3 rounded-[1.1rem] border border-mint-900/8 bg-white/40 px-4 py-3 transition-all hover:border-mint-900/14 hover:bg-white/65"
                        >
                          <span
                            className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-mint-900/10 bg-white/60"
                            style={{ color: itemMeta.color }}
                          >
                            <SiteIcon name={itemMeta.icon} className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-mint-900 transition-colors group-hover:text-rose-500">
                              {item.label}
                            </h3>
                            <p className="mt-1 text-xs leading-6 text-mint-600">{item.description}</p>
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

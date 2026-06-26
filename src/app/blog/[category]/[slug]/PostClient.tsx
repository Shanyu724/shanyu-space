"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { BlogShelfNav } from "@/components/BlogShelfNav";
import { MarkdownRenderer, extractToc } from "@/components/MarkdownRenderer";
import { estimateReadingTime, getCategoryMeta } from "@/lib/utils";
import { SiteIcon } from "@/components/SiteIcon";
import type { Post } from "@/lib/content";

interface CategoryInfo {
  id: string;
  label: string;
  description: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface PostClientProps {
  category: string;
  categoryLabel: string;
  post: Post;
  relatedPosts: Post[];
  categories: CategoryInfo[];
  allPosts: Post[];
}

export function PostClient({
  category,
  categoryLabel,
  post,
  relatedPosts,
  categories,
  allPosts,
}: PostClientProps) {
  const readingTime = estimateReadingTime(post.content);
  const meta = getCategoryMeta(category);
  const tocItems = useMemo(() => extractToc(post.content), [post.content]);

  return (
    <div className="mx-auto max-w-[96rem] px-4 py-8 sm:px-6 md:py-10">
      <div className="blog-shell grid gap-6 xl:grid-cols-[18.5rem_minmax(0,1fr)_21rem] xl:items-start">
        <BlogShelfNav
          categories={categories}
          posts={allPosts}
          currentCategory={category}
          currentSlug={post.slug}
        />

        <main className="min-w-0 space-y-6">
          <FadeIn>
            <section className="blog-surface rounded-[1.45rem] px-5 py-5 md:px-7 md:py-7 xl:px-9">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-mint-900/10 pb-4">
                <Link
                  href={`/blog/${category}`}
                  className="inline-flex items-center gap-2 rounded-full border border-mint-900/10 bg-white/38 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-earth-300 transition-colors hover:text-rose-500"
                >
                  <span>←</span>
                  <span>返回 {categoryLabel}</span>
                </Link>

                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-earth-300">
                  <span>{post.frontmatter.date.replace(/-/g, ".")}</span>
                  <span className="h-px w-8 bg-mint-900/12" />
                  <span>{readingTime}</span>
                </div>
              </div>

              <article className="mt-6">
                <header className="max-w-[44rem]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px]"
                      style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                    >
                      <SiteIcon name={meta.icon} className="h-3.5 w-3.5" />
                      <span>{categoryLabel}</span>
                    </span>
                    {post.frontmatter.tags?.length ? (
                      <span className="text-[11px] tracking-[0.08em] text-earth-300">
                        {post.frontmatter.tags.length} tags
                      </span>
                    ) : null}
                  </div>

                  <h1 className="mt-4 font-serif text-[clamp(2.5rem,4vw,4rem)] leading-[0.95] text-mint-900">
                    {post.frontmatter.title}
                  </h1>

                  {post.frontmatter.description && (
                    <p className="mt-4 text-sm leading-7 text-mint-700 md:text-[15px]">
                      {post.frontmatter.description}
                    </p>
                  )}
                </header>

                <div className="mt-8 rounded-[1.25rem] border border-mint-900/8 bg-white/55 px-5 py-5 md:px-7 md:py-7">
                  <div className="prose max-w-none">
                    <ContentWithAnimation content={post.content} />
                  </div>
                </div>

                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-mint-900/8 bg-white/45 px-3 py-1 text-xs text-mint-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </section>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-mint-900/10 bg-white/45 px-5 py-4 text-sm text-mint-700">
              <Link
                href={`/blog/${category}`}
                className="inline-flex items-center gap-1 transition-colors hover:text-rose-500"
              >
                <span>←</span>
                <span>返回 {categoryLabel}</span>
              </Link>
              <Link href="/blog" className="transition-colors hover:text-rose-500">
                查看全部文章
              </Link>
            </div>
          </FadeIn>

          {relatedPosts.length > 0 && (
            <FadeIn delay={0.12}>
              <section className="blog-surface rounded-[1.35rem] px-5 py-5 md:px-7 md:py-6">
                <div className="flex items-center justify-between gap-3 border-b border-mint-900/10 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-earth-300">Related</p>
                    <h2 className="mt-2 font-serif text-[1.85rem] leading-none text-mint-900">
                      继续阅读
                    </h2>
                  </div>
                  <span className="rounded-full border border-mint-900/10 bg-white/45 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-earth-300">
                    {relatedPosts.length} 篇
                  </span>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {relatedPosts.slice(0, 4).map((rp, index) => (
                    <RelatedPostCard key={rp.slug} post={rp} index={index} />
                  ))}
                </div>
              </section>
            </FadeIn>
          )}
        </main>

        <aside className="hidden xl:flex xl:h-[calc(100dvh-10rem)] xl:flex-col xl:sticky xl:top-4">
          <div className="blog-surface flex min-h-0 flex-1 flex-col rounded-[1.35rem] px-5 py-5">
            <div className="border-b border-mint-900/10 pb-4">
              <p className="text-[11px] uppercase tracking-[0.32em] text-earth-300">On this page</p>
              <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-earth-300">
                <span>{readingTime}</span>
                <span>{post.frontmatter.tags?.length || 0} tags</span>
                <span>{categoryLabel.slice(0, 2)}</span>
              </div>
            </div>

            <div className="mt-4 flex min-h-0 flex-1 flex-col">
              <h2 className="mb-2 text-[11px] uppercase tracking-[0.32em] text-earth-300">目录</h2>
              <TocNav items={tocItems} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TocNav({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const root = document.getElementById("main-scroll");
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { root, rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    const root = document.getElementById("main-scroll");
    if (element && root) {
      const top =
        element.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 76;
      root.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (items.length === 0) {
    return <p className="text-sm text-mint-500">这一页没有可用目录。</p>;
  }

  return (
    <nav className="blog-soft-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`block rounded-lg border-l-2 px-3 py-1.5 text-[13px] leading-5 transition-all ${
            active === item.id
              ? "border-rose-400 bg-mint-900/[0.045] text-mint-900"
              : "border-transparent text-mint-600 hover:border-mint-200 hover:bg-white/45 hover:text-mint-900"
          } ${item.level === 3 ? "ml-4" : ""}`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}

function RelatedPostCard({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  const meta = getCategoryMeta(post.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.05 }}
    >
      <Link
        href={`/blog/${post.category}/${post.slug}`}
        className="group block rounded-[1rem] border border-mint-900/8 bg-white/45 px-5 py-4 transition-all hover:border-mint-900/14 hover:bg-white/68"
      >
        <div className="flex items-center gap-2">
          <SiteIcon name={meta.icon} className="h-3.5 w-3.5" />
          <span className="text-[11px] text-earth-300" style={{ fontFamily: "var(--font-handwriting)" }}>
            {post.frontmatter.date.replace(/-/g, ".")}
          </span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-mint-900 transition-colors group-hover:text-rose-500">
          {post.frontmatter.title}
        </h3>
      </Link>
    </motion.div>
  );
}

function ContentWithAnimation({ content }: { content: string }) {
  const sections = content.split(/(?=^### |^## |^# )/m).filter(Boolean);

  if (sections.length <= 1) {
    return <MarkdownRenderer content={content} />;
  }

  return (
    <>
      {sections.map((section, i) => (
        <FadeIn key={i} delay={Math.min(i * 0.05, 0.3)} y={16}>
          <div className="section-fade">
            <MarkdownRenderer content={section} />
          </div>
        </FadeIn>
      ))}
    </>
  );
}

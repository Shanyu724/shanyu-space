"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { MarkdownRenderer, extractToc } from "@/components/MarkdownRenderer";
import { estimateReadingTime, getCategoryMeta } from "@/lib/utils";
import type { Post } from "@/lib/content";

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
}

export function PostClient({ category, categoryLabel, post, relatedPosts }: PostClientProps) {
  const readingTime = estimateReadingTime(post.content);
  const meta = getCategoryMeta(category);
  const tocItems = extractToc(post.content);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* Breadcrumb */}
      <FadeIn y={8}>
        <div className="flex items-center gap-2 text-sm text-mint-500 mb-8">
          <Link href="/blog" className="hover:text-rose-400 transition-colors">
            博客
          </Link>
          <span>/</span>
          <Link href={`/blog/${category}`} className="hover:text-rose-400 transition-colors">
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-mint-700 truncate max-w-[220px]">{post.frontmatter.title}</span>
        </div>
      </FadeIn>

      <div className="lg:flex lg:gap-8 lg:items-start">
        {/* ── 左栏：文章正文 ── */}
        <article className="lg:flex-1 lg:min-w-0 max-w-3xl">
          {/* Header */}
          <FadeIn y={12} delay={0.08}>
            <header className="mb-10 relative p-6 md:p-8 rounded-2xl bg-white/75 border border-mint-100/70 backdrop-blur-sm">
              <div
                className="absolute -top-2.5 left-12 w-16 h-3 rounded-sm opacity-60 rotate-[-3deg]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(241,233,233,0.92) 0%, rgba(210,176,176,0.55) 100%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
              />

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span
                  className="text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1"
                  style={{
                    backgroundColor: `${meta.color}18`,
                    color: meta.color,
                  }}
                >
                  <span>{meta.emoji}</span>
                  <span>{categoryLabel}</span>
                </span>
                <span
                  className="text-base text-rose-400"
                  style={{ fontFamily: "var(--font-handwriting)" }}
                >
                  {post.frontmatter.date}
                </span>
                <span className="text-xs text-mint-400">·</span>
                <span className="text-xs text-mint-500">{readingTime}</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-3xl md:text-4xl font-serif font-bold text-mint-800 leading-tight"
              >
                {post.frontmatter.title}
              </motion.h1>

              {post.frontmatter.description && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-4 text-base md:text-lg text-mint-600 leading-relaxed"
                >
                  {post.frontmatter.description}
                </motion.p>
              )}

              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-mint-500 bg-mint-50/80 border border-mint-100 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </header>
          </FadeIn>

          {/* Content with scroll-triggered fade-in */}
          <FadeIn delay={0.14} y={12}>
            <div className="rounded-2xl bg-white/70 border border-mint-100/70 backdrop-blur-sm p-6 md:p-8">
              <div className="prose">
                <ContentWithAnimation content={post.content} />
              </div>
            </div>
          </FadeIn>

          {/* Mobile related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-10 lg:hidden">
              <h2 className="text-xs uppercase tracking-widest text-mint-500 mb-5">
                📚 同一主题的其他文章
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedPosts.map((rp, i) => (
                  <RelatedPostCard key={rp.slug} post={rp} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <FadeIn y={12} delay={0.3}>
            <div className="mt-12 pt-8 border-t border-mint-100/70 flex items-center justify-between">
              <Link
                href={`/blog/${category}`}
                className="text-sm text-mint-600 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
              >
                <span>←</span> 返回 {categoryLabel}
              </Link>
              <Link
                href="/blog"
                className="text-sm text-mint-500 hover:text-rose-400 transition-colors"
              >
                全部文章
              </Link>
            </div>
          </FadeIn>
        </article>

        {/* ── 右栏：文章信息卡 / 相关文章 ── */}
        <aside className="hidden lg:block lg:w-[300px] lg:flex-shrink-0 lg:sticky lg:top-2">
          <FadeIn delay={0.16}>
            <div className="space-y-5">
              <ArticleInfoCard
                category={category}
                categoryLabel={categoryLabel}
                post={post}
                readingTime={readingTime}
                tocItems={tocItems}
              />

              {relatedPosts.length > 0 && (
                <div className="relative rounded-2xl bg-white/80 border border-mint-100/70 backdrop-blur-sm p-5">
                  <h2
                    className="text-2xl text-mint-700 mb-3"
                    style={{ fontFamily: "var(--font-handwriting)" }}
                  >
                    same shelf
                  </h2>
                  <div className="space-y-3">
                    {relatedPosts.slice(0, 4).map((rp, i) => (
                      <RelatedPostCard key={rp.slug} post={rp} index={i} compact />
                    ))}
                  </div>
                  <Link
                    href={`/blog/${category}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs text-mint-600 hover:text-rose-400 transition-colors"
                  >
                    <span>查看这个分类全部文章</span>
                    <span>→</span>
                  </Link>
                </div>
              )}
            </div>
          </FadeIn>
        </aside>
      </div>
    </div>
  );
}

function ArticleInfoCard({
  category,
  categoryLabel,
  post,
  readingTime,
  tocItems,
}: {
  category: string;
  categoryLabel: string;
  post: Post;
  readingTime: string;
  tocItems: TocItem[];
}) {
  const meta = getCategoryMeta(category);
  const tagCount = post.frontmatter.tags?.length || 0;

  return (
    <div className="relative rounded-2xl bg-white/80 border border-mint-100/70 backdrop-blur-sm p-5">
      <div
        className="absolute -top-2 right-8 w-14 h-3 rounded-sm opacity-60 rotate-[3deg]"
        style={{
          background:
            "linear-gradient(135deg, rgba(232,237,233,0.95) 0%, rgba(200,213,202,0.55) 100%)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      />

      <div className="text-center mb-5">
        <span className="text-4xl inline-block mb-2">{meta.emoji}</span>
        <h2
          className="text-3xl text-mint-700 leading-none"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          article card
        </h2>
        <p className="text-xs text-mint-500 mt-2 line-clamp-2">{post.frontmatter.title}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        <InfoTile value={readingTime.replace(" 分钟", "m")} label="read" />
        <InfoTile value={tagCount.toString()} label="tags" />
        <InfoTile value={categoryLabel.slice(0, 2)} label="type" />
      </div>

      {/* 目录（合并自原 ScrollTOC，避免 fixed 浮动和右栏重叠） */}
      {tocItems.length > 0 && (
        <div className="mb-5 pt-4 border-t border-dashed border-mint-200/70">
          <h3 className="text-[11px] uppercase tracking-widest text-mint-400 mb-2">目录</h3>
          <TocNav items={tocItems} />
        </div>
      )}

      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[11px] uppercase tracking-widest text-mint-400 mb-2">tags</h3>
          <div className="flex flex-wrap gap-1.5">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-mint-500 bg-mint-50/80 border border-mint-100 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-dashed border-mint-200/80 text-center">
        <p className="text-base text-rose-400" style={{ fontFamily: "var(--font-handwriting)" }}>
          one page at a time
        </p>
      </div>
    </div>
  );
}

/**
 * 目录导航（内嵌在 ArticleInfoCard 内）
 * - 跟随阅读位置高亮当前章节
 * - 点击平滑滚动到对应标题
 */
function TocNav({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const root = document.getElementById("main-scroll");
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { root, rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    const root = document.getElementById("main-scroll");
    if (el && root) {
      const top =
        el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 80;
      root.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="border-l border-mint-200 pl-3 space-y-1.5 max-h-72 overflow-y-auto">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`block text-xs leading-snug transition-all ${item.level === 3 ? "pl-3" : ""} ${
            active === item.id ? "text-rose-500 font-medium" : "text-mint-500 hover:text-rose-400"
          }`}
        >
          <span
            className={`inline-block transition-all ${
              active === item.id ? "w-2 h-0.5 bg-rose-400 mr-2 align-middle" : "w-0 mr-0"
            }`}
          />
          {item.text}
        </a>
      ))}
    </nav>
  );
}

function InfoTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-mint-50/70 border border-mint-100/80 p-2.5 text-center min-w-0">
      <div
        className="text-xl text-rose-400 leading-none truncate"
        style={{ fontFamily: "var(--font-handwriting)" }}
      >
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-mint-500 mt-1">{label}</div>
    </div>
  );
}

function RelatedPostCard({
  post,
  index,
  compact = false,
}: {
  post: Post;
  index: number;
  compact?: boolean;
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
        className={`block rounded-xl bg-mint-50/50 border border-mint-100/80 hover:border-rose-300 transition-colors group ${
          compact ? "p-3" : "p-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs" aria-hidden="true">
            {meta.emoji}
          </span>
          <span className="text-sm text-rose-400" style={{ fontFamily: "var(--font-handwriting)" }}>
            {post.frontmatter.date}
          </span>
        </div>
        <h3 className="text-sm font-medium text-mint-800 group-hover:text-rose-500 leading-snug line-clamp-2">
          {post.frontmatter.title}
        </h3>
        {!compact && post.frontmatter.description && (
          <p className="text-xs text-mint-600 leading-relaxed line-clamp-2 mt-1.5">
            {post.frontmatter.description}
          </p>
        )}
      </Link>
    </motion.div>
  );
}

/* Splits markdown by headings, wraps sections with fade-in */
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

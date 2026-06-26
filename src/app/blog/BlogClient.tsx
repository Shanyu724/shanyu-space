"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { SiteIcon, type SiteIconName } from "@/components/SiteIcon";
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

/* ── 核心理念三件套（山雨自己的写作底色） ── */
const CORE_VALUES: { icon: SiteIconName; title: string; desc: string }[] = [
  {
    icon: "sprout",
    title: "长期主义",
    desc: "不追逐 24 小时后没人记得的热点。一篇文章如果三年后回看还在闪光，那才值得写。",
  },
  {
    icon: "search",
    title: "多源验证",
    desc: "任何单一来源都先问一句「他为什么这么说」。不轻易接受，也不轻易反对。",
  },
  {
    icon: "layers",
    title: "知识沉淀",
    desc: "信息不是消费，是建构。读完 → 复述 → 链接，三步缺一就当没读过。",
  },
];

export function BlogClient({ posts, categories, labels }: BlogClientProps) {
  const [filter, setFilter] = useState<string>("all");

  // 按当前 filter 过滤、按分类分组
  const grouped = useMemo(() => {
    const list = filter === "all" ? posts : posts.filter((p) => p.category === filter);
    const byCat = new Map<string, Post[]>();
    for (const p of list) {
      const arr = byCat.get(p.category) || [];
      arr.push(p);
      byCat.set(p.category, arr);
    }
    return byCat;
  }, [posts, filter]);

  const totalCount =
    filter === "all" ? posts.length : posts.filter((p) => p.category === filter).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* ── 顶部标题区 ── */}
      <FadeIn>
        <div className="text-center mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-mint-700 px-3 py-1 rounded-full bg-mint-100/70 border border-mint-200/60"
            style={{ fontFamily: "var(--font-handwriting)", fontSize: "0.95rem" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>blog</span>
          </span>
        </div>
        <h1
          className="text-center text-5xl md:text-6xl text-mint-700 leading-tight"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          博客
        </h1>
        <p className="mt-3 text-center text-xs text-mint-500 mb-10 tracking-wide">
          四个方向 · 一些慢慢长出来的笔记
        </p>
      </FadeIn>

      {/* ── 主体：两栏布局（lg+） ── */}
      <div className="lg:flex lg:gap-8 lg:items-start">
        {/* ── 左栏：文章列表 ── */}
        <aside className="lg:w-[340px] lg:flex-shrink-0 mb-12 lg:mb-0">
          {/* 过滤 pills */}
          <FadeIn delay={0.06}>
            <div className="flex flex-wrap gap-1.5 mb-6">
              <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
                <SiteIcon name="book" className="h-4 w-4" />
                <span>全部</span>
                <span className="text-[10px] opacity-70">({posts.length})</span>
              </FilterPill>
              {categories.map((cat) => {
                const meta = getCategoryMeta(cat.id);
                const count = posts.filter((p) => p.category === cat.id).length;
                return (
                  <FilterPill
                    key={cat.id}
                    active={filter === cat.id}
                    onClick={() => setFilter(cat.id)}
                  >
                    <SiteIcon name={meta.icon} className="h-4 w-4" />
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-70">({count})</span>
                  </FilterPill>
                );
              })}
            </div>
          </FadeIn>

          {/* 文章分组列表 */}
          <FadeIn delay={0.12}>
            {totalCount === 0 ? (
              <EmptyList />
            ) : (
              <div className="space-y-8">
                {categories.map((cat) => {
                  const list = grouped.get(cat.id);
                  if (!list || list.length === 0) return null;
                  const meta = getCategoryMeta(cat.id);
                  return (
                    <section key={cat.id}>
                      {/* 分组标题 */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-sm"
                          style={{ backgroundColor: `${meta.color}b0` }}
                        />
                        <h3
                          className="font-handwriting text-xl text-mint-700"
                          style={{ fontFamily: "var(--font-handwriting)" }}
                        >
                          {cat.label}
                        </h3>
                        <span className="text-[11px] text-mint-400 ml-auto">{list.length} 篇</span>
                      </div>
                      {/* 文章项 */}
                      <ul className="space-y-3 pl-4 border-l border-dashed border-mint-200/70">
                        {list.map((post) => (
                          <PostItem
                            key={`${post.category}/${post.slug}`}
                            post={post}
                            color={meta.color}
                            categoryLabel={labels[post.category] || post.category}
                          />
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            )}
          </FadeIn>
        </aside>

        {/* ── 右栏：欢迎卡（lg+ 才显示） ── */}
        <main className="hidden lg:block lg:flex-1 lg:min-w-0 lg:sticky lg:top-2">
          <WelcomeCard categories={categories} />
        </main>
      </div>
    </div>
  );
}

/* ── 子组件：过滤 pill ── */
function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
        active
          ? "bg-mint-500 border-mint-500 text-white shadow-sm"
          : "bg-white/70 border-mint-200 text-mint-700 hover:border-rose-300 hover:text-rose-500"
      }`}
    >
      {children}
    </button>
  );
}

/* ── 子组件：单篇文章项 ── */
function PostItem({
  post,
  color,
  categoryLabel,
}: {
  post: Post;
  color: string;
  categoryLabel: string;
}) {
  return (
    <li>
      <Link href={`/blog/${post.category}/${post.slug}`} className="group block py-1">
        <h4
          className="font-handwriting text-lg text-mint-800 leading-snug group-hover:text-rose-500 transition-colors"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          {post.frontmatter.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full"
            style={{
              backgroundColor: `${color}18`,
              color,
            }}
          >
            {categoryLabel}
          </span>
          <span className="text-[11px] text-mint-400 tabular-nums">{post.frontmatter.date}</span>
        </div>
        {post.frontmatter.description && (
          <p className="mt-1.5 text-xs text-mint-600 line-clamp-2 leading-relaxed group-hover:text-mint-700 transition-colors">
            {post.frontmatter.description}
          </p>
        )}
      </Link>
    </li>
  );
}

/* ── 子组件：空状态 ── */
function EmptyList() {
  return (
    <div className="py-16 text-center text-mint-400">
      <div className="mb-3 flex justify-center">
        <SiteIcon name="sprout" className="h-8 w-8 text-mint-400" />
      </div>
      <p
        className="font-handwriting text-xl mb-1"
        style={{ fontFamily: "var(--font-handwriting)" }}
      >
        this category is sprouting
      </p>
      <p className="text-xs">这个分类还没有文章——种子已经撒下了。</p>
    </div>
  );
}

/* ── 右栏：欢迎卡 ── */
function WelcomeCard({ categories }: { categories: CategoryInfo[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-mint-100/70 p-8"
    >
      {/* 顶部胶带 */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-3 rounded-sm opacity-60 rotate-[-2deg]"
        style={{
          background:
            "linear-gradient(135deg, rgba(241,233,233,0.92) 0%, rgba(210,176,176,0.55) 100%)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      />

      {/* 标题 */}
      <div className="text-center mb-6">
        <SiteIcon name="book" className="mb-2 inline-block h-9 w-9 text-mint-500" />
        <h2
          className="text-4xl text-mint-700 mt-2"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          欢迎来到山雨的 blog 区
        </h2>
        <p className="mt-2 text-sm text-mint-500">在这里你可以读到四个方向的写作</p>
      </div>

      {/* 四个方向 */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {categories.map((cat) => {
          const meta = getCategoryMeta(cat.id);
          return (
            <Link
              key={cat.id}
              href={`/blog/${cat.id}`}
              className="group flex items-start gap-2.5 p-3 rounded-xl bg-mint-50/60 border border-mint-100/70 hover:border-rose-300 transition-colors"
            >
              <SiteIcon name={meta.icon} className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-mint-700 group-hover:text-rose-500 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[11px] text-mint-500 leading-snug mt-0.5 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 分隔线 */}
      <div className="flex items-center gap-3 mb-6 opacity-50">
        <span className="flex-1 border-t border-dashed border-mint-300/60" />
        <span className="text-mint-400 text-xs">·</span>
        <span className="flex-1 border-t border-dashed border-mint-300/60" />
      </div>

      {/* 核心理念 */}
      <div className="mb-7">
        <h3
          className="text-2xl text-mint-700 mb-3 text-center"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          核心理念
        </h3>
        <div className="space-y-3">
          {CORE_VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="flex items-start gap-3"
            >
              <SiteIcon name={v.icon} className="h-4 w-4 mt-0.5 select-none text-sage-500" />
              <div>
                <p className="text-sm font-medium text-mint-800">{v.title}</p>
                <p className="text-xs text-mint-600 leading-relaxed mt-0.5">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 分隔线 */}
      <div className="flex items-center gap-3 mb-6 opacity-50">
        <span className="flex-1 border-t border-dashed border-mint-300/60" />
        <span className="text-mint-400 text-xs">·</span>
        <span className="flex-1 border-t border-dashed border-mint-300/60" />
      </div>

      {/* 写作风格 */}
      <div className="mb-6 text-center">
        <h3
          className="text-2xl text-mint-700 mb-2"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          写作风格
        </h3>
        <p className="text-sm text-mint-700 leading-relaxed">不做鸡汤 · 追求深度 · 保持真诚</p>
        <p
          className="mt-3 text-base text-rose-400/90"
          style={{ fontFamily: "var(--font-handwriting)", fontSize: "1.1rem" }}
        >
          完美需要太久太久，但不完美也可以出发。
        </p>
      </div>

      {/* 底部提示 */}
      <div className="pt-4 border-t border-mint-100 text-center">
        <p className="text-xs text-mint-500 inline-flex items-center gap-2">
          <span className="text-rose-300">↙</span>
          <span style={{ fontFamily: "var(--font-handwriting)", fontSize: "1rem" }}>
            从左侧选择一篇文章开始阅读吧
          </span>
        </p>
      </div>
    </motion.div>
  );
}

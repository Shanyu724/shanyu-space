"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { NotebookCard } from "@/components/NotebookCard";
import { SectionDivider } from "@/components/decorative";
import { MouseScrollHint } from "@/components/MouseScrollHint";
import { SiteIcon } from "@/components/SiteIcon";
import { getCategoryMeta } from "@/lib/utils";
import type { Post } from "@/lib/content";
import type { Me } from "@/lib/me";

interface CategoryInfo {
  id: string;
  label: string;
  description: string;
}

interface HomeClientProps {
  me: Me;
  categories: CategoryInfo[];
  latestPosts: Post[];
  labels: Record<string, string>;
}

const ENTRIES: { href: string; icon: string; label: string; sub: string }[] = [
  { href: "/blog", icon: "/images/icon-blog.svg", label: "Blog", sub: "随便写的" },
  {
    href: "/portfolio",
    icon: "/images/icon-portfolio.svg",
    label: "Portfolio",
    sub: "AI 协助下的项目作品集",
  },
  {
    href: "/workshop",
    icon: "/images/icon-behind.svg",
    label: "Workshop",
    sub: "用 AI 做的小工具",
  },
  { href: "/about", icon: "/images/icon-me.svg", label: "Me", sub: "介绍一下我自己" },
];

export function HomeClient({ me, categories, latestPosts, labels }: HomeClientProps) {
  const [guideOpen, setGuideOpen] = useState(true);

  return (
    <>
      {/* ── 第一屏：参考站式手账首页 ── */}
      <section className="relative w-full min-h-[calc(100dvh-168px)] flex items-center justify-center px-4 py-8 overflow-hidden">
        {/* 内层纸纹：比全局 bg 更像一张纸 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35] pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--gradient-sage-fade) 1px, transparent 1px), linear-gradient(135deg, var(--gradient-card-from), var(--gradient-card-to))",
            backgroundSize: "18px 18px, 100% 100%",
          }}
        />

        {/* Guide 浮窗：参考站首页“关于这个网站”提示卡 */}
        <AnimatePresence>
          {guideOpen && (
            <motion.aside
              initial={{ opacity: 0, y: 12, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:block absolute left-8 top-8 w-[300px] z-20 rounded-2xl bg-white/90 backdrop-blur-sm border border-mint-100 shadow-lg p-4"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-sm opacity-60 rotate-[-4deg] bg-rose-100 shadow-sm" />
              <div className="flex items-start gap-3 mb-3">
                <Image
                  src="/images/home-guide-sticker.svg"
                  alt="guide"
                  width={58}
                  height={48}
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-mint-700 flex items-center gap-1">
                    <SiteIcon name="spark" className="h-4 w-4 text-warm-500" />
                    <span>关于这个网站</span>
                  </h3>
                  <p className="text-[11px] text-mint-500 mt-1 leading-relaxed">
                    灵感由 AI 和我联袂赞助，托管在 Vercel 上，慢慢长成一个像 QQ
                    空间又像手账的个人站。
                  </p>
                </div>
                <button
                  onClick={() => setGuideOpen(false)}
                  className="ml-auto text-mint-400 hover:text-rose-400 transition-colors text-xs"
                  aria-label="关闭指南"
                >
                  ×
                </button>
              </div>
              <div className="pl-[70px] text-[11px] text-mint-600 leading-relaxed space-y-1">
                <p className="inline-flex items-center gap-1.5">
                  <SiteIcon name="code" className="h-3.5 w-3.5" />
                  <span>Next / React / TS / Tailwind</span>
                </p>
                <p className="inline-flex items-center gap-1.5">
                  <SiteIcon name="leaf" className="h-3.5 w-3.5" />
                  <span>Blog · Portfolio · Workshop · About</span>
                </p>
                <p className="text-rose-400">感觉越来越像自己的小院子了……</p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* 右上/左下贴纸装饰 */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute top-8 right-10 md:right-20 w-48 h-60 opacity-55 pointer-events-none -rotate-8 select-none"
        >
          <Image src="/images/flower-bouquet.svg" alt="" fill className="object-contain" />
        </div>
        <div
          aria-hidden="true"
          className="hidden sm:block absolute bottom-8 left-6 md:left-16 w-48 h-60 opacity-45 pointer-events-none -rotate-12 select-none"
        >
          <Image src="/images/hero-landscape.svg" alt="" fill className="object-contain" />
        </div>

        {/* 中心纸卡 */}
        <div className="relative z-10 w-full max-w-[720px] mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="card-polaroid relative w-full px-6 sm:px-10 py-10"
          >
            {/* 顶部胶带（参考站 Polaroid 标志性元素） */}
            <div
              aria-hidden="true"
              className="absolute -top-3 left-1/2 w-20 h-4 rounded-sm pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, var(--tape-bg-from) 0%, var(--tape-bg-to) 100%)",
                transform: "translateX(-50%) rotate(-3deg)",
                boxShadow: "0 1px 2px var(--tape-shadow)",
              }}
            />

            {/* 纸张纹理 */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0, var(--gradient-sage-fade) 1px, transparent 1px), linear-gradient(0deg, transparent 0, var(--gradient-rose-fade) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <button
              className="absolute right-4 bottom-4 w-6 h-6 rounded-full border border-mint-200 text-mint-400 hover:text-rose-400 hover:border-rose-300 transition-colors text-xs z-10"
              onClick={() => setGuideOpen(true)}
              aria-label="查看页面详情"
              title="查看页面详情"
            >
              ⓘ
            </button>

            <div className="relative z-10">
              <div className="avatar-frame mb-5 mx-auto">
                <div>
                  <SiteIcon name="botany" className="h-9 w-9 text-sage-500" />
                </div>
              </div>
              <p className="text-[11px] tracking-[0.28em] text-mint-500 uppercase">
                Hi, this is {me.name}
              </p>
              <h1
                className="mt-3 text-4xl md:text-5xl text-mint-800 leading-tight italic tracking-tight"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                {me.signature}
              </h1>
              <p className="mt-4 text-sm text-mint-700 max-w-[30rem] mx-auto leading-relaxed">
                {me.about.whatIDo}
              </p>

              <nav
                aria-label="Main sections"
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto"
              >
                {ENTRIES.map((e, i) => (
                  <motion.div
                    key={e.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 + i * 0.06 }}
                  >
                    <Link
                      href={e.href}
                      className="group flex items-center justify-start gap-3 px-3 py-3 rounded-xl hover:bg-white/60 border border-transparent hover:border-mint-100 transition-colors text-left"
                    >
                      <span className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full bg-white/80 shadow-sm border border-mint-100">
                        <Image src={e.icon} alt="" width={28} height={28} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className="block font-handwriting text-xl text-mint-800 group-hover:text-rose-500 transition-colors leading-tight"
                          style={{ fontFamily: "var(--font-handwriting)" }}
                        >
                          {e.label}
                          <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                        </span>
                        <span className="block text-xs text-mint-500 leading-snug mt-0.5">
                          {e.sub}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* 鼠标滚动提示：参考站标志性收束 */}
              <div className="mt-10 flex justify-center">
                <MouseScrollHint label="向下探索" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 下方内容保留，但弱化成“继续浏览” */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <FadeIn>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs uppercase tracking-widest text-mint-600">分类</h2>
              <span
                className="font-handwriting text-base text-rose-400"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                {categories.length} ways to wander
              </span>
            </div>
            <StaggerContainer staggerDelay={0.08}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((cat) => {
                  const meta = getCategoryMeta(cat.id);
                  return (
                    <StaggerItem key={cat.id}>
                      <motion.div whileHover={{ y: -2, scale: 1.005 }} className="h-full">
                        <Link href={`/blog/${cat.id}`} className="block h-full">
                          <NotebookCard accentColor={meta.color} className="p-4 h-full">
                            <div className="pl-2">
                              <div className="flex items-center gap-2 mb-2">
                                <SiteIcon name={meta.icon} className="h-5 w-5" />
                                <h3 className="font-medium text-mint-700 title-hover">
                                  {cat.label}
                                </h3>
                              </div>
                              <p className="text-xs text-mint-600 leading-relaxed line-clamp-3">
                                {cat.description}
                              </p>
                            </div>
                          </NotebookCard>
                        </Link>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </div>
            </StaggerContainer>
          </section>
        </FadeIn>

        <SectionDivider />

        <FadeIn delay={0.15}>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs uppercase tracking-widest text-mint-600">最新文章</h2>
              <Link
                href="/blog"
                className="text-sm text-mint-600 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
              >
                查看全部<span>→</span>
              </Link>
            </div>
            <StaggerContainer staggerDelay={0.06}>
              <div className="grid md:grid-cols-2 gap-4">
                {latestPosts.map((post) => {
                  const meta = getCategoryMeta(post.category);
                  return (
                    <StaggerItem key={`${post.category}/${post.slug}`}>
                      <Link href={`/blog/${post.category}/${post.slug}`} className="block h-full">
                        <NotebookCard accentColor={meta.color} className="p-5 h-full">
                          <div className="pl-2">
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                              >
                                <span className="inline-flex items-center gap-1.5">
                                  <SiteIcon name={meta.icon} className="h-3.5 w-3.5" />
                                  {labels[post.category] || post.category}
                                </span>
                              </span>
                              <span
                                className="font-handwriting text-base text-rose-400"
                                style={{ fontFamily: "var(--font-handwriting)" }}
                              >
                                {post.frontmatter.date}
                              </span>
                            </div>
                            <h3 className="font-medium text-mint-800 leading-snug title-hover">
                              {post.frontmatter.title}
                            </h3>
                            {post.frontmatter.description && (
                              <p className="mt-2 text-sm text-mint-600 line-clamp-2 leading-relaxed">
                                {post.frontmatter.description}
                              </p>
                            )}
                          </div>
                        </NotebookCard>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </div>
            </StaggerContainer>
          </section>
        </FadeIn>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { SiteIcon } from "@/components/SiteIcon";
import { getCategoryMeta } from "@/lib/utils";
import type { Post } from "@/lib/content";

interface CategoryClientProps {
  category: string;
  posts: Post[];
  label: string;
  description: string;
}

const CATEGORY_NOTES: Record<string, string[]> = {
  modeling: ["从假设出发", "把直觉翻译成公式", "先验证再下结论"],
  finance: ["从制度机制切入", "看激励结构", "少讲结论，多拆过程"],
  study: ["把概念讲给未来的自己", "公式背后要有直觉", "考研笔记也可以有结构美"],
  assets: ["拆条款看激励", "顺着现金流走", "结构比标签更重要"],
  macro: ["多源交叉验证", "不急着站队", "先看信息来源的动机"],
  essays: ["不追热点", "允许未完成", "用小题目保存真实想法"],
};

export function CategoryClient({ category, posts, label, description }: CategoryClientProps) {
  const meta = getCategoryMeta(category);
  const notes = CATEGORY_NOTES[category] || ["慢慢写", "慢慢改", "慢慢沉淀"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* 顶部返回 + 标题 */}
      <FadeIn>
        <Link
          href="/blog"
          className="text-sm text-mint-500 hover:text-rose-400 transition-colors mb-8 inline-flex items-center gap-1"
        >
          <span>←</span> 返回博客
        </Link>
      </FadeIn>

      <div className="lg:flex lg:gap-8 lg:items-start">
        {/* 左栏：分类文章列表 */}
        <main className="lg:w-[56%] lg:min-w-0 mb-12 lg:mb-0">
          <FadeIn delay={0.06}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <SiteIcon
                  name={meta.icon}
                  className="h-10 w-10 select-none"
                  style={{ color: meta.color }}
                />
                <div>
                  <p
                    className="font-handwriting text-base text-rose-400 leading-none"
                    style={{ fontFamily: "var(--font-handwriting)" }}
                  >
                    category
                  </p>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-mint-800 leading-tight">
                    {label}
                  </h1>
                </div>
              </div>
              {description && (
                <p className="text-sm text-mint-600 leading-relaxed max-w-xl ml-14">
                  {description}
                </p>
              )}
            </div>
          </FadeIn>

          {posts.length > 0 ? (
            <StaggerContainer staggerDelay={0.07}>
              <div className="relative pl-5 border-l border-dashed border-mint-200/80 space-y-5">
                {posts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <motion.article
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      className="relative"
                    >
                      {/* 时间线圆点 */}
                      <span
                        className="absolute -left-[1.72rem] top-5 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: meta.color }}
                        aria-hidden="true"
                      />
                      <Link
                        href={`/blog/${category}/${post.slug}`}
                        className="group block p-5 rounded-2xl bg-white/75 border border-mint-100/70 backdrop-blur-sm hover:border-rose-300 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${meta.color}18`,
                              color: meta.color,
                            }}
                          >
                            {label}
                          </span>
                          <span
                            className="font-handwriting text-base text-rose-400"
                            style={{ fontFamily: "var(--font-handwriting)" }}
                          >
                            {post.frontmatter.date}
                          </span>
                        </div>
                        <h2 className="font-handwriting text-2xl text-mint-800 group-hover:text-rose-500 transition-colors leading-snug">
                          {post.frontmatter.title}
                        </h2>
                        {post.frontmatter.description && (
                          <p className="mt-2 text-sm text-mint-600 line-clamp-2 leading-relaxed">
                            {post.frontmatter.description}
                          </p>
                        )}
                        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {post.frontmatter.tags.map((tag) => (
                              <span key={tag} className="text-xs text-mint-400">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    </motion.article>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ) : (
            <FadeIn delay={0.12}>
              <div className="py-20 text-center text-mint-400 rounded-2xl bg-white/60 border border-mint-100/70">
                <div className="mb-4 flex justify-center">
                  <SiteIcon name="sprout" className="h-10 w-10 text-mint-400" />
                </div>
                <p
                  className="font-handwriting text-2xl"
                  style={{ fontFamily: "var(--font-handwriting)" }}
                >
                  this category is sprouting
                </p>
                <p className="text-xs mt-1">这个分类还没有文章</p>
              </div>
            </FadeIn>
          )}
        </main>

        {/* 右栏：分类说明卡 */}
        <aside className="hidden lg:block lg:flex-1 lg:min-w-0 lg:sticky lg:top-2">
          <FadeIn delay={0.14}>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-mint-100/70 p-7">
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-3 rounded-sm opacity-60 rotate-[-2deg]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(241,233,233,0.92) 0%, rgba(210,176,176,0.55) 100%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
              />

              <div className="text-center mb-6">
                <SiteIcon
                  name={meta.icon}
                  className="inline-block mb-2 h-12 w-12"
                  style={{ color: meta.color }}
                />
                <h2
                  className="text-4xl text-mint-700"
                  style={{ fontFamily: "var(--font-handwriting)" }}
                >
                  {label}
                </h2>
                <p className="text-sm text-mint-500 mt-2 leading-relaxed">
                  {description || "一个正在慢慢长出来的分类。"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-7">
                <InfoTile value={posts.length.toString()} label="articles" />
                <InfoTile value="slow" label="pace" />
                <InfoTile value="notes" label="form" />
              </div>

              <div className="mb-7">
                <h3
                  className="text-2xl text-mint-700 mb-3 text-center"
                  style={{ fontFamily: "var(--font-handwriting)" }}
                >
                  这个分类怎么写
                </h3>
                <ul className="space-y-2.5">
                  {notes.map((note, i) => (
                    <motion.li
                      key={note}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.22 + i * 0.06 }}
                      className="flex items-baseline gap-2 text-sm text-mint-700"
                    >
                      <span className="text-rose-400">·</span>
                      <span>{note}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-dashed border-mint-200/80 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-sm text-mint-600 hover:text-rose-400 transition-colors"
                >
                  <span>←</span>
                  <span>回到 Blog 总览</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </aside>
      </div>
    </div>
  );
}

function InfoTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-mint-50/70 border border-mint-100/80 p-3 text-center">
      <div
        className="text-2xl text-rose-400 leading-none"
        style={{ fontFamily: "var(--font-handwriting)" }}
      >
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-mint-500 mt-1">{label}</div>
    </div>
  );
}

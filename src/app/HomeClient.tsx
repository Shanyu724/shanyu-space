"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  return (
    <>
      <section className="relative flex min-h-[calc(100dvh-148px)] w-full items-center justify-center overflow-hidden px-4 py-8 md:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.52]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--luxury-line) 1px, transparent 1px), linear-gradient(0deg, var(--luxury-line) 1px, transparent 1px), linear-gradient(135deg, var(--gradient-card-from), var(--gradient-card-to))",
            backgroundSize: "42px 42px, 42px 42px, 100% 100%",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[88rem]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="card-polaroid relative w-full overflow-hidden px-5 py-8 sm:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-14"
          >
            <div aria-hidden="true" className="absolute inset-x-5 top-4 h-px bg-mint-900/15" />
            <div aria-hidden="true" className="absolute inset-x-5 bottom-4 h-px bg-mint-900/15" />
            <div
              aria-hidden="true"
              className="absolute right-6 top-6 h-24 w-24 rounded-full border border-rose-300/25 opacity-50"
            />
            <div
              aria-hidden="true"
              className="absolute right-10 top-10 h-24 w-24 rounded-full border border-mint-900/10 opacity-50"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.05rem] opacity-45"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0, var(--luxury-line) 1px, transparent 1px), linear-gradient(180deg, transparent 0, rgba(255,255,255,0.44) 46%, transparent 100%)",
                backgroundSize: "62px 100%, 100% 100%",
              }}
            />

            <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[0.92fr_1.08fr] xl:gap-10">
              <div className="flex min-h-[560px] flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-mint-600">
                    <span>Shanyu Space</span>
                    <span className="h-px w-10 bg-rose-400/60" />
                    <span>{new Date().getFullYear()}</span>
                  </div>

                  <div className="mt-7 max-w-[40rem]">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-earth-300">
                      Independent notes on systems, study, finance, and the age we are walking into.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-end gap-4">
                    <h1 className="font-serif text-[clamp(3.6rem,8vw,7.6rem)] leading-[0.84] tracking-[0.02em] text-mint-900 text-balance">
                      山雨
                      <span className="block text-rose-500">札记</span>
                    </h1>
                    <div className="hidden flex-col gap-2 pb-3 text-[10px] uppercase tracking-[0.22em] text-earth-300 md:flex">
                      <span>No. 01</span>
                      <span>Field Edition</span>
                    </div>
                  </div>

                  <div className="mt-8 max-w-[36rem]">
                    <p className="max-w-[34rem] text-[1.04rem] leading-8 text-mint-800 md:text-[1.12rem]">
                      {me.signature}
                    </p>
                    <p className="mt-4 max-w-[36rem] text-sm leading-7 text-earth-400 md:text-[15px]">
                      {me.about.whatIDo}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-earth-300">
                    <span>Selected Rooms</span>
                    <span className="h-px w-12 bg-mint-900/12" />
                  </div>
                  <nav
                    aria-label="Main sections"
                    className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-mint-900/12 pt-5 sm:grid-cols-2"
                  >
                    {ENTRIES.map((e, i) => (
                      <motion.div
                        key={e.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.16 + i * 0.06 }}
                      >
                        <Link
                          href={e.href}
                          className="group flex items-center justify-between gap-4 border-b border-mint-900/10 py-3 text-left transition-colors hover:border-rose-400/70"
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-mint-900/10 bg-mint-50/70">
                              <Image src={e.icon} alt="" width={24} height={24} />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-serif text-xl leading-tight text-mint-900 transition-colors group-hover:text-rose-500">
                                {e.label}
                              </span>
                              <span className="mt-1 block text-xs leading-snug text-earth-300">
                                {e.sub}
                              </span>
                            </span>
                          </span>
                          <span className="text-mint-500 transition-colors group-hover:text-rose-500">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </div>

              <div className="relative min-h-[560px] overflow-hidden rounded-[1.24rem] border border-mint-900/12 bg-mint-900 text-cream-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <Image
                  src="/images/hero-landscape.svg"
                  alt=""
                  fill
                  priority
                  className="scale-[1.12] object-cover opacity-[0.38] mix-blend-screen"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.12), transparent 32%), linear-gradient(180deg, rgba(24,53,39,0.04), rgba(20,38,30,0.92)), linear-gradient(90deg, rgba(18,35,28,0.88), rgba(18,35,28,0.44) 44%, rgba(18,35,28,0.82) 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-35"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-y-6 left-[34%] right-6 rounded-[1.35rem] border border-cream-50/16 bg-[linear-gradient(180deg,rgba(244,236,221,0.16),rgba(244,236,221,0.07))] shadow-[0_24px_64px_rgba(7,17,13,0.28)] sm:left-[42%] lg:left-[40%]"
                >
                  <div className="absolute inset-3 rounded-[1.08rem] border border-cream-50/10" />
                  <div className="absolute inset-[1.15rem] overflow-hidden rounded-[0.95rem] bg-[linear-gradient(180deg,rgba(250,245,236,0.98),rgba(239,229,211,0.86))]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 72% 72%, rgba(255,255,255,0.75), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0) 30%), linear-gradient(135deg, rgba(193,86,58,0.05), rgba(42,68,54,0.08))",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-5 top-5 h-px bg-mint-900/12 md:inset-x-8"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-5 bottom-5 h-px bg-mint-900/10 md:inset-x-8"
                    />
                    <div className="relative flex h-full flex-col px-5 py-5 md:px-8 md:py-7">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-earth-300">
                        <span>Cover Draft</span>
                        <span>Issue 01</span>
                      </div>

                      <div className="grid flex-1 grid-cols-[auto_1fr] items-center gap-4 pt-5">
                        <div className="flex flex-col font-serif text-[clamp(3.2rem,6vw,5.6rem)] leading-[0.8] text-mint-900">
                          <span>山</span>
                          <span className="text-rose-500">雨</span>
                          <span>札</span>
                          <span className="text-rose-500">记</span>
                        </div>

                        <div className="self-end pb-4">
                          <p className="text-[10px] uppercase tracking-[0.26em] text-earth-300">
                            Notes for a slower reading life
                          </p>
                          <p className="mt-3 max-w-[10rem] text-sm leading-6 text-mint-700">
                            把值得反复回看的内容，整理成更长效的个人封面与目录。
                          </p>
                        </div>
                      </div>

                      <div className="relative mt-auto h-44 md:h-52">
                        <div className="absolute inset-x-4 bottom-5 top-3 rounded-full bg-white/48 blur-2xl" />
                        <Image
                          src="/images/hero-illustration.svg"
                          alt=""
                          fill
                          priority
                          className="object-contain object-bottom opacity-95"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex h-full min-h-[560px] flex-col p-6 md:p-8 xl:p-10">
                  <div className="flex items-start justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-cream-100/76">
                    <span>Field Notes</span>
                    <span>AI / Finance / Study</span>
                  </div>

                  <div className="mt-auto max-w-[17rem] pb-6 pt-10 sm:pb-10 sm:pt-14">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-cream-50/22 bg-cream-50/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                      <SiteIcon name="botany" className="h-7 w-7 text-warm-200" />
                    </div>
                    <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-cream-100/58">
                      Cover story
                    </p>
                    <p className="mt-4 font-serif text-[1.55rem] leading-[1.24] text-cream-50 md:text-[1.9rem]">
                      这一块先做成封面样张，后面再换成真正的主视觉海报。
                    </p>
                    <p className="mt-4 text-sm leading-7 text-cream-100/72">
                      现在先把结构和气质立住，后面直接替换成古风少年的视觉也会很顺。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 flex justify-center">
            <MouseScrollHint label="向下探索" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-8">
        <FadeIn>
          <section className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-[0.24em] text-mint-700">分类索引</h2>
              <span className="text-xs uppercase tracking-[0.18em] text-rose-500">
                {categories.length} ways to read
              </span>
            </div>
            <StaggerContainer staggerDelay={0.08}>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {categories.map((cat) => {
                  const meta = getCategoryMeta(cat.id);
                  return (
                    <StaggerItem key={cat.id}>
                      <motion.div whileHover={{ y: -2, scale: 1.005 }} className="h-full">
                        <Link href={`/blog/${cat.id}`} className="block h-full">
                          <NotebookCard accentColor={meta.color} className="h-full p-4">
                            <div className="pl-2">
                              <div className="mb-2 flex items-center gap-2">
                                <SiteIcon name={meta.icon} className="h-5 w-5" />
                                <h3 className="font-medium text-mint-700 title-hover">
                                  {cat.label}
                                </h3>
                              </div>
                              <p className="line-clamp-3 text-xs leading-relaxed text-earth-300">
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
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-[0.24em] text-mint-700">最新文章</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm text-mint-700 transition-colors hover:text-rose-500"
              >
                查看全部<span>→</span>
              </Link>
            </div>
            <StaggerContainer staggerDelay={0.06}>
              <div className="grid gap-4 md:grid-cols-2">
                {latestPosts.map((post) => {
                  const meta = getCategoryMeta(post.category);
                  return (
                    <StaggerItem key={`${post.category}/${post.slug}`}>
                      <Link href={`/blog/${post.category}/${post.slug}`} className="block h-full">
                        <NotebookCard accentColor={meta.color} className="h-full p-5">
                          <div className="pl-2">
                            <div className="mb-3 flex items-center gap-2">
                              <span
                                className="rounded-full px-2 py-0.5 text-xs"
                                style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                              >
                                <span className="inline-flex items-center gap-1.5">
                                  <SiteIcon name={meta.icon} className="h-3.5 w-3.5" />
                                  {labels[post.category] || post.category}
                                </span>
                              </span>
                              <span className="text-xs text-rose-500">{post.frontmatter.date}</span>
                            </div>
                            <h3 className="font-medium leading-snug text-mint-800 title-hover">
                              {post.frontmatter.title}
                            </h3>
                            {post.frontmatter.description && (
                              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-earth-300">
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

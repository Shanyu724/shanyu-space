"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import type { ReleaseEntry } from "./page";

const TAG_STYLE: Record<
  ReleaseEntry["tag"],
  { label: string; bg: string; color: string }
> = {
  feature: { label: "新功能", bg: "bg-mint-100", color: "text-mint-700" },
  polish: { label: "打磨", bg: "bg-rose-100", color: "text-rose-600" },
  refactor: { label: "重构", bg: "bg-mist-100", color: "text-mist-500" },
  init: { label: "起步", bg: "bg-warm-100", color: "text-warm-500" },
};

export function ReleasesClient({ releases }: { releases: ReleaseEntry[] }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* ── 顶部标题区 ── */}
      <FadeIn>
        <div className="text-center mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-xs text-mint-700 px-3 py-1 rounded-full bg-mint-100/70 border border-mint-200/60"
            style={{ fontFamily: "var(--font-handwriting)", fontSize: "0.95rem" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>release notes</span>
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.06}>
        <h1
          className="text-center text-5xl md:text-6xl text-mint-700 leading-tight"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          更新日志
        </h1>
      </FadeIn>

      <FadeIn delay={0.12}>
        <p className="mt-4 text-center text-sm md:text-base text-mint-600 max-w-xl mx-auto leading-relaxed">
          每一次小改动，都留个脚印。
          <br className="hidden sm:block" />
          这页记录的是「山雨」这个站从一个空文件夹长到现在的样子——
          有些是新功能，有些只是把某行颜色改得更顺眼。
        </p>
      </FadeIn>

      {/* ── 时间线主体 ── */}
      <div className="mt-16 ml-7 release-timeline">
        <StaggerContainer staggerDelay={0.08}>
          {releases.map((r) => {
            const tag = TAG_STYLE[r.tag];
            return (
              <StaggerItem key={r.version}>
                <motion.article
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="release-card relative mb-10 p-6 rounded-2xl bg-mint-50/70 border border-mint-100/80 backdrop-blur-sm"
                >
                  {/* 顶部 meta 行 */}
                  <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                    <span
                      className="text-2xl md:text-3xl font-bold text-mint-700 tracking-tight"
                      style={{ fontFamily: "var(--font-handwriting)" }}
                    >
                      {r.version}
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${tag.bg} ${tag.color}`}>
                      {tag.label}
                    </span>
                    <span className="ml-auto text-xs text-mint-500 tracking-wide tabular-nums">
                      {r.date}
                    </span>
                  </header>

                  {/* 标题 */}
                  <h2 className="text-lg md:text-xl font-medium text-mint-800 leading-snug mb-3">
                    {r.title}
                  </h2>

                  {/* 摘要 */}
                  <p className="text-sm text-mint-700 leading-relaxed mb-5">
                    {r.summary}
                  </p>

                  {/* highlights */}
                  <ul className="space-y-2">
                    {r.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-baseline gap-2.5 text-sm text-mint-700"
                      >
                        <span className="text-base shrink-0" aria-hidden="true">
                          {h.emoji}
                        </span>
                        <span className="leading-relaxed">{h.text}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* ── 结尾留白 + 一句手写体的小话 ── */}
      <FadeIn delay={0.2}>
        <div className="mt-16 mb-8 text-center">
          <p
            className="text-2xl md:text-3xl text-rose-400/80"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            to be continued...
          </p>
          <p className="mt-3 text-xs text-mint-500 italic">
            慢一点没关系。这个站会一直长下去。
          </p>
        </div>
      </FadeIn>
    </div>
  );
}

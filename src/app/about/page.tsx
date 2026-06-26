"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { WavyDivider, Tape } from "@/components/decorative";
import { SiteIcon, type SiteIconName } from "@/components/SiteIcon";
import { getMe } from "@/lib/me";

const quotes = [
  {
    text: "山色空蒙雨亦奇",
    source: "苏轼《饮湖上初晴后雨》",
    tag: "名字",
  },
  {
    text: "世界上只有一种英雄主义，就是看清生活的真相之后，依然热爱生活。",
    source: "罗曼·罗兰",
    tag: "哲学",
  },
  {
    text: "知道是思想的起点，而非终点。",
    source: "严复书",
    tag: "思考",
  },
  {
    text: "金钱只是通往最终价值的桥梁，而人是无法栖居在桥上的。",
    source: "叔本华",
    tag: "日常",
  },
];

const stickyNotes = [
  { bg: "#fef3c7", rotate: "-1.5", textColor: "#92400e" },
  { bg: "#fce7f3", rotate: "1.2", textColor: "#9d174d" },
  { bg: "#dbeafe", rotate: "-0.8", textColor: "#1e40af" },
  { bg: "#d9f99d", rotate: "1.8", textColor: "#3f6212" },
];

const photoPlaceholders: { icon: SiteIconName; label: string }[] = [
  { icon: "photo", label: "山里" },
  { icon: "book", label: "书行" },
  { icon: "tea", label: "早餐" },
  { icon: "cloud", label: "黄油" },
  { icon: "target", label: "目标" },
  { icon: "sprout", label: "生长" },
];

export default function AboutPage() {
  const me = getMe();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <FadeIn>
        <div className="text-center mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-mint-700 px-3 py-1 rounded-full bg-mint-100/70 border border-mint-200/60"
            style={{ fontFamily: "var(--font-handwriting)", fontSize: "0.95rem" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>about me</span>
          </span>
        </div>
        <h1
          className="text-center text-5xl md:text-6xl text-mint-700 leading-tight"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          关于我
        </h1>
        <p
          className="mt-4 text-center text-base md:text-lg text-rose-500 italic"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          {me.signature}
        </p>
      </FadeIn>

      {/* ── 自我介绍 ── */}
      <FadeIn delay={0.08} y={12}>
        <div className="mt-10 p-6 rounded-xl bg-white/70 border border-mint-100/70 relative">
          <Tape />
          <div className="flex items-center gap-5 mb-4">
            <div className="avatar-frame shrink-0" style={{ width: 72, height: 72 }}>
              <div style={{ fontSize: "1.85rem" }}>
                <SiteIcon name="leaf" className="h-8 w-8 text-sage-500" />
              </div>
            </div>
            <div>
              <p className="font-handwriting text-2xl text-rose-500 leading-tight">{me.name}</p>
              <p className="text-xs text-mint-500 mt-1">一个还在认真生活的人</p>
            </div>
          </div>
          <p className="text-sm text-mint-700 leading-relaxed">{me.about.nameOrigin}</p>
          <p className="mt-3 text-sm text-mint-700 leading-relaxed">{me.about.whatIDo}</p>
        </div>
      </FadeIn>

      {/* ── 长期关注 ── */}
      <FadeIn delay={0.14} y={12}>
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-earth-300 mb-4">长期关注</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {me.about.interests.map((item, i) => (
              <FadeIn key={i} delay={0.18 + i * 0.05} y={10}>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-cream-50/60 border-l-4 border-sage-400 border border-cream-200 hover:border-sage-300 transition-colors">
                  <SiteIcon name={item.icon} className="h-5 w-5 text-sage-500" />
                  <span className="text-sm text-earth-400">{item.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </FadeIn>

      <WavyDivider />

      {/* ── 当前状态 ── */}
      <FadeIn delay={0.25} y={12}>
        <section className="p-6 rounded-xl bg-cream-50/60 border border-cream-200 relative">
          <Tape />
          <h2 className="text-sm font-semibold text-sage-600 mb-3 inline-flex items-center gap-2">
            <SiteIcon name="leaf" className="h-4 w-4" />
            当前状态
          </h2>
          <div className="space-y-2 text-sm text-earth-400 leading-relaxed">
            {me.about.currentStatus.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── 关于这个站 ── */}
      <FadeIn delay={0.3} y={12}>
        <section className="mt-6 p-6 rounded-xl bg-cream-50/60 border border-cream-200">
          <h2 className="text-sm font-semibold text-sage-600 mb-3 inline-flex items-center gap-2">
            <SiteIcon name="sprout" className="h-4 w-4" />
            关于这个站
          </h2>
          <p className="text-sm text-earth-400 leading-relaxed">{me.tagline}</p>
          <p className="mt-2 text-sm text-earth-400 leading-relaxed">
            受 Floria Wonderland 启发构建。
          </p>
        </section>
      </FadeIn>

      <WavyDivider />

      {/* ── 便利贴墙：读过的句子 ── */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-earth-300 mb-5">读过的句子</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="sticky-note rounded-lg p-5 relative"
              style={{
                backgroundColor: stickyNotes[i].bg,
                transform: `rotate(${stickyNotes[i].rotate}deg)`,
              }}
            >
              {/* 胶带 */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 opacity-40 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(243,239,230,0.95) 0%, rgba(220,210,190,0.7) 100%)",
                  transform: "rotate(-3deg)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                }}
              />

              {/* 折角 */}
              <div
                className="absolute top-0 right-0 w-0 h-0"
                style={{
                  borderWidth: "0 20px 20px 0",
                  borderColor: `transparent ${stickyNotes[i].bg} transparent transparent`,
                  filter: "brightness(0.85)",
                }}
              />

              <p
                className="text-sm leading-relaxed relative"
                style={{ color: stickyNotes[i].textColor }}
              >
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2 relative">
                <span className="text-xs opacity-60" style={{ color: stickyNotes[i].textColor }}>
                  — {q.source}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${stickyNotes[i].textColor}15`,
                    color: stickyNotes[i].textColor,
                  }}
                >
                  #{q.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <WavyDivider />

      {/* ── 照片展区占位 ── */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-earth-300 mb-5 inline-flex items-center gap-2">
          <SiteIcon name="leaf" className="h-4 w-4" />
          一些瞬间
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photoPlaceholders.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="aspect-square rounded-lg bg-cream-100 border border-cream-200 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:bg-cream-50 hover:border-sage-200 hover:shadow-md cursor-default"
            >
              <span className="text-3xl select-none" aria-hidden="true">
                <SiteIcon name={p.icon} className="h-9 w-9 text-sage-500" />
              </span>
              <span className="text-xs text-earth-400">{p.label}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs text-earth-300 text-center italic">（等放了照片会更生动）</p>
      </section>
    </div>
  );
}

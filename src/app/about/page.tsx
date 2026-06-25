"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import { WavyDivider, Tape } from "@/components/decorative";

const quotes = [
  {
    text: "山色空蒙雨亦奇",
    source: "苏轼《饮湖上初晴后雨》",
    tag: "名字",
  },
  {
    text:
      "世界上只有一种英雄主义，就是看清生活的真相之后，依然热爱生活。",
    source: "罗曼·罗兰",
    tag: "哲学",
  },
  {
    text: "知道是思想的起点，而非终点。",
    source: "严复书",
    tag: "思考",
  },
  {
    text:
      "金钱只是通往最终价值的桥梁，而人是无法栖居在桥上的。",
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

const currentInterests = [
  { emoji: "🌍", label: "地缘政治的多源交叉验证" },
  { emoji: "🏦", label: "金融制度的机制设计分析" },
  { emoji: "🤖", label: "AI 对社会组织生产的深层影响" },
  { emoji: "🌱", label: "系统性思考与深度内容创作" },
];

const photoPlaceholders = [
  { emoji: "📷", label: "山里" },
  { emoji: "📚", label: "书行" },
  { emoji: "🍳", label: "早餐" },
  { emoji: "🥐", label: "黄油" },
  { emoji: "🎯", label: "目标" },
  { emoji: "🌱", label: "生长" },
];

export default function AboutPage() {
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
      </FadeIn>

      {/* ── 部署测试横幅（验证用，看完可删） ── */}
      <div
        data-test="deploy-banner"
        className="mt-8 p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-center text-sm"
      >
        🚀 部署测试横幅 · commit <code className="font-mono">DEPLOY_TEST</code> · 如果你看到这条说明自动部署链路完全跑通
      </div>

      {/* ── 自我介绍 ── */}
      <FadeIn delay={0.08} y={12}>
        <div className="mt-10 p-6 rounded-xl bg-white/70 border border-mint-100/70 relative">
          <Tape />
          <div className="flex items-center gap-5 mb-4">
            <div className="avatar-frame shrink-0" style={{ width: 72, height: 72 }}>
              <div style={{ fontSize: "1.85rem" }}>
                <span>🌿</span>
              </div>
            </div>
            <div>
              <p className="font-handwriting text-2xl text-rose-500 leading-tight">
                山雨
              </p>
              <p className="text-xs text-mint-500 mt-1">
                一个正在构建知识体系的人
              </p>
            </div>
          </div>
          <p className="text-sm text-mint-700 leading-relaxed">
            「山雨」来自苏轼那句「山色空蒙雨亦奇」——湖光山色在雨幕中反而别有一番朦胧。
            它提醒我：换一个角度，习以为常的事物也能呈现不一样的风景。
          </p>
          <p className="mt-3 text-sm text-mint-700 leading-relaxed">
            目前备考金融工程方向的研究生。长期关注地缘政治、金融制度设计，
            以及 AI 技术对经济生产组织方式的深层影响。
          </p>
        </div>
      </FadeIn>

      {/* ── 长期关注 ── */}
      <FadeIn delay={0.14} y={12}>
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-earth-300 mb-4">
            长期关注
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentInterests.map((item, i) => (
              <FadeIn key={i} delay={0.18 + i * 0.05} y={10}>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-cream-50/60 border-l-4 border-sage-400 border border-cream-200 hover:border-sage-300 transition-colors">
                  <span className="text-xl">{item.emoji}</span>
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
          <h2 className="text-sm font-semibold text-sage-600 mb-3">🌿 当前状态</h2>
          <div className="space-y-2 text-sm text-earth-400 leading-relaxed">
            <p>考研备考中。数学三、英语一、经济学 802、政治——四门课的系统推进。</p>
            <p>
              日常坚持的学习节奏：高数 / 线代双线并行 + 英语单词打卡 +
              经济学教材精读 + 政治三件套秘诀（提问 → 回顾 → 纠偏）。
            </p>
            <p>持续维护个人的 Obsidian 知识库，把各学科笔记沉淀为可检索、可链接的数字资产。</p>
            <p>公众号不定期更新，写一些金融制度设计方向的深度内容。</p>
          </div>
        </section>
      </FadeIn>

      {/* ── 关于这个站 ── */}
      <FadeIn delay={0.3} y={12}>
        <section className="mt-6 p-6 rounded-xl bg-cream-50/60 border border-cream-200">
          <h2 className="text-sm font-semibold text-sage-600 mb-3">🌱 关于这个站</h2>
          <p className="text-sm text-earth-400 leading-relaxed">
            一个数字花园，存放学习中的沉淀、研究中的发现，以及日常的思考碎片。
            不追热点，只想保持深度、真诚和独立思考的底色。
          </p>
          <p className="mt-2 text-sm text-earth-400 leading-relaxed">
            受 Floria Wonderland 启发构建。
          </p>
        </section>
      </FadeIn>

      <WavyDivider />

      {/* ── 便利贴墙：读过的句子 ── */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-earth-300 mb-5">
          读过的句子
        </h2>
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

              <p className="text-sm leading-relaxed relative" style={{ color: stickyNotes[i].textColor }}>
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
        <h2 className="text-xs uppercase tracking-widest text-earth-300 mb-5">
          🌿 一些瞬间
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
                {p.emoji}
              </span>
              <span className="text-xs text-earth-400">{p.label}</span>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs text-earth-300 text-center italic">
          （等放了照片会更生动）
        </p>
      </section>
    </div>
  );
}
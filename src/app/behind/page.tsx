"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";

const colorSwatches = [
  { name: "薄荷绿", hex: "#7a9482", text: "#ffffff" },
  { name: "玫粉", hex: "#be8b8b", text: "#ffffff" },
  { name: "奶油米白", hex: "#f5f0e8", text: "#2c2a26" },
  { name: "雾蓝", hex: "#8b9bb5", text: "#ffffff" },
  { name: "暖琥珀", hex: "#d4a76a", text: "#ffffff" },
];

export default function BehindPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <FadeIn>
        <div className="text-center mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-mint-700 px-3 py-1 rounded-full bg-mint-100/70 border border-mint-200/60"
            style={{ fontFamily: "var(--font-handwriting)", fontSize: "0.95rem" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>behind the scenes</span>
          </span>
        </div>
        <h1
          className="text-center text-5xl md:text-6xl text-mint-700 leading-tight"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          幕后
        </h1>
        <p className="mt-4 text-center text-sm md:text-base text-mint-600 max-w-lg mx-auto leading-relaxed mb-12">
          这个站的构建记录与技术细节。
        </p>
      </FadeIn>

      <div className="space-y-6">
        {/* ── 概览 ── */}
        <FadeIn y={16}>
          <section className="deco-top-line p-6 md:p-8 rounded-xl bg-cream-50/60 border border-cream-200">
            <h2 className="text-xl font-semibold text-sage-600 mb-4">🌱 概览</h2>
            <div className="prose text-sm text-earth-400 space-y-3">
              <p>
                灵感来自{" "}
                <a
                  href="https://www.gwifloria.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Floria Wonderland
                </a>{" "}
                构建的个人数字花园。集博客、作品集、关于页于一体。
              </p>
              <p>
                设计上追求纸张质感的温暖感与阅读舒适度——暖色调、柔和边界、留白呼吸。
              </p>
              <p className="text-xs text-earth-300">
                本页内容由 Claude 协助生成，它很懂我 hh
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ── 设计理念 ── */}
        <FadeIn y={16} delay={0.06}>
          <section className="deco-top-line p-6 md:p-8 md:pl-[calc(2rem+4px)] rounded-xl bg-cream-50/60 border border-cream-200">
            <h2 className="text-xl font-semibold text-sage-600 mb-4">💭 设计理念</h2>
            <div className="space-y-3 text-sm text-earth-400">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center text-xs font-medium">1</span>
                <div>
                  <p className="font-medium text-sage-600">纸质质感 · Journal Aesthetic</p>
                  <p className="text-earth-400 mt-0.5">
                    暖米色背景、纸张纹理、柔和边界，让浏览像翻一本手感温润的笔记本。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center text-xs font-medium">2</span>
                <div>
                  <p className="font-medium text-sage-600">内容优先 · Content First</p>
                  <p className="text-earth-400 mt-0.5">
                    装饰让位阅读，文字本身成为主角。每个页面有独立的设计考量，不套模板。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center text-xs font-medium">3</span>
                <div>
                  <p className="font-medium text-sage-600">简单运维 · Low Maintenance</p>
                  <p className="text-earth-400 mt-0.5">
                    Markdown 驱动内容，写文章就是新建 .md 文件。推到 GitHub，Vercel 自动部署。
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── 项目结构 ── */}
        <FadeIn y={16} delay={0.1}>
          <section className="deco-top-line p-6 md:p-8 rounded-xl bg-cream-50/60 border border-cream-200">
            <h2 className="text-xl font-semibold text-sage-600 mb-4">📁 项目结构</h2>
            <div className="bg-cream-100 rounded-lg p-4 text-xs font-mono text-earth-400 leading-relaxed whitespace-pre overflow-x-auto">
{`shanyu-space/
├── content/           # 内容层（Markdown）
│   ├── blog/
│   │   ├── geo/       # 地缘观察
│   │   ├── finance/   # 金融制度
│   │   ├── study/     # 学习笔记
│   │   └── essays/    # 随笔
│   └── portfolio/
│       └── projects.json
├── src/
│   ├── app/           # Next.js App Router 页面
│   ├── components/    # 通用组件（动画、装饰）
│   └── lib/
│       └── content.ts # 内容读取引擎
├── public/images/     # 静态资源
└── package.json`}
            </div>
          </section>
        </FadeIn>

        {/* ── 内容管理 ── */}
        <FadeIn y={16} delay={0.14}>
          <section className="deco-top-line p-6 md:p-8 md:pl-[calc(2rem+4px)] rounded-xl bg-cream-50/60 border border-cream-200">
            <h2 className="text-xl font-semibold text-sage-600 mb-4">📝 内容管理</h2>
            <div className="space-y-4 text-sm text-earth-400">
              <div>
                <h3 className="font-medium text-sage-500 mb-1">文章发布流程</h3>
                <p className="leading-relaxed">
                  在 <code className="text-xs bg-cream-100 px-1.5 py-0.5 rounded">content/blog/</code> 下对应的分类目录新建 <code className="text-xs bg-cream-100 px-1.5 py-0.5 rounded">.md</code> 文件，
                  头部填写标题、日期、描述、标签，正文用 Markdown 书写。
                  推送到 GitHub，Vercel 自动检测并部署，全程无需触碰代码。
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sage-500 mb-1">作品集维护</h3>
                <p className="leading-relaxed">
                  编辑 <code className="text-xs bg-cream-100 px-1.5 py-0.5 rounded">content/portfolio/projects.json</code>，添加或修改项目条目即可。
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── 自动化 ── */}
        <FadeIn y={16} delay={0.18}>
          <section className="deco-top-line p-6 md:p-8 rounded-xl bg-cream-50/60 border border-cream-200">
            <h2 className="text-xl font-semibold text-sage-600 mb-4">⚡ 自动化</h2>
            <div className="space-y-3 text-sm text-earth-400">
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5">1.</span>
                <div>
                  <p className="font-medium text-sage-600">Git Push → Auto Deploy</p>
                  <p>推送到 main 分支到 GitHub 后，Vercel 自动触发构建和部署。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5">2.</span>
                <div>
                  <p className="font-medium text-sage-600">Markdown → Static Pages</p>
                  <p>构建时自动扫描 content/ 目录，读取所有 Markdown 文件并生成静态页面。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5">3.</span>
                <div>
                  <p className="font-medium text-sage-600">零成本运维</p>
                  <p>Vercel 免费版 + 静态生成，没有服务器费用，不需要维护数据库。</p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── 技术栈 ── */}
        <FadeIn y={16} delay={0.22}>
          <section className="deco-top-line p-6 md:p-8 md:pl-[calc(2rem+4px)] rounded-xl bg-cream-50/60 border border-cream-200">
            <h2 className="text-xl font-semibold text-sage-600 mb-4">🛠 技术栈</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-200">
                    <th className="text-left py-2 pr-6 font-medium text-sage-600">层面</th>
                    <th className="text-left py-2 font-medium text-sage-600">技术</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["框架", "Next.js 16 (App Router · Turbopack)"],
                    ["语言", "TypeScript"],
                    ["样式", "Tailwind CSS v4"],
                    ["动画", "Framer Motion 12.x"],
                    ["内容", "Markdown + gray-matter"],
                    ["渲染", "react-markdown + remark-gfm"],
                    ["部署", "Vercel (免费版)"],
                  ].map(([layer, tech], i) => (
                    <tr key={i} className="border-b border-cream-100 last:border-0">
                      <td className="py-2.5 pr-6 text-earth-300">{layer}</td>
                      <td className="py-2.5 text-earth-400">{tech}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </FadeIn>

        {/* ── 配色 ── */}
        <FadeIn y={16} delay={0.26}>
          <section className="deco-top-line p-6 md:p-8 rounded-xl bg-cream-50/60 border border-cream-200">
            <h2 className="text-xl font-semibold text-sage-600 mb-4">🎨 配色</h2>
            <p className="text-sm text-earth-400 mb-4 leading-relaxed">
              整体调色经过一次温和转向：从奶纸 + 鼠尾草绿，调成
              <strong className="text-mint-700">薄荷绿 + 玫粉</strong>
              作主调，奶米色退到正文阅读区当背景。山色蒙尘、雨色清透，
              再加一点玫粉做 hover 高光——这套色板的来历在
              <a href="/releases" className="link-underline mx-1">/releases</a>里。
            </p>
            <div className="flex gap-3 flex-wrap">
              {colorSwatches.map((c) => (
                <motion.div
                  key={c.hex}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-3.5 py-2 rounded-full text-xs font-medium border"
                  style={{
                    backgroundColor: c.hex,
                    color: c.text,
                    borderColor: c.hex,
                  }}
                >
                  {c.name}
                </motion.div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ── 致谢 ── */}
        <FadeIn y={16} delay={0.3}>
          <section className="deco-top-line p-6 md:p-8 md:pl-[calc(2rem+4px)] rounded-xl bg-cream-50/60 border border-cream-200">
            <h2 className="text-xl font-semibold text-sage-600 mb-4">🙏 致谢</h2>
            <p className="text-sm text-earth-400 leading-relaxed">
              特别感谢 Floria 的{" "}
              <a
                href="https://www.gwifloria.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Wonderland
              </a>
              ，给了这个站最初的灵感。
            </p>
            <p className="mt-2 text-sm text-earth-400 leading-relaxed">
              以及 Claude 和 ChatGPT 在搭建过程中的协助——这个时代的技术杠杆力就在于：
              一个人也能完成从前需要一个团队才能做的事。
            </p>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
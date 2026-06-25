import type { Metadata } from "next";
import { ReleasesClient } from "./ReleasesClient";

export const metadata: Metadata = {
  title: "更新日志",
  description: "山雨个人站的版本迭代记录——每一个小改动背后的想法",
};

export interface ReleaseEntry {
  version: string;
  date: string;
  title: string;
  tag: "feature" | "polish" | "refactor" | "init";
  summary: string;
  highlights: { emoji: string; text: string }[];
}

const releases: ReleaseEntry[] = [
  {
    version: "v1.2",
    date: "2026-06-25",
    title: "首页重对齐 · 手账欢迎页与 Guide 浮窗",
    tag: "polish",
    summary:
      "重新对照参考站首页后，撤掉偏抽象的 2×2 emoji 入口，把首页改成更像手账首页：中央纸卡、Guide 浮窗、图标入口、纸纹层与页面详情按钮。",
    highlights: [
      { emoji: "🪧", text: "新增「关于这个网站」Guide 浮窗，可关闭也可用 ⓘ 重新打开" },
      { emoji: "🖼️", text: "新增 4 个 SVG 小图标，入口卡改成 icon + title + arrow + description" },
      { emoji: "📄", text: "中央欢迎区加入纸张网格纹理与更接近参考站的白色纸卡" },
      { emoji: "🧭", text: "顶部导航改成 icon + dashed underline 组合，更接近参考站 nav" },
    ],
  },
  {
    version: "v1.1",
    date: "2026-06-25",
    title: "Portfolio / Workshop 陈列页重构",
    tag: "polish",
    summary:
      "非文章内容页也接上 Blog 的两栏体系：左侧是可筛选的列表/时间线，右侧是 sticky 说明卡。Portfolio 不再像普通项目列表，Workshop 也从单栏卡片改成真正的工具陈列。",
    highlights: [
      { emoji: "🧩", text: "Portfolio 改为左侧项目时间线 + 右侧 not a trophy wall 说明卡" },
      { emoji: "🛠️", text: "Workshop 改为左侧工具列表 + 右侧 tiny tools, real use 说明卡" },
      { emoji: "🏷️", text: "两个页面都支持 status filter pills，并统一 timeline dot / 胶带 / info tiles" },
      { emoji: "🔧", text: "修正 Portfolio 中个人站技术栈描述：Next.js 15 → Next.js 16" },
    ],
  },
  {
    version: "v1.0",
    date: "2026-06-25",
    title: "Blog 两栏重构 · 列表与阅读区分离",
    tag: "polish",
    summary:
      "Blog 从普通卡片栅格改成更像参考站的两栏结构：左侧是分类文章列表，右侧是欢迎/说明卡。分类页与文章页也同步改造，不再跳回旧布局。",
    highlights: [
      { emoji: "📚", text: "/blog 首页改成左侧文章列表 + 右侧欢迎卡，filter pills 保留但视觉更轻" },
      { emoji: "🗂️", text: "分类页改成时间线文章列表 + sticky 分类说明卡" },
      { emoji: "📖", text: "文章页改成正文阅读卡 + 右侧 article card / same shelf 信息栏" },
      { emoji: "🧵", text: "统一手写体标题、胶带、虚线分隔、mint/rose 状态信息" },
    ],
  },
  {
    version: "v0.9",
    date: "2026-06-25",
    title: "番茄钟 · Workshop 的第一个真实工具",
    tag: "feature",
    summary:
      "工具坊不再是空桌子了。第一个落地的小东西是一个番茄钟——挑这个不是因为它新，而是它每天真的会用。配色和站点同色系，环形进度、铃声、设置面板都内嵌好，关浏览器再回来也不丢进度。",
    highlights: [
      { emoji: "🍅", text: "三模式循环：Focus 25 · Short 5 · Long 15（每 4 轮长休一次），全部可在设置里改" },
      { emoji: "⭕", text: "SVG 环形进度 + 文档标题同步倒计时，最小化也能瞄一眼" },
      { emoji: "🔔", text: "Web Audio API 合成「叮——咚」两声铃，无需音频文件" },
      { emoji: "⌨️", text: "空格开始/暂停，R 重置——快捷键直达" },
      { emoji: "💾", text: "设置 + 累计 focus 数本地存储，刷新不丢" },
      { emoji: "🪛", text: "结构上做成 in-site 工具：`/workshop/pomodoro` 路由，零额外部署成本" },
    ],
  },
  {
    version: "v0.8",
    date: "2026-06-25",
    title: "Workshop · AI 协作工具坊上线",
    tag: "feature",
    summary:
      "给 AI 协作做的小工具单独开一个去处。Portfolio 留给「完整项目」，Workshop 装那些为了解决一个具体麻烦事临时长出来的小东西——做完就放上来，不强求规模。",
    highlights: [
      { emoji: "🛠️", text: "新增 /workshop 页面，支持 external / embedded / in-site 三种工具形态" },
      { emoji: "📋", text: "tools.json 数据驱动，标签 / 技术栈 / AI 协作记录都结构化" },
      { emoji: "🪧", text: "空状态友好：placeholder 三件套 + 一句「桌子已经擦干净了」" },
      { emoji: "🧭", text: "导航、首页 2×2、右侧贴边面板同步加入 Workshop 入口" },
    ],
  },
  {
    version: "v0.7",
    date: "2026-06-25",
    title: "Wonderland 换肤 · 加入 Releases 页",
    tag: "polish",
    summary:
      "整体视觉做一次温和的转向——把站点主色从「奶纸 + 鼠尾草」调整为「薄荷绿 + 玫粉」。导航变成药丸形、悬停下落，多了一点手写体的轻盈。同时正式把更新日志单独成页，让每一次小改动都有地方落地。",
    highlights: [
      { emoji: "🌿", text: "新增 mint / rose 调色板（与原有 cream/earth/sage token 并存，旧页面照常工作）" },
      { emoji: "📜", text: "导航重做：药丸形 + Blog 分类 hover 下拉 + Logo 轻旋转" },
      { emoji: "✒️", text: "引入 Caveat 手写体作为标题装饰字体" },
      { emoji: "📮", text: "新增 /releases 页面，每一次迭代都留个脚印" },
      { emoji: "🪟", text: "把整页变成「浮在薄荷底色上的毛玻璃卡片」结构，内部独立滚动" },
      { emoji: "📎", text: "右侧贴边快捷面板（xl 屏）+ FloatingHey 跳动小标签等小细节" },
    ],
  },
  {
    version: "v0.6",
    date: "2026-06-12",
    title: "Floating Hey · 路由过渡 · 滚动回顶",
    tag: "feature",
    summary:
      "把站点从「能看」推到「愿意停留」。右下角的 🌼 浮窗会每隔几秒换一句悄悄话，hover 可预览、点击会钉住。页面切换补了一层柔和的淡入淡出，长文阅读到底部时会出现回顶按钮。",
    highlights: [
      { emoji: "🌼", text: "FloatingHey 组件：5 条循环悄悄话，呼吸感动画" },
      { emoji: "🍃", text: "路由切换淡入淡出（framer-motion）" },
      { emoji: "⬆️", text: "ScrollToTop：滚动 400px 后渐显" },
    ],
  },
  {
    version: "v0.5",
    date: "2026-05-28",
    title: "Portfolio · Behind 页",
    tag: "feature",
    summary:
      "把「我在做什么」和「这个站怎么搭起来的」两件事拆开讲。Portfolio 用 JSON 配置驱动项目卡片，Behind 页则像一份给自己看的施工日志——技术栈、装饰系统、设计原则都写在那。",
    highlights: [
      { emoji: "🧩", text: "Portfolio 由 content/portfolio/projects.json 驱动" },
      { emoji: "🪟", text: "Behind 页：技术栈 + 装饰系统说明 + 设计原则" },
      { emoji: "🏷️", text: "项目卡片：状态 chip + tags + highlights 列表" },
    ],
  },
  {
    version: "v0.4",
    date: "2026-05-10",
    title: "纸感装饰系统 · Sticky Notes",
    tag: "polish",
    summary:
      "正文之外的留白也得有性格。这一版把整套「纸感」装饰沉淀成可复用的 CSS 工具：纸张纹理、便利贴卷边、胶带、波浪分隔线、荧光笔下划线，全部 token 化。",
    highlights: [
      { emoji: "📄", text: "paper-lines：极淡横线纸纹理（SVG noise + repeating-gradient）" },
      { emoji: "🗒️", text: "sticky-note：底部羽化阴影 + 微旋转 + hover 上抬" },
      { emoji: "🌊", text: "SectionDivider / WavyDivider / DotRow：三档分隔克制铺开" },
      { emoji: "🖍️", text: ".highlight 荧光笔效果，可跨行 box-decoration-break" },
    ],
  },
  {
    version: "v0.3",
    date: "2026-04-22",
    title: "Markdown 博客引擎",
    tag: "feature",
    summary:
      "把内容这条主线打通。Markdown 走 gray-matter + react-markdown + remark-gfm，分类做成 /blog/[category]/[slug] 的目录结构，文章卡片支持 tags / description / 日期排序。",
    highlights: [
      { emoji: "📚", text: "四个分类：地缘观察 / 金融制度 / 学习笔记 / 随笔" },
      { emoji: "🪜", text: "ScrollTOC：长文章右侧锚点导航" },
      { emoji: "✨", text: "MarkdownRenderer：代码块加窗口控件装饰、引用块加引号 SVG" },
    ],
  },
  {
    version: "v0.2",
    date: "2026-04-05",
    title: "设计语言定型 · Token 化",
    tag: "refactor",
    summary:
      "在写第一篇文章之前，先把颜色、字体、阴影、间距这些视觉决策固化下来。所有硬编码颜色清干净，统一进 @theme + CSS 变量，顺便把暗色模式一起带出来。",
    highlights: [
      { emoji: "🎨", text: "五组 token：cream / earth / sage / mist / warm" },
      { emoji: "🌓", text: "prefers-color-scheme 自动暗色模式" },
      { emoji: "🔤", text: "字体：Noto Serif SC 正文 / Inter 标题 / JetBrains Mono 代码" },
    ],
  },
  {
    version: "v0.1",
    date: "2026-03-18",
    title: "项目初始化",
    tag: "init",
    summary:
      "Next.js 16 + Tailwind v4 + TypeScript 起步。一个空仓库，一个域名构想，一个想要慢慢长出来的数字花园。",
    highlights: [
      { emoji: "🌱", text: "Next.js 16 App Router + Tailwind v4 + TypeScript" },
      { emoji: "📁", text: "content/ 目录承载 Markdown 与 JSON 数据" },
      { emoji: "📡", text: "部署到 Vercel" },
    ],
  },
];

export default function ReleasesPage() {
  return <ReleasesClient releases={releases} />;
}

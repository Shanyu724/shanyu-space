# 山雨·个人站 🌿

一个集博客、作品集、关于页于一体的个人数字花园。

基于 Next.js 15 + Tailwind CSS v4 + TypeScript 构建，Markdown 驱动内容，Vercel 免费托管。

🌐 **在线访问**：https://shanyu-space.vercel.app

[![CI](https://github.com/Shanyu724/shanyu-space/actions/workflows/ci.yml/badge.svg)](https://github.com/Shanyu724/shanyu-space/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/github/deployments/Shanyu724/shanyu-space/production?style=flat&logo=vercel&label=vercel)](https://vercel.com/shanyu0724/shanyu-space)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-339933?logo=node.js&logoColor=white)](https://nodejs.org)

## 项目结构

```
shanyu-space/
├── content/
│   ├── blog/
│   │   ├── geo/          # 地缘观察
│   │   ├── finance/      # 金融制度
│   │   ├── study/        # 学习笔记
│   │   └── essays/       # 随笔
│   └── portfolio/
│       └── projects.json # 作品集数据
├── public/
│   └── images/           # 存放图片
├── src/
│   ├── app/
│   │   ├── page.tsx             # 首页
│   │   ├── blog/                # 博客页
│   │   ├── portfolio/           # 作品集
│   │   ├── about/               # 关于我
│   │   └── behind/              # 幕后
│   ├── components/              # 通用组件
│   └── lib/
│       └── content.ts           # 内容读取引擎
└── package.json
```

## 如何添加新文章

非常简单，不需要懂代码：

### 1. 新建 Markdown 文件

在 `content/blog/` 下对应的分类文件夹里创建一个 `.md` 文件，例如：

```
content/blog/geo/观察简报-202606.md
```

### 2. 文件内容格式

```markdown
---
title: "文章的标题"
date: "2026-06-25"
description: "一段简短的文章描述，会显示在卡片上"
tags: ["标签1", "标签2"]
published: true
---

这里是正文，用 Markdown 格式写。

## 二级标题

段落文字。

- 列表项 1
- 列表项 2

> 引用文字
```

### 3. 添加到作品集

编辑 `content/portfolio/projects.json`，按 JSON 格式添加项目。

### 4. 推送到 GitHub

```
git add .
git commit -m "添加新文章"
git push
```

Vercel 会自动重新部署，几分钟后网站就更新了。

## 如何修改个人信息

- **关于我** → 编辑 `src/app/about/page.tsx`
- **博客分类** → 编辑 `src/lib/content.ts` 中的 `categoryLabels` 和 `categoryDescriptions`
- **站点信息** → 编辑 `src/app/layout.tsx` 中的 metadata

## 本地开发

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器，访问 http://localhost:3000
npm run build      # 构建生产版本
npm start          # 运行生产版本
```

## 部署到 Vercel（免费）

1. 把项目推送到 GitHub 仓库
2. 登录 [vercel.com](https://vercel.com)（用 GitHub 账号）
3. 点击 "Add New → Project"，选择这个仓库
4. 保持默认设置，点 "Deploy"
5. 部署完成后你会得到一个 `xxx.vercel.app` 的域名（本站为 [shanyu-space.vercel.app](https://shanyu-space.vercel.app)）
6. 可以在 Settings → Domains 里绑定自己的域名

## 技术栈

| 层面 | 技术                        |
| ---- | --------------------------- |
| 框架 | Next.js 15 (App Router)     |
| 语言 | TypeScript                  |
| 样式 | Tailwind CSS v4             |
| 内容 | Markdown + gray-matter      |
| 渲染 | react-markdown + remark-gfm |
| 部署 | Vercel (免费版)             |

## 配色

以「山雨」为灵感——鼠尾草绿、雾蓝、暖米色纸张底色。

- 背景：`#faf7f2` 奶油米白
- 主色：`#4f6f4a` 山色
- 辅色：`#8b9bb5` 雾蓝
- 强调：`#d4a76a` 暖琥珀
  ""

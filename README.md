# 山雨

一个以中文写作为核心的个人网站，收纳博客、作品集、工具实验和版本迭代记录。整体视觉偏古风、静谧、克制，内容层则更重视长期积累而不是即时热闹。

线上地址：[shanyu-space.vercel.app](https://shanyu-space.vercel.app)

[![CI](https://github.com/Shanyu724/shanyu-space/actions/workflows/ci.yml/badge.svg)](https://github.com/Shanyu724/shanyu-space/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/github/deployments/Shanyu724/shanyu-space/production?style=flat&logo=vercel&label=vercel)](https://vercel.com/shanyu0724/shanyu-space)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-339933?logo=node.js&logoColor=white)](https://nodejs.org)

## 站点结构

- 首页 `/`
  - 站点总入口与海报式导览
- 博客 `/blog`
  - 六个分类的文章归档与详情页
- 作品集 `/portfolio`
  - 项目陈列与阶段性成果展示
- 工具坊 `/workshop`
  - 小型 AI 协作工具与实验页面
- 关于 `/about`
  - 个人介绍与当前关注
- 更新日志 `/releases`
  - 版本迭代与设计调整记录

## 博客分类

当前博客分为六类：

1. 数模推演 `modeling`
2. 金融洞察 `finance`
3. 研习札记 `study`
4. 标的解构 `assets`
5. 宏观视野 `macro`
6. 随笔杂谈 `essays`

分类名称与描述由 `src/lib/content.ts` 维护。

## 内容目录

```text
shanyu-space/
├── content/
│   ├── blog/
│   │   ├── modeling/
│   │   ├── finance/
│   │   ├── study/
│   │   ├── assets/
│   │   ├── macro/
│   │   ├── essays/
│   │   └── geo/              # 兼容旧文章目录
│   ├── portfolio/
│   │   └── projects.json
│   ├── workshop/
│   │   ├── tools.json
│   │   └── pomodoro/
│   └── me.json
├── public/
│   └── images/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
└── package.json
```

## 内容维护

### 新增博客文章

在对应分类目录下新建 `.md` 或 `.mdx` 文件，例如：

```markdown
---
title: "文章标题"
date: "2026-06-27"
description: "会显示在列表卡片中的摘要"
tags: ["标签1", "标签2"]
published: true
---

正文从这里开始。
```

支持 Markdown 扩展：

- `remark-gfm`：表格、任务列表、删除线
- `remark-math` + `rehype-katex`：行内公式与块级公式

### 新增作品集项目

编辑 `content/portfolio/projects.json`，按现有字段补一条项目数据。

### 新增工具坊项目

编辑 `content/workshop/tools.json`。如果是站内工具，再在 `content/workshop/<tool-id>/` 下补充 `ai-context.md` 等说明文件。

### 修改个人信息

- 个人文本数据：`content/me.json`
- 页面内容：`src/app/about/`
- 站点 metadata：`src/app/layout.tsx`

## 技术栈

| 层面          | 技术                               |
| ------------- | ---------------------------------- |
| 框架          | Next.js 16.2.9                     |
| 语言          | TypeScript                         |
| UI            | React 19                           |
| 样式          | Tailwind CSS v4                    |
| 动画          | Framer Motion                      |
| 内容解析      | gray-matter                        |
| Markdown 渲染 | react-markdown + remark-gfm        |
| 数学公式      | remark-math + rehype-katex + KaTeX |
| 部署          | Vercel                             |

## 本地开发

```bash
npm install
npm run dev
npm run build
npm start
```

默认开发地址为 [http://127.0.0.1:3000](http://127.0.0.1:3000)。

## 发布流程

```bash
git add .
git commit -m "feat: 描述你的改动"
git push
```

推送后会触发 GitHub Actions 与 Vercel 自动部署。版本说明页 `/releases` 可同步记录本次迭代。

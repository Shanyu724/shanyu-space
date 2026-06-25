import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, getPost, getTools, getProjects, getToolAIContext } from "@/lib/content";

/**
 * 上下文 API：根据当前路径返回页面相关文本，供 AI 问答时拼到 system prompt。
 *
 * GET /api/context?path=/blog/geo/multi-source-methodology
 *
 * 返回 { kind, title, content, ... }，content 形态因 kind 而异：
 *   - post: 全文 Markdown
 *   - post-list: 列表（标题 + 描述）
 *   - tool: 工具简介 + ai-context
 *   - tool-list: 工具列表
 *   - about / static: 静态段落
 *   - project-list: 作品列表
 *   - none: 仅返回 path
 */

const ABOUT_CONTEXT = `关于"山雨"
- 「山雨」取自苏轼"山色空蒙雨亦奇"——雨中的世界反而有种特别的清晰
- 一个正在构建知识体系的人
- 目前备考金融工程方向的研究生
- 长期关注：地缘政治的多源交叉验证、金融制度的机制设计分析、AI 对社会组织生产的深层影响、系统性思考与深度内容创作
- 当前状态：考研备考中，数学三 / 英语一 / 经济学 802 / 政治四门并行
- 数字花园的定位：不追热点，只放深度、真诚、独立思考的内容`;

const BEHIND_CONTEXT = `关于"幕后"
- 这是山雨·个人站的"幕后"页面，介绍站点是怎么做的、为什么这么做
- 技术栈：Next.js 15 + TypeScript + Tailwind v4 + framer-motion
- 内容驱动：Markdown + gray-matter + react-markdown + remark-gfm
- 部署：Vercel + 自动部署（每次 push 触发）
- 设计：手账风、奶油米白底色、鼠尾草绿主色、暖琥珀强调
- 灵感来源：Floria Wonderland`;

const RELEASES_CONTEXT = `关于"更新日志"
- 记录山雨·个人站每次迭代的版本与变化
- 按"功能 / 修复 / 调整"分类`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") || "/";

  // 工具详情页：/workshop/<id>
  const toolMatch = path.match(/^\/workshop\/([\w-]+)\/?$/);
  if (toolMatch) {
    const id = toolMatch[1];
    const tool = getTools().find((t) => t.id === id);
    if (!tool) {
      return NextResponse.json({ kind: "none", path, message: "tool not found" });
    }
    const aiContext = getToolAIContext(id);
    return NextResponse.json({
      kind: "tool",
      path,
      id: tool.id,
      name: tool.name,
      emoji: tool.emoji,
      description: tool.description,
      status: tool.status,
      tech: tool.tech,
      highlights: tool.highlights,
      aiContext, // 可能为 null
    });
  }

  // 工具列表页
  if (path === "/workshop" || path === "/workshop/") {
    const tools = getTools().map((t) => ({
      id: t.id,
      name: t.name,
      emoji: t.emoji,
      description: t.description,
      status: t.status,
    }));
    return NextResponse.json({ kind: "tool-list", path, tools });
  }

  // 文章详情：/blog/<category>/<slug>
  const postMatch = path.match(/^\/blog\/([\w-]+)\/([\w-]+)\/?$/);
  if (postMatch) {
    const [, category, slug] = postMatch;
    const post = getPost(category, slug);
    if (!post || post.frontmatter.published === false) {
      return NextResponse.json({ kind: "none", path, message: "post not found" });
    }
    return NextResponse.json({
      kind: "post",
      path,
      category,
      slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      tags: post.frontmatter.tags,
      description: post.frontmatter.description,
      content: post.content,
    });
  }

  // 分类列表：/blog/<category>
  const categoryMatch = path.match(/^\/blog\/([\w-]+)\/?$/);
  if (categoryMatch) {
    const category = categoryMatch[1];
    const all = getAllPosts().filter(
      (p) => p.category === category && p.frontmatter.published !== false,
    );
    return NextResponse.json({
      kind: "post-list",
      path,
      category,
      posts: all.map((p) => ({
        slug: p.slug,
        title: p.frontmatter.title,
        date: p.frontmatter.date,
        description: p.frontmatter.description,
        tags: p.frontmatter.tags,
      })),
    });
  }

  // 博客总览
  if (path === "/blog" || path === "/blog/") {
    const posts = getAllPosts()
      .filter((p) => p.frontmatter.published !== false)
      .map((p) => ({
        category: p.category,
        slug: p.slug,
        title: p.frontmatter.title,
        date: p.frontmatter.date,
        description: p.frontmatter.description,
      }));
    return NextResponse.json({ kind: "post-list", path, posts });
  }

  // 作品集
  if (path === "/portfolio" || path === "/portfolio/") {
    const projects = getProjects();
    return NextResponse.json({ kind: "project-list", path, projects });
  }

  // 静态页
  if (path === "/about" || path === "/about/") {
    return NextResponse.json({ kind: "static", path, title: "关于我", content: ABOUT_CONTEXT });
  }
  if (path === "/behind" || path === "/behind/") {
    return NextResponse.json({ kind: "static", path, title: "幕后", content: BEHIND_CONTEXT });
  }
  if (path === "/releases" || path === "/releases/") {
    return NextResponse.json({
      kind: "static",
      path,
      title: "更新日志",
      content: RELEASES_CONTEXT,
    });
  }

  // 兜底
  return NextResponse.json({ kind: "none", path });
}

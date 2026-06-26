import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, getPost, getTools, getProjects, getToolAIContext } from "@/lib/content";
import { getMe } from "@/lib/me";

/**
 * 上下文 API：根据当前路径返回页面相关文本，供 AI 问答时拼到 system prompt。
 *
 * GET /api/context?path=/blog/geo/multi-source-methodology
 *
 * 返回 { kind, title, content, ... }，content 形态因 kind 而异：
 *   - post: 全文 Markdown（已截断到 POST_MAX_CHARS）
 *   - post-list: 列表（标题 + 描述）
 *   - tool: 工具简介 + ai-context
 *   - tool-list: 工具列表
 *   - about / static: 静态段落
 *   - project-list: 作品列表
 *   - none: 仅返回 path
 */

const ABOUT_CONTEXT = (() => {
  const me = getMe();
  return `关于"${me.name}"
- 名字来源：${me.about.nameOrigin}
- 当前在做什么：${me.about.whatIDo}
- 长期关注：${me.about.interests.map((i) => i.label).join("、")}
- 当前状态：${me.about.currentStatus.join("；")}
- 站点定位：${me.tagline}`;
})();

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

/**
 * 服务端内存缓存（同一实例内复用，warm start 时近乎瞬时返回）
 * key = path，TTL 30s（路径内容基本不变，30s 足以覆盖同一会话）
 */
const CTX_TTL_MS = 30_000;
const ctxCache = new Map<string, { ts: number; data: unknown }>();

/** post 全文截断上限，避免长文把 response 拖大 */
const POST_MAX_CHARS = 5000;

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max) + "\n\n…(内容过长已截断)";
}

/** 写缓存 + 返回 JSON（统一出口，便于维护） */
function jsonCached(path: string, data: unknown) {
  ctxCache.set(path, { ts: Date.now(), data });
  return NextResponse.json(data);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") || "/";

  // 命中缓存：直接返回，避免重新读文件系统
  const hit = ctxCache.get(path);
  if (hit && Date.now() - hit.ts < CTX_TTL_MS) {
    return NextResponse.json(hit.data);
  }

  // 工具详情页：/workshop/<id>
  const toolMatch = path.match(/^\/workshop\/([\w-]+)\/?$/);
  if (toolMatch) {
    const id = toolMatch[1];
    const tool = getTools().find((t) => t.id === id);
    if (!tool) {
      return jsonCached(path, { kind: "none", path, message: "tool not found" });
    }
    const aiContext = getToolAIContext(id);
    return jsonCached(path, {
      kind: "tool",
      path,
      id: tool.id,
      name: tool.name,
      emoji: tool.emoji,
      description: tool.description,
      status: tool.status,
      tech: tool.tech,
      highlights: tool.highlights,
      aiContext,
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
    return jsonCached(path, { kind: "tool-list", path, tools });
  }

  // 文章详情：/blog/<category>/<slug>
  const postMatch = path.match(/^\/blog\/([\w-]+)\/([\w-]+)\/?$/);
  if (postMatch) {
    const [, category, slug] = postMatch;
    const post = getPost(category, slug);
    if (!post || post.frontmatter.published === false) {
      return jsonCached(path, { kind: "none", path, message: "post not found" });
    }
    return jsonCached(path, {
      kind: "post",
      path,
      category,
      slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      tags: post.frontmatter.tags,
      description: post.frontmatter.description,
      content: truncate(post.content, POST_MAX_CHARS),
    });
  }

  // 分类列表：/blog/<category>
  const categoryMatch = path.match(/^\/blog\/([\w-]+)\/?$/);
  if (categoryMatch) {
    const category = categoryMatch[1];
    const all = getAllPosts().filter(
      (p) => p.category === category && p.frontmatter.published !== false,
    );
    return jsonCached(path, {
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
    return jsonCached(path, { kind: "post-list", path, posts });
  }

  // 作品集
  if (path === "/portfolio" || path === "/portfolio/") {
    return jsonCached(path, { kind: "project-list", path, projects: getProjects() });
  }

  // 静态页
  if (path === "/about" || path === "/about/") {
    return jsonCached(path, {
      kind: "static",
      path,
      title: "关于我",
      content: ABOUT_CONTEXT,
    });
  }
  if (path === "/behind" || path === "/behind/") {
    return jsonCached(path, {
      kind: "static",
      path,
      title: "幕后",
      content: BEHIND_CONTEXT,
    });
  }
  if (path === "/releases" || path === "/releases/") {
    return jsonCached(path, {
      kind: "static",
      path,
      title: "更新日志",
      content: RELEASES_CONTEXT,
    });
  }

  // 兜底
  return jsonCached(path, { kind: "none", path });
}

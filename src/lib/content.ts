import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { SiteIconName } from "@/components/SiteIcon";

const blogDir = path.join(process.cwd(), "content", "blog");
const portfolioDir = path.join(process.cwd(), "content", "portfolio");
const workshopDir = path.join(process.cwd(), "content", "workshop");

export interface PostFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  published?: boolean;
}

export interface Post {
  slug: string;
  category: string;
  frontmatter: PostFrontmatter;
  content: string;
}

function isPublished(frontmatter: PostFrontmatter): boolean {
  return frontmatter.published !== false;
}

const categoryLabels: Record<string, string> = {
  modeling: "数模推演",
  finance: "金融洞察",
  study: "研习札记",
  assets: "标的解构",
  macro: "宏观视野",
  essays: "随笔杂谈",
};

const categoryDescriptions: Record<string, string> = {
  modeling: "用数学与模型推导机制，把抽象规律落到可计算的形态",
  finance: "从机制设计与市场结构出发，拆解金融现象的底层逻辑",
  study: "研习路上的学科笔记、概念辨析与方法沉淀",
  assets: "拆解具体资产、工具与契约条款，看清条款里的激励与风险",
  macro: "跨越多源信息的地缘与宏观观察，验证与互校之间寻找锚点",
  essays: "不设限的自由书写——阅读随想、日常观察与思考碎片",
};

const categoryOrders = ["modeling", "finance", "study", "assets", "macro", "essays"];

function normalizePostFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  const date = data.date;

  return {
    ...(data as unknown as PostFrontmatter),
    date: date instanceof Date ? date.toISOString().slice(0, 10) : String(date ?? ""),
  };
}

export function getCategoryLabel(cat: string): string {
  return categoryLabels[cat] ?? cat;
}

export function getCategoryDescription(cat: string): string {
  return categoryDescriptions[cat] ?? "";
}

export function getAllCategories(): { id: string; label: string; description: string }[] {
  return categoryOrders
    .filter((id) => {
      const dir = path.join(blogDir, id);
      return fs.existsSync(dir);
    })
    .map((id) => ({
      id,
      label: categoryLabels[id] ?? id,
      description: categoryDescriptions[id] ?? "",
    }));
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const cat of categoryOrders) {
    const catDir = path.join(blogDir, cat);
    if (!fs.existsSync(catDir)) continue;

    const files = fs.readdirSync(catDir);
    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

      const filePath = path.join(catDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.(md|mdx)$/, "");
      const frontmatter = normalizePostFrontmatter(data);

      if (!isPublished(frontmatter)) continue;

      posts.push({
        slug,
        category: cat,
        frontmatter,
        content,
      });
    }
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || "2000-01-01").getTime();
    const dateB = new Date(b.frontmatter.date || "2000-01-01").getTime();
    return dateB - dateA;
  });

  return posts;
}

export function getPostsByCategory(category: string): Post[] {
  const catDir = path.join(blogDir, category);
  if (!fs.existsSync(catDir)) return [];

  const posts: Post[] = [];
  const files = fs.readdirSync(catDir);

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

    const filePath = path.join(catDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.(md|mdx)$/, "");
    const frontmatter = normalizePostFrontmatter(data);

    if (!isPublished(frontmatter)) continue;

    posts.push({
      slug,
      category,
      frontmatter,
      content,
    });
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || "2000-01-01").getTime();
    const dateB = new Date(b.frontmatter.date || "2000-01-01").getTime();
    return dateB - dateA;
  });

  return posts;
}

export function getPost(category: string, slug: string): Post | null {
  const dir = path.join(blogDir, category);
  for (const ext of [".md", ".mdx"]) {
    const filePath = path.join(dir, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = normalizePostFrontmatter(data);

      if (!isPublished(frontmatter)) return null;

      return {
        slug,
        category,
        frontmatter,
        content,
      };
    }
  }
  return null;
}

export interface Project {
  id: string;
  icon?: SiteIconName;
  title: string;
  description: string;
  status: string;
  tags: string[];
  link?: string;
  highlights: string[];
}

export function getProjects(): Project[] {
  const filePath = path.join(portfolioDir, "projects.json");
  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Project[];
}

/* ── Workshop（AI 协作小工具） ── */
export interface Tool {
  id: string;
  icon?: SiteIconName;
  name: string;
  description: string;
  /** live：上线可用；alpha：内测；wip：还在做 */
  status: "live" | "alpha" | "wip";
  /** external：跳转外链；embedded：内嵌 iframe；in-site：站内子页面 */
  kind: "external" | "embedded" | "in-site";
  url?: string;
  tags: string[];
  tech: string[];
  /** 一句话亮点 */
  highlights: string[];
  /** 制作日期 YYYY-MM-DD（用于排序） */
  createdAt: string;
  /** 用了哪些 AI 协作（Claude / GPT / Cursor / ...） */
  builtWith?: string[];
}

export function getTools(): Tool[] {
  const filePath = path.join(workshopDir, "tools.json");
  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  const tools = JSON.parse(raw) as Tool[];

  // 倒序排：最新做的在最前
  return [...tools].sort((a, b) => {
    const dateA = new Date(a.createdAt || "2000-01-01").getTime();
    const dateB = new Date(b.createdAt || "2000-01-01").getTime();
    return dateB - dateA;
  });
}

/**
 * 读取某个 workshop 工具的 AI 上下文文件
 * （专门给 AI 看的长描述，比 description 字段更细，不含代码）。
 * 文件路径：content/workshop/<id>/ai-context.md
 * 没文件时返回 null。
 */
export function getToolAIContext(id: string): string | null {
  const filePath = path.join(workshopDir, id, "ai-context.md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  return parsed.content.trim();
}

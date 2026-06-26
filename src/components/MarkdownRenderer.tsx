import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

/**
 * 把任意字符串转成 URL 友好的 slug
 * - 中文 → 保留（用 encodeURIComponent 编码）
 * - 空格 → -
 * - 特殊字符 → 移除
 */
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\p{L}\p{N}\-一-龥]/gu, "")
    .replace(/^-+|-+$/g, "");
}

const components: Components = {
  h2: ({ children, ...props }) => {
    const text = String(children ?? "");
    const id = slugify(text);
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = String(children ?? "");
    const id = slugify(text);
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  },
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <span className="block my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ""}
        className="max-w-full rounded-lg"
        loading="lazy"
        {...props}
      />
    </span>
  ),
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}

/* Extract TOC items from markdown content */
export function extractToc(content: string): { id: string; text: string; level: number }[] {
  const lines = content.replace(/\r\n?/g, "\n").split("\n");
  const items: { id: string; text: string; level: number }[] = [];

  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].trim();
    items.push({ id: slugify(text), text, level });
  }

  return items;
}

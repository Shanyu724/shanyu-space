/* 纯函数工具，不依赖 Node.js 内置模块，可供 client 组件安全导入 */

const categoryMeta: Record<string, { emoji: string; color: string; borderColor: string }> = {
  modeling: { emoji: "📐", color: "#5a8b8b", borderColor: "#5a8b8b" },
  finance: { emoji: "🏦", color: "#d4a76a", borderColor: "#d4a76a" },
  study: { emoji: "📚", color: "#6d8b67", borderColor: "#6d8b67" },
  assets: { emoji: "🏗️", color: "#b87333", borderColor: "#b87333" },
  macro: { emoji: "🌐", color: "#8b9bb5", borderColor: "#8b9bb5" },
  essays: { emoji: "✍️", color: "#b3a48d", borderColor: "#b3a48d" },
};

export function getCategoryMeta(cat: string) {
  return categoryMeta[cat] ?? { emoji: "📄", color: "#b3a48d", borderColor: "#b3a48d" };
}

export function estimateReadingTime(content: string): string {
  const chineseChars = content.replace(/[^一-鿿]/g, "").length;
  const totalWords = chineseChars + content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(totalWords / 350));
  return `${minutes} 分钟`;
}

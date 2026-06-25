"use client";

import { motion } from "framer-motion";

interface MouseScrollHintProps {
  /** 提示文案 */
  label?: string;
  /** 跳转锚点 id（不传则不渲染链接） */
  href?: string;
  className?: string;
}

/**
 * 受 Floria 站点启发的"鼠标 + 向下探索"提示组件。
 * 鼠标 SVG 容器 + 红色滚轮小点 + 浮动动画 + 文字。
 * 容器加 pointer-events-none（除了链接），不阻挡下方元素点击。
 */
export function MouseScrollHint({
  label = "向下探索",
  href,
  className = "",
}: MouseScrollHintProps) {
  const content = (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mouse-scroll-hint"
    >
      <span className="mouse-icon" aria-hidden="true" />
      <span className="text-xs font-handwriting tracking-wider" style={{ fontFamily: "var(--font-handwriting)" }}>
        {label}
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`inline-block pointer-events-auto no-underline ${className}`}
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={`inline-block pointer-events-none ${className}`}>
      {content}
    </span>
  );
}

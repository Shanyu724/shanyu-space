"use client";

import { useEffect, useState } from "react";
import { SiteIcon } from "./SiteIcon";

type Mode = "light" | "dark";

/**
 * 暗色模式切换按钮。
 *
 * - 首屏状态由 layout.tsx 中的 init script 设置（避免 hydration 闪烁）。
 * - 这里 mount 后从 <html> classList 同步实际状态，保证客户端组件与
 *   DOM 一致。
 * - 切换时写 .dark / .light 到 <html> 并持久化到 localStorage('theme')。
 * - 系统跟随：用户从未点击时，init script 根据 prefers-color-scheme 决定；
 *   此组件 mount 后通过监听 matchMedia 在系统切换时同步 .dark class。
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  // Mount 后从 DOM 同步真实状态
  useEffect(() => {
    setMounted(true);
    setMode(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  // 系统主题变化时，仅在「用户没显式选择」时跟随
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme") !== null) return; // 用户已锁定，不跟随
      const root = document.documentElement;
      root.classList.toggle("dark", e.matches);
      root.classList.remove("light");
      setMode(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "light" ? "dark" : "light";
    setMode(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
  };

  // Mount 前用占位，避免 SSR/CSR 内容不一致警告
  if (!mounted) {
    return (
      <span
        aria-hidden
        className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${className}`}
      />
    );
  }

  const isDark = mode === "dark";
  const label = isDark ? "切换到浅色模式" : "切换到深色模式";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center h-8 w-8 rounded-full border border-mint-200/70 bg-white/70 hover:bg-white/95 hover:text-rose-400 hover:border-rose-300 transition-colors text-mint-700 shadow-sm ${className}`}
    >
      <SiteIcon name={isDark ? "sun" : "moon"} className="h-4 w-4" />
    </button>
  );
}

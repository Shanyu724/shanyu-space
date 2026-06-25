"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PageCtx {
  path: string;
  title?: string;
  text?: string;
}

interface AIChatPanelProps {
  /** 浮窗模式（带触发按钮）/ 嵌入模式（直接渲染） */
  variant?: "floating" | "embedded";
}

const SUGGESTIONS = [
  "介绍一下山雨是谁？",
  "网站里有什么内容？",
  "推荐一篇值得读的文章",
  "说说最近在关注什么？",
];

// 浮窗模式要隐藏的路径（这些页面已经有自己的聊天 UI）
const FLOATING_HIDE_PATHS = new Set(["/chat"]);

// 同一会话内的页面 context 缓存，避免重复 fetch
const ctxCache = new Map<string, PageCtx | null>();

/**
 * AI 聊天面板：浮窗与独立页通用。
 * 浮窗模式自动感知当前路径，把页面内容作为 context 一起发给 /api/chat。
 * 浮球在 /chat 页面自动隐藏（独立页已有完整聊天 UI）。
 * 性能优化：context 懒加载（仅在用户点开浮球时拉取）+ 内存缓存。
 */
export function AIChatPanel({ variant = "floating" }: AIChatPanelProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [pageCtx, setPageCtx] = useState<PageCtx | null>(null);
  const [ctxLoading, setCtxLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 启动时探测 API 是否已配置
  useEffect(() => {
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d) => setConfigured(d.status === "ready"))
      .catch(() => setConfigured(false));
  }, []);

  // 懒加载页面 context：仅在浮窗展开时拉取，带内存缓存
  const ensureCtx = useCallback(async () => {
    if (variant !== "floating" || !pathname || pathname === "/chat") return;
    // 命中缓存
    if (ctxCache.has(pathname)) {
      setPageCtx(ctxCache.get(pathname) ?? null);
      return;
    }
    setCtxLoading(true);
    try {
      const r = await fetch(`/api/context?path=${encodeURIComponent(pathname)}`);
      const d = await r.json();
      const next: PageCtx | null =
        d.kind && d.kind !== "none"
          ? {
              path: d.path,
              title: d.title || d.name,
              text: typeof d.content === "string" ? d.content : undefined,
            }
          : { path: pathname };
      ctxCache.set(pathname, next);
      setPageCtx(next);
    } catch {
      const fallback: PageCtx = { path: pathname };
      ctxCache.set(pathname, fallback);
      setPageCtx(fallback);
    } finally {
      setCtxLoading(false);
    }
  }, [pathname, variant]);

  // 用户点开浮球时加载 context；点开时并行：UI 立即展开 + 异步拉 context
  const toggle = useCallback(() => {
    setOpen((o) => {
      const willOpen = !o;
      if (willOpen) void ensureCtx();
      return willOpen;
    });
  }, [ensureCtx]);

  // 新消息时自动滚到底
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;

      setError(null);
      setInput("");
      setMessages((m) => [...m, { role: "user", content }]);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content }],
            context: pageCtx ?? undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "请求失败");
          setMessages((m) => [...m, { role: "assistant", content: data.error || "（出错）" }]);
        } else {
          setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "网络错误");
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, pageCtx],
  );

  // 浮窗模式 + 在隐藏路径上 → 直接 return null
  if (variant === "floating" && pathname && FLOATING_HIDE_PATHS.has(pathname)) {
    return null;
  }

  const panel = (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      className={
        variant === "floating"
          ? "absolute bottom-16 right-0 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100dvh-8rem)] z-40 origin-bottom-right"
          : "w-full h-full"
      }
    >
      <div className="relative h-full rounded-2xl bg-white/95 backdrop-blur-md border border-mint-100 shadow-2xl shadow-mint-200/30 flex flex-col overflow-hidden">
        {/* 顶部胶带 */}
        <div
          className="absolute -top-2 left-1/2 w-16 h-3 rounded-sm pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--tape-bg-from) 0%, var(--tape-bg-to) 100%)",
            transform: "translateX(-50%) rotate(-3deg)",
            boxShadow: "0 1px 2px var(--tape-shadow)",
          }}
          aria-hidden="true"
        />

        {/* 头部 */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-mint-100/60 bg-mint-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white border border-rose-100 flex items-center justify-center text-lg shadow-sm overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mascot-flower.svg"
                alt=""
                width={28}
                height={32}
                className="-mt-0.5"
              />
            </div>
            <div className="min-w-0">
              <h3
                className="text-base text-mint-800 leading-tight"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                山间小雨
              </h3>
              <p className="text-[10px] text-mint-500 leading-tight">
                {configured === false
                  ? "AI 后台未配置（提示模式）"
                  : configured === null
                    ? "连接中…"
                    : ctxLoading
                      ? "正在读这一页…"
                      : pageCtx && pageCtx.text
                        ? `正在读：${pageCtx.title || pageCtx.path}`
                        : "山雨的 AI 分身"}
              </p>
            </div>
          </div>
          {variant === "floating" && (
            <button
              onClick={() => setOpen(false)}
              className="text-mint-400 hover:text-rose-400 transition-colors text-lg leading-none"
              aria-label="关闭"
            >
              ×
            </button>
          )}
        </header>

        {/* 消息列表 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center px-2">
              <p
                className="text-sm text-mint-700 mb-3"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                你好，我是山间的雨。
                <br />
                {pageCtx && pageCtx.text
                  ? `我正在读「${pageCtx.title || pageCtx.path}」，关于这个页面想问什么？`
                  : "想聊点什么？"}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={loading}
                    className="text-xs px-3 py-1.5 rounded-full bg-mint-50 border border-mint-100 text-mint-700 hover:bg-mint-100 hover:border-mint-200 transition-colors disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-mint-500 text-white rounded-br-sm"
                    : "bg-mint-50 text-mint-800 border border-mint-100 rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-2xl bg-mint-50 border border-mint-100 rounded-bl-sm">
                <div className="flex gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          {error && configured === false && (
            <div className="rounded-lg border border-rose-200 bg-rose-50/50 px-3 py-2 text-xs text-rose-600">
              AI 后台未配置。在 Vercel 项目 → Settings → Environment Variables 添加：
              <code className="block mt-1 text-[11px] bg-white/60 px-2 py-1 rounded">
                AI_API_KEY, AI_BASE_URL, AI_MODEL
              </code>
              详细配置见 <code>obsidian-deploy-guide.md</code>。
            </div>
          )}
        </div>

        {/* 输入框 */}
        <div className="border-t border-mint-100/60 p-3 bg-white/60">
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="说点什么…  (Enter 发送, Shift+Enter 换行)"
              rows={1}
              className="flex-1 resize-none px-3 py-2 text-sm rounded-xl border border-mint-200 bg-white/80 focus:outline-none focus:border-mint-400 focus:ring-1 focus:ring-mint-300 max-h-24"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="shrink-0 w-9 h-9 rounded-full bg-mint-500 hover:bg-mint-600 text-white flex items-center justify-center text-sm disabled:opacity-40 transition-colors"
              aria-label="发送"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (variant === "embedded") {
    return <div className="h-full">{panel}</div>;
  }

  // 浮窗模式：触发按钮 + 展开面板
  return (
    <div className="relative select-none">
      <AnimatePresence>{open && panel}</AnimatePresence>
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.94 }}
        animate={open ? { rotate: 0 } : { rotate: [-3, 4, -3], y: [0, -2, 0] }}
        transition={
          open ? { duration: 0.2 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm border border-rose-200/70 shadow-lg shadow-rose-200/30 flex items-center justify-center overflow-hidden"
        aria-label="AI 助手"
      >
        {!open && (
          <span
            className="absolute -top-9 right-0 whitespace-nowrap animate-bounce text-base text-rose-500 select-none pointer-events-none"
            aria-hidden="true"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            问我！✨
          </span>
        )}
        {/* 用 site 资源里的花朵 SVG 当作"小雨"形象 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mascot-flower.svg"
          alt=""
          width={48}
          height={56}
          className="relative z-[1] -mt-1"
        />
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-400 border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}

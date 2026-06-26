"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { SiteIcon } from "@/components/SiteIcon";
import remarkGfm from "remark-gfm";

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

// 浮窗模式要隐藏的路径
const FLOATING_HIDE_PATHS = new Set(["/chat"]);

/**
 * 页面 context 缓存：以 Promise 存储，hover 预取和点击 await
 * 共享同一个 fetch，零竞态，hover 之后点开立刻有数据。
 */
const ctxCache = new Map<string, Promise<PageCtx>>();

function prefetchContext(pathname: string): Promise<PageCtx> {
  const hit = ctxCache.get(pathname);
  if (hit) return hit;
  const p = (async (): Promise<PageCtx> => {
    try {
      const r = await fetch(`/api/context?path=${encodeURIComponent(pathname)}`);
      const d = await r.json();
      if (d.kind && d.kind !== "none") {
        return {
          path: d.path,
          title: d.title || d.name,
          text: typeof d.content === "string" ? d.content : undefined,
        };
      }
      return { path: pathname };
    } catch {
      return { path: pathname };
    }
  })();
  ctxCache.set(pathname, p);
  return p;
}

/**
 * AI 聊天面板：浮窗与独立页通用。
 *
 * 性能优化：
 * 1. context 通过 hover/focus 提前预取（共享 Promise，无竞态）
 * 2. 面板 JSX 内联到条件里，关闭时不构造 motion 元素
 * 3. configured 探测延后到首次点开
 * 4. 进场动画 180ms
 * 5. /api/context 服务端有 30s 内存缓存（warm 后近瞬时返回）
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
  const [ctxReady, setCtxReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 进入新路径时：800ms 后还没人看，就预取（不阻塞首屏）
  useEffect(() => {
    if (variant !== "floating" || !pathname || pathname === "/chat") return;
    if (ctxCache.has(pathname)) return;
    const t = setTimeout(() => {
      prefetchContext(pathname);
    }, 800);
    return () => clearTimeout(t);
  }, [pathname, variant]);

  // 点开浮球：UI 立即展开，同时 await context（hover 预取过则立即返回）
  const toggle = useCallback(async () => {
    setOpen((o) => {
      const willOpen = !o;
      if (willOpen && variant === "floating" && pathname && pathname !== "/chat") {
        // 异步拉 context（如果 hover 已预取，这里 await 立即 resolve）
        prefetchContext(pathname)
          .then((ctx) => {
            setPageCtx(ctx);
            setCtxReady(true);
          })
          .catch(() => setCtxReady(true));
        // configured 探测延后到首次点开
        if (configured === null) {
          fetch("/api/chat")
            .then((r) => r.json())
            .then((d) => setConfigured(d.status === "ready"))
            .catch(() => setConfigured(false));
        }
      }
      return willOpen;
    });
  }, [pathname, variant, configured]);

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

  // 头部副标题：未拿到 context 时显示默认文案（不闪 loading）
  const statusText =
    configured === false
      ? "AI 后台未配置（提示模式）"
      : !ctxReady
        ? "山雨的 AI 分身"
        : pageCtx && pageCtx.text
          ? `正在读：${pageCtx.title || pageCtx.path}`
          : "山雨的 AI 分身";

  // 嵌入模式：直接渲染面板
  if (variant === "embedded") {
    return (
      <div className="h-full">
        <PanelBody
          scrollRef={scrollRef}
          messages={messages}
          input={input}
          setInput={setInput}
          loading={loading}
          error={error}
          configured={configured}
          statusText={statusText}
          pageCtx={pageCtx}
          onSend={send}
          variant="embedded"
        />
      </div>
    );
  }

  // 浮窗模式
  return (
    <div className="fixed bottom-6 right-5 z-40 select-none">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-14 right-0 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100dvh-8rem)] z-40 origin-bottom-right"
          >
            <PanelBody
              scrollRef={scrollRef}
              messages={messages}
              input={input}
              setInput={setInput}
              loading={loading}
              error={error}
              configured={configured}
              statusText={statusText}
              pageCtx={pageCtx}
              onSend={send}
              onClose={() => setOpen(false)}
              variant="floating"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggle}
        onMouseEnter={() => {
          // hover 时预取（如果还没拉过）—— 点开时已 ready
          if (pathname && pathname !== "/chat") prefetchContext(pathname);
        }}
        onFocus={() => {
          if (pathname && pathname !== "/chat") prefetchContext(pathname);
        }}
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.94 }}
        animate={open ? { rotate: 0 } : { rotate: [-2, 4, -2] }}
        transition={open ? { duration: 0.2 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-12 h-12 rounded-full bg-mint-100 border border-mint-200 shadow-md flex items-center justify-center text-rose-400"
        aria-label="AI 助手"
      >
        {!open && (
          <span
            className="absolute -top-9 right-0 whitespace-nowrap animate-bounce text-base text-rose-500 select-none pointer-events-none inline-flex items-center gap-1"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            <span>Hey!</span>
            <span aria-hidden="true">✨</span>
          </span>
        )}
        <SiteIcon name="flower" className="h-5 w-5" title="花" />
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-400 border-2 border-mint-50 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}

/**
 * 面板主体（抽出是为了让嵌入/浮窗共用，且仅在 open=true 时构造）
 */
interface PanelBodyProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  error: string | null;
  configured: boolean | null;
  statusText: string;
  pageCtx: PageCtx | null;
  onSend: (text?: string) => void;
  onClose?: () => void;
  variant: "floating" | "embedded";
}

function PanelBody({
  scrollRef,
  messages,
  input,
  setInput,
  loading,
  error,
  configured,
  statusText,
  pageCtx,
  onSend,
  onClose,
  variant,
}: PanelBodyProps) {
  return (
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
          <div className="w-9 h-9 rounded-full bg-mint-50 border border-mint-100 flex items-center justify-center shadow-sm">
            <SiteIcon name="flower" className="h-5 w-5 text-rose-400" title="花" />
          </div>
          <div className="min-w-0">
            <h3
              className="text-base text-mint-800 leading-tight"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              小花
            </h3>
            <p className="text-[10px] text-mint-500 leading-tight truncate">{statusText}</p>
          </div>
        </div>
        {variant === "floating" && onClose && (
          <button
            onClick={onClose}
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
              你好，我是小花，山雨的助手。
              <br />
              {pageCtx && pageCtx.text
                ? `我正在读「${pageCtx.title || pageCtx.path}」，关于这个页面想问什么？`
                : "想聊点什么？"}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onSend(s)}
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
              <MessageContent role={m.role} content={m.content} />
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
                onSend();
              }
            }}
            placeholder="说点什么…  (Enter 发送, Shift+Enter 换行)"
            rows={1}
            className="flex-1 resize-none px-3 py-2 text-sm rounded-xl border border-mint-200 bg-white/80 focus:outline-none focus:border-mint-400 focus:ring-1 focus:ring-mint-300 max-h-24"
          />
          <button
            onClick={() => onSend()}
            disabled={!input.trim() || loading}
            className="shrink-0 w-9 h-9 rounded-full bg-mint-500 hover:bg-mint-600 text-white flex items-center justify-center text-sm disabled:opacity-40 transition-colors"
            aria-label="发送"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 消息内容渲染：用户消息当纯文本，AI 消息走 markdown
 * （避免用户发的 `**xxx**` 也被渲染成加粗）
 */
function MessageContent({ role, content }: { role: "user" | "assistant"; content: string }) {
  if (role === "user") {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }
  return (
    <div className="ai-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 段落
          p: ({ children }) => <p className="my-1.5 first:mt-0 last:mb-0">{children}</p>,
          // 标题
          h1: ({ children }) => (
            <h1 className="text-base font-semibold mt-2 mb-1 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[15px] font-semibold mt-2 mb-1 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold mt-2 mb-1 first:mt-0">{children}</h3>
          ),
          h4: ({ children }) => <h4 className="text-sm font-semibold mt-1.5 mb-0.5">{children}</h4>,
          // 强调
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          // 列表
          ul: ({ children }) => <ul className="my-1.5 ml-4 list-disc space-y-0.5">{children}</ul>,
          ol: ({ children }) => (
            <ol className="my-1.5 ml-4 list-decimal space-y-0.5">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          // 链接（站内/外链都开新窗口，避免点走把聊天关掉）
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-500 underline underline-offset-2 hover:text-rose-600"
            >
              {children}
            </a>
          ),
          // 行内代码
          code: ({ children }) => (
            <code className="px-1 py-0.5 rounded bg-mint-100/80 text-[12.5px] font-mono">
              {children}
            </code>
          ),
          // 代码块
          pre: ({ children }) => (
            <pre className="my-2 p-2 rounded-lg bg-mint-100/60 text-[12.5px] overflow-x-auto font-mono">
              {children}
            </pre>
          ),
          // 引用
          blockquote: ({ children }) => (
            <blockquote className="my-1.5 pl-2 border-l-2 border-mint-200 text-mint-700">
              {children}
            </blockquote>
          ),
          // 分隔线
          hr: () => <hr className="my-2 border-mint-100" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

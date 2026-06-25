import type { Metadata } from "next";
import { AIChatPanel } from "@/components/AIChatPanel";

export const metadata: Metadata = {
  title: "AI 助手",
  description: "山雨的数字分身 — 一个能聊天的 AI",
};

export default function ChatPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 h-[calc(100dvh-160px)] min-h-[480px] flex flex-col">
      <header className="mb-6 text-center">
        <span className="inline-block text-xs tracking-[0.35em] text-rose-500 mb-2 px-2 py-0.5 rounded-sm -rotate-2" style={{ backgroundColor: "rgba(235,197,133,0.4)" }}>
          AI 分身
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-mint-800 tracking-tight">
          山间小雨
        </h1>
        <p className="mt-3 text-sm text-mint-600">
          这是山雨的 AI 分身。可以聊聊天、问网站里有什么、或者随便扯点想法。
        </p>
      </header>

      <div className="flex-1 min-h-0">
        <AIChatPanel variant="embedded" />
      </div>

      <footer className="mt-4 text-center text-[11px] text-mint-500">
        按 Enter 发送 · Shift+Enter 换行 · 聊完关页面就行，不留存任何记录
      </footer>
    </div>
  );
}

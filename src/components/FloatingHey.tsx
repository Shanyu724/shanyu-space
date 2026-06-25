"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  {
    title: "Hey! ✨",
    body: "如果你正在读这段文字，那说明你和我一样，是个愿意在角落停留的人。",
  },
  {
    title: "嘿，今天过得怎么样？",
    body: "有时候慢一点也没关系。重要的不是信息量，是消化信息时的思考质量。",
  },
  {
    title: "悄悄话 🌿",
    body: "这个站是慢慢长出来的，不是某天突击做出来的。",
  },
  {
    title: "Btw…",
    body: "如果你也想有个自己的数字花园，从一个 Markdown 文件开始就够了。",
  },
  {
    title: "雨天提示 ☔",
    body: "「山色空蒙雨亦奇」——雨中的世界，反而有种特别的清晰。",
  },
];

export function FloatingHey() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [idx, setIdx] = useState(0);

  const showBubble = open || hovered;
  const isHoverPreview = hovered && !open;
  const pauseBreathing = open || hovered;

  // 周期切换消息（仅在关闭状态时）
  useEffect(() => {
    if (open || hovered) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length);
    }, 8000);
    return () => clearInterval(t);
  }, [open, hovered]);

  const msg = MESSAGES[idx];

  return (
    <div
      className="fixed bottom-6 right-5 z-40 select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 10, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-14 right-0 w-64 bg-mint-50 border border-mint-100 rounded-xl shadow-lg p-4 origin-bottom-right"
          >
            {/* 胶带 */}
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-3 rounded-sm"
              style={{
                background: "linear-gradient(135deg, rgba(241,233,233,0.9) 0%, rgba(210,176,176,0.5) 100%)",
                transform: "translateX(-50%) rotate(-3deg)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
              }}
            />
            {/* 小尾巴 */}
            <div
              className="absolute -bottom-1.5 right-6 w-3 h-3 bg-mint-50 border-r border-b border-mint-100"
              style={{ transform: "rotate(45deg)" }}
            />

            <h3
              className="text-base text-rose-500 mb-1.5"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              {msg.title}
            </h3>
            <p className="text-xs text-mint-800 leading-relaxed">
              {msg.body}
            </p>

            {/* 只在 pinned（click 打开）模式下显示换一条按钮和计数 */}
            {!isHoverPreview && (
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => setIdx((i) => (i + 1) % MESSAGES.length)}
                  className="text-xs text-mint-600 hover:text-rose-400 transition-colors"
                >
                  换一条 →
                </button>
                <span className="text-xs text-mint-400">
                  {idx + 1} / {MESSAGES.length}
                </span>
              </div>
            )}

            {/* hover 模式下的轻量提示 */}
            {isHoverPreview && (
              <p className="mt-2 text-[10px] text-mint-400 italic">
                点击停留 · 固定打开
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 触发按钮 */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
        animate={pauseBreathing ? { rotate: 0 } : { rotate: [-2, 4, -2] }}
        transition={
          pauseBreathing
            ? { duration: 0.2 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative w-12 h-12 rounded-full bg-mint-100 border border-mint-200 shadow-md flex items-center justify-center text-rose-400"
        aria-label="hey"
      >
        {/* 顶部「Hey!」浮签：默认隐藏，浮窗收起时浮现并轻轻跳动 */}
        {!showBubble && (
          <span
            className="absolute -top-9 right-0 whitespace-nowrap animate-bounce font-handwriting text-base text-rose-500 select-none pointer-events-none"
            aria-hidden="true"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            Hey! ✨
          </span>
        )}
        {/* 花朵 emoji 作为心 */}
        <span className="text-xl">🌼</span>
        {/* 旁边小红点 */}
        {!showBubble && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-400 border-2 border-mint-50 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
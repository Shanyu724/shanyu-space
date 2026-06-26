"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteIcon, type SiteIconName } from "@/components/SiteIcon";

const QUICK_LINKS: { href: string; label: string; icon: SiteIconName }[] = [
  { href: "/blog", label: "博客", icon: "feather" },
  { href: "/portfolio", label: "作品集", icon: "layers" },
  { href: "/workshop", label: "工具坊", icon: "hammer" },
  { href: "/about", label: "关于我", icon: "leaf" },
  { href: "/behind", label: "幕后", icon: "compass" },
  { href: "/releases", label: "更新日志", icon: "clipboard" },
];

/**
 * 右侧贴边面板：xl 屏（≥1280px）才显示。
 * 默认贴在屏幕右沿只露一条小标签，hover 时整个面板滑出。
 * 参考站同款结构（rounded-l-xl + border-r-0 贴边设计）。
 */
export function SideQuickPanel() {
  const [open, setOpen] = useState(false);

  return (
    <aside
      className="hidden xl:block fixed top-1/2 right-0 z-30 -translate-y-1/2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="relative flex items-stretch">
        {/* 贴边小标签（始终可见） */}
        <button
          type="button"
          aria-label="快捷导航"
          className="relative z-10 px-1.5 py-4 bg-cream-50/90 backdrop-blur-sm rounded-l-lg border border-r-0 border-mint-900/12 shadow-md flex flex-col items-center gap-1.5 text-mint-700 hover:text-rose-500 transition-colors cursor-pointer"
        >
          <SiteIcon name="clipboard" className="h-4 w-4" />
          <span className="text-[10px] font-medium tracking-wide [writing-mode:vertical-rl] [text-orientation:mixed]">
            quick nav
          </span>
        </button>

        {/* 弹出主面板（hover 时滑入） */}
        <div
          className={`absolute top-0 right-full pointer-events-${open ? "auto" : "none"} transition-all duration-300 ${
            open ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
          }`}
        >
          <div className="bg-cream-50/96 backdrop-blur-sm rounded-l-lg shadow-[0_20px_48px_-30px_rgba(24,53,39,0.7)] border border-r-0 border-mint-900/12 p-4 min-w-[200px]">
            <div className="text-xs uppercase tracking-[0.22em] text-mint-600 mb-3 flex items-center gap-2">
              <SiteIcon name="pin" className="h-3.5 w-3.5" />
              <span>quick links</span>
            </div>
            <nav className="flex flex-col gap-0.5">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-mint-800 hover:bg-mint-50 hover:text-rose-500 transition-colors"
                >
                  <SiteIcon name={l.icon} className="h-4 w-4" />
                  <span>{l.label}</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-rose-400">
                    →
                  </span>
                </Link>
              ))}
            </nav>
            <p className="mt-3 pt-3 border-t border-mint-900/10 text-[10px] uppercase tracking-[0.18em] text-mint-500 text-center">
              hover me · explore
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

import Image from "next/image";
import { type CSSProperties, type ReactNode } from "react";

interface NotebookCardProps {
  children: ReactNode;
  className?: string;
  /** 顶部色条颜色 */
  accentColor?: string;
  /** 是否显示胶带装饰（与 paperclip 互斥） */
  tape?: boolean | "top" | "corner";
  /** 是否在左上角显示回形针（与 tape 互斥，参考站 Polaroid 风格） */
  paperclip?: boolean;
  /** 是否带打孔（手账感） */
  punched?: boolean;
  /** 整体倾斜角度 */
  rotate?: number;
  /** hover 时是否抬起 */
  hoverable?: boolean;
  /** 自定义 style（覆盖默认） */
  style?: CSSProperties;
}

/**
 * 手账风格卡片：替代纯白卡片，叠加纸张纹理、内阴影、顶部色条和胶带
 * 颜色全部走 CSS 变量或 Tailwind theme token，暗色模式下自动跟随。
 *
 * Polaroid 模式（paperclip=true）：左上角加回形针，去掉顶部胶带，整体感更像
 * 参考站 Wonderland 的"贴纸卡"视觉。
 */
export function NotebookCard({
  children,
  className = "",
  accentColor,
  tape = false,
  paperclip = false,
  punched = false,
  rotate = 0,
  hoverable = true,
  style,
}: NotebookCardProps) {
  // paperclip 与 tape 互斥：paperclip 优先
  const showTape = tape && !paperclip;
  const showPaperclip = paperclip;

  // 统一走 CSS 变量让 hover/responsive transform 不会跟内联 style 打架
  const baseStyle: CSSProperties = {
    ...(rotate ? ({ "--card-rotate": `${rotate}deg` } as CSSProperties) : {}),
    ...style,
  };

  return (
    <div
      className={`relative bg-cream-50/88 backdrop-blur-sm border border-mint-900/10 rounded-xl transition-all duration-300 overflow-hidden ${
        hoverable
          ? "hover:bg-cream-50 hover:border-mint-900/20 hover:shadow-[0_18px_38px_-28px_rgba(24,53,39,0.42)] hover:-translate-y-0.5"
          : ""
      } ${rotate ? "rotate-[var(--card-rotate)]" : ""} ${className}`}
      style={baseStyle}
    >
      {/* 顶部色条 */}
      {accentColor && (
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
          style={{
            backgroundColor: accentColor,
            boxShadow: `1px 0 0 ${accentColor}33`,
          }}
        />
      )}

      {/* 顶部胶带（仅当 paperclip 未启用时显示） */}
      {showTape && (
        <div
          className="absolute -top-2 left-1/2 w-14 h-3 rounded-sm pointer-events-none"
          style={{
            background: "linear-gradient(135deg, var(--tape-bg-from) 0%, var(--tape-bg-to) 100%)",
            transform: "translateX(-50%) rotate(-3deg)",
            boxShadow: "0 1px 2px var(--tape-shadow)",
          }}
        />
      )}

      {/* 角落折角（tape="corner" 子变体） */}
      {tape === "corner" && (
        <div
          className="absolute top-0 right-0 w-5 h-5 pointer-events-none"
          style={{
            background: "linear-gradient(225deg, transparent 50%, var(--tape-bg-to) 50%)",
          }}
        />
      )}

      {/* 回形针（Polaroid 模式） */}
      {showPaperclip && (
        <div
          className="absolute -top-4 -left-3 w-9 h-[52px] pointer-events-none z-20"
          style={{
            transform: "rotate(-12deg)",
            filter: "drop-shadow(0 1px 1px var(--paperclip-shadow))",
            color: "var(--paperclip-stroke)",
          }}
          aria-hidden="true"
        >
          <Image
            src="/images/paperclip.svg"
            alt=""
            width={36}
            height={52}
            className="w-full h-full"
            style={{ color: "var(--paperclip-fill)" }}
          />
        </div>
      )}

      {/* 打孔（左侧） */}
      {punched && (
        <div className="absolute top-0 left-3 w-1.5 h-1.5 rounded-full bg-cream-100 border border-cream-300" />
      )}

      {/* 微妙内阴影，制造纸张立体感 */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.56), inset 0 -1px 1px rgba(24,53,39,0.05)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-12 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.24), transparent)",
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}

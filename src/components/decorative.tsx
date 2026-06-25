/**
 * 升级版 WavyDivider：
 * 一条更舒展的连续波浪 + 中央菱形点缀，色相跟随 currentColor。
 * 用法：<SectionDivider /> 包裹在两个 section 之间。
 */
export function WavyDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-10 opacity-30 select-none">
      <svg
        width="60"
        height="12"
        viewBox="0 0 60 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-mist-300"
      >
        <path
          d="M0 6C10 0 20 12 30 6C40 0 50 12 60 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-mist-300 text-xs">·</span>
      <svg
        width="60"
        height="12"
        viewBox="0 0 60 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-mist-300"
      >
        <path
          d="M0 6C10 0 20 12 30 6C40 0 50 12 60 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * SectionDivider —— 升级版装饰分隔（受 Floria-Wonderland 启发）：
 * 两侧断续手绘波浪 + 中央手绘四瓣小花 + 端点小圆点，更随性。
 * 适用于「分类」与「最新文章」之间这类中等过渡。
 */
export function SectionDivider() {
  return (
    <div
      className="section-divider"
      role="separator"
      aria-orientation="horizontal"
    >
      {/* 左端点小圆点 */}
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "currentColor", opacity: 0.6 }}
      />
      <svg
        className="wave"
        viewBox="0 0 180 14"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 7 Q 10 1 18 7 T 34 7 T 50 7 T 66 7 T 82 7 T 98 7 T 114 7 T 130 7 T 146 7 T 162 7 T 178 7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeDasharray="4 3"
          fill="none"
        />
      </svg>

      {/* 中央手绘四瓣小花点缀（替代菱形） */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ color: "var(--deco-rose)" }}
      >
        <ellipse cx="9" cy="3.5" rx="2.2" ry="2.8" fill="currentColor" opacity="0.65" />
        <ellipse cx="14.5" cy="9" rx="2.8" ry="2.2" fill="currentColor" opacity="0.65" />
        <ellipse cx="9" cy="14.5" rx="2.2" ry="2.8" fill="currentColor" opacity="0.65" />
        <ellipse cx="3.5" cy="9" rx="2.8" ry="2.2" fill="currentColor" opacity="0.65" />
        <circle cx="9" cy="9" r="1.6" fill="var(--deco-warm)" />
      </svg>

      <svg
        className="wave"
        viewBox="0 0 180 14"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 7 Q 10 1 18 7 T 34 7 T 50 7 T 66 7 T 82 7 T 98 7 T 114 7 T 130 7 T 146 7 T 162 7 T 178 7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeDasharray="4 3"
          fill="none"
        />
      </svg>
      {/* 右端点小圆点 */}
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "currentColor", opacity: 0.6 }}
      />
    </div>
  );
}

/**
 * DotRow —— 三颗极淡圆点连缀，最轻量的一种段落分隔。
 */
export function DotRow() {
  return (
    <div className="dot-row" role="separator" aria-orientation="horizontal">
      <span />
      <span />
      <span />
    </div>
  );
}

export function Tape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 opacity-30 rounded-sm ${className}`}
      style={{
        background:
          "linear-gradient(135deg, var(--tape-bg-from) 0%, var(--tape-bg-to) 100%)",
        transform: "translateX(-50%) rotate(-2deg)",
        boxShadow: "0 1px 2px var(--tape-shadow)",
      }}
    />
  );
}
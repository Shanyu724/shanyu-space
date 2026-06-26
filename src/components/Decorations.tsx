/**
 * 全局角落装饰：从卡通贴纸改成编辑册式的页码、刻度和小印章。
 * 只承担氛围，不抢正文层级。
 */
export function Decorations() {
  return (
    <>
      <div className="fixed bottom-5 left-3 sm:left-5 pointer-events-none z-0 select-none text-mint-900/38">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mint-900/22 bg-cream-50/55 font-serif text-sm">
            N
          </span>
          <span className="hidden sm:block h-px w-16 bg-mint-900/18" />
        </div>
      </div>

      <div className="fixed top-24 right-3 sm:right-5 pointer-events-none z-0 hidden sm:block select-none">
        <div className="h-28 border-r border-mint-900/16 pr-2 text-[10px] uppercase tracking-[0.24em] text-mint-900/35 [writing-mode:vertical-rl]">
          shanyu notes
        </div>
      </div>

      <div className="fixed bottom-8 right-6 pointer-events-none z-0 hidden sm:block select-none text-rose-500/35">
        <svg
          width="42"
          height="42"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="0.9" />
          <path d="M11 21H29" stroke="currentColor" strokeWidth="0.9" />
          <path d="M20 11V29" stroke="currentColor" strokeWidth="0.9" />
          <path
            d="M20 6C20 6 12 18 12 24C12 28.4183 15.5817 32 20 32C24.4183 32 28 28.4183 28 24C28 18 20 6 20 6Z"
            fill="currentColor"
            opacity="0.14"
          />
        </svg>
      </div>
    </>
  );
}

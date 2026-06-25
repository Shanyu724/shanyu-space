import Image from "next/image";

/**
 * 角落装饰：受 Floria-Wonderland 启发的吉祥物元素。
 * - 左下：卡通小兔（呼应参考站）
 * - 右上：卡通小花
 * - 右下：玫瑰色雨滴（保留山雨主题的细节点缀）
 * 全部加 mascot-float 动画，给角落添一点呼吸感。
 */
export function Decorations() {
  return (
    <>
      {/* 左下角：兔子吉祥物 */}
      <div className="fixed bottom-4 left-2 sm:left-4 pointer-events-none z-0 opacity-70 select-none mascot-float">
        <div className="relative w-16 h-18 sm:w-[72px] sm:h-20">
          <Image
            src="/images/mascot-bunny.svg"
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* 右上角：花朵吉祥物 */}
      <div className="fixed top-20 right-2 sm:right-4 pointer-events-none z-0 opacity-65 select-none mascot-float" style={{ animationDelay: "1.2s" }}>
        <div className="relative w-12 h-14 sm:w-14 sm:h-16">
          <Image
            src="/images/mascot-flower.svg"
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* 右下角：雨滴装饰（保留山雨主题，体积小不抢戏） */}
      <div className="fixed bottom-8 right-6 pointer-events-none z-0 opacity-30 select-none text-rose-400">
        <svg
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6C20 6 12 18 12 24C12 28.4183 15.5817 32 20 32C24.4183 32 28 28.4183 28 24C28 18 20 6 20 6Z"
            fill="currentColor"
            opacity="0.6"
          />
          <circle cx="20" cy="33" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>
    </>
  );
}

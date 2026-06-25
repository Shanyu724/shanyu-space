interface SkeletonProps {
  className?: string;
  /** 一行骨架，多个用 \n 分隔 */
  lines?: number;
  /** 是否显示圆形（头像） */
  circle?: boolean;
}

export function Skeleton({ className = "", lines = 1, circle = false }: SkeletonProps) {
  if (circle) {
    return (
      <div
        className={`bg-gradient-to-r from-cream-100 via-cream-200 to-cream-100 bg-[length:200%_100%] animate-shimmer rounded-full ${className}`}
      />
    );
  }

  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r from-cream-100 via-cream-200 to-cream-100 bg-[length:200%_100%] animate-shimmer rounded ${
              i === lines - 1 ? "w-2/3" : "w-full"
            } h-3`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-r from-cream-100 via-cream-200 to-cream-100 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
    />
  );
}
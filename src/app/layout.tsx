import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Decorations } from "@/components/Decorations";
import { FloatingHey } from "@/components/FloatingHey";
import { AIChatPanel } from "@/components/AIChatPanel";
import { RouteTransition } from "@/components/RouteTransition";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SideQuickPanel } from "@/components/SideQuickPanel";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_AUTHOR } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | 山雨",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Amatic+SC:wght@400;700&family=Delius&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-mint-100 min-h-screen">
        {/* 半透明覆盖层（参考站结构性元素） */}
        <div className="fixed inset-0 -z-10 bg-white/10 overflow-hidden pointer-events-none" />
        {/* 全局圆点底纹（受 Floria 启发，与 paper noise 分层共存） */}
        <div className="dot-bg" aria-hidden="true" />
        {/* 外圈装饰 */}
        <Decorations />
        {/* 顶部固定导航 */}
        <Header />

        {/* 主浮卡：固定一屏，内部独立滚动 */}
        <main className="main-background overflow-hidden mx-auto h-dvh p-4 sm:p-16 pt-[64px] sm:pt-[88px] print:h-auto print:overflow-visible print:p-0">
          <div
            className="h-full overflow-auto print:h-auto print:overflow-visible rounded-2xl bg-white/60 backdrop-blur-sm border border-mint-100/60 shadow-sm"
            id="main-scroll"
          >
            <RouteTransition>{children}</RouteTransition>
          </div>
        </main>

        {/* 右下角：AI 浮窗（浮在 Hey 浮窗左边，避免遮挡） */}
        <div className="fixed bottom-6 right-20 z-40 print:hidden">
          <AIChatPanel variant="floating" />
        </div>
        {/* 右下角：Hey 浮窗 */}
        <FloatingHey />
        {/* 右下角回顶 */}
        <ScrollToTop />
        {/* 右侧贴边快捷面板（xl 屏） */}
        <SideQuickPanel />

        {/* 极小角标版权（参考站「fixed bottom-2 left-2 print:hidden」位置） */}
        <p className="fixed bottom-2 left-2 z-30 text-[10px] text-mint-600/70 select-none print:hidden">
          © {new Date().getFullYear()} 山雨
        </p>
      </body>
    </html>
  );
}

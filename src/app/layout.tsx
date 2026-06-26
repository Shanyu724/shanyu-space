import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Decorations } from "@/components/Decorations";
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
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Marcellus&display=swap"
          rel="stylesheet"
        />
        {/* Theme init：首屏渲染前同步执行，避免 light → dark 闪烁。
            读 localStorage 决定显式偏好；未显式设置时跟随系统。 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s==='dark'||(s===null&&p);if(d)document.documentElement.classList.add('dark');if(s==='light')document.documentElement.classList.add('light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-mint-100 min-h-screen">
        {/* 页面光感覆盖层 */}
        <div className="fixed inset-0 -z-10 bg-cream-50/20 overflow-hidden pointer-events-none" />
        {/* 全局圆点底纹（受 Floria 启发，与 paper noise 分层共存） */}
        <div className="dot-bg" aria-hidden="true" />
        {/* 外圈装饰 */}
        <Decorations />
        {/* 顶部固定导航 */}
        <Header />

        {/* 主浮卡：固定一屏，内部独立滚动 */}
        <main className="main-background overflow-hidden mx-auto h-dvh p-3 sm:p-10 lg:p-14 pt-[64px] sm:pt-[92px] print:h-auto print:overflow-visible print:p-0">
          <div
            className="h-full overflow-auto print:h-auto print:overflow-visible rounded-[1.15rem] bg-cream-50/82 backdrop-blur-md border border-mint-900/15 shadow-[0_28px_80px_-48px_rgba(24,53,39,0.65)]"
            id="main-scroll"
          >
            <RouteTransition>{children}</RouteTransition>
          </div>
        </main>

        {/* 右下角：AI 浮窗（自身 fixed 定位） */}
        <div className="print:hidden">
          <AIChatPanel variant="floating" />
        </div>
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

import type { Metadata } from "next";
import "katex/dist/katex.min.css";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s==='dark'||(s===null&&p);if(d)document.documentElement.classList.add('dark');if(s==='light')document.documentElement.classList.add('light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-mint-100">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream-50/20" />
        <div className="dot-bg" aria-hidden="true" />
        <Decorations />
        <Header />

        <main className="main-background mx-auto h-dvh overflow-hidden px-3 pt-[64px] sm:p-10 sm:pt-[92px] lg:p-14 print:h-auto print:overflow-visible print:p-0">
          <div
            className="h-full overflow-auto rounded-[1.15rem] border border-mint-900/15 bg-cream-50/82 shadow-[0_28px_80px_-48px_rgba(24,53,39,0.65)] backdrop-blur-md print:h-auto print:overflow-visible"
            id="main-scroll"
          >
            <RouteTransition>{children}</RouteTransition>
          </div>
        </main>

        <div className="print:hidden">
          <AIChatPanel variant="floating" />
        </div>
        <ScrollToTop />
        <SideQuickPanel />

        <p className="fixed bottom-2 left-2 z-30 select-none text-[10px] text-mint-600/70 print:hidden">
          © {new Date().getFullYear()} 山雨
        </p>
      </body>
    </html>
  );
}

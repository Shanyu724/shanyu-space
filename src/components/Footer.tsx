import { SiteIcon } from "@/components/SiteIcon";

export default function Footer() {
  return (
    <footer className="border-t border-mint-100/70 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-mint-700">
        <p className="flex items-center gap-2">
          <SiteIcon name="leaf" className="h-4 w-4 text-sage-500" />
          <span>© {new Date().getFullYear()} 山雨·个人站</span>
        </p>
        <p className="flex items-center gap-1.5 text-mint-600">
          <span style={{ fontFamily: "var(--font-handwriting)" }} className="text-base">
            crafted with
          </span>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-mint-500 hover:text-rose-400 transition-colors"
          >
            Next.js
          </a>
          <span className="text-mint-300">·</span>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-mint-500 hover:text-rose-400 transition-colors"
          >
            Vercel
          </a>
        </p>
      </div>
    </footer>
  );
}

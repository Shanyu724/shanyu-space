"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  icon?: string;
  description?: string;
  children?: NavLink[];
}

const navItems: NavItem[] = [
  { href: "/blog", label: "Blog", icon: "/images/icon-blog.svg", description: "随便写的" },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: "/images/icon-portfolio.svg",
    description: "AI 辅助开发的项目作品集",
  },
  {
    href: "/workshop",
    label: "Workshop",
    icon: "/images/icon-behind.svg",
    description: "AI 小工具",
  },
  { href: "/chat", label: "AI", icon: "/images/icon-portfolio.svg", description: "小花 — AI 助手" },
  {
    href: "/about",
    label: "About",
    icon: "/images/icon-me.svg",
    children: [
      { href: "/about", label: "Me" },
      { href: "/behind", label: "Behind" },
      { href: "/releases", label: "Releases" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-cream-50/80 backdrop-blur-xl border-b border-mint-900/10 shadow-[0_16px_45px_-34px_rgba(24,53,39,0.5)] animate-navbarDrop">
      <div className="container max-w-[26rem] md:max-w-none flex flex-row py-3 px-5 sm:px-10 items-center justify-between text-center">
        <Link
          href="/"
          className="flex items-center gap-2.5 whitespace-nowrap text-2xl font-extrabold text-mint-700 tracking-tight select-none hover:text-rose-500 transition-colors duration-200 group"
        >
          <span className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-mint-900/15 bg-mint-50/70 animate-gentle-spin group-hover:animate-gentle-spin-fast">
            <Logo />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-serif text-[1.15rem] tracking-[0.18em]">山雨</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.34em] text-mint-500">
              field notes
            </span>
          </span>
        </Link>

        <nav className="navigation-bar hidden md:flex whitespace-nowrap gap-2 sm:gap-4 md:gap-7 items-center">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const content = (
              <>
                {item.icon && (
                  <Image src={item.icon} alt="" width={20} height={20} className="inline-block" />
                )}
                <span>{item.label}</span>
              </>
            );

            if (item.children) {
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    title={item.description}
                    className={`nav-dashed text-[0.92rem] inline-flex items-center gap-1.5 ${active ? "is-active" : ""}`}
                  >
                    {content}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      className="transition-transform duration-200 group-hover:rotate-180 opacity-70"
                    >
                      <path
                        d="M2 4l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-cream-50/96 backdrop-blur rounded-lg border border-mint-900/10 shadow-[0_18px_50px_-28px_rgba(24,53,39,0.45)] py-2 min-w-[150px]">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(sub.href)
                              ? "text-rose-500 font-medium"
                              : "text-mint-800 hover:bg-mint-50 hover:text-rose-500"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.description}
                className={`nav-dashed text-[0.92rem] inline-flex items-center gap-1.5 ${active ? "is-active" : ""}`}
              >
                {content}
              </Link>
            );
          })}
          <ThemeToggle className="ml-1" />
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-mint-900/15 bg-cream-50/85 shadow-sm"
          aria-label="Toggle menu"
        >
          <span className="relative w-5 h-3.5 inline-block">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 bg-mint-800 transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-5 bg-mint-800 transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-5 bg-mint-800 transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-mint-900/10 bg-cream-50/96 backdrop-blur px-6 py-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-2 py-2 text-base ${
                  isActive(item.href)
                    ? "text-rose-500 font-medium border-b border-mint-800 w-fit"
                    : "text-mint-800 hover:text-rose-500"
                }`}
              >
                {item.icon && <Image src={item.icon} alt="" width={22} height={22} />}
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-2 py-2 text-base text-mint-800">
              <span>主题</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

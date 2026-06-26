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
  { href: "/blog", label: "Blog", icon: "/images/icon-blog.svg", description: "博客与长文阅读" },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: "/images/icon-portfolio.svg",
    description: "作品与项目陈列",
  },
  {
    href: "/workshop",
    label: "Workshop",
    icon: "/images/icon-behind.svg",
    description: "仍在生长的小工具",
  },
  { href: "/chat", label: "AI", icon: "/images/icon-portfolio.svg", description: "AI 助手" },
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
    <header className="fixed top-0 left-0 z-50 w-full border-b border-mint-900/10 bg-cream-50/80 backdrop-blur-xl shadow-[0_16px_45px_-34px_rgba(24,53,39,0.5)] animate-navbarDrop">
      <div className="mx-auto flex w-full max-w-[26rem] flex-row items-center justify-between px-4 py-3 text-center sm:px-6 md:max-w-none md:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 whitespace-nowrap text-2xl font-extrabold tracking-tight text-mint-700 transition-colors duration-200 select-none hover:text-rose-500 group"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-mint-900/15 bg-mint-50/70 animate-gentle-spin group-hover:animate-gentle-spin-fast">
            <Logo />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="font-serif text-[1.15rem] tracking-[0.18em]">山雨</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.34em] text-mint-500">
              field notes
            </span>
          </span>
        </Link>

        <nav className="navigation-bar hidden items-center gap-2 whitespace-nowrap sm:gap-4 md:flex md:gap-7">
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
                    className={`nav-dashed inline-flex items-center gap-1.5 text-[0.92rem] ${active ? "is-active" : ""}`}
                  >
                    {content}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      className="opacity-70 transition-transform duration-200 group-hover:rotate-180"
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
                  <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[150px] rounded-lg border border-mint-900/10 bg-cream-50/96 py-2 backdrop-blur shadow-[0_18px_50px_-28px_rgba(24,53,39,0.45)]">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(sub.href)
                              ? "font-medium text-rose-500"
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
                className={`nav-dashed inline-flex items-center gap-1.5 text-[0.92rem] ${active ? "is-active" : ""}`}
              >
                {content}
              </Link>
            );
          })}
          <ThemeToggle className="ml-1" />
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-mint-900/15 bg-cream-50/85 shadow-sm md:hidden"
          aria-label="Toggle menu"
        >
          <span className="relative inline-block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-[2px] w-5 bg-mint-800 transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-mint-800 transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-5 bg-mint-800 transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-mint-900/10 bg-cream-50/96 px-6 py-3 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-2 py-2 text-base ${
                  isActive(item.href)
                    ? "w-fit border-b border-mint-800 font-medium text-rose-500"
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

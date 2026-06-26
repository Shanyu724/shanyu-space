"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Me } from "@/lib/me";

interface HomeClientProps {
  me: Me;
}

const ENTRIES: { href: string; icon: string; label: string; sub: string }[] = [
  { href: "/blog", icon: "/images/icon-blog.svg", label: "Blog", sub: "六卷目录与长文阅读" },
  { href: "/portfolio", icon: "/images/icon-portfolio.svg", label: "Portfolio", sub: "作品、推演与已完成的项目" },
  { href: "/workshop", icon: "/images/icon-behind.svg", label: "Workshop", sub: "一些仍在生长的小工具" },
  { href: "/about", icon: "/images/icon-me.svg", label: "About", sub: "关于我，以及这座站的来处" },
];

export function HomeClient({ me }: HomeClientProps) {
  return (
    <section className="relative flex min-h-[calc(100dvh-148px)] w-full items-center px-4 py-6 md:px-6 md:py-8">
      <div className="relative z-10 mx-auto w-full max-w-[92rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="home-hero-shell relative overflow-hidden rounded-[1.35rem] border border-mint-900/10 bg-[#122018]"
        >
          <Image
            src="/images/home-poster.jpeg"
            alt="静谧庭院海报"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,16,0.92)_0%,rgba(12,24,18,0.78)_30%,rgba(14,24,20,0.44)_58%,rgba(12,18,16,0.16)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,235,0.05),rgba(8,18,14,0.44)_82%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />

          <div className="relative z-10 flex min-h-[44rem] flex-col justify-end px-5 py-6 sm:px-7 md:min-h-[46rem] md:px-10 md:py-9 xl:px-12">
            <div className="max-w-[42rem]">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-cream-100/70">
                <span>Shanyu Space</span>
                <span className="h-px w-10 bg-cream-100/30" />
                <span>Field Notes</span>
              </div>

              <div className="mt-8 max-w-[36rem]">
                <p className="text-[11px] uppercase tracking-[0.34em] text-cream-100/55">
                  A quieter notebook for study, finance, modeling, and the scattered weather of thought.
                </p>
              </div>

              <div className="mt-8">
                <h1 className="font-serif text-[clamp(3.7rem,8vw,7.8rem)] leading-[0.84] text-cream-50">
                  山雨
                </h1>
                <p className="mt-3 max-w-[15rem] text-[12px] uppercase tracking-[0.26em] text-warm-100/72">
                  静园手记 / 卷一
                </p>
              </div>

              <div className="mt-10 max-w-[34rem]">
                <p className="text-[1.04rem] leading-8 text-cream-100 md:text-[1.14rem]">
                  {me.signature}
                </p>
                <p className="mt-4 text-sm leading-7 text-cream-100/72 md:text-[15px]">
                  {me.about.whatIDo}
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-cream-100/58">
                <span>Selected Rooms</span>
                <span className="h-px w-14 bg-cream-100/20" />
              </div>
              <nav
                aria-label="Main sections"
                className="grid max-w-[40rem] grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {ENTRIES.map((entry, index) => (
                  <motion.div
                    key={entry.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.16 + index * 0.06 }}
                  >
                    <Link
                      href={entry.href}
                      className="group flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3.5 transition-all hover:border-white/24 hover:bg-white/[0.1]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.08]">
                          <Image src={entry.icon} alt="" width={22} height={22} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-serif text-xl text-cream-50 transition-colors group-hover:text-warm-100">
                            {entry.label}
                          </span>
                          <span className="mt-1 block text-xs leading-6 text-cream-100/62">
                            {entry.sub}
                          </span>
                        </span>
                      </span>
                      <span className="text-xl text-cream-100/44 transition-colors group-hover:text-warm-100">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

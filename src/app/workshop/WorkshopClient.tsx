"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import type { Tool } from "@/lib/content";

interface WorkshopClientProps {
  tools: Tool[];
}

const STATUS_STYLE: Record<Tool["status"], { label: string; title: string; subtitle: string }> = {
  live: { label: "上线", title: "正在使用", subtitle: "in use" },
  alpha: { label: "内测", title: "半成品玩具", subtitle: "alpha toys" },
  wip: { label: "在做", title: "施工中", subtitle: "work in progress" },
};

const KIND_HINT: Record<Tool["kind"], { emoji: string; label: string }> = {
  external: { emoji: "↗", label: "外站打开" },
  embedded: { emoji: "▣", label: "内嵌使用" },
  "in-site": { emoji: "·", label: "站内页面" },
};

export function WorkshopClient({ tools }: WorkshopClientProps) {
  const statuses = Array.from(new Set(tools.map((tool) => tool.status)));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <FadeIn>
        <section className="relative min-h-[330px] flex flex-col items-center justify-center text-center overflow-hidden rounded-3xl bg-white/70 border border-mint-100/70 backdrop-blur-sm mb-14 px-6">
          <div className="absolute inset-0 opacity-[0.35] pointer-events-none bg-[radial-gradient(circle_at_18%_20%,rgba(190,139,139,0.20),transparent_30%),radial-gradient(circle_at_82%_76%,rgba(122,148,130,0.24),transparent_36%)]" />
          <span className="relative z-10 text-xs tracking-[0.35em] text-rose-400 mb-3">小工具</span>
          <h1 className="relative z-10 text-5xl md:text-7xl font-serif font-bold text-mint-800 tracking-tight">
            AI 工具坊
          </h1>
          <p className="relative z-10 mt-4 text-mint-600 text-sm md:text-base">
            tiny tools, real use
          </p>
          <p className="relative z-10 mt-6 text-sm md:text-base text-mint-700 leading-relaxed max-w-xl">
            不追求“像产品发布会”，只放那些我真的会打开用的小东西。
            Claude 帮我加速，我负责判断它值不值得留下。
          </p>
          <a
            href="#tools"
            className="relative z-10 mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-mint-200 bg-white/70 text-mint-700 hover:text-rose-500 hover:border-rose-300 transition-colors text-sm"
          >
            查看工具
            <span>↓</span>
          </a>
        </section>
      </FadeIn>

      <div id="tools" className="space-y-16">
        {tools.length === 0 ? (
          <EmptyState />
        ) : (
          statuses.map((status) => {
            const list = tools.filter((t) => t.status === status);
            return (
              <section key={status}>
                <SectionHeader
                  title={STATUS_STYLE[status].title}
                  subtitle={STATUS_STYLE[status].subtitle}
                />
                <StaggerContainer staggerDelay={0.08}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {list.map((tool, index) => (
                      <StaggerItem key={tool.id}>
                        <ToolShowCard tool={tool} index={index} />
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              </section>
            );
          })
        )}
      </div>

      <FadeIn delay={0.3}>
        <div className="mt-16 mb-8 text-center">
          <p
            className="text-xl md:text-2xl text-rose-400/80"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            more tools brewing...
          </p>
          <p className="mt-2 text-xs text-mint-500 italic">
            想到什么解一下手头麻烦的小东西，就会顺手做一个放上来。
          </p>
        </div>
      </FadeIn>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-mint-800">
          ✏ {title}
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-mint-400">
          {subtitle}
        </p>
      </div>
      <span className="hidden sm:block flex-1 border-t border-dashed border-mint-200/80 translate-y-[-0.7rem]" />
    </div>
  );
}

function ToolShowCard({ tool, index }: { tool: Tool; index: number }) {
  const rotate = index % 2 === 0 ? "md:rotate-[-1deg]" : "md:rotate-[1deg]";
  return (
    <motion.article
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative rounded-3xl bg-white/78 border border-mint-100/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-xl hover:shadow-rose-200/20 hover:border-rose-300 transition-all ${rotate}`}
    >
      <div className="relative h-48 overflow-hidden bg-mint-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(190,139,139,0.36),transparent_30%),radial-gradient(circle_at_78%_72%,rgba(122,148,130,0.35),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.85),rgba(232,237,233,0.45))]" />
        <div className="absolute inset-5 rounded-2xl border border-white/70 bg-white/35 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl drop-shadow-sm select-none">{tool.emoji || "🛠️"}</span>
        </div>
        <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.24em] px-2 py-1 rounded-full bg-white/80 text-mint-600 border border-white/70">
          {STATUS_STYLE[tool.status].label}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-2xl select-none">{tool.emoji || "🛠️"}</span>
          <div>
            <h3 className="text-2xl font-serif font-bold text-mint-800 group-hover:text-rose-500 transition-colors leading-tight">
              {tool.url ? (
                <a
                  href={tool.url}
                  target={tool.kind === "external" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  {tool.name}
                </a>
              ) : (
                tool.name
              )}
            </h3>
            <p className="text-sm text-rose-500 mt-1">
              {KIND_HINT[tool.kind].emoji} {KIND_HINT[tool.kind].label} · {tool.createdAt}
            </p>
          </div>
        </div>

        <p className="text-sm text-mint-700 leading-relaxed mb-4">
          {tool.description}
        </p>

        {tool.highlights[0] && (
          <blockquote className="mb-4 border-l-2 border-rose-300 pl-3 text-sm text-mint-600 italic leading-relaxed">
            “{tool.highlights[0]}”
          </blockquote>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tool.tech.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-mint-50 border border-mint-100 text-mint-600">
                {tech}
              </span>
            ))}
            {tool.tech.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-500">
                +{tool.tech.length - 3}
              </span>
            )}
          </div>
          {tool.url && (
            <a
              href={tool.url}
              target={tool.kind === "external" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-sm text-mint-600 hover:text-rose-500 transition-colors whitespace-nowrap"
            >
              Open ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function EmptyState() {
  return (
    <div className="relative mx-auto max-w-xl p-8 md:p-10 rounded-3xl bg-white/70 backdrop-blur-sm border border-mint-100/70 text-center">
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-4 rounded-sm rotate-[-3deg] opacity-60"
        style={{
          background:
            "linear-gradient(135deg, rgba(241,233,233,0.95) 0%, rgba(210,176,176,0.55) 100%)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      />
      <span className="inline-block text-5xl mb-4 select-none">🛠️</span>
      <h3
        className="text-3xl md:text-4xl text-mint-700 mb-2"
        style={{ fontFamily: "var(--font-handwriting)" }}
      >
        empty workbench
      </h3>
      <p className="text-sm text-mint-600 leading-relaxed">
        这里还空着——但桌子已经擦干净了。第一个小工具正在路上。
      </p>
    </div>
  );
}

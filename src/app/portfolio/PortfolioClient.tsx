"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { MouseScrollHint } from "@/components/MouseScrollHint";
import { SiteIcon } from "@/components/SiteIcon";
import type { Project } from "@/lib/content";

interface PortfolioClientProps {
  projects: Project[];
}

const statusLabels: Record<string, string> = {
  "in-production": "落地生花",
  "case-study": "纸上造物",
  "product-lab": "灵感实验",
};

const statusSubtitles: Record<string, string> = {
  "in-production": "in production",
  "case-study": "case study",
  "product-lab": "product lab",
};

const statusOrder = ["case-study", "in-production", "product-lab"];

export function PortfolioClient({ projects }: PortfolioClientProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* Hero：参考站 Portfolio 的"共创 / AI 作品集"开场 → 升级为 Polaroid 风格卡 */}
      <FadeIn>
        <section className="relative min-h-[360px] flex flex-col items-center justify-center text-center overflow-visible card-polaroid mb-20 px-6 py-12">
          {/* 回形针（左上） */}
          <div
            aria-hidden="true"
            className="absolute -top-4 -left-3 w-9 h-[52px] pointer-events-none z-20"
            style={{
              transform: "rotate(-12deg)",
              filter: "drop-shadow(0 1px 1px var(--paperclip-shadow))",
              color: "var(--paperclip-stroke)",
            }}
          >
            <svg
              width="36"
              height="52"
              viewBox="0 0 36 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "var(--paperclip-fill)" }}
            >
              <path
                d="M22 6 C22 4 20.5 2.5 18 2.5 L10 2.5 C7.5 2.5 6 4 6 6 L6 42 C6 47 9.5 50 14 50 L20 50 C24.5 50 28 47 28 42 L28 14 C28 12 26.5 10.5 24.5 10.5 C22.5 10.5 21 12 21 14 L21 38 C21 39 20 40 19 40 C18 40 17 39 17 38 L17 10"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.85"
              />
            </svg>
          </div>

          {/* 顶部胶带 */}
          <div
            aria-hidden="true"
            className="absolute -top-3 left-1/2 w-20 h-4 rounded-sm pointer-events-none z-10"
            style={{
              background: "linear-gradient(135deg, var(--tape-bg-from) 0%, var(--tape-bg-to) 100%)",
              transform: "translateX(-50%) rotate(-3deg)",
              boxShadow: "0 1px 2px var(--tape-shadow)",
            }}
          />

          <div className="absolute inset-0 opacity-[0.35] pointer-events-none rounded-[1.75rem] bg-[radial-gradient(circle_at_20%_20%,rgba(190,139,139,0.22),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(122,148,130,0.22),transparent_36%)]" />

          {/* 共创小标签（黄底贴纸感） */}
          <span
            className="relative z-10 inline-block text-xs tracking-[0.35em] text-rose-500 mb-3 px-2 py-0.5 rounded-sm -rotate-2"
            style={{ backgroundColor: "rgba(235,197,133,0.4)" }}
          >
            共创
          </span>
          <h1 className="relative z-10 text-5xl md:text-7xl font-serif font-bold text-mint-800 tracking-tight">
            AI 作品集
          </h1>
          <p className="relative z-10 mt-4 text-mint-600 text-sm md:text-base">
            与硅基灵魂共同创作
          </p>
          <p className="relative z-10 mt-6 text-sm md:text-base text-mint-700 leading-relaxed max-w-xl">
            <SiteIcon name="feather" className="inline h-3.5 w-3.5 text-rose-400" /> Claude
            写代码，Gemini 画草图， 我负责判断什么值得留下，然后上线
            <SiteIcon name="cloud" className="inline h-3.5 w-3.5 text-mint-400 align-baseline" />
          </p>

          <div className="relative z-10 mt-10">
            <MouseScrollHint label="向下探索" href="#projects" />
          </div>
        </section>
      </FadeIn>

      <div id="projects" className="space-y-16">
        {statusOrder.map((status) => {
          const list = projects.filter((p) => p.status === status);
          if (list.length === 0) return null;
          return (
            <section key={status}>
              <SectionHeader
                title={statusLabels[status] || status}
                subtitle={statusSubtitles[status] || status}
              />
              <StaggerContainer staggerDelay={0.08}>
                <div className="grid md:grid-cols-2 gap-6">
                  {list.map((project, index) => (
                    <StaggerItem key={project.id}>
                      <ProjectShowCard project={project} index={index} />
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-mint-800">
          <SiteIcon name="pencil" className="inline h-5 w-5 mr-1 text-mint-700 align-baseline" />
          {title}
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-mint-400">{subtitle}</p>
      </div>
      <span className="hidden sm:block flex-1 border-t border-dashed border-mint-200/80 translate-y-[-0.7rem]" />
    </div>
  );
}

function ProjectShowCard({ project, index }: { project: Project; index: number }) {
  const rotate = index % 2 === 0 ? "md:rotate-[-1deg]" : "md:rotate-[1deg]";
  return (
    <motion.article
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative rounded-3xl bg-white/78 border border-mint-100/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-xl hover:shadow-rose-200/20 hover:border-rose-300 transition-all ${rotate}`}
    >
      {/* 海报区：没有真实截图时用手账渐变 + emoji 做"项目封面" */}
      <div className="relative h-48 overflow-hidden bg-mint-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_25%,rgba(190,139,139,0.38),transparent_30%),radial-gradient(circle_at_78%_70%,rgba(122,148,130,0.35),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.8),rgba(232,237,233,0.45))]" />
        <div className="absolute inset-5 rounded-2xl border border-white/70 bg-white/35 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          {project.icon && (
            <SiteIcon
              name={project.icon}
              className="h-20 w-20 drop-shadow-sm select-none"
              style={{ color: "var(--color-rose-500)" }}
            />
          )}
        </div>
        <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.24em] px-2 py-1 rounded-full bg-white/80 text-mint-600 border border-white/70">
          {project.status.replace("-", " ")}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3 mb-2">
          {project.icon && (
            <SiteIcon name={project.icon} className="h-7 w-7 shrink-0 select-none text-sage-600" />
          )}
          <div>
            <h3 className="text-2xl font-serif font-bold text-mint-800 group-hover:text-rose-500 transition-colors leading-tight">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            {project.highlights[0] && (
              <p className="text-sm text-rose-500 mt-1">{project.highlights[0]}</p>
            )}
          </div>
        </div>

        <p className="text-sm text-mint-700 leading-relaxed mb-4">{project.description}</p>

        {project.highlights[1] && (
          <blockquote className="mb-4 border-l-2 border-rose-300 pl-3 text-sm text-mint-600 italic leading-relaxed">
            "{project.highlights[1]}"
          </blockquote>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-mint-50 border border-mint-100 text-mint-600"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-500">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-mint-600 hover:text-rose-500 transition-colors whitespace-nowrap"
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14">
      <FadeIn>
        <section className="relative mb-20 overflow-hidden rounded-[1.75rem] border border-mint-900/10 bg-[linear-gradient(135deg,rgba(252,251,247,0.98),rgba(243,238,228,0.88))] px-6 py-16 text-center shadow-[0_28px_70px_-48px_rgba(24,53,39,0.45)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.32] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, var(--gradient-rose-fade), transparent 32%), radial-gradient(circle at 80% 70%, var(--gradient-sage-fade), transparent 36%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.34em] text-earth-300">Selected Works</p>
            <h1 className="mt-5 font-serif text-[clamp(3.4rem,8vw,6.5rem)] leading-[0.88] text-mint-800">
              作品集
            </h1>
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
                <div className="grid gap-6 md:grid-cols-2">
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
        <h2 className="text-2xl font-serif font-bold text-mint-800 md:text-3xl">
          <SiteIcon name="pencil" className="mr-1 inline h-5 w-5 align-baseline text-mint-700" />
          {title}
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-mint-400">{subtitle}</p>
      </div>
      <span className="hidden flex-1 translate-y-[-0.7rem] border-t border-dashed border-mint-200/80 sm:block" />
    </div>
  );
}

function ProjectShowCard({ project, index }: { project: Project; index: number }) {
  const rotate = index % 2 === 0 ? "md:rotate-[-1deg]" : "md:rotate-[1deg]";
  return (
    <motion.article
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-mint-100/80 bg-white/78 shadow-sm backdrop-blur-sm transition-all hover:border-rose-300 hover:shadow-xl hover:shadow-rose-200/20 ${rotate}`}
    >
      <div className="relative h-48 overflow-hidden bg-mint-50">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 22% 25%, var(--gradient-rose-fade), transparent 30%), radial-gradient(circle at 78% 70%, var(--gradient-sage-fade), transparent 34%), linear-gradient(135deg, var(--gradient-card-from), var(--gradient-card-to))",
          }}
        />
        <div className="absolute inset-5 rounded-2xl border border-white/70 bg-white/35 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          {project.icon && (
            <SiteIcon
              name={project.icon}
              className="h-20 w-20 select-none drop-shadow-sm"
              style={{ color: "var(--color-rose-500)" }}
            />
          )}
        </div>
        <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-mint-600">
          {project.status.replace("-", " ")}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-start gap-3">
          {project.icon && (
            <SiteIcon name={project.icon} className="h-7 w-7 shrink-0 select-none text-sage-600" />
          )}
          <div>
            <h3 className="text-2xl font-serif font-bold leading-tight text-mint-800 transition-colors group-hover:text-rose-500">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            {project.highlights[0] && (
              <p className="mt-1 text-sm text-rose-500">{project.highlights[0]}</p>
            )}
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-mint-700">{project.description}</p>

        {project.highlights[1] && (
          <blockquote className="mb-4 border-l-2 border-rose-300 pl-3 text-sm leading-relaxed text-mint-600 italic">
            "{project.highlights[1]}"
          </blockquote>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-mint-100 bg-mint-50 px-2 py-0.5 text-xs text-mint-600"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="rounded-full border border-rose-100 bg-rose-50 px-2 py-0.5 text-xs text-rose-500">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-sm text-mint-600 transition-colors hover:text-rose-500"
            >
              Demo →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

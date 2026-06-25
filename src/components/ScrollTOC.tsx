"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ScrollTOCProps {
  items: TocItem[];
}

export function ScrollTOC({ items }: ScrollTOCProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const root = document.getElementById("main-scroll");
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { root, rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    const root = document.getElementById("main-scroll");
    if (el && root) {
      const top =
        el.getBoundingClientRect().top -
        root.getBoundingClientRect().top +
        root.scrollTop -
        80;
      root.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="hidden xl:block fixed top-32 right-8 w-48 z-20"
    >
      <div className="text-xs uppercase tracking-widest text-mint-500 mb-3 pl-3">
        目录
      </div>
      <nav className="border-l border-mint-200 pl-3 space-y-1.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`block text-xs leading-snug transition-all ${
              item.level === 3 ? "pl-3" : ""
            } ${
              active === item.id
                ? "text-rose-500 font-medium"
                : "text-mint-500 hover:text-rose-400"
            }`}
          >
            <span
              className={`inline-block transition-all ${
                active === item.id
                  ? "w-2 h-0.5 bg-rose-400 mr-2 align-middle"
                  : "w-0 mr-0"
              }`}
            />
            {item.text}
          </a>
        ))}
      </nav>
    </motion.aside>
  );
}

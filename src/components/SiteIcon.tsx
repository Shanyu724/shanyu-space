import type { SVGProps } from "react";

export type SiteIconName =
  | "ai"
  | "archive"
  | "arrow-up"
  | "assets"
  | "bell"
  | "blog"
  | "book"
  | "botany"
  | "building"
  | "briefcase"
  | "brush"
  | "chart"
  | "chat"
  | "check"
  | "clipboard"
  | "clock"
  | "cloud"
  | "code"
  | "compass"
  | "delete"
  | "document"
  | "door"
  | "draft"
  | "feather"
  | "file-tree"
  | "fire"
  | "flower"
  | "focus"
  | "globe"
  | "grid"
  | "hammer"
  | "image"
  | "layers"
  | "leaf"
  | "map-pin"
  | "palette"
  | "paperclip"
  | "pencil"
  | "photo"
  | "pin"
  | "pomodoro"
  | "quote"
  | "ruler"
  | "search"
  | "settings"
  | "spark"
  | "sprout"
  | "stairs"
  | "target"
  | "tea"
  | "trash"
  | "warning"
  | "wave";

const paths: Record<SiteIconName, SVGProps<SVGSVGElement>["children"]> = {
  ai: (
    <>
      <rect x="6" y="7" width="12" height="10" rx="4" />
      <path d="M9 7V5m6 2V5M8 17l-2 2m10-2 2 2M9.2 12h.1m5.5 0h.1M11 15h2" />
      <path d="M4 11H2m20 0h-2" />
    </>
  ),
  archive: (
    <>
      <path d="M5 7h14v12H5z" />
      <path d="M4 4h16v3H4zM9 11h6" />
    </>
  ),
  "arrow-up": <path d="M12 19V5m0 0-5 5m5-5 5 5" />,
  assets: (
    <>
      <path d="M4 18h16M6 18V9l6-4 6 4v9" />
      <path d="M9 18v-6h6v6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 17h12l-1.4-2.2V11a4.6 4.6 0 0 0-9.2 0v3.8L6 17Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  blog: (
    <>
      <path d="M6 5h9l3 3v11H6z" />
      <path d="M14 5v4h4M9 12h6M9 15h4" />
    </>
  ),
  book: (
    <>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5z" />
      <path d="M5 5.5v16M8 7h7M8 10h6" />
    </>
  ),
  botany: (
    <>
      <path d="M12 20V9" />
      <path d="M12 11C7 10 5.5 6.5 6 4c4.5.2 6.5 3 6 7Z" />
      <path d="M12 13c4.5-.8 6.5-3.3 6.5-6-4.3.2-6.6 2.4-6.5 6Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="4" y="7" width="16" height="11" rx="2" />
      <path d="M9 7V5h6v2M4 12h16" />
    </>
  ),
  brush: (
    <>
      <path d="M14 4 20 10 10 20H4v-6Z" />
      <path d="M13 7l4 4M4 20l5-5" />
    </>
  ),
  building: (
    <>
      <path d="M5 20V7l7-3 7 3v13" />
      <path d="M9 20v-5h6v5M8 9h.1M12 9h.1M16 9h.1M8 12h.1M12 12h.1M16 12h.1" />
    </>
  ),
  chart: (
    <>
      <path d="M5 19V5" />
      <path d="M5 19h14" />
      <path d="M9 16v-5M13 16V8M17 16v-8" />
    </>
  ),
  chat: (
    <>
      <path d="M5 6h14v9H9l-4 4z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  check: <path d="M5 12.5 10 17 19 7" />,
  clipboard: (
    <>
      <rect x="6" y="5" width="12" height="16" rx="2" />
      <path d="M9 5a3 3 0 0 1 6 0M9 10h6M9 14h6M9 18h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </>
  ),
  cloud: <path d="M7.5 18h9.2a3.8 3.8 0 0 0 .4-7.6A5.5 5.5 0 0 0 6.7 9 4.5 4.5 0 0 0 7.5 18Z" />,
  code: <path d="m8 9-4 3 4 3m8-6 4 3-4 3M14 6l-4 12" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  delete: (
    <>
      <path d="M6 6l12 12M18 6 6 18" />
      <circle cx="12" cy="12" r="8" />
    </>
  ),
  document: (
    <>
      <path d="M6 4h8l4 4v12H6z" />
      <path d="M14 4v5h4M9 13h6M9 16h5" />
    </>
  ),
  door: (
    <>
      <path d="M7 20V5h9v15" />
      <path d="M11 13h.1M16 20h3" />
    </>
  ),
  draft: (
    <>
      <path d="M5 19 19 5" />
      <path d="M7 17h5l7-7-5-5-7 7z" />
    </>
  ),
  feather: (
    <>
      <path d="M19 5c-6 0-11 5-11 11v3" />
      <path d="M19 5c.5 5-3.5 11-11 11M8 16l-3 3" />
    </>
  ),
  "file-tree": (
    <>
      <path d="M5 5h5v4H5zM14 9h5v4h-5zM14 16h5v4h-5z" />
      <path d="M10 7h2v11h2" />
    </>
  ),
  fire: (
    <path d="M12 21c-4 0-7-2.8-7-6.5 0-2.8 1.7-5.2 4.5-7.7.1 2.2.9 3.5 2.3 4.2.5-2.7 1.8-5 4.1-7 1.3 3.2 3.1 5.2 3.1 8.3 0 5.2-3.2 8.7-7 8.7Z" />
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 4.5c2 1.7 2 3.2 0 5-2-1.8-2-3.3 0-5ZM12 14.5c2 1.7 2 3.2 0 5-2-1.8-2-3.3 0-5ZM4.5 12c1.7-2 3.2-2 5 0-1.8 2-3.3 2-5 0ZM14.5 12c1.7-2 3.2-2 5 0-1.8 2-3.3 2-5 0Z" />
      <path d="M6.7 6.7c2.6.2 3.7 1.3 3.5 3.5-2.2.2-3.3-.9-3.5-3.5ZM17.3 17.3c-2.6-.2-3.7-1.3-3.5-3.5 2.2-.2 3.3.9 3.5 3.5ZM17.3 6.7c-.2 2.6-1.3 3.7-3.5 3.5-.2-2.2.9-3.3 3.5-3.5ZM6.7 17.3c.2-2.6 1.3-3.7 3.5-3.5.2 2.2-.9 3.3-3.5 3.5Z" />
    </>
  ),
  focus: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.2 2.3 3.2 5 3.2 8s-1 5.7-3.2 8c-2.2-2.3-3.2-5-3.2-8s1-5.7 3.2-8Z" />
    </>
  ),
  grid: (
    <>
      <rect x="5" y="5" width="5" height="5" rx="1" />
      <rect x="14" y="5" width="5" height="5" rx="1" />
      <rect x="5" y="14" width="5" height="5" rx="1" />
      <rect x="14" y="14" width="5" height="5" rx="1" />
    </>
  ),
  hammer: <path d="M14 5 20 11l-2 2-2-2-8 8-3-3 8-8-2-2z" />,
  image: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M5 17l5-5 3 3 2-2 4 4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 4 8 4-8 4-8-4z" />
      <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" />
      <path d="M5 19 15 9" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  palette: (
    <>
      <path d="M12 4a8 8 0 0 0 0 16h1.5a1.8 1.8 0 0 0 1.1-3.2 1.6 1.6 0 0 1 1-2.8H17a3 3 0 0 0 3-3c0-3.9-3.6-7-8-7Z" />
      <path d="M8 10h.1M10 7h.1M14 7h.1M6.8 14h.1" />
    </>
  ),
  paperclip: <path d="M8 12.5 14.5 6a3 3 0 0 1 4.2 4.2l-8.2 8.2a4.2 4.2 0 0 1-6-6L13 4" />,
  pencil: (
    <>
      <path d="M5 19l4.5-1 9-9L15 5.5l-9 9z" />
      <path d="M13.5 7 17 10.5" />
    </>
  ),
  photo: (
    <>
      <path d="M5 7h3l1.2-2h5.6L16 7h3v12H5z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  pin: (
    <>
      <path d="M14 4 20 10l-4 1-4 4-1 4-6-6 4-1 4-4z" />
      <path d="m8 16-4 4" />
    </>
  ),
  pomodoro: (
    <>
      <path d="M12 7c5 0 8 2.8 8 6.5S16.8 20 12 20s-8-2.8-8-6.5S7 7 12 7Z" />
      <path d="M12 7c-.6-2.1-2-3-4-3 1.8 2.6 3.2 3 4 3Zm0 0c.6-2.1 2-3 4-3-1.8 2.6-3.2 3-4 3Z" />
    </>
  ),
  quote: <path d="M9 7H5v5h3c0 2-1 3.5-3 4.5M19 7h-4v5h3c0 2-1 3.5-3 4.5" />,
  ruler: (
    <>
      <path d="M4 15 15 4l5 5L9 20z" />
      <path d="m8 15 1 1m1.5-4.5 1 1M13 9l1 1m1.5-4.5 1 1" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 5 5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3m0 12v3M4.2 7.5l2.6 1.5m10.4 6 2.6 1.5M4.2 16.5 6.8 15m10.4-6 2.6-1.5" />
    </>
  ),
  spark: <path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z" />,
  sprout: (
    <>
      <path d="M12 20v-8" />
      <path d="M12 12C8 12 6 9.5 6 6c3.8 0 6 2.2 6 6Z" />
      <path d="M12 13c4 0 6-2.5 6-6-3.8 0-6 2.2-6 6Z" />
    </>
  ),
  stairs: <path d="M4 18h5v-4h5v-4h6" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12h8" />
    </>
  ),
  tea: (
    <>
      <path d="M6 9h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5z" />
      <path d="M16 10h2a2 2 0 0 1 0 4h-2M5 21h13M8 5c1 1 1 2 0 3m4-3c1 1 1 2 0 3" />
    </>
  ),
  trash: (
    <>
      <path d="M5 7h14M9 7V5h6v2M8 10v9h8v-9" />
      <path d="M10.5 12v5M13.5 12v5" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4 21 20H3z" />
      <path d="M12 9v5m0 3h.1" />
    </>
  ),
  wave: <path d="M3 13c3-5 6 5 9 0s6 5 9 0" />,
};

interface SiteIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: SiteIconName;
  title?: string;
}

export function SiteIcon({ name, title, className = "", ...props }: SiteIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={`inline-block shrink-0 ${className}`}
      {...props}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}

export function Logo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-label="山雨"
    >
      {/* 山形 */}
      <path
        d="M3 22L9 10L14 16L19 8L25 22H3Z"
        fill="#7a9482"
        opacity="0.9"
      />
      {/* 山尖雪 */}
      <path
        d="M19 8L17 11L19 14L21 11L19 8Z"
        fill="#be8b8b"
        opacity="0.65"
      />
      {/* 雨滴 1 */}
      <circle cx="9" cy="19" r="1.2" fill="#a3b5a6" opacity="0.8" />
      {/* 雨滴 2 */}
      <circle cx="14" cy="21" r="1" fill="#a3b5a6" opacity="0.6" />
      {/* 雨滴 3 */}
      <circle cx="19.5" cy="17.5" r="0.9" fill="#a3b5a6" opacity="0.7" />
      {/* 雨滴 4 */}
      <circle cx="6.5" cy="16" r="0.8" fill="#a3b5a6" opacity="0.5" />
      {/* 雨滴 5 */}
      <circle cx="22" cy="19" r="1.1" fill="#a3b5a6" opacity="0.6" />
    </svg>
  );
}

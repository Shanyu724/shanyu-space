/**
 * 站点全局常量。所有对外 URL（sitemap、robots、OG）都通过这里取值，
 * 部署到自定义域名时只改这一个文件。
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shanyu-space.vercel.app";

export const SITE_NAME = "山雨 | 个人站";
export const SITE_DESCRIPTION =
  "山雨的个人网站——数模推演、金融洞察、研习札记、标的解构、宏观视野与随笔杂谈";
export const SITE_AUTHOR = "山雨";

import fs from "fs";
import path from "path";

/**
 * 「我」相关内容的单一数据源
 *
 * 改一处全站同步：about 页 / 首页 hero / AI context 都从这里读。
 * 数据文件：content/me.json
 */

export interface MeInterest {
  emoji: string;
  label: string;
}

export interface Me {
  name: string;
  /** 一句话签名档（首页 hero + 各种小角落） */
  signature: string;
  /** 一句话副标题（首页 hero 用，更长一点的描述） */
  tagline: string;
  about: {
    /** 名字来源 */
    nameOrigin: string;
    /** 当前在做什么 / 关注什么 */
    whatIDo: string;
    /** 长期关注 2×2 卡片 */
    interests: MeInterest[];
    /** 当前状态卡片（多行） */
    currentStatus: string[];
  };
}

const meFile = path.join(process.cwd(), "content", "me.json");

export function getMe(): Me {
  const raw = fs.readFileSync(meFile, "utf-8");
  return JSON.parse(raw) as Me;
}

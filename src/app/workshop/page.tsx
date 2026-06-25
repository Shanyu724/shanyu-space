import type { Metadata } from "next";
import { getTools } from "@/lib/content";
import { WorkshopClient } from "./WorkshopClient";

export const metadata: Metadata = {
  title: "Workshop · 工具坊",
  description:
    "山雨用 AI 协作做的小工具——一些为了解决自己具体问题而临时长出来的东西",
};

export default function WorkshopPage() {
  const tools = getTools();
  return <WorkshopClient tools={tools} />;
}

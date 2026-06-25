import type { Metadata } from "next";
import { PomodoroClient } from "./PomodoroClient";

export const metadata: Metadata = {
  title: "番茄钟 · Pomodoro",
  description:
    "简单的番茄工作法计时器——专注 / 短休 / 长休循环，本地存储设置，可选铃声。",
};

export default function PomodoroPage() {
  return <PomodoroClient />;
}

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ── 类型 ── */
type Mode = "focus" | "short" | "long";

interface Settings {
  focusMins: number;
  shortMins: number;
  longMins: number;
  longBreakInterval: number; // 每完成 N 个 focus 进入长休
  bellOn: boolean;
  autoStart: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  focusMins: 25,
  shortMins: 5,
  longMins: 15,
  longBreakInterval: 4,
  bellOn: true,
  autoStart: false,
};

const STORAGE_KEY = "shanyu.pomodoro.v1";

/* ── 工具函数 ── */
function getDuration(mode: Mode, s: Settings): number {
  return (mode === "focus" ? s.focusMins : mode === "short" ? s.shortMins : s.longMins) * 60;
}

function format(secs: number): string {
  const mm = Math.floor(secs / 60).toString().padStart(2, "0");
  const ss = (secs % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

const MODE_META: Record<Mode, { label: string; emoji: string; color: string; bgFrom: string; bgTo: string }> = {
  focus: {
    label: "Focus",
    emoji: "🔥",
    color: "var(--color-rose-500)",
    bgFrom: "rgba(241, 233, 233, 0.5)",
    bgTo: "rgba(232, 237, 233, 0.4)",
  },
  short: {
    label: "Short Break",
    emoji: "☕",
    color: "var(--color-mint-600)",
    bgFrom: "rgba(232, 237, 233, 0.5)",
    bgTo: "rgba(232, 237, 233, 0.3)",
  },
  long: {
    label: "Long Break",
    emoji: "🌿",
    color: "var(--color-mint-700)",
    bgFrom: "rgba(200, 213, 202, 0.5)",
    bgTo: "rgba(232, 237, 233, 0.4)",
  },
};

/* ── 主组件 ── */
export function PomodoroClient() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);
  const [mode, setMode] = useState<Mode>("focus");
  const [remaining, setRemaining] = useState<number>(DEFAULT_SETTINGS.focusMins * 60);
  const [running, setRunning] = useState(false);
  const [focusesCompleted, setFocusesCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const endTimeRef = useRef<number | null>(null);

  /* ── localStorage 持久化 ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.settings) {
          const merged = { ...DEFAULT_SETTINGS, ...data.settings };
          setSettings(merged);
          setRemaining(getDuration("focus", merged));
        }
        if (typeof data.focusesCompleted === "number") {
          setFocusesCompleted(data.focusesCompleted);
        }
      }
    } catch {
      // 忽略损坏的存储
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ settings, focusesCompleted })
      );
    } catch {
      // 忽略配额错误
    }
  }, [settings, focusesCompleted, hydrated]);

  /* ── 切换模式时重置 remaining（仅在 not running） ── */
  useEffect(() => {
    if (!running) {
      setRemaining(getDuration(mode, settings));
    }
    // 这里只听 mode / settings 变化；running 变化不重置
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, settings.focusMins, settings.shortMins, settings.longMins]);

  /* ── 铃声（Web Audio 合成，不依赖外部音频） ── */
  const playBell = useCallback(() => {
    if (!settings.bellOn) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      // 两声铃，模拟「叮——咚」
      [880, 660].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        const start = ctx.currentTime + i * 0.35;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.25, start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
        osc.start(start);
        osc.stop(start + 1.25);
      });
    } catch {
      // 浏览器不支持就静默失败
    }
  }, [settings.bellOn]);

  /* ── 切换到下一个模式 ── */
  const advanceMode = useCallback(() => {
    if (mode === "focus") {
      const next = focusesCompleted + 1;
      setFocusesCompleted(next);
      const useLongBreak = next % settings.longBreakInterval === 0;
      setMode(useLongBreak ? "long" : "short");
    } else {
      setMode("focus");
    }
  }, [mode, focusesCompleted, settings.longBreakInterval]);

  /* ── 计时核心：用 endTime 而不是单纯递减，避免 tab 隐藏时偏移 ── */
  useEffect(() => {
    if (!running) {
      if (tickerRef.current) {
        clearInterval(tickerRef.current);
        tickerRef.current = null;
      }
      return;
    }

    endTimeRef.current = performance.now() + remaining * 1000;

    tickerRef.current = setInterval(() => {
      const now = performance.now();
      const end = endTimeRef.current ?? now;
      const left = Math.max(0, Math.round((end - now) / 1000));
      setRemaining(left);
      if (left <= 0) {
        if (tickerRef.current) {
          clearInterval(tickerRef.current);
          tickerRef.current = null;
        }
        playBell();
        setRunning(false);
        advanceMode();
      }
    }, 250);

    return () => {
      if (tickerRef.current) {
        clearInterval(tickerRef.current);
        tickerRef.current = null;
      }
    };
    // 故意只在 running 变化时重启 ticker；remaining 在 ticker 内部驱动
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  /* ── 模式切换后如开启 autoStart，自动跑 ── */
  const prevModeRef = useRef<Mode>(mode);
  useEffect(() => {
    if (prevModeRef.current !== mode) {
      prevModeRef.current = mode;
      if (settings.autoStart && hydrated) {
        // 等下一帧再启动，确保 remaining 已经更新
        setTimeout(() => setRunning(true), 50);
      }
    }
  }, [mode, settings.autoStart, hydrated]);

  /* ── 文档标题：把倒计时写进去，最小化窗口时也能瞄一眼 ── */
  useEffect(() => {
    if (!hydrated) return;
    const meta = MODE_META[mode];
    if (running || remaining < getDuration(mode, settings)) {
      document.title = `${format(remaining)} · ${meta.label} | 番茄钟`;
    } else {
      document.title = "番茄钟 · Pomodoro";
    }
    return () => {
      document.title = "番茄钟 · Pomodoro | 山雨";
    };
  }, [remaining, mode, running, settings, hydrated]);

  /* ── 空格 / R 快捷键 ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.code === "Space") {
        e.preventDefault();
        setRunning((r) => !r);
      } else if (e.key === "r" || e.key === "R") {
        setRunning(false);
        setRemaining(getDuration(mode, settings));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, settings]);

  /* ── 控制 ── */
  const toggleRun = () => setRunning((r) => !r);
  const reset = () => {
    setRunning(false);
    setRemaining(getDuration(mode, settings));
  };
  const skip = () => {
    setRunning(false);
    advanceMode();
  };

  /* ── 计算环形进度 ── */
  const total = getDuration(mode, settings);
  const progress = total === 0 ? 0 : 1 - remaining / total;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const meta = MODE_META[mode];
  const currentInCycle = focusesCompleted % settings.longBreakInterval;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 md:py-14">
      {/* 面包屑 */}
      <Link
        href="/workshop"
        className="text-sm text-mint-500 hover:text-rose-400 transition-colors inline-flex items-center gap-1 mb-8"
      >
        <span>←</span> 返回工具坊
      </Link>

      {/* 顶部标题 */}
      <div className="text-center mb-2">
        <span
          className="inline-flex items-center gap-1.5 text-mint-700 px-3 py-1 rounded-full bg-mint-100/70 border border-mint-200/60"
          style={{ fontFamily: "var(--font-handwriting)", fontSize: "0.95rem" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          <span>pomodoro</span>
        </span>
      </div>
      <h1
        className="text-center text-5xl md:text-6xl text-mint-700 leading-tight mb-1"
        style={{ fontFamily: "var(--font-handwriting)" }}
      >
        番茄钟
      </h1>
      <p className="text-center text-xs text-mint-500 mb-10 tracking-wide">
        focus · short break · long break · loop
      </p>

      {/* 模式 tabs */}
      <div className="flex justify-center gap-2 sm:gap-6 mb-8">
        {(Object.keys(MODE_META) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              setRunning(false);
              setMode(m);
            }}
            className={`nav-dashed text-sm sm:text-base inline-flex items-center gap-1.5 ${
              mode === m ? "is-active" : ""
            }`}
          >
            <span aria-hidden="true">{MODE_META[m].emoji}</span>
            <span>{MODE_META[m].label}</span>
          </button>
        ))}
      </div>

      {/* 主计时器卡 */}
      <motion.div
        layout
        className="relative mx-auto mb-8 rounded-3xl border border-mint-100/70 backdrop-blur-sm overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${meta.bgFrom} 0%, ${meta.bgTo} 100%)`,
          maxWidth: 360,
        }}
      >
        <div className="relative aspect-square w-full flex items-center justify-center p-4">
          {/* SVG 环形进度 */}
          <svg
            viewBox="0 0 240 240"
            className="absolute inset-0 w-full h-full -rotate-90"
            aria-hidden="true"
          >
            {/* 底圈 */}
            <circle
              cx="120"
              cy="120"
              r={radius}
              fill="none"
              stroke="rgba(122,148,130,0.15)"
              strokeWidth="6"
            />
            {/* 进度圈 */}
            <motion.circle
              cx="120"
              cy="120"
              r={radius}
              fill="none"
              stroke={meta.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 0.4, ease: "linear" }}
            />
            {/* 走完后的小光晕（running 时） */}
            {running && (
              <circle
                cx="120"
                cy="120"
                r={radius}
                fill="none"
                stroke={meta.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                opacity="0.3"
                style={{ filter: "blur(4px)" }}
              />
            )}
          </svg>

          {/* 中心倒计时数字 */}
          <div className="relative z-10 text-center select-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] uppercase tracking-[0.2em] text-mint-500 mb-1.5 flex items-center justify-center gap-1.5"
              >
                <span>{meta.emoji}</span>
                <span>{meta.label}</span>
              </motion.div>
            </AnimatePresence>
            <div
              className="text-6xl md:text-7xl font-bold tabular-nums leading-none"
              style={{ color: meta.color, fontFamily: "var(--font-mono)" }}
            >
              {format(remaining)}
            </div>
            <div
              className="mt-2 text-base text-mint-500"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              {running ? "running..." : remaining === total ? "ready" : "paused"}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 操作按钮 */}
      <div className="flex justify-center gap-3 mb-6">
        <motion.button
          onClick={toggleRun}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="px-7 py-2.5 rounded-full text-sm font-medium shadow-sm bg-mint-500 text-white hover:bg-mint-600 transition-colors min-w-[110px]"
        >
          {running ? "暂停" : remaining < total ? "继续" : "开始"}
        </motion.button>
        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2.5 rounded-full border border-mint-200 bg-white/70 text-mint-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition-colors"
        >
          重置
        </motion.button>
        <motion.button
          onClick={skip}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2.5 rounded-full border border-mint-200 bg-white/70 text-mint-700 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition-colors"
        >
          跳过 →
        </motion.button>
      </div>

      {/* round 指示 */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <p className="text-xs text-mint-500">
          本轮已完成 {currentInCycle} / {settings.longBreakInterval} 个 focus
          <span className="mx-2 text-mint-300">·</span>
          累计 {focusesCompleted} 个
        </p>
        <div className="flex gap-2">
          {Array.from({ length: settings.longBreakInterval }).map((_, i) => {
            const done = i < currentInCycle;
            const current = i === currentInCycle && mode === "focus" && running;
            return (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  done
                    ? "bg-rose-400"
                    : current
                    ? "bg-rose-300 ring-2 ring-rose-400/30 ring-offset-2 ring-offset-white animate-pulse"
                    : "bg-mint-200"
                }`}
                aria-label={done ? "已完成" : current ? "进行中" : "未开始"}
              />
            );
          })}
        </div>
      </div>

      {/* 快捷键 + 设置 toggle */}
      <div className="flex items-center justify-between text-xs text-mint-500 mb-3">
        <p>
          <kbd className="px-1.5 py-0.5 rounded bg-mint-50 border border-mint-100 text-mint-700 mr-1">Space</kbd>
          开始/暂停
          <span className="mx-2 text-mint-300">·</span>
          <kbd className="px-1.5 py-0.5 rounded bg-mint-50 border border-mint-100 text-mint-700 mr-1">R</kbd>
          重置
        </p>
        <button
          onClick={() => setShowSettings((s) => !s)}
          className="text-mint-600 hover:text-rose-400 transition-colors inline-flex items-center gap-1"
        >
          <span>⚙</span>
          <span>{showSettings ? "收起设置" : "设置"}</span>
        </button>
      </div>

      {/* 设置面板 */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-2xl bg-white/70 border border-mint-100/70 backdrop-blur-sm">
              <h3
                className="text-2xl text-mint-700 mb-4"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <DurationInput
                  label="Focus（分钟）"
                  value={settings.focusMins}
                  min={1}
                  max={120}
                  onChange={(v) => setSettings((s) => ({ ...s, focusMins: v }))}
                />
                <DurationInput
                  label="短休（分钟）"
                  value={settings.shortMins}
                  min={1}
                  max={60}
                  onChange={(v) => setSettings((s) => ({ ...s, shortMins: v }))}
                />
                <DurationInput
                  label="长休（分钟）"
                  value={settings.longMins}
                  min={1}
                  max={60}
                  onChange={(v) => setSettings((s) => ({ ...s, longMins: v }))}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                <DurationInput
                  label="长休间隔（多少个 focus）"
                  value={settings.longBreakInterval}
                  min={2}
                  max={8}
                  onChange={(v) => setSettings((s) => ({ ...s, longBreakInterval: v }))}
                />
                <ToggleRow
                  label="结束时铃声"
                  checked={settings.bellOn}
                  onChange={(b) => setSettings((s) => ({ ...s, bellOn: b }))}
                  hint="Web Audio 合成的「叮咚」两声"
                />
                <ToggleRow
                  label="模式切换后自动开始"
                  checked={settings.autoStart}
                  onChange={(b) => setSettings((s) => ({ ...s, autoStart: b }))}
                  hint="focus 结束自动进入下一轮"
                />
              </div>
              <button
                onClick={() => {
                  setSettings(DEFAULT_SETTINGS);
                  setFocusesCompleted(0);
                }}
                className="mt-3 text-xs text-mint-500 hover:text-rose-400 transition-colors"
              >
                重置所有设置和计数 ↺
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部小话 */}
      <p
        className="mt-12 text-center text-base text-rose-400/80"
        style={{ fontFamily: "var(--font-handwriting)" }}
      >
        25 minutes at a time · breathe in between
      </p>
    </div>
  );
}

/* ── 子组件：数字输入 ── */
function DurationInput({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-mint-600">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value);
          if (!Number.isFinite(v)) return;
          onChange(Math.max(min, Math.min(max, Math.floor(v))));
        }}
        className="px-3 py-2 rounded-lg bg-white border border-mint-200 text-mint-800 text-sm focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200/40 transition-colors tabular-nums"
      />
    </label>
  );
}

/* ── 子组件：开关 ── */
function ToggleRow({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (b: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white border border-mint-200 hover:border-rose-300 transition-colors text-left"
      >
        <span className="text-xs text-mint-600">{label}</span>
        <span
          className={`relative inline-block w-8 h-4 rounded-full transition-colors ${
            checked ? "bg-rose-400" : "bg-mint-200"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${
              checked ? "translate-x-4" : ""
            }`}
          />
        </span>
      </button>
      {hint && <span className="text-[10px] text-mint-400 px-1">{hint}</span>}
    </div>
  );
}

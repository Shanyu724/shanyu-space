import { NextRequest, NextResponse } from "next/server";

/**
 * AI 聊天 API 路由（可插拔后台）
 *
 * 通过环境变量配置 AI 后端：
 *   - AI_BASE_URL    ：OpenAI 兼容 API 的入口（默认 OpenAI，可指向 Coze/Claude 等网关）
 *   - AI_API_KEY     ：API 密钥
 *   - AI_MODEL       ：模型名（如 gpt-4o-mini / claude-3-5-sonnet）
 *   - AI_SYSTEM_PROMPT：自定义系统提示
 *
 * 切换 AI 后台的常见方式：
 *   - 用 Coze：在 Coze 后台发布一个"API 模式"的 bot，把它的 OpenAI 兼容端点填到 AI_BASE_URL
 *   - 用 Claude：通过一个 OpenAI 兼容的代理网关（比如 one-api / newapi）
 *   - 用 OpenAI：什么都不填，默认就是
 *
 * 环境变量在 Vercel → Project Settings → Environment Variables 里配置。
 */

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  /** 是否流式返回（默认 true，失败时回退到非流式） */
  stream?: boolean;
}

const DEFAULT_SYSTEM_PROMPT = `你是山雨的个人 AI 助手"山间小雨"。

身份：
- 你是山雨的数字分身
- 你的语气温和、像老朋友聊天
- 回答简洁，不啰嗦

关于网站：
- 这是山雨的个人站
- 包含博客（地缘观察、金融制度、学习笔记、随笔）、作品集、工坊、关于
- 主人是位地缘政治研究者 + 金融制度学习者 + 考研人
- 偶尔会写写游戏、随笔

回答风格：
- 短句优先，避免长段
- 必要时给链接或参考
- 不确定时直说，不要编造`;

export async function POST(req: NextRequest) {
  const baseURL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const systemPrompt = process.env.AI_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI 后台未配置。在 Vercel Environment Variables 里设置 AI_API_KEY（和可选的 AI_BASE_URL / AI_MODEL）。",
      },
      { status: 503 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...(body.messages || []).filter(
      (m) => m.role === "user" || m.role === "assistant"
    ),
  ];

  try {
    const upstream = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return NextResponse.json(
        { error: `AI 后台返回错误 (${upstream.status})`, detail: errText },
        { status: 502 }
      );
    }

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content ?? "（无回复）";

    return NextResponse.json({ reply, model });
  } catch (err) {
    return NextResponse.json(
      {
        error: "调用 AI 后台失败",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 }
    );
  }
}

export async function GET() {
  const configured = Boolean(process.env.AI_API_KEY);
  return NextResponse.json({
    status: configured ? "ready" : "not-configured",
    message: configured
      ? "AI 聊天已就绪"
      : "请在 Vercel Environment Variables 中设置 AI_API_KEY",
  });
}

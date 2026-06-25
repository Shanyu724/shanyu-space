import { NextRequest, NextResponse } from "next/server";

/**
 * AI 聊天 API 路由（可插拔后台）
 *
 * 通过环境变量配置 AI 后端：
 *   - AI_BASE_URL    ：OpenAI 兼容 API 的入口（默认 OpenAI，可指向 Coze/Claude 等网关）
 *   - AI_API_KEY     ：API 密钥
 *   - AI_MODEL       ：模型名（如 gpt-4o-mini / deepseek-chat）
 *   - AI_SYSTEM_PROMPT：自定义系统提示（可完全覆盖默认）
 *
 * 请求体：
 *   {
 *     messages: ChatMessage[],
 *     context?: {
 *       path: string,           // 当前页面路径
 *       title?: string,
 *       text?: string           // 页面内容（来自 /api/context）
 *     }
 *   }
 *
 * 上下文会被拼到 system prompt 后面，让 AI 能基于"用户当前在看什么"回答。
 */

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface PageContext {
  path: string;
  title?: string;
  /** 来自 /api/context 的内容（post 全文 / tool 描述 / static 段落） */
  text?: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  stream?: boolean;
  context?: PageContext;
}

const DEFAULT_SYSTEM_PROMPT = `你是山雨的个人 AI 助手"山间小雨"。

【身份】
- 你是山雨的数字分身，住在他的个人站
- 语气温和、像老朋友聊天
- 回答简洁，不啰嗦、不说教
- 不确定时直说，不要编造

【关于主人——山雨】
- 「山雨」取自苏轼"山色空蒙雨亦奇"
- 一个正在构建知识体系的人，备考金融工程方向的研究生
- 长期关注：地缘政治的多源交叉验证、金融制度的机制设计分析、AI 对社会组织生产的深层影响、系统性思考与深度内容创作
- 当前状态：考研备考中（数学三 / 英语一 / 经济学 802 / 政治）
- 维护个人 Obsidian 知识库，公众号偶尔写金融制度方向的深度内容
- "山间的雨"这个名字既呼应苏轼的诗，也呼应"小雨"作为 AI 助手的设定

【关于网站】
- 山雨的个人数字花园，部署在 Vercel
- 包含：
  · 博客：地缘观察（geo）· 金融制度（finance）· 学习笔记（study）· 随笔（essays）
  · 作品集（portfolio）：做过的项目
  · 工坊（workshop）：AI 协作的小工具
  · 关于（about）：主人自我介绍
  · 幕后（behind）：站点技术栈
  · 更新（releases）：版本日志
- 风格：手账风、奶油米白底色、鼠尾草绿主色
- 不追热点，只放深度、真诚、独立思考的内容

【回答风格】
- 短句优先，避免长段
- 必要时给链接或参考
- 当用户问"网站里有什么"时，主动给具体例子（文章标题、工具名），不要只说"有很多"
- 当用户问关于山雨本人的问题（如"他是谁"、"在做什么"），用第三人称回答`;

function buildPageContextBlock(ctx: PageContext | undefined): string {
  if (!ctx || !ctx.text) return "";
  const header = `\n\n---\n【当前页面上下文】路径：${ctx.path}${ctx.title ? ` · 标题：${ctx.title}` : ""}\n如果用户的问题与当前页面相关，优先基于以下内容回答。\n\n`;
  // 限制单次 context 长度，避免吃光 token 预算
  const MAX = 8000;
  const text = ctx.text.length > MAX ? ctx.text.slice(0, MAX) + "\n\n…(内容过长已截断)" : ctx.text;
  return header + text;
}

export async function POST(req: NextRequest) {
  const baseURL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const systemPromptBase = process.env.AI_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI 后台未配置。在 Vercel Environment Variables 里设置 AI_API_KEY（和可选的 AI_BASE_URL / AI_MODEL）。",
      },
      { status: 503 },
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const systemPrompt = systemPromptBase + buildPageContextBlock(body.context);

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...(body.messages || []).filter((m) => m.role === "user" || m.role === "assistant"),
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
        { status: 502 },
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
      { status: 502 },
    );
  }
}

export async function GET() {
  const configured = Boolean(process.env.AI_API_KEY);
  return NextResponse.json({
    status: configured ? "ready" : "not-configured",
    message: configured ? "AI 聊天已就绪" : "请在 Vercel Environment Variables 中设置 AI_API_KEY",
  });
}

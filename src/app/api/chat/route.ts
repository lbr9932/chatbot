import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Assistant } from "@/constants/assistant";

export async function POST(req: Request) {
  const { message } = await req.json();
  const cookieStore = await cookies();
  let assistant: Assistant = {};
  const assistantCookie = JSON.parse(
    cookieStore.get("assistant")?.value || "{}"
  ) as Assistant;

  if (assistantCookie) assistant = assistantCookie;
  const { threadId = undefined, id: assistantId = undefined } = assistant;

  if (!threadId) return NextResponse.json({ status: 400 });

  const headers = {
    Authorization: `Bearer ${process.env.TEST_KEY}`,
    "Content-Type": "application/json",
    "OpenAI-Beta": "assistants=v2",
  };

  await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      role: "user",
      content: message,
    }),
  });

  const runRes = await fetch(
    `https://api.openai.com/v1/threads/${threadId}/runs`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        assistant_id: assistantId,
      }),
    }
  );
  const { id: runId } = await runRes.json();

  console.log("Run response:", runId);

  let status = "queued";
  let attempts = 0;
  while (status !== "completed" && attempts < 10) {
    await new Promise((r) => setTimeout(r, 1000));
    const runCheck = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
      { headers }
    );
    const { status: runStatus } = await runCheck.json();
    status = runStatus;
    attempts++;
  }

  const messagesRes = await fetch(
    `https://api.openai.com/v1/threads/${threadId}/messages`,
    { headers }
  );
  const messagesData = await messagesRes.json();

  type Message = {
    role: string;
    content?: { text?: { value?: string } }[];
  };

  const lastMessage = messagesData.data?.find(
    (msg: Message) => msg.role === "assistant"
  );

  return NextResponse.json({
    reply: lastMessage?.content?.[0]?.text?.value || "답변이 없어요!",
  });
}

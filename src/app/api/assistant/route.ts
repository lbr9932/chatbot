import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AssistantCharacter,
  assistantMap,
  Assistant,
} from "@/constants/assistant";

export async function POST(req: Request) {
  const { character }: { character: AssistantCharacter } = await req.json();
  const cookieStore = await cookies();
  const assistantId = assistantMap[character];
  let assistant: Assistant = {};
  const assistantCookie = JSON.parse(
    cookieStore.get("assistant")?.value || "{}"
  ) as Assistant;

  if (assistantCookie) assistant = assistantCookie;
  if (!assistant.id || assistant.id !== assistantId) {
    assistant = { id: assistantId, character };

    if (!assistantId) {
      return NextResponse.json({ status: 400 });
    }

    const headers = {
      Authorization: `Bearer ${process.env.TEST_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v2",
    };

    const threadRes = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers,
    });

    assistant.threadId = (await threadRes.json())?.id;

    if (assistant.threadId) {
      cookieStore.set("assistant", JSON.stringify(assistant), {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });
    }
  }

  return NextResponse.json({ status: 200 });
}

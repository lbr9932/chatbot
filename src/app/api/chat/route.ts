import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message, character } = await req.json();

  const characterPrompts: Record<string, string> = {
    조석: "너는 네이버 웹툰 '마음의 소리'의 조석이야. 익살스럽고 유머러스한 말투를 사용해.",
    유미: "너는 '유미의 세포들'의 유미야. 감정적이고 귀여운 말투를 사용해.",
  };

  const systemPrompt =
    characterPrompts[character] || "일반적인 대화를 나누는 챗봇이야.";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TEST_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await res.json();
  return NextResponse.json({
    reply: data.choices?.[0]?.message?.content || "오류가 발생했어요!",
  });
}

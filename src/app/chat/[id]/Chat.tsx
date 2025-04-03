"use client";

import { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";

export default function Chat() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messages.length === 0) {
      addMessage("bot", "안녕하세요! 무엇을 도와드릴까요? 😊");
    }
  }, [messages, addMessage]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    addMessage("user", input);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, character: "유미" }),
      });

      if (!res.ok) throw new Error("응답 실패");

      const data = await res.json();
      console.log(data);
      addMessage("bot", data.reply);
    } catch (err) {
      console.error("에러 발생:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
    inputRef.current?.focus();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 text-center text-lg font-bold">
        💬 AI Chat
      </header>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-700 rounded-lg"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 max-w-xs text-sm rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-600 text-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center items-center space-x-1">
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-wave"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-wave"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-wave"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-wave"
              style={{ animationDelay: "0.6s" }}
            ></div>
            <span className="ml-2 text-gray-400 animate-pulse">
              AI가 답변을 생각 중... 💭
            </span>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUpCapture={(e) => e.key === "Enter" && !loading && sendMessage()}
          className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="메시지를 입력하세요..."
          ref={inputRef}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className={`p-2 rounded-lg text-white transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          🗨️
        </button>
      </div>
    </div>
  );
}

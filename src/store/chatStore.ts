import { create } from "zustand";

interface ChatState {
  messages: { role: "user" | "bot"; content: string }[];
  addMessage: (role: "user" | "bot", content: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (role, content) =>
    set((state) => ({ messages: [...state.messages, { role, content }] })),
}));

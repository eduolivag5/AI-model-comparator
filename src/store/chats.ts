import { create } from "zustand";
import { Message } from "../types";

interface ChatState {
  messages: Record<string, Message[]>; // Mensajes por modelo (GPT-4, Gemini, etc.)
  addMessage: (modelId: string, message: Message) => void;
  deleteMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  addMessage: (modelId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [modelId]: [...(state.messages[modelId] || []), message],
      },
    })),
  deleteMessages: () => set({ messages: {} }),
}));

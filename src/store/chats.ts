import { create } from "zustand";
import { Message } from "../types";

interface ChatState {
  messages: Record<string, Message[]>; 
  addMessage: (modelId: string, message: Message) => void;
  deleteMessages: () => void;
}

const LOCAL_STORAGE_KEY = "chatMessages";  
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

const cleanOldMessages = (messages: Record<string, Message[]>) => {
  const now = Date.now();
  const filteredMessages: Record<string, Message[]> = {};

  Object.keys(messages).forEach((modelId) => {
    filteredMessages[modelId] = messages[modelId].filter(
      (msg) => now - new Date(msg.timestamp).getTime() < EXPIRATION_TIME
    );
  });

  return filteredMessages;
};

export const useChatStore = create<ChatState>((set) => {
  const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
  let initialMessages = storedMessages ? JSON.parse(storedMessages) : {};

  // Limpiar mensajes antiguos al cargar
  initialMessages = cleanOldMessages(initialMessages);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialMessages));

  return {
    messages: initialMessages,
    addMessage: (modelId, message) => {
      set((state) => {
        const updatedMessages = {
          ...state.messages,
          [modelId]: [...(state.messages[modelId] || []), message],
        };

        const cleanedMessages = cleanOldMessages(updatedMessages);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanedMessages));

        return { messages: cleanedMessages };
      });
    },
    deleteMessages: () => {
      set({ messages: {} });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  };
});

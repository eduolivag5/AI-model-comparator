import { create } from "zustand";
import { Message } from "../types";

interface ChatState {
  messages: Record<string, Message[]>; // Mensajes por modelo (GPT-4, Gemini, etc.)
  addMessage: (modelId: string, message: Message) => void;
  deleteMessages: () => void;
}

const LOCAL_STORAGE_KEY = "chatMessages";  // Clave para almacenar los mensajes en localStorage

export const useChatStore = create<ChatState>((set) => {
  // Paso 1: Recuperar los mensajes desde localStorage al inicializar el store
  const storedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialMessages = storedMessages ? JSON.parse(storedMessages) : {};

  return {
    messages: initialMessages,
    addMessage: (modelId, message) => {
      set((state) => {
        const updatedMessages = {
          ...state.messages,
          [modelId]: [...(state.messages[modelId] || []), message],
        };
        // Paso 2: Guardar los mensajes actualizados en localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMessages));
        return { messages: updatedMessages };
      });
    },
    deleteMessages: () => {
      set({ messages: {} });
      // Paso 3: Eliminar los mensajes del localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  };
});

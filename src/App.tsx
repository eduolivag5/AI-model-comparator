import MessageInput from "./components/MessageInput";
import ChatWindow from "./components/ChatWindow";
import { Model } from "./types";
import { useChatStore } from "./store";
import { useMutation } from "@tanstack/react-query";
import { getOpenAIResponse } from "./api/openai";

const models: Model[] = [
  { id: "gpt-4", name: "gpt-4", company: "OpenAI", icon: "chatgpt-icon.svg" },
  { id: "gemini", name: "gemini", company: "Google", icon: "google-gemini-icon.svg" },
]

export default function App () {
  const { messages, addMessage } = useChatStore();

  const { mutate: sendMessage} = useMutation({
    mutationFn: getOpenAIResponse,
    onSuccess: (data) => {
      addMessage("gpt-4", {sender: "assistant", text: data!});
    },
    onError: (error) => {
      console.error("Error al llamar a OpenAI:", error);
    },
  })

  async function handleSendMessage (message: string) {
    for (const model of models) {
      addMessage(model.id, {sender: "user", text: message});
    }

    await sendMessage(message);
    console.log(messages);
  };

  return (
    <div className="h-screen p-6 flex flex-col bg-background text-white">
      <MessageInput onSend={handleSendMessage} />
      
      {/* Contenedor que ocupa el espacio restante */}
      <div className="flex-1 flex gap-4 mt-4 pt-4 border-t border-t-secondary overflow-auto">
        {models.map((model, index) => (
          <ChatWindow key={index} model={model} />
        ))}
      </div>
    </div>
  );
};

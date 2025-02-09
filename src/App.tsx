import { useState } from "react";
import MessageInput from "./components/MessageInput";
import ChatWindow from "./components/ChatWindow";
import { useChatStore } from "./store/chats";
import { useModelsStore } from "./store/models";

export default function App() {
  const { messages, addMessage } = useChatStore();
  const { selectedModels } = useModelsStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  async function handleSendMessage(message: string) {
    setIsLoading(true);
    setError(null); 

    
    selectedModels.forEach((model) => {
      addMessage(model.id, { sender: "user", text: message });
    });

    try {
      
      await Promise.all(
        selectedModels.map((model) =>
          model.function(message)
            .then((data) => {
              addMessage(model.id, { sender: "assistant", text: data! });
            })
            .catch((err) => {
              console.error(`Error al llamar a ${model.name}:`, err);
              setError(`Error al llamar a ${model.name}`);
            })
        )
      );
    } catch (error) {
      console.error("Hubo un error al ejecutar las mutaciones:", error);
      setError("Se ha producido un error. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }

    console.log(messages);
  }

  return (
    <div className="h-screen p-6 flex flex-col bg-background text-white">
      <MessageInput onSend={handleSendMessage} />

      {isLoading && <div className="mt-2 text-sm">Obteniendo respuestas...</div>}
      {error && <div className="mt-2 text-sm text-red-400">{error}</div>}

      {/* Contenedor que ocupa el espacio restante */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 mt-4 pt-4 border-t border-t-secondary overflow-auto">
        {selectedModels.map((model, index) => (
          <ChatWindow key={index} model={model} />
        ))}
      </div>

      
    </div>
  );
}

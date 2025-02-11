import { useState } from "react";
import MessageInput from "./components/MessageInput";
import { useChatStore } from "./store/chats";
import { useModelsStore } from "./store/models";
import TabsSelector from "./components/TabsSelector";
import MainLogo from "./components/MainLogo";

export default function App() {
  const { messages, addMessage } = useChatStore();
  const { selectedModels } = useModelsStore();
  const [error, setError] = useState<string | null>(null);

  
  async function handleSendMessage(message: string) {
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
    }

    console.log(messages);
  }

  return (
    <div className="h-[100dvh] p-6 flex flex-col bg-background text-white max-w-6xl mx-auto">
      
      <MainLogo />
      
      <MessageInput onSend={handleSendMessage} />

      {error && <div className="mt-2 text-sm text-red-400">{error}</div>}

      <hr className="my-6 border-t border-zinc-800" />

      <div id="tabs-selector">
        <TabsSelector />
      </div>

      
    </div>
  );
}

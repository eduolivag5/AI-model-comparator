import { useState } from "react";
import MessageInput from "./components/MessageInput";
import { useChatStore } from "./store/chats";
import { useModelsStore } from "./store/models";
import TabsSelector from "./components/TabsSelector";

export default function App() {
  const { addMessage } = useChatStore();
  const { selectedModels, setModelExecutionDuration } = useModelsStore();
  const [error, setError] = useState<string | null>(null);

  async function handleSendMessage(message: string) {
    setError(null);

    selectedModels.forEach((model) => {
      addMessage(model.id, { sender: "user", text: message });
    });

    try {
      await Promise.all(
        selectedModels.map((model) =>
          new Promise(async (resolve, reject) => {
            const startTime = performance.now();
            try {
              const data = await model.function(message);
              addMessage(model.id, { sender: "assistant", text: data?.trim() || "" });

              const endTime = performance.now(); // Guardamos el tiempo de fin
              const duration = endTime - startTime; // Calculamos la duración
              setModelExecutionDuration(model.id, duration);
              resolve(data);
            } catch (err) {
              setError(`Error al llamar a ${model.name}`);
              addMessage(model.id, { sender: "assistant", text: "Se ha producido un error. Inténtalo de nuevo más tarde." });
              reject(err);
            }
          })
        )
      );
    } catch (err) {
      setError("Se ha producido un error. Inténtalo de nuevo más tarde.");
      console.log(error)
    }
  }

  return (
    <div className="h-[100dvh] py-6 text-white max-w-6xl mx-auto flex gap-10">

      <div className="min-w-80">
        <MessageInput onSend={handleSendMessage} />
      </div>

      <TabsSelector />
    </div>
  );
  
}

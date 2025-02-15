import { useState, useRef } from "react";
import MessageInput from "./components/MessageInput";
import { useChatStore } from "./store/chats";
import { useModelsStore } from "./store/models";
import TabsSelector from "./components/TabsSelector";

export default function App() {
  const { addMessage } = useChatStore();
  const { selectedModels, setModelExecutionDuration } = useModelsStore();
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null); // Referencia a #messages

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

              const endTime = performance.now(); 
              const duration = endTime - startTime; 
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

      // Hacer scroll automático al inicio de #messages
      if (messagesRef.current) {
        messagesRef.current.scrollIntoView({ behavior: "smooth" });
      }

    } catch (err) {
      setError("Se ha producido un error. Inténtalo de nuevo más tarde.");
      console.log(error);
    }
  }

  return (
    <div className="h-[100dvh] p-4 md:px-0 md:py-6 text-white max-w-6xl mx-auto flex flex-col md:flex-row gap-10">

      <div className="min-w-80">
        <MessageInput onSend={handleSendMessage} />
      </div>

      {/* Agregar ref al contenedor #messages */}
      <div id="messages" ref={messagesRef} className="py-4 w-full">
        <TabsSelector />
      </div>
      
    </div>
  );
}

import { useState, useRef } from "react";
import { useChatStore } from "../store/chats";
import { useModelsStore } from "../store/models";
import MessageInput from "../components/MessageInput";
import TabsSelector from "../components/TabsSelector";

export default function App() {
    const { addMessage } = useChatStore();
    const { selectedModels, setModelExecutionDuration } = useModelsStore();
    const [error, setError] = useState<string | null>(null);
    const messagesRef = useRef<HTMLDivElement>(null); // Referencia a #messages

    async function handleSendMessage(message: string) {
        setError(null);

        selectedModels.forEach((model) => {
            addMessage(model.id, { sender: "user", text: message, timestamp: new Date().toISOString() });
        });

        try {
            await Promise.all(
                selectedModels.map((model) =>
                    new Promise(async (resolve, reject) => {
                        const startTime = performance.now();
                        try {
                            const data = await model.function(message);
                            addMessage(model.id, { sender: "assistant", text: data?.trim() || "", timestamp: new Date().toISOString() });

                            const endTime = performance.now(); 
                            const duration = endTime - startTime; 
                            setModelExecutionDuration(model.id, duration);
                            resolve(data);
                        } catch (err) {
                            setError(`Error al llamar a ${model.name}`);
                            addMessage(model.id, { sender: "assistant", text: "Se ha producido un error. Inténtalo de nuevo más tarde.", timestamp: new Date().toISOString() });
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
        <div className="w-full flex flex-col md:flex-row gap-10">
            
            <div className="min-w-80">
                <MessageInput onSend={handleSendMessage} />
            </div>

            <div id="messages" ref={messagesRef} className="w-full h-full">
                <TabsSelector />
            </div>

        </div>

    );
}
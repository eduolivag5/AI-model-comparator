import { useState } from "react";
import { useChatStore } from "../store/chats";
import ModelSelector from "./ModelSelector";
import { useModelsStore } from "../store/models";
import { Button, Textarea } from "@heroui/react";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/solid";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput = ({ onSend } : MessageInputProps) => {
  const [message, setMessage] = useState("");

  const { deleteMessages } = useChatStore();
  const { selectedModels } = useModelsStore();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleDeleteConversation = () => {
    // TODO: Eliminar todos los mensajes
    setMessage("");
    deleteMessages();
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="py-4 text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-indigo-700 drop-shadow-[0px_0px_120px_rgba(98,56,214,1)] inline-block">
        AI Compare
      </span> 
      <ModelSelector />
      <Textarea
        isClearable
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onClear={() => setMessage("")}
      />
      <div className="flex gap-2">
        <Button
          onPress={handleSend}
          variant="ghost"
          className="flex-1 py-1"
          disabled={selectedModels.length === 0}
        >
          <PaperAirplaneIcon className="w-4 h-4" />
          Enviar
        </Button>
        <Button
          variant="ghost"
          className="flex-1 py-1"
          onPress={handleDeleteConversation}
        >
          <TrashIcon className="w-4 h-4" />
          Borrar historial
        </Button>
      </div>
    </div>

  );
};

export default MessageInput;

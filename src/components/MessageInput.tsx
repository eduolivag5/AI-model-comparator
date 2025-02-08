import React, { useState } from "react";
import { useChatStore } from "../store";

interface Props {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const { deleteMessages } = useChatStore();

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
    <div className="flex gap-4">
      <textarea
        className="flex-grow px-4 py-2 bg-foreground border border-secondary rounded-lg resize-none focus:outline-none"
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-primary rounded-lg"
        >
          Enviar
        </button>
        <button
          onClick={handleDeleteConversation}
          className="px-6 py-2 bg-secondary rounded-lg"
        >
          Eliminar mensajes
        </button>
      </div>
      
    </div>
  );
};

export default MessageInput;

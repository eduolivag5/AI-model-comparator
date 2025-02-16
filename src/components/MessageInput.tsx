import { useState, useEffect } from "react";
import { useChatStore } from "../store/chats";
import ModelSelector from "./ModelSelector";
import { useModelsStore } from "../store/models";
import { Button, Textarea } from "@heroui/react";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/solid";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MAX_SENDS_PER_DAY = 10;

const getSendsFromStorage = () => {
  const storedData = localStorage.getItem("send_history");
  if (!storedData) return [];
  const sends = JSON.parse(storedData);
  const now = Date.now();
  return sends.filter((timestamp: number) => now - timestamp < 24 * 60 * 60 * 1000);
};

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [sendCount, setSendCount] = useState(getSendsFromStorage().length);

  const { deleteMessages } = useChatStore();
  const { selectedModels } = useModelsStore();

  useEffect(() => {
    setSendCount(getSendsFromStorage().length);
  }, []);

  const handleSend = () => {
    if (message.trim() && sendCount < MAX_SENDS_PER_DAY) {
      const updatedSends = [...getSendsFromStorage(), Date.now()];
      localStorage.setItem("send_history", JSON.stringify(updatedSends));
      setSendCount(updatedSends.length);
      onSend(message);
      setMessage("");
    }
  };

  const handleDeleteConversation = () => {
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
          className="flex-1 py-1 disabled:bg-zinc-900"
          disabled={selectedModels.length === 0 || sendCount >= MAX_SENDS_PER_DAY}
        >
          <PaperAirplaneIcon className="w-4 h-4" />
          Enviar ({sendCount}/{MAX_SENDS_PER_DAY})
        </Button>
        <Button variant="ghost" className="flex-1 py-1" onPress={handleDeleteConversation}>
          <TrashIcon className="w-4 h-4" />
          Borrar historial
        </Button>
      </div>
      <p className="text-xs text-gray-400">(*) Los mensajes se borran automáticamente después de 24 horas.</p>
      <p className="text-xs text-gray-400">(*) Solo se pueden enviar 10 mensajes / 24 horas.</p>
    </div>
  );
};

export default MessageInput;

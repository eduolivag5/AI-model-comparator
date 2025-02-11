import { useChatStore } from "../store/chats";
import { Model } from "../types";
import ReactMarkdown from 'react-markdown';

interface ChatWindowProps {
  model: Model;
}

export default function ChatWindow({ model }: ChatWindowProps) {
  const { messages } = useChatStore();

  return (
    <div className="flex flex-col">
      
      <div className="flex gap-4 items-center mb-2 text-white">
        <img src={model.icon} alt={model.name} className="w-8 h-8" />
        <div className="text-sm flex flex-col">
          <span className="font-bold uppercase">{model.name}</span>
          <span>{model.company}</span>
        </div>
      </div>

      {/* Contenedor de mensajes con scroll */}
      <div className="flex-1 overflow-y-auto rounded-lg h-full">
        {Object.keys(messages).length ? (
          Object.keys(messages)
            .filter((key) => model.id === key)
            .map((key) => (
              <div key={key} className="space-y-2">
                {messages[key].map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 ${msg.sender === "user" && "justify-end"}`}
                  >
                    {msg.sender === "assistant" && (
                      <img
                        src={model.icon}
                        alt="Assistant"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    
                    <span
                      className={`flex text-white items-center gap-2 p-2 rounded-lg text-sm break-words ${
                        msg.sender === "user" ? "text-right bg-gradient-to-r from-indigo-700 to-blue-700" : "text-left"
                      }`}
                    >
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </span>
                    
                    {msg.sender === "user" && (
                      <img
                        src="./profile-major.svg"
                        alt="User"
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))
        ) : (
          <p className="text-gray-400 text-sm">No hay mensajes aún.</p>
        )}
      </div>
    </div>
  );
}

import { useChatStore } from "../store";
import { Model } from "../types";

interface ChatWindowProps {
  model: Model;
}

export default function ChatWindow({ model }: ChatWindowProps) {
  const { messages } = useChatStore();

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex gap-4 items-center mb-2">
        <img src={model.icon} alt={model.name} className="w-10 h-10" />
        <div>
          <span className="text-lg font-bold uppercase">{model.name}</span>
          <p>{model.company}</p>
        </div>
      </div>

      {/* Contenedor de mensajes con scroll */}
      <div className="flex-1 overflow-y-auto p-4 bg-foreground border border-secondary rounded-lg h-full">
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
                      className={`flex items-center gap-2 p-2 rounded-lg text-sm break-words ${
                        msg.sender === "user" ? "text-right bg-primary" : "text-left bg-secondary"
                      }`}
                    >
                      {msg.text}
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
          <p className="text-gray-400">No hay mensajes aún.</p>
        )}
      </div>
    </div>
  );
}

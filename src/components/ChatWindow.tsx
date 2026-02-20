import { useChatStore } from "../store/chats";
import { Model } from "../types";
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from "react";
import { useUserSettings } from "../store/user";
import ChatModelHeader from "./ChatModelHeader";
// 1. Importa el componente Avatar
import { Avatar } from "@heroui/react"; 

interface ChatWindowProps {
    model: Model;
}

export default function ChatWindow({ model }: ChatWindowProps) {
    const { messages } = useChatStore();
    const { profilePicture } = useUserSettings();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {    
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); 

    return (
        <div className="flex flex-col h-full">
            <ChatModelHeader model={model} />

            <div className="flex-1 overflow-y-auto rounded-lg p-2">
                {Object.keys(messages).filter((key) => model.id === key).length ? (
                    Object.keys(messages)
                        .filter((key) => model.id === key)
                        .map((key) => (
                            <div key={key} className="space-y-4">
                                {messages[key].map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {/* Avatar del Asistente */}
                                        {msg.sender === "assistant" && (
                                            <Avatar 
                                                src={model.icon} 
                                                className="w-6 h-6 min-w-[24px] h-[24px]" 
                                                size="sm"
                                            />
                                        )}
                                        
                                        <span
                                            className={`flex text-white items-center gap-2 p-2 rounded-lg text-xs md:text-sm break-words ${
                                                msg.sender === "user" 
                                                ? "text-right bg-gradient-to-r from-indigo-700 to-blue-700" 
                                                : "text-left bg-background"
                                            }`}
                                        >
                                            <ReactMarkdown className="whitespace-pre-wrap">{msg.text}</ReactMarkdown>
                                        </span>
                                        
                                        {/* Avatar del Usuario */}
                                        {msg.sender === "user" && (
                                            <Avatar 
                                                // Si profilePicture es null, Avatar mostrará el icono por defecto
                                                src={profilePicture || undefined} 
                                                className="w-6 h-6 min-w-[24px] h-[24px]" 
                                                size="sm"
                                                isBordered={false}
                                            />
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        ))
                ) : (
                    <p className="text-gray-400 text-sm">No hay mensajes aún.</p>
                )}
            </div>
        </div>
    );
}
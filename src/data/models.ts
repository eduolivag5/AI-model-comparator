// src/data/models.ts
import { getAIResponse } from "../config/api";
import { Model } from "../types";

export const models: Model[] = [
    { 
        id: "gpt-4", 
        name: "gpt-4o-mini", 
        company: "OpenAI", 
        icon: "chatgpt-icon.svg", 
        function: (msg: string) => getAIResponse("openai", msg), 
        active: false, 
        last_execution_duration: null 
    },
    { 
        id: "gemini", 
        name: "gemini-2.5-flash", 
        company: "Google", 
        icon: "google-gemini-icon.svg", 
        function: (msg: string) => getAIResponse("gemini", msg), 
        active: true, 
        last_execution_duration: null 
    },
    { 
        id: "llama-groq", 
        name: "Llama 3.3 70B", 
        company: "Meta", 
        icon: "meta-icon.svg", 
        function: (msg: string) => getAIResponse("groq", msg), 
        active: true, 
        last_execution_duration: null 
    },
    { 
        id: "mistral-ai", 
        name: "mistral-large-latest", 
        company: "Mistral AI", 
        icon: "mistral-ai-icon.svg", 
        function: (msg: string) => getAIResponse("mistral", msg), 
        active: true, 
        last_execution_duration: null 
    },
    { 
        id: "deepseek", 
        name: "deepseek-r1", 
        company: "Deepseek", 
        icon: "deepseek-logo-icon.svg", 
        function: (msg: string) => getAIResponse("deepseek", msg), 
        active: false, 
        last_execution_duration: null 
    },
    { 
        id: "grok", 
        name: "grok-2-latest", 
        company: "xAI", 
        icon: "grok-icon.svg", 
        function: (msg: string) => getAIResponse("grok", msg), 
        active: false, 
        last_execution_duration: null 
    },
    { 
        id: "claude-sonnet", 
        name: "Claude 3.5", 
        company: "Anthropic", 
        icon: "claude-icon.svg", 
        function: (msg: string) => getAIResponse("claude", msg), 
        active: false, 
        last_execution_duration: null 
    },
    { 
        id: "qwen-hf", 
        name: "Qwen 2.5", 
        company: "Alibaba", 
        icon: "qwen-icon.svg", 
        function: (msg: string) => getAIResponse("huggingface", msg), 
        active: false, 
        last_execution_duration: null 
    }
];
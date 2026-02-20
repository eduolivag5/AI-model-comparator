import { getDeepseekResponse } from "../api/deepseek";
import { getGeminiResponse } from "../api/gemini";
import { getGROKResponse } from "../api/grok"; // Si usas Grok de xAI
import { getLlamaGroqResponse } from "../api/groq";
import { getHuggingFaceResponse } from "../api/huggingface";
import { getMistralAIResponse } from "../api/mistral";
import { getOpenAIResponse } from "../api/openai";
import { getClaudeResponse } from "../api/openrouter";
import { Model } from "../types";

export const models: Model[] = [
    { id: "gpt-4", name: "gpt-4o-mini", company: "OpenAI", icon: "chatgpt-icon.svg", function: getOpenAIResponse, active: false, last_execution_duration: null },
    { id: "gemini", name: "gemini-2.5-flash", company: "Google", icon: "google-gemini-icon.svg", function: getGeminiResponse, active: true, last_execution_duration: null },
    { id: "llama-groq", name: "Llama 3.3 70B", company: "Meta", icon: "meta-icon.svg", function: getLlamaGroqResponse, active: true, last_execution_duration: null },
    { id: "deepseek", name: "deepseek-r1", company: "Deepseek", icon: "deepseek-logo-icon.svg", function: getDeepseekResponse, active: false, last_execution_duration: null },
    { id: "grok", name: "grok-2-latest", company: "xAI", icon: "grok-icon.svg", function: getGROKResponse, active: false, last_execution_duration: null },
    { id: "mistral-ai", name: "mistral-large-latest", company: "Mistral AI", icon: "mistral-ai-icon.svg", function: getMistralAIResponse, active: true, last_execution_duration: null },
    { id: "claude-sonnet", name: "Claude 3.5", company: "Anthropic", icon: "claude-icon.svg", function: getClaudeResponse, active: false, last_execution_duration: null },
    { id: "qwen-hf", name: "Qwen 2.5", company: "Alibaba", icon: "qwen-icon.svg", function: getHuggingFaceResponse, active: false, last_execution_duration: null },   
];
import { getDeepseekResponse } from "../api/deepseek";
import { getGeminiResponse } from "../api/gemini";
import { getGROKResponse } from "../api/grok";
import { getMistralAIResponse } from "../api/mistral";
import { getOpenAIResponse } from "../api/openai";
import { Model } from "../types";

export const models: Model[] = [
    { id: "gpt-4", name: "gpt-4o-mini", company: "OpenAI", icon: "chatgpt-icon.svg", function: getOpenAIResponse, active: true, last_execution_duration: null },
    { id: "gemini", name: "gemini-1.5-flash", company: "Google", icon: "google-gemini-icon.svg", function: getGeminiResponse, active: false, last_execution_duration: null },
    { id: "deepseek", name: "deepseek-r1", company: "Deepseek", icon: "deepseek-logo-icon.svg", function: getDeepseekResponse, active: false, last_execution_duration: null },
    { id: "mistral-ai", name: "mistral-large-latest", company: "Mistral AI", icon: "mistral-ai-icon.svg", function: getMistralAIResponse, active: true, last_execution_duration: null },
    { id: "grok", name: "grok-2-latest", company: "Twitter", icon: "grok-icon.svg", function: getGROKResponse, active: false, last_execution_duration: null },
];
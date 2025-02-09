import { getGeminiResponse } from "../api/gemini";
import { getOpenAIResponse } from "../api/openai";
import { Model } from "../types";

export const models: Model[] = [
    { id: "gpt-4", name: "gpt-4", company: "OpenAI", icon: "chatgpt-icon.svg", function: getOpenAIResponse },
    { id: "gemini", name: "gemini", company: "Google", icon: "google-gemini-icon.svg", function: getGeminiResponse },
];
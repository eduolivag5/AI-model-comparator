// src/api/aiService.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL; // http://localhost:8080/api/v1

export const getAIResponse = async (modelId: string, message: string): Promise<string> => {
    // Mapeamos el ID del modelo del front al endpoint del back
    // Esto es útil si el ID del front no coincide exactamente con el del controlador
    const endpointMap: Record<string, string> = {
        "gpt-4": "openai",
        "gemini": "gemini",
        "llama-groq": "groq",
        "mistral-ai": "mistral",
        "deepseek": "deepseek", // Cuando los implementes en Java
        "grok": "grok",
        "claude-sonnet": "claude",
        "qwen-hf": "huggingface"
    };

    const modelEndpoint = endpointMap[modelId] || modelId;

    try {
        const response = await fetch(`${BASE_URL}/${modelEndpoint}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) throw new Error(`Error en el servidor (${modelId})`);
        
        return await response.text();
    } catch (error) {
        console.error(`Error en ${modelId}:`, error);
        return "Error de conexión con el servidor.";
    }
};
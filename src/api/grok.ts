import OpenAI from "openai";

const openai = new OpenAI({ baseURL: "https://api.x.ai/v1", dangerouslyAllowBrowser: true, apiKey: import.meta.env.VITE_GROK_API_KEY })

export const getGROKResponse = async (message: string) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "grok-2-latest",
            messages: [{ role: "user", content: message }]
        });

        console.log("Respuesta de GROK: ", completion)
    
        return completion.choices[0].message?.toString() || "Se ha producido un error al llamar a GROK.";
    } catch (error) {
        console.error("Error al llamar a GROK:", error);
    }
};
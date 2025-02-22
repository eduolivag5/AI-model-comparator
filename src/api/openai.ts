import OpenAI from "openai";

const openai = new OpenAI({  dangerouslyAllowBrowser: true, apiKey: import.meta.env.VITE_OPENAI_API_KEY })

export const getOpenAIResponse = async (message: string) => {
    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }],
            store: true,
            stream: true,
        });
    
        let responseText = "";
        for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            responseText += text;
        }
        
        return responseText;
    } catch (error) {
        console.error("Error al llamar a OpenAI:", error);
    }
};
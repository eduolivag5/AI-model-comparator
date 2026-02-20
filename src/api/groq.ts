import OpenAI from "openai";

const groq = new OpenAI({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true
});

export const getLlamaGroqResponse = async (message: string) => {
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: message }],
    });
    return completion.choices[0]?.message?.content || "";
};
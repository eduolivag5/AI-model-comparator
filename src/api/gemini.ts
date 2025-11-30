import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const getGeminiResponse = async (message: string) => {
    try {
        const response = await model.generateContent(message);
        const responseText = response.response.text();

        return responseText;
    } catch (error) {
        console.error("Error al llamar a Gemini:", error);
    }
};
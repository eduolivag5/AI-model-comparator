import OpenAI from "openai";

const openai = new OpenAI({  baseURL: "https://api.deepseek.com/v1", dangerouslyAllowBrowser: true, apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY })

export const getDeepseekResponse = async (message: string) => {
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
      console.error("Error al llamar a Deepseek:", error);
    }
  };
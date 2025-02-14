import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({apiKey: import.meta.env.VITE_MISTRAL_API_KEY});

export const getMistralAIResponse = async (message: string) => {
    try {
        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [{role: 'user', content: message}],
        });

        if (chatResponse.choices![0].message.content) {
            return chatResponse.choices![0].message.content.toString();
        }

        return "aaa"
    } catch (error) {
        console.error("Error al llamar a Mistral-AI:", error);
    }
};
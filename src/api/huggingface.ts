export const getHuggingFaceResponse = async (message: string) => {
    const response = await fetch("https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: message,
            parameters: { max_new_tokens: 1000 }
        })
    });
    const data = await response.json();
    // Hugging Face devuelve un array con la respuesta generada
    return data[0]?.generated_text || data.generated_text || "Error en Hugging Face";
};
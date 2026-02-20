export const getClaudeResponse = async (message: string) => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.origin, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "anthropic/claude-3.5-sonnet",
            messages: [{ role: "user", content: message }],
        })
    });
    const data = await response.json();
    return data.choices[0]?.message?.content || "";
};
export interface Model {
  id: string;
  name: string;
  company: string;
  icon: string;
  function: (message: string) => Promise<string | undefined>;
}

export interface Message {
  sender: "user" | "assistant"; // Indica quién envió el mensaje
  text: string; // El texto del mensaje
}
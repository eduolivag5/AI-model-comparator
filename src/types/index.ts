export interface Model {
  id: string;
  name: string;
  company: string;
  icon: string;
  function: (message: string) => Promise<string | undefined>;
  last_execution_duration: number | null;
  active: boolean;
}

export interface Message {
  sender: "user" | "assistant"; // Indica quién envió el mensaje
  text: string; // El texto del mensaje
}
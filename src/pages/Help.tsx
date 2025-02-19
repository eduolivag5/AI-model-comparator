import { Accordion, AccordionItem } from "@heroui/react";
import { models } from "../data/models";

const faq = [
    {
      "question": "¿Qué modelos de IA puedo comparar en esta web?",
      "answer": "Puedes enviar mensajes a los siguientes modelos y comparar sus respuestas: " + models.map((model) => model.name).join(", ") + "."
    },
    {
      "question": "¿Cómo funciona la comparación de modelos?",
      "answer": "Ingresa un mensaje y envíalo a varios modelos de IA a la vez. La web te mostrará las respuestas generadas por cada modelo junto con el tiempo que tardaron en procesarlas."
    },
    {
      "question": "¿Puedo probar los modelos directamente desde esta web?",
      "answer": "Sí, puedes escribir un mensaje y obtener las respuestas de varios modelos en tiempo real para compararlas."
    },
    {
      "question": "¿Cómo se mide la velocidad de cada modelo?",
      "answer": "La web calcula el tiempo que tarda cada modelo en procesar tu mensaje desde el momento en que se envía hasta que se recibe la respuesta."
    },
    {
      "question": "¿Qué tipo de preguntas puedo hacer a los modelos?",
      "answer": "Puedes hacer preguntas sobre cualquier tema, pero la calidad de la respuesta dependerá de las capacidades de cada modelo."
    },
    {
      "question": "¿Los modelos mejoran con el tiempo?",
      "answer": "Sí, los proveedores de IA actualizan sus modelos periódicamente. Intentamos mantener la web actualizada con las últimas versiones disponibles."
    },
    {
      "question": "¿Puedo sugerir un nuevo modelo para añadir a la comparación?",
      "answer": "Sí, si crees que falta un modelo importante, puedes contactarnos y evaluaremos su inclusión."
    }
];
  

export default function Help() {
    return (
        <Accordion>
            {faq.map((item, index) => (
                <AccordionItem key={index} title={item.question}>
                    {item.answer}
                </AccordionItem>
            ))}
        </Accordion>
    )
}

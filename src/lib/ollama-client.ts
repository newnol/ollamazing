import { ollamaHost } from "./storage";
import { Ollama } from "ollama/browser";

export const getOllamaClient = async () => {
  const host = await ollamaHost.getValue();

  return new Ollama({ host });
};

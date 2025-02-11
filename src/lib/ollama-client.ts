import { ollamaState } from "./states/ollama.state";
import { Ollama } from "ollama/browser";

export const getOllamaClient = async () => {
  return new Ollama({ host: ollamaState.host });
};

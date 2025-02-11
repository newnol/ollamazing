import { ollamaState } from "@/lib/states/ollama.state";
import { Ollama } from "ollama/browser";
import { useSnapshot } from "valtio";

export function useOllama() {
  const { host } = useSnapshot(ollamaState);

  return new Ollama({ host });
}

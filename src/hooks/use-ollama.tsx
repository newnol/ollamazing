import { ollamaState } from "@/lib/states/ollama.state";
import { Ollama } from "ollama/browser";
import { useMemo } from "react";
import { useSnapshot } from "valtio";

export function useOllama() {
  const { host } = useSnapshot(ollamaState);

  const ollama = useMemo(() => new Ollama({ host }), [host]);

  return ollama;
}

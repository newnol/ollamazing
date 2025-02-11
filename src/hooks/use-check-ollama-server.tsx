import { ollamaState } from "@/lib/states/ollama.state";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

export function useCheckOllamaServer() {
  const ollamaSnap = useSnapshot(ollamaState);

  return useQuery({
    queryKey: ["checkOllamaServer"],
    queryFn: async () => {
      try {
        const response = await fetch(ollamaSnap.host);
        if (!response.ok) {
          throw new Error("Failed to check Ollama server");
        }
        const text = await response.text();

        return text === "Ollama is running";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to check Ollama server");
      }
    },
  });
}

import { ollamaHost } from "@/lib/storage";
import { useQuery } from "@tanstack/react-query";

export function useCheckOllamaServer() {
  return useQuery({
    queryKey: ["checkOllamaServer"],
    queryFn: async () => {
      const host = await ollamaHost.getValue();
      try {
        const response = await fetch(host);
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

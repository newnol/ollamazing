import { useOllama } from "./use-ollama";
import { ollamaState } from "@/lib/states/ollama.state";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

export function useInitOllama() {
  const { host } = useSnapshot(ollamaState);
  const ollama = useOllama();

  return useQuery({
    queryKey: ["initOllama", host],
    queryFn: async () => {
      try {
        const modelsResponse = await ollama.list();
        const models = modelsResponse.models;

        return {
          models,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to initialize Ollama");
      }
    },
  });
}

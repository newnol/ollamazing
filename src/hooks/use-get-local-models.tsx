import { useOllama } from "./use-ollama";
import { ollamaState } from "@/lib/states/ollama.state";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

export function useGetLocalModels({ enabled }: { enabled: boolean }) {
  const { selectedModel } = useSnapshot(ollamaState);
  const ollama = useOllama();

  const query = useQuery({
    queryKey: ["localModels", selectedModel],
    queryFn: async () => {
      const response = await ollama.list();

      if (!selectedModel) {
        ollamaState.selectedModel = response.models[0].name;
      }

      return response.models;
    },
    enabled,
  });

  return query;
}

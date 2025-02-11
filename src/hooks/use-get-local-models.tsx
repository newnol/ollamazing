import { getOllamaClient } from "@/lib/ollama-client";
import { ollamaState } from "@/lib/states/ollama.state";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

export function useGetLocalModels({ enabled }: { enabled: boolean }) {
  const ollamaSnap = useSnapshot(ollamaState);

  const query = useQuery({
    queryKey: ["localModels", ollamaSnap.selectedModel],
    queryFn: async () => {
      const ollama = await getOllamaClient();
      const response = await ollama.list();

      if (!ollamaSnap.selectedModel) {
        ollamaState.selectedModel = response.models[0].name;
      }

      return response.models;
    },
    enabled,
  });

  return query;
}

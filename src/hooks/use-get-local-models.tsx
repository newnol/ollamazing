import { getOllamaClient } from "@/lib/ollama-client";
import { ollamaHost, selectedModel } from "@/lib/storage";
import { useQuery } from "@tanstack/react-query";

export function useGetLocalModels({ enabled }: { enabled: boolean }) {
  ollamaHost.watch(() => {
    query.refetch();
  });

  const query = useQuery({
    queryKey: ["localModels"],
    queryFn: async () => {
      const ollama = await getOllamaClient();
      const response = await ollama.list();

      const selectedModelName = await selectedModel.getValue();
      if (!selectedModelName) {
        await selectedModel.setValue(response.models[0]?.name);
      }

      return response.models;
    },
    enabled,
  });

  return query;
}

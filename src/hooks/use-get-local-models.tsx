import { getOllamaClient } from "@/lib/ollama-client";
import { localModels, selectedModel } from "@/lib/storage";
import { useQuery } from "@tanstack/react-query";

export function useGetLocalModels({ enabled }: { enabled: boolean }) {
  const query = useQuery({
    queryKey: ["localModels"],
    queryFn: async () => {
      const ollama = await getOllamaClient();
      const response = await ollama.list();

      await localModels.setValue(response.models);
      await selectedModel.setValue(response.models[0]?.name);

      return response.models;
    },
    enabled,
  });

  return query;
}

import { useOllama } from "./use-ollama";
import { ollamaState } from "@/lib/states/ollama.state";
import { useQuery } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

export function useGetLocalModels({ enabled }: { enabled: boolean }) {
  const { chatModel, translationModel, summaryModel } = useSnapshot(ollamaState);
  const ollama = useOllama();

  const query = useQuery({
    queryKey: ["localModels", chatModel, translationModel, summaryModel],
    queryFn: async () => {
      const response = await ollama.list();

      if (!chatModel) {
        ollamaState.chatModel = response.models[0].name;
      }
      if (!translationModel) {
        ollamaState.translationModel = response.models[0].name;
      }
      if (!summaryModel) {
        ollamaState.summaryModel = response.models[0].name;
      }

      return response.models;
    },
    enabled,
  });

  return query;
}

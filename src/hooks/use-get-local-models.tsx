import { localModels, selectedModel } from "@/lib/storage";
import { useQuery } from "@tanstack/react-query";
import ollama from "ollama";

export function useGetLocalModels(needUpdate = false) {
  const query = useQuery({
    queryKey: ["localModels", { needUpdate }],
    queryFn: async () => {
      let models = await localModels.getValue();
      if (needUpdate) {
        const res = await ollama.list();
        models = res.models;

        await localModels.setValue(models);
      }

      if (!(await selectedModel.getValue())) {
        await selectedModel.setValue(models[0]?.name);
      }

      return models;
    },
  });

  return query;
}

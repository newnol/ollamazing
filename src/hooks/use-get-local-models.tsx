import { useGetSelectedModel } from "./use-get-selected-model";
import { localModels, selectedModel } from "@/lib/storage";
import { useQuery } from "@tanstack/react-query";
import ollama from "ollama";
import { useEffect } from "react";

export function useGetLocalModels(needUpdate = false) {
  const query = useQuery({
    queryKey: ["localModels", { needUpdate }],
    queryFn: async () => {
      let models = await localModels.getValue();
      if (needUpdate) {
        const res = await ollama.list();
        models = res.models;
      }

      return models;
    },
  });

  const getSelectedModelQuery = useGetSelectedModel();

  useEffect(() => {
    if (query.isSuccess && query.data) {
      localModels.setValue(query.data);
      if (!getSelectedModelQuery.data) {
        selectedModel.setValue(query.data[0]?.name);
      }
    }
  }, [query.isSuccess, query.data, getSelectedModelQuery.data]);

  return query;
}

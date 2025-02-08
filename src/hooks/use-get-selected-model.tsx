import { selectedModel } from "@/lib/storage";
import { useQuery } from "@tanstack/react-query";

export function useGetSelectedModel() {
  return useQuery({
    queryKey: ["selectedModel"],
    queryFn: selectedModel.getValue,
  });
}

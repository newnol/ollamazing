import { useOllama } from "@/hooks/use-ollama";
import { ollamaState } from "@/lib/states/ollama.state";
import { useMutation } from "@tanstack/react-query";
import { useSnapshot } from "valtio";

interface UseModelSummarizeProps {
  onSuccess?: (data: { summary: string }) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
}

export function useModelSummarize({ onSuccess, onError, onSettled }: UseModelSummarizeProps) {
  const { summaryModel } = useSnapshot(ollamaState);

  const ollama = useOllama();

  const { mutate: handleSummarize, isPending } = useMutation({
    mutationFn: async (content: string) => {
      if (!summaryModel) return;

      const response = await ollama.generate({
        model: summaryModel,
        prompt: content,
        format: {
          type: "object",
          properties: {
            summary: {
              type: "string",
            },
          },
          required: ["summary"],
        },
        system: "Summarize the following content concisely",
      });

      return JSON.parse(response.response);
    },
    onSuccess,
    onError,
    onSettled,
  });

  return { handleSummarize, isPending };
}

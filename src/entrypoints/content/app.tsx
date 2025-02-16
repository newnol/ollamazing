import { ContainerProvider } from "./components/container-provider";
import { HandledContentPopup } from "./components/handled-content-popup";
import { SelectionMenu } from "./components/selection-menu";
import { useModelSummarize } from "./hooks/use-model-summarize";
import { useModelTranslate } from "./hooks/use-model-translate";
import { useTextSelection } from "./hooks/use-text-selection";
import "@/assets/globals.css";
import { useInitState } from "@/hooks/use-init-state";
import { ContentHandledData } from "@/shared/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface AppProps {
  container: HTMLElement;
}

function AppContent() {
  useInitState();

  const [result, setResult] = useState<ContentHandledData | null>(null);

  const { selectedText, isVisible } = useTextSelection();

  const { handleTranslate, isPending: isTranslating } = useModelTranslate({
    onSuccess: (data) => {
      setResult({ ...data, type: "translation" });
    },
  });

  const { handleSummarize, isPending: isSummarizing } = useModelSummarize({
    onSuccess: (data) => {
      setResult({ ...data, type: "summary" });
    },
  });

  const isLoading = useMemo(() => isTranslating || isSummarizing, [isTranslating, isSummarizing]);

  useEffect(() => {
    if (!isVisible) {
      setResult(null);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }
  if (isLoading) {
    return (
      <div className="bg-background flex items-center gap-1 rounded-lg border p-1 shadow-lg">
        <Loader2Icon className="size-4 animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-1">
      <SelectionMenu
        onTranslate={() => handleTranslate(selectedText)}
        onSummarize={() => handleSummarize(selectedText)}
      />
      {result && <HandledContentPopup data={result} onClose={() => setResult(null)} />}
    </div>
  );
}

export default function App({ container }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );

  return (
    <ContainerProvider container={container}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ContainerProvider>
  );
}

import { ContainerProvider } from "./components/container-provider";
import { HandledContentPopup } from "./components/handled-content-popup";
import { SelectionMenu } from "./components/selection-menu";
import { useModelSummarize } from "./hooks/use-model-summarize";
import { useModelTranslate } from "./hooks/use-model-translate";
import { useTextSelection } from "./hooks/use-text-selection";
import "@/assets/globals.css";
import { useInitState } from "@/hooks/use-init-state";
import { ollamaState } from "@/lib/states/ollama.state";
import { ContentHandledData } from "@/shared/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMemo, useState } from "react";
import { useSnapshot } from "valtio";

dayjs.extend(relativeTime);

interface AppProps {
  container: HTMLElement;
}

function AppContent() {
  useInitState();

  const { translationModel } = useSnapshot(ollamaState);

  const [result, setResult] = useState<ContentHandledData | null>(null);

  const { selectedText, isVisible } = useTextSelection({
    onClose: () => setResult(null),
  });

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

  if (!isVisible || !selectedText || !translationModel) {
    return null;
  }

  return (
    <div>
      <SelectionMenu
        isLoading={isLoading}
        onTranslate={() => handleTranslate(selectedText)}
        onSummarize={() => handleSummarize(selectedText)}
      />
      {result && (
        <div className="mt-2">
          <HandledContentPopup data={result} onClose={() => setResult(null)} />
        </div>
      )}
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

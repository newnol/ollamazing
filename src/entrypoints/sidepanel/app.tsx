import { ChatInterface } from "./components/chat-interface";
import { Header } from "./components/header";
import "@/assets/globals.css";
import { LoadingScreen } from "@/components/loading-screen";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useInitOllama } from "@/hooks/use-init-ollama";
import { useInitState } from "@/hooks/use-init-state";
import { preferencesState } from "@/lib/states/preferences.state";
import { openOptionsPage } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnapshot } from "valtio";

function AppContent() {
  useInitState();
  const { theme } = useSnapshot(preferencesState);
  const { t } = useTranslation();

  const initOllamaQuery = useInitOllama();

  if (initOllamaQuery.isLoading) {
    return <LoadingScreen className="h-screen w-screen" />;
  }
  if (initOllamaQuery.error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <div className="text-lg">{t("check ollama server")}</div>
        <Button className="cursor-pointer" onClick={openOptionsPage}>
          {t("open settings")}
        </Button>
      </div>
    );
  }
  return (
    <>
      <div className="bg-background flex h-screen flex-col">
        <Header models={initOllamaQuery.data?.models ?? []} />
        <ChatInterface />
      </div>
      <Toaster theme={theme} />
    </>
  );
}

export function App() {
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
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;

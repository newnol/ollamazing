import { ChatInterface } from "./components/chat-interface";
import { Header } from "./components/header";
import { LoadingScreen } from "./components/loading-screen";
import "@/assets/globals.css";
import { Button } from "@/components/ui/button";
import { useCheckOllamaServer } from "@/hooks/use-check-ollama-server";
import { useGetLocalModels } from "@/hooks/use-get-local-models";
import { openOptionsPage } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);

function App() {
  const checkOllamaServerQuery = useCheckOllamaServer();
  const localModelsQuery = useGetLocalModels({ enabled: checkOllamaServerQuery.isSuccess });

  if (localModelsQuery.isLoading || checkOllamaServerQuery.isLoading) {
    return <LoadingScreen />;
  }
  if (checkOllamaServerQuery.error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <div className="text-lg">Please check your Ollama server</div>
        <Button className="cursor-pointer" onClick={openOptionsPage}>
          Open Options
        </Button>
      </div>
    );
  }
  if (localModelsQuery.data?.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <div className="text-lg">No models found</div>
        <Button className="cursor-pointer" onClick={openOptionsPage}>
          Open Options
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <Header models={localModelsQuery.data ?? []} />
      <ChatInterface />
    </div>
  );
}

export function WithQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default App;

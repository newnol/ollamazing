import { ChatInterface } from "./components/chat-interface";
import { Header } from "./components/header";
import { LoadingScreen } from "./components/loading-screen";
import "@/assets/globals.css";
import { useGetLocalModels } from "@/hooks/use-get-local-models";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);

function App() {
  const localModelsQuery = useGetLocalModels(true);

  if (localModelsQuery.isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <ChatInterface />
    </div>
  );
}

export function WithQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default App;

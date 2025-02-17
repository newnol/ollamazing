import { ModelSelectionForm } from "./components/model-selection-form";
import { OllamaContent } from "./components/ollama-content";
import { PreferencesForm } from "./components/preferences-form";
import "@/assets/globals.css";
import { LoadingScreen } from "@/components/loading-screen";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useInitOllama } from "@/hooks/use-init-ollama";
import { useInitState } from "@/hooks/use-init-state";
import "@/i18n";
import { preferencesState } from "@/lib/states/preferences.state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsIcon, LayoutDashboardIcon, WandIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSnapshot } from "valtio";

function AppContent() {
  useInitState();

  const { theme } = useSnapshot(preferencesState);

  const { t } = useTranslation();

  const initOllamaQuery = useInitOllama();

  const menuItems = useMemo(
    () => [
      {
        value: "ollama",
        icon: LayoutDashboardIcon,
        label: "Ollama",
        content: <OllamaContent />,
      },
      {
        value: "models",
        icon: WandIcon,
        label: t("model selection"),
        content: <ModelSelectionForm models={initOllamaQuery.data?.models ?? []} />,
      },
      {
        value: "preferences",
        icon: SettingsIcon,
        label: t("preferences"),
        content: <PreferencesForm />,
      },
    ],
    [t, initOllamaQuery.data?.models],
  );

  const [activeItem, setActiveItem] = useState<string>(menuItems[0].value);

  if (initOllamaQuery.isLoading) {
    return <LoadingScreen className="h-[500px] w-3xl" />;
  }

  return (
    <SidebarProvider className="h-[500px] w-3xl items-start">
      <Sidebar collapsible="none" className="max-w-48">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton asChild isActive={item.value === activeItem}>
                      <a href="#" onClick={() => setActiveItem(item.value)}>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="bg-background h-full flex-1 p-3">
        {menuItems.find((item) => item.value === activeItem)?.content}
      </main>
      <Toaster theme={theme} />
    </SidebarProvider>
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

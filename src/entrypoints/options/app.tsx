import { OllamaContent } from "./components/ollama-content";
import { PreferencesForm } from "./components/preferences-form";
import "@/assets/globals.css";
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
import { useInitState } from "@/hooks/use-init-state";
import "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsIcon, LayoutDashboardIcon } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

function AppContent() {
  useInitState();

  const { t } = useTranslation();

  const menuItems = React.useMemo(
    () => [
      {
        value: "ollama",
        icon: LayoutDashboardIcon,
        label: "Ollama",
        content: <OllamaContent />,
      },

      {
        value: "preferences",
        icon: SettingsIcon,
        label: t("preferences"),
        content: <PreferencesForm />,
      },
    ],
    [t],
  );

  const [activeItem, setActiveItem] = React.useState<string>(menuItems[0].value);

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
    </SidebarProvider>
  );
}

export function App() {
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

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

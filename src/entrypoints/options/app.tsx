import { OllamaForm } from "./components/ollama-form";
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
import { useInitState } from "@/hooks/use-init-state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SettingsIcon, LayoutDashboardIcon } from "lucide-react";
import React from "react";

dayjs.extend(relativeTime);

const menuItems = [
  {
    value: "ollama",
    icon: LayoutDashboardIcon,
    label: "Ollama",
    content: <OllamaForm />,
  },
  {
    value: "preferences",
    icon: SettingsIcon,
    label: "Preferences",
    content: <PreferencesForm />,
  },
] as const;

function App() {
  const [activeItem, setActiveItem] = React.useState<string>(menuItems[0].value);

  useInitState();

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
      <main className="flex-1 p-3">
        {menuItems.find((item) => item.value === activeItem)?.content}
      </main>
    </SidebarProvider>
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

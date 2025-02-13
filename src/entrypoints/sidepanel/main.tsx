import App, { WithQueryProvider } from "./app.tsx";
import { Toaster } from "@/components/ui/sonner";
import "@/i18n";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WithQueryProvider>
    <App />
    <Toaster />
  </WithQueryProvider>,
);

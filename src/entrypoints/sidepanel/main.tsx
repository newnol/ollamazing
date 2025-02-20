import App from "./app.tsx";
import "@/i18n";
import { setUpRelativeDayjs } from "@/lib/utils.ts";
import { sendMessage, onMessage } from "@/shared/messaging.ts";
import ReactDOM from "react-dom/client";

setUpRelativeDayjs();

// On load, send event to background that side panel is opened
sendMessage("toggleSidePanel", true);

// On message from background, close side panel if it is not open
onMessage("toggleSidePanel", (open) => {
  if (!open.data) {
    window.close();
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

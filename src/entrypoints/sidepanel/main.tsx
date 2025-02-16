import App from "./app.tsx";
import "@/i18n";
import { setUpRelativeDayjs } from "@/lib/utils.ts";
import ReactDOM from "react-dom/client";

setUpRelativeDayjs();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

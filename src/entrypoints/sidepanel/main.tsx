import App, { WithQueryProvider } from "./app.tsx";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WithQueryProvider>
    <App />
  </WithQueryProvider>,
);

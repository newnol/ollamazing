import App from "./app";
import "./styles.css";
import "@/i18n";
import { setUpRelativeDayjs } from "@/lib/utils";
import { CONTENT_NAME } from "@/shared/consts";
import ReactDOM from "react-dom/client";

setUpRelativeDayjs();

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: CONTENT_NAME,
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<App container={container} />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});

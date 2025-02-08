import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  srcDir: "src",
  vite: () => ({
    plugins: [react(), tailwindcss()],
  }),
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
  manifest: {
    permissions: ["storage"],
  },
});

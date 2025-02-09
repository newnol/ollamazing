import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  srcDir: "src",
  modules: ["@wxt-dev/module-react"],
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
  manifest: {
    name: "Ollamazing",
    short_name: "Ollamazing",
    permissions: ["storage"],
  },
});

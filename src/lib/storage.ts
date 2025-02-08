import { ModelResponse } from "ollama";

export const theme = storage.defineItem<"light" | "dark" | "system">("local:theme", {
  fallback: "system",
});

export const lang = storage.defineItem<"en" | "vi">("local:lang", {
  fallback: "en",
});

export const localModels = storage.defineItem<ModelResponse[]>("local:localModels", {
  fallback: [],
});

export const selectedModel = storage.defineItem<string>("local:selectedModel");

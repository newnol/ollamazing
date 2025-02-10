import { DEFAULT_OLLAMA_HOST } from "@/shared/consts";
import { Message } from "@/shared/types";

export const preferences = storage.defineItem<{
  theme: "light" | "dark" | "system";
  lang: "en" | "vi";
}>("local:preferences", {
  fallback: {
    theme: "system",
    lang: "en",
  },
});

export const selectedModel = storage.defineItem<string>("local:selectedModel");

export const chatHistory = storage.defineItem<Message[]>("local:chatHistory", {
  fallback: [],
});

export const ollamaHost = storage.defineItem<string>("local:ollamaHost", {
  fallback: DEFAULT_OLLAMA_HOST,
});

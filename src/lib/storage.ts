import { DEFAULT_OLLAMA_HOST } from "@/shared/consts";
import { Message } from "@/shared/types";
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

export const chatHistory = storage.defineItem<Message[]>("local:chatHistory", {
  fallback: [],
});

export const ollamaHost = storage.defineItem<string>("local:ollamaHost", {
  fallback: DEFAULT_OLLAMA_HOST,
});

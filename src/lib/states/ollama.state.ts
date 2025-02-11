import { DEFAULT_OLLAMA_HOST } from "@/shared/consts";
import { ChatMessage } from "@/shared/types";
import { proxy, subscribe } from "valtio";

const storageKey = "local:ollama";

export interface OllamaState {
  host: string;
  selectedModel: string | null;
  chatHistory: ChatMessage[];
}

const getFromStorage = async () => {
  const item = await storage.getItem<any>(storageKey);
  return {
    host: item?.host ?? DEFAULT_OLLAMA_HOST,
    selectedModel: item?.selectedModel ?? null,
    chatHistory:
      item?.chatHistory?.map((msg: any) => ({
        ...msg,
        images: msg.images?.slice(),
        timestamp: new Date(msg.timestamp),
      })) ?? [],
  };
};

export const ollamaState = proxy<OllamaState>(await getFromStorage());

subscribe(ollamaState, async () => {
  await storage.setItem(storageKey, {
    host: ollamaState.host,
    selectedModel: ollamaState.selectedModel,
    chatHistory: ollamaState.chatHistory.map((msg) => ({
      ...msg,
      images: msg.images?.slice(),
      timestamp: msg.timestamp.getTime(),
    })),
  });
});

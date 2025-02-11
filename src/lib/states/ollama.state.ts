import { DEFAULT_OLLAMA_HOST } from "@/shared/consts";
import { ChatMessage } from "@/shared/types";
import { proxy, subscribe } from "valtio";

const storageKey = "local:ollama";

export interface OllamaState {
  host: string;
  selectedModel: string | null;
  chatHistory: ChatMessage[];
}

const fallbackState: OllamaState = {
  host: DEFAULT_OLLAMA_HOST,
  selectedModel: null,
  chatHistory: [],
};

export const ollamaState = proxy<OllamaState>(fallbackState);

(async () => {
  const item = await storage.getItem<any>(storageKey);

  if (item) {
    ollamaState.host = item.host ?? fallbackState.host;
    ollamaState.selectedModel = item?.selectedModel ?? fallbackState.selectedModel;
    ollamaState.chatHistory =
      item?.chatHistory?.map((msg: any) => ({
        ...msg,
        images: msg.images?.slice(),
        timestamp: new Date(msg.timestamp),
      })) ?? fallbackState.chatHistory;
  }
})();

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

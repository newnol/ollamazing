import { DEFAULT_OLLAMA_HOST } from "@/shared/consts";
import { ChatMessage } from "@/shared/types";
import { proxy, subscribe } from "valtio";

const storageKey = "local:ollama";
let isUpdating = false;

type OllamaState = {
  host: string;
  chatHistory: ChatMessage[];
  chatModel: string | null;
  translationModel: string | null;
  summaryModel: string | null;
};

type StorageData = OllamaState & {
  chatHistory: Array<ChatMessage & { timestamp: number }>;
};

const fallbackState: OllamaState = {
  host: DEFAULT_OLLAMA_HOST,
  chatHistory: [],
  chatModel: null,
  translationModel: null,
  summaryModel: null,
};

export const ollamaState = proxy<OllamaState>(fallbackState);

export const syncFromStorage = async (data?: StorageData) => {
  if (isUpdating) return;
  isUpdating = true;

  if (!data) {
    data = (await storage.getItem<StorageData>(storageKey)) ?? undefined;
  }

  ollamaState.host = data?.host ?? fallbackState.host;
  ollamaState.chatHistory =
    data?.chatHistory?.map((msg: any) => ({
      ...msg,
      images: msg.images?.slice(),
      timestamp: new Date(msg.timestamp),
    })) ?? fallbackState.chatHistory;
  ollamaState.chatModel = data?.chatModel ?? fallbackState.chatModel;
  ollamaState.translationModel = data?.translationModel ?? fallbackState.translationModel;
  ollamaState.summaryModel = data?.summaryModel ?? fallbackState.summaryModel;

  isUpdating = false;
};

const syncToStorage = async () => {
  if (isUpdating) return;
  isUpdating = true;

  const storageItem = {
    host: ollamaState.host,
    chatHistory: ollamaState.chatHistory.map((msg) => ({
      ...msg,
      images: msg.images?.slice(),
      timestamp: msg.timestamp.getTime(),
    })),
    chatModel: ollamaState.chatModel,
    translationModel: ollamaState.translationModel,
    summaryModel: ollamaState.summaryModel,
  };
  await storage.setItem(storageKey, storageItem);

  isUpdating = false;
};

subscribe(ollamaState, async () => {
  await syncToStorage();
});

storage.watch(storageKey, async (newValue: StorageData | null) => {
  if (!newValue) return;
  await syncFromStorage(newValue);
});

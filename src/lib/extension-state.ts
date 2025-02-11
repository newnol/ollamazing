import { DEFAULT_OLLAMA_HOST } from "@/shared/consts";
import { ChatMessage } from "@/shared/types";
import { proxy } from "valtio";

export enum Actions {
  GET_STATE = "get-state",
  SET_STATE = "set-state",
}
export type Action = `${Actions}`;

export const state = proxy<{
  preferences: {
    theme: "light" | "dark" | "system";
    lang: "en" | "vi";
  };
  ollama: {
    host: string;
    selectedModel: string | null;
    chatHistory: ChatMessage[];
  };
}>({
  preferences: {
    theme: "system",
    lang: "en",
  },
  ollama: {
    host: DEFAULT_OLLAMA_HOST,
    selectedModel: null,
    chatHistory: [],
  },
});

export type ExtensionState = typeof state;

export const updateExtensionState = (payload: Partial<ExtensionState>) => {
  chrome.runtime.sendMessage({ type: Actions.SET_STATE, payload });
};

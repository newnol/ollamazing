import { proxy, subscribe } from "valtio";

const storageKey = "local:preferences";

export interface PreferencesState {
  theme: "light" | "dark" | "system";
  lang: "en" | "vi";
}

export const preferencesState = proxy<PreferencesState>(
  (await storage.getItem<PreferencesState>(storageKey)) ?? {
    theme: "system",
    lang: "en",
  },
);

subscribe(preferencesState, async () => {
  await storage.setItem(storageKey, preferencesState);
});

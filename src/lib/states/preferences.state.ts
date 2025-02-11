import { proxy, subscribe } from "valtio";

const storageKey = "local:preferences";

export interface PreferencesState {
  theme: "light" | "dark" | "system";
  lang: "en" | "vi";
}

const fallbackState: PreferencesState = {
  theme: "system",
  lang: "en",
};

export const preferencesState = proxy<PreferencesState>(fallbackState);

(async () => {
  const item = await storage.getItem<PreferencesState>(storageKey);
  if (item) {
    preferencesState.theme = item.theme;
    preferencesState.lang = item.lang;
  }
})();

subscribe(preferencesState, async () => {
  await storage.setItem(storageKey, preferencesState);
});

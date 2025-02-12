import { updateTheme } from "@/lib/utils";
import { proxy, subscribe } from "valtio";

const storageKey = "local:preferences";
let isUpdating = false;

type PreferencesState = {
  theme: "light" | "dark" | "system";
  lang: "en" | "vi";
};

type StorageData = PreferencesState;

const fallbackState: PreferencesState = {
  theme: "system",
  lang: "en",
};

export const preferencesState = proxy<PreferencesState>(fallbackState);

export const syncFromStorage = async (data?: StorageData) => {
  if (isUpdating) return;
  isUpdating = true;
  if (!data) {
    data = (await storage.getItem<StorageData>(storageKey)) ?? undefined;
  }

  Object.assign(preferencesState, fallbackState, data);
  updateTheme(preferencesState.theme);

  isUpdating = false;
};

const syncToStorage = async () => {
  if (isUpdating) return;
  isUpdating = true;
  updateTheme(preferencesState.theme);
  await storage.setItem(storageKey, preferencesState);
  isUpdating = false;
};

subscribe(preferencesState, async () => {
  await syncToStorage();
});

storage.watch(storageKey, async (newValue: StorageData | null) => {
  if (!newValue) return;
  await syncFromStorage(newValue);
});

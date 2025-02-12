import { syncFromStorage as syncOllamaFromStorage } from "@/lib/states/ollama.state";
import { syncFromStorage as syncPreferencesFromStorage } from "@/lib/states/preferences.state";
import { useEffect } from "react";

export function useInitState() {
  useEffect(() => {
    syncOllamaFromStorage();
    syncPreferencesFromStorage();
  }, []);
}
